<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Term;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TermController extends Controller
{
    public function index(Request $request)
    {
        $terms = Term::with('academicYear')
            ->orderBy('starts_at', 'desc')
            ->paginate(10);

        $stats = [
            'total' => Term::count(),
            'active' => Term::where('is_active', true)->count(),
        ];

        return Inertia::render('admin/terms/index', [
            'terms' => $terms,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        $academicYears = AcademicYear::orderBy('starts_at', 'desc')->get();

        return Inertia::render('admin/terms/create', [
            'academicYears' => $academicYears,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'academic_year_id' => 'required|exists:academic_years,id',
            'name' => 'required|string|max:50',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date|after:starts_at',
            'is_active' => 'boolean',
        ]);

        // Set only one active at a time
        if ($validated['is_active'] ?? false) {
            Term::query()->update(['is_active' => false]);
        }

        Term::create($validated);

        return redirect()->route('admin.terms.index')
            ->with('success', 'Semester berhasil ditambahkan');
    }

    public function edit(Term $term)
    {
        $academicYears = AcademicYear::orderBy('starts_at', 'desc')->get();

        return Inertia::render('admin/terms/edit', [
            'term' => $term->load('academicYear'),
            'academicYears' => $academicYears,
        ]);
    }

    public function update(Request $request, Term $term)
    {
        $validated = $request->validate([
            'academic_year_id' => 'required|exists:academic_years,id',
            'name' => 'required|string|max:50',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date|after:starts_at',
            'is_active' => 'boolean',
        ]);

        // Set only one active at a time
        if ($validated['is_active'] ?? false) {
            Term::where('id', '!=', $term->id)->update(['is_active' => false]);
        }

        $term->update($validated);

        return redirect()->route('admin.terms.index')
            ->with('success', 'Semester berhasil diperbarui');
    }

    public function destroy(Term $term)
    {
        $term->delete();

        return redirect()->route('admin.terms.index')
            ->with('success', 'Semester berhasil dihapus');
    }
}
