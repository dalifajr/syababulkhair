<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomeroomNote extends Model
{
    protected $fillable = [
        'class_enrollment_id',
        'term_id',
        'created_by_user_id',
        'academic_note',
        'personality_note',
        'attendance_note',
        'recommendation',
        'parent_note',
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
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
}
