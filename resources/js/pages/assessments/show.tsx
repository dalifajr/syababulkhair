import { Head, Link } from '@inertiajs/react';
import { ClipboardList, GraduationCap, Calendar, Users, ClipboardCheck } from 'lucide-react';
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
    teacher: {
        name: string;
    };
};

type Stats = {
    students_count: number;
    tasks_count: number;
    attendance_sessions_count: number;
};

type Props = {
    assignment: Assignment;
    stats: Stats;
};
export default function AssessmentShow({ assignment, stats }: Props) {
    return (
        <AppLayout title={assignment.subject.name} showBack={true} backUrl="/assessments">
            <Head title={`Penilaian ${assignment.subject.name}`} />

            <div className="m3-container py-6 space-y-6">
                {/* Info Card */}
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
                                <p className="text-base text-on-surface">{stats.students_count} Siswa</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-medium text-on-surface">Menu</h3>
                        <p className="text-sm text-on-surface-variant mt-1">Pilih fitur yang ingin dibuka.</p>
                    </div>

                    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Link href={`/assessments/${assignment.id}/students`} className="m3-button-tonal h-12 justify-start">
                            <Users className="w-5 h-5" />
                            Daftar Siswa ({stats.students_count})
                        </Link>
                        <Link href={`/assessments/${assignment.id}/attendance`} className="m3-button-tonal h-12 justify-start">
                            <ClipboardCheck className="w-5 h-5" />
                            Absensi ({stats.attendance_sessions_count})
                        </Link>
                        <Link href={`/assessments/${assignment.id}/tasks`} className="m3-button-filled h-12 justify-start">
                            <ClipboardList className="w-5 h-5" />
                            Tugas ({stats.tasks_count})
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
