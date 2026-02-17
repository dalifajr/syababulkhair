<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InstitutionSetting extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'logo_path',
        'address',
        'phone',
        'email',
        'website',
        'principal_name',
        'npsn',
        'letterhead_enabled',
        'letterhead_line1',
        'letterhead_line2',
        'letterhead_line3',
        'active_term_id',
    ];

    /** @return BelongsTo<Term, $this> */
    public function activeTerm(): BelongsTo
    {
        return $this->belongsTo(Term::class, 'active_term_id');
    }
}
