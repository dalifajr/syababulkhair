<?php

namespace App\Notifications;

use App\Models\ReportCard;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReportCardAvailable extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public ReportCard $reportCard,
        public string $studentName
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $term = $this->reportCard->term;
        $classGroup = $this->reportCard->classEnrollment->classGroup;

        return (new MailMessage)
            ->subject('Rapor Tersedia: ' . $this->studentName)
            ->greeting('Assalamu\'alaikum!')
            ->line("Rapor untuk **{$this->studentName}** telah tersedia:")
            ->line("**Semester:** {$term->name}")
            ->line("**Kelas:** {$classGroup->name}")
            ->line("**Rata-rata:** " . number_format($this->reportCard->average_score, 1))
            ->line("**Peringkat:** {$this->reportCard->rank} dari {$this->reportCard->total_students} siswa")
            ->action('Lihat Rapor', url('/parent/report-cards/' . $this->reportCard->id))
            ->line('Terima kasih.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'report_card_available',
            'report_card_id' => $this->reportCard->id,
            'student_name' => $this->studentName,
            'term_name' => $this->reportCard->term->name,
            'average_score' => $this->reportCard->average_score,
            'rank' => $this->reportCard->rank,
            'message' => "Rapor {$this->studentName} untuk {$this->reportCard->term->name} telah tersedia",
        ];
    }
}
