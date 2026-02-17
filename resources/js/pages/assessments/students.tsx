import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, GraduationCap, Calendar, Users, Printer } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useMemo, useState } from 'react';

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

type Student = {
    id: number;
    nis: string;
    name: string;
};

type Props = {
    assignment: Assignment;
    students: Student[];
    availableStudents: Student[];
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
    };
};

export default function AssessmentStudents({ assignment, students, availableStudents, printMode, letterhead, meta }: Props) {
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
                <Head title="Print Daftar Siswa" />

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
                        <div className="text-sm font-bold">DAFTAR SISWA</div>
                        <div className="text-[11px]">Tanggal: {dateText}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
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
                        <div />
                    </div>

                    <table className="w-full border border-black border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black px-2 py-1 text-center w-10">No</th>
                                <th className="border border-black px-2 py-1 text-left">NIS</th>
                                <th className="border border-black px-2 py-1 text-left">Nama</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((s, idx) => (
                                    <tr key={s.id}>
                                        <td className="border border-black px-2 py-1 text-center">{idx + 1}</td>
                                        <td className="border border-black px-2 py-1">{s.nis}</td>
                                        <td className="border border-black px-2 py-1">{s.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black px-2 py-2" colSpan={3}>
                                        Belum ada siswa.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    const [isAddStudentsOpen, setIsAddStudentsOpen] = useState(false);
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
    const { post, setData, reset, processing, errors, clearErrors } = useForm<{ student_ids: number[] }>({
        student_ids: [],
    });

    const allSelected = useMemo(
        () => availableStudents.length > 0 && selectedStudentIds.length === availableStudents.length,
        [availableStudents.length, selectedStudentIds.length]
    );

    const toggleStudent = (id: number) => {
        setSelectedStudentIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const handleAddStudents = () => {
        if (selectedStudentIds.length === 0) return;

        clearErrors();
        setData('student_ids', selectedStudentIds);

        post(`/assessments/${assignment.id}/students`, {
            onSuccess: () => {
                setSelectedStudentIds([]);
                reset('student_ids');
                setIsAddStudentsOpen(false);
            },
        });
    };

    return (
        <AppLayout title="Daftar Siswa" showBack={true} backUrl={`/assessments/${assignment.id}`}>
            <Head title={`Siswa - ${assignment.subject.name}`} />

            <div className="m3-container py-6 space-y-6">
                <div className="m3-card-elevated bg-gradient-to-br from-primary/5 to-secondary/5">
                    <h2 className="text-xl font-semibold text-on-surface mb-4">Informasi Kelas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-on-surface-variant" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-on-surface-variant">Kelas</p>
                                <p className="text-base text-on-surface">{assignment.class_group.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-on-surface-variant" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-on-surface-variant">Semester</p>
                                <p className="text-base text-on-surface">
                                    {assignment.term.name} - {assignment.term.academic_year.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3">
                        <div>
                            <h3 className="font-medium text-on-surface">Siswa</h3>
                            <p className="text-sm text-on-surface-variant">Kelola siswa untuk kelas ini.</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                href={`/assessments/${assignment.id}/students?print=1`}
                                className="m3-button-tonal h-10"
                            >
                                <Printer className="w-4 h-4" />
                                Print
                            </Link>

                        <Dialog open={isAddStudentsOpen} onOpenChange={setIsAddStudentsOpen}>
                            <DialogTrigger asChild>
                                <button type="button" className="m3-button-tonal h-10">
                                    <Plus className="w-4 h-4" />
                                    Tambah
                                </button>
                            </DialogTrigger>
                            <DialogContent className="bg-surface text-on-surface border-border">
                                <DialogHeader>
                                    <DialogTitle>Tambah Siswa</DialogTitle>
                                    <DialogDescription>
                                        Pilih siswa yang akan dimasukkan ke kelas {assignment.class_group.name}.
                                    </DialogDescription>
                                </DialogHeader>

                                {availableStudents.length > 0 ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-on-surface-variant">{availableStudents.length} siswa tersedia</p>
                                            <button
                                                type="button"
                                                className="text-sm font-medium text-primary hover:underline"
                                                onClick={() =>
                                                    setSelectedStudentIds(allSelected ? [] : availableStudents.map((s) => s.id))
                                                }
                                                disabled={processing}
                                            >
                                                {allSelected ? 'Batal pilih semua' : 'Pilih semua'}
                                            </button>
                                        </div>

                                        <div className="max-h-[50vh] overflow-auto rounded-xl border border-border divide-y divide-border">
                                            {availableStudents.map((s) => (
                                                <label
                                                    key={s.id}
                                                    className="flex items-center gap-3 p-3 hover:bg-surface-variant/30 transition-colors cursor-pointer"
                                                >
                                                    <Checkbox
                                                        checked={selectedStudentIds.includes(s.id)}
                                                        onCheckedChange={() => toggleStudent(s.id)}
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-on-surface truncate">{s.name}</p>
                                                        <p className="text-sm text-on-surface-variant">NIS: {s.nis}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>

                                        {errors.student_ids ? <p className="text-sm text-destructive">{errors.student_ids}</p> : null}
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-border p-6 text-center">
                                        <p className="font-medium text-on-surface">Tidak ada siswa yang bisa ditambahkan</p>
                                        <p className="text-sm text-on-surface-variant mt-1">
                                            Semua siswa aktif sudah terdaftar di kelas ini.
                                        </p>
                                    </div>
                                )}

                                <DialogFooter>
                                    <button
                                        type="button"
                                        className="m3-button-tonal"
                                        onClick={() => {
                                            setSelectedStudentIds([]);
                                            reset('student_ids');
                                            clearErrors();
                                            setIsAddStudentsOpen(false);
                                        }}
                                        disabled={processing}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="m3-button-filled"
                                        onClick={handleAddStudents}
                                        disabled={processing || selectedStudentIds.length === 0}
                                    >
                                        {processing ? 'Menyimpan...' : `Tambah (${selectedStudentIds.length})`}
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        </div>
                    </div>

                    {students.length > 0 ? (
                        <div className="divide-y divide-border">
                            {students.map((s) => (
                                <div key={s.id} className="m3-list-item">
                                    <div className="w-11 h-11 rounded-xl bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant">
                                        {s.name.slice(0, 1).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">{s.name}</p>
                                        <p className="text-sm text-on-surface-variant">NIS: {s.nis}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <Users className="w-14 h-14 mx-auto text-on-surface-variant/30 mb-3" />
                            <p className="text-lg font-medium text-on-surface">Belum ada siswa</p>
                            <p className="text-on-surface-variant mt-1">Tambahkan siswa terlebih dahulu.</p>
                            <Link href={`/assessments/${assignment.id}`} className="m3-button-tonal mt-6 inline-flex">
                                Kembali
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
