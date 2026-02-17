import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Megaphone, Eye, EyeOff, Calendar, Users, AlertTriangle, Bell } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import type { Announcement, PaginatedData } from '@/types/academic';
import { ANNOUNCEMENT_TYPES, ANNOUNCEMENT_AUDIENCES } from '@/types/academic';

type Props = {
    announcements: PaginatedData<Announcement>;
    stats: {
        total: number;
        published: number;
        draft: number;
        urgent: number;
    };
};

const typeIcons = {
    general: <Megaphone className="w-5 h-5" />,
    academic: <Calendar className="w-5 h-5" />,
    event: <Bell className="w-5 h-5" />,
    urgent: <AlertTriangle className="w-5 h-5" />,
};

export default function AnnouncementIndex({ announcements, stats }: Props) {
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Hapus pengumuman "${title}"?`)) {
            router.delete(`/admin/announcements/${id}`);
        }
    };

    const handleTogglePublish = (id: number) => {
        router.post(`/admin/announcements/${id}/toggle-publish`);
    };

    return (
        <AppLayout
            title="Pengumuman"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/announcements/create"
        >
            <Head title="Pengumuman" />

            <div className="m3-container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-3 m3-stagger">
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.total || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Total</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.published || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Publik</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gray-500/10 flex items-center justify-center">
                            <EyeOff className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.draft || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Draft</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-2xl font-semibold text-on-surface">{stats?.urgent || 0}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Urgent</p>
                    </div>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/announcements/create"
                        className="m3-button-filled w-full"
                    >
                        <Plus className="w-5 h-5" />
                        Buat Pengumuman
                    </Link>
                </div>

                {/* Announcement List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    {announcements.data.length > 0 ? (
                        <div className="divide-y divide-border">
                            {announcements.data.map((announcement, idx) => (
                                <div
                                    key={announcement.id}
                                    className="m3-list-item animate-m3-fade"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                                        announcement.type === 'urgent' ? 'bg-red-500/10' :
                                        announcement.type === 'academic' ? 'bg-green-500/10' :
                                        announcement.type === 'event' ? 'bg-purple-500/10' : 'bg-primary/10'
                                    }`}>
                                        {typeIcons[announcement.type]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-on-surface truncate">{announcement.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={announcement.is_published ? 'default' : 'secondary'}>
                                                {announcement.is_published ? 'Publik' : 'Draft'}
                                            </Badge>
                                            <Badge variant="outline">
                                                {ANNOUNCEMENT_TYPES[announcement.type]}
                                            </Badge>
                                            <span className="text-xs text-on-surface-variant">
                                                {announcement.published_at && new Date(announcement.published_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleTogglePublish(announcement.id)}
                                            className="p-2 rounded-full hover:bg-muted transition-colors"
                                            title={announcement.is_published ? 'Sembunyikan' : 'Publikasikan'}
                                        >
                                            {announcement.is_published ? (
                                                <EyeOff className="w-4 h-4 text-gray-500" />
                                            ) : (
                                                <Eye className="w-4 h-4 text-green-500" />
                                            )}
                                        </button>
                                        <Link
                                            href={`/admin/announcements/${announcement.id}/edit`}
                                            className="p-2 rounded-full hover:bg-muted transition-colors"
                                        >
                                            <Edit className="w-4 h-4 text-primary" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(announcement.id, announcement.title)}
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
                            <Megaphone className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-on-surface-variant">Belum ada pengumuman</p>
                            <Link
                                href="/admin/announcements/create"
                                className="m3-button-tonal mt-4"
                            >
                                <Plus className="w-4 h-4" />
                                Buat Pengumuman Pertama
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {announcements.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: announcements.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/announcements?page=${page}`}
                                className={`px-3 py-1 rounded text-sm ${
                                    page === announcements.current_page
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
