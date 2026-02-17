<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $query = User::whereIn('role', ['teacher', 'admin']);

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $teachers = $query->orderBy('name')->paginate(10);

        $stats = [
            'total' => User::whereIn('role', ['teacher', 'admin'])->count(),
            'teachers' => User::where('role', 'teacher')->count(),
            'admins' => User::where('role', 'admin')->count(),
        ];

        return Inertia::render('admin/teachers/index', [
            'teachers' => $teachers,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/teachers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:teacher,admin',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Guru/Staff berhasil ditambahkan');
    }

    public function edit(User $teacher)
    {
        return Inertia::render('admin/teachers/edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(Request $request, User $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $teacher->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|in:teacher,admin',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }

        $teacher->update($validated);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Guru/Staff berhasil diperbarui');
    }

    public function destroy(User $teacher)
    {
        $teacher->delete();

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Guru/Staff berhasil dihapus');
    }
}
