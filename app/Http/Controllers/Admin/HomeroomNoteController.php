<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassEnrollment;
use App\Models\ClassGroup;
use App\Models\HomeroomNote;
use App\Models\Term;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeroomNoteController extends Controller
{
    public function index(Request $request): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);

        $classGroups = ClassGroup::query()
            ->when($termId, fn($q) => $q->where('term_id', $termId))
            ->with(['homeroomTeacher', 'term.academicYear'])
            ->withCount('enrollments')
            ->orderBy('level')
            ->orderBy('name')
            ->get();

        $terms = Term::with('academicYear')
            ->orderByDesc('starts_at')
            ->get();

        return Inertia::render('admin/homeroom-notes/index', [
            'classGroups' => $classGroups,
            'terms' => $terms,
            'filters' => [
                'term_id' => $termId,
            ],
        ]);
    }

    public function show(ClassGroup $classGroup): Response
    {
        $classGroup->load(['homeroomTeacher', 'term.academicYear']);

        $enrollments = ClassEnrollment::where('class_group_id', $classGroup->id)
            ->with(['student', 'homeroomNotes' => function ($q) use ($classGroup) {
                $q->where('term_id', $classGroup->term_id);
            }])
            ->get()
            ->map(function ($enrollment) use ($classGroup) {
                $note = $enrollment->homeroomNotes->first();
                return [
                    'id' => $enrollment->id,
                    'student' => $enrollment->student,
                    'note' => $note,
                    'has_note' => $note !== null,
                ];
            });

        return Inertia::render('admin/homeroom-notes/show', [
            'classGroup' => $classGroup,
            'enrollments' => $enrollments,
        ]);
    }

    public function edit(ClassEnrollment $enrollment): Response
    {
        $enrollment->load(['student', 'classGroup.term.academicYear', 'classGroup.homeroomTeacher']);
        
        $note = HomeroomNote::where('class_enrollment_id', $enrollment->id)
            ->where('term_id', $enrollment->classGroup->term_id)
            ->first();

        return Inertia::render('admin/homeroom-notes/edit', [
            'enrollment' => $enrollment,
            'note' => $note,
        ]);
    }

    public function update(Request $request, ClassEnrollment $enrollment): RedirectResponse
    {
        $validated = $request->validate([
            'academic_note' => ['nullable', 'string', 'max:1000'],
            'personality_note' => ['nullable', 'string', 'max:1000'],
            'attendance_note' => ['nullable', 'string', 'max:1000'],
            'recommendation' => ['nullable', 'string', 'max:1000'],
            'parent_note' => ['nullable', 'string', 'max:1000'],
        ]);

        HomeroomNote::updateOrCreate(
            [
                'class_enrollment_id' => $enrollment->id,
                'term_id' => $enrollment->classGroup->term_id,
            ],
            [
                ...$validated,
                'created_by_user_id' => auth()->id(),
            ]
        );

        return redirect()->route('admin.homeroom-notes.show', $enrollment->classGroup)
            ->with('success', 'Catatan wali kelas berhasil disimpan');
    }
}
