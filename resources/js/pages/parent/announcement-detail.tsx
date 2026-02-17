import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/layouts/mobile-layout';
import { ArrowLeft, Calendar, User, Clock, Megaphone, AlertTriangle, Bell } from 'lucide-react';
import type { Announcement } from '@/types/academic';
import { ANNOUNCEMENT_TYPES, ANNOUNCEMENT_AUDIENCES } from '@/types/academic';

interface Props {
    announcement: Announcement;
}

const typeIcons = {
    general: <Megaphone className="h-6 w-6" />,
    academic: <Calendar className="h-6 w-6" />,
    event: <Bell className="h-6 w-6" />,
    urgent: <AlertTriangle className="h-6 w-6" />,
};

const typeColors = {
    general: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
    academic: 'bg-green-100 text-green-600 dark:bg-green-900/30',
    event: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
    urgent: 'bg-red-100 text-red-600 dark:bg-red-900/30',
};

export default function ParentAnnouncementDetail({ announcement }: Props) {
    return (
        <MobileLayout>
            <Head title={announcement.title} />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('parent.announcements')} className="rounded-full p-2 hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold">Detail Pengumuman</h1>
                    </div>
                </div>

                {/* Announcement Card */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${typeColors[announcement.type]}`}>
                                {typeIcons[announcement.type]}
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg leading-tight">{announcement.title}</CardTitle>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Badge variant="outline">
                                        {ANNOUNCEMENT_TYPES[announcement.type]}
                                    </Badge>
                                    <Badge variant="secondary">
                                        {ANNOUNCEMENT_AUDIENCES[announcement.target_audience]}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Meta Info */}
                        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            {announcement.author && (
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{announcement.author.name}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {announcement.published_at && 
                                        new Date(announcement.published_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div 
                            className="prose prose-sm max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: announcement.content }}
                        />

                        {/* Expiry Notice */}
                        {announcement.expires_at && (
                            <div className="mt-4 rounded-lg bg-muted p-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        Berlaku hingga: {new Date(announcement.expires_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
