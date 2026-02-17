import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, BookText, BookCheck, BookX } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/mobile-layout';

type Subject = {
    id: number;
    name: string;
    category: string;
    is_active: boolean;
};

type Props = {
    subjects: {
        data: Subject[];
        current_page: number;
        last_page: number;
    };
    stats: {
        total: number;
        active: number;
    };
    filters: {
        search?: string;
    };
};

export default function SubjectIndex({ subjects, stats, filters }: Props) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/subjects', { search }, { preserveState: true });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus mata pelajaran ${name}?`)) {
            router.delete(`/admin/subjects/${id}`);
        }
    };

    return (
        <AppLayout
            title="Mata Pelajaran"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/subjects/create"
        >
            <Head title="Mata Pelajaran" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <BookText className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-3xl font-semibold text-on-surface">{stats?.total || 0}</p>
                        <p className="text-sm text-on-surface-variant mt-1">Total Mapel</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-chart-3/10 flex items-center justify-center">
                            <BookCheck className="w-6 h-6 text-chart-3" />
                        </div>
                        <p className="text-3xl font-semibold text-on-surface">{stats?.active || 0}</p>
                        <p className="text-sm text-on-surface-variant mt-1">Aktif</p>
                    </div>
                </div>

                {/* Search */}
                <div className="flex gap-3">
                    <form onSubmit={handleSearch} className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <input
                            type="text"
                            placeholder="Cari mata pelajaran..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="m3-input pl-12"
                        />
                    </form>
                    <Link
                        href="/admin/subjects/create"
                        className="m3-button-filled hidden md:inline-flex"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah
                    </Link>
                </div>

                {/* Subject List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {subjects.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {subjects.data.map((subject, idx) => (
                                <div
                                    key={subject.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${subject.is_active
                                            ? 'bg-chart-3/10'
                                            : 'bg-on-surface-variant/10'
                                        }`}>
                                        {subject.is_active ? (
                                            <BookCheck className="w-5 h-5 text-chart-3" />
                                        ) : (
                                            <BookX className="w-5 h-5 text-on-surface-variant" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface">{subject.name}</p>
                                        <p className="text-sm text-on-surface-variant">{subject.category || 'Tanpa kategori'}</p>
                                    </div>
                                    <span className={`m3-chip-filled text-xs ${subject.is_active
                                            ? 'bg-chart-3/15 text-chart-3'
                                            : 'bg-on-surface-variant/15 text-on-surface-variant'
                                        }`}>
                                        {subject.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                    <div className="flex gap-1 ml-2">
                                        <Link
                                            href={`/admin/subjects/${subject.id}/edit`}
                                            className="w-9 h-9 rounded-full flex items-center justify-center 
                                                     hover:bg-surface-variant transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-on-surface-variant" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(subject.id, subject.name)}
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
                            <BookText className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada mata pelajaran</p>
                            <p className="text-on-surface-variant mt-1">Tambahkan mata pelajaran pertama</p>
                            <Link href="/admin/subjects/create" className="m3-button-filled mt-6 inline-flex">
                                <Plus className="w-4 h-4" />
                                Tambah Mapel
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
