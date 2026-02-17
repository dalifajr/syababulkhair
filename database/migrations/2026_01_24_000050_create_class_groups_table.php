<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('class_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('term_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedTinyInteger('level'); // TK/SD/SMP level disimpan angka bebas (mis: TK-A=0, 1..9)
            $table->string('stage'); // tk | sd | smp
            $table->foreignId('homeroom_teacher_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['term_id', 'stage', 'level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('class_groups');
    }
};
