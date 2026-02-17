<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('institution_settings', function (Blueprint $table) {
            $table->string('email')->nullable()->after('phone');
            $table->string('website')->nullable()->after('email');
            $table->string('principal_name')->nullable()->after('website');
            $table->string('npsn')->nullable()->after('principal_name');

            $table->boolean('letterhead_enabled')->default(false)->after('npsn');
            $table->string('letterhead_line1')->nullable()->after('letterhead_enabled');
            $table->string('letterhead_line2')->nullable()->after('letterhead_line1');
            $table->string('letterhead_line3')->nullable()->after('letterhead_line2');
        });
    }

    public function down(): void
    {
        Schema::table('institution_settings', function (Blueprint $table) {
            $table->dropColumn([
                'email',
                'website',
                'principal_name',
                'npsn',
                'letterhead_enabled',
                'letterhead_line1',
                'letterhead_line2',
                'letterhead_line3',
            ]);
        });
    }
};
