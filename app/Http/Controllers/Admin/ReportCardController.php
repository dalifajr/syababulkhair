<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssessmentScore;
use App\Models\AttendanceRecord;
use App\Models\ClassEnrollment;
use App\Models\ClassGroup;
use App\Models\ExtracurricularEnrollment;
use App\Models\HomeroomNote;
use App\Models\InstitutionSetting;
use App\Models\ReportCard;
use App\Models\ReportCardSubject;
use App\Models\Subject;
use App\Models\SubjectKkm;
use App\Models\TeachingAssignment;
use App\Models\Term;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReportCardController extends Controller
{
    public function index(Request $request): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);
        $classGroupId = $request->get('class_group_id');

        $terms = Term::with('academicYear')
            ->orderByDesc('starts_at')
            ->get();

        $classGroups = ClassGroup::query()
            ->when($termId, fn($q) => $q->where('term_id', $termId))
            ->with('homeroomTeacher')
            ->orderBy('level')
            ->orderBy('name')
            ->get();

        // Get report cards if class group is selected
        $reportCards = collect();
        if ($classGroupId) {
            $reportCards = ReportCard::whereHas('classEnrollment', fn($q) => $q->where('class_group_id', $classGroupId))
                ->where('term_id', $termId)
                ->with(['classEnrollment.student', 'generatedBy'])
                ->orderBy('rank')
                ->get();
        }

        return Inertia::render('admin/report-cards/index', [
            'reportCards' => $reportCards,
            'terms' => $terms,
            'classGroups' => $classGroups,
            'filters' => [
                'term_id' => $termId,
                'class_group_id' => $classGroupId,
            ],
        ]);
    }

    public function generate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'class_group_id' => ['required', 'exists:class_groups,id'],
            'term_id' => ['required', 'exists:terms,id'],
        ]);

        $classGroup = ClassGroup::findOrFail($validated['class_group_id']);
        $term = Term::findOrFail($validated['term_id']);

        $enrollments = ClassEnrollment::where('class_group_id', $classGroup->id)
            ->with('student')
            ->get();

        // Get all subjects taught in this class
        $teachingAssignments = TeachingAssignment::where('class_group_id', $classGroup->id)
            ->where('term_id', $term->id)
            ->with('subject')
            ->get();

        // Get KKM for each subject
        $kkmValues = SubjectKkm::where('term_id', $term->id)
            ->pluck('kkm_value', 'subject_id');

        DB::beginTransaction();

        try {
            $reportCardsData = [];

            foreach ($enrollments as $enrollment) {
                // Calculate scores for each subject
                $subjectScores = [];
                $totalScore = 0;
                $subjectCount = 0;

                foreach ($teachingAssignments as $assignment) {
                    // Get all assessment scores for this student in this assignment
                    $scores = AssessmentScore::whereHas('assessment', function ($q) use ($assignment) {
                        $q->where('teaching_assignment_id', $assignment->id);
                    })
                        ->where('student_id', $enrollment->student_id)
                        ->with('assessment')
                        ->get();

                    if ($scores->isEmpty()) {
                        continue;
                    }

                    // Calculate weighted average
                    $totalWeight = 0;
                    $weightedSum = 0;

                    foreach ($scores as $score) {
                        $weight = $score->assessment->weight ?? 100;
                        $normalizedScore = ($score->score / $score->assessment->max_score) * 100;
                        $weightedSum += $normalizedScore * $weight;
                        $totalWeight += $weight;
                    }

                    $averageScore = $totalWeight > 0 ? $weightedSum / $totalWeight : 0;

                    $subjectScores[$assignment->subject_id] = [
                        'knowledge_score' => $averageScore,
                        'skill_score' => $averageScore, // For now, same as knowledge
                        'knowledge_grade' => ReportCardSubject::scoreToGrade($averageScore),
                        'skill_grade' => ReportCardSubject::scoreToGrade($averageScore),
                        'kkm' => $kkmValues[$assignment->subject_id] ?? 70,
                    ];

                    $totalScore += $averageScore;
                    $subjectCount++;
                }

                // Calculate attendance
                $attendance = AttendanceRecord::where('student_id', $enrollment->student_id)
                    ->whereHas('attendanceSession.teachingAssignment', fn($q) => $q->where('term_id', $term->id))
                    ->selectRaw("
                        SUM(CASE WHEN status = 'sick' THEN 1 ELSE 0 END) as sick_days,
                        SUM(CASE WHEN status = 'permit' THEN 1 ELSE 0 END) as permit_days,
                        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_days
                    ")
                    ->first();

                $reportCardsData[] = [
                    'enrollment' => $enrollment,
                    'total_score' => $totalScore,
                    'average_score' => $subjectCount > 0 ? $totalScore / $subjectCount : 0,
                    'subject_scores' => $subjectScores,
                    'sick_days' => $attendance->sick_days ?? 0,
                    'permit_days' => $attendance->permit_days ?? 0,
                    'absent_days' => $attendance->absent_days ?? 0,
                ];
            }

            // Sort by average score for ranking
            usort($reportCardsData, fn($a, $b) => $b['average_score'] <=> $a['average_score']);

            // Create report cards
            $totalStudents = count($reportCardsData);
            foreach ($reportCardsData as $rank => $data) {
                $reportCard = ReportCard::updateOrCreate(
                    [
                        'class_enrollment_id' => $data['enrollment']->id,
                        'term_id' => $term->id,
                    ],
                    [
                        'total_score' => $data['total_score'],
                        'average_score' => $data['average_score'],
                        'rank' => $rank + 1,
                        'total_students' => $totalStudents,
                        'sick_days' => $data['sick_days'],
                        'permit_days' => $data['permit_days'],
                        'absent_days' => $data['absent_days'],
                        'generated_by_user_id' => auth()->id(),
                        'generated_at' => now(),
                    ]
                );

                // Create subject scores
                foreach ($data['subject_scores'] as $subjectId => $scores) {
                    ReportCardSubject::updateOrCreate(
                        [
                            'report_card_id' => $reportCard->id,
                            'subject_id' => $subjectId,
                        ],
                        $scores
                    );
                }
            }

            DB::commit();

            return redirect()->route('admin.report-cards.index', [
                'term_id' => $term->id,
                'class_group_id' => $classGroup->id,
            ])->with('success', 'Rapor berhasil digenerate untuk ' . $totalStudents . ' siswa');

        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()
                ->withErrors(['error' => 'Gagal generate rapor: ' . $e->getMessage()]);
        }
    }

    public function show(ReportCard $reportCard): Response
    {
        $reportCard->load([
            'classEnrollment.student',
            'classEnrollment.classGroup.homeroomTeacher',
            'classEnrollment.classGroup.term.academicYear',
            'subjects.subject',
            'generatedBy',
        ]);

        // Get homeroom note
        $homeroomNote = HomeroomNote::where('class_enrollment_id', $reportCard->class_enrollment_id)
            ->where('term_id', $reportCard->term_id)
            ->first();

        // Get extracurricular enrollments
        $extracurriculars = ExtracurricularEnrollment::where('student_id', $reportCard->classEnrollment->student_id)
            ->where('term_id', $reportCard->term_id)
            ->with('extracurricular')
            ->get();

        return Inertia::render('admin/report-cards/show', [
            'reportCard' => $reportCard,
            'homeroomNote' => $homeroomNote,
            'extracurriculars' => $extracurriculars,
        ]);
    }

    public function edit(ReportCard $reportCard): Response
    {
        if ($reportCard->isLocked()) {
            return redirect()->route('admin.report-cards.show', $reportCard)
                ->with('error', 'Rapor sudah dikunci dan tidak dapat diedit');
        }

        $reportCard->load([
            'classEnrollment.student',
            'classEnrollment.classGroup.term.academicYear',
            'subjects.subject',
        ]);

        return Inertia::render('admin/report-cards/edit', [
            'reportCard' => $reportCard,
            'promotionStatuses' => ReportCard::PROMOTION_STATUSES,
        ]);
    }

    public function update(Request $request, ReportCard $reportCard): RedirectResponse
    {
        if ($reportCard->isLocked()) {
            return redirect()->back()
                ->withErrors(['error' => 'Rapor sudah dikunci dan tidak dapat diedit']);
        }

        $validated = $request->validate([
            'promotion_status' => ['nullable', 'in:promoted,retained,pending'],
            'principal_note' => ['nullable', 'string', 'max:1000'],
            'subjects' => ['array'],
            'subjects.*.id' => ['required', 'exists:report_card_subjects,id'],
            'subjects.*.knowledge_score' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'subjects.*.skill_score' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'subjects.*.description' => ['nullable', 'string', 'max:500'],
        ]);

        $reportCard->update([
            'promotion_status' => $validated['promotion_status'],
            'principal_note' => $validated['principal_note'],
        ]);

        if (isset($validated['subjects'])) {
            foreach ($validated['subjects'] as $subjectData) {
                ReportCardSubject::where('id', $subjectData['id'])
                    ->update([
                        'knowledge_score' => $subjectData['knowledge_score'],
                        'skill_score' => $subjectData['skill_score'],
                        'knowledge_grade' => isset($subjectData['knowledge_score']) 
                            ? ReportCardSubject::scoreToGrade($subjectData['knowledge_score']) 
                            : null,
                        'skill_grade' => isset($subjectData['skill_score']) 
                            ? ReportCardSubject::scoreToGrade($subjectData['skill_score']) 
                            : null,
                        'description' => $subjectData['description'] ?? null,
                    ]);
            }
        }

        // Recalculate totals
        $subjects = ReportCardSubject::where('report_card_id', $reportCard->id)->get();
        $totalScore = $subjects->sum('knowledge_score');
        $averageScore = $subjects->count() > 0 ? $totalScore / $subjects->count() : 0;

        $reportCard->update([
            'total_score' => $totalScore,
            'average_score' => $averageScore,
        ]);

        return redirect()->route('admin.report-cards.show', $reportCard)
            ->with('success', 'Rapor berhasil diperbarui');
    }

    public function lock(ReportCard $reportCard): RedirectResponse
    {
        $reportCard->update(['locked_at' => now()]);

        return redirect()->back()
            ->with('success', 'Rapor berhasil dikunci');
    }

    public function unlock(ReportCard $reportCard): RedirectResponse
    {
        $reportCard->update(['locked_at' => null]);

        return redirect()->back()
            ->with('success', 'Rapor berhasil dibuka');
    }

    public function print(ReportCard $reportCard)
    {
        $reportCard->load([
            'classEnrollment.student',
            'classEnrollment.classGroup.homeroomTeacher',
            'classEnrollment.classGroup.term.academicYear',
            'subjects.subject',
        ]);

        $homeroomNote = HomeroomNote::where('class_enrollment_id', $reportCard->class_enrollment_id)
            ->where('term_id', $reportCard->term_id)
            ->first();

        // Get extracurricular enrollments
        $extracurriculars = ExtracurricularEnrollment::where('student_id', $reportCard->classEnrollment->student_id)
            ->where('term_id', $reportCard->term_id)
            ->with('extracurricular')
            ->get();

        // Get institution settings for letterhead
        $institution = InstitutionSetting::first();

        $pdf = Pdf::loadView('pdf.report-card', [
            'reportCard' => $reportCard,
            'homeroomNote' => $homeroomNote,
            'extracurriculars' => $extracurriculars,
            'institution' => $institution,
        ]);

        $filename = 'rapor_' . $reportCard->classEnrollment->student->nis . '_' . $reportCard->term->name . '.pdf';

        return $pdf->download($filename);
    }
}
