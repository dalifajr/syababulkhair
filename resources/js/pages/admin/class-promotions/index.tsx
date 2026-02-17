import { Head, Link, router } from '@inertiajs/react';
import { Users, TrendingUp, GraduationCap, RotateCcw, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ClassGroup, Term } from '@/types/academic';

type Props = {
    classGroups: (ClassGroup & { enrollments_count: number })[];
    terms: Term[];
    filters: {
        from_term_id: number | null;
    };
    stats: {
        promoted: number;
        retained: number;
        graduated: number;
        transferred: number;
    };
    statuses: Record<string, string>;
};

export default function ClassPromotionIndex({ classGroups, terms, filters, stats, statuses }: Props) {
    const handleFilterChange = (key: string, value: string) => {
        router.get('/admin/class-promotions', {
            ...filters,
            [key]: value === 'all' ? null : value,
        }, { preserveState: true });
    };

    return (
        <AppLayout
            title="Kenaikan Kelas"
            showBack={true}
            backUrl="/dashboard"
        >
            <Head title="Kenaikan Kelas" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-3 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.promoted || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Naik</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <RotateCcw className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.retained || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Tinggal</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.graduated || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Lulus</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gray-500/10 flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.transferred || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Pindah</p>
                    </div>
                </div>

                {/* Term Filter */}
                <div className="space-y-2">
                    <Select 
                        value={filters.from_term_id?.toString() || 'all'} 
                        onValueChange={(v) => handleFilterChange('from_term_id', v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Semester Asal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Semester</SelectItem>
                            {terms.map((term) => (
                                <SelectItem key={term.id} value={term.id.toString()}>
                                    {term.name} - {term.academic_year?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Class List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {classGroups.length > 0 ? (
                        <div className="divide-y divide-border">
                            {classGroups.map((classGroup, idx) => (
                                <Link
                                    key={classGroup.id}
                                    href={`/admin/class-promotions/${classGroup.id}`}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">{classGroup.name}</p>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-on-surface-variant">
                                            <Badge variant="outline">
                                                {classGroup.enrollments_count} siswa
                                            </Badge>
                                            <span>{classGroup.term?.name}</span>
                                        </div>
                                        {classGroup.homeroom_teacher && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Wali: {classGroup.homeroom_teacher.name}
                                            </p>
                                        )}
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-on-surface-variant">Tidak ada kelas ditemukan</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Pilih semester untuk melihat daftar kelas
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
