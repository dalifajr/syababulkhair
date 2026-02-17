<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StudentController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Student::query()->orderBy('name');

        if ($search = trim((string) $request->query('q'))) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%");
            });
        }

        return Inertia::render('admin/students/index', [
            'filters' => [
                'q' => $request->query('q'),
            ],
            'students' => $query->paginate(15)->withQueryString(),
            'stats' => [
                'total' => Student::count(),
                'active' => Student::where('status', 'active')->count(),
                'inactive' => Student::where('status', 'inactive')->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/students/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nis' => ['required', 'string', 'max:50', 'unique:students,nis'],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'in:L,P'],
            'birth_date' => ['nullable', 'date'],
            'birth_place' => ['nullable', 'string', 'max:100'],
            'religion' => ['nullable', 'string', 'max:50'],
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:20'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'father_phone' => ['nullable', 'string', 'max:20'],
            'father_occupation' => ['nullable', 'string', 'max:100'],
            'mother_name' => ['nullable', 'string', 'max:255'],
            'mother_phone' => ['nullable', 'string', 'max:20'],
            'mother_occupation' => ['nullable', 'string', 'max:100'],
            'guardian_name' => ['nullable', 'string', 'max:255'],
            'guardian_phone' => ['nullable', 'string', 'max:20'],
            'guardian_relationship' => ['nullable', 'string', 'max:50'],
            'entry_year' => ['nullable', 'string', 'max:10'],
            'previous_school' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('students', 'public');
        }

        Student::create($validated);

        return redirect()->route('admin.students.index')
            ->with('success', 'Siswa berhasil ditambahkan');
    }

    public function edit(Student $student): Response
    {
        return Inertia::render('admin/students/edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $validated = $request->validate([
            'nis' => ['required', 'string', 'max:50', 'unique:students,nis,'.$student->id],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'in:L,P'],
            'birth_date' => ['nullable', 'date'],
            'birth_place' => ['nullable', 'string', 'max:100'],
            'religion' => ['nullable', 'string', 'max:50'],
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:20'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'father_phone' => ['nullable', 'string', 'max:20'],
            'father_occupation' => ['nullable', 'string', 'max:100'],
            'mother_name' => ['nullable', 'string', 'max:255'],
            'mother_phone' => ['nullable', 'string', 'max:20'],
            'mother_occupation' => ['nullable', 'string', 'max:100'],
            'guardian_name' => ['nullable', 'string', 'max:255'],
            'guardian_phone' => ['nullable', 'string', 'max:20'],
            'guardian_relationship' => ['nullable', 'string', 'max:50'],
            'entry_year' => ['nullable', 'string', 'max:10'],
            'previous_school' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', 'in:active,inactive,graduated,transferred'],
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $validated['photo'] = $request->file('photo')->store('students', 'public');
        }

        $student->update($validated);

        return redirect()->route('admin.students.index')
            ->with('success', 'Data siswa berhasil diperbarui');
    }

    public function destroy(Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('admin.students.index')
            ->with('success', 'Siswa berhasil dihapus');
    }

    /**
     * Download template Excel/CSV untuk import siswa
     */
    public function downloadTemplate(): StreamedResponse
    {
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="template_siswa.csv"',
        ];

        $columns = ['nis', 'nama', 'jenis_kelamin', 'tanggal_lahir', 'status'];
        $exampleRows = [
            ['001', 'Ahmad Fauzi', 'L', '2010-05-15', 'active'],
            ['002', 'Siti Aisyah', 'P', '2010-08-20', 'active'],
            ['003', 'Budi Santoso', 'L', '2010-03-10', 'active'],
        ];

        return response()->stream(function () use ($columns, $exampleRows) {
            $file = fopen('php://output', 'w');
            
            // Add BOM for Excel UTF-8 compatibility
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
            
            // Write header
            fputcsv($file, $columns);
            
            // Write example rows
            foreach ($exampleRows as $row) {
                fputcsv($file, $row);
            }
            
            fclose($file);
        }, 200, $headers);
    }

    /**
     * Import siswa dari file CSV/Excel
     */
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt,xlsx,xls', 'max:5120'], // Max 5MB
        ]);

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        try {
            DB::beginTransaction();

            $imported = 0;
            $skipped = 0;
            $errors = [];

            // Handle CSV files
            if (in_array($extension, ['csv', 'txt'])) {
                $handle = fopen($file->getPathname(), 'r');
                
                // Skip BOM if present
                $bom = fread($handle, 3);
                if ($bom !== chr(0xEF).chr(0xBB).chr(0xBF)) {
                    rewind($handle);
                }
                
                // Read header row
                $header = fgetcsv($handle);
                
                if (!$header) {
                    throw new \Exception('File CSV kosong atau tidak valid');
                }

                // Normalize header names
                $header = array_map(fn($h) => strtolower(trim($h)), $header);
                
                $rowNumber = 1;
                while (($row = fgetcsv($handle)) !== false) {
                    $rowNumber++;
                    
                    if (count($row) < 2) {
                        continue; // Skip empty rows
                    }

                    $data = array_combine($header, $row);
                    
                    // Map column names (Indonesian to English)
                    $nis = $data['nis'] ?? $data['nomor_induk'] ?? null;
                    $name = $data['nama'] ?? $data['name'] ?? null;
                    $gender = $data['jenis_kelamin'] ?? $data['gender'] ?? null;
                    $birthDate = $data['tanggal_lahir'] ?? $data['birth_date'] ?? null;
                    $status = $data['status'] ?? 'active';

                    // Normalize gender
                    if ($gender) {
                        $gender = strtoupper(substr(trim($gender), 0, 1));
                        if (!in_array($gender, ['L', 'P'])) {
                            $gender = null;
                        }
                    }

                    // Validate required fields
                    if (empty($nis) || empty($name)) {
                        $errors[] = "Baris {$rowNumber}: NIS dan Nama wajib diisi";
                        $skipped++;
                        continue;
                    }

                    // Check for duplicate NIS
                    if (Student::where('nis', $nis)->exists()) {
                        $errors[] = "Baris {$rowNumber}: NIS {$nis} sudah terdaftar";
                        $skipped++;
                        continue;
                    }

                    // Validate and parse birth date
                    $parsedBirthDate = null;
                    if ($birthDate) {
                        try {
                            $parsedBirthDate = \Carbon\Carbon::parse($birthDate)->format('Y-m-d');
                        } catch (\Exception $e) {
                            $parsedBirthDate = null;
                        }
                    }

                    // Create student
                    Student::create([
                        'nis' => trim($nis),
                        'name' => trim($name),
                        'gender' => $gender,
                        'birth_date' => $parsedBirthDate,
                        'status' => in_array($status, ['active', 'inactive']) ? $status : 'active',
                    ]);

                    $imported++;
                }

                fclose($handle);
            } else {
                throw new \Exception('Format file tidak didukung. Gunakan file CSV.');
            }

            DB::commit();

            $message = "Berhasil mengimpor {$imported} siswa.";
            if ($skipped > 0) {
                $message .= " {$skipped} baris dilewati.";
            }

            return redirect()->route('admin.students.index')
                ->with('success', $message)
                ->with('importErrors', array_slice($errors, 0, 5));

        } catch (\Exception $e) {
            DB::rollBack();
            
            return redirect()->route('admin.students.index')
                ->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }
}
