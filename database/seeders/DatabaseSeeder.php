<?php

namespace Database\Seeders;

use App\Models\InstitutionSetting;
use App\Models\Subject;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::query()->updateOrCreate(
            ['email' => 'admin@rq.local'],
            [
                'name' => 'admin',
                'role' => 'admin',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
            ]
        );

        InstitutionSetting::query()->firstOrCreate([], [
            'name' => 'RQ Syababul Khair',
            'short_name' => 'RQ',
        ]);

        Subject::query()->firstOrCreate([
            'name' => 'Literasi Formal',
            'category' => Subject::CATEGORY_FORMAL,
        ], [
            'is_active' => true,
        ]);

        Subject::query()->firstOrCreate([
            'name' => 'Literasi Alquran',
            'category' => Subject::CATEGORY_QURAN,
        ], [
            'is_active' => true,
        ]);
    }
}
