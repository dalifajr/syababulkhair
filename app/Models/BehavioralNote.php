<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BehavioralNote extends Model
{
    protected $fillable = [
        'student_id',
        'term_id',
        'type',
        'description',
        'date',
        'recorded_by_user_id',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public const TYPES = [
        'achievement' => 'Prestasi',
        'violation' => 'Pelanggaran',
        'counseling' => 'Konseling',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by_user_id');
    }

    public function getTypeLabelAttribute(): string
    {
        return self::TYPES[$this->type] ?? $this->type;
    }
}
