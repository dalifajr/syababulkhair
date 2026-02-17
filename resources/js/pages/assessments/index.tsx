import { Head, Link } from '@inertiajs/react';
import { BookText, Users, ChevronRight } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

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
};

type Props = {
    assignments: {
        data: Assignment[];
    };
    stats: {
        total_assignments: number;
        total_assessments: number;
        total_scores: number;
    };
};

export default function AssessmentIndex({ assignments, stats }: Props) {
    return (
        <AppLayout title="Input Nilai" showBack={true} backUrl="/dashboard">
            <Head title="Input Nilai" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <p className="text-2xl font-semibold text-primary">{stats?.total_assignments || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Penugasan</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <p className="text-2xl font-semibold text-chart-2">{stats?.total_assessments || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Penilaian</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <p className="text-2xl font-semibold text-chart-3">{stats?.total_scores || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Nilai</p>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="m3-card bg-primary/5 border border-primary/20">
                    <p className="text-sm text-on-surface">
                        <strong>Pilih mata pelajaran dan kelas</strong> yang ingin dinilai dari daftar di bawah ini.
                    </p>
                </div>

                {/* Assignments List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h2 className="font-medium text-on-surface">Mata Pelajaran Saya</h2>
                    </div>
                    {assignments.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {assignments.data.map((assignment, idx) => (
                                <Link
                                    key={assignment.id}
                                    href={`/assessments/${assignment.id}`}
                                    className="m3-list-item group animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center 
                                                  group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <BookText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0 ml-1">
                                        <p className="font-medium text-on-surface">{assignment.subject.name}</p>
                                        <p className="text-sm text-on-surface-variant">
                                            {assignment.class_group.name} • {assignment.term.name}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <Users className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada penugasan</p>
                            <p className="text-on-surface-variant mt-1 mb-6">
                                Hubungi admin untuk menambahkan penugasan mengajar.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
