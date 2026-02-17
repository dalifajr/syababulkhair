<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportCardSubject extends Model
{
    protected $fillable = [
        'report_card_id',
        'subject_id',
        'knowledge_score',
        'skill_score',
        'knowledge_grade',
        'skill_grade',
        'description',
        'kkm',
    ];

    protected $casts = [
        'knowledge_score' => 'decimal:2',
        'skill_score' => 'decimal:2',
        'kkm' => 'integer',
    ];

    /** @return BelongsTo<ReportCard, $this> */
    public function reportCard(): BelongsTo
    {
        return $this->belongsTo(ReportCard::class);
    }

    /** @return BelongsTo<Subject, $this> */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /** Check if knowledge score meets KKM */
    public function isKnowledgePassing(): bool
    {
        if ($this->kkm === null || $this->knowledge_score === null) {
            return true;
        }
        return $this->knowledge_score >= $this->kkm;
    }

    /** Check if skill score meets KKM */
    public function isSkillPassing(): bool
    {
        if ($this->kkm === null || $this->skill_score === null) {
            return true;
        }
        return $this->skill_score >= $this->kkm;
    }

    /** Convert score to grade letter */
    public static function scoreToGrade(float $score): string
    {
        if ($score >= 90) return 'A';
        if ($score >= 80) return 'B';
        if ($score >= 70) return 'C';
        return 'D';
    }
}
