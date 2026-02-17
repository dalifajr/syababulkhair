<?php

namespace App\Notifications;

use App\Models\AttendanceRecord;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AttendanceAlert extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public AttendanceRecord $record,
        public string $studentName
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $statusLabels = [
            'absent' => 'Tidak Hadir (Alfa)',
            'sick' => 'Sakit',
            'permit' => 'Izin',
        ];

        $status = $statusLabels[$this->record->status] ?? $this->record->status;
        $date = $this->record->attendanceSession->meeting_date->format('d/m/Y');
        $subject = $this->record->attendanceSession->teachingAssignment->subject->name;

        return (new MailMessage)
            ->subject('Pemberitahuan Kehadiran: ' . $this->studentName)
            ->greeting('Assalamu\'alaikum!')
            ->line("Kami informasikan bahwa **{$this->studentName}** tercatat:")
            ->line("**Status:** {$status}")
            ->line("**Tanggal:** {$date}")
            ->line("**Mata Pelajaran:** {$subject}")
            ->when($this->record->note, fn($mail) => $mail->line("**Catatan:** {$this->record->note}"))
            ->action('Lihat Rekap Kehadiran', url('/parent/attendance'))
            ->line('Terima kasih.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'attendance_alert',
            'record_id' => $this->record->id,
            'student_name' => $this->studentName,
            'status' => $this->record->status,
            'date' => $this->record->attendanceSession->meeting_date->toDateString(),
            'subject_name' => $this->record->attendanceSession->teachingAssignment->subject->name,
            'message' => "{$this->studentName} tercatat {$this->record->status} pada " . 
                $this->record->attendanceSession->meeting_date->format('d/m/Y'),
        ];
    }
}
