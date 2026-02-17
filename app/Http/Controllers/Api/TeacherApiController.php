<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\AssessmentScore;
use App\Models\AttendanceRecord;
use App\Models\AttendanceSession;
use App\Models\ClassEnrollment;
use App\Models\TeachingAssignment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeacherApiController extends Controller
{
    /**
     * Get teacher's teaching assignments
     */
    public function assignments(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!in_array($user->role, ['teacher', 'admin'])) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $assignments = TeachingAssignment::query()
            ->when($user->role === 'teacher', fn($q) => $q->where('teacher_user_id', $user->id))
            ->with([
                'classGroup:id,name,level,stage',
                'subject:id,name',
                'term:id,name',
            ])
            ->whereHas('term', fn($q) => $q->where('is_active', true))
            ->get();

        return response()->json([
            'assignments' => $assignments,
        ]);
    }

    /**
     * Get students in a teaching assignment
     */
    public function students(TeachingAssignment $assignment, Request $request): JsonResponse
    {
        $user = $request->user();

        // Check authorization
        if ($user->role === 'teacher' && $assignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $students = ClassEnrollment::where('class_group_id', $assignment->class_group_id)
            ->with('student:id,nis,name,gender')
            ->get()
            ->pluck('student');

        return response()->json([
            'students' => $students,
        ]);
    }

    /**
     * Get assessments for a teaching assignment
     */
    public function assessments(TeachingAssignment $assignment, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $assignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $assessments = Assessment::where('teaching_assignment_id', $assignment->id)
            ->withCount('scores')
            ->orderByDesc('date')
            ->get();

        return response()->json([
            'assessments' => $assessments,
            'categories' => Assessment::CATEGORIES,
        ]);
    }

    /**
     * Create a new assessment
     */
    public function storeAssessment(TeachingAssignment $assignment, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $assignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:tugas,quiz,uts,uas,praktik'],
            'weight' => ['nullable', 'integer', 'min:1', 'max:100'],
            'max_score' => ['required', 'integer', 'min:1', 'max:1000'],
            'description' => ['nullable', 'string', 'max:1000'],
            'date' => ['nullable', 'date'],
            'is_published' => ['boolean'],
        ]);

        $assessment = $assignment->assessments()->create($validated);

        return response()->json([
            'message' => 'Penilaian berhasil dibuat',
            'assessment' => $assessment,
        ], 201);
    }

    /**
     * Get scores for an assessment
     */
    public function scores(Assessment $assessment, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $assessment->teachingAssignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $students = ClassEnrollment::where('class_group_id', $assessment->teachingAssignment->class_group_id)
            ->with([
                'student:id,nis,name',
            ])
            ->get()
            ->map(function ($enrollment) use ($assessment) {
                $score = AssessmentScore::where('assessment_id', $assessment->id)
                    ->where('student_id', $enrollment->student_id)
                    ->first();

                return [
                    'student_id' => $enrollment->student_id,
                    'student' => $enrollment->student,
                    'score' => $score?->score,
                    'note' => $score?->note,
                ];
            });

        return response()->json([
            'assessment' => $assessment,
            'students' => $students,
        ]);
    }

    /**
     * Save scores for an assessment
     */
    public function saveScores(Assessment $assessment, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $assessment->teachingAssignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $validated = $request->validate([
            'scores' => ['required', 'array'],
            'scores.*.student_id' => ['required', 'exists:students,id'],
            'scores.*.score' => ['nullable', 'numeric', 'min:0', 'max:' . $assessment->max_score],
            'scores.*.note' => ['nullable', 'string', 'max:500'],
        ]);

        DB::beginTransaction();

        try {
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
                            'recorded_by_user_id' => $user->id,
                        ]
                    );
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Nilai berhasil disimpan',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Gagal menyimpan nilai: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get attendance sessions for a teaching assignment
     */
    public function attendanceSessions(TeachingAssignment $assignment, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $assignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $sessions = AttendanceSession::where('teaching_assignment_id', $assignment->id)
            ->withCount([
                'records',
                'records as present_count' => fn($q) => $q->where('status', 'present'),
                'records as absent_count' => fn($q) => $q->where('status', 'absent'),
            ])
            ->orderByDesc('meeting_date')
            ->get();

        return response()->json([
            'sessions' => $sessions,
        ]);
    }

    /**
     * Create attendance session
     */
    public function storeAttendanceSession(TeachingAssignment $assignment, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $assignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $validated = $request->validate([
            'meeting_date' => ['required', 'date'],
            'topic' => ['nullable', 'string', 'max:255'],
        ]);

        $session = $assignment->attendanceSessions()->create($validated);

        // Pre-create attendance records for all students with unmarked status
        $studentIds = ClassEnrollment::where('class_group_id', $assignment->class_group_id)
            ->pluck('student_id');

        foreach ($studentIds as $studentId) {
            AttendanceRecord::create([
                'attendance_session_id' => $session->id,
                'student_id' => $studentId,
                'status' => 'unmarked',
            ]);
        }

        return response()->json([
            'message' => 'Sesi absensi berhasil dibuat',
            'session' => $session,
        ], 201);
    }

    /**
     * Get attendance records for a session
     */
    public function attendanceRecords(AttendanceSession $session, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $session->teachingAssignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $records = AttendanceRecord::where('attendance_session_id', $session->id)
            ->with('student:id,nis,name')
            ->get();

        return response()->json([
            'session' => $session,
            'records' => $records,
        ]);
    }

    /**
     * Update attendance records
     */
    public function updateAttendance(AttendanceSession $session, Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'teacher' && $session->teachingAssignment->teacher_user_id !== $user->id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $validated = $request->validate([
            'records' => ['required', 'array'],
            'records.*.student_id' => ['required', 'exists:students,id'],
            'records.*.status' => ['required', 'in:present,absent,sick,permit,unmarked'],
            'records.*.note' => ['nullable', 'string', 'max:500'],
        ]);

        DB::beginTransaction();

        try {
            foreach ($validated['records'] as $recordData) {
                AttendanceRecord::updateOrCreate(
                    [
                        'attendance_session_id' => $session->id,
                        'student_id' => $recordData['student_id'],
                    ],
                    [
                        'status' => $recordData['status'],
                        'note' => $recordData['note'] ?? null,
                    ]
                );
            }

            DB::commit();

            return response()->json([
                'message' => 'Absensi berhasil disimpan',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Gagal menyimpan absensi: ' . $e->getMessage(),
            ], 500);
        }
    }
}
