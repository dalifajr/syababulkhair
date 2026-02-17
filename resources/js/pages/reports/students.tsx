import { Head, Link, router } from '@inertiajs/react';
import { Search, Award, ChevronRight, School, GraduationCap, Download, ArrowUpDown, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/mobile-layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Student = {
    id: number;
    nis: string;
    name: string;
    average: number | null;
    total_scores: number;
};

type ClassGroup = {
    id: number;
    name: string;
};

type Term = {
    id: number;
    name: string;
} | null;

type Props = {
    students: {
        data: Student[];
        current_page: number;
        last_page: number;
        total?: number;
    };
    classGroups: ClassGroup[];
    activeTerm: Term;
    filters?: unknown;
    printMode?: boolean;
    printStudents?: Student[];
    letterhead?: {
        enabled: boolean;
        logoUrl: string | null;
        line1: string | null;
        line2: string | null;
        line3: string | null;
        schoolName: string | null;
    } | null;
    meta?: {
        date?: string | null;
        term?: string | null;
        academicYear?: string | null;
        teacher?: string | null;
    };
};

export default function ReportStudents({ students, classGroups, activeTerm, filters, printMode, printStudents, letterhead, meta }: Props) {
    const safeFilters = (filters && typeof filters === 'object' && !Array.isArray(filters) ? filters : {}) as {
        search?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };

    const [search, setSearch] = useState(safeFilters.search || '');
    const [sort, setSort] = useState(safeFilters.sort || 'name');
    const [direction, setDirection] = useState(safeFilters.direction || 'asc');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/reports/students', { search, sort, direction }, { preserveState: true });
    };

    const applySort = (nextSort: string, nextDirection: string) => {
        setSort(nextSort);
        setDirection(nextDirection);
        router.get('/reports/students', { search, sort: nextSort, direction: nextDirection }, { preserveState: true });
    };

    const exportAll = () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (direction) params.set('direction', direction);
        window.location.href = `/reports/students/export?${params.toString()}`;
    };

    const printAll = () => {
        const params = new URLSearchParams();
        params.set('print', '1');
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (direction) params.set('direction', direction);
        window.open(`/reports/students?${params.toString()}`, '_blank');
    };

    useEffect(() => {
        if (!printMode) return;

        const timer = window.setTimeout(() => {
            window.print();
        }, 250);

        return () => window.clearTimeout(timer);
    }, [printMode]);

    if (printMode) {
        const lhEnabled = !!letterhead?.enabled;
        const lhLine1 = letterhead?.line1 || letterhead?.schoolName || '';
        const lhLine2 = letterhead?.line2 || '';
        const lhLine3 = letterhead?.line3 || '';

        const dateText = meta?.date
            ? new Date(meta.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
            : new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

        const rows = printStudents || [];

        return (
            <>
                <Head title="Print Nilai Siswa" />

                <style>{`
                    @page { size: A4; margin: 8mm; }
                    html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff !important; color: #000 !important; }
                `}</style>

                <div className="p-4 print:p-0 text-[11px] leading-4 text-black bg-white">
                    {lhEnabled && (
                        <div className="flex gap-3 items-start pb-2 mb-2 border-b border-black">
                            {letterhead?.logoUrl && (
                                <img src={letterhead.logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
                            )}
                            <div className="flex-1">
                                {lhLine1 && <div className="text-sm font-bold leading-5">{lhLine1}</div>}
                                {lhLine2 && <div className="text-[11px]">{lhLine2}</div>}
                                {lhLine3 && <div className="text-[11px]">{lhLine3}</div>}
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-2">
                        <div className="text-sm font-bold">REKAP NILAI SISWA</div>
                        <div className="text-[11px]">Tanggal: {dateText}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
                        <div className="flex gap-2">
                            <div className="w-24">Semester</div>
                            <div>: {meta?.term || '-'}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Tahun Ajaran</div>
                            <div>: {meta?.academicYear || '-'}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-24">Guru/Petugas</div>
                            <div>: {meta?.teacher || '-'}</div>
                        </div>
                        <div />
                    </div>

                    <table className="w-full border border-black border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black px-2 py-1 text-center w-10">No</th>
                                <th className="border border-black px-2 py-1 text-left">NIS</th>
                                <th className="border border-black px-2 py-1 text-left">Nama</th>
                                <th className="border border-black px-2 py-1 text-center w-20">Rata-rata</th>
                                <th className="border border-black px-2 py-1 text-center w-24">Jml. Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length > 0 ? (
                                rows.map((s, idx) => (
                                    <tr key={s.id}>
                                        <td className="border border-black px-2 py-1 text-center">{idx + 1}</td>
                                        <td className="border border-black px-2 py-1">{s.nis}</td>
                                        <td className="border border-black px-2 py-1">{s.name}</td>
                                        <td className="border border-black px-2 py-1 text-center">{s.average ?? '-'}</td>
                                        <td className="border border-black px-2 py-1 text-center">{s.total_scores}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black px-2 py-2" colSpan={5}>
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    return (
        <AppLayout title="Rapor Siswa" showBack={true} backUrl="/dashboard">
            <Head title="Rapor Siswa" />

            <div className="m3-container py-6 space-y-6">
                {/* Info Card */}
                <div className="m3-card-elevated bg-gradient-to-br from-tertiary/5 to-primary/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-surface-variant flex items-center justify-center">
                            <School className="w-6 h-6 text-on-surface-variant" />
                        </div>
                        <div>
                            <p className="font-semibold text-lg text-on-surface">
                                {activeTerm?.name || 'Belum ada semester aktif'}
                            </p>
                            <p className="text-sm text-on-surface-variant">
                                {classGroups.length} Kelas • {students.data.length} Siswa
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                    <input
                        type="text"
                        placeholder="Cari nama atau NIS siswa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="m3-input pl-12"
                    />
                </form>

                {/* Actions */}
                <div className="m3-card-elevated">
                    <div className="flex flex-col md:flex-row gap-3">
                        <button type="button" className="m3-button-tonal" onClick={printAll}>
                            <Printer className="w-4 h-4" />
                            Print Nilai Semua Siswa
                        </button>
                        <button type="button" className="m3-button-filled" onClick={exportAll}>
                            <Download className="w-4 h-4" />
                            Download Nilai Semua Siswa (CSV)
                        </button>

                        <div className="flex items-center gap-2 md:ml-auto">
                            <div className="flex items-center gap-2 text-on-surface-variant">
                                <ArrowUpDown className="w-4 h-4" />
                                <span className="text-sm font-medium">Urutkan</span>
                            </div>
                            <Select value={sort} onValueChange={(v) => applySort(v, direction)}>
                                <SelectTrigger className="h-10 bg-surface min-w-[160px]">
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Nama</SelectItem>
                                    <SelectItem value="nis">NIS</SelectItem>
                                    <SelectItem value="average">Rata-rata</SelectItem>
                                    <SelectItem value="total_scores">Jumlah Nilai</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={direction} onValueChange={(v) => applySort(sort, v)}>
                                <SelectTrigger className="h-10 bg-surface min-w-[120px]">
                                    <SelectValue placeholder="Arah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">Naik</SelectItem>
                                    <SelectItem value="desc">Turun</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Student List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-medium text-on-surface">Daftar Siswa</h3>
                    </div>
                    {students.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {students.data.map((student, idx) => (
                                <Link
                                    key={student.id}
                                    href={`/reports/students/${student.id}`}
                                    className="m3-list-item group animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                                        <Award className="w-5 h-5 text-secondary-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">{student.name}</p>
                                        <p className="text-sm text-on-surface-variant">
                                            NIS: {student.nis} • {student.total_scores} nilai
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.open(`/reports/students/${student.id}?print=1`, '_blank');
                                            }}
                                            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                                            aria-label={`Print rapor ${student.name}`}
                                            title="Print rapor"
                                        >
                                            <Printer className="w-4 h-4 text-primary" />
                                        </button>
                                        <div className="text-right hidden xs:block">
                                            <p className="text-lg font-bold text-primary">
                                                {student.average !== null ? student.average : '-'}
                                            </p>
                                            <p className="text-[10px] uppercase font-bold text-on-surface-variant">Rata-rata</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <GraduationCap className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                            <p className="text-lg font-medium text-on-surface">Tidak ada siswa ditemukan</p>
                            <p className="text-on-surface-variant mt-1">Coba kata kunci pencarian lain.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {students.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: students.last_page }, (_, i) => (
                            <Link
                                key={i + 1}
                                href={`/reports/students?page=${i + 1}&search=${encodeURIComponent(search)}&sort=${encodeURIComponent(sort)}&direction=${encodeURIComponent(direction)}`}
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
        </AppLayout>
    );
}
