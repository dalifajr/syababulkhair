import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/layouts/mobile-layout';
import { 
    BookOpen, 
    Calendar, 
    ClipboardList, 
    FileText, 
    Megaphone,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import type { Student, ClassEnrollment, AssessmentScore, Schedule, Announcement } from '@/types/academic';

interface AttendanceSummary {
    total: number;
    present: number;
    sick: number;
    permit: number;
    absent: number;
}

interface Props {
    student: Student;
    currentEnrollment: ClassEnrollment | null;
    recentScores: AssessmentScore[];
    todaySchedules: Schedule[];
    announcements: Announcement[];
    attendanceSummary: AttendanceSummary | null;
}

export default function ParentDashboard({
    student,
    currentEnrollment,
    recentScores,
    todaySchedules,
    announcements,
    attendanceSummary,
}: Props) {
    const attendancePercentage = attendanceSummary && attendanceSummary.total > 0
        ? Math.round((attendanceSummary.present / attendanceSummary.total) * 100)
        : 0;

    return (
        <MobileLayout>
            <Head title="Portal Orang Tua" />

            <div className="space-y-6 p-4">
                {/* Student Info Card */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                                {student.name.charAt(0)}
                            </div>
                            <div>
                                <CardTitle className="text-xl">{student.name}</CardTitle>
                                <CardDescription>NIS: {student.nis}</CardDescription>
                                {currentEnrollment && (
                                    <Badge variant="secondary" className="mt-1">
                                        {currentEnrollment.class_group?.level} {currentEnrollment.class_group?.name}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{attendancePercentage}%</p>
                                    <p className="text-xs text-muted-foreground">Kehadiran</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{recentScores.length}</p>
                                    <p className="text-xs text-muted-foreground">Nilai Baru</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Menu */}
                <div className="grid grid-cols-4 gap-3">
                    <Link href={route('parent.scores')} className="flex flex-col items-center gap-2 rounded-lg bg-card p-3 text-center shadow-sm hover:bg-accent">
                        <div className="rounded-full bg-primary/10 p-2">
                            <ClipboardList className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium">Nilai</span>
                    </Link>
                    <Link href={route('parent.attendance')} className="flex flex-col items-center gap-2 rounded-lg bg-card p-3 text-center shadow-sm hover:bg-accent">
                        <div className="rounded-full bg-primary/10 p-2">
                            <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium">Absensi</span>
                    </Link>
                    <Link href={route('parent.schedule')} className="flex flex-col items-center gap-2 rounded-lg bg-card p-3 text-center shadow-sm hover:bg-accent">
                        <div className="rounded-full bg-primary/10 p-2">
                            <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium">Jadwal</span>
                    </Link>
                    <Link href={route('parent.report-cards')} className="flex flex-col items-center gap-2 rounded-lg bg-card p-3 text-center shadow-sm hover:bg-accent">
                        <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium">Rapor</span>
                    </Link>
                </div>

                {/* Today's Schedule */}
                {todaySchedules.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Clock className="h-4 w-4" />
                                Jadwal Hari Ini
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {todaySchedules.map((schedule) => (
                                <div key={schedule.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                    <div>
                                        <p className="font-medium">{schedule.teaching_assignment?.subject?.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {schedule.teaching_assignment?.teacher?.name}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{schedule.time_range}</p>
                                        {schedule.room && (
                                            <p className="text-xs text-muted-foreground">{schedule.room}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Recent Scores */}
                {recentScores.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <ClipboardList className="h-4 w-4" />
                                    Nilai Terbaru
                                </CardTitle>
                                <Link href={route('parent.scores')} className="text-sm text-primary hover:underline">
                                    Lihat Semua
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {recentScores.map((score) => (
                                <div key={score.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                    <div>
                                        <p className="font-medium">{score.assessment?.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {score.assessment?.teaching_assignment?.subject?.name}
                                        </p>
                                    </div>
                                    <Badge variant={score.score >= 70 ? 'default' : 'destructive'}>
                                        {score.score}/{score.assessment?.max_score}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Announcements */}
                {announcements.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Megaphone className="h-4 w-4" />
                                    Pengumuman
                                </CardTitle>
                                <Link href={route('parent.announcements')} className="text-sm text-primary hover:underline">
                                    Lihat Semua
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {announcements.map((announcement) => (
                                <Link
                                    key={announcement.id}
                                    href={route('parent.announcements.show', announcement.id)}
                                    className="block rounded-lg bg-muted/50 p-3 hover:bg-muted"
                                >
                                    <div className="flex items-start gap-2">
                                        {announcement.is_pinned && (
                                            <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
                                        )}
                                        <div>
                                            <p className="font-medium">{announcement.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(announcement.published_at || announcement.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Attendance Summary */}
                {attendanceSummary && attendanceSummary.total > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Calendar className="h-4 w-4" />
                                Rekap Kehadiran
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                                    <p className="text-lg font-bold text-green-600">{attendanceSummary.present}</p>
                                    <p className="text-xs text-muted-foreground">Hadir</p>
                                </div>
                                <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/30">
                                    <p className="text-lg font-bold text-yellow-600">{attendanceSummary.sick}</p>
                                    <p className="text-xs text-muted-foreground">Sakit</p>
                                </div>
                                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                    <p className="text-lg font-bold text-blue-600">{attendanceSummary.permit}</p>
                                    <p className="text-xs text-muted-foreground">Izin</p>
                                </div>
                                <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                                    <p className="text-lg font-bold text-red-600">{attendanceSummary.absent}</p>
                                    <p className="text-xs text-muted-foreground">Alfa</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </MobileLayout>
    );
}
