import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/layouts/mobile-layout';
import { ArrowLeft, Clock, MapPin, User } from 'lucide-react';
import type { Student, Schedule } from '@/types/academic';
import { DAYS } from '@/types/academic';

interface Props {
    student: Student;
    schedulesByDay: Record<string, Schedule[]>;
}

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function ParentSchedule({ student, schedulesByDay }: Props) {
    const sortedDays = Object.keys(schedulesByDay).sort(
        (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
    );

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    return (
        <MobileLayout>
            <Head title="Jadwal Pelajaran" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('parent.dashboard')} className="rounded-full p-2 hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Jadwal Pelajaran</h1>
                        <p className="text-sm text-muted-foreground">{student.name}</p>
                    </div>
                </div>

                {/* Schedule by Day */}
                {sortedDays.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <p className="text-muted-foreground">Jadwal belum tersedia</p>
                        </CardContent>
                    </Card>
                ) : (
                    sortedDays.map((day) => {
                        const schedules = schedulesByDay[day].sort((a, b) => 
                            a.start_time.localeCompare(b.start_time)
                        );
                        const isToday = day === today;

                        return (
                            <Card key={day} className={isToday ? 'ring-2 ring-primary' : ''}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base">{DAYS[day as keyof typeof DAYS]}</CardTitle>
                                        {isToday && (
                                            <Badge variant="default">Hari Ini</Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {schedules.map((schedule, idx) => (
                                        <div 
                                            key={schedule.id} 
                                            className={`rounded-lg bg-muted/50 p-3 ${idx !== 0 ? 'border-t' : ''}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium">
                                                        {schedule.teaching_assignment?.subject?.name}
                                                    </h4>
                                                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-3 w-3" />
                                                            <span>
                                                                {schedule.start_time?.slice(0, 5)} - {schedule.end_time?.slice(0, 5)}
                                                            </span>
                                                        </div>
                                                        {schedule.room && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-3 w-3" />
                                                                <span>{schedule.room}</span>
                                                            </div>
                                                        )}
                                                        {schedule.teaching_assignment?.teacher && (
                                                            <div className="flex items-center gap-2">
                                                                <User className="h-3 w-3" />
                                                                <span>{schedule.teaching_assignment.teacher.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    {schedule.teaching_assignment?.subject?.code}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </MobileLayout>
    );
}
