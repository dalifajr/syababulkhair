import { Head, router } from '@inertiajs/react';
import { Bell, CheckCheck, ExternalLink, Clock, Info, Award, FileText, MessageCircle } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Notification = {
    id: string;
    type: string;
    title: string;
    message: string;
    url: string | null;
    icon: string | null;
    read_at: string | null;
    created_at: string;
    time_ago: string;
};

type Props = {
    notifications: Notification[];
    unreadCount: number;
};

const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
    goldLight: '#e0c76e',
};

function getIcon(type: string, icon: string | null) {
    if (icon === 'award') return Award;
    if (icon === 'file') return FileText;
    if (icon === 'message') return MessageCircle;
    if (type.includes('Score')) return Award;
    if (type.includes('Announcement')) return MessageCircle;
    return Info;
}

export default function NotificationsIndex({ notifications, unreadCount }: Props) {
    const handleMarkAsRead = (id: string) => {
        router.post(`/notifications/${id}/read`, {}, { preserveState: false });
    };

    const handleMarkAllRead = () => {
        router.post('/notifications/read-all', {}, { preserveState: false });
    };

    return (
        <AppLayout title="Notifikasi" showBack={true} backUrl="/dashboard">
            <Head title="Notifikasi" />

            <div style={{ padding: '20px 16px 32px', maxWidth: '800px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 700, color: colors.primaryDark, margin: 0 }}>Notifikasi</h1>
                        {unreadCount > 0 && (
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '22px',
                                height: '22px',
                                borderRadius: '11px',
                                backgroundColor: '#dc2626',
                                color: '#fff',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '0 6px',
                            }}>{unreadCount}</span>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button onClick={handleMarkAllRead} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '8px 14px', borderRadius: '10px',
                            backgroundColor: 'rgba(13,110,63,0.08)',
                            color: colors.primary, fontWeight: 600, fontSize: '12px',
                            border: 'none', cursor: 'pointer',
                        }}>
                            <CheckCheck size={14} />
                            Tandai Semua
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                {notifications.length > 0 ? (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        {notifications.map((notif, idx) => {
                            const IconComponent = getIcon(notif.type, notif.icon);
                            const isUnread = !notif.read_at;
                            return (
                                <div
                                    key={notif.id}
                                    onClick={() => {
                                        if (isUnread) handleMarkAsRead(notif.id);
                                        if (notif.url) router.visit(notif.url);
                                    }}
                                    style={{
                                        padding: '16px 20px',
                                        display: 'flex',
                                        gap: '14px',
                                        borderBottom: idx < notifications.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                        cursor: notif.url || isUnread ? 'pointer' : 'default',
                                        backgroundColor: isUnread ? 'rgba(13,110,63,0.03)' : 'transparent',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(13,110,63,0.04)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isUnread ? 'rgba(13,110,63,0.03)' : 'transparent')}
                                >
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '12px',
                                        background: isUnread ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` : '#f0f0f0',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <IconComponent size={18} color={isUnread ? '#fff' : '#999'} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: isUnread ? 700 : 500,
                                                color: isUnread ? colors.primaryDark : '#555',
                                                margin: 0,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>{notif.title}</p>
                                            {isUnread && (
                                                <span style={{
                                                    width: '8px', height: '8px', borderRadius: '50%',
                                                    backgroundColor: colors.primary, flexShrink: 0,
                                                }} />
                                            )}
                                        </div>
                                        <p style={{
                                            fontSize: '13px',
                                            color: '#888',
                                            margin: '0 0 6px',
                                            lineHeight: 1.4,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}>{notif.message}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Clock size={11} color="#bbb" />
                                            <span style={{ fontSize: '11px', color: '#bbb' }}>{notif.time_ago}</span>
                                            {notif.url && <ExternalLink size={11} color="#bbb" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        padding: '48px 24px',
                        textAlign: 'center',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <Bell size={48} color="#ddd" style={{ margin: '0 auto 16px' }} />
                        <p style={{ fontWeight: 600, color: '#bbb', fontSize: '15px', margin: '0 0 4px' }}>Belum ada notifikasi</p>
                        <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>
                            Notifikasi akan muncul saat ada aktivitas penting.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
