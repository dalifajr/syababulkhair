<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\AssessmentScore;
use App\Models\AttendanceRecord;
use App\Models\ClassEnrollment;
use App\Models\ExtracurricularEnrollment;
use App\Models\HomeroomNote;
use App\Models\ReportCard;
use App\Models\Schedule;
use App\Models\Term;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParentPortalController extends Controller
{
    /**
     * Get the student linked to the current parent/student user
     */
    private function getStudent()
    {
        $user = auth()->user();
        
        if (!$user->student_id) {
            abort(403, 'Akun Anda belum terhubung dengan data siswa');
        }

        return $user->student;
    }

    /**
     * Dashboard utama portal orang tua
     */
    public function dashboard(): Response
    {
        $student = $this->getStudent();
        $activeTerm = Term::where('is_active', true)->first();

        // Get current enrollment
        $currentEnrollment = ClassEnrollment::where('student_id', $student->id)
            ->whereHas('classGroup', fn($q) => $q->where('term_id', $activeTerm?->id))
            ->with(['classGroup.homeroomTeacher', 'classGroup.term.academicYear'])
            ->first();

        // Get recent scores
        $recentScores = AssessmentScore::where('student_id', $student->id)
            ->with(['assessment.teachingAssignment.subject'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        // Get today's schedule
        $todaySchedules = collect();
        if ($currentEnrollment) {
            $todaySchedules = Schedule::whereHas('teachingAssignment', function ($q) use ($currentEnrollment) {
                $q->where('class_group_id', $currentEnrollment->class_group_id);
            })
                ->where('day_of_week', now()->dayOfWeekIso)
                ->with(['teachingAssignment.subject', 'teachingAssignment.teacher'])
                ->orderBy('start_time')
                ->get();
        }

        // Get announcements
        $announcements = Announcement::published()
            ->forAudience('parents')
            ->orderByDesc('is_pinned')
            ->orderByDesc('published_at')
            ->limit(5)
            ->get();

        // Get attendance summary
        $attendanceSummary = AttendanceRecord::where('student_id', $student->id)
            ->whereHas('attendanceSession.teachingAssignment', fn($q) => $q->where('term_id', $activeTerm?->id))
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = 'sick' THEN 1 ELSE 0 END) as sick,
                SUM(CASE WHEN status = 'permit' THEN 1 ELSE 0 END) as permit,
                SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent
            ")
            ->first();

        return Inertia::render('parent/dashboard', [
            'student' => $student,
            'currentEnrollment' => $currentEnrollment,
            'recentScores' => $recentScores,
            'todaySchedules' => $todaySchedules,
            'announcements' => $announcements,
            'attendanceSummary' => $attendanceSummary,
        ]);
    }

    /**
     * Lihat semua nilai siswa
     */
    public function scores(Request $request): Response
    {
        $student = $this->getStudent();
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);

        $terms = Term::with('academicYear')
            ->orderByDesc('starts_at')
            ->get();

        $scores = AssessmentScore::where('student_id', $student->id)
            ->whereHas('assessment.teachingAssignment', fn($q) => $q->where('term_id', $termId))
            ->with([
                'assessment.teachingAssignment.subject',
                'assessment.teachingAssignment.teacher',
            ])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('assessment.teachingAssignment.subject.name');

        return Inertia::render('parent/scores', [
            'student' => $student,
            'scores' => $scores,
            'terms' => $terms,
            'filters' => [
                'term_id' => $termId,
            ],
        ]);
    }

    /**
     * Lihat rekap kehadiran
     */
    public function attendance(Request $request): Response
    {
        $student = $this->getStudent();
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);

        $terms = Term::with('academicYear')
            ->orderByDesc('starts_at')
            ->get();

        $attendanceRecords = AttendanceRecord::where('student_id', $student->id)
            ->whereHas('attendanceSession.teachingAssignment', fn($q) => $q->where('term_id', $termId))
            ->with([
                'attendanceSession.teachingAssignment.subject',
            ])
            ->orderByDesc('created_at')
            ->get();

        // Summary per subject
        $summaryBySubject = $attendanceRecords->groupBy('attendanceSession.teachingAssignment.subject.name')
            ->map(function ($records) {
                return [
                    'total' => $records->count(),
                    'present' => $records->where('status', 'present')->count(),
                    'sick' => $records->where('status', 'sick')->count(),
                    'permit' => $records->where('status', 'permit')->count(),
                    'absent' => $records->where('status', 'absent')->count(),
                ];
            });

        return Inertia::render('parent/attendance', [
            'student' => $student,
            'attendanceRecords' => $attendanceRecords,
            'summaryBySubject' => $summaryBySubject,
            'terms' => $terms,
            'filters' => [
                'term_id' => $termId,
            ],
        ]);
    }

    /**
     * Lihat jadwal pelajaran
     */
    public function schedule(): Response
    {
        $student = $this->getStudent();
        $activeTerm = Term::where('is_active', true)->first();

        $currentEnrollment = ClassEnrollment::where('student_id', $student->id)
            ->whereHas('classGroup', fn($q) => $q->where('term_id', $activeTerm?->id))
            ->with('classGroup')
            ->first();

        $schedules = collect();
        if ($currentEnrollment) {
            $schedules = Schedule::whereHas('teachingAssignment', function ($q) use ($currentEnrollment) {
                $q->where('class_group_id', $currentEnrollment->class_group_id);
            })
                ->with(['teachingAssignment.subject', 'teachingAssignment.teacher'])
                ->orderBy('day_of_week')
                ->orderBy('start_time')
                ->get()
                ->groupBy('day_of_week');
        }

        return Inertia::render('parent/schedule', [
            'student' => $student,
            'currentEnrollment' => $currentEnrollment,
            'schedules' => $schedules,
            'days' => Schedule::DAYS,
        ]);
    }

    /**
     * Lihat ekstrakurikuler siswa
     */
    public function extracurriculars(Request $request): Response
    {
        $student = $this->getStudent();
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);

        $terms = Term::with('academicYear')
            ->orderByDesc('starts_at')
            ->get();

        $enrollments = ExtracurricularEnrollment::where('student_id', $student->id)
            ->where('term_id', $termId)
            ->with('extracurricular')
            ->get();

        return Inertia::render('parent/extracurriculars', [
            'student' => $student,
            'enrollments' => $enrollments,
            'terms' => $terms,
            'filters' => [
                'term_id' => $termId,
            ],
        ]);
    }

    /**
     * Lihat rapor
     */
    public function reportCards(Request $request): Response
    {
        $student = $this->getStudent();

        $reportCards = ReportCard::whereHas('classEnrollment', fn($q) => $q->where('student_id', $student->id))
            ->with([
                'classEnrollment.classGroup.term.academicYear',
                'term',
            ])
            ->orderByDesc('term_id')
            ->get();

        return Inertia::render('parent/report-cards', [
            'student' => $student,
            'reportCards' => $reportCards,
        ]);
    }

    /**
     * Lihat detail rapor
     */
    public function reportCardDetail(ReportCard $reportCard): Response
    {
        $student = $this->getStudent();

        // Pastikan rapor milik siswa yang benar
        if ($reportCard->classEnrollment->student_id !== $student->id) {
            abort(403, 'Anda tidak memiliki akses ke rapor ini');
        }

        $reportCard->load([
            'classEnrollment.student',
            'classEnrollment.classGroup.homeroomTeacher',
            'classEnrollment.classGroup.term.academicYear',
            'subjects.subject',
        ]);

        $homeroomNote = HomeroomNote::where('class_enrollment_id', $reportCard->class_enrollment_id)
            ->where('term_id', $reportCard->term_id)
            ->first();

        return Inertia::render('parent/report-card-detail', [
            'reportCard' => $reportCard,
            'homeroomNote' => $homeroomNote,
        ]);
    }

    /**
     * Lihat pengumuman
     */
    public function announcements(): Response
    {
        $announcements = Announcement::published()
            ->forAudience('parents')
            ->orderByDesc('is_pinned')
            ->orderByDesc('published_at')
            ->paginate(10);

        return Inertia::render('parent/announcements', [
            'announcements' => $announcements,
        ]);
    }

    /**
     * Lihat detail pengumuman
     */
    public function announcementDetail(Announcement $announcement): Response
    {
        if (!$announcement->is_published) {
            abort(404);
        }

        return Inertia::render('parent/announcement-detail', [
            'announcement' => $announcement,
        ]);
    }
}
