import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Lock, Unlock, Printer, FileText, Users } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ReportCard, ClassGroup, Term } from '@/types/academic';
import { PROMOTION_STATUSES } from '@/types/academic';

type ReportCardWithRelations = ReportCard & {
    class_enrollment?: {
        student?: { id: number; name: string; nis: string };
        class_group?: { id: number; name: string };
    };
    generated_by?: { name: string };
};

type Props = {
    reportCards: ReportCardWithRelations[];
    classGroups: ClassGroup[];
    terms: Term[];
    filters: {
        class_group_id: number | null;
        term_id: number | null;
    };
};

export default function ReportCardIndex({ reportCards, classGroups, terms, filters }: Props) {
    const handleFilterChange = (key: string, value: string) => {
        router.get('/admin/report-cards', {
            ...filters,
            [key]: value === 'all' ? null : value,
        }, { preserveState: true });
    };

    const handleToggleLock = (id: number) => {
        router.post(`/admin/report-cards/${id}/toggle-lock`);
    };

    // Stats from current reportCards
    const stats = {
        total: (reportCards || []).length,
        locked: (reportCards || []).filter(r => r.is_locked).length,
        draft: (reportCards || []).filter(r => !r.is_locked).length,
    };

    return (
        <AppLayout
            title="Rapor Siswa"
            showBack={true}
            backUrl="/dashboard"
            showFab={!!filters.class_group_id}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/report-cards/generate"
        >
            <Head title="Rapor Siswa" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats.total}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Total</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats.locked}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Final</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <Unlock className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats.draft}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Draft</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    <Select 
                        value={filters.term_id?.toString() || 'all'} 
                        onValueChange={(v) => handleFilterChange('term_id', v)}
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Pilih Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Semester</SelectItem>
                            {(terms || []).map((term) => (
                                <SelectItem key={term.id} value={term.id.toString()}>
                                    {term.name} - {term.academic_year?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select 
                        value={filters.class_group_id?.toString() || 'all'} 
                        onValueChange={(v) => handleFilterChange('class_group_id', v)}
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Pilih Kelas</SelectItem>
                            {(classGroups || []).map((cg) => (
                                <SelectItem key={cg.id} value={cg.id.toString()}>{cg.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/report-cards/create"
                        className="m3-button-filled w-full"
                    >
                        <Plus className="w-5 h-5" />
                        Generate Rapor
                    </Link>
                </div>

                {/* Report Card List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {!filters.class_group_id ? (
                        <div className="p-8 text-center">
                            <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-on-surface-variant">Pilih kelas untuk melihat rapor</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Gunakan filter di atas untuk memilih kelas
                            </p>
                        </div>
                    ) : (reportCards || []).length > 0 ? (
                        <div className="divide-y divide-border">
                            {reportCards.map((reportCard, idx) => (
                                <div
                                    key={reportCard.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">
                                            {reportCard.class_enrollment?.student?.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-on-surface-variant">
                                            <Badge variant="outline">
                                                {reportCard.class_enrollment?.class_group?.name}
                                            </Badge>
                                            <span>{reportCard.term?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={reportCard.is_locked ? 'default' : 'secondary'}>
                                                {reportCard.is_locked ? 'Final' : 'Draft'}
                                            </Badge>
                                            {reportCard.promotion_status && (
                                                <Badge variant="outline">
                                                    {PROMOTION_STATUSES[reportCard.promotion_status]}
                                                </Badge>
                                            )}
                                            {reportCard.class_rank && (
                                                <span className="text-xs text-muted-foreground">
                                                    Rank #{reportCard.class_rank}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleToggleLock(reportCard.id)}
                                            className="p-2 rounded-full hover:bg-muted transition-colors"
                                            title={reportCard.is_locked ? 'Buka Kunci' : 'Kunci'}
                                        >
                                            {reportCard.is_locked ? (
                                                <Unlock className="w-4 h-4 text-yellow-500" />
                                            ) : (
                                                <Lock className="w-4 h-4 text-green-500" />
                                            )}
                                        </button>
                                        <Link
                                            href={`/admin/report-cards/${reportCard.id}`}
                                            className="p-2 rounded-full hover:bg-muted transition-colors"
                                        >
                                            <Eye className="w-4 h-4 text-primary" />
                                        </Link>
                                        {reportCard.is_locked && (
                                            <a
                                                href={`/admin/report-cards/${reportCard.id}/print`}
                                                target="_blank"
                                                className="p-2 rounded-full hover:bg-muted transition-colors"
                                            >
                                                <Printer className="w-4 h-4 text-muted-foreground" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-on-surface-variant">Belum ada rapor</p>
                            <Link
                                href="/admin/report-cards/create"
                                className="m3-button-tonal mt-4"
                            >
                                <Plus className="w-4 h-4" />
                                Generate Rapor Pertama
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}
