import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, User } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Schedule, ClassGroup, PaginatedData } from '@/types/academic';
import { DAYS } from '@/types/academic';
import { useState } from 'react';

type Props = {
    schedules: PaginatedData<Schedule>;
    classGroups: ClassGroup[];
    filters: {
        class_group_id: number | null;
        day_of_week: string | null;
    };
    stats: {
        total: number;
        by_day: Record<string, number>;
    };
};

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default function ScheduleIndex({ schedules, classGroups, filters, stats }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Hapus jadwal ini?')) {
            router.delete(`/admin/schedules/${id}`);
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get('/admin/schedules', {
            ...filters,
            [key]: value === 'all' ? null : value,
        }, { preserveState: true });
    };

    return (
        <AppLayout
            title="Jadwal Pelajaran"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/schedules/create"
        >
            <Head title="Jadwal Pelajaran" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats by Day */}
                <div className="grid grid-cols-6 gap-2 m3-stagger">
                    {dayOrder.map((day) => (
                        <div key={day} className="m3-card-elevated text-center p-2">
                            <p className="text-lg font-semibold text-on-surface">{stats?.by_day?.[day] || 0}</p>
                            <p className="text-xs text-on-surface-variant">{DAYS[day as keyof typeof DAYS].slice(0, 3)}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    <Select 
                        value={filters.class_group_id?.toString() || 'all'} 
                        onValueChange={(v) => handleFilterChange('class_group_id', v)}
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Semua Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kelas</SelectItem>
                            {classGroups.map((cg) => (
                                <SelectItem key={cg.id} value={cg.id.toString()}>{cg.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select 
                        value={filters.day_of_week || 'all'} 
                        onValueChange={(v) => handleFilterChange('day_of_week', v)}
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Semua Hari" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Hari</SelectItem>
                            {Object.entries(DAYS).map(([key, label]) => (
                                <SelectItem key={key} value={key}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/schedules/create"
                        className="m3-button-filled w-full"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Jadwal
                    </Link>
                </div>

                {/* Schedule List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {schedules.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {schedules.data.map((schedule, idx) => (
                                <div
                                    key={schedule.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">
                                            {schedule.teaching_assignment?.subject?.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-on-surface-variant">
                                            <Badge variant="outline">{DAYS[schedule.day_of_week as keyof typeof DAYS]}</Badge>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {schedule.start_time?.slice(0, 5)} - {schedule.end_time?.slice(0, 5)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-on-surface-variant">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {schedule.teaching_assignment?.teacher?.name}
                                            </span>
                                            {schedule.room && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {schedule.room}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/admin/schedules/${schedule.id}/edit`}
                                            className="p-2 rounded-full hover:bg-muted transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-primary" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(schedule.id)}
                                            className="p-2 rounded-full hover:bg-muted transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-on-surface-variant">Belum ada jadwal</p>
                            <Link
                                href="/admin/schedules/create"
                                className="m3-button-tonal mt-4"
                            >
                                <Plus className="w-4 h-4" />
                                Buat Jadwal Pertama
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {schedules.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: schedules.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/schedules?${new URLSearchParams({ ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v != null).map(([k, v]) => [k, String(v)])), page: String(page) }).toString()}`}
                                className={`px-3 py-1 rounded text-sm ${
                                    page === schedules.current_page
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted hover:bg-muted/80'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
