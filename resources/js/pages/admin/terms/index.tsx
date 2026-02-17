import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Calendar, CheckCircle } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Term = {
    id: number;
    name: string;
    starts_at: string;
    ends_at: string;
    is_active: boolean;
    academic_year: {
        name: string;
    };
};

type Props = {
    terms: {
        data: Term[];
    };
    stats: {
        total: number;
        active: number;
    };
};

export default function TermIndex({ terms, stats }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus semester ${name}?`)) {
            router.delete(`/admin/terms/${id}`);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <AppLayout
            title="Semester"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/terms/create"
        >
            <Head title="Semester" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-3xl font-semibold text-on-surface">{stats?.total || 0}</p>
                        <p className="text-sm text-on-surface-variant mt-1">Total</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-chart-3/10 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-chart-3" />
                        </div>
                        <p className="text-3xl font-semibold text-on-surface">{stats?.active || 0}</p>
                        <p className="text-sm text-on-surface-variant mt-1">Aktif</p>
                    </div>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/terms/create"
                        className="m3-button-filled w-full"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Semester
                    </Link>
                </div>

                {/* List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {terms.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {terms.data.map((term, idx) => (
                                <div
                                    key={term.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className={`w-11 h-11 rounded-1xl flex items-center justify-center ${term.is_active ? 'bg-chart-3/10' : 'bg-surface-variant'
                                        }`}>
                                        {term.is_active ? (
                                            <CheckCircle className="w-5 h-5 text-chart-3" />
                                        ) : (
                                            <Calendar className="w-5 h-5 text-on-surface-variant" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface">{term.name}</p>
                                        <p className="text-sm text-on-surface-variant">
                                            {term.academic_year.name}
                                        </p>
                                        <p className="text-xs text-on-surface-variant mt-0.5">
                                            {formatDate(term.starts_at)} - {formatDate(term.ends_at)}
                                        </p>
                                    </div>
                                    {term.is_active && (
                                        <span className="m3-chip-filled bg-chart-3/15 text-chart-3 text-xs">
                                            Aktif
                                        </span>
                                    )}
                                    <div className="flex gap-1 ml-2">
                                        <Link
                                            href={`/admin/terms/${term.id}/edit`}
                                            className="w-9 h-9 rounded-full flex items-center justify-center 
                                                     hover:bg-surface-variant transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-on-surface-variant" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(term.id, term.name)}
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
                            <Calendar className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada data semester</p>
                            <Link href="/admin/terms/create" className="m3-button-filled mt-6 inline-flex">
                                <Plus className="w-4 h-4" />
                                Tambah Semester
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
