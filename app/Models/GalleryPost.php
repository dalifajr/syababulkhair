<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryPost extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image_path',
        'event_date',
        'is_published',
        'created_by_user_id',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'event_date' => 'date',
    ];

    /** @return BelongsTo<User, $this> */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
