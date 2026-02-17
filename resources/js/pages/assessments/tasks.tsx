import { Head, Link, router } from '@inertiajs/react';
import { Plus, ClipboardList, ChevronRight, Trash2, GraduationCap, Calendar, Users } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Assessment = {
    id: number;
    name: string;
    type: string;
    max_score: number;
};

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
    assessments: Assessment[];
};

type Props = {
    assignment: Assignment;
    studentsCount: number;
};

const typeLabels: Record<string, string> = {
    daily: 'Ulangan Harian',
    mid: 'UTS',
    final: 'UAS',
    practical: 'Praktik',
};

const typeColors: Record<string, string> = {
    daily: 'bg-primary/10 text-primary',
    mid: 'bg-secondary/10 text-secondary-foreground',
    final: 'bg-tertiary-container text-on-tertiary-container',
    practical: 'bg-chart-3/15 text-chart-3',
};

export default function AssessmentTasks({ assignment, studentsCount }: Props) {
    const handleDeleteAssessment = (assessment: Assessment) => {
        if (confirm(`Hapus tugas "${assessment.name}"?`)) {
            router.delete(`/assessments/items/${assessment.id}`);
        }
    };

    return (
        <AppLayout
            title="Tugas & Penilaian"
            showBack={true}
            backUrl={`/assessments/${assignment.id}`}
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref={`/assessments/${assignment.id}/create`}
        >
            <Head title={`Tugas - ${assignment.subject.name}`} />

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
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center">
                                <Users className="w-5 h-5 text-on-surface-variant" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-on-surface-variant">Jumlah Siswa</p>
                                <p className="text-base text-on-surface">{studentsCount} Siswa</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <Link href={`/assessments/${assignment.id}/create`} className="m3-button-filled w-full">
                        <Plus className="w-5 h-5" />
                        Tambah Penilaian
                    </Link>
                </div>

                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-medium text-on-surface">Daftar Penilaian</h3>
                    </div>
                    {assignment.assessments.length > 0 ? (
                        <div className="divide-y divide-border">
                            {assignment.assessments.map((assessment, idx) => (
                                <Link
                                    key={assessment.id}
                                    href={`/assessments/scores/${assessment.id}`}
                                    className="m3-list-item group animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <ClipboardList className="w-5 h-5 text-on-surface-variant group-hover:text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium text-on-surface truncate">{assessment.name}</p>
                                            <span
                                                className={`m3-chip px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md ${
                                                    typeColors[assessment.type] ||
                                                    'bg-surface-variant text-on-surface-variant'
                                                }`}
                                            >
                                                {typeLabels[assessment.type] || assessment.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-on-surface-variant">
                                            Maksimal Nilai:{' '}
                                            <span className="font-medium text-on-surface">{assessment.max_score}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDeleteAssessment(assessment);
                                            }}
                                            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors"
                                            aria-label={`Hapus ${assessment.name}`}
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </button>
                                        <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <ClipboardList className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada penilaian</p>
                            <p className="text-on-surface-variant mt-1">
                                Buat penilaian baru untuk mulai menginput nilai.
                            </p>
                            <Link href={`/assessments/${assignment.id}/create`} className="m3-button-filled mt-6 inline-flex">
                                <Plus className="w-4 h-4" />
                                Buat Penilaian
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
