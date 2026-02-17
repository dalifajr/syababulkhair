import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/layouts/mobile-layout';
import { ArrowLeft, Bell, Megaphone, Calendar, ChevronRight, AlertTriangle, Info } from 'lucide-react';
import type { Student, Announcement, PaginatedData } from '@/types/academic';
import { ANNOUNCEMENT_TYPES } from '@/types/academic';

interface Props {
    student: Student;
    announcements: PaginatedData<Announcement>;
}

const typeIcons = {
    general: <Megaphone className="h-5 w-5" />,
    academic: <Calendar className="h-5 w-5" />,
    event: <Bell className="h-5 w-5" />,
    urgent: <AlertTriangle className="h-5 w-5" />,
};

const typeColors = {
    general: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
    academic: 'bg-green-100 text-green-600 dark:bg-green-900/30',
    event: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
    urgent: 'bg-red-100 text-red-600 dark:bg-red-900/30',
};

export default function ParentAnnouncements({ student, announcements }: Props) {
    return (
        <MobileLayout>
            <Head title="Pengumuman" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('parent.dashboard')} className="rounded-full p-2 hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Pengumuman</h1>
                        <p className="text-sm text-muted-foreground">{student.name}</p>
                    </div>
                </div>

                {/* Announcements List */}
                {announcements.data.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <Megaphone className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground">Belum ada pengumuman</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {announcements.data.map((announcement) => (
                            <Link 
                                key={announcement.id} 
                                href={route('parent.announcements.show', announcement.id)}
                            >
                                <Card className="transition-colors hover:bg-muted/50">
                                    <CardContent className="flex items-start gap-3 p-4">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${typeColors[announcement.type]}`}>
                                            {typeIcons[announcement.type]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-medium line-clamp-2">{announcement.title}</h3>
                                                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                                {announcement.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                            </p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {ANNOUNCEMENT_TYPES[announcement.type]}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    {announcement.published_at && 
                                                        new Date(announcement.published_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination Links */}
                {announcements.links && announcements.links.length > 3 && (
                    <div className="flex justify-center gap-2">
                        {announcements.links.slice(1, -1).map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`rounded px-3 py-1 text-sm ${
                                    link.active 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'bg-muted hover:bg-muted/80'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
