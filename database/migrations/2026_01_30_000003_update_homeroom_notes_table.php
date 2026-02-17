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
        Schema::table('homeroom_notes', function (Blueprint $table) {
            $table->foreignId('class_enrollment_id')->after('id')->constrained()->cascadeOnDelete();
            $table->foreignId('term_id')->after('class_enrollment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by_user_id')->nullable()->after('term_id')->constrained('users')->nullOnDelete();
            $table->text('academic_note')->nullable()->after('created_by_user_id'); // Catatan akademik
            $table->text('personality_note')->nullable()->after('academic_note'); // Catatan kepribadian/sikap
            $table->text('attendance_note')->nullable()->after('personality_note'); // Catatan kehadiran
            $table->text('recommendation')->nullable()->after('attendance_note'); // Saran untuk siswa
            $table->text('parent_note')->nullable()->after('recommendation'); // Catatan untuk orang tua

            $table->unique(['class_enrollment_id', 'term_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('homeroom_notes', function (Blueprint $table) {
            $table->dropUnique(['class_enrollment_id', 'term_id']);
            $table->dropForeign(['class_enrollment_id']);
            $table->dropForeign(['term_id']);
            $table->dropForeign(['created_by_user_id']);
            $table->dropColumn([
                'class_enrollment_id',
                'term_id',
                'created_by_user_id',
                'academic_note',
                'personality_note',
                'attendance_note',
                'recommendation',
                'parent_note',
            ]);
        });
    }
};
