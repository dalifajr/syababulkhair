<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teaching_assignment_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedSmallInteger('max_score')->default(100);
            $table->boolean('is_published')->default(false);
            $table->date('date')->nullable();
            $table->timestamps();

            $table->index(['teaching_assignment_id', 'is_published']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
