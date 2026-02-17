<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attendance_session_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['unmarked', 'present', 'absent', 'sick', 'permit'])->default('unmarked');
            $table->string('note')->nullable();
            $table->foreignId('recorded_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['attendance_session_id', 'student_id']);
            $table->index(['attendance_session_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_records');
    }
};
