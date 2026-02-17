import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Users, Briefcase } from 'lucide-react';
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
        level: number;
    };
    subject: {
        name: string;
    };
    teacher: {
        name: string;
    };
};

type Props = {
    assignments: {
        data: Assignment[];
    };
    stats: {
        total: number;
    };
};

export default function TeachingAssignmentIndex({ assignments, stats }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Hapus penugasan ini?')) {
            router.delete(`/admin/teaching-assignments/${id}`);
        }
    };

    return (
        <AppLayout
            title="Penugasan Guru"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/teaching-assignments/create"
        >
            <Head title="Penugasan Guru" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Card */}
                <div className="m3-card-elevated text-center m3-stagger">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-3xl font-semibold text-on-surface">{stats?.total || 0}</p>
                    <p className="text-sm text-on-surface-variant mt-1">Total Penugasan</p>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/teaching-assignments/create"
                        className="m3-button-filled w-full"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Penugasan
                    </Link>
                </div>

                {/* List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {assignments.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {assignments.data.map((assignment, idx) => (
                                <div
                                    key={assignment.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-xl bg-surface-variant flex items-center justify-center">
                                        <Users className="w-5 h-5 text-on-surface-variant" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface">{assignment.teacher.name}</p>
                                        <p className="text-sm text-on-surface-variant">
                                            {assignment.subject.name} • {assignment.class_group.name}
                                        </p>
                                        <p className="text-xs text-on-surface-variant mt-0.5">
                                            {assignment.term.name} - {assignment.term.academic_year.name}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 ml-2">
                                        <Link
                                            href={`/admin/teaching-assignments/${assignment.id}/edit`}
                                            className="w-9 h-9 rounded-full flex items-center justify-center 
                                                     hover:bg-surface-variant transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-on-surface-variant" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(assignment.id)}
                                            className="w-9 h-9 rounded-full flex items-center justify-center 
                                                     hover:bg-destructive/10 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <Briefcase className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada penugasan</p>
                            <Link href="/admin/teaching-assignments/create" className="m3-button-filled mt-6 inline-flex">
                                <Plus className="w-4 h-4" />
                                Tambah Penugasan
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
