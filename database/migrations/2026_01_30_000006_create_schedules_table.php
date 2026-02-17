<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teaching_assignment_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('day_of_week'); // 1=Senin, 2=Selasa, ..., 7=Minggu
            $table->time('start_time');
            $table->time('end_time');
            $table->string('room')->nullable(); // Ruangan/kelas
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['teaching_assignment_id', 'day_of_week']);
            $table->index('day_of_week');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
