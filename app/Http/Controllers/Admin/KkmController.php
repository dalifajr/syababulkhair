<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\SubjectKkm;
use App\Models\Term;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KkmController extends Controller
{
    public function index(Request $request): Response
    {
        $activeTerm = Term::where('is_active', true)->first();
        $terms = Term::with('academicYear')->orderByDesc('id')->get();
        
        $selectedTermId = $request->get('term_id', $activeTerm?->id);
        
        $subjects = Subject::with(['kkmSettings' => function ($query) use ($selectedTermId) {
            $query->where('term_id', $selectedTermId);
        }])
        ->where('is_active', true)
        ->orderBy('name')
        ->get()
        ->map(function ($subject) use ($selectedTermId) {
            $kkm = $subject->kkmSettings->first();
            return [
                'id' => $subject->id,
                'name' => $subject->name,
                'category' => $subject->category,
                'kkm_id' => $kkm?->id,
                'kkm_value' => $kkm?->kkm_value ?? 70.00,
                'has_kkm' => $kkm !== null,
            ];
        });

        return Inertia::render('admin/kkm/index', [
            'subjects' => $subjects,
            'terms' => $terms,
            'selectedTermId' => $selectedTermId,
            'activeTerm' => $activeTerm,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subject_id' => ['required', 'exists:subjects,id'],
            'term_id' => ['required', 'exists:terms,id'],
            'kkm_value' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        SubjectKkm::updateOrCreate(
            [
                'subject_id' => $validated['subject_id'],
                'term_id' => $validated['term_id'],
            ],
            [
                'kkm_value' => $validated['kkm_value'],
            ]
        );

        return back()->with('success', 'KKM berhasil disimpan');
    }

    public function bulkStore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'term_id' => ['required', 'exists:terms,id'],
            'kkm_data' => ['required', 'array'],
            'kkm_data.*.subject_id' => ['required', 'exists:subjects,id'],
            'kkm_data.*.kkm_value' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        foreach ($validated['kkm_data'] as $data) {
            SubjectKkm::updateOrCreate(
                [
                    'subject_id' => $data['subject_id'],
                    'term_id' => $validated['term_id'],
                ],
                [
                    'kkm_value' => $data['kkm_value'],
                ]
            );
        }

        return back()->with('success', 'Semua KKM berhasil disimpan');
    }
}
