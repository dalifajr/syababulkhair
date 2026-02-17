import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle2, ClipboardCheck, Users, Printer } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Assignment = {
    id: number;
    term: {
        name: string;
        academic_year: {
            name: string;
        };
    };
    class_group: {
        name: string;
    };
    subject: {
        name: string;
    };
    teacher: {
        name: string;
    };
};

type Session = {
    id: number;
    meeting_date: string;
    topic: string | null;
};

type Student = {
    id: number;
    nis: string;
    name: string;
};

type Row = {
    student: Student;
    status: 'unmarked' | 'present' | 'absent' | 'sick' | 'permit';
    note?: string | null;
};

type Summary = {
    total: number;
    present: number;
    absent: number;
    sick: number;
    permit: number;
    unmarked: number;
};

type Props = {
    assignment: Assignment;
    session: Session;
    rows: Row[];
    summary: Summary;
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
        subject?: string | null;
        teacher?: string | null;
        topic?: string | null;
    };
};

const statusLabels: Record<Row['status'], string> = {
    unmarked: 'Belum',
    present: 'Hadir',
    absent: 'Alpha',
    sick: 'Sakit',
    permit: 'Izin',
};

export default function AttendanceShow({ assignment, session, rows, summary, printMode, letterhead, meta }: Props) {
    const { data, setData, post, processing } = useForm<{ records: Array<{ student_id: number; status: Row['status'] }> }>({
        records: rows.map((r) => ({ student_id: r.student.id, status: r.status })),
    });

    useEffect(() => {
        if (!printMode) return;

        const timer = window.setTimeout(() => {
            window.print();
        }, 250);

        return () => window.clearTimeout(timer);
    }, [printMode]);

    const setStatus = (studentId: number, status: Row['status']) => {
        setData(
            'records',
            data.records.map((r) => (r.student_id === studentId ? { ...r, status } : r))
        );
    };

    const markAll = (status: Row['status']) => {
        setData(
            'records',
            data.records.map((r) => ({ ...r, status }))
        );
    };

    const save = () => {
        post(`/assessments/${assignment.id}/attendance/${session.id}`);
    };

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
                <Head title="Print Absensi" />

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
                        <div className="text-sm font-bold">DAFTAR HADIR SISWA</div>
                        <div className="text-[11px]">Tanggal: {dateText}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
                        <div className="flex gap-2">
                            <div className="w-24">Semester</div>
                            <div>: {meta?.term || assignment.term.name}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Tahun Ajaran</div>
                            <div>: {meta?.academicYear || assignment.term.academic_year.name}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Kelas</div>
                            <div>: {meta?.classGroup || assignment.class_group.name}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Guru</div>
                            <div>: {meta?.teacher || assignment.teacher.name}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Mapel</div>
                            <div>: {meta?.subject || assignment.subject.name}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Topik</div>
                            <div>: {meta?.topic || session.topic || '-'}</div>
                        </div>
                    </div>

                    <table className="w-full border border-black border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black px-2 py-1 text-center w-10">No</th>
                                <th className="border border-black px-2 py-1 text-left">NIS</th>
                                <th className="border border-black px-2 py-1 text-left">Nama</th>
                                <th className="border border-black px-2 py-1 text-left w-28">Status</th>
                                <th className="border border-black px-2 py-1 text-left">Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length > 0 ? (
                                rows.map((row, idx) => (
                                    <tr key={row.student.id}>
                                        <td className="border border-black px-2 py-1 text-center">{idx + 1}</td>
                                        <td className="border border-black px-2 py-1">{row.student.nis}</td>
                                        <td className="border border-black px-2 py-1">{row.student.name}</td>
                                        <td className="border border-black px-2 py-1">{statusLabels[row.status]}</td>
                                        <td className="border border-black px-2 py-1">{row.note || ''}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black px-2 py-2" colSpan={5}>
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    return (
        <AppLayout
            title="Detail Absensi"
            showBack={true}
            backUrl={`/assessments/${assignment.id}/attendance`}
        >
            <Head title={`Absensi ${session.meeting_date} - ${assignment.subject.name}`} />

            <div className="m3-container py-6 space-y-6">
                <div className="m3-card-elevated bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-on-surface">{assignment.subject.name}</h2>
                            <p className="text-on-surface-variant mt-1">
                                {assignment.class_group.name} • {session.meeting_date}
                            </p>
                            <p className="text-sm text-on-surface-variant mt-1">{session.topic || 'Tanpa topik'}</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-surface-variant flex items-center justify-center">
                            <ClipboardCheck className="w-5 h-5 text-on-surface-variant" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-5">
                        <div className="rounded-xl bg-surface-variant/40 p-3">
                            <p className="text-xs text-on-surface-variant">Hadir</p>
                            <p className="text-lg font-semibold text-on-surface">{summary.present}</p>
                        </div>
                        <div className="rounded-xl bg-surface-variant/40 p-3">
                            <p className="text-xs text-on-surface-variant">Alpha</p>
                            <p className="text-lg font-semibold text-on-surface">{summary.absent}</p>
                        </div>
                        <div className="rounded-xl bg-surface-variant/40 p-3">
                            <p className="text-xs text-on-surface-variant">Sakit</p>
                            <p className="text-lg font-semibold text-on-surface">{summary.sick}</p>
                        </div>
                        <div className="rounded-xl bg-surface-variant/40 p-3">
                            <p className="text-xs text-on-surface-variant">Izin</p>
                            <p className="text-lg font-semibold text-on-surface">{summary.permit}</p>
                        </div>
                        <div className="rounded-xl bg-surface-variant/40 p-3">
                            <p className="text-xs text-on-surface-variant">Belum</p>
                            <p className="text-lg font-semibold text-on-surface">{summary.unmarked}</p>
                        </div>
                        <div className="rounded-xl bg-surface-variant/40 p-3">
                            <p className="text-xs text-on-surface-variant">Total</p>
                            <p className="text-lg font-semibold text-on-surface">{summary.total}</p>
                        </div>
                    </div>
                </div>

                <div className="m3-card-elevated">
                    <div className="flex flex-col md:flex-row gap-3">
                        <button type="button" className="m3-button-tonal" onClick={() => markAll('present')} disabled={processing}>
                            <CheckCircle2 className="w-4 h-4" />
                            Hadir Semua
                        </button>
                        <button type="button" className="m3-button-tonal" onClick={() => markAll('unmarked')} disabled={processing}>
                            Reset
                        </button>
                        <Link
                            href={`/assessments/${assignment.id}/attendance/${session.id}?print=1`}
                            className="m3-button-tonal"
                        >
                            <Printer className="w-4 h-4" />
                            Print
                        </Link>
                        <button type="button" className="m3-button-filled md:ml-auto" onClick={save} disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Absensi'}
                        </button>
                    </div>
                </div>

                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                        <Users className="w-4 h-4 text-on-surface-variant" />
                        <h3 className="font-medium text-on-surface">Daftar Siswa</h3>
                    </div>

                    <div className="divide-y divide-border">
                        {rows.map((row) => (
                            <div key={row.student.id} className="m3-list-item">
                                <div className="w-11 h-11 rounded-xl bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant">
                                    {row.student.name.slice(0, 1).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-on-surface truncate">{row.student.name}</p>
                                    <p className="text-sm text-on-surface-variant">NIS: {row.student.nis}</p>
                                </div>
                                <div className="min-w-[140px]">
                                    <Select
                                        value={data.records.find((r) => r.student_id === row.student.id)?.status || 'unmarked'}
                                        onValueChange={(value) => setStatus(row.student.id, value as Row['status'])}
                                    >
                                        <SelectTrigger className="h-10 bg-surface">
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(statusLabels).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
