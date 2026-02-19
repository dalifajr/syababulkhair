<?php

use App\Http\Controllers\Admin\AcademicYearController;
use App\Http\Controllers\Admin\AchievementPostController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\Admin\BehavioralNoteController;
use App\Http\Controllers\Admin\ClassGroupController;
use App\Http\Controllers\Admin\ClassPromotionController;
use App\Http\Controllers\Admin\ExtracurricularController;
use App\Http\Controllers\Admin\GalleryPostController;
use App\Http\Controllers\Admin\HomeroomNoteController;
use App\Http\Controllers\Admin\KkmController;
use App\Http\Controllers\Admin\ReportCardController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\TeachingAssignmentController;
use App\Http\Controllers\Admin\ProfileContentController;
use App\Http\Controllers\Admin\TermController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'can:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::redirect('/', '/admin/students');

        // Profile Content (Kelola Profil Yayasan)
        Route::get('profile-content', [ProfileContentController::class, 'index'])->name('profile-content.index');
        Route::get('profile-content/create', [ProfileContentController::class, 'create'])->name('profile-content.create');
        Route::post('profile-content', [ProfileContentController::class, 'store'])->name('profile-content.store');
        Route::get('profile-content/{profileContent}/edit', [ProfileContentController::class, 'edit'])->name('profile-content.edit');
        Route::put('profile-content/{profileContent}', [ProfileContentController::class, 'update'])->name('profile-content.update');
        Route::delete('profile-content/{profileContent}', [ProfileContentController::class, 'destroy'])->name('profile-content.destroy');
        Route::post('profile-content/{profileContent}/toggle-active', [ProfileContentController::class, 'toggleActive'])->name('profile-content.toggle-active');

        // Gallery Posts (Dokumentasi Kegiatan)
        Route::get('gallery-posts', [GalleryPostController::class, 'index'])->name('gallery-posts.index');
        Route::get('gallery-posts/create', [GalleryPostController::class, 'create'])->name('gallery-posts.create');
        Route::post('gallery-posts', [GalleryPostController::class, 'store'])->name('gallery-posts.store');
        Route::get('gallery-posts/{galleryPost}/edit', [GalleryPostController::class, 'edit'])->name('gallery-posts.edit');
        Route::put('gallery-posts/{galleryPost}', [GalleryPostController::class, 'update'])->name('gallery-posts.update');
        Route::delete('gallery-posts/{galleryPost}', [GalleryPostController::class, 'destroy'])->name('gallery-posts.destroy');

        // Achievement Posts (Prestasi Membanggakan)
        Route::get('achievement-posts', [AchievementPostController::class, 'index'])->name('achievement-posts.index');
        Route::get('achievement-posts/create', [AchievementPostController::class, 'create'])->name('achievement-posts.create');
        Route::post('achievement-posts', [AchievementPostController::class, 'store'])->name('achievement-posts.store');
        Route::get('achievement-posts/{achievementPost}/edit', [AchievementPostController::class, 'edit'])->name('achievement-posts.edit');
        Route::put('achievement-posts/{achievementPost}', [AchievementPostController::class, 'update'])->name('achievement-posts.update');
        Route::delete('achievement-posts/{achievementPost}', [AchievementPostController::class, 'destroy'])->name('achievement-posts.destroy');

        // Students
        Route::get('students', [StudentController::class, 'index'])->name('students.index');
        Route::get('students/create', [StudentController::class, 'create'])->name('students.create');
        Route::post('students', [StudentController::class, 'store'])->name('students.store');
        Route::get('students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
        Route::put('students/{student}', [StudentController::class, 'update'])->name('students.update');
        Route::delete('students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
        Route::get('students/template/download', [StudentController::class, 'downloadTemplate'])->name('students.template');
        Route::post('students/import', [StudentController::class, 'import'])->name('students.import');

        // Subjects
        Route::get('subjects', [SubjectController::class, 'index'])->name('subjects.index');
        Route::get('subjects/create', [SubjectController::class, 'create'])->name('subjects.create');
        Route::post('subjects', [SubjectController::class, 'store'])->name('subjects.store');
        Route::get('subjects/{subject}/edit', [SubjectController::class, 'edit'])->name('subjects.edit');
        Route::put('subjects/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
        Route::delete('subjects/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');

        // Class Groups
        Route::get('class-groups', [ClassGroupController::class, 'index'])->name('class-groups.index');
        Route::get('class-groups/create', [ClassGroupController::class, 'create'])->name('class-groups.create');
        Route::post('class-groups', [ClassGroupController::class, 'store'])->name('class-groups.store');
        Route::get('class-groups/{classGroup}/edit', [ClassGroupController::class, 'edit'])->name('class-groups.edit');
        Route::put('class-groups/{classGroup}', [ClassGroupController::class, 'update'])->name('class-groups.update');
        Route::delete('class-groups/{classGroup}', [ClassGroupController::class, 'destroy'])->name('class-groups.destroy');

        // Teachers
        Route::get('teachers', [TeacherController::class, 'index'])->name('teachers.index');
        Route::get('teachers/create', [TeacherController::class, 'create'])->name('teachers.create');
        Route::post('teachers', [TeacherController::class, 'store'])->name('teachers.store');
        Route::get('teachers/{teacher}/edit', [TeacherController::class, 'edit'])->name('teachers.edit');
        Route::put('teachers/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
        Route::delete('teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');

        // Academic Years
        Route::get('academic-years', [AcademicYearController::class, 'index'])->name('academic-years.index');
        Route::get('academic-years/create', [AcademicYearController::class, 'create'])->name('academic-years.create');
        Route::post('academic-years', [AcademicYearController::class, 'store'])->name('academic-years.store');
        Route::get('academic-years/{academicYear}/edit', [AcademicYearController::class, 'edit'])->name('academic-years.edit');
        Route::put('academic-years/{academicYear}', [AcademicYearController::class, 'update'])->name('academic-years.update');
        Route::delete('academic-years/{academicYear}', [AcademicYearController::class, 'destroy'])->name('academic-years.destroy');

        // Terms
        Route::get('terms', [TermController::class, 'index'])->name('terms.index');
        Route::get('terms/create', [TermController::class, 'create'])->name('terms.create');
        Route::post('terms', [TermController::class, 'store'])->name('terms.store');
        Route::get('terms/{term}/edit', [TermController::class, 'edit'])->name('terms.edit');
        Route::put('terms/{term}', [TermController::class, 'update'])->name('terms.update');
        Route::delete('terms/{term}', [TermController::class, 'destroy'])->name('terms.destroy');

        // Teaching Assignments
        Route::get('teaching-assignments', [TeachingAssignmentController::class, 'index'])->name('teaching-assignments.index');
        Route::get('teaching-assignments/create', [TeachingAssignmentController::class, 'create'])->name('teaching-assignments.create');
        Route::post('teaching-assignments', [TeachingAssignmentController::class, 'store'])->name('teaching-assignments.store');
        Route::get('teaching-assignments/{teachingAssignment}/edit', [TeachingAssignmentController::class, 'edit'])->name('teaching-assignments.edit');
        Route::put('teaching-assignments/{teachingAssignment}', [TeachingAssignmentController::class, 'update'])->name('teaching-assignments.update');
        Route::delete('teaching-assignments/{teachingAssignment}', [TeachingAssignmentController::class, 'destroy'])->name('teaching-assignments.destroy');

        // KKM (Kriteria Ketuntasan Minimal)
        Route::get('kkm', [KkmController::class, 'index'])->name('kkm.index');
        Route::post('kkm', [KkmController::class, 'store'])->name('kkm.store');
        Route::post('kkm/bulk', [KkmController::class, 'bulkStore'])->name('kkm.bulk-store');

        // Settings
        Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
        Route::put('settings', [SettingsController::class, 'update'])->name('settings.update');

        // Homeroom Notes (Catatan Wali Kelas)
        Route::get('homeroom-notes', [HomeroomNoteController::class, 'index'])->name('homeroom-notes.index');
        Route::get('homeroom-notes/{classGroup}', [HomeroomNoteController::class, 'show'])->name('homeroom-notes.show');
        Route::get('homeroom-notes/edit/{enrollment}', [HomeroomNoteController::class, 'edit'])->name('homeroom-notes.edit');
        Route::put('homeroom-notes/{enrollment}', [HomeroomNoteController::class, 'update'])->name('homeroom-notes.update');

        // Announcements (Pengumuman)
        Route::get('announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
        Route::get('announcements/create', [AnnouncementController::class, 'create'])->name('announcements.create');
        Route::post('announcements', [AnnouncementController::class, 'store'])->name('announcements.store');
        Route::get('announcements/{announcement}/edit', [AnnouncementController::class, 'edit'])->name('announcements.edit');
        Route::put('announcements/{announcement}', [AnnouncementController::class, 'update'])->name('announcements.update');
        Route::delete('announcements/{announcement}', [AnnouncementController::class, 'destroy'])->name('announcements.destroy');
        Route::post('announcements/{announcement}/toggle-publish', [AnnouncementController::class, 'togglePublish'])->name('announcements.toggle-publish');

        // Schedules (Jadwal Pelajaran)
        Route::get('schedules', [ScheduleController::class, 'index'])->name('schedules.index');
        Route::get('schedules/create', [ScheduleController::class, 'create'])->name('schedules.create');
        Route::post('schedules', [ScheduleController::class, 'store'])->name('schedules.store');
        Route::get('schedules/{schedule}/edit', [ScheduleController::class, 'edit'])->name('schedules.edit');
        Route::put('schedules/{schedule}', [ScheduleController::class, 'update'])->name('schedules.update');
        Route::delete('schedules/{schedule}', [ScheduleController::class, 'destroy'])->name('schedules.destroy');

        // Class Promotions (Kenaikan Kelas)
        Route::get('class-promotions', [ClassPromotionController::class, 'index'])->name('class-promotions.index');
        Route::get('class-promotions/{classGroup}', [ClassPromotionController::class, 'show'])->name('class-promotions.show');
        Route::post('class-promotions/{classGroup}/process', [ClassPromotionController::class, 'process'])->name('class-promotions.process');
        Route::post('class-promotions/{classGroup}/bulk', [ClassPromotionController::class, 'bulkPromote'])->name('class-promotions.bulk');

        // Report Cards (Rapor)
        Route::get('report-cards', [ReportCardController::class, 'index'])->name('report-cards.index');
        Route::post('report-cards/generate', [ReportCardController::class, 'generate'])->name('report-cards.generate');
        Route::get('report-cards/{reportCard}', [ReportCardController::class, 'show'])->name('report-cards.show');
        Route::get('report-cards/{reportCard}/edit', [ReportCardController::class, 'edit'])->name('report-cards.edit');
        Route::put('report-cards/{reportCard}', [ReportCardController::class, 'update'])->name('report-cards.update');
        Route::post('report-cards/{reportCard}/lock', [ReportCardController::class, 'lock'])->name('report-cards.lock');
        Route::post('report-cards/{reportCard}/unlock', [ReportCardController::class, 'unlock'])->name('report-cards.unlock');
        Route::get('report-cards/{reportCard}/print', [ReportCardController::class, 'print'])->name('report-cards.print');

        // Extracurriculars (Ekstrakurikuler)
        Route::get('extracurriculars', [ExtracurricularController::class, 'index'])->name('extracurriculars.index');
        Route::get('extracurriculars/create', [ExtracurricularController::class, 'create'])->name('extracurriculars.create');
        Route::post('extracurriculars', [ExtracurricularController::class, 'store'])->name('extracurriculars.store');
        Route::get('extracurriculars/{extracurricular}/edit', [ExtracurricularController::class, 'edit'])->name('extracurriculars.edit');
        Route::put('extracurriculars/{extracurricular}', [ExtracurricularController::class, 'update'])->name('extracurriculars.update');
        Route::delete('extracurriculars/{extracurricular}', [ExtracurricularController::class, 'destroy'])->name('extracurriculars.destroy');
        Route::post('extracurriculars/{extracurricular}/enroll', [ExtracurricularController::class, 'enroll'])->name('extracurriculars.enroll');
        Route::put('extracurricular-enrollments/{enrollment}', [ExtracurricularController::class, 'updateEnrollment'])->name('extracurricular-enrollments.update');
        Route::delete('extracurricular-enrollments/{enrollment}', [ExtracurricularController::class, 'removeEnrollment'])->name('extracurricular-enrollments.destroy');

        // Database Backup & Restore
        Route::get('backup', [BackupController::class, 'index'])->name('backup.index');
        Route::post('backup/create', [BackupController::class, 'create'])->name('backup.create');
        Route::get('backup/download/{filename}', [BackupController::class, 'download'])->name('backup.download');
        Route::post('backup/restore', [BackupController::class, 'restore'])->name('backup.restore');
        Route::delete('backup/{filename}', [BackupController::class, 'destroy'])->name('backup.destroy');

        // Behavioral Notes (Catatan Perilaku)
        Route::get('behavioral-notes', [BehavioralNoteController::class, 'index'])->name('behavioral-notes.index');
        Route::get('behavioral-notes/create', [BehavioralNoteController::class, 'create'])->name('behavioral-notes.create');
        Route::post('behavioral-notes', [BehavioralNoteController::class, 'store'])->name('behavioral-notes.store');
        Route::get('behavioral-notes/{behavioralNote}/edit', [BehavioralNoteController::class, 'edit'])->name('behavioral-notes.edit');
        Route::put('behavioral-notes/{behavioralNote}', [BehavioralNoteController::class, 'update'])->name('behavioral-notes.update');
        Route::delete('behavioral-notes/{behavioralNote}', [BehavioralNoteController::class, 'destroy'])->name('behavioral-notes.destroy');
    });

