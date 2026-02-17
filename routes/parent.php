<?php

use App\Http\Controllers\ParentPortalController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Parent Portal Routes
|--------------------------------------------------------------------------
|
| Routes untuk portal orang tua/wali siswa
|
*/

Route::middleware(['auth', 'verified'])
    ->prefix('parent')
    ->name('parent.')
    ->group(function () {
        // Dashboard
        Route::get('/', [ParentPortalController::class, 'dashboard'])->name('dashboard');
        
        // Nilai
        Route::get('scores', [ParentPortalController::class, 'scores'])->name('scores');
        
        // Kehadiran
        Route::get('attendance', [ParentPortalController::class, 'attendance'])->name('attendance');
        
        // Jadwal
        Route::get('schedule', [ParentPortalController::class, 'schedule'])->name('schedule');
        
        // Rapor
        Route::get('report-cards', [ParentPortalController::class, 'reportCards'])->name('report-cards');
        Route::get('report-cards/{reportCard}', [ParentPortalController::class, 'reportCardDetail'])->name('report-cards.show');
        
        // Pengumuman
        Route::get('announcements', [ParentPortalController::class, 'announcements'])->name('announcements');
        Route::get('announcements/{announcement}', [ParentPortalController::class, 'announcementDetail'])->name('announcements.show');

        // Ekstrakurikuler
        Route::get('extracurriculars', [ParentPortalController::class, 'extracurriculars'])->name('extracurriculars');
    });
