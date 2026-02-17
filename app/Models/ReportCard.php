<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReportCard extends Model
{
    // Promotion status constants
    public const PROMOTION_PROMOTED = 'promoted';
    public const PROMOTION_RETAINED = 'retained';
    public const PROMOTION_PENDING = 'pending';

    public const PROMOTION_STATUSES = [
        self::PROMOTION_PROMOTED => 'Naik Kelas',
        self::PROMOTION_RETAINED => 'Tinggal Kelas',
        self::PROMOTION_PENDING => 'Belum Ditentukan',
    ];

    protected $fillable = [
        'class_enrollment_id',
        'term_id',
        'total_score',
        'average_score',
        'rank',
        'total_students',
        'sick_days',
        'permit_days',
        'absent_days',
        'promotion_status',
        'principal_note',
        'generated_by_user_id',
        'generated_at',
        'locked_at',
    ];

    protected $casts = [
        'total_score' => 'decimal:2',
        'average_score' => 'decimal:2',
        'rank' => 'integer',
        'total_students' => 'integer',
        'sick_days' => 'integer',
        'permit_days' => 'integer',
        'absent_days' => 'integer',
        'generated_at' => 'datetime',
        'locked_at' => 'datetime',
    ];

    /** @return BelongsTo<ClassEnrollment, $this> */
    public function classEnrollment(): BelongsTo
    {
        return $this->belongsTo(ClassEnrollment::class);
    }

    /** @return BelongsTo<Term, $this> */
    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    /** @return BelongsTo<User, $this> */
    public function generatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by_user_id');
    }

    /** @return HasMany<ReportCardSubject, $this> */
    public function subjects(): HasMany
    {
        return $this->hasMany(ReportCardSubject::class);
    }

    /** Check if report card is locked */
    public function isLocked(): bool
    {
        return $this->locked_at !== null;
    }

    /** Get promotion status label */
    public function getPromotionStatusLabelAttribute(): string
    {
        return self::PROMOTION_STATUSES[$this->promotion_status] ?? $this->promotion_status ?? 'Belum Ditentukan';
    }

    /** Get total absence (sakit + izin + alfa) */
    public function getTotalAbsenceAttribute(): int
    {
        return $this->sick_days + $this->permit_days + $this->absent_days;
    }
}
