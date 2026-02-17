import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Award, AlertTriangle, MessageCircle, Trash2, Edit } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useState } from 'react';

declare function route(name: string, params?: Record<string, unknown>): string;

type BehavioralNote = {
    id: number;
    student: { id: number; nis: string; name: string };
    type: 'achievement' | 'violation' | 'counseling';
    description: string;
    date: string;
    recorded_by: { name: string } | null;
};

type Term = {
    id: number;
    name: string;
    academic_year?: { name: string };
};

type Props = {
    notes: {
        data: BehavioralNote[];
        current_page: number;
        last_page: number;
    };
    terms: Term[];
    filters: {
        term_id: number | null;
        type: string | null;
        search: string | null;
    };
};

const TYPE_CONFIG = {
    achievement: { label: 'Prestasi', icon: Award, color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
    violation: { label: 'Pelanggaran', icon: AlertTriangle, color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
    counseling: { label: 'Konseling', icon: MessageCircle, color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
};

export default function BehavioralNotesIndex({ notes, terms, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleFilter = (key: string, value: string | null) => {
        router.get('/admin/behavioral-notes', { ...filters, [key]: value, page: undefined }, { preserveState: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilter('search', search || null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus catatan ini?')) {
            router.delete(`/admin/behavioral-notes/${id}`);
        }
    };

    return (
        <AppLayout title="Catatan Perilaku" showBack={true} backUrl="/dashboard">
            <Head title="Catatan Perilaku Siswa" />

            <div className="m3-container py-6 space-y-4">
                {/* Header + Add */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-on-surface">Catatan Perilaku</h1>
                    <Link href="/admin/behavioral-notes/create" className="m3-button-filled h-10 px-4 inline-flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Tambah
                    </Link>
                </div>

                {/* Search & Filters */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama siswa..."
                            className="m3-input pl-10 h-10"
                        />
                    </div>
                </form>

                <div className="flex gap-2 overflow-x-auto pb-1">
                    <select
                        value={filters.term_id || ''}
                        onChange={(e) => handleFilter('term_id', e.target.value || null)}
                        className="m3-input h-9 text-sm min-w-[140px]"
                    >
                        <option value="">Semua Semester</option>
                        {terms.map((t) => (
                            <option key={t.id} value={t.id}>{t.academic_year?.name} - {t.name}</option>
                        ))}
                    </select>
                    <select
                        value={filters.type || ''}
                        onChange={(e) => handleFilter('type', e.target.value || null)}
                        className="m3-input h-9 text-sm min-w-[120px]"
                    >
                        <option value="">Semua Tipe</option>
                        <option value="achievement">Prestasi</option>
                        <option value="violation">Pelanggaran</option>
                        <option value="counseling">Konseling</option>
                    </select>
                </div>

                {/* Notes List */}
                {notes.data.length === 0 ? (
                    <div className="m3-card-elevated p-8 text-center">
                        <p className="text-on-surface-variant">Belum ada catatan perilaku</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notes.data.map((note) => {
                            const config = TYPE_CONFIG[note.type];
                            const Icon = config.icon;
                            return (
                                <div key={note.id} className="m3-card-elevated p-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`rounded-full p-2 ${config.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold text-on-surface truncate">{note.student.name}</h3>
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                                    {config.label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-on-surface-variant mt-0.5">NIS: {note.student.nis}</p>
                                            <p className="text-sm text-on-surface mt-2 line-clamp-3">{note.description}</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-xs text-on-surface-variant">
                                                    {new Date(note.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <Link href={`/admin/behavioral-notes/${note.id}/edit`}>
                                                        <button className="p-1.5 rounded-full hover:bg-surface-container-high transition-colors">
                                                            <Edit className="w-4 h-4 text-on-surface-variant" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(note.id)}
                                                        className="p-1.5 rounded-full hover:bg-red-100 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {notes.last_page > 1 && (
                    <div className="flex justify-center gap-2 pt-2">
                        {Array.from({ length: notes.last_page }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handleFilter('page' as string, String(page))}
                                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${page === notes.current_page
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-on-surface-variant hover:bg-surface-container-high'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
