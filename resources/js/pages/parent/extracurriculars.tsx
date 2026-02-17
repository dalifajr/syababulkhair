import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileLayout from '@/layouts/mobile-layout';
import { router } from '@inertiajs/react';
import { ArrowLeft, Trophy } from 'lucide-react';
import type { Term } from '@/types/academic';

declare function route(name: string, params?: Record<string, unknown>): string;

interface Extracurricular {
    id: number;
    name: string;
    description: string | null;
    schedule: string | null;
}

interface Enrollment {
    id: number;
    grade: string | null;
    description: string | null;
    extracurricular: Extracurricular;
}

interface Student {
    id: number;
    name: string;
    nis: string;
}

interface Props {
    student: Student;
    enrollments: Enrollment[];
    terms: Term[];
    filters: {
        term_id: number | null;
    };
}

export default function ParentExtracurriculars({ student, enrollments, terms, filters }: Props) {
    const handleTermChange = (value: string) => {
        router.get(route('parent.extracurriculars'), { term_id: value }, { preserveState: true });
    };

    const getGradeBadge = (grade: string | null) => {
        if (!grade) return <Badge variant="secondary">Belum dinilai</Badge>;

        const gradeMap: Record<string, 'default' | 'secondary' | 'destructive'> = {
            'A': 'default',
            'B': 'default',
            'C': 'secondary',
            'D': 'destructive',
        };

        return <Badge variant={gradeMap[grade.toUpperCase()] || 'secondary'}>{grade}</Badge>;
    };

    return (
        <MobileLayout title="Ekstrakurikuler">
            <Head title="Ekstrakurikuler" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('parent.dashboard')} className="rounded-full p-2 hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Ekstrakurikuler</h1>
                        <p className="text-sm text-muted-foreground">{student.name}</p>
                    </div>
                </div>

                {/* Term Filter */}
                <Select value={filters.term_id?.toString() || ''} onValueChange={handleTermChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {terms.map((term) => (
                            <SelectItem key={term.id} value={term.id.toString()}>
                                {term.name} - {term.academic_year?.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Extracurricular Cards */}
                {enrollments.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Trophy className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                            <p className="font-medium text-muted-foreground">Belum mengikuti ekstrakurikuler</p>
                            <p className="mt-1 text-sm text-muted-foreground">Siswa belum terdaftar di kegiatan ekstrakurikuler pada semester ini</p>
                        </CardContent>
                    </Card>
                ) : (
                    enrollments.map((enrollment) => (
                        <Card key={enrollment.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                            <Trophy className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{enrollment.extracurricular.name}</CardTitle>
                                            {enrollment.extracurricular.schedule && (
                                                <p className="text-xs text-muted-foreground">{enrollment.extracurricular.schedule}</p>
                                            )}
                                        </div>
                                    </div>
                                    {getGradeBadge(enrollment.grade)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {enrollment.extracurricular.description && (
                                    <p className="text-sm text-muted-foreground">{enrollment.extracurricular.description}</p>
                                )}
                                {enrollment.description && (
                                    <div className="rounded-lg bg-muted/50 p-3">
                                        <p className="text-xs font-medium text-muted-foreground">Catatan Pembina</p>
                                        <p className="mt-1 text-sm">{enrollment.description}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </MobileLayout>
    );
}
