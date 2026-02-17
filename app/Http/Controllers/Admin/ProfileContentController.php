<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileContentController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ProfileContent::orderBy('section')
            ->orderBy('sort_order');

        if ($section = $request->get('section')) {
            $query->where('section', $section);
        }

        if ($search = $request->get('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('label', 'like', "%{$search}%")
                    ->orWhere('value', 'like', "%{$search}%")
                    ->orWhere('key', 'like', "%{$search}%");
            });
        }

        return Inertia::render('admin/profile-content/index', [
            'contents' => $query->get(),
            'sections' => ProfileContent::SECTIONS,
            'types' => ProfileContent::TYPES,
            'filters' => [
                'section' => $request->get('section'),
                'q' => $request->get('q'),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/profile-content/create', [
            'sections' => ProfileContent::SECTIONS,
            'types' => ProfileContent::TYPES,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'section' => ['required', 'string', 'in:' . implode(',', array_keys(ProfileContent::SECTIONS))],
            'key' => ['required', 'string', 'max:255', 'unique:profile_contents,key'],
            'type' => ['required', 'string', 'in:' . implode(',', array_keys(ProfileContent::TYPES))],
            'label' => ['required', 'string', 'max:255'],
            'value' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:5120'], // 5MB max
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'profile-' . time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $validated['value'] = '/images/' . $filename;
        }

        unset($validated['image']);

        ProfileContent::create($validated);

        return redirect()->route('admin.profile-content.index')
            ->with('success', 'Konten profil berhasil ditambahkan');
    }

    public function edit(ProfileContent $profileContent): Response
    {
        return Inertia::render('admin/profile-content/edit', [
            'content' => $profileContent,
            'sections' => ProfileContent::SECTIONS,
            'types' => ProfileContent::TYPES,
        ]);
    }

    public function update(Request $request, ProfileContent $profileContent): RedirectResponse
    {
        $validated = $request->validate([
            'section' => ['required', 'string', 'in:' . implode(',', array_keys(ProfileContent::SECTIONS))],
            'key' => ['required', 'string', 'max:255', 'unique:profile_contents,key,' . $profileContent->id],
            'type' => ['required', 'string', 'in:' . implode(',', array_keys(ProfileContent::TYPES))],
            'label' => ['required', 'string', 'max:255'],
            'value' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'profile-' . time() . '-' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $validated['value'] = '/images/' . $filename;
        }

        unset($validated['image']);

        $profileContent->update($validated);

        return redirect()->route('admin.profile-content.index')
            ->with('success', 'Konten profil berhasil diperbarui');
    }

    public function destroy(ProfileContent $profileContent): RedirectResponse
    {
        // If type is image/logo and file exists, try to clean up
        if (in_array($profileContent->type, ['image', 'logo']) && $profileContent->value) {
            $path = public_path(ltrim($profileContent->value, '/'));
            if (file_exists($path) && str_starts_with($profileContent->value, '/images/profile-')) {
                @unlink($path);
            }
        }

        $profileContent->delete();

        return redirect()->route('admin.profile-content.index')
            ->with('success', 'Konten profil berhasil dihapus');
    }

    public function toggleActive(ProfileContent $profileContent): RedirectResponse
    {
        $profileContent->update(['is_active' => !$profileContent->is_active]);

        $status = $profileContent->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->back()
            ->with('success', "Konten profil berhasil {$status}");
    }
}
