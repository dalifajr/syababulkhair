import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Lock, Unlock, Printer, FileText, CheckCircle, XCircle } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReportCard, ReportCardSubject, HomeroomNote } from '@/types/academic';
import { PROMOTION_STATUSES } from '@/types/academic';
import { ScoreChart } from '@/components/score-chart';

type Props = {
    reportCard: ReportCard & {
        subjects: ReportCardSubject[];
        homeroom_note?: HomeroomNote;
    };
};

export default function ReportCardShow({ reportCard }: Props) {
    const handleToggleLock = () => {
        router.post(`/admin/report-cards/${reportCard.id}/toggle-lock`);
    };

    const getGradeColor = (grade: string | null) => {
        if (!grade) return '';
        switch (grade) {
            case 'A': return 'text-green-600';
            case 'B': return 'text-blue-600';
            case 'C': return 'text-yellow-600';
            case 'D': return 'text-orange-600';
            case 'E': return 'text-red-600';
            default: return '';
        }
    };

    // Calculate averages
    const avgFinalScore = reportCard.subjects.length > 0
        ? reportCard.subjects.reduce((sum, s) => sum + (s.final_score || 0), 0) / reportCard.subjects.length
        : 0;

    const passedCount = reportCard.subjects.filter((s) => s.is_passing).length;
    const failedCount = reportCard.subjects.length - passedCount;

    return (
        <AppLayout title="Detail Rapor" showBack={true} backUrl="/admin/report-cards">
            <Head title="Detail Rapor" />

            <div className="m3-container py-6 space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">{reportCard.class_enrollment?.student?.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            {reportCard.class_enrollment?.class_group?.name} - {reportCard.term?.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleToggleLock}
                            className="gap-1"
                        >
                            {reportCard.is_locked ? (
                                <>
                                    <Unlock className="w-4 h-4" />
                                    Buka
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    Kunci
                                </>
                            )}
                        </Button>
                        {reportCard.is_locked && (
                            <a
                                href={`/admin/report-cards/${reportCard.id}/print`}
                                target="_blank"
                            >
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Printer className="w-4 h-4" />
                                    Cetak
                                </Button>
                            </a>
                        )}
                    </div>
                </div>

                {/* Student Info Card */}
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-muted-foreground">NIS</p>
                                <p className="font-medium">{reportCard.class_enrollment?.student?.nis}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">NISN</p>
                                <p className="font-medium">{reportCard.class_enrollment?.student?.nisn || '-'}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Semester</p>
                                <p className="font-medium">{reportCard.term?.academic_year?.name}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Status</p>
                                <Badge variant={reportCard.is_locked ? 'default' : 'secondary'}>
                                    {reportCard.is_locked ? 'Final' : 'Draft'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-3">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-primary">{avgFinalScore.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">Rata-rata</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold">{reportCard.class_rank ? `#${reportCard.class_rank}` : '-'}</p>
                            <p className="text-xs text-muted-foreground">Peringkat</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{passedCount}</p>
                            <p className="text-xs text-muted-foreground">Tuntas</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Scores Table */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Nilai Mata Pelajaran</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mata Pelajaran</TableHead>
                                        <TableHead className="text-center">Nilai</TableHead>
                                        <TableHead className="text-center">Grade</TableHead>
                                        <TableHead className="text-center">KKM</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reportCard.subjects.map((subject) => (
                                        <TableRow key={subject.id}>
                                            <TableCell className="font-medium">
                                                {subject.subject?.name}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {subject.final_score?.toFixed(1) || '-'}
                                            </TableCell>
                                            <TableCell className={`text-center font-bold ${getGradeColor(subject.grade)}`}>
                                                {subject.grade || '-'}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {subject.kkm}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {subject.is_passing ? (
                                                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Score Chart */}
                {reportCard.subjects.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Grafik Nilai Per Mata Pelajaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScoreChart
                                title="Nilai Akhir"
                                type="bar"
                                data={reportCard.subjects.map((s) => ({
                                    label: s.subject?.name?.substring(0, 12) || '-',
                                    value: s.final_score || 0,
                                }))}
                            />
                        </CardContent>
                    </Card>
                )}

                {/* Attendance */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Kehadiran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                                <p className="text-2xl font-bold text-yellow-600">{reportCard.sick_days}</p>
                                <p className="text-xs text-muted-foreground">Sakit</p>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <p className="text-2xl font-bold text-blue-600">{reportCard.permit_days}</p>
                                <p className="text-xs text-muted-foreground">Izin</p>
                            </div>
                            <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                                <p className="text-2xl font-bold text-red-600">{reportCard.absent_days}</p>
                                <p className="text-xs text-muted-foreground">Alfa</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Homeroom Note */}
                {reportCard.homeroom_note && (
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Catatan Wali Kelas</CardTitle>
                                {!reportCard.is_locked && (
                                    <Link href={route('admin.homeroom-notes.edit', reportCard.homeroom_note.id)}>
                                        <Button variant="ghost" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {reportCard.homeroom_note.academic_note && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Akademik</p>
                                    <p className="text-sm">{reportCard.homeroom_note.academic_note}</p>
                                </div>
                            )}
                            {reportCard.homeroom_note.personality_note && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Kepribadian</p>
                                    <p className="text-sm">{reportCard.homeroom_note.personality_note}</p>
                                </div>
                            )}
                            {reportCard.homeroom_note.recommendation && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Rekomendasi</p>
                                    <p className="text-sm">{reportCard.homeroom_note.recommendation}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Promotion Status */}
                {reportCard.promotion_status && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="font-medium">Status Kenaikan</p>
                                <Badge
                                    variant={
                                        reportCard.promotion_status === 'promoted' ||
                                            reportCard.promotion_status === 'graduated'
                                            ? 'default' : 'secondary'
                                    }
                                >
                                    {PROMOTION_STATUSES[reportCard.promotion_status]}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
