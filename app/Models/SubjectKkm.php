<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubjectKkm extends Model
{
    protected $table = 'subject_kkm';

    protected $fillable = [
        'subject_id',
        'term_id',
        'kkm_value',
    ];

    protected $casts = [
        'kkm_value' => 'decimal:2',
    ];

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    /**
     * Check if a score meets the KKM requirement
     */
    public function isPassing(float $score): bool
    {
        return $score >= $this->kkm_value;
    }

    /**
     * Get predicate based on score
     * A: 90-100, B: 80-89, C: 70-79, D: 60-69, E: <60
     */
    public static function getPredicate(float $score): string
    {
        return match (true) {
            $score >= 90 => 'A',
            $score >= 80 => 'B',
            $score >= 70 => 'C',
            $score >= 60 => 'D',
            default => 'E',
        };
    }

    /**
     * Get predicate description
     */
    public static function getPredicateDescription(string $predicate): string
    {
        return match ($predicate) {
            'A' => 'Sangat Baik',
            'B' => 'Baik',
            'C' => 'Cukup',
            'D' => 'Kurang',
            'E' => 'Sangat Kurang',
            default => '-',
        };
    }
}
