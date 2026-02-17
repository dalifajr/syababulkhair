<?php

namespace App\Imports;

use App\Models\Assessment;
use App\Models\AssessmentScore;
use App\Models\Student;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ScoresImport implements ToCollection, WithHeadingRow, WithValidation
{
    public int $imported = 0;
    public int $skipped = 0;
    public array $errors = [];

    public function __construct(
        public Assessment $assessment
    ) {}

    public function collection(Collection $rows): void
    {
        foreach ($rows as $index => $row) {
            $rowNumber = $index + 2; // +2 because of header row and 0-index

            // Find student by NIS
            $nis = $row['nis'] ?? $row['nomor_induk'] ?? null;
            
            if (empty($nis)) {
                $this->errors[] = "Baris {$rowNumber}: NIS tidak boleh kosong";
                $this->skipped++;
                continue;
            }

            $student = Student::where('nis', $nis)->first();
            
            if (!$student) {
                $this->errors[] = "Baris {$rowNumber}: Siswa dengan NIS '{$nis}' tidak ditemukan";
                $this->skipped++;
                continue;
            }

            // Get score
            $score = $row['nilai'] ?? $row['score'] ?? null;

            if ($score === null || $score === '') {
                // Skip empty scores (not an error, just no score to import)
                continue;
            }

            // Validate score
            $score = floatval($score);
            if ($score < 0 || $score > $this->assessment->max_score) {
                $this->errors[] = "Baris {$rowNumber}: Nilai {$score} tidak valid (harus 0-{$this->assessment->max_score})";
                $this->skipped++;
                continue;
            }

            // Get note
            $note = $row['catatan'] ?? $row['note'] ?? $row['keterangan'] ?? null;

            // Create or update score
            AssessmentScore::updateOrCreate(
                [
                    'assessment_id' => $this->assessment->id,
                    'student_id' => $student->id,
                ],
                [
                    'score' => $score,
                    'note' => $note,
                    'recorded_by_user_id' => Auth::id(),
                ]
            );

            $this->imported++;
        }
    }

    public function rules(): array
    {
        return [
            'nis' => 'required',
        ];
    }

    public function customValidationMessages(): array
    {
        return [
            'nis.required' => 'Kolom NIS wajib diisi',
        ];
    }
}
