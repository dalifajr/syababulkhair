import { Head, Link, router, useForm } from '@inertiajs/react';
import { Plus, Search, Upload, Download, Edit, Trash2, UserPlus, Users, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/mobile-layout';

type Student = {
    id: number;
    nis: string;
    name: string;
    gender: string;
    birth_date: string;
    status: string;
};

type Props = {
    students: {
        data: Student[];
        current_page: number;
        last_page: number;
        total: number;
    };
    stats: {
        total: number;
        active: number;
        inactive: number;
    };
    filters: {
        search?: string;
    };
};

export default function StudentIndex({ students, stats, filters }: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const [showImport, setShowImport] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null as File | null,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/students', { search }, { preserveState: true });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus siswa ${name}?`)) {
            router.delete(`/admin/students/${id}`);
        }
    };

    const handleImport = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/students/import', {
            onSuccess: () => {
                setShowImport(false);
                reset();
            },
        });
    };

    return (
        <AppLayout
            title="Data Siswa"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/students/create"
        >
            <Head title="Data Siswa" />

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
                            <UserCheck className="w-5 h-5 text-chart-3" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.active || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Aktif</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-chart-5/10 flex items-center justify-center">
                            <UserX className="w-5 h-5 text-chart-5" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.inactive || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Nonaktif</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <a
                        href="/admin/students/template/download"
                        className="m3-button-outlined flex-1"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Template</span>
                    </a>
                    <button
                        onClick={() => setShowImport(true)}
                        className="m3-button-tonal flex-1"
                    >
                        <Upload className="w-4 h-4" />
                        <span className="hidden sm:inline">Import</span>
                    </button>
                    <Link
                        href="/admin/students/create"
                        className="m3-button-filled flex-1 hidden md:inline-flex"
                    >
                        <UserPlus className="w-4 h-4" />
                        Tambah
                    </Link>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                    <input
                        type="text"
                        placeholder="Cari siswa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="m3-input pl-12"
                    />
                </form>

                {/* Student List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {students.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {students.data.map((student, idx) => (
                                <div
                                    key={student.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-medium text-secondary-foreground">
                                            {student.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">{student.name}</p>
                                        <p className="text-sm text-on-surface-variant">
                                            NIS: {student.nis} • {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                                        </p>
                                    </div>
                                    <span className={`m3-chip-filled text-xs ${student.status === 'active'
                                            ? 'bg-chart-3/15 text-chart-3'
                                            : 'bg-chart-5/15 text-chart-5'
                                        }`}>
                                        {student.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                    <div className="flex gap-1 ml-2">
                                        <Link
                                            href={`/admin/students/${student.id}/edit`}
                                            className="w-9 h-9 rounded-full flex items-center justify-center 
                                                     hover:bg-surface-variant transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-on-surface-variant" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(student.id, student.name)}
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
                            <Users className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Belum ada data siswa</p>
                            <p className="text-on-surface-variant mt-1">Tambahkan siswa pertama Anda</p>
                            <Link href="/admin/students/create" className="m3-button-filled mt-6 inline-flex">
                                <UserPlus className="w-4 h-4" />
                                Tambah Siswa
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {students.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: students.last_page }, (_, i) => (
                            <Link
                                key={i + 1}
                                href={`/admin/students?page=${i + 1}&search=${search}`}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${students.current_page === i + 1
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-surface-variant text-on-surface-variant'
                                    }`}
                            >
                                {i + 1}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Import Modal */}
            {showImport && (
                <>
                    <div className="m3-dialog-overlay" onClick={() => setShowImport(false)} />
                    <div className="m3-dialog animate-m3-enter">
                        <h3 className="text-xl font-semibold text-on-surface mb-2">Import Data Siswa</h3>
                        <p className="text-on-surface-variant text-sm mb-6">
                            Upload file CSV dengan format yang sesuai template.
                        </p>

                        <form onSubmit={handleImport} className="space-y-5">
                            <div>
                                <label className="text-sm font-medium text-on-surface-variant">File CSV</label>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                    className="mt-2 w-full p-3 rounded-xl border border-border bg-surface-container text-sm"
                                />
                                {errors.file && <p className="text-xs text-destructive mt-2">{errors.file}</p>}
                            </div>

                            <p className="text-xs text-on-surface-variant bg-surface-variant/50 p-3 rounded-xl">
                                Format: nis, nama, jenis_kelamin (L/P), tanggal_lahir (YYYY-MM-DD), status (active/inactive)
                            </p>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowImport(false)}
                                    className="m3-button-text flex-1"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || !data.file}
                                    className="m3-button-filled flex-1"
                                >
                                    {processing ? 'Mengimpor...' : 'Import'}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </AppLayout>
    );
}
