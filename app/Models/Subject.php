<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    public const CATEGORY_FORMAL = 'formal';
    public const CATEGORY_QURAN = 'quran';

    protected $fillable = [
        'name',
        'category',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'bool',
    ];

    /** @return HasMany<TeachingAssignment, $this> */
    public function teachingAssignments(): HasMany
    {
        return $this->hasMany(TeachingAssignment::class);
    }

    /** @return HasMany<SubjectKkm, $this> */
    public function kkmSettings(): HasMany
    {
        return $this->hasMany(SubjectKkm::class);
    }
}
