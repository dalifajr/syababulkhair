<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClassPromotion extends Model
{
    // Status constants
    public const STATUS_PROMOTED = 'promoted';     // Naik kelas
    public const STATUS_RETAINED = 'retained';     // Tinggal kelas
    public const STATUS_GRADUATED = 'graduated';   // Lulus
    public const STATUS_TRANSFERRED = 'transferred'; // Pindah sekolah

    public const STATUSES = [
        self::STATUS_PROMOTED => 'Naik Kelas',
        self::STATUS_RETAINED => 'Tinggal Kelas',
        self::STATUS_GRADUATED => 'Lulus',
        self::STATUS_TRANSFERRED => 'Pindah',
    ];

    protected $fillable = [
        'student_id',
        'from_class_group_id',
        'to_class_group_id',
        'from_term_id',
        'to_term_id',
        'status',
        'notes',
        'processed_by_user_id',
        'processed_at',
    ];

    protected $casts = [
        'processed_at' => 'datetime',
    ];

    /** @return BelongsTo<Student, $this> */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /** @return BelongsTo<ClassGroup, $this> */
    public function fromClassGroup(): BelongsTo
    {
        return $this->belongsTo(ClassGroup::class, 'from_class_group_id');
    }

    /** @return BelongsTo<ClassGroup, $this> */
    public function toClassGroup(): BelongsTo
    {
        return $this->belongsTo(ClassGroup::class, 'to_class_group_id');
    }

    /** @return BelongsTo<Term, $this> */
    public function fromTerm(): BelongsTo
    {
        return $this->belongsTo(Term::class, 'from_term_id');
    }

    /** @return BelongsTo<Term, $this> */
    public function toTerm(): BelongsTo
    {
        return $this->belongsTo(Term::class, 'to_term_id');
    }

    /** @return BelongsTo<User, $this> */
    public function processedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by_user_id');
    }

    /** Get status label */
    public function getStatusLabelAttribute(): string
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }
}
