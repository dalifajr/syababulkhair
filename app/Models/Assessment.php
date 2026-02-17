<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assessment extends Model
{
    use SoftDeletes;

    // Konstanta untuk kategori penilaian
    public const CATEGORY_TUGAS = 'tugas';
    public const CATEGORY_QUIZ = 'quiz';
    public const CATEGORY_UTS = 'uts';
    public const CATEGORY_UAS = 'uas';
    public const CATEGORY_PRAKTIK = 'praktik';

    public const CATEGORIES = [
        self::CATEGORY_TUGAS => 'Tugas',
        self::CATEGORY_QUIZ => 'Quiz',
        self::CATEGORY_UTS => 'UTS',
        self::CATEGORY_UAS => 'UAS',
        self::CATEGORY_PRAKTIK => 'Praktik',
    ];

    protected $fillable = [
        'teaching_assignment_id',
        'name',
        'category',
        'weight',
        'description',
        'max_score',
        'is_published',
        'date',
    ];

    protected $casts = [
        'is_published' => 'bool',
        'date' => 'date',
        'weight' => 'integer',
    ];

    /** @return BelongsTo<TeachingAssignment, $this> */
    public function teachingAssignment(): BelongsTo
    {
        return $this->belongsTo(TeachingAssignment::class);
    }

    /** @return HasMany<AssessmentScore, $this> */
    public function scores(): HasMany
    {
        return $this->hasMany(AssessmentScore::class);
    }

    /** Get category label */
    public function getCategoryLabelAttribute(): string
    {
        return self::CATEGORIES[$this->category] ?? $this->category;
    }

    /** Calculate weighted score for a given raw score */
    public function calculateWeightedScore(float $rawScore): float
    {
        if ($this->max_score <= 0) {
            return 0;
        }
        return ($rawScore / $this->max_score) * $this->weight;
    }
}
