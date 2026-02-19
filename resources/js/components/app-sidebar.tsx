import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    BookText,
    ClipboardList,
    Award,
    Calendar,
    Building2,
    GraduationCap,
    Settings,
    HelpCircle,
    UserCog,
    BookOpen,
    Megaphone,
    FileText,
    CalendarDays,
    ArrowUpCircle,
    MessageSquare,
    Globe,
    Bell,
    Trophy,
    BarChart3,
    Database,
    Target,
    NotebookPen,
    Camera,
    Medal,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';

// Menu utama untuk semua user
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Notifikasi',
        href: '/notifications',
        icon: Bell,
    },
];

// Menu guru
const teacherNavItems: NavItem[] = [
    {
        title: 'Input Nilai',
        href: '/assessments',
        icon: ClipboardList,
    },
    {
        title: 'Kelas Saya',
        href: '/my-classes',
        icon: BookOpen,
    },
];

// Menu admin - Data Master
const adminMasterItems: NavItem[] = [
    {
        title: 'Data Siswa',
        href: '/admin/students',
        icon: Users,
    },
    {
        title: 'Mata Pelajaran',
        href: '/admin/subjects',
        icon: BookText,
    },
    {
        title: 'Kelas',
        href: '/admin/class-groups',
        icon: GraduationCap,
    },
    {
        title: 'Guru & Staff',
        href: '/admin/teachers',
        icon: UserCog,
    },
];

// Menu admin - Akademik
const adminAcademicItems: NavItem[] = [
    {
        title: 'Tahun Ajaran',
        href: '/admin/academic-years',
        icon: Calendar,
    },
    {
        title: 'Semester',
        href: '/admin/terms',
        icon: Calendar,
    },
    {
        title: 'Penugasan Guru',
        href: '/admin/teaching-assignments',
        icon: ClipboardList,
    },
    {
        title: 'Jadwal Pelajaran',
        href: '/admin/schedules',
        icon: CalendarDays,
    },
    {
        title: 'Ekstrakurikuler',
        href: '/admin/extracurriculars',
        icon: Trophy,
    },
    {
        title: 'KKM',
        href: '/admin/kkm',
        icon: Target,
    },
];

// Menu admin - Rapor & Catatan
const adminRaporItems: NavItem[] = [
    {
        title: 'Rapor Siswa',
        href: '/admin/report-cards',
        icon: FileText,
    },
    {
        title: 'Catatan Wali Kelas',
        href: '/admin/homeroom-notes',
        icon: MessageSquare,
    },
    {
        title: 'Kenaikan Kelas',
        href: '/admin/class-promotions',
        icon: ArrowUpCircle,
    },
    {
        title: 'Catatan Perilaku',
        href: '/admin/behavioral-notes',
        icon: NotebookPen,
    },
];

// Menu admin - Komunikasi
const adminCommunicationItems: NavItem[] = [
    {
        title: 'Pengumuman',
        href: '/admin/announcements',
        icon: Megaphone,
    },
];

// Menu admin - Profil Website
const adminProfilItems: NavItem[] = [
    {
        title: 'Kelola Profil Web',
        href: '/admin/profile-content',
        icon: Globe,
    },
    {
        title: 'Dokumentasi Kegiatan',
        href: '/admin/gallery-posts',
        icon: Camera,
    },
    {
        title: 'Prestasi Membanggakan',
        href: '/admin/achievement-posts',
        icon: Medal,
    },
];

// Menu admin - Laporan
const adminReportItems: NavItem[] = [
    {
        title: 'Rapor Siswa',
        href: '/reports/students',
        icon: Award,
    },
    {
        title: 'Rekap Nilai',
        href: '/reports/scores',
        icon: ClipboardList,
    },
    {
        title: 'Rekap Kehadiran',
        href: '/reports/attendance',
        icon: BarChart3,
    },
];

// Menu pengaturan
const settingsNavItems: NavItem[] = [
    {
        title: 'Pengaturan Sekolah',
        href: '/admin/settings',
        icon: Building2,
    },
    {
        title: 'Backup & Restore',
        href: '/admin/backup',
        icon: Database,
    },
    {
        title: 'Pengaturan Akun',
        href: '/settings/profile',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Bantuan',
        href: '/help',
        icon: HelpCircle,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user.role === 'admin';
    const isTeacher = auth.user.role === 'teacher';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sidebar-primary">
                                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div className="ml-2 flex flex-col">
                                    <span className="text-base font-bold">
                                        E-Rapor
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Sistem Penilaian
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-0">
                {/* Menu Utama */}
                <NavMain items={mainNavItems} />

                {/* Menu Guru */}
                {(isTeacher || isAdmin) && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                            Penilaian
                        </SidebarGroupLabel>
                        <NavMain items={teacherNavItems} />
                    </SidebarGroup>
                )}

                {/* Menu Admin - Data Master */}
                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                            Data Master
                        </SidebarGroupLabel>
                        <NavMain items={adminMasterItems} />
                    </SidebarGroup>
                )}

                {/* Menu Admin - Akademik */}
                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                            Akademik
                        </SidebarGroupLabel>
                        <NavMain items={adminAcademicItems} />
                    </SidebarGroup>
                )}

                {/* Menu Admin - Rapor & Catatan */}
                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                            Rapor & Catatan
                        </SidebarGroupLabel>
                        <NavMain items={adminRaporItems} />
                    </SidebarGroup>
                )}

                {/* Menu Admin - Komunikasi */}
                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                            Komunikasi
                        </SidebarGroupLabel>
                        <NavMain items={adminCommunicationItems} />
                    </SidebarGroup>
                )}

                {/* Menu Admin - Laporan */}
                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                            Laporan
                        </SidebarGroupLabel>
                        <NavMain items={adminReportItems} />
                    </SidebarGroup>
                )}

                {/* Menu Admin - Profil Website */}
                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                            Profil Website
                        </SidebarGroupLabel>
                        <NavMain items={adminProfilItems} />
                    </SidebarGroup>
                )}

                {/* Pengaturan */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                        Pengaturan
                    </SidebarGroupLabel>
                    <NavMain
                        items={
                            isAdmin
                                ? settingsNavItems
                                : settingsNavItems.filter(
                                    (item) => item.title === 'Pengaturan Akun'
                                )
                        }
                    />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
