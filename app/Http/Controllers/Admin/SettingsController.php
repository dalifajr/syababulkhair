<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InstitutionSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = InstitutionSetting::first();

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'website' => 'nullable|url|max:100',
            'principal_name' => 'nullable|string|max:100',
            'npsn' => 'nullable|string|max:20',
            'letterhead_enabled' => 'nullable|boolean',
            'letterhead_line1' => 'nullable|string|max:255',
            'letterhead_line2' => 'nullable|string|max:255',
            'letterhead_line3' => 'nullable|string|max:255',
            'logo' => 'nullable|image|max:2048',
        ]);

        $settings = InstitutionSetting::first();

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('institution', 'public');
            $validated['logo_path'] = $path;

            if ($settings?->logo_path) {
                Storage::disk('public')->delete($settings->logo_path);
            }
        }

        $validated['letterhead_enabled'] = (bool) ($request->boolean('letterhead_enabled'));
        
        if ($settings) {
            $settings->update($validated);
        } else {
            InstitutionSetting::create($validated);
        }

        return back()->with('success', 'Pengaturan sekolah berhasil diperbarui');
    }
}
