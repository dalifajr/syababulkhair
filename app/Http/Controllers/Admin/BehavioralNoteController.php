<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BehavioralNote;
use App\Models\Student;
use App\Models\Term;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BehavioralNoteController extends Controller
{
    public function index(Request $request): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $termId = $request->get('term_id', $activeTerm?->id);

        $query = BehavioralNote::with(['student', 'recordedBy'])
            ->when($termId, fn($q) => $q->where('term_id', $termId))
            ->when($request->get('type'), fn($q, $type) => $q->where('type', $type))
            ->when($request->get('search'), function ($q, $search) {
                $q->whereHas('student', fn($sq) => $sq->where('name', 'like', "%{$search}%"));
            })
            ->latest('date');

        $terms = Term::with('academicYear')->orderByDesc('id')->get();

        return Inertia::render('admin/behavioral-notes/index', [
            'notes' => $query->paginate(15)->withQueryString(),
            'terms' => $terms,
            'filters' => [
                'term_id' => $termId,
                'type' => $request->get('type'),
                'search' => $request->get('search'),
            ],
        ]);
    }

    public function create(): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $students = Student::where('status', 'active')->orderBy('name')->get(['id', 'nis', 'name']);

        return Inertia::render('admin/behavioral-notes/create', [
            'students' => $students,
            'termId' => $activeTerm?->id,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'term_id' => ['required', 'exists:terms,id'],
            'type' => ['required', 'in:achievement,violation,counseling'],
            'description' => ['required', 'string', 'max:2000'],
            'date' => ['required', 'date'],
        ]);

        $validated['recorded_by_user_id'] = auth()->id();

        BehavioralNote::create($validated);

        return redirect()->route('admin.behavioral-notes.index')
            ->with('success', 'Catatan perilaku berhasil ditambahkan');
    }

    public function edit(BehavioralNote $behavioralNote): Response
    {
        $behavioralNote->load('student');
        $students = Student::where('status', 'active')->orderBy('name')->get(['id', 'nis', 'name']);

        return Inertia::render('admin/behavioral-notes/edit', [
            'note' => $behavioralNote,
            'students' => $students,
        ]);
    }

    public function update(Request $request, BehavioralNote $behavioralNote): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'type' => ['required', 'in:achievement,violation,counseling'],
            'description' => ['required', 'string', 'max:2000'],
            'date' => ['required', 'date'],
        ]);

        $behavioralNote->update($validated);

        return redirect()->route('admin.behavioral-notes.index')
            ->with('success', 'Catatan perilaku berhasil diperbarui');
    }

    public function destroy(BehavioralNote $behavioralNote): RedirectResponse
    {
        $behavioralNote->delete();

        return redirect()->route('admin.behavioral-notes.index')
            ->with('success', 'Catatan perilaku berhasil dihapus');
    }
}
