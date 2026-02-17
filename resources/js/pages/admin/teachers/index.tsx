import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, UserCog, Shield, Mail, Users } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Teacher = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type Props = {
    teachers: {
        data: Teacher[];
        current_page: number;
        last_page: number;
    };
    stats: {
        total: number;
        teachers: number;
        admins: number;
    };
};

export default function TeacherIndex({ teachers, stats }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus ${name}?`)) {
            router.delete(`/admin/teachers/${id}`);
        }
    };

    return (
        <AppLayout
            title="Guru & Staff"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/teachers/create"
        >
            <Head title="Guru & Staff" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.total || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Total</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-chart-3/10 flex items-center justify-center">
                            <UserCog className="w-5 h-5 text-chart-3" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.teachers || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Guru</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-chart-2/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-chart-2" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.admins || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Admin</p>
                    </div>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/teachers/create"
                        className="m3-button-filled w-full"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Guru
                    </Link>
                </div>

                {/* Teacher List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {teachers.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {teachers.data.map((teacher, idx) => (
                                <div
                                    key={teacher.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className={`w-11 h-11 rounded-1xl flex items-center justify-center ${teacher.role === 'admin'
                                            ? 'bg-chart-2/10'
                                            : 'bg-chart-3/10'
                                        }`}>
                                        {teacher.role === 'admin' ? (
                                            <Shield className="w-5 h-5 text-chart-2" />
                                        ) : (
                                            <UserCog className="w-5 h-5 text-chart-3" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">{teacher.name}</p>
                                        <div className="flex items-center gap-1 text-sm text-on-surface-variant">
                                            <Mail className="w-3 h-3" />
                                            <span className="truncate">{teacher.email}</span>
                                        </div>
                                    </div>
                                    <span className={`m3-chip-filled text-xs ${teacher.role === 'admin'
                                            ? 'bg-chart-2/15 text-chart-2'
                                            : 'bg-chart-3/15 text-chart-3'
                                        }`}>
                                        {teacher.role === 'admin' ? 'Admin' : 'Guru'}
                                    </span>
                                    <div className="flex gap-1 ml-2">
                                        <Link
                                            href={`/admin/teachers/${teacher.id}/edit`}
                                            className="w-9 h-9 rounded-full flex items-center justify-center 
                                                     hover:bg-surface-variant transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-on-surface-variant" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(teacher.id, teacher.name)}
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
                            <UserCog className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada data guru</p>
                            <Link href="/admin/teachers/create" className="m3-button-filled mt-6 inline-flex">
                                <Plus className="w-4 h-4" />
                                Tambah Guru
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
