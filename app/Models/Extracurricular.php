<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Extracurricular extends Model
{
    protected $fillable = [
        'name',
        'description',
        'teacher_user_id',
        'day',
        'time_start',
        'time_end',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'time_start' => 'datetime:H:i',
        'time_end' => 'datetime:H:i',
    ];

    protected $appends = ['schedule'];

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_user_id');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(ExtracurricularEnrollment::class);
    }

    /** Get formatted schedule string */
    public function getScheduleAttribute(): ?string
    {
        if (!$this->day) return null;

        $days = [
            'monday' => 'Senin', 'tuesday' => 'Selasa', 'wednesday' => 'Rabu',
            'thursday' => 'Kamis', 'friday' => 'Jumat', 'saturday' => 'Sabtu', 'sunday' => 'Minggu',
        ];

        $dayName = $days[strtolower($this->day)] ?? $this->day;
        $start = $this->time_start ? $this->time_start->format('H:i') : null;
        $end = $this->time_end ? $this->time_end->format('H:i') : null;

        if ($start && $end) {
            return "{$dayName}, {$start} - {$end}";
        }

        return $dayName;
    }
}
