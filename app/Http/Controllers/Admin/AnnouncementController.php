<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Announcement::with('createdBy')
            ->orderByDesc('is_pinned')
            ->orderByDesc('created_at');

        if ($type = $request->get('type')) {
            $query->where('type', $type);
        }

        if ($status = $request->get('status')) {
            if ($status === 'published') {
                $query->where('is_published', true);
            } elseif ($status === 'draft') {
                $query->where('is_published', false);
            }
        }

        if ($search = $request->get('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        return Inertia::render('admin/announcements/index', [
            'announcements' => $query->paginate(15)->withQueryString(),
            'filters' => [
                'q' => $request->get('q'),
                'type' => $request->get('type'),
                'status' => $request->get('status'),
            ],
            'types' => Announcement::TYPES,
            'audiences' => Announcement::AUDIENCES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/announcements/create', [
            'types' => Announcement::TYPES,
            'audiences' => Announcement::AUDIENCES,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'type' => ['required', 'in:general,academic,event'],
            'target_audience' => ['required', 'in:all,teachers,parents,students'],
            'is_published' => ['boolean'],
            'is_pinned' => ['boolean'],
            'published_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:published_at'],
        ]);

        $validated['created_by_user_id'] = auth()->id();

        if ($validated['is_published'] && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        Announcement::create($validated);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dibuat');
    }

    public function edit(Announcement $announcement): Response
    {
        return Inertia::render('admin/announcements/edit', [
            'announcement' => $announcement,
            'types' => Announcement::TYPES,
            'audiences' => Announcement::AUDIENCES,
        ]);
    }

    public function update(Request $request, Announcement $announcement): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'type' => ['required', 'in:general,academic,event'],
            'target_audience' => ['required', 'in:all,teachers,parents,students'],
            'is_published' => ['boolean'],
            'is_pinned' => ['boolean'],
            'published_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:published_at'],
        ]);

        if ($validated['is_published'] && !$announcement->is_published && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil diperbarui');
    }

    public function destroy(Announcement $announcement): RedirectResponse
    {
        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus');
    }

    public function togglePublish(Announcement $announcement): RedirectResponse
    {
        $announcement->update([
            'is_published' => !$announcement->is_published,
            'published_at' => !$announcement->is_published ? now() : $announcement->published_at,
        ]);

        $status = $announcement->is_published ? 'dipublikasikan' : 'disembunyikan';
        
        return redirect()->back()
            ->with('success', "Pengumuman berhasil {$status}");
    }
}
