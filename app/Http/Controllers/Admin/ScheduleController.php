<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassGroup;
use App\Models\Schedule;
use App\Models\TeachingAssignment;
use App\Models\Term;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);
        $classGroupId = $request->get('class_group_id');
        $day = $request->get('day');

        $terms = Term::with('academicYear')
            ->orderByDesc('starts_at')
            ->get();

        $classGroups = ClassGroup::query()
            ->when($termId, fn($q) => $q->where('term_id', $termId))
            ->orderBy('level')
            ->orderBy('name')
            ->get();

        $query = Schedule::with([
            'teachingAssignment.classGroup',
            'teachingAssignment.subject',
            'teachingAssignment.teacher',
        ]);

        if ($classGroupId) {
            $query->whereHas('teachingAssignment', fn($q) => $q->where('class_group_id', $classGroupId));
        } elseif ($termId) {
            $query->whereHas('teachingAssignment', fn($q) => $q->where('term_id', $termId));
        }

        if ($day) {
            $query->where('day_of_week', $day);
        }

        $schedules = $query->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get()
            ->groupBy('day_of_week');

        return Inertia::render('admin/schedules/index', [
            'schedules' => $schedules,
            'terms' => $terms,
            'classGroups' => $classGroups,
            'days' => Schedule::DAYS,
            'filters' => [
                'term_id' => $termId,
                'class_group_id' => $classGroupId,
                'day' => $day,
            ],
        ]);
    }

    public function create(Request $request): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);

        $teachingAssignments = TeachingAssignment::with(['classGroup', 'subject', 'teacher'])
            ->when($termId, fn($q) => $q->where('term_id', $termId))
            ->get();

        return Inertia::render('admin/schedules/create', [
            'teachingAssignments' => $teachingAssignments,
            'days' => Schedule::DAYS,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'teaching_assignment_id' => ['required', 'exists:teaching_assignments,id'],
            'day_of_week' => ['required', 'integer', 'min:1', 'max:7'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'room' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        // Check for time conflicts
        $conflict = Schedule::where('teaching_assignment_id', $validated['teaching_assignment_id'])
            ->where('day_of_week', $validated['day_of_week'])
            ->where(function ($q) use ($validated) {
                $q->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                    ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']]);
            })
            ->exists();

        if ($conflict) {
            return redirect()->back()
                ->withErrors(['time' => 'Jadwal bentrok dengan jadwal lain yang sudah ada'])
                ->withInput();
        }

        Schedule::create($validated);

        return redirect()->route('admin.schedules.index')
            ->with('success', 'Jadwal berhasil ditambahkan');
    }

    public function edit(Schedule $schedule): Response
    {
        $schedule->load('teachingAssignment.classGroup', 'teachingAssignment.subject', 'teachingAssignment.teacher');

        $teachingAssignments = TeachingAssignment::with(['classGroup', 'subject', 'teacher'])
            ->where('term_id', $schedule->teachingAssignment->term_id)
            ->get();

        return Inertia::render('admin/schedules/edit', [
            'schedule' => $schedule,
            'teachingAssignments' => $teachingAssignments,
            'days' => Schedule::DAYS,
        ]);
    }

    public function update(Request $request, Schedule $schedule): RedirectResponse
    {
        $validated = $request->validate([
            'teaching_assignment_id' => ['required', 'exists:teaching_assignments,id'],
            'day_of_week' => ['required', 'integer', 'min:1', 'max:7'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'room' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        // Check for time conflicts (exclude current schedule)
        $conflict = Schedule::where('teaching_assignment_id', $validated['teaching_assignment_id'])
            ->where('day_of_week', $validated['day_of_week'])
            ->where('id', '!=', $schedule->id)
            ->where(function ($q) use ($validated) {
                $q->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                    ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']]);
            })
            ->exists();

        if ($conflict) {
            return redirect()->back()
                ->withErrors(['time' => 'Jadwal bentrok dengan jadwal lain yang sudah ada'])
                ->withInput();
        }

        $schedule->update($validated);

        return redirect()->route('admin.schedules.index')
            ->with('success', 'Jadwal berhasil diperbarui');
    }

    public function destroy(Schedule $schedule): RedirectResponse
    {
        $schedule->delete();

        return redirect()->route('admin.schedules.index')
            ->with('success', 'Jadwal berhasil dihapus');
    }
}
