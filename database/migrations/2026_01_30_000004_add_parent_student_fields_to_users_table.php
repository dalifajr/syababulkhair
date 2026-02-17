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
        Schema::table('users', function (Blueprint $table) {
            // Tambah role baru: parent, student
            // Existing roles: admin, teacher
            // Untuk link ke student (jika user adalah parent/student)
            $table->foreignId('student_id')->nullable()->after('role')->constrained()->nullOnDelete();
            $table->string('phone')->nullable()->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['student_id']);
            $table->dropColumn(['student_id', 'phone']);
        });
    }
};
