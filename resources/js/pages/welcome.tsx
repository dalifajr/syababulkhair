import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    ChartBar,
    CheckCircle,
    GraduationCap,
    LayoutDashboard,
    Moon,
    Shield,
    Sun,
    Users,
    ClipboardList,
    Calendar,
    Award,
    ArrowRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { home, login, register } from '@/routes';

type Props = {
    canRegister: boolean;
};

export default function Welcome({ canRegister }: Props) {
    const [isDark, setIsDark] = useState(() =>
        typeof document !== 'undefined'
            ? document.documentElement.classList.contains('dark')
            : false,
    );
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setIsDark(!isDark);
    };

    const features = [
        {
            icon: Users,
            title: 'Manajemen Siswa',
            description:
                'Kelola data siswa dengan mudah, termasuk biodata, kelas, dan riwayat akademik.',
            color: 'bg-primary/10 text-primary',
        },
        {
            icon: ClipboardList,
            title: 'Penilaian Digital',
            description:
                'Input nilai dengan cepat dan akurat. Mendukung berbagai jenis penilaian.',
            color: 'bg-tertiary/10 text-tertiary',
        },
        {
            icon: Calendar,
            title: 'Tahun Akademik',
            description:
                'Atur tahun ajaran dan semester dengan fleksibel sesuai kurikulum.',
            color: 'bg-chart-3/10 text-chart-3',
        },
        {
            icon: Award,
            title: 'E-Rapor Otomatis',
            description:
                'Generate rapor siswa secara otomatis dengan template profesional.',
            color: 'bg-chart-4/10 text-chart-4',
        },
        {
            icon: ChartBar,
            title: 'Analisis Data',
            description:
                'Visualisasi data nilai siswa untuk pengambilan keputusan yang lebih baik.',
            color: 'bg-chart-5/10 text-chart-5',
        },
        {
            icon: Shield,
            title: 'Keamanan Terjamin',
            description:
                'Data terenkripsi dan aman dengan autentikasi dua faktor.',
            color: 'bg-chart-2/10 text-chart-2',
        },
    ];

    const stats = [
        { value: '1000+', label: 'Siswa Terdaftar' },
        { value: '50+', label: 'Guru Aktif' },
        { value: '100%', label: 'Digital' },
        { value: '24/7', label: 'Akses Online' },
    ];

    return (
        <>
            <Head title="E-Rapor - Sistem Penilaian Digital">
                <meta
                    name="description"
                    content="Sistem informasi penilaian dan rapor digital untuk sekolah modern. Kelola nilai siswa dengan mudah dan efisien."
                />
            </Head>

            <div className="min-h-screen bg-background">
                {/* Navigation */}
                <nav
                    className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                        ? 'm3-glass border-b border-border/50 shadow-sm'
                        : 'bg-transparent'
                        }`}
                >
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link
                            href={home()}
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                                <GraduationCap className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-semibold text-foreground">
                                E-Rapor
                            </span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleDarkMode}
                                className="rounded-xl"
                            >
                                {isDark ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </Button>
                            <Link href={login()}>
                                <Button
                                    variant="ghost"
                                    className="rounded-xl px-6"
                                >
                                    Masuk
                                </Button>
                            </Link>
                            {canRegister && (
                                <Link href={register()}>
                                    <Button className="rounded-xl px-6">
                                        Daftar
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
                    {/* Background gradient */}
                    <div className="absolute inset-0 -z-10">
                        <div className="animate-m3-gradient absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 via-tertiary/10 to-transparent blur-3xl" />
                        <div className="animate-m3-gradient absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-tertiary/20 via-primary/10 to-transparent blur-3xl" />
                    </div>

                    <div className="mx-auto max-w-7xl">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div className="animate-m3-slide-up space-y-8">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Sistem Penilaian Modern</span>
                                </div>

                                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                                    Kelola Penilaian Siswa dengan{' '}
                                    <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
                                        Mudah & Efisien
                                    </span>
                                </h1>

                                <p className="max-w-xl text-lg text-muted-foreground">
                                    Platform E-Rapor digital yang membantu guru
                                    dan sekolah mengelola nilai siswa, membuat
                                    laporan akademik, dan menganalisis
                                    perkembangan belajar dengan lebih baik.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link href={login()}>
                                        <Button
                                            size="lg"
                                            className="group rounded-2xl px-8 py-6 text-base"
                                        >
                                            <LayoutDashboard className="mr-2 h-5 w-5" />
                                            Mulai Sekarang
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="rounded-2xl px-8 py-6 text-base"
                                    >
                                        <BookOpen className="mr-2 h-5 w-5" />
                                        Pelajari Lebih Lanjut
                                    </Button>
                                </div>
                            </div>

                            {/* Hero illustration */}
                            <div className="animate-m3-float relative hidden lg:block">
                                <div className="relative mx-auto h-[500px] w-[400px]">
                                    {/* Card 1 */}
                                    <div className="m3-card-elevated absolute left-0 top-0 w-64 animate-m3-fade-in">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Total Siswa
                                                </p>
                                                <p className="text-2xl font-bold">
                                                    1,234
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div
                                        className="m3-card-elevated absolute right-0 top-24 w-56 animate-m3-fade-in"
                                        style={{ animationDelay: '0.1s' }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10">
                                                <Award className="h-6 w-6 text-tertiary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Nilai Rata-rata
                                                </p>
                                                <p className="text-2xl font-bold">
                                                    85.7
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 3 */}
                                    <div
                                        className="m3-card-elevated absolute bottom-32 left-8 w-72 animate-m3-fade-in"
                                        style={{ animationDelay: '0.2s' }}
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">
                                                    Matematika
                                                </span>
                                                <span className="text-primary">
                                                    92
                                                </span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full rounded-full bg-primary"
                                                    style={{ width: '92%' }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">
                                                    B. Indonesia
                                                </span>
                                                <span className="text-tertiary">
                                                    88
                                                </span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full rounded-full bg-tertiary"
                                                    style={{ width: '88%' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 4 */}
                                    <div
                                        className="m3-card-elevated absolute bottom-0 right-4 w-48 animate-m3-fade-in"
                                        style={{ animationDelay: '0.3s' }}
                                    >
                                        <div className="text-center">
                                            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                            </div>
                                            <p className="font-medium">
                                                Rapor Selesai
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                245 siswa
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-y border-border/50 bg-surface-container py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="animate-m3-fade-in text-center"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <p className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-4xl font-bold text-transparent">
                                        {stat.value}
                                    </p>
                                    <p className="mt-2 text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                Fitur Lengkap untuk Sekolah Modern
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Semua yang Anda butuhkan untuk mengelola
                                penilaian dan rapor siswa dalam satu platform
                                terintegrasi.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="m3-card group animate-m3-fade-in cursor-pointer"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <div
                                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 text-center text-primary-foreground md:p-20">
                            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                            <div className="relative z-10">
                                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                    Siap Memulai?
                                </h2>
                                <p className="mx-auto mb-8 max-w-xl text-lg opacity-90">
                                    Bergabung dengan ratusan sekolah yang sudah
                                    menggunakan E-Rapor untuk mengelola
                                    penilaian siswa dengan lebih efisien.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href={login()}>
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            className="rounded-2xl px-8 py-6 text-base"
                                        >
                                            Masuk ke Dashboard
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-border/50 bg-surface-container py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <span className="text-xl font-semibold">
                                    E-Rapor
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                &copy; {new Date().getFullYear()} E-Rapor.
                                Dibuat dengan ❤️ untuk pendidikan Indonesia.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
