<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Announcement extends Model
{
    use SoftDeletes;

    // Type constants
    public const TYPE_GENERAL = 'general';
    public const TYPE_ACADEMIC = 'academic';
    public const TYPE_EVENT = 'event';

    public const TYPES = [
        self::TYPE_GENERAL => 'Umum',
        self::TYPE_ACADEMIC => 'Akademik',
        self::TYPE_EVENT => 'Acara',
    ];

    // Target audience constants
    public const AUDIENCE_ALL = 'all';
    public const AUDIENCE_TEACHERS = 'teachers';
    public const AUDIENCE_PARENTS = 'parents';
    public const AUDIENCE_STUDENTS = 'students';

    public const AUDIENCES = [
        self::AUDIENCE_ALL => 'Semua',
        self::AUDIENCE_TEACHERS => 'Guru',
        self::AUDIENCE_PARENTS => 'Orang Tua',
        self::AUDIENCE_STUDENTS => 'Siswa',
    ];

    protected $fillable = [
        'title',
        'content',
        'type',
        'target_audience',
        'created_by_user_id',
        'is_published',
        'is_pinned',
        'published_at',
        'expires_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_pinned' => 'boolean',
        'published_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    /** @return BelongsTo<User, $this> */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /** Get type label */
    public function getTypeLabelAttribute(): string
    {
        return self::TYPES[$this->type] ?? $this->type;
    }

    /** Get audience label */
    public function getAudienceLabelAttribute(): string
    {
        return self::AUDIENCES[$this->target_audience] ?? $this->target_audience;
    }

    /** Scope for published announcements */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
            ->where(function ($q) {
                $q->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            });
    }

    /** Scope for specific audience */
    public function scopeForAudience($query, string $audience)
    {
        return $query->where(function ($q) use ($audience) {
            $q->where('target_audience', self::AUDIENCE_ALL)
                ->orWhere('target_audience', $audience);
        });
    }
}
