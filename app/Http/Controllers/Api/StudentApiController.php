<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\AssessmentScore;
use App\Models\AttendanceRecord;
use App\Models\ClassEnrollment;
use App\Models\ReportCard;
use App\Models\Schedule;
use App\Models\Term;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentApiController extends Controller
{
    /**
     * Get student dashboard data
     */
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->student_id) {
            return response()->json([
                'error' => 'Akun tidak terhubung dengan data siswa',
            ], 403);
        }

        $student = $user->student;
        $activeTerm = Term::where('is_active', true)->first();

        // Get current enrollment
        $currentEnrollment = ClassEnrollment::where('student_id', $student->id)
            ->whereHas('classGroup', fn($q) => $q->where('term_id', $activeTerm?->id))
            ->with(['classGroup.homeroomTeacher', 'classGroup.term.academicYear'])
            ->first();

        // Get score statistics
        $scoreStats = AssessmentScore::where('student_id', $student->id)
            ->whereHas('assessment.teachingAssignment', fn($q) => $q->where('term_id', $activeTerm?->id))
            ->selectRaw('AVG(score) as average, COUNT(*) as total')
            ->first();

        // Get attendance statistics
        $attendanceStats = AttendanceRecord::where('student_id', $student->id)
            ->whereHas('attendanceSession.teachingAssignment', fn($q) => $q->where('term_id', $activeTerm?->id))
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = 'sick' THEN 1 ELSE 0 END) as sick,
                SUM(CASE WHEN status = 'permit' THEN 1 ELSE 0 END) as permit,
                SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent
            ")
            ->first();

        return response()->json([
            'student' => $student,
            'current_enrollment' => $currentEnrollment,
            'score_stats' => $scoreStats,
            'attendance_stats' => $attendanceStats,
        ]);
    }

    /**
     * Get student scores
     */
    public function scores(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->student_id) {
            return response()->json(['error' => 'Akun tidak terhubung dengan data siswa'], 403);
        }

        $termId = $request->get('term_id');
        if (!$termId) {
            $activeTerm = Term::where('is_active', true)->first();
            $termId = $activeTerm?->id;
        }

        $scores = AssessmentScore::where('student_id', $user->student_id)
            ->when($termId, function ($q) use ($termId) {
                $q->whereHas('assessment.teachingAssignment', fn($q) => $q->where('term_id', $termId));
            })
            ->with([
                'assessment:id,teaching_assignment_id,name,category,max_score,date',
                'assessment.teachingAssignment:id,subject_id',
                'assessment.teachingAssignment.subject:id,name',
            ])
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'scores' => $scores,
        ]);
    }

    /**
     * Get student attendance records
     */
    public function attendance(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->student_id) {
            return response()->json(['error' => 'Akun tidak terhubung dengan data siswa'], 403);
        }

        $termId = $request->get('term_id');
        if (!$termId) {
            $activeTerm = Term::where('is_active', true)->first();
            $termId = $activeTerm?->id;
        }

        $records = AttendanceRecord::where('student_id', $user->student_id)
            ->when($termId, function ($q) use ($termId) {
                $q->whereHas('attendanceSession.teachingAssignment', fn($q) => $q->where('term_id', $termId));
            })
            ->with([
                'attendanceSession:id,teaching_assignment_id,meeting_date,topic',
                'attendanceSession.teachingAssignment:id,subject_id',
                'attendanceSession.teachingAssignment.subject:id,name',
            ])
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'attendance' => $records,
        ]);
    }

    /**
     * Get student schedule
     */
    public function schedule(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->student_id) {
            return response()->json(['error' => 'Akun tidak terhubung dengan data siswa'], 403);
        }

        $activeTerm = Term::where('is_active', true)->first();
        
        $currentEnrollment = ClassEnrollment::where('student_id', $user->student_id)
            ->whereHas('classGroup', fn($q) => $q->where('term_id', $activeTerm?->id))
            ->first();

        if (!$currentEnrollment) {
            return response()->json(['schedules' => []]);
        }

        $schedules = Schedule::whereHas('teachingAssignment', function ($q) use ($currentEnrollment) {
            $q->where('class_group_id', $currentEnrollment->class_group_id);
        })
            ->with([
                'teachingAssignment:id,subject_id,teacher_user_id',
                'teachingAssignment.subject:id,name',
                'teachingAssignment.teacher:id,name',
            ])
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'schedules' => $schedules,
            'days' => Schedule::DAYS,
        ]);
    }

    /**
     * Get student report cards
     */
    public function reportCards(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->student_id) {
            return response()->json(['error' => 'Akun tidak terhubung dengan data siswa'], 403);
        }

        $reportCards = ReportCard::whereHas('classEnrollment', fn($q) => $q->where('student_id', $user->student_id))
            ->with([
                'term:id,name',
                'classEnrollment.classGroup:id,name,level',
            ])
            ->orderByDesc('term_id')
            ->get();

        return response()->json([
            'report_cards' => $reportCards,
        ]);
    }

    /**
     * Get report card detail
     */
    public function reportCardDetail(ReportCard $reportCard, Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->student_id) {
            return response()->json(['error' => 'Akun tidak terhubung dengan data siswa'], 403);
        }

        // Check ownership
        if ($reportCard->classEnrollment->student_id !== $user->student_id) {
            return response()->json(['error' => 'Tidak memiliki akses'], 403);
        }

        $reportCard->load([
            'subjects.subject:id,name',
            'classEnrollment.classGroup.homeroomTeacher:id,name',
            'term',
        ]);

        return response()->json([
            'report_card' => $reportCard,
        ]);
    }

    /**
     * Get announcements for mobile
     */
    public function announcements(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $audience = match ($user->role) {
            'parent' => 'parents',
            'student' => 'students',
            default => 'teachers',
        };

        $announcements = Announcement::published()
            ->forAudience($audience)
            ->orderByDesc('is_pinned')
            ->orderByDesc('published_at')
            ->paginate(15);

        return response()->json($announcements);
    }
}
