<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentScore;
use App\Models\ClassEnrollment;
use App\Models\InstitutionSetting;
use App\Models\Student;
use App\Models\TeachingAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    private function authorizeAssignment(TeachingAssignment $assignment): void
    {
        $user = auth()->user();

        if ($user?->role !== 'admin' && $assignment->teacher_user_id !== $user?->id) {
            abort(403);
        }
    }

    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Get teaching assignments for current user
        $query = TeachingAssignment::with(['term.academicYear', 'classGroup', 'subject'])
            ->whereHas('term', fn($q) => $q->where('is_active', true));
        
        if ($user->role !== 'admin') {
            $query->where('teacher_user_id', $user->id);
        }

        $assignments = $query->orderBy('created_at', 'desc')->paginate(10);

        $stats = [
            'total_assignments' => $query->count(),
            'total_assessments' => Assessment::count(),
            'total_scores' => AssessmentScore::count(),
        ];

        return Inertia::render('assessments/index', [
            'assignments' => $assignments,
            'stats' => $stats,
        ]);
    }

    public function show(TeachingAssignment $assignment)
    {
        $this->authorizeAssignment($assignment);

        $assignment->load(['term.academicYear', 'classGroup', 'subject', 'teacher']);

        $studentsCount = ClassEnrollment::query()
            ->where('class_group_id', $assignment->class_group_id)
            ->count();

        $tasksCount = $assignment->assessments()->count();
        $attendanceSessionsCount = $assignment->attendanceSessions()->count();

        return Inertia::render('assessments/show', [
            'assignment' => $assignment,
            'stats' => [
                'students_count' => $studentsCount,
                'tasks_count' => $tasksCount,
                'attendance_sessions_count' => $attendanceSessionsCount,
            ],
        ]);
    }

    public function students(TeachingAssignment $assignment)
    {
        $this->authorizeAssignment($assignment);

        $printMode = request()->boolean('print');

        $assignment->load(['term.academicYear', 'classGroup', 'subject', 'teacher']);

        $students = ClassEnrollment::with('student')
            ->where('class_group_id', $assignment->class_group_id)
            ->get()
            ->pluck('student')
            ->filter()
            ->values();

        $enrolledStudentIds = $students->pluck('id')->filter()->values();

        $availableStudents = Student::query()
            ->where('status', 'active')
            ->when($enrolledStudentIds->isNotEmpty(), fn ($q) => $q->whereNotIn('id', $enrolledStudentIds))
            ->orderBy('name')
            ->get(['id', 'nis', 'name']);

        $settings = InstitutionSetting::first();
        $letterhead = $settings ? [
            'enabled' => (bool) ($settings->letterhead_enabled ?? false),
            'logoUrl' => $settings->logo_path ? Storage::url($settings->logo_path) : null,
            'line1' => $settings->letterhead_line1 ?? null,
            'line2' => $settings->letterhead_line2 ?? null,
            'line3' => $settings->letterhead_line3 ?? null,
            'schoolName' => $settings->name ?? null,
        ] : null;

        $meta = [
            'date' => now()->toDateString(),
            'term' => $assignment->term?->name,
            'academicYear' => $assignment->term?->academicYear?->name,
            'classGroup' => $assignment->classGroup ? trim(($assignment->classGroup->level ? $assignment->classGroup->level . ' ' : '') . $assignment->classGroup->name) : null,
            'subject' => $assignment->subject?->name,
            'teacher' => $assignment->teacher?->name,
        ];

        return Inertia::render('assessments/students', [
            'assignment' => $assignment,
            'students' => $students,
            'availableStudents' => $availableStudents,
            'printMode' => $printMode,
            'letterhead' => $letterhead,
            'meta' => $meta,
        ]);
    }

    public function tasks(TeachingAssignment $assignment)
    {
        $this->authorizeAssignment($assignment);

        $assignment->load(['term.academicYear', 'classGroup', 'subject', 'teacher', 'assessments']);

        $studentsCount = ClassEnrollment::query()
            ->where('class_group_id', $assignment->class_group_id)
            ->count();

        return Inertia::render('assessments/tasks', [
            'assignment' => $assignment,
            'studentsCount' => $studentsCount,
        ]);
    }

    public function addStudents(Request $request, TeachingAssignment $assignment)
    {
        $this->authorizeAssignment($assignment);

        $validated = $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'required|integer|exists:students,id',
        ]);

        $now = now();
        $rows = collect($validated['student_ids'])
            ->unique()
            ->map(fn ($studentId) => [
                'class_group_id' => $assignment->class_group_id,
                'student_id' => $studentId,
                'created_at' => $now,
                'updated_at' => $now,
            ])
            ->all();

        // Unique constraint on (class_group_id, student_id) will prevent duplicates.
        ClassEnrollment::insertOrIgnore($rows);

        return back()->with('success', 'Siswa berhasil ditambahkan');
    }

    public function createAssessment(TeachingAssignment $assignment)
    {
        return Inertia::render('assessments/create', [
            'assignment' => $assignment->load(['term.academicYear', 'classGroup', 'subject']),
            'categories' => Assessment::CATEGORIES,
        ]);
    }

    public function storeAssessment(Request $request, TeachingAssignment $assignment)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'category' => 'required|in:tugas,quiz,uts,uas,praktik',
            'weight' => 'nullable|integer|min:1|max:100',
            'description' => 'nullable|string|max:1000',
            'max_score' => 'required|numeric|min:1|max:1000',
            'date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $validated['teaching_assignment_id'] = $assignment->id;
        $validated['weight'] = $validated['weight'] ?? 100;

        Assessment::create($validated);

        return redirect()->route('assessments.show', $assignment)
            ->with('success', 'Penilaian berhasil ditambahkan');
    }

    public function inputScores(Assessment $assessment)
    {
        $assessment->load(['teachingAssignment.classGroup', 'teachingAssignment.subject', 'scores']);
        
        // Get students enrolled in this class
        $students = ClassEnrollment::with('student')
            ->where('class_group_id', $assessment->teachingAssignment->class_group_id)
            ->get()
            ->map(function ($enrollment) use ($assessment) {
                $score = $assessment->scores->firstWhere('student_id', $enrollment->student_id);
                return [
                    'student' => $enrollment->student,
                    'score' => $score?->score,
                    'note' => $score?->note,
                    'score_id' => $score?->id,
                ];
            });

        return Inertia::render('assessments/input-scores', [
            'assessment' => $assessment,
            'students' => $students,
        ]);
    }

    public function saveScores(Request $request, Assessment $assessment)
    {
        $validated = $request->validate([
            'scores' => 'required|array',
            'scores.*.student_id' => 'required|exists:students,id',
            'scores.*.score' => 'nullable|numeric|min:0|max:' . $assessment->max_score,
            'scores.*.note' => 'nullable|string|max:500',
        ]);

        foreach ($validated['scores'] as $scoreData) {
            if ($scoreData['score'] !== null) {
                AssessmentScore::updateOrCreate(
                    [
                        'assessment_id' => $assessment->id,
                        'student_id' => $scoreData['student_id'],
                    ],
                    [
                        'score' => $scoreData['score'],
                        'note' => $scoreData['note'] ?? null,
                        'recorded_by_user_id' => auth()->id(),
                    ]
                );
            }
        }

        return back()->with('success', 'Nilai berhasil disimpan');
    }

    /**
     * Download template for bulk score import
     */
    public function downloadScoresTemplate(Assessment $assessment)
    {
        $assessment->load('teachingAssignment.classGroup');
        
        return \Maatwebsite\Excel\Facades\Excel::download(
            new \App\Exports\ScoresTemplateExport($assessment),
            'template_nilai_' . $assessment->id . '.xlsx'
        );
    }

    /**
     * Import scores from Excel/CSV
     */
    public function importScores(Request $request, Assessment $assessment)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt,xlsx,xls', 'max:5120'],
        ]);

        $import = new \App\Imports\ScoresImport($assessment);
        
        \Maatwebsite\Excel\Facades\Excel::import($import, $request->file('file'));

        $message = "Berhasil mengimport {$import->imported} nilai.";
        if ($import->skipped > 0) {
            $message .= " {$import->skipped} baris dilewati.";
        }

        if (!empty($import->errors)) {
            return back()
                ->with('warning', $message)
                ->with('import_errors', $import->errors);
        }

        return back()->with('success', $message);
    }

    public function destroyAssessment(Assessment $assessment)
    {
        $assessment->load('teachingAssignment');

        $user = auth()->user();
        if ($user?->role !== 'admin' && $assessment->teachingAssignment?->teacher_user_id !== $user?->id) {
            abort(403);
        }

        $assignment = $assessment->teachingAssignment;
        $assessment->delete();

        return redirect()->route('assessments.show', $assignment)
            ->with('success', 'Penilaian berhasil dihapus');
    }
}
