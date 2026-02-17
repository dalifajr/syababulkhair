import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, GraduationCap, Users } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type ClassGroup = {
    id: number;
    name: string;
    level: number;
    stage: string | null;
    term: {
        name: string;
        academic_year: {
            name: string;
        };
    };
    homeroom_teacher: {
        name: string;
    } | null;
};

type Props = {
    classGroups: {
        data: ClassGroup[];
        current_page: number;
        last_page: number;
    };
    stats: {
        total: number;
        levels: number;
    };
};

export default function ClassGroupIndex({ classGroups, stats }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus kelas ${name}?`)) {
            router.delete(`/admin/class-groups/${id}`);
        }
    };

    return (
        <AppLayout
            title="Kelas"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/class-groups/create"
        >
            <Head title="Kelas" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-3xl font-semibold text-on-surface">{stats?.total || 0}</p>
                        <p className="text-sm text-on-surface-variant mt-1">Total Kelas</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-secondary flex items-center justify-center">
                            <Users className="w-6 h-6 text-on-secondary-container" />
                        </div>
                        <p className="text-3xl font-semibold text-on-surface">{stats?.levels || 0}</p>
                        <p className="text-sm text-on-surface-variant mt-1">Tingkat</p>
                    </div>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/class-groups/create"
                        className="m3-button-filled w-full"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Kelas
                    </Link>
                </div>

                {/* Class List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {classGroups.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {classGroups.data.map((cg, idx) => (
                                <div
                                    key={cg.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-xl bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant">
                                        {cg.level}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface">{cg.name}</p>
                                        <p className="text-sm text-on-surface-variant">
                                            {cg.homeroom_teacher?.name || 'Belum ada wali kelas'}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Link
                                            href={`/admin/class-groups/${cg.id}/edit`}
                                            className="w-9 h-9 rounded-full flex items-center justify-center 
                                                     hover:bg-surface-variant transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-on-surface-variant" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(cg.id, cg.name)}
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
                            <GraduationCap className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada data kelas</p>
                            <Link href="/admin/class-groups/create" className="m3-button-filled mt-6 inline-flex">
                                <Plus className="w-4 h-4" />
                                Tambah Kelas
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
