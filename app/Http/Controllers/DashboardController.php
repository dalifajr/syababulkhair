<?php

namespace App\Http\Controllers;

use App\Models\AssessmentScore;
use App\Models\AttendanceRecord;
use App\Models\ClassGroup;
use App\Models\Extracurricular;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Term;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Get current term
        $currentTerm = Term::where('is_active', true)->first();

        // Basic statistics
        $totalStudents = Student::where('status', 'active')->count();
        $totalSubjects = Subject::where('is_active', true)->count();
        $totalScores = AssessmentScore::count();
        $totalClasses = ClassGroup::count();
        $totalTeachers = User::where('role', 'teacher')->count();

        // Calculate average score
        $averageScore = AssessmentScore::avg('score') ?? 0;

        // Attendance rate
        $totalAttendance = AttendanceRecord::when($currentTerm, fn($q) => 
            $q->whereHas('attendanceSession.teachingAssignment', fn($sq) => $sq->where('term_id', $currentTerm->id))
        )->count();
        $presentCount = AttendanceRecord::where('status', 'present')
            ->when($currentTerm, fn($q) => 
                $q->whereHas('attendanceSession.teachingAssignment', fn($sq) => $sq->where('term_id', $currentTerm->id))
            )->count();
        $attendanceRate = $totalAttendance > 0 ? round(($presentCount / $totalAttendance) * 100, 1) : 0;

        // Extracurriculars count
        $totalExtracurriculars = Extracurricular::where('is_active', true)->count();

        // Get growth percentages (comparing to previous month)
        $lastMonthStudents = Student::where('status', 'active')
            ->where('created_at', '<', now()->subMonth())
            ->count();
        $studentGrowth = $lastMonthStudents > 0 
            ? round((($totalStudents - $lastMonthStudents) / $lastMonthStudents) * 100, 1)
            : 0;

        $lastMonthScores = AssessmentScore::where('created_at', '<', now()->subMonth())->count();
        $scoreGrowth = $totalScores - $lastMonthScores;

        // Get top subjects by average score
        $topSubjects = DB::table('assessment_scores')
            ->join('assessments', 'assessment_scores.assessment_id', '=', 'assessments.id')
            ->join('teaching_assignments', 'assessments.teaching_assignment_id', '=', 'teaching_assignments.id')
            ->join('subjects', 'teaching_assignments.subject_id', '=', 'subjects.id')
            ->select('subjects.name', DB::raw('ROUND(AVG(assessment_scores.score), 1) as average_score'))
            ->groupBy('subjects.id', 'subjects.name')
            ->orderByDesc('average_score')
            ->limit(5)
            ->get()
            ->map(fn($item) => [
                'name' => $item->name,
                'score' => (float) $item->average_score,
            ])
            ->toArray();

        // If no data, provide placeholder subjects
        if (empty($topSubjects)) {
            $topSubjects = Subject::where('is_active', true)
                ->limit(5)
                ->get()
                ->map(fn($subject) => [
                    'name' => $subject->name,
                    'score' => 0,
                ])
                ->toArray();
        }

        // Get recent activities
        $recentActivities = collect();

        // Recent score entries
        $recentScores = AssessmentScore::with(['assessment.teachingAssignment.subject', 'assessment.teachingAssignment.classGroup'])
            ->latest()
            ->limit(3)
            ->get()
            ->map(fn($score) => [
                'type' => 'score',
                'title' => 'Nilai ' . ($score->assessment?->teachingAssignment?->subject?->name ?? 'Mata Pelajaran') . ' diperbarui',
                'description' => $score->assessment?->teachingAssignment?->classGroup?->name ?? 'Kelas',
                'time' => $score->created_at->diffForHumans(),
                'created_at' => $score->created_at,
            ]);

        // Recent students
        $recentStudents = Student::latest()
            ->limit(2)
            ->get()
            ->map(fn($student) => [
                'type' => 'student',
                'title' => 'Siswa baru ditambahkan',
                'description' => $student->name,
                'time' => $student->created_at->diffForHumans(),
                'created_at' => $student->created_at,
            ]);

        $recentActivities = $recentScores->concat($recentStudents)
            ->sortByDesc('created_at')
            ->take(4)
            ->values()
            ->map(fn($item) => [
                'title' => $item['title'],
                'description' => $item['description'],
                'time' => $item['time'],
                'type' => $item['type'],
            ])
            ->toArray();

        // Academic info
        $academicInfo = [
            'currentYear' => $currentTerm?->academicYear?->name ?? date('Y') . '/' . (date('Y') + 1),
            'currentSemester' => $currentTerm?->name ?? 'Genap',
            'totalClasses' => $totalClasses,
            'totalTeachers' => $totalTeachers,
        ];

        return Inertia::render('dashboard', [
            'stats' => [
                'totalStudents' => $totalStudents,
                'totalSubjects' => $totalSubjects,
                'totalScores' => $totalScores,
                'averageScore' => round($averageScore, 1),
                'studentGrowth' => $studentGrowth,
                'scoreGrowth' => $scoreGrowth,
                'attendanceRate' => $attendanceRate,
                'totalExtracurriculars' => $totalExtracurriculars,
            ],
            'topSubjects' => $topSubjects,
            'recentActivities' => $recentActivities,
            'academicInfo' => $academicInfo,
        ]);
    }
}
