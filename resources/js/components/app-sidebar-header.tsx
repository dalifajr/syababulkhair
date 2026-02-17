import { Menu } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { toggleSidebar } = useSidebar();
    const title = breadcrumbs.length
        ? breadcrumbs[breadcrumbs.length - 1]?.title
        : 'Dashboard';

    return (
        <header className="sticky top-0 z-30 shrink-0 border-b border-sidebar-border/60 bg-surface-container-high/90 backdrop-blur supports-[backdrop-filter]:bg-surface-container-high/70">
            <div className="flex h-14 items-center gap-3 px-4 md:h-16 md:px-4 group-has-data-[collapsible=icon]/sidebar-wrapper:md:h-12">
                {/* Mobile: Top Navbar + All Menu */}
                <div className="flex w-full items-center gap-3 md:hidden">
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
                        {breadcrumbs.length > 1 && (
                            <div className="truncate text-xs text-on-surface-variant">
                                {breadcrumbs
                                    .slice(0, -1)
                                    .map((b) => b.title)
                                    .join(' • ')}
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop: Sidebar + Breadcrumbs */}
                <div className="hidden items-center gap-2 md:flex">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
        </header>
    );
}
