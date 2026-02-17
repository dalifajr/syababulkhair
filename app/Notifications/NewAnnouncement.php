<?php

namespace App\Notifications;

use App\Models\Announcement;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewAnnouncement extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Announcement $announcement
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $typeLabels = [
            'general' => 'Pengumuman Umum',
            'academic' => 'Pengumuman Akademik',
            'event' => 'Info Acara',
        ];

        $type = $typeLabels[$this->announcement->type] ?? 'Pengumuman';

        return (new MailMessage)
            ->subject($type . ': ' . $this->announcement->title)
            ->greeting('Assalamu\'alaikum!')
            ->line('Ada pengumuman baru:')
            ->line('**' . $this->announcement->title . '**')
            ->line(\Illuminate\Support\Str::limit(strip_tags($this->announcement->content), 200))
            ->action('Baca Selengkapnya', url('/parent/announcements/' . $this->announcement->id))
            ->line('Terima kasih.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_announcement',
            'announcement_id' => $this->announcement->id,
            'title' => $this->announcement->title,
            'announcement_type' => $this->announcement->type,
            'message' => 'Pengumuman baru: ' . $this->announcement->title,
        ];
    }
}
