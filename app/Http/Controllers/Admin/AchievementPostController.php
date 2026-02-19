<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AchievementPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AchievementPostController extends Controller
{
    public function index(Request $request): Response
    {
        $query = AchievementPost::with('createdBy')
            ->orderByDesc('event_date');

        if ($search = $request->get('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return Inertia::render('admin/achievement-posts/index', [
            'posts' => $query->paginate(12)->withQueryString(),
            'filters' => [
                'q' => $request->get('q'),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/achievement-posts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:10240'],
            'event_date' => ['required', 'date'],
            'is_published' => ['boolean'],
        ]);

        $imagePath = $this->compressAndStoreImage($request->file('image'), 'achievements');

        AchievementPost::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'image_path' => $imagePath,
            'event_date' => $validated['event_date'],
            'is_published' => $validated['is_published'] ?? true,
            'created_by_user_id' => auth()->id(),
        ]);

        return redirect()->route('admin.achievement-posts.index')
            ->with('success', 'Prestasi berhasil ditambahkan');
    }

    public function edit(AchievementPost $achievementPost): Response
    {
        return Inertia::render('admin/achievement-posts/edit', [
            'post' => $achievementPost,
        ]);
    }

    public function update(Request $request, AchievementPost $achievementPost): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'image' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:10240'],
            'event_date' => ['required', 'date'],
            'is_published' => ['boolean'],
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'event_date' => $validated['event_date'],
            'is_published' => $validated['is_published'] ?? true,
        ];

        if ($request->hasFile('image')) {
            if ($achievementPost->image_path && Storage::disk('public')->exists($achievementPost->image_path)) {
                Storage::disk('public')->delete($achievementPost->image_path);
            }
            $data['image_path'] = $this->compressAndStoreImage($request->file('image'), 'achievements');
        }

        $achievementPost->update($data);

        return redirect()->route('admin.achievement-posts.index')
            ->with('success', 'Prestasi berhasil diperbarui');
    }

    public function destroy(AchievementPost $achievementPost): RedirectResponse
    {
        if ($achievementPost->image_path && Storage::disk('public')->exists($achievementPost->image_path)) {
            Storage::disk('public')->delete($achievementPost->image_path);
        }

        $achievementPost->delete();

        return redirect()->route('admin.achievement-posts.index')
            ->with('success', 'Prestasi berhasil dihapus');
    }

    /**
     * Compress and store image using GD library
     */
    private function compressAndStoreImage($file, string $folder): string
    {
        // If GD is not available, store without compression
        if (!\extension_loaded('gd')) {
            return $file->store("uploads/{$folder}", 'public');
        }

        $filename = \uniqid($folder . '_') . '.jpg';
        $path = "uploads/{$folder}/{$filename}";

        $imageInfo = \getimagesize($file->getPathname());
        $mime = $imageInfo['mime'] ?? '';

        $sourceImage = match ($mime) {
            'image/jpeg' => \imagecreatefromjpeg($file->getPathname()),
            'image/png' => \imagecreatefrompng($file->getPathname()),
            'image/webp' => \imagecreatefromwebp($file->getPathname()),
            default => \imagecreatefromjpeg($file->getPathname()),
        };

        if (!$sourceImage) {
            return $file->store("uploads/{$folder}", 'public');
        }

        $origWidth = \imagesx($sourceImage);
        $origHeight = \imagesy($sourceImage);

        $maxWidth = 1200;
        $maxHeight = 900;

        $ratio = min($maxWidth / $origWidth, $maxHeight / $origHeight, 1);
        $newWidth = (int) ($origWidth * $ratio);
        $newHeight = (int) ($origHeight * $ratio);

        $newImage = \imagecreatetruecolor($newWidth, $newHeight);

        if ($mime === 'image/png') {
            $white = \imagecolorallocate($newImage, 255, 255, 255);
            \imagefill($newImage, 0, 0, $white);
        }

        \imagecopyresampled($newImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);

        $fullDir = \storage_path("app/public/uploads/{$folder}");
        if (!\is_dir($fullDir)) {
            \mkdir($fullDir, 0755, true);
        }

        $fullPath = \storage_path("app/public/{$path}");
        \imagejpeg($newImage, $fullPath, 75);

        \imagedestroy($sourceImage);
        \imagedestroy($newImage);

        return $path;
    }
}
