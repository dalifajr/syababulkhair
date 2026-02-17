import { Head, Link, router } from '@inertiajs/react';
import { Users, BookOpen, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ClassGroup, Term } from '@/types/academic';

type ClassGroupWithCount = ClassGroup & {
    enrollments_count: number;
    homeroom_teacher?: {
        id: number;
        name: string;
    };
};

type Props = {
    classGroups: ClassGroupWithCount[];
    terms: Term[];
    filters: {
        term_id: number | null;
    };
};

export default function HomeroomNoteIndex({ classGroups, terms, filters }: Props) {
    const handleFilterChange = (key: string, value: string) => {
        router.get('/admin/homeroom-notes', {
            ...filters,
            [key]: value === 'all' ? null : value,
        }, { preserveState: true });
    };

    return (
        <AppLayout
            title="Catatan Wali Kelas"
            showBack={true}
            backUrl="/dashboard"
        >
            <Head title="Catatan Wali Kelas" />

            <div className="m3-container py-6 space-y-6">
                {/* Info Card */}
                <div className="m3-card-elevated">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium text-on-surface">Catatan Wali Kelas</h3>
                            <p className="text-sm text-muted-foreground">
                                Pilih kelas untuk mengelola catatan siswa
                            </p>
                        </div>
                    </div>
                </div>

                {/* Term Filter */}
                <div className="space-y-2">
                    <Select 
                        value={filters.term_id?.toString() || 'all'} 
                        onValueChange={(v) => handleFilterChange('term_id', v)}
                    >
                        <SelectTrigger>
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
                </div>

                {/* Class List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {(classGroups || []).length > 0 ? (
                        <div className="divide-y divide-border">
                            {classGroups.map((classGroup, idx) => (
                                <Link
                                    key={classGroup.id}
                                    href={`/admin/homeroom-notes/${classGroup.id}`}
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
                                                {classGroup.enrollments_count || 0} siswa
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
