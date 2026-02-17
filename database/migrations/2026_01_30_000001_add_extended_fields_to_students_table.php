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
        Schema::table('students', function (Blueprint $table) {
            // Data Pribadi Tambahan
            $table->string('birth_place')->nullable()->after('birth_date');
            $table->string('religion')->nullable()->after('birth_place');
            $table->string('address')->nullable()->after('religion');
            $table->string('phone')->nullable()->after('address');
            $table->string('photo')->nullable()->after('phone');
            
            // Data Orang Tua/Wali
            $table->string('father_name')->nullable()->after('photo');
            $table->string('father_phone')->nullable()->after('father_name');
            $table->string('father_occupation')->nullable()->after('father_phone');
            $table->string('mother_name')->nullable()->after('father_occupation');
            $table->string('mother_phone')->nullable()->after('mother_name');
            $table->string('mother_occupation')->nullable()->after('mother_phone');
            $table->string('guardian_name')->nullable()->after('mother_occupation');
            $table->string('guardian_phone')->nullable()->after('guardian_name');
            $table->string('guardian_relationship')->nullable()->after('guardian_phone');
            
            // Data Akademik
            $table->string('entry_year')->nullable()->after('guardian_relationship');
            $table->string('previous_school')->nullable()->after('entry_year');
            $table->text('notes')->nullable()->after('previous_school');
            
            // Soft Deletes
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn([
                'birth_place',
                'religion',
                'address',
                'phone',
                'photo',
                'father_name',
                'father_phone',
                'father_occupation',
                'mother_name',
                'mother_phone',
                'mother_occupation',
                'guardian_name',
                'guardian_phone',
                'guardian_relationship',
                'entry_year',
                'previous_school',
                'notes',
            ]);
            $table->dropSoftDeletes();
        });
    }
};
