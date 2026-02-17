import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MobileLayout from '@/layouts/mobile-layout';
import { ArrowLeft, Download, Printer, Lock, CheckCircle } from 'lucide-react';
import type { Student, ReportCard, ReportCardSubject, HomeroomNote } from '@/types/academic';
import { PROMOTION_STATUSES } from '@/types/academic';

interface Props {
    student: Student;
    reportCard: ReportCard & {
        subjects: ReportCardSubject[];
        homeroom_note?: HomeroomNote;
    };
}

export default function ParentReportCardDetail({ student, reportCard }: Props) {
    const handlePrint = () => {
        window.open(route('parent.report-cards.print', reportCard.id), '_blank');
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

    return (
        <MobileLayout>
            <Head title="Detail Rapor" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('parent.report-cards')} className="rounded-full p-2 hover:bg-muted">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">{reportCard.term?.name}</h1>
                            <p className="text-sm text-muted-foreground">
                                {reportCard.term?.academic_year?.name}
                            </p>
                        </div>
                    </div>
                    {reportCard.is_locked && (
                        <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
                            <Printer className="h-4 w-4" />
                            Cetak
                        </Button>
                    )}
                </div>

                {/* Student Info */}
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <p className="text-muted-foreground">Nama</p>
                                <p className="font-medium">{student.name}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">NIS</p>
                                <p className="font-medium">{student.nis}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Kelas</p>
                                <p className="font-medium">{reportCard.class_enrollment?.class_group?.name}</p>
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
                                                    <Badge variant="default" className="gap-1">
                                                        <CheckCircle className="h-3 w-3" />
                                                        Lulus
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive">Belum Tuntas</Badge>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Ringkasan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center rounded-lg bg-muted p-3">
                                <p className="text-2xl font-bold text-primary">{avgFinalScore.toFixed(1)}</p>
                                <p className="text-xs text-muted-foreground">Rata-rata Nilai</p>
                            </div>
                            <div className="text-center rounded-lg bg-muted p-3">
                                <p className="text-2xl font-bold">
                                    {reportCard.class_rank ? `#${reportCard.class_rank}` : '-'}
                                </p>
                                <p className="text-xs text-muted-foreground">Peringkat Kelas</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Attendance Summary */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Kehadiran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/30">
                                <p className="text-lg font-bold text-yellow-600">{reportCard.sick_days}</p>
                                <p className="text-xs text-muted-foreground">Sakit</p>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                <p className="text-lg font-bold text-blue-600">{reportCard.permit_days}</p>
                                <p className="text-xs text-muted-foreground">Izin</p>
                            </div>
                            <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                                <p className="text-lg font-bold text-red-600">{reportCard.absent_days}</p>
                                <p className="text-xs text-muted-foreground">Alfa</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Homeroom Note */}
                {reportCard.homeroom_note && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Catatan Wali Kelas</CardTitle>
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
                            {reportCard.homeroom_note.parent_note && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Catatan untuk Orang Tua</p>
                                    <p className="text-sm">{reportCard.homeroom_note.parent_note}</p>
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
                                    variant={reportCard.promotion_status === 'promoted' ? 'default' : 
                                             reportCard.promotion_status === 'graduated' ? 'default' : 
                                             'secondary'}
                                >
                                    {PROMOTION_STATUSES[reportCard.promotion_status]}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </MobileLayout>
    );
}
