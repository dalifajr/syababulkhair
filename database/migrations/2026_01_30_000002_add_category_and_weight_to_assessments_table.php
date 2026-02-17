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
        Schema::table('assessments', function (Blueprint $table) {
            // Kategori penilaian: tugas, uts, uas, praktik, quiz
            $table->string('category')->default('tugas')->after('name');
            // Bobot penilaian dalam persen (default 100 = tidak ada bobot khusus)
            $table->unsignedTinyInteger('weight')->default(100)->after('category');
            // Deskripsi tugas (opsional)
            $table->text('description')->nullable()->after('weight');
            // Soft Deletes
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->dropColumn(['category', 'weight', 'description']);
            $table->dropSoftDeletes();
        });
    }
};
