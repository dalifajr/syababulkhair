<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ClassEnrollment extends Model
{
    protected $fillable = [
        'class_group_id',
        'student_id',
    ];

    /** @return BelongsTo<ClassGroup, $this> */
    public function classGroup(): BelongsTo
    {
        return $this->belongsTo(ClassGroup::class);
    }

    /** @return BelongsTo<Student, $this> */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /** @return HasMany<HomeroomNote, $this> */
    public function homeroomNotes(): HasMany
    {
        return $this->hasMany(HomeroomNote::class);
    }

    /** @return HasMany<ReportCard, $this> */
    public function reportCards(): HasMany
    {
        return $this->hasMany(ReportCard::class);
    }

    /** @return HasOne<ClassPromotion, $this> */
    public function promotion(): HasOne
    {
        return $this->hasOne(ClassPromotion::class, 'from_class_group_id', 'class_group_id')
            ->where('student_id', $this->student_id);
    }
}
