import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileLayout from '@/layouts/mobile-layout';
import { router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import type { Student, AttendanceRecord, Term } from '@/types/academic';
import { ATTENDANCE_STATUSES } from '@/types/academic';

interface AttendanceSummaryBySubject {
    total: number;
    present: number;
    sick: number;
    permit: number;
    absent: number;
}

interface Props {
    student: Student;
    attendanceRecords: AttendanceRecord[];
    summaryBySubject: Record<string, AttendanceSummaryBySubject>;
    terms: Term[];
    filters: {
        term_id: number | null;
    };
}

const statusIcons = {
    present: <CheckCircle className="h-4 w-4 text-green-600" />,
    sick: <AlertCircle className="h-4 w-4 text-yellow-600" />,
    permit: <Clock className="h-4 w-4 text-blue-600" />,
    absent: <XCircle className="h-4 w-4 text-red-600" />,
    unmarked: <Clock className="h-4 w-4 text-gray-400" />,
};

const statusColors = {
    present: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    sick: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    permit: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    absent: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    unmarked: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export default function ParentAttendance({ student, attendanceRecords, summaryBySubject, terms, filters }: Props) {
    const handleTermChange = (value: string) => {
        router.get(route('parent.attendance'), { term_id: value }, { preserveState: true });
    };

    const subjectNames = Object.keys(summaryBySubject);

    // Calculate total summary
    const totalSummary = subjectNames.reduce(
        (acc, name) => {
            const summary = summaryBySubject[name];
            return {
                total: acc.total + summary.total,
                present: acc.present + summary.present,
                sick: acc.sick + summary.sick,
                permit: acc.permit + summary.permit,
                absent: acc.absent + summary.absent,
            };
        },
        { total: 0, present: 0, sick: 0, permit: 0, absent: 0 }
    );

    const attendancePercentage = totalSummary.total > 0 
        ? Math.round((totalSummary.present / totalSummary.total) * 100) 
        : 0;

    return (
        <MobileLayout>
            <Head title="Kehadiran Siswa" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('parent.dashboard')} className="rounded-full p-2 hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Kehadiran</h1>
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

                {/* Overall Summary */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Ringkasan Kehadiran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 text-center">
                            <p className="text-4xl font-bold text-primary">{attendancePercentage}%</p>
                            <p className="text-sm text-muted-foreground">Tingkat Kehadiran</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                                <p className="text-lg font-bold text-green-600">{totalSummary.present}</p>
                                <p className="text-xs text-muted-foreground">Hadir</p>
                            </div>
                            <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/30">
                                <p className="text-lg font-bold text-yellow-600">{totalSummary.sick}</p>
                                <p className="text-xs text-muted-foreground">Sakit</p>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                <p className="text-lg font-bold text-blue-600">{totalSummary.permit}</p>
                                <p className="text-xs text-muted-foreground">Izin</p>
                            </div>
                            <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                                <p className="text-lg font-bold text-red-600">{totalSummary.absent}</p>
                                <p className="text-xs text-muted-foreground">Alfa</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Per Subject Summary */}
                {subjectNames.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Per Mata Pelajaran</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {subjectNames.map((subjectName) => {
                                const summary = summaryBySubject[subjectName];
                                const percentage = summary.total > 0 
                                    ? Math.round((summary.present / summary.total) * 100) 
                                    : 0;

                                return (
                                    <div key={subjectName} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                        <div>
                                            <p className="font-medium">{subjectName}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {summary.present}/{summary.total} pertemuan
                                            </p>
                                        </div>
                                        <Badge variant={percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'destructive'}>
                                            {percentage}%
                                        </Badge>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                )}

                {/* Recent Records */}
                {attendanceRecords.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Riwayat Kehadiran</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {attendanceRecords.slice(0, 20).map((record) => (
                                <div key={record.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                    <div className="flex items-center gap-3">
                                        {statusIcons[record.status]}
                                        <div>
                                            <p className="font-medium">
                                                {record.attendance_session?.teaching_assignment?.subject?.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {record.attendance_session?.meeting_date && 
                                                    new Date(record.attendance_session.meeting_date).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className={statusColors[record.status]}>
                                        {ATTENDANCE_STATUSES[record.status]}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {attendanceRecords.length === 0 && (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <p className="text-muted-foreground">Belum ada data kehadiran di semester ini</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </MobileLayout>
    );
}
