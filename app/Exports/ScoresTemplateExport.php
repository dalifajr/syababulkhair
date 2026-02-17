<?php

namespace App\Exports;

use App\Models\Assessment;
use App\Models\ClassEnrollment;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ScoresTemplateExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function __construct(
        public Assessment $assessment
    ) {}

    public function collection(): Collection
    {
        // Get all students enrolled in the class
        return ClassEnrollment::where('class_group_id', $this->assessment->teachingAssignment->class_group_id)
            ->with('student')
            ->get()
            ->sortBy('student.name')
            ->pluck('student');
    }

    public function headings(): array
    {
        return [
            'NIS',
            'Nama Siswa',
            'Nilai (Max: ' . $this->assessment->max_score . ')',
            'Catatan',
        ];
    }

    public function map($student): array
    {
        // Get existing score if any
        $existingScore = $this->assessment->scores()
            ->where('student_id', $student->id)
            ->first();

        return [
            $student->nis,
            $student->name,
            $existingScore?->score ?? '',
            $existingScore?->note ?? '',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
