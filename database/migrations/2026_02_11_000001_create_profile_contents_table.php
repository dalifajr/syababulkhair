<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_contents', function (Blueprint $table) {
            $table->id();
            $table->string('section'); // hero, about, visi, misi, programs, gallery, location, contact, footer
            $table->string('key')->unique(); // unique identifier like 'hero_title', 'about_text', etc.
            $table->string('type'); // text, textarea, image, logo
            $table->string('label'); // Display label for admin UI
            $table->text('value')->nullable(); // text content or image path
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_contents');
    }
};
