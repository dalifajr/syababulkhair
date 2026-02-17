<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('extracurriculars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('teacher_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('day')->nullable(); // Senin, Selasa, etc.
            $table->time('time_start')->nullable();
            $table->time('time_end')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('extracurriculars');
    }
};
