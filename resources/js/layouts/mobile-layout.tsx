import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Bell, Menu } from 'lucide-react';
import type { MouseEventHandler, ReactNode } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import type { SharedData } from '@/types';

type Props = {
    children: ReactNode;
    title: string;
    showBack?: boolean;
    backUrl?: string;
    showFab?: boolean;
    fabIcon?: ReactNode;
    fabLabel?: string;
    fabHref?: string;
    onFabClick?: MouseEventHandler<HTMLButtonElement>;
};

function TopBar({
    title,
    showBack,
    backUrl
}: {
    title: string;
    showBack?: boolean;
    backUrl?: string;
}) {
    const { toggleSidebar } = useSidebar();
    const { notificationCount } = usePage<SharedData>().props;

    const handleBack = () => {
        if (backUrl) {
            window.location.href = backUrl;
        } else {
            window.history.back();
        }
    };

    const NotifBell = () => (
        <Link href="/notifications" className="relative">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-10 rounded-full"
                aria-label="Notifikasi"
            >
                <Bell className="size-5" />
                {notificationCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                )}
            </Button>
        </Link>
    );

    return (
        <header className="sticky top-0 z-30 shrink-0 border-b border-sidebar-border/60 bg-surface-container-high/90 backdrop-blur supports-[backdrop-filter]:bg-surface-container-high/70">
            <div className="flex h-14 items-center gap-3 px-4 md:h-16 md:px-4">
                {/* Mobile: Navbar + All Menu */}
                <div className="flex w-full items-center gap-3 md:hidden">
                    {showBack && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleBack}
                            className="size-10 rounded-full"
                            aria-label="Kembali"
                        >
                            <ArrowLeft className="size-5" />
                        </Button>
                    )}

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={toggleSidebar}
                        className="h-10 rounded-full px-4"
                    >
                        <Menu className="size-4" />
                        <span className="font-medium">All Menu</span>
                    </Button>

                    <div className="min-w-0 flex-1">
                        <div className="truncate text-base font-semibold text-on-surface">
                            {title}
                        </div>
                    </div>

                    <NotifBell />
                </div>

                {/* Desktop: Sidebar + Title */}
                <div className="hidden w-full items-center gap-2 md:flex">
                    <SidebarTrigger className="-ml-1" />
                    <div className="min-w-0 flex-1 truncate text-sm font-medium text-on-surface">
                        {title}
                    </div>
                    <NotifBell />
                </div>
            </div>
        </header>
    );
}

// FAB Component
function FAB({
    icon,
    label,
    href,
    onClick
}: {
    icon?: ReactNode;
    label?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    const content = label ? (
        <div className="m3-fab-extended">
            {icon}
            <span className="font-medium">{label}</span>
        </div>
    ) : (
        <div className="m3-fab">
            {icon}
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return (
        <button type="button" onClick={onClick}>
            {content}
        </button>
    );
}

// Main Layout Component
export default function AppLayout({
    children,
    title,
    showBack = false,
    backUrl,
    showFab,
    fabIcon,
    fabLabel,
    fabHref,
    onFabClick,
}: Props) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <TopBar title={title} showBack={showBack} backUrl={backUrl} />
                <div
                    className={`animate-m3-fade pb-safe ${showFab ? 'pb-24' : ''}`}
                >
                    {children}
                </div>

                {showFab && (
                    <FAB
                        icon={fabIcon}
                        label={fabLabel}
                        href={fabHref}
                        onClick={onFabClick}
                    />
                )}
            </AppContent>
        </AppShell>
    );
}

export { TopBar, FAB };
