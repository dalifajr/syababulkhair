<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassGroup;
use App\Models\Subject;
use App\Models\TeachingAssignment;
use App\Models\Term;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeachingAssignmentController extends Controller
{
    public function index(Request $request)
    {
        $assignments = TeachingAssignment::with(['term.academicYear', 'classGroup', 'subject', 'teacher'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $stats = [
            'total' => TeachingAssignment::count(),
        ];

        return Inertia::render('admin/teaching-assignments/index', [
            'assignments' => $assignments,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        $terms = Term::with('academicYear')->where('is_active', true)->get();
        $classGroups = ClassGroup::orderBy('level')->orderBy('name')->get();
        $subjects = Subject::where('is_active', true)->orderBy('name')->get();
        $teachers = User::whereIn('role', ['teacher', 'admin'])->orderBy('name')->get();

        return Inertia::render('admin/teaching-assignments/create', [
            'terms' => $terms,
            'classGroups' => $classGroups,
            'subjects' => $subjects,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'term_id' => 'required|exists:terms,id',
            'class_group_id' => 'required|exists:class_groups,id',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_user_id' => 'required|exists:users,id',
        ]);

        // Check if assignment already exists
        $exists = TeachingAssignment::where('term_id', $validated['term_id'])
            ->where('class_group_id', $validated['class_group_id'])
            ->where('subject_id', $validated['subject_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['general' => 'Penugasan untuk kombinasi ini sudah ada']);
        }

        TeachingAssignment::create($validated);

        return redirect()->route('admin.teaching-assignments.index')
            ->with('success', 'Penugasan guru berhasil ditambahkan');
    }

    public function edit(TeachingAssignment $teachingAssignment)
    {
        $terms = Term::with('academicYear')->get();
        $classGroups = ClassGroup::orderBy('level')->orderBy('name')->get();
        $subjects = Subject::orderBy('name')->get();
        $teachers = User::whereIn('role', ['teacher', 'admin'])->orderBy('name')->get();

        return Inertia::render('admin/teaching-assignments/edit', [
            'assignment' => $teachingAssignment->load(['term', 'classGroup', 'subject', 'teacher']),
            'terms' => $terms,
            'classGroups' => $classGroups,
            'subjects' => $subjects,
            'teachers' => $teachers,
        ]);
    }

    public function update(Request $request, TeachingAssignment $teachingAssignment)
    {
        $validated = $request->validate([
            'term_id' => 'required|exists:terms,id',
            'class_group_id' => 'required|exists:class_groups,id',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_user_id' => 'required|exists:users,id',
        ]);

        $teachingAssignment->update($validated);

        return redirect()->route('admin.teaching-assignments.index')
            ->with('success', 'Penugasan guru berhasil diperbarui');
    }

    public function destroy(TeachingAssignment $teachingAssignment)
    {
        $teachingAssignment->delete();

        return redirect()->route('admin.teaching-assignments.index')
            ->with('success', 'Penugasan guru berhasil dihapus');
    }
}
