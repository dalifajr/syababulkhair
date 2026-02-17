<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapor {{ $reportCard->classEnrollment->student->name }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.5;
            padding: 20mm;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 3px double #000;
            padding-bottom: 10px;
        }
        .header h1 {
            font-size: 16pt;
            margin-bottom: 5px;
        }
        .header h2 {
            font-size: 14pt;
            margin-bottom: 5px;
        }
        .header p {
            font-size: 10pt;
        }
        .student-info {
            margin-bottom: 20px;
        }
        .student-info table {
            width: 100%;
        }
        .student-info td {
            padding: 3px 0;
        }
        .student-info .label {
            width: 150px;
        }
        .scores-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .scores-table th,
        .scores-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
        }
        .scores-table th {
            background-color: #f0f0f0;
        }
        .scores-table .subject-name {
            text-align: left;
        }
        .attendance-table {
            width: 50%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .attendance-table th,
        .attendance-table td {
            border: 1px solid #000;
            padding: 5px 10px;
        }
        .notes-section {
            margin-bottom: 20px;
        }
        .notes-section h3 {
            font-size: 12pt;
            margin-bottom: 10px;
        }
        .notes-section p {
            margin-bottom: 5px;
        }
        .signature-section {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            text-align: center;
            width: 200px;
        }
        .signature-line {
            margin-top: 60px;
            border-top: 1px solid #000;
            padding-top: 5px;
        }
        .rank-box {
            border: 2px solid #000;
            padding: 10px;
            margin-bottom: 20px;
            display: inline-block;
        }
        .passing {
            color: green;
        }
        .not-passing {
            color: red;
        }
    </style>
</head>
<body>
    @if(isset($institution) && $institution)
    <!-- Kop Sekolah / Letterhead -->
    <div style="text-align: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 3px double #000;">
        <table style="width: 100%; border: none;">
            <tr>
                <td style="width: 80px; vertical-align: middle; border: none; padding: 0;">
                    @if($institution->logo_path)
                    <img src="{{ public_path('storage/' . $institution->logo_path) }}" style="width: 70px; height: 70px; object-fit: contain;" alt="Logo">
                    @endif
                </td>
                <td style="text-align: center; vertical-align: middle; border: none; padding: 0;">
                    @if($institution->letterhead_enabled && $institution->letterhead_line1)
                        <p style="font-size: 10pt; margin: 0;">{{ $institution->letterhead_line1 }}</p>
                    @endif
                    <h1 style="font-size: 16pt; margin: 2px 0; text-transform: uppercase;">{{ $institution->name ?? 'NAMA SEKOLAH' }}</h1>
                    @if($institution->letterhead_enabled && $institution->letterhead_line2)
                        <p style="font-size: 10pt; margin: 0;">{{ $institution->letterhead_line2 }}</p>
                    @endif
                    <p style="font-size: 9pt; margin: 2px 0;">
                        {{ $institution->address ?? '' }}
                        @if($institution->phone) | Telp: {{ $institution->phone }} @endif
                    </p>
                    @if($institution->email || $institution->website)
                    <p style="font-size: 9pt; margin: 0;">
                        @if($institution->email) Email: {{ $institution->email }} @endif
                        @if($institution->website) | {{ $institution->website }} @endif
                    </p>
                    @endif
                    @if($institution->npsn)
                    <p style="font-size: 9pt; margin: 0;">NPSN: {{ $institution->npsn }}</p>
                    @endif
                </td>
                <td style="width: 80px; border: none;"></td>
            </tr>
        </table>
    </div>
    @endif

    <div class="header">
        <h1>LAPORAN HASIL BELAJAR SISWA</h1>
        <h2>{{ $reportCard->classEnrollment->classGroup->term->academicYear->name ?? 'Tahun Ajaran' }}</h2>
        <p>Semester: {{ $reportCard->term->name ?? '-' }}</p>
    </div>

    <div class="student-info">
        <table>
            <tr>
                <td class="label">Nama Siswa</td>
                <td>: {{ $reportCard->classEnrollment->student->name }}</td>
                <td class="label">Kelas</td>
                <td>: {{ $reportCard->classEnrollment->classGroup->name }}</td>
            </tr>
            <tr>
                <td class="label">NIS</td>
                <td>: {{ $reportCard->classEnrollment->student->nis }}</td>
                <td class="label">Wali Kelas</td>
                <td>: {{ $reportCard->classEnrollment->classGroup->homeroomTeacher->name ?? '-' }}</td>
            </tr>
        </table>
    </div>

    <div class="rank-box">
        <strong>Peringkat: {{ $reportCard->rank }} dari {{ $reportCard->total_students }} siswa</strong>
    </div>

    <h3>NILAI MATA PELAJARAN</h3>
    <table class="scores-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Mata Pelajaran</th>
                <th>KKM</th>
                <th>Nilai Pengetahuan</th>
                <th>Predikat</th>
                <th>Nilai Keterampilan</th>
                <th>Predikat</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reportCard->subjects as $index => $subject)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td class="subject-name">{{ $subject->subject->name }}</td>
                <td>{{ $subject->kkm ?? '-' }}</td>
                <td class="{{ $subject->isKnowledgePassing() ? 'passing' : 'not-passing' }}">
                    {{ $subject->knowledge_score !== null ? number_format($subject->knowledge_score, 0) : '-' }}
                </td>
                <td>{{ $subject->knowledge_grade ?? '-' }}</td>
                <td class="{{ $subject->isSkillPassing() ? 'passing' : 'not-passing' }}">
                    {{ $subject->skill_score !== null ? number_format($subject->skill_score, 0) : '-' }}
                </td>
                <td>{{ $subject->skill_grade ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <th colspan="3">Rata-rata</th>
                <th colspan="4">{{ number_format($reportCard->average_score, 1) }}</th>
            </tr>
        </tfoot>
    </table>

    <h3>KETIDAKHADIRAN</h3>
    <table class="attendance-table">
        <tr>
            <th>Sakit</th>
            <td>{{ $reportCard->sick_days }} hari</td>
        </tr>
        <tr>
            <th>Izin</th>
            <td>{{ $reportCard->permit_days }} hari</td>
        </tr>
        <tr>
            <th>Tanpa Keterangan</th>
            <td>{{ $reportCard->absent_days }} hari</td>
        </tr>
    </table>

    @if(isset($extracurriculars) && $extracurriculars->count() > 0)
    <h3>KEGIATAN EKSTRAKURIKULER</h3>
    <table class="scores-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Kegiatan Ekstrakurikuler</th>
                <th>Nilai</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($extracurriculars as $index => $enrollment)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td class="subject-name">{{ $enrollment->extracurricular->name }}</td>
                <td>{{ $enrollment->grade ?? '-' }}</td>
                <td class="subject-name">{{ $enrollment->description ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif

    @if($homeroomNote)
    <div class="notes-section">
        <h3>CATATAN WALI KELAS</h3>
        @if($homeroomNote->academic_note)
        <p><strong>Catatan Akademik:</strong> {{ $homeroomNote->academic_note }}</p>
        @endif
        @if($homeroomNote->personality_note)
        <p><strong>Catatan Kepribadian:</strong> {{ $homeroomNote->personality_note }}</p>
        @endif
        @if($homeroomNote->recommendation)
        <p><strong>Saran:</strong> {{ $homeroomNote->recommendation }}</p>
        @endif
        @if($homeroomNote->parent_note)
        <p><strong>Catatan untuk Orang Tua:</strong> {{ $homeroomNote->parent_note }}</p>
        @endif
    </div>
    @endif

    @if($reportCard->principal_note)
    <div class="notes-section">
        <h3>CATATAN KEPALA SEKOLAH</h3>
        <p>{{ $reportCard->principal_note }}</p>
    </div>
    @endif

    <div class="notes-section">
        <h3>KEPUTUSAN</h3>
        <p>{{ $reportCard->promotion_status_label }}</p>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 40px;">
        <div class="signature-box">
            <p>Orang Tua/Wali</p>
            <div class="signature-line">
                (.................................)
            </div>
        </div>

        <div class="signature-box">
            <p>{{ now()->isoFormat('D MMMM Y') }}</p>
            <p>Wali Kelas</p>
            <div class="signature-line">
                {{ $reportCard->classEnrollment->classGroup->homeroomTeacher->name ?? '(.................................)' }}
            </div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 40px;">
        <p>Mengetahui,</p>
        <p>Kepala Sekolah</p>
        <div class="signature-line" style="width: 200px; margin: 60px auto 0;">
            (.................................)
        </div>
    </div>
</body>
</html>
