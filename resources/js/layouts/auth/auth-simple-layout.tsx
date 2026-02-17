import { Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background p-6 md:p-10">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="animate-m3-gradient absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/15 via-tertiary/10 to-transparent blur-3xl" />
                <div className="animate-m3-gradient absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-tertiary/15 via-primary/10 to-transparent blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                <div className="m3-card-elevated flex flex-col gap-8 p-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-3 font-medium transition-transform hover:scale-105"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
                                <GraduationCap className="h-9 w-9 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">
                                E-Rapor
                            </span>
                        </Link>

                        <div className="mt-2 space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} E-Rapor. Sistem Penilaian
                    Digital.
                </p>
            </div>
        </div>
    );
}
