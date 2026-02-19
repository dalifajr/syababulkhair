import { Head, Link, usePage } from '@inertiajs/react';
import {
    Users,
    BookText,
    ClipboardList,
    Award,
    TrendingUp,
    Calendar,
    ChevronRight,
    Sparkles,
    FileText,
    Megaphone,
    CalendarDays,
    Globe,
    GraduationCap,
    ArrowRight,
    BookOpen,
    Star,
    BarChart3,
    Trophy,
    Database,
} from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import type { SharedData } from '@/types';

type DashboardProps = {
    stats: {
        totalStudents: number;
        totalSubjects: number;
        totalScores: number;
        averageScore: number | null;
        studentGrowth: number;
        scoreGrowth: number;
        attendanceRate: number;
        totalExtracurriculars: number;
    };
    topSubjects: Array<{
        id: number;
        name: string;
        average: number;
        total_scores: number;
    }>;
    recentActivities: Array<{
        title: string;
        description: string;
        time: string;
        type: string;
    }>;
    academicInfo: {
        academic_year: string | null;
        term: string | null;
    };
};

// Color palette matching Yayasan profile
const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
    goldLight: '#e0c76e',
    surface: '#faf8f0',
};

// Stat Card with Yayasan-themed styling
function StatCard({
    label,
    value,
    icon: Icon,
    trend,
    variant = 0
}: {
    label: string;
    value: string | number;
    icon: React.ElementType;
    trend?: number;
    variant?: number;
}) {
    const iconStyles = [
        { background: 'linear-gradient(135deg, #0d6e3f, #15a060)', color: '#fff' },
        { background: 'linear-gradient(135deg, #c8a951, #e0c76e)', color: '#0a5832' },
        { background: 'linear-gradient(135deg, #0a5832, #0d6e3f)', color: '#c8a951' },
        { background: 'linear-gradient(135deg, #15a060, #0d6e3f)', color: '#fff' },
    ];

    const style = iconStyles[variant % iconStyles.length];

    return (
        <div
            className="animate-m3-fade"
            style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                border: '1px solid rgba(13,110,63,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: style.background,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                }}>
                    <Icon size={20} color={style.color} />
                </div>
                {trend !== undefined && trend !== 0 && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: trend > 0 ? colors.primary : '#e53e3e',
                        backgroundColor: trend > 0 ? 'rgba(13,110,63,0.08)' : 'rgba(229,62,62,0.08)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                    }}>
                        <TrendingUp size={12} style={trend < 0 ? { transform: 'rotate(180deg)' } : {}} />
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <p style={{ fontSize: '28px', fontWeight: 700, color: colors.primaryDark, margin: 0, lineHeight: 1.2 }}>{value}</p>
            <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{label}</p>
        </div>
    );
}

// Quick Action Card with Yayasan style
function QuickAction({
    icon: Icon,
    title,
    subtitle,
    href
}: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '16px 20px',
                textDecoration: 'none',
                border: '1px solid rgba(13,110,63,0.08)',
                transition: 'all 0.3s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            }}
            className="group"
        >
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(13,110,63,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                flexShrink: 0,
            }}
                className="group-hover:!bg-[#0d6e3f]"
            >
                <Icon size={22} color={colors.primary} className="group-hover:!text-white transition-colors" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '14px' }}>{title}</p>
                <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</p>
            </div>
            <ChevronRight size={18} color="#bbb" className="group-hover:translate-x-1 transition-transform" />
        </Link>
    );
}

// Activity Item with Yayasan style
function ActivityItem({
    studentName,
    subjectName,
    time,
    isStudent
}: {
    studentName: string;
    subjectName: string;
    time?: string;
    isStudent?: boolean;
}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 20px',
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: isStudent ? 'rgba(13,110,63,0.08)' : 'rgba(200,169,81,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                {isStudent ? <Users size={18} color={colors.primary} /> : <ClipboardList size={18} color={colors.gold} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subjectName}</p>
                <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{studentName}</p>
            </div>
            <span style={{ fontSize: '11px', color: '#bbb', whiteSpace: 'nowrap' }}>{time}</span>
        </div>
    );
}

export default function Dashboard() {
    const page = usePage<SharedData & DashboardProps>();
    const { stats, topSubjects, recentActivities, academicInfo } = page.props;
    const userName = page.props.auth?.user?.name?.split(' ')[0] || 'Pengguna';
    const isAdmin = page.props.auth?.user?.role === 'admin';
    const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <AppLayout title="Dashboard" showBack={false}>
            <Head title="Dashboard">
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="px-4 py-5 sm:px-5 md:px-6 max-w-[1200px] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
                {/* Welcome Card */}
                <div
                    className="animate-m3-fade"
                    style={{
                        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 60%, ${colors.primaryLight} 100%)`,
                        borderRadius: '24px',
                        padding: '28px 24px',
                        marginBottom: '24px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(13,110,63,0.25)',
                    }}
                >
                    {/* Islamic pattern overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.5,
                    }} />
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(200,169,81,0.12)', filter: 'blur(40px)' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'rgba(200,169,81,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <GraduationCap size={18} color={colors.goldLight} />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: colors.goldLight, letterSpacing: '0.05em' }}>E-RAPOR</span>
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>
                            Assalamu'alaikum, {userName}! 👋
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>{currentDate}</p>
                        {academicInfo && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '12px', width: 'fit-content' }}>
                                <Calendar size={14} color="rgba(255,255,255,0.7)" />
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                                    {academicInfo.term || 'Semester'} • {academicInfo.academic_year || 'Tahun Ajaran'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '4px' }}>RINGKASAN</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        <StatCard
                            label="Total Siswa"
                            value={stats?.totalStudents || 0}
                            icon={Users}
                            trend={stats?.studentGrowth}
                            variant={0}
                        />
                        <StatCard
                            label="Mata Pelajaran"
                            value={stats?.totalSubjects || 0}
                            icon={BookText}
                            variant={1}
                        />
                        <StatCard
                            label="Nilai Diinput"
                            value={stats?.totalScores || 0}
                            icon={ClipboardList}
                            variant={2}
                        />
                        <StatCard
                            label="Rata-rata Nilai"
                            value={stats?.averageScore ? Number(stats.averageScore).toFixed(1) : '-'}
                            icon={Award}
                            variant={3}
                        />
                        <StatCard
                            label="Tingkat Kehadiran"
                            value={stats?.attendanceRate ? `${stats.attendanceRate}%` : '-'}
                            icon={BarChart3}
                            variant={0}
                        />
                        <StatCard
                            label="Ekstrakurikuler"
                            value={stats?.totalExtracurriculars || 0}
                            icon={Trophy}
                            variant={1}
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '4px' }}>AKSI CEPAT</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <QuickAction
                            icon={Users}
                            title="Data Siswa"
                            subtitle="Kelola data siswa"
                            href="/admin/students"
                        />
                        <QuickAction
                            icon={FileText}
                            title="Rapor Siswa"
                            subtitle="Generate & cetak rapor"
                            href="/admin/report-cards"
                        />
                        <QuickAction
                            icon={Megaphone}
                            title="Pengumuman"
                            subtitle="Buat pengumuman baru"
                            href="/admin/announcements"
                        />
                        {isAdmin && (
                            <QuickAction
                                icon={Globe}
                                title="Kelola Profil Web"
                                subtitle="Edit halaman profil yayasan"
                                href="/admin/profile-content"
                            />
                        )}
                        <QuickAction
                            icon={BarChart3}
                            title="Rekap Kehadiran"
                            subtitle="Lihat analitik kehadiran"
                            href="/reports/attendance"
                        />
                        <QuickAction
                            icon={Trophy}
                            title="Ekstrakurikuler"
                            subtitle="Kelola kegiatan ekskul"
                            href="/admin/extracurriculars"
                        />
                        {isAdmin && (
                            <QuickAction
                                icon={Database}
                                title="Backup & Restore"
                                subtitle="Kelola backup database"
                                href="/admin/backup"
                            />
                        )}
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Top Subjects */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <div style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid rgba(13,110,63,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #c8a951, #e0c76e)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Star size={16} color="#0a5832" />
                            </div>
                            <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>Nilai Tertinggi per Mapel</h2>
                        </div>
                        <div>
                            {topSubjects && topSubjects.length > 0 ? (
                                topSubjects.map((subject, idx) => (
                                    <div key={subject.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                        padding: '14px 20px',
                                        borderBottom: idx < topSubjects.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                    }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(13,110,63,0.08)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <BookText size={18} color={colors.primary} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '14px' }}>{subject.name}</p>
                                            <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>{subject.total_scores} nilai</p>
                                        </div>
                                        <div style={{
                                            fontSize: '20px',
                                            fontWeight: 700,
                                            color: colors.primary,
                                            minWidth: '48px',
                                            textAlign: 'right',
                                        }}>
                                            {Number(subject.average).toFixed(1)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                    <BookText size={40} color="#ddd" style={{ margin: '0 auto 12px' }} />
                                    <p style={{ color: '#bbb', fontSize: '14px', margin: 0 }}>Belum ada data nilai</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <div style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid rgba(13,110,63,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #0d6e3f, #15a060)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Sparkles size={16} color="#fff" />
                            </div>
                            <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>Aktivitas Terbaru</h2>
                        </div>
                        <div>
                            {recentActivities && recentActivities.length > 0 ? (
                                recentActivities.slice(0, 5).map((activity, idx) => (
                                    <div key={`${activity.type}-${idx}`} style={{
                                        borderBottom: idx < Math.min(recentActivities.length, 5) - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                    }}>
                                        <ActivityItem
                                            studentName={activity.description}
                                            subjectName={activity.title}
                                            time={activity.time}
                                            isStudent={activity.type === 'student'}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                    <ClipboardList size={40} color="#ddd" style={{ margin: '0 auto 12px' }} />
                                    <p style={{ color: '#bbb', fontSize: '14px', margin: 0 }}>Belum ada aktivitas terbaru</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Link to Profile */}
                <div
                    className="animate-m3-fade"
                    style={{
                        marginTop: '24px',
                        background: 'linear-gradient(135deg, rgba(13,110,63,0.04) 0%, rgba(200,169,81,0.06) 100%)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Globe size={20} color={colors.primary} />
                        <div>
                            <p style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '14px' }}>Halaman Profil Yayasan</p>
                            <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>Lihat halaman profil publik</p>
                        </div>
                    </div>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: colors.primary,
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                        }}
                    >
                        Buka
                        <ArrowRight size={14} />
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
