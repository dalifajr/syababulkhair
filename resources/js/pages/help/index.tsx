import { Head, Link } from '@inertiajs/react';
import {
    Mail,
    MessageCircle,
    Users,
    ClipboardList,
    Award,
    ChevronRight,
    ExternalLink,
    Sparkles,
} from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

export default function HelpIndex() {
    const faqs = [
        {
            icon: Users,
            q: 'Bagaimana cara menambah data siswa?',
            a: 'Buka menu Data Siswa, lalu klik tombol + atau gunakan fitur Import untuk menambahkan banyak siswa sekaligus dari file CSV.',
        },
        {
            icon: ClipboardList,
            q: 'Bagaimana cara input nilai?',
            a: 'Buka menu Input Nilai, pilih mata pelajaran dan kelas, buat penilaian baru jika belum ada, lalu masukkan nilai untuk setiap siswa.',
        },
        {
            icon: Award,
            q: 'Bagaimana cara mencetak rapor?',
            a: 'Buka menu Rapor Siswa, cari siswa yang diinginkan, lalu lihat detail nilai per mata pelajaran.',
        },
    ];

    const guides = [
        { title: 'Panduan Data Siswa', href: '/admin/students', icon: Users },
        { title: 'Panduan Input Nilai', href: '/assessments', icon: ClipboardList },
        { title: 'Panduan Cetak Rapor', href: '/reports/students', icon: Award },
    ];

    return (
        <AppLayout title="Bantuan" showBack={true} backUrl="/dashboard">
            <Head title="Bantuan" />

            <div className="m3-container py-6 space-y-6">
                {/* Header Card */}
                <div className="m3-card-elevated bg-gradient-to-br from-primary/5 to-tertiary/5">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-[20px] bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-on-surface">Pusat Bantuan</h1>
                            <p className="text-on-surface-variant mt-1">E-Rapor v1.0</p>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <section className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h2 className="font-medium text-on-surface">Panduan Cepat</h2>
                    </div>
                    <div className="divide-y divide-border">
                        {guides.map((guide) => (
                            <Link
                                key={guide.href}
                                href={guide.href}
                                className="m3-list-item group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center 
                                              group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <guide.icon className="w-5 h-5" />
                                </div>
                                <span className="flex-1 font-medium text-on-surface ml-1">{guide.title}</span>
                                <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="space-y-3">
                    <h2 className="text-sm font-medium text-on-surface-variant px-1">PERTANYAAN UMUM</h2>
                    <div className="space-y-3 m3-stagger">
                        {faqs.map((faq, index) => (
                            <div key={index} className="m3-card-elevated">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-tertiary-container flex items-center justify-center flex-shrink-0">
                                        <faq.icon className="w-5 h-5 text-on-tertiary-container" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-on-surface">{faq.q}</p>
                                        <p className="text-sm text-on-surface-variant mt-2">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h2 className="font-medium text-on-surface">Hubungi Kami</h2>
                    </div>
                    <a href="mailto:support@e-rapor.id" className="m3-list-item group">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <span className="flex-1 text-on-surface ml-1">support@e-rapor.id</span>
                        <ExternalLink className="w-4 h-4 text-on-surface-variant" />
                    </a>
                    <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m3-list-item group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-chart-3" />
                        </div>
                        <span className="flex-1 text-on-surface ml-1">WhatsApp Support</span>
                        <ExternalLink className="w-4 h-4 text-on-surface-variant" />
                    </a>
                </section>

                {/* Footer */}
                <p className="text-center text-sm text-on-surface-variant">
                    © 2026 E-Rapor. Dibuat dengan ❤️ untuk pendidikan Indonesia.
                </p>
            </div>
        </AppLayout>
    );
}
