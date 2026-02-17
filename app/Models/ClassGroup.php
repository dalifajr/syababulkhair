<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClassGroup extends Model
{
    protected $fillable = [
        'term_id',
        'name',
        'level',
        'stage',
        'homeroom_teacher_user_id',
    ];

    /** @return BelongsTo<Term, $this> */
    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    /** @return BelongsTo<User, $this> */
    public function homeroomTeacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'homeroom_teacher_user_id');
    }

    /** @return HasMany<ClassEnrollment, $this> */
    public function enrollments(): HasMany
    {
        return $this->hasMany(ClassEnrollment::class);
    }

    /** @return HasMany<TeachingAssignment, $this> */
    public function teachingAssignments(): HasMany
    {
        return $this->hasMany(TeachingAssignment::class);
    }
}
