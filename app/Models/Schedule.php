<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    // Day constants
    public const MONDAY = 1;
    public const TUESDAY = 2;
    public const WEDNESDAY = 3;
    public const THURSDAY = 4;
    public const FRIDAY = 5;
    public const SATURDAY = 6;
    public const SUNDAY = 7;

    public const DAYS = [
        self::MONDAY => 'Senin',
        self::TUESDAY => 'Selasa',
        self::WEDNESDAY => 'Rabu',
        self::THURSDAY => 'Kamis',
        self::FRIDAY => 'Jumat',
        self::SATURDAY => 'Sabtu',
        self::SUNDAY => 'Minggu',
    ];

    protected $fillable = [
        'teaching_assignment_id',
        'day_of_week',
        'start_time',
        'end_time',
        'room',
        'notes',
    ];

    protected $casts = [
        'day_of_week' => 'integer',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    /** @return BelongsTo<TeachingAssignment, $this> */
    public function teachingAssignment(): BelongsTo
    {
        return $this->belongsTo(TeachingAssignment::class);
    }

    /** Get day name */
    public function getDayNameAttribute(): string
    {
        return self::DAYS[$this->day_of_week] ?? '';
    }

    /** Get formatted time range */
    public function getTimeRangeAttribute(): string
    {
        $start = $this->start_time ? $this->start_time->format('H:i') : '';
        $end = $this->end_time ? $this->end_time->format('H:i') : '';
        return "{$start} - {$end}";
    }

    /** Scope for specific day */
    public function scopeOnDay($query, int $day)
    {
        return $query->where('day_of_week', $day);
    }

    /** Scope ordered by time */
    public function scopeOrderByTime($query)
    {
        return $query->orderBy('start_time');
    }
}
