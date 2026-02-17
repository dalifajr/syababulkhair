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
        Schema::create('class_promotions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('from_class_group_id')->constrained('class_groups')->cascadeOnDelete();
            $table->foreignId('to_class_group_id')->nullable()->constrained('class_groups')->nullOnDelete();
            $table->foreignId('from_term_id')->constrained('terms')->cascadeOnDelete();
            $table->foreignId('to_term_id')->nullable()->constrained('terms')->nullOnDelete();
            $table->string('status'); // promoted (naik), retained (tinggal), graduated (lulus), transferred (pindah)
            $table->text('notes')->nullable();
            $table->foreignId('processed_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->unique(['student_id', 'from_term_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_promotions');
    }
};
