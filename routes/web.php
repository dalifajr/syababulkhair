<?php

use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HelpController;
use App\Http\Controllers\ReportController;
use App\Models\ProfileContent;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $profileContents = ProfileContent::where('is_active', true)
        ->orderBy('section')
        ->orderBy('sort_order')
        ->get()
        ->groupBy('section')
        ->map(function ($items) {
            return $items->pluck('value', 'key');
        });

    return Inertia::render('profil-yayasan', [
        'canRegister' => Features::enabled(Features::registration()),
        'profileContents' => $profileContents,
    ]);
})->name('home');

Route::get('/e-rapor', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('e-rapor');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Assessments (untuk guru dan admin)
    Route::get('assessments', [AssessmentController::class, 'index'])->name('assessments.index');
    Route::get('assessments/{assignment}', [AssessmentController::class, 'show'])->name('assessments.show');
    Route::get('assessments/{assignment}/students', [AssessmentController::class, 'students'])->name('assessments.students');
    Route::get('assessments/{assignment}/tasks', [AssessmentController::class, 'tasks'])->name('assessments.tasks');
    Route::get('assessments/{assignment}/attendance', [AttendanceController::class, 'index'])->name('assessments.attendance');
    Route::post('assessments/{assignment}/attendance', [AttendanceController::class, 'store'])->name('assessments.attendance.store');
    Route::get('assessments/{assignment}/attendance/{session}', [AttendanceController::class, 'show'])->name('assessments.attendance.show');
    Route::post('assessments/{assignment}/attendance/{session}', [AttendanceController::class, 'update'])->name('assessments.attendance.update');
    Route::get('assessments/{assignment}/create', [AssessmentController::class, 'createAssessment'])->name('assessments.create');
    Route::post('assessments/{assignment}', [AssessmentController::class, 'storeAssessment'])->name('assessments.store');
    Route::post('assessments/{assignment}/students', [AssessmentController::class, 'addStudents'])->name('assessments.students.add');
    Route::get('assessments/scores/{assessment}', [AssessmentController::class, 'inputScores'])->name('assessments.scores');
    Route::post('assessments/scores/{assessment}', [AssessmentController::class, 'saveScores'])->name('assessments.scores.save');
    Route::get('assessments/scores/{assessment}/template', [AssessmentController::class, 'downloadScoresTemplate'])->name('assessments.scores.template');
    Route::post('assessments/scores/{assessment}/import', [AssessmentController::class, 'importScores'])->name('assessments.scores.import');
    Route::delete('assessments/items/{assessment}', [AssessmentController::class, 'destroyAssessment'])->name('assessments.items.destroy');

    // Reports
    Route::get('reports/students', [ReportController::class, 'students'])->name('reports.students');
    Route::get('reports/students/export', [ReportController::class, 'exportStudents'])->name('reports.students.export');
    Route::get('reports/students/{student}', [ReportController::class, 'studentDetail'])->name('reports.students.detail');
    Route::get('reports/scores', [ReportController::class, 'scores'])->name('reports.scores');
    Route::get('reports/scores/export', [ReportController::class, 'exportScores'])->name('reports.scores.export');

    // Notifications
    Route::get('notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');
    Route::get('notifications/unread-count', [\App\Http\Controllers\NotificationController::class, 'unreadCount'])->name('notifications.unreadCount');

    // Attendance Analytics
    Route::get('reports/attendance', [\App\Http\Controllers\AttendanceController::class, 'analytics'])->name('reports.attendance');

    // Help
    Route::get('help', [HelpController::class, 'index'])->name('help');

    // My Classes (redirect to assessments)
    Route::get('my-classes', fn() => redirect()->route('assessments.index'))->name('my-classes');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
require __DIR__.'/parent.php';
