<?php

namespace App\Models;

use App\Models\AssessmentScore;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'nis',
        'name',
        'gender',
        'birth_date',
        'birth_place',
        'religion',
        'address',
        'phone',
        'photo',
        'father_name',
        'father_phone',
        'father_occupation',
        'mother_name',
        'mother_phone',
        'mother_occupation',
        'guardian_name',
        'guardian_phone',
        'guardian_relationship',
        'entry_year',
        'previous_school',
        'notes',
        'status',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    /** @return HasMany<ClassEnrollment, $this> */
    public function enrollments(): HasMany
    {
        return $this->hasMany(ClassEnrollment::class);
    }

    /** @return HasMany<AssessmentScore, $this> */
    public function assessmentScores(): HasMany
    {
        return $this->hasMany(AssessmentScore::class);
    }

    /** @return HasMany<AttendanceRecord, $this> */
    public function attendanceRecords(): HasMany
    {
        return $this->hasMany(AttendanceRecord::class);
    }

    /** @return HasMany<User, $this> */
    public function parentAccounts(): HasMany
    {
        return $this->hasMany(User::class)->where('role', 'parent');
    }

    /** Get current class enrollment */
    public function currentEnrollment(): ?ClassEnrollment
    {
        return $this->enrollments()
            ->whereHas('classGroup.term', fn($q) => $q->where('is_active', true))
            ->first();
    }

    /** Get full name with NIS */
    public function getFullIdentityAttribute(): string
    {
        return "{$this->nis} - {$this->name}";
    }
}
