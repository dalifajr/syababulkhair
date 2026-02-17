<?php

namespace App\Http\Controllers;

use App\Models\AttendanceRecord;
use App\Models\AttendanceSession;
use App\Models\ClassEnrollment;
use App\Models\ClassGroup;
use App\Models\InstitutionSetting;
use App\Models\TeachingAssignment;
use App\Models\Term;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    private function authorizeAssignment(TeachingAssignment $assignment): void
    {
        $user = auth()->user();

        if ($user?->role !== 'admin' && $assignment->teacher_user_id !== $user?->id) {
            abort(403);
        }
    }

    public function index(TeachingAssignment $assignment)
    {
        $this->authorizeAssignment($assignment);

        $assignment->load(['term.academicYear', 'classGroup', 'subject', 'teacher']);

        $students = ClassEnrollment::with('student')
            ->where('class_group_id', $assignment->class_group_id)
            ->get()
            ->pluck('student')
            ->filter()
            ->values();

        $sessions = AttendanceSession::query()
            ->where('teaching_assignment_id', $assignment->id)
            ->withCount([
                'records as total_count',
                'records as present_count' => fn ($q) => $q->where('status', 'present'),
                'records as absent_count' => fn ($q) => $q->where('status', 'absent'),
                'records as sick_count' => fn ($q) => $q->where('status', 'sick'),
                'records as permit_count' => fn ($q) => $q->where('status', 'permit'),
                'records as unmarked_count' => fn ($q) => $q->where('status', 'unmarked'),
            ])
            ->orderByDesc('meeting_date')
            ->get();

        return Inertia::render('assessments/attendance/index', [
            'assignment' => $assignment,
            'studentsCount' => $students->count(),
            'sessions' => $sessions,
        ]);
    }

    public function store(Request $request, TeachingAssignment $assignment)
    {
        $this->authorizeAssignment($assignment);

        $validated = $request->validate([
            'meeting_date' => 'required|date',
            'topic' => 'nullable|string|max:255',
        ]);

        $session = AttendanceSession::firstOrCreate(
            [
                'teaching_assignment_id' => $assignment->id,
                'meeting_date' => $validated['meeting_date'],
            ],
            [
                'topic' => $validated['topic'] ?? null,
            ]
        );

        if (($validated['topic'] ?? null) && $session->wasRecentlyCreated === false && $session->topic !== $validated['topic']) {
            $session->update(['topic' => $validated['topic']]);
        }

        // Ensure records exist for all students in the class.
        $studentIds = ClassEnrollment::query()
            ->where('class_group_id', $assignment->class_group_id)
            ->pluck('student_id')
            ->values();

        $now = now();
        $rows = $studentIds
            ->map(fn ($studentId) => [
                'attendance_session_id' => $session->id,
                'student_id' => $studentId,
                'status' => 'unmarked',
                'created_at' => $now,
                'updated_at' => $now,
            ])
            ->all();

        AttendanceRecord::insertOrIgnore($rows);

        return redirect()->route('assessments.attendance.show', [$assignment, $session])
            ->with('success', 'Pertemuan absensi dibuat');
    }

    public function show(TeachingAssignment $assignment, AttendanceSession $session)
    {
        $this->authorizeAssignment($assignment);

        $printMode = request()->boolean('print');

        if ((int) $session->teaching_assignment_id !== (int) $assignment->id) {
            abort(404);
        }

        $assignment->load(['term.academicYear', 'classGroup', 'subject', 'teacher']);

        $students = ClassEnrollment::with('student')
            ->where('class_group_id', $assignment->class_group_id)
            ->get()
            ->pluck('student')
            ->filter()
            ->values();

        // Ensure records exist.
        $existingRecords = AttendanceRecord::query()
            ->where('attendance_session_id', $session->id)
            ->get()
            ->keyBy('student_id');

        $userId = auth()->id();
        $now = now();
        $missingRows = $students
            ->filter(fn ($s) => !$existingRecords->has($s->id))
            ->map(fn ($s) => [
                'attendance_session_id' => $session->id,
                'student_id' => $s->id,
                'status' => 'unmarked',
                'recorded_by_user_id' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ])
            ->all();

        AttendanceRecord::insertOrIgnore($missingRows);

        $records = AttendanceRecord::query()
            ->where('attendance_session_id', $session->id)
            ->get()
            ->keyBy('student_id');

        $rows = $students->map(function ($student) use ($records) {
            $record = $records->get($student->id);

            return [
                'student' => $student,
                'status' => $record?->status ?? 'unmarked',
                'note' => $record?->note,
            ];
        })->values();

        $summary = [
            'total' => $records->count(),
            'present' => $records->where('status', 'present')->count(),
            'absent' => $records->where('status', 'absent')->count(),
            'sick' => $records->where('status', 'sick')->count(),
            'permit' => $records->where('status', 'permit')->count(),
            'unmarked' => $records->where('status', 'unmarked')->count(),
        ];

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
            'date' => $session->meeting_date,
            'term' => $assignment->term?->name,
            'academicYear' => $assignment->term?->academicYear?->name,
            'classGroup' => $assignment->classGroup ? trim(($assignment->classGroup->level ? $assignment->classGroup->level . ' ' : '') . $assignment->classGroup->name) : null,
            'subject' => $assignment->subject?->name,
            'teacher' => $assignment->teacher?->name,
            'topic' => $session->topic,
        ];

        return Inertia::render('assessments/attendance/show', [
            'assignment' => $assignment,
            'session' => $session,
            'rows' => $rows,
            'summary' => $summary,
            'printMode' => $printMode,
            'letterhead' => $letterhead,
            'meta' => $meta,
        ]);
    }

    public function update(Request $request, TeachingAssignment $assignment, AttendanceSession $session)
    {
        $this->authorizeAssignment($assignment);

        if ((int) $session->teaching_assignment_id !== (int) $assignment->id) {
            abort(404);
        }

        $validated = $request->validate([
            'records' => 'required|array',
            'records.*.student_id' => 'required|integer|exists:students,id',
            'records.*.status' => 'required|in:unmarked,present,absent,sick,permit',
            'records.*.note' => 'nullable|string|max:255',
        ]);

        $allowedStudentIds = ClassEnrollment::query()
            ->where('class_group_id', $assignment->class_group_id)
            ->pluck('student_id')
            ->flip();

        $userId = auth()->id();

        foreach ($validated['records'] as $recordData) {
            if (!$allowedStudentIds->has($recordData['student_id'])) {
                continue;
            }

            AttendanceRecord::updateOrCreate(
                [
                    'attendance_session_id' => $session->id,
                    'student_id' => $recordData['student_id'],
                ],
                [
                    'status' => $recordData['status'],
                    'note' => $recordData['note'] ?? null,
                    'recorded_by_user_id' => $userId,
                ]
            );
        }

        return back()->with('success', 'Absensi berhasil disimpan');
    }

    public function analytics(Request $request)
    {
        $activeTerm = Term::where('is_active', true)->with('academicYear')->first();
        $classGroups = $activeTerm
            ? ClassGroup::where('term_id', $activeTerm->id)->orderBy('level')->orderBy('name')->get(['id', 'name', 'level'])
            : collect();

        $classGroupId = $request->get('class_group_id');
        $studentData = [];
        $overview = null;

        if ($activeTerm && $classGroupId) {
            // Get all attendance records for students in this class
            $records = DB::table('attendance_records')
                ->join('attendance_sessions', 'attendance_records.attendance_session_id', '=', 'attendance_sessions.id')
                ->join('teaching_assignments', 'attendance_sessions.teaching_assignment_id', '=', 'teaching_assignments.id')
                ->join('students', 'attendance_records.student_id', '=', 'students.id')
                ->where('teaching_assignments.term_id', $activeTerm->id)
                ->where('teaching_assignments.class_group_id', $classGroupId)
                ->whereIn('attendance_records.status', ['present', 'absent', 'sick', 'permit'])
                ->select(
                    'students.id as student_id',
                    'students.name as student_name',
                    'students.nis',
                    DB::raw('COUNT(*) as total'),
                    DB::raw("SUM(CASE WHEN attendance_records.status = 'present' THEN 1 ELSE 0 END) as present"),
                    DB::raw("SUM(CASE WHEN attendance_records.status = 'absent' THEN 1 ELSE 0 END) as absent"),
                    DB::raw("SUM(CASE WHEN attendance_records.status = 'sick' THEN 1 ELSE 0 END) as sick"),
                    DB::raw("SUM(CASE WHEN attendance_records.status = 'permit' THEN 1 ELSE 0 END) as permit_count")
                )
                ->groupBy('students.id', 'students.name', 'students.nis')
                ->orderBy('students.name')
                ->get();

            $studentData = $records->map(function ($r) {
                $total = (int) $r->total;
                return [
                    'student_id' => $r->student_id,
                    'student_name' => $r->student_name,
                    'nis' => $r->nis,
                    'total' => $total,
                    'present' => (int) $r->present,
                    'absent' => (int) $r->absent,
                    'sick' => (int) $r->sick,
                    'permit' => (int) $r->permit_count,
                    'present_pct' => $total > 0 ? round(((int) $r->present / $total) * 100, 1) : 0,
                ];
            })->values()->toArray();

            if (count($studentData) > 0) {
                $totalPresent = array_sum(array_column($studentData, 'present'));
                $totalAbsent = array_sum(array_column($studentData, 'absent'));
                $totalSick = array_sum(array_column($studentData, 'sick'));
                $totalPermit = array_sum(array_column($studentData, 'permit'));
                $grandTotal = $totalPresent + $totalAbsent + $totalSick + $totalPermit;

                $overview = [
                    'total_records' => $grandTotal,
                    'present' => $totalPresent,
                    'absent' => $totalAbsent,
                    'sick' => $totalSick,
                    'permit' => $totalPermit,
                    'present_pct' => $grandTotal > 0 ? round(($totalPresent / $grandTotal) * 100, 1) : 0,
                    'total_students' => count($studentData),
                ];
            }
        }

        return Inertia::render('reports/attendance', [
            'activeTerm' => $activeTerm,
            'classGroups' => $classGroups,
            'studentData' => $studentData,
            'overview' => $overview,
            'filters' => ['class_group_id' => $classGroupId],
        ]);
    }
}
