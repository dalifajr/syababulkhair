<?php

namespace App\Notifications;

use App\Models\Assessment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewScorePublished extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Assessment $assessment,
        public float $score
    ) {}

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $subject = $this->assessment->teachingAssignment->subject;
        
        return (new MailMessage)
            ->subject('Nilai Baru: ' . $this->assessment->name)
            ->greeting('Assalamu\'alaikum!')
            ->line('Nilai baru telah dipublikasikan untuk:')
            ->line('**Mata Pelajaran:** ' . $subject->name)
            ->line('**Tugas:** ' . $this->assessment->name)
            ->line('**Nilai:** ' . $this->score . ' / ' . $this->assessment->max_score)
            ->action('Lihat Detail', url('/parent/scores'))
            ->line('Terima kasih.');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_score',
            'assessment_id' => $this->assessment->id,
            'assessment_name' => $this->assessment->name,
            'subject_name' => $this->assessment->teachingAssignment->subject->name,
            'score' => $this->score,
            'max_score' => $this->assessment->max_score,
            'message' => "Nilai baru untuk {$this->assessment->name}: {$this->score}/{$this->assessment->max_score}",
        ];
    }
}
