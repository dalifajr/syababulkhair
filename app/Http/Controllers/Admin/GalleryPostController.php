<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryPostController extends Controller
{
    public function index(Request $request): Response
    {
        $query = GalleryPost::with('createdBy')
            ->orderByDesc('event_date');

        if ($search = $request->get('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return Inertia::render('admin/gallery-posts/index', [
            'posts' => $query->paginate(12)->withQueryString(),
            'filters' => [
                'q' => $request->get('q'),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/gallery-posts/create');
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

        $imagePath = $this->compressAndStoreImage($request->file('image'), 'gallery');

        GalleryPost::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'image_path' => $imagePath,
            'event_date' => $validated['event_date'],
            'is_published' => $validated['is_published'] ?? true,
            'created_by_user_id' => auth()->id(),
        ]);

        return redirect()->route('admin.gallery-posts.index')
            ->with('success', 'Dokumentasi kegiatan berhasil ditambahkan');
    }

    public function edit(GalleryPost $galleryPost): Response
    {
        return Inertia::render('admin/gallery-posts/edit', [
            'post' => $galleryPost,
        ]);
    }

    public function update(Request $request, GalleryPost $galleryPost): RedirectResponse
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
            // Delete old image
            if ($galleryPost->image_path && Storage::disk('public')->exists($galleryPost->image_path)) {
                Storage::disk('public')->delete($galleryPost->image_path);
            }
            $data['image_path'] = $this->compressAndStoreImage($request->file('image'), 'gallery');
        }

        $galleryPost->update($data);

        return redirect()->route('admin.gallery-posts.index')
            ->with('success', 'Dokumentasi kegiatan berhasil diperbarui');
    }

    public function destroy(GalleryPost $galleryPost): RedirectResponse
    {
        if ($galleryPost->image_path && Storage::disk('public')->exists($galleryPost->image_path)) {
            Storage::disk('public')->delete($galleryPost->image_path);
        }

        $galleryPost->delete();

        return redirect()->route('admin.gallery-posts.index')
            ->with('success', 'Dokumentasi kegiatan berhasil dihapus');
    }

    /**
     * Compress and store image using GD library
     */
    private function compressAndStoreImage($file, string $folder): string
    {
        $filename = uniqid($folder . '_') . '.jpg';
        $path = "uploads/{$folder}/{$filename}";

        // Get image info
        $imageInfo = getimagesize($file->getPathname());
        $mime = $imageInfo['mime'] ?? '';

        // Create image resource based on type
        $sourceImage = match ($mime) {
            'image/jpeg' => imagecreatefromjpeg($file->getPathname()),
            'image/png' => imagecreatefrompng($file->getPathname()),
            'image/webp' => imagecreatefromwebp($file->getPathname()),
            default => imagecreatefromjpeg($file->getPathname()),
        };

        if (!$sourceImage) {
            // Fallback: store without compression
            return $file->store("uploads/{$folder}", 'public');
        }

        // Get original dimensions
        $origWidth = imagesx($sourceImage);
        $origHeight = imagesy($sourceImage);

        // Maximum dimensions (1200px wide)
        $maxWidth = 1200;
        $maxHeight = 900;

        // Calculate new dimensions maintaining aspect ratio
        $ratio = min($maxWidth / $origWidth, $maxHeight / $origHeight, 1);
        $newWidth = (int) ($origWidth * $ratio);
        $newHeight = (int) ($origHeight * $ratio);

        // Create new image
        $newImage = imagecreatetruecolor($newWidth, $newHeight);

        // Handle transparency for PNG
        if ($mime === 'image/png') {
            $white = imagecolorallocate($newImage, 255, 255, 255);
            imagefill($newImage, 0, 0, $white);
        }

        // Resize
        imagecopyresampled($newImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);

        // Ensure directory exists
        $fullDir = storage_path("app/public/uploads/{$folder}");
        if (!is_dir($fullDir)) {
            mkdir($fullDir, 0755, true);
        }

        // Save as JPEG with 75% quality (good balance of quality vs size)
        $fullPath = storage_path("app/public/{$path}");
        imagejpeg($newImage, $fullPath, 75);

        // Free memory
        imagedestroy($sourceImage);
        imagedestroy($newImage);

        return $path;
    }
}
