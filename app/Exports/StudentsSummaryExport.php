<?php

namespace App\Exports;

use App\Models\Student;
use Illuminate\Database\Eloquent\Builder;

class StudentsSummaryExport
{
    /** @return Builder<Student> */
    public static function query(array $filters = []): Builder
    {
        $search = $filters['search'] ?? null;
        $sort = $filters['sort'] ?? 'name';
        $direction = strtolower($filters['direction'] ?? 'asc') === 'desc' ? 'desc' : 'asc';

        $allowedSorts = ['name', 'nis', 'average', 'total_scores'];
        if (!in_array($sort, $allowedSorts, true)) {
            $sort = 'name';
        }

        $query = Student::query()
            ->where('status', 'active')
            ->when($search, function ($q) use ($search) {
                $q->where(function ($inner) use ($search) {
                    $inner->where('name', 'like', "%{$search}%")
                        ->orWhere('nis', 'like', "%{$search}%");
                });
            })
            ->withAvg('assessmentScores as average', 'score')
            ->withCount('assessmentScores as total_scores');

        // Deterministic ordering
        if ($sort === 'average') {
            $query->orderBy('average', $direction)->orderBy('name');
        } elseif ($sort === 'total_scores') {
            $query->orderBy('total_scores', $direction)->orderBy('name');
        } else {
            $query->orderBy($sort, $direction)->orderBy('name');
        }

        return $query;
    }

    public static function headings(): array
    {
        return [
            'NIS',
            'Nama',
            'Rata-rata',
            'Jumlah Nilai',
        ];
    }

    /** @param Student $row */
    public static function map(Student $row): array
    {
        $avg = $row->average;
        $avg = $avg !== null ? round((float) $avg, 1) : null;

        return [
            $row->nis,
            $row->name,
            $avg,
            (int) ($row->total_scores ?? 0),
        ];
    }
}
