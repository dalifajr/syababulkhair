import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DAYS } from '@/types/academic';
import type { Schedule, TeachingAssignment } from '@/types/academic';

type Props = {
    schedule: Schedule;
    teachingAssignments: TeachingAssignment[];
};

export default function ScheduleEdit({ schedule, teachingAssignments }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        teaching_assignment_id: schedule.teaching_assignment_id?.toString() || '',
        day_of_week: schedule.day_of_week || '',
        start_time: schedule.start_time?.slice(0, 5) || '',
        end_time: schedule.end_time?.slice(0, 5) || '',
        room: schedule.room || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/schedules/${schedule.id}`);
    };

    // Group teaching assignments by class
    const groupedAssignments = teachingAssignments.reduce((acc, ta) => {
        const className = ta.class_group?.name || 'Unknown';
        if (!acc[className]) acc[className] = [];
        acc[className].push(ta);
        return acc;
    }, {} as Record<string, TeachingAssignment[]>);

    return (
        <AppLayout title="Edit Jadwal" showBack={true} backUrl="/admin/schedules">
            <Head title="Edit Jadwal" />

            <div className="m3-container py-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Teaching Assignment */}
                    <div className="space-y-2">
                        <Label>Mata Pelajaran & Kelas</Label>
                        <Select value={data.teaching_assignment_id} onValueChange={(v) => setData('teaching_assignment_id', v)}>
                            <SelectTrigger className={errors.teaching_assignment_id ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Pilih mata pelajaran" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(groupedAssignments).map(([className, assignments]) => (
                                    <div key={className}>
                                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted">
                                            {className}
                                        </div>
                                        {assignments.map((ta) => (
                                            <SelectItem key={ta.id} value={ta.id.toString()}>
                                                {ta.subject?.name} - {ta.teacher?.name}
                                            </SelectItem>
                                        ))}
                                    </div>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.teaching_assignment_id && <p className="text-sm text-destructive">{errors.teaching_assignment_id}</p>}
                    </div>

                    {/* Day of Week */}
                    <div className="space-y-2">
                        <Label>Hari</Label>
                        <Select value={data.day_of_week} onValueChange={(v) => setData('day_of_week', v)}>
                            <SelectTrigger className={errors.day_of_week ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Pilih hari" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(DAYS).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.day_of_week && <p className="text-sm text-destructive">{errors.day_of_week}</p>}
                    </div>

                    {/* Time Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start_time">Jam Mulai</Label>
                            <Input
                                id="start_time"
                                type="time"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                                className={errors.start_time ? 'border-destructive' : ''}
                            />
                            {errors.start_time && <p className="text-sm text-destructive">{errors.start_time}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end_time">Jam Selesai</Label>
                            <Input
                                id="end_time"
                                type="time"
                                value={data.end_time}
                                onChange={(e) => setData('end_time', e.target.value)}
                                className={errors.end_time ? 'border-destructive' : ''}
                            />
                            {errors.end_time && <p className="text-sm text-destructive">{errors.end_time}</p>}
                        </div>
                    </div>

                    {/* Room */}
                    <div className="space-y-2">
                        <Label htmlFor="room">Ruangan (Opsional)</Label>
                        <Input
                            id="room"
                            value={data.room}
                            onChange={(e) => setData('room', e.target.value)}
                            placeholder="Contoh: Ruang 101"
                        />
                        {errors.room && <p className="text-sm text-destructive">{errors.room}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="m3-button-filled w-full"
                    >
                        <Save className="w-5 h-5" />
                        {processing ? 'Menyimpan...' : 'Update Jadwal'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
