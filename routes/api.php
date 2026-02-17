<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentApiController;
use App\Http\Controllers\Api\TeacherApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout-all', [AuthController::class, 'logoutAll']);
    Route::get('user', [AuthController::class, 'user']);

    // Student/Parent Portal API
    Route::prefix('student')->name('api.student.')->group(function () {
        Route::get('dashboard', [StudentApiController::class, 'dashboard'])->name('dashboard');
        Route::get('scores', [StudentApiController::class, 'scores'])->name('scores');
        Route::get('attendance', [StudentApiController::class, 'attendance'])->name('attendance');
        Route::get('schedule', [StudentApiController::class, 'schedule'])->name('schedule');
        Route::get('report-cards', [StudentApiController::class, 'reportCards'])->name('report-cards');
        Route::get('report-cards/{reportCard}', [StudentApiController::class, 'reportCardDetail'])->name('report-cards.show');
        Route::get('announcements', [StudentApiController::class, 'announcements'])->name('announcements');
    });

    // Teacher API
    Route::prefix('teacher')->name('api.teacher.')->group(function () {
        Route::get('assignments', [TeacherApiController::class, 'assignments'])->name('assignments');
        Route::get('assignments/{assignment}/students', [TeacherApiController::class, 'students'])->name('students');
        
        // Assessments
        Route::get('assignments/{assignment}/assessments', [TeacherApiController::class, 'assessments'])->name('assessments');
        Route::post('assignments/{assignment}/assessments', [TeacherApiController::class, 'storeAssessment'])->name('assessments.store');
        Route::get('assessments/{assessment}/scores', [TeacherApiController::class, 'scores'])->name('scores');
        Route::post('assessments/{assessment}/scores', [TeacherApiController::class, 'saveScores'])->name('scores.save');
        
        // Attendance
        Route::get('assignments/{assignment}/attendance', [TeacherApiController::class, 'attendanceSessions'])->name('attendance');
        Route::post('assignments/{assignment}/attendance', [TeacherApiController::class, 'storeAttendanceSession'])->name('attendance.store');
        Route::get('attendance/{session}', [TeacherApiController::class, 'attendanceRecords'])->name('attendance.show');
        Route::post('attendance/{session}', [TeacherApiController::class, 'updateAttendance'])->name('attendance.update');
    });
});
