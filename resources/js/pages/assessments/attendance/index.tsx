import { Head, Link, useForm } from '@inertiajs/react';
import { Calendar, ChevronRight, Plus, ClipboardCheck, GraduationCap, Users, Printer } from 'lucide-react';
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

type AttendanceSession = {
    id: number;
    meeting_date: string;
    topic: string | null;
    total_count: number;
    present_count: number;
    absent_count: number;
    sick_count: number;
    permit_count: number;
    unmarked_count: number;
};

type Props = {
    assignment: Assignment;
    studentsCount: number;
    sessions: AttendanceSession[];
};

export default function AttendanceIndex({ assignment, studentsCount, sessions }: Props) {
    const { data, setData, post, processing, errors } = useForm<{ meeting_date: string; topic?: string }>({
        meeting_date: new Date().toISOString().slice(0, 10),
        topic: '',
    });

    const createSession = () => {
        post(`/assessments/${assignment.id}/attendance`);
    };

    return (
        <AppLayout title="Absensi" showBack={true} backUrl={`/assessments/${assignment.id}`}>
            <Head title={`Absensi - ${assignment.subject.name}`} />

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
                                <Users className="w-5 h-5 text-on-surface-variant" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-on-surface-variant">Jumlah Siswa</p>
                                <p className="text-base text-on-surface">{studentsCount} Siswa</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m3-card-elevated">
                    <h3 className="font-medium text-on-surface mb-3">Buat Absensi Pertemuan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-1">Tanggal</label>
                            <input
                                type="date"
                                value={data.meeting_date}
                                onChange={(e) => setData('meeting_date', e.target.value)}
                                className="m3-input w-full"
                            />
                            {errors.meeting_date ? <p className="text-sm text-destructive mt-1">{errors.meeting_date}</p> : null}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-on-surface-variant mb-1">Topik (opsional)</label>
                            <input
                                type="text"
                                value={data.topic}
                                onChange={(e) => setData('topic', e.target.value)}
                                placeholder="Contoh: Bab 1 - Pecahan"
                                className="m3-input w-full"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="m3-button-filled w-full mt-4"
                        onClick={createSession}
                        disabled={processing}
                    >
                        <Plus className="w-4 h-4" />
                        {processing ? 'Membuat...' : 'Buat / Buka Pertemuan'}
                    </button>
                </div>

                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-medium text-on-surface">Riwayat Pertemuan</h3>
                    </div>

                    {sessions.length > 0 ? (
                        <div className="divide-y divide-border">
                            {sessions.map((s, idx) => (
                                <div
                                    key={s.id}
                                    className="m3-list-item group animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <Link
                                        href={`/assessments/${assignment.id}/attendance/${s.id}`}
                                        className="flex items-center gap-4 flex-1 min-w-0"
                                    >
                                        <div className="w-11 h-11 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <ClipboardCheck className="w-5 h-5 text-on-surface-variant group-hover:text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-on-surface truncate">{s.meeting_date}</p>
                                            <p className="text-sm text-on-surface-variant truncate">
                                                {s.topic || 'Tanpa topik'}
                                            </p>
                                            <p className="text-xs text-on-surface-variant mt-1">
                                                Hadir: <span className="text-on-surface">{s.present_count}</span> •
                                                Alpha: <span className="text-on-surface">{s.absent_count}</span> •
                                                Sakit: <span className="text-on-surface">{s.sick_count}</span> •
                                                Izin: <span className="text-on-surface">{s.permit_count}</span> •
                                                Belum: <span className="text-on-surface">{s.unmarked_count}</span>
                                            </p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                                    </Link>

                                    <Link
                                        href={`/assessments/${assignment.id}/attendance/${s.id}?print=1`}
                                        className="m3-button-tonal h-10 shrink-0"
                                    >
                                        <Printer className="w-4 h-4" />
                                        Print
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <Calendar className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada pertemuan</p>
                            <p className="text-on-surface-variant mt-1">Buat absensi untuk mulai pencatatan.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
