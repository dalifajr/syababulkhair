<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubjectController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Subject::query();

        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $subjects = $query->orderBy('category')->orderBy('name')->paginate(10);

        $stats = [
            'total' => Subject::count(),
            'active' => Subject::where('is_active', true)->count(),
        ];

        return Inertia::render('admin/subjects/index', [
            'subjects' => $subjects,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/subjects/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:50'],
            'is_active' => ['boolean'],
        ]);

        $validated['is_active'] = (bool) ($validated['is_active'] ?? true);

        Subject::create($validated);

        return redirect()->route('admin.subjects.index')
            ->with('success', 'Mata pelajaran berhasil ditambahkan');
    }

    public function edit(Subject $subject): Response
    {
        return Inertia::render('admin/subjects/edit', [
            'subject' => $subject,
        ]);
    }

    public function update(Request $request, Subject $subject): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:50'],
            'is_active' => ['boolean'],
        ]);

        $validated['is_active'] = (bool) ($validated['is_active'] ?? true);

        $subject->update($validated);

        return redirect()->route('admin.subjects.index')
            ->with('success', 'Mata pelajaran berhasil diperbarui');
    }

    public function destroy(Subject $subject): RedirectResponse
    {
        $subject->delete();

        return redirect()->route('admin.subjects.index')
            ->with('success', 'Mata pelajaran berhasil dihapus');
    }
}
