import { Head, Link } from '@inertiajs/react';
import { BookText, User, Trophy } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useEffect } from 'react';

type Student = {
    id: number;
    nis: string;
    name: string;
    gender: string;
    birth_date: string;
};

type SubjectScores = {
    [subjectName: string]: {
        scores: number[];
        average: number;
        teacher?: string | null;
    };
};

type Props = {
    student: Student;
    subjectAverages: SubjectScores;
    printMode?: boolean;
    letterhead?: {
        enabled: boolean;
        logoUrl: string | null;
        line1: string | null;
        line2: string | null;
        line3: string | null;
        schoolName: string | null;
    } | null;
    meta?: {
        date?: string | null;
        term?: string | null;
        academicYear?: string | null;
        classGroup?: string | null;
        homeroomTeacher?: string | null;
    };
};

export default function StudentDetail({ student, subjectAverages, printMode, letterhead, meta }: Props) {
    const subjects = Object.entries(subjectAverages);
    const overallAverage = subjects.length > 0
        ? (subjects.reduce((sum, [, data]) => sum + data.average, 0) / subjects.length).toFixed(1)
        : '-';

    useEffect(() => {
        if (!printMode) return;

        const timer = window.setTimeout(() => {
            window.print();
        }, 250);

        return () => window.clearTimeout(timer);
    }, [printMode]);

    if (printMode) {
        const lhEnabled = !!letterhead?.enabled;
        const lhLine1 = letterhead?.line1 || letterhead?.schoolName || '';
        const lhLine2 = letterhead?.line2 || '';
        const lhLine3 = letterhead?.line3 || '';

        const dateText = meta?.date
            ? new Date(meta.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
            : new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

        return (
            <>
                <Head title={`Rapor ${student.name}`} />

                <style>{`
                    @page { size: A4; margin: 8mm; }
                    html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff !important; color: #000 !important; }
                `}</style>

                <div className="p-4 print:p-0 text-[11px] leading-4 text-black bg-white">
                    {lhEnabled && (
                        <div className="flex gap-3 items-start pb-2 mb-2 border-b border-black">
                            {letterhead?.logoUrl && (
                                <img src={letterhead.logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
                            )}
                            <div className="flex-1">
                                {lhLine1 && <div className="text-sm font-bold leading-5">{lhLine1}</div>}
                                {lhLine2 && <div className="text-[11px]">{lhLine2}</div>}
                                {lhLine3 && <div className="text-[11px]">{lhLine3}</div>}
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-2">
                        <div className="text-sm font-bold">RAPOR NILAI SISWA</div>
                        <div className="text-[11px]">Tanggal: {dateText}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
                        <div className="flex gap-2">
                            <div className="w-24">Nama</div>
                            <div className="font-semibold">: {student.name}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">NIS</div>
                            <div className="font-semibold">: {student.nis}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Semester</div>
                            <div>: {meta?.term || '-'}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Tahun Ajaran</div>
                            <div>: {meta?.academicYear || '-'}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Kelas</div>
                            <div>: {meta?.classGroup || '-'}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Wali Kelas</div>
                            <div>: {meta?.homeroomTeacher || '-'}</div>
                        </div>
                    </div>

                    <table className="w-full border border-black border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black px-2 py-1 text-left">Mata Pelajaran</th>
                                <th className="border border-black px-2 py-1 text-left">Guru</th>
                                <th className="border border-black px-2 py-1 text-center w-16">Nilai</th>
                                <th className="border border-black px-2 py-1 text-center w-20">Jml. Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.length > 0 ? (
                                subjects.map(([subjectName, data]) => (
                                    <tr key={subjectName}>
                                        <td className="border border-black px-2 py-1">{subjectName}</td>
                                        <td className="border border-black px-2 py-1">{data.teacher || '-'}</td>
                                        <td className="border border-black px-2 py-1 text-center">{data.average}</td>
                                        <td className="border border-black px-2 py-1 text-center">{data.scores.length}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black px-2 py-2" colSpan={4}>
                                        Belum ada data nilai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="border border-black px-2 py-1 font-semibold" colSpan={2}>Rata-rata Total</td>
                                <td className="border border-black px-2 py-1 text-center font-semibold" colSpan={2}>{overallAverage}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </>
        );
    }

    return (
        <AppLayout title="Detail Rapor" showBack={true} backUrl="/reports/students">
            <Head title={`Rapor ${student.name}`} />

            <div className="m3-container py-6 space-y-6">
                {/* Actions */}
                <div className="flex gap-3 print:hidden">
                    <button type="button" className="m3-button-filled" onClick={() => window.print()}>
                        Print
                    </button>
                    <Link href={`/reports/students/${student.id}?print=1`} className="m3-button-tonal">
                        Mode Print
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="m3-card-elevated bg-primary/5 border border-primary/20 text-center py-8">
                    <div className="w-20 h-20 mx-auto bg-surface-variant rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-primary">
                        {student.name.charAt(0)}
                    </div>
                    <h1 className="text-2xl font-bold text-on-surface">{student.name}</h1>
                    <p className="text-on-surface-variant mt-1">NIS: {student.nis}</p>

                    <div className="flex justify-center gap-6 mt-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-on-surface-variant mb-1">Jenis Kelamin</span>
                            <span className="font-medium text-on-surface flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-on-surface-variant mb-1">Rata-rata Total</span>
                            <span className="font-bold text-lg text-primary flex items-center gap-1">
                                <Trophy className="w-4 h-4" />
                                {overallAverage}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scores List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-medium text-on-surface">Nilai Per Mata Pelajaran</h3>
                    </div>
                    {subjects.length > 0 ? (
                        <div className="divide-y divide-border">
                            {subjects.map(([subjectName, data], idx) => (
                                <div
                                    key={subjectName}
                                    className="p-4 flex items-center justify-between animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center">
                                            <BookText className="w-5 h-5 text-on-surface-variant" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-on-surface">{subjectName}</p>
                                            <p className="text-xs text-on-surface-variant">{data.scores.length} penilaian</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-lg font-bold ${data.average >= 75 ? 'text-chart-3' : 'text-chart-5'
                                            }`}>
                                            {data.average}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <BookText className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada data nilai</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
