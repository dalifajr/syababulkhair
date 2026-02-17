<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use App\Models\ExtracurricularEnrollment;
use App\Models\Student;
use App\Models\Term;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularController extends Controller
{
    public function index(): Response
    {
        $extracurriculars = Extracurricular::with('teacher')
            ->withCount('enrollments')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/extracurriculars/index', [
            'extracurriculars' => $extracurriculars,
        ]);
    }

    public function create(): Response
    {
        $teachers = User::where('role', 'teacher')
            ->orderBy('name')
            ->get(['id', 'name']);

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        return Inertia::render('admin/extracurriculars/create', [
            'teachers' => $teachers,
            'days' => $days,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'teacher_user_id' => 'nullable|exists:users,id',
            'day' => 'nullable|string|max:20',
            'time_start' => 'nullable|date_format:H:i',
            'time_end' => 'nullable|date_format:H:i|after:time_start',
            'is_active' => 'boolean',
        ]);

        Extracurricular::create($validated);

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil ditambahkan');
    }

    public function edit(Extracurricular $extracurricular): Response
    {
        $teachers = User::where('role', 'teacher')
            ->orderBy('name')
            ->get(['id', 'name']);

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        // Get active term
        $activeTerm = Term::where('is_active', true)->first();

        // Get enrolled students
        $enrollments = [];
        if ($activeTerm) {
            $enrollments = ExtracurricularEnrollment::with('student')
                ->where('extracurricular_id', $extracurricular->id)
                ->where('term_id', $activeTerm->id)
                ->get();
        }

        // Get available students (active, not yet enrolled)
        $enrolledStudentIds = collect($enrollments)->pluck('student_id')->toArray();
        $availableStudents = Student::where('status', 'active')
            ->whereNotIn('id', $enrolledStudentIds)
            ->orderBy('name')
            ->get(['id', 'name', 'nis']);

        return Inertia::render('admin/extracurriculars/edit', [
            'extracurricular' => $extracurricular,
            'teachers' => $teachers,
            'days' => $days,
            'enrollments' => $enrollments,
            'availableStudents' => $availableStudents,
            'activeTerm' => $activeTerm,
        ]);
    }

    public function update(Request $request, Extracurricular $extracurricular): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'teacher_user_id' => 'nullable|exists:users,id',
            'day' => 'nullable|string|max:20',
            'time_start' => 'nullable|date_format:H:i',
            'time_end' => 'nullable|date_format:H:i|after:time_start',
            'is_active' => 'boolean',
        ]);

        $extracurricular->update($validated);

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil diperbarui');
    }

    public function destroy(Extracurricular $extracurricular): RedirectResponse
    {
        $extracurricular->delete();

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil dihapus');
    }

    public function enroll(Request $request, Extracurricular $extracurricular): RedirectResponse
    {
        $activeTerm = Term::where('is_active', true)->first();
        if (!$activeTerm) {
            return back()->with('error', 'Tidak ada semester aktif');
        }

        $validated = $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'exists:students,id',
        ]);

        foreach ($validated['student_ids'] as $studentId) {
            ExtracurricularEnrollment::firstOrCreate([
                'extracurricular_id' => $extracurricular->id,
                'student_id' => $studentId,
                'term_id' => $activeTerm->id,
            ]);
        }

        return back()->with('success', count($validated['student_ids']) . ' siswa berhasil didaftarkan');
    }

    public function updateEnrollment(Request $request, ExtracurricularEnrollment $enrollment): RedirectResponse
    {
        $validated = $request->validate([
            'grade' => 'nullable|string|max:10',
            'description' => 'nullable|string|max:500',
        ]);

        $enrollment->update($validated);

        return back()->with('success', 'Nilai ekstrakurikuler berhasil diperbarui');
    }

    public function removeEnrollment(ExtracurricularEnrollment $enrollment): RedirectResponse
    {
        $enrollment->delete();

        return back()->with('success', 'Siswa berhasil dikeluarkan dari ekstrakurikuler');
    }
}
