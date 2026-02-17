<?php

namespace App\Http\Controllers;

use App\Exports\StudentsSummaryExport;
use App\Models\AssessmentScore;
use App\Models\ClassEnrollment;
use App\Models\ClassGroup;
use App\Models\InstitutionSetting;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Term;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function students(Request $request)
    {
        $printMode = $request->boolean('print');

        $activeTerm = Term::where('is_active', true)->with('academicYear')->first();
        
        // Get all class groups in active term
        $classGroups = $activeTerm 
            ? ClassGroup::where('term_id', $activeTerm->id)->orderBy('level')->orderBy('name')->get()
            : collect();

        $sort = $request->get('sort', 'name');
        $direction = strtolower($request->get('direction', 'asc')) === 'desc' ? 'desc' : 'asc';

        $allowedSorts = ['name', 'nis', 'average', 'total_scores'];
        if (!in_array($sort, $allowedSorts, true)) {
            $sort = 'name';
        }

        // Get students with their scores summary
        $query = Student::query()->where('status', 'active');
        
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%");
            });
        }

        $query
            ->withAvg('assessmentScores as average', 'score')
            ->withCount('assessmentScores as total_scores');

        if ($sort === 'average') {
            $query->orderBy('average', $direction)->orderBy('name');
        } elseif ($sort === 'total_scores') {
            $query->orderBy('total_scores', $direction)->orderBy('name');
        } else {
            $query->orderBy($sort, $direction)->orderBy('name');
        }

        $filters = [
            'search' => (string) $request->get('search', ''),
            'sort' => $sort,
            'direction' => $direction,
        ];

        if ($printMode) {
            $settings = InstitutionSetting::first();
            $letterhead = $settings ? [
                'enabled' => (bool) ($settings->letterhead_enabled ?? false),
                'logoUrl' => $settings->logo_path ? Storage::url($settings->logo_path) : null,
                'line1' => $settings->letterhead_line1 ?? null,
                'line2' => $settings->letterhead_line2 ?? null,
                'line3' => $settings->letterhead_line3 ?? null,
                'schoolName' => $settings->name ?? null,
            ] : null;

            $rows = StudentsSummaryExport::query($filters)->get();
            $printStudents = $rows->map(function ($student) {
                return [
                    'id' => $student->id,
                    'nis' => $student->nis,
                    'name' => $student->name,
                    'average' => $student->average !== null ? round((float) $student->average, 1) : null,
                    'total_scores' => (int) ($student->total_scores ?? 0),
                ];
            })->values();

            $meta = [
                'date' => now()->toDateString(),
                'term' => $activeTerm?->name,
                'academicYear' => $activeTerm?->academicYear?->name,
                'teacher' => auth()->user()?->name,
            ];

            return Inertia::render('reports/students', [
                'students' => [
                    'data' => [],
                    'current_page' => 1,
                    'last_page' => 1,
                    'total' => 0,
                ],
                'classGroups' => $classGroups,
                'activeTerm' => $activeTerm,
                'filters' => $filters,
                'printMode' => true,
                'printStudents' => $printStudents,
                'letterhead' => $letterhead,
                'meta' => $meta,
            ]);
        }

        $students = $query->paginate(10)->through(function ($student) {
            return [
                'id' => $student->id,
                'nis' => $student->nis,
                'name' => $student->name,
                'average' => $student->average !== null ? round((float) $student->average, 1) : null,
                'total_scores' => (int) ($student->total_scores ?? 0),
            ];
        });

        return Inertia::render('reports/students', [
            'students' => $students,
            'classGroups' => $classGroups,
            'activeTerm' => $activeTerm,
            'filters' => $filters,
        ]);
    }

    public function exportStudents(Request $request)
    {
        $filters = [
            'search' => (string) $request->get('search', ''),
            'sort' => (string) $request->get('sort', 'name'),
            'direction' => strtolower((string) $request->get('direction', 'asc')) === 'desc' ? 'desc' : 'asc',
        ];

        $allowedSorts = ['name', 'nis', 'average', 'total_scores'];
        if (!in_array($filters['sort'], $allowedSorts, true)) {
            $filters['sort'] = 'name';
        }

        $rows = StudentsSummaryExport::query($filters)->get();

        return response()->streamDownload(function () use ($rows) {
            $out = fopen('php://output', 'wb');
            if ($out === false) {
                return;
            }

            // UTF-8 BOM for Excel compatibility
            fwrite($out, "\xEF\xBB\xBF");

            fputcsv($out, StudentsSummaryExport::headings(), ';');

            foreach ($rows as $student) {
                fputcsv($out, StudentsSummaryExport::map($student), ';');
            }

            fclose($out);
        }, 'nilai-siswa.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function studentDetail(Student $student)
    {
        $printMode = request()->boolean('print');

        $activeTerm = Term::query()->where('is_active', true)->with('academicYear')->first();
        $classGroup = null;
        if ($activeTerm) {
            $enrollment = ClassEnrollment::query()
                ->with(['classGroup.homeroomTeacher'])
                ->where('student_id', $student->id)
                ->whereHas('classGroup', fn ($q) => $q->where('term_id', $activeTerm->id))
                ->first();

            $classGroup = $enrollment?->classGroup;
        }

        $settings = InstitutionSetting::first();
        $letterhead = $settings ? [
            'enabled' => (bool) ($settings->letterhead_enabled ?? false),
            'logoUrl' => $settings->logo_path ? Storage::url($settings->logo_path) : null,
            'line1' => $settings->letterhead_line1 ?? null,
            'line2' => $settings->letterhead_line2 ?? null,
            'line3' => $settings->letterhead_line3 ?? null,
            'schoolName' => $settings->name ?? null,
        ] : null;

        $scores = AssessmentScore::with(['assessment.teachingAssignment.subject', 'assessment.teachingAssignment.teacher'])
            ->where('student_id', $student->id)
            ->get()
            ->groupBy(fn($score) => $score->assessment->teachingAssignment->subject->name);

        $subjectAverages = $scores->map(function ($subjectScores) {
            $teacherName = $subjectScores
                ->map(fn ($score) => $score->assessment->teachingAssignment->teacher?->name)
                ->filter()
                ->unique()
                ->values()
                ->first();

            return [
                'scores' => $subjectScores->pluck('score'),
                'average' => round($subjectScores->avg('score'), 1),
                'teacher' => $teacherName,
            ];
        });

        $meta = [
            'date' => now()->toDateString(),
            'term' => $activeTerm?->name,
            'academicYear' => $activeTerm?->academicYear?->name,
            'classGroup' => $classGroup ? trim(($classGroup->level ? $classGroup->level . ' ' : '') . $classGroup->name) : null,
            'homeroomTeacher' => $classGroup?->homeroomTeacher?->name,
        ];

        return Inertia::render('reports/student-detail', [
            'student' => $student,
            'subjectAverages' => $subjectAverages,
            'printMode' => $printMode,
            'letterhead' => $letterhead,
            'meta' => $meta,
        ]);
    }

    public function scores(Request $request)
    {
        $activeTerm = Term::where('is_active', true)->with('academicYear')->first();
        $subjects = Subject::where('is_active', true)->orderBy('name')->get(['id', 'name']);
        $classGroups = $activeTerm
            ? ClassGroup::where('term_id', $activeTerm->id)->orderBy('level')->orderBy('name')->get(['id', 'name', 'level'])
            : collect();

        $classGroupId = $request->get('class_group_id');
        $subjectId = $request->get('subject_id');

        $scoresData = [];
        $statistics = null;

        if ($activeTerm && ($classGroupId || $subjectId)) {
            // Build query for scores per student per subject
            $query = DB::table('assessment_scores')
                ->join('assessments', 'assessment_scores.assessment_id', '=', 'assessments.id')
                ->join('teaching_assignments', 'assessments.teaching_assignment_id', '=', 'teaching_assignments.id')
                ->join('subjects', 'teaching_assignments.subject_id', '=', 'subjects.id')
                ->join('students', 'assessment_scores.student_id', '=', 'students.id')
                ->join('class_groups', 'teaching_assignments.class_group_id', '=', 'class_groups.id')
                ->where('teaching_assignments.term_id', $activeTerm->id)
                ->where('students.status', 'active')
                ->whereNull('assessments.deleted_at');

            if ($classGroupId) {
                $query->where('teaching_assignments.class_group_id', $classGroupId);
            }

            if ($subjectId) {
                $query->where('teaching_assignments.subject_id', $subjectId);
            }

            $rawScores = $query
                ->select(
                    'students.id as student_id',
                    'students.name as student_name',
                    'students.nis',
                    'subjects.id as subject_id',
                    'subjects.name as subject_name',
                    'class_groups.name as class_name',
                    'class_groups.level as class_level',
                    DB::raw('ROUND(AVG(assessment_scores.score), 1) as average'),
                    DB::raw('MAX(assessment_scores.score) as highest'),
                    DB::raw('MIN(assessment_scores.score) as lowest'),
                    DB::raw('COUNT(assessment_scores.id) as total_scores')
                )
                ->groupBy(
                    'students.id', 'students.name', 'students.nis',
                    'subjects.id', 'subjects.name',
                    'class_groups.name', 'class_groups.level'
                )
                ->orderBy('students.name')
                ->orderBy('subjects.name')
                ->get();

            // Get KKM values for this term
            $kkmValues = DB::table('subject_kkm')
                ->where('term_id', $activeTerm->id)
                ->pluck('kkm_value', 'subject_id');

            $scoresData = $rawScores->map(function ($row) use ($kkmValues) {
                $kkm = $kkmValues[$row->subject_id] ?? null;
                $avg = (float) $row->average;
                return [
                    'student_id' => $row->student_id,
                    'student_name' => $row->student_name,
                    'nis' => $row->nis,
                    'subject_id' => $row->subject_id,
                    'subject_name' => $row->subject_name,
                    'class_name' => trim(($row->class_level ? $row->class_level . ' ' : '') . $row->class_name),
                    'average' => $avg,
                    'highest' => (float) $row->highest,
                    'lowest' => (float) $row->lowest,
                    'total_scores' => (int) $row->total_scores,
                    'kkm' => $kkm ? (float) $kkm : null,
                    'passing' => $kkm ? $avg >= (float) $kkm : null,
                    'predicate' => \App\Models\SubjectKkm::getPredicate($avg),
                ];
            })->values()->toArray();

            // Calculate overall statistics
            if (count($scoresData) > 0) {
                $allAverages = array_column($scoresData, 'average');
                $passingCount = count(array_filter($scoresData, fn($s) => $s['passing'] === true));
                $totalWithKkm = count(array_filter($scoresData, fn($s) => $s['kkm'] !== null));

                // Distribution buckets
                $distribution = ['A' => 0, 'B' => 0, 'C' => 0, 'D' => 0, 'E' => 0];
                foreach ($scoresData as $s) {
                    $distribution[$s['predicate']]++;
                }

                $statistics = [
                    'average' => round(array_sum($allAverages) / count($allAverages), 1),
                    'highest' => round(max($allAverages), 1),
                    'lowest' => round(min($allAverages), 1),
                    'total_entries' => count($scoresData),
                    'pass_rate' => $totalWithKkm > 0 ? round(($passingCount / $totalWithKkm) * 100, 1) : null,
                    'distribution' => $distribution,
                ];
            }
        }

        return Inertia::render('reports/scores', [
            'subjects' => $subjects,
            'classGroups' => $classGroups,
            'activeTerm' => $activeTerm,
            'scoresData' => $scoresData,
            'statistics' => $statistics,
            'filters' => [
                'class_group_id' => $classGroupId,
                'subject_id' => $subjectId,
            ],
        ]);
    }

    public function exportScores(Request $request)
    {
        $activeTerm = Term::where('is_active', true)->first();
        if (!$activeTerm) {
            return back()->with('error', 'Tidak ada semester aktif');
        }

        $classGroupId = $request->get('class_group_id');
        $subjectId = $request->get('subject_id');

        $query = DB::table('assessment_scores')
            ->join('assessments', 'assessment_scores.assessment_id', '=', 'assessments.id')
            ->join('teaching_assignments', 'assessments.teaching_assignment_id', '=', 'teaching_assignments.id')
            ->join('subjects', 'teaching_assignments.subject_id', '=', 'subjects.id')
            ->join('students', 'assessment_scores.student_id', '=', 'students.id')
            ->join('class_groups', 'teaching_assignments.class_group_id', '=', 'class_groups.id')
            ->where('teaching_assignments.term_id', $activeTerm->id)
            ->where('students.status', 'active')
            ->whereNull('assessments.deleted_at');

        if ($classGroupId) {
            $query->where('teaching_assignments.class_group_id', $classGroupId);
        }
        if ($subjectId) {
            $query->where('teaching_assignments.subject_id', $subjectId);
        }

        $rows = $query
            ->select(
                'students.nis',
                'students.name as student_name',
                'subjects.name as subject_name',
                'class_groups.name as class_name',
                'class_groups.level as class_level',
                DB::raw('ROUND(AVG(assessment_scores.score), 1) as average'),
                DB::raw('COUNT(assessment_scores.id) as total_scores')
            )
            ->groupBy('students.id', 'students.nis', 'students.name', 'subjects.id', 'subjects.name', 'class_groups.name', 'class_groups.level')
            ->orderBy('students.name')
            ->orderBy('subjects.name')
            ->get();

        $kkmValues = DB::table('subject_kkm')
            ->where('term_id', $activeTerm->id)
            ->pluck('kkm_value', 'subject_id');

        return response()->streamDownload(function () use ($rows, $kkmValues) {
            $out = fopen('php://output', 'wb');
            if ($out === false) return;

            fwrite($out, "\xEF\xBB\xBF");
            fputcsv($out, ['NIS', 'Nama Siswa', 'Kelas', 'Mata Pelajaran', 'Rata-rata', 'Jumlah Nilai', 'KKM', 'Status', 'Predikat'], ';');

            foreach ($rows as $row) {
                $avg = (float) $row->average;
                $subjectKkm = null;
                // Find kkm by matching subject name to subject_id
                $kkm = null;
                $status = '-';
                if ($subjectKkm = DB::table('subject_kkm')
                    ->join('subjects', 'subject_kkm.subject_id', '=', 'subjects.id')
                    ->where('subjects.name', $row->subject_name)
                    ->where('subject_kkm.term_id', DB::table('terms')->where('is_active', true)->value('id'))
                    ->value('kkm_value')) {
                    $kkm = (float) $subjectKkm;
                    $status = $avg >= $kkm ? 'Lulus' : 'Tidak Lulus';
                }

                fputcsv($out, [
                    $row->nis,
                    $row->student_name,
                    trim(($row->class_level ? $row->class_level . ' ' : '') . $row->class_name),
                    $row->subject_name,
                    $avg,
                    $row->total_scores,
                    $kkm ?? '-',
                    $status,
                    \App\Models\SubjectKkm::getPredicate($avg),
                ], ';');
            }

            fclose($out);
        }, 'rekap-nilai.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
