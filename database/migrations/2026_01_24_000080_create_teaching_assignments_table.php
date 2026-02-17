<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teaching_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('term_id')->constrained()->cascadeOnDelete();
            $table->foreignId('class_group_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->restrictOnDelete();
            $table->foreignId('teacher_user_id')->constrained('users')->restrictOnDelete();
            $table->timestamps();

            $table->unique(
                ['term_id', 'class_group_id', 'subject_id', 'teacher_user_id'],
                'teaching_assignments_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teaching_assignments');
    }
};
