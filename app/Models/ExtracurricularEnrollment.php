<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExtracurricularEnrollment extends Model
{
    protected $fillable = [
        'extracurricular_id',
        'student_id',
        'term_id',
        'grade',
        'description',
    ];

    public function extracurricular(): BelongsTo
    {
        return $this->belongsTo(Extracurricular::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }
}
