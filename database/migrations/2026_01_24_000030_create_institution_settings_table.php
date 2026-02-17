<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('institution_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('RQ Syababul Khair');
            $table->string('short_name')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->foreignId('active_term_id')->nullable()->constrained('terms')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('institution_settings');
    }
};
