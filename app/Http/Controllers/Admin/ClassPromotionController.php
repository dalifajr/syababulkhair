<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassEnrollment;
use App\Models\ClassGroup;
use App\Models\ClassPromotion;
use App\Models\Student;
use App\Models\Term;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ClassPromotionController extends Controller
{
    public function index(Request $request): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $fromTermId = $request->get('from_term_id', $activeTerm?->id);

        $terms = Term::with('academicYear')
            ->orderByDesc('starts_at')
            ->get();

        // Get class groups from selected term
        $classGroups = ClassGroup::where('term_id', $fromTermId)
            ->with(['term.academicYear', 'homeroomTeacher'])
            ->withCount('enrollments')
            ->orderBy('level')
            ->orderBy('name')
            ->get();

        // Get promotion statistics
        $promotionStats = ClassPromotion::where('from_term_id', $fromTermId)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        return Inertia::render('admin/class-promotions/index', [
            'classGroups' => $classGroups,
            'terms' => $terms,
            'filters' => [
                'from_term_id' => $fromTermId,
            ],
            'stats' => [
                'promoted' => $promotionStats['promoted'] ?? 0,
                'retained' => $promotionStats['retained'] ?? 0,
                'graduated' => $promotionStats['graduated'] ?? 0,
                'transferred' => $promotionStats['transferred'] ?? 0,
            ],
            'statuses' => ClassPromotion::STATUSES,
        ]);
    }

    public function show(ClassGroup $classGroup, Request $request): Response
    {
        $classGroup->load(['term.academicYear', 'homeroomTeacher']);

        // Get next term's class groups for promotion target
        $nextTermClassGroups = ClassGroup::whereHas('term', function ($q) use ($classGroup) {
            $q->where('starts_at', '>', $classGroup->term->ends_at);
        })
            ->with('term.academicYear')
            ->orderBy('level')
            ->orderBy('name')
            ->get();

        // Get enrollments with promotion status
        $enrollments = ClassEnrollment::where('class_group_id', $classGroup->id)
            ->with(['student', 'promotion'])
            ->get()
            ->map(function ($enrollment) {
                return [
                    'id' => $enrollment->id,
                    'student' => $enrollment->student,
                    'promotion' => $enrollment->promotion,
                    'status' => $enrollment->promotion?->status,
                ];
            });

        return Inertia::render('admin/class-promotions/show', [
            'classGroup' => $classGroup,
            'enrollments' => $enrollments,
            'nextTermClassGroups' => $nextTermClassGroups,
            'statuses' => ClassPromotion::STATUSES,
        ]);
    }

    public function process(Request $request, ClassGroup $classGroup): RedirectResponse
    {
        $validated = $request->validate([
            'promotions' => ['required', 'array'],
            'promotions.*.enrollment_id' => ['required', 'exists:class_enrollments,id'],
            'promotions.*.status' => ['required', 'in:promoted,retained,graduated,transferred'],
            'promotions.*.to_class_group_id' => ['nullable', 'exists:class_groups,id'],
            'promotions.*.notes' => ['nullable', 'string', 'max:500'],
        ]);

        $nextTerm = Term::where('starts_at', '>', $classGroup->term->ends_at)
            ->orderBy('starts_at')
            ->first();

        DB::beginTransaction();

        try {
            foreach ($validated['promotions'] as $promotionData) {
                $enrollment = ClassEnrollment::find($promotionData['enrollment_id']);
                
                // Create or update promotion record
                ClassPromotion::updateOrCreate(
                    [
                        'student_id' => $enrollment->student_id,
                        'from_term_id' => $classGroup->term_id,
                    ],
                    [
                        'from_class_group_id' => $classGroup->id,
                        'to_class_group_id' => $promotionData['to_class_group_id'] ?? null,
                        'to_term_id' => $nextTerm?->id,
                        'status' => $promotionData['status'],
                        'notes' => $promotionData['notes'] ?? null,
                        'processed_by_user_id' => auth()->id(),
                        'processed_at' => now(),
                    ]
                );

                // If promoted or retained and target class exists, create new enrollment
                if (in_array($promotionData['status'], ['promoted', 'retained']) && $promotionData['to_class_group_id']) {
                    ClassEnrollment::firstOrCreate([
                        'class_group_id' => $promotionData['to_class_group_id'],
                        'student_id' => $enrollment->student_id,
                    ]);
                }

                // If graduated or transferred, update student status
                if (in_array($promotionData['status'], ['graduated', 'transferred'])) {
                    Student::where('id', $enrollment->student_id)->update([
                        'status' => $promotionData['status'] === 'graduated' ? 'graduated' : 'transferred',
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('admin.class-promotions.show', $classGroup)
                ->with('success', 'Kenaikan kelas berhasil diproses');

        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()
                ->withErrors(['error' => 'Gagal memproses kenaikan kelas: ' . $e->getMessage()]);
        }
    }

    public function bulkPromote(Request $request, ClassGroup $classGroup): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:promoted,retained,graduated'],
            'to_class_group_id' => ['required_if:status,promoted,retained', 'nullable', 'exists:class_groups,id'],
        ]);

        $nextTerm = Term::where('starts_at', '>', $classGroup->term->ends_at)
            ->orderBy('starts_at')
            ->first();

        $enrollments = ClassEnrollment::where('class_group_id', $classGroup->id)
            ->whereDoesntHave('promotion', fn($q) => $q->where('from_term_id', $classGroup->term_id))
            ->get();

        DB::beginTransaction();

        try {
            foreach ($enrollments as $enrollment) {
                ClassPromotion::create([
                    'student_id' => $enrollment->student_id,
                    'from_class_group_id' => $classGroup->id,
                    'to_class_group_id' => $validated['to_class_group_id'] ?? null,
                    'from_term_id' => $classGroup->term_id,
                    'to_term_id' => $nextTerm?->id,
                    'status' => $validated['status'],
                    'processed_by_user_id' => auth()->id(),
                    'processed_at' => now(),
                ]);

                if (in_array($validated['status'], ['promoted', 'retained']) && $validated['to_class_group_id']) {
                    ClassEnrollment::firstOrCreate([
                        'class_group_id' => $validated['to_class_group_id'],
                        'student_id' => $enrollment->student_id,
                    ]);
                }

                if ($validated['status'] === 'graduated') {
                    Student::where('id', $enrollment->student_id)->update(['status' => 'graduated']);
                }
            }

            DB::commit();

            return redirect()->route('admin.class-promotions.show', $classGroup)
                ->with('success', 'Semua siswa berhasil diproses');

        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()
                ->withErrors(['error' => 'Gagal memproses: ' . $e->getMessage()]);
        }
    }
}
