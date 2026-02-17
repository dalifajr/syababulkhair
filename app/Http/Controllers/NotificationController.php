<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->take(50)
            ->get()
            ->map(function ($n) {
                $data = is_string($n->data) ? json_decode($n->data, true) : $n->data;
                return [
                    'id' => $n->id,
                    'type' => $n->type,
                    'title' => $data['title'] ?? 'Notifikasi',
                    'message' => $data['message'] ?? '',
                    'url' => $data['url'] ?? null,
                    'icon' => $data['icon'] ?? null,
                    'read_at' => $n->read_at?->toISOString(),
                    'created_at' => $n->created_at->toISOString(),
                    'time_ago' => $n->created_at->diffForHumans(),
                ];
            });

        $unreadCount = $user->unreadNotifications()->count();

        return Inertia::render('notifications/index', [
            'notifications' => $notifications,
            'unreadCount' => $unreadCount,
        ]);
    }

    public function markAsRead(Request $request, string $id)
    {
        $notification = Auth::user()->notifications()->where('id', $id)->first();
        if ($notification) {
            $notification->markAsRead();
        }

        return back();
    }

    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return back()->with('success', 'Semua notifikasi ditandai sudah dibaca');
    }

    public function unreadCount()
    {
        return response()->json([
            'count' => Auth::user()->unreadNotifications()->count(),
        ]);
    }
}
