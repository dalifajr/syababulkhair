<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassGroup;
use App\Models\Term;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassGroupController extends Controller
{
    public function index(Request $request)
    {
        $query = ClassGroup::with(['term.academicYear', 'homeroomTeacher']);

        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $classGroups = $query->orderBy('level')->orderBy('name')->paginate(10);

        $stats = [
            'total' => ClassGroup::count(),
            'levels' => ClassGroup::distinct('level')->count('level'),
        ];

        return Inertia::render('admin/class-groups/index', [
            'classGroups' => $classGroups,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $terms = Term::with('academicYear')->where('is_active', true)->get();
        $teachers = User::where('role', 'teacher')->orWhere('role', 'admin')->orderBy('name')->get();

        return Inertia::render('admin/class-groups/create', [
            'terms' => $terms,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'term_id' => 'required|exists:terms,id',
            'name' => 'required|string|max:50',
            'level' => 'required|integer|min:0|max:12',
            'stage' => 'required|string|in:tk,sd,smp|max:50',
            'homeroom_teacher_user_id' => 'nullable|exists:users,id',
        ]);

        ClassGroup::create($validated);

        return redirect()->route('admin.class-groups.index')
            ->with('success', 'Kelas berhasil ditambahkan');
    }

    public function edit(ClassGroup $classGroup)
    {
        $terms = Term::with('academicYear')->get();
        $teachers = User::where('role', 'teacher')->orWhere('role', 'admin')->orderBy('name')->get();

        return Inertia::render('admin/class-groups/edit', [
            'classGroup' => $classGroup->load(['term', 'homeroomTeacher']),
            'terms' => $terms,
            'teachers' => $teachers,
        ]);
    }

    public function update(Request $request, ClassGroup $classGroup)
    {
        $validated = $request->validate([
            'term_id' => 'required|exists:terms,id',
            'name' => 'required|string|max:50',
            'level' => 'required|integer|min:0|max:12',
            'stage' => 'required|string|in:tk,sd,smp|max:50',
            'homeroom_teacher_user_id' => 'nullable|exists:users,id',
        ]);

        $classGroup->update($validated);

        return redirect()->route('admin.class-groups.index')
            ->with('success', 'Kelas berhasil diperbarui');
    }

    public function destroy(ClassGroup $classGroup)
    {
        $classGroup->delete();

        return redirect()->route('admin.class-groups.index')
            ->with('success', 'Kelas berhasil dihapus');
    }
}
