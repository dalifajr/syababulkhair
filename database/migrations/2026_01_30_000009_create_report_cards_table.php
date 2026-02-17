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
        Schema::create('report_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_enrollment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('term_id')->constrained()->cascadeOnDelete();
            $table->decimal('total_score', 8, 2)->nullable();
            $table->decimal('average_score', 5, 2)->nullable();
            $table->unsignedInteger('rank')->nullable(); // Ranking di kelas
            $table->unsignedInteger('total_students')->nullable(); // Total siswa di kelas saat itu
            $table->unsignedInteger('sick_days')->default(0);
            $table->unsignedInteger('permit_days')->default(0);
            $table->unsignedInteger('absent_days')->default(0);
            $table->string('promotion_status')->nullable(); // promoted, retained, pending
            $table->text('principal_note')->nullable(); // Catatan kepala sekolah
            $table->foreignId('generated_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('generated_at')->nullable();
            $table->timestamp('locked_at')->nullable(); // Jika sudah dikunci, tidak bisa diedit
            $table->timestamps();

            $table->unique(['class_enrollment_id', 'term_id']);
            $table->index(['term_id', 'rank']);
        });

        // Detail nilai per mata pelajaran di rapor
        Schema::create('report_card_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_card_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->decimal('knowledge_score', 5, 2)->nullable(); // Nilai pengetahuan
            $table->decimal('skill_score', 5, 2)->nullable(); // Nilai keterampilan
            $table->string('knowledge_grade')->nullable(); // A, B, C, D
            $table->string('skill_grade')->nullable();
            $table->text('description')->nullable(); // Deskripsi capaian
            $table->unsignedSmallInteger('kkm')->nullable(); // KKM saat itu
            $table->timestamps();

            $table->unique(['report_card_id', 'subject_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_card_subjects');
        Schema::dropIfExists('report_cards');
    }
};
