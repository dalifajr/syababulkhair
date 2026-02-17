<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicYearController extends Controller
{
    public function index(Request $request)
    {
        $academicYears = AcademicYear::withCount('terms')
            ->orderBy('starts_at', 'desc')
            ->paginate(10);

        $stats = [
            'total' => AcademicYear::count(),
            'active' => AcademicYear::where('is_active', true)->count(),
        ];

        return Inertia::render('admin/academic-years/index', [
            'academicYears' => $academicYears,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/academic-years/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date|after:starts_at',
            'is_active' => 'boolean',
        ]);

        // Set only one active at a time
        if ($validated['is_active'] ?? false) {
            AcademicYear::query()->update(['is_active' => false]);
        }

        AcademicYear::create($validated);

        return redirect()->route('admin.academic-years.index')
            ->with('success', 'Tahun ajaran berhasil ditambahkan');
    }

    public function edit(AcademicYear $academicYear)
    {
        return Inertia::render('admin/academic-years/edit', [
            'academicYear' => $academicYear,
        ]);
    }

    public function update(Request $request, AcademicYear $academicYear)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date|after:starts_at',
            'is_active' => 'boolean',
        ]);

        // Set only one active at a time
        if ($validated['is_active'] ?? false) {
            AcademicYear::where('id', '!=', $academicYear->id)->update(['is_active' => false]);
        }

        $academicYear->update($validated);

        return redirect()->route('admin.academic-years.index')
            ->with('success', 'Tahun ajaran berhasil diperbarui');
    }

    public function destroy(AcademicYear $academicYear)
    {
        $academicYear->delete();

        return redirect()->route('admin.academic-years.index')
            ->with('success', 'Tahun ajaran berhasil dihapus');
    }
}
