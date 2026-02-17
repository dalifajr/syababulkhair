<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('extracurricular_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('extracurricular_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('term_id')->constrained()->cascadeOnDelete();
            $table->string('grade')->nullable(); // A, B, C, etc.
            $table->text('description')->nullable(); // Catatan deskriptif
            $table->timestamps();

            $table->unique(['extracurricular_id', 'student_id', 'term_id'], 'ekskul_student_term_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('extracurricular_enrollments');
    }
};
