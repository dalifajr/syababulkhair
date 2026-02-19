import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    BookOpen,
    MapPin,
    Phone,
    Mail,
    Heart,
    Star,
    Users,
    Target,
    Eye,
    ChevronDown,
    ArrowRight,
    GraduationCap,
    Moon,
    Sun,
    Menu,
    X,
    Quote,
    Award,
    Trophy,
} from 'lucide-react';

type ProfileContents = Record<string, Record<string, string>>;

type Props = {
    canRegister: boolean;
    profileContents?: ProfileContents;
};

export default function ProfilYayasan({ canRegister, profileContents = {} }: Props) {
    // Helper to get content value with fallback
    const getContent = (section: string, key: string, fallback: string = ''): string => {
        return profileContents?.[section]?.[key] || fallback;
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(() =>
        typeof document !== 'undefined'
            ? document.documentElement.classList.contains('dark')
            : false,
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const sections = ['beranda', 'tentang', 'visi-misi', 'galeri', 'lokasi', 'kontak'];
            const reversed = [...sections].reverse();
            for (const section of reversed) {
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setIsDark(!isDark);
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { id: 'beranda', label: 'Beranda' },
        { id: 'tentang', label: 'Tentang' },
        { id: 'visi-misi', label: 'Visi & Misi' },
        { id: 'galeri', label: 'Galeri' },
        { id: 'lokasi', label: 'Lokasi' },
        { id: 'kontak', label: 'Kontak' },
    ];

    const programs = [
        {
            icon: BookOpen,
            title: getContent('programs', 'program_1_title', "Tahsin Al-Qur'an"),
            description: getContent('programs', 'program_1_desc', "Program perbaikan bacaan Al-Qur'an dengan metode yang mudah dan menyenangkan."),
        },
        {
            icon: Star,
            title: getContent('programs', 'program_2_title', "Tahfidz Al-Qur'an"),
            description: getContent('programs', 'program_2_desc', "Program hafalan Al-Qur'an dengan target dan bimbingan khusus dari ustadz/ustadzah."),
        },
        {
            icon: Heart,
            title: getContent('programs', 'program_3_title', "Pembinaan Akhlak"),
            description: getContent('programs', 'program_3_desc', "Pembinaan karakter dan akhlak mulia berbasis nilai-nilai Islam bagi anak-anak."),
        },
        {
            icon: Users,
            title: getContent('programs', 'program_4_title', "Pengajian Rutin"),
            description: getContent('programs', 'program_4_desc', "Kegiatan pengajian untuk masyarakat dalam rangka memperkuat ukhuwah islamiyah."),
        },
    ];

    return (
        <>
            <Head title="Rumah Qur'an Syababul Khair - Rumah Qur'an">
                <meta
                    name="description"
                    content="Rumah Qur'an Syababul Khair adalah lembaga pendidikan Al-Qur'an yang berkomitmen untuk membentuk generasi Qur'ani yang berakhlak mulia."
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    .yp-page { font-family: 'Inter', sans-serif; }
                    .yp-page h1, .yp-page h2, .yp-page h3 { font-family: 'Playfair Display', serif; }

                    @keyframes yp-fadeInUp {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes yp-fadeInLeft {
                        from { opacity: 0; transform: translateX(-40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes yp-fadeInRight {
                        from { opacity: 0; transform: translateX(40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes yp-scaleIn {
                        from { opacity: 0; transform: scale(0.8); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    @keyframes yp-pulseGlow {
                        0%, 100% { box-shadow: 0 0 20px rgba(13, 110, 63, 0.3); }
                        50% { box-shadow: 0 0 40px rgba(13, 110, 63, 0.6); }
                    }
                    @keyframes yp-bounceDown {
                        0%, 100% { transform: translateY(0) translateX(-50%); }
                        50% { transform: translateY(8px) translateX(-50%); }
                    }
                    @keyframes yp-slideDown {
                        from { opacity: 0; max-height: 0; }
                        to { opacity: 1; max-height: 500px; }
                    }

                    .yp-fadeInUp { animation: yp-fadeInUp 0.8s ease-out both; }
                    .yp-fadeInLeft { animation: yp-fadeInLeft 0.8s ease-out both; }
                    .yp-fadeInRight { animation: yp-fadeInRight 0.8s ease-out both; }
                    .yp-scaleIn { animation: yp-scaleIn 0.6s ease-out both; }
                    .yp-pulseGlow { animation: yp-pulseGlow 3s ease-in-out infinite; }
                    .yp-bounceDown { animation: yp-bounceDown 2s ease-in-out infinite; }

                    .yp-glass { backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); }
                    .yp-hero-overlay { background: linear-gradient(135deg, rgba(13,110,63,0.92) 0%, rgba(10,88,50,0.88) 40%, rgba(15,26,20,0.85) 100%); }
                    .yp-pattern { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a951' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
                    .yp-card-hover { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                    .yp-card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(13,110,63,0.2); }
                    .yp-photo img { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
                    .yp-photo:hover img { transform: scale(1.08); }
                    .yp-divider { height: 4px; background: linear-gradient(90deg, transparent, #c8a951, #0d6e3f, #c8a951, transparent); }

                    /* ===== Responsive Navbar ===== */
                    .yp-desktop-nav { display: none; }
                    .yp-mobile-menu-btn { display: block; }
                    .yp-mobile-dropdown { animation: yp-slideDown 0.3s ease-out both; overflow: hidden; }

                    @media (min-width: 1024px) {
                        .yp-desktop-nav { display: flex !important; }
                        .yp-mobile-menu-btn { display: none !important; }
                        .yp-mobile-dropdown { display: none !important; }
                    }

                    /* ===== Responsive Location Grid ===== */
                    .yp-location-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                    @media (min-width: 768px) {
                        .yp-location-grid {
                            grid-template-columns: 3fr 2fr;
                            gap: 32px;
                        }
                    }

                    /* ===== Responsive Footer ===== */
                    .yp-footer-inner {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 16px;
                        text-align: center;
                    }
                    @media (min-width: 768px) {
                        .yp-footer-inner {
                            flex-direction: row;
                            justify-content: space-between;
                            text-align: left;
                        }
                    }

                    /* ===== Responsive Map iframe ===== */
                    .yp-map-frame { width: 100%; height: 300px; border: 0; display: block; }
                    @media (min-width: 768px) { .yp-map-frame { height: 450px; } }

                    /* ===== Responsive Gallery images ===== */
                    .yp-gallery-img { width: 100%; height: 260px; object-fit: cover; display: block; }
                    @media (min-width: 640px) { .yp-gallery-img { height: 350px; } }
                    @media (min-width: 768px) { .yp-gallery-img { height: 400px; } }

                    /* ===== Responsive About image ===== */
                    .yp-about-img { width: 100%; height: 300px; object-fit: cover; display: block; }
                    @media (min-width: 640px) { .yp-about-img { height: 380px; } }
                    @media (min-width: 768px) { .yp-about-img { height: 450px; } }

                    /* ===== Responsive Sections padding ===== */
                    .yp-section { padding: 60px 0; }
                    @media (min-width: 768px) { .yp-section { padding: 80px 0; } }

                    /* ===== Responsive CTA buttons ===== */
                    .yp-cta-buttons {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 12px;
                    }
                    @media (min-width: 640px) {
                        .yp-cta-buttons {
                            flex-direction: row;
                            justify-content: center;
                            gap: 16px;
                        }
                    }

                    /* ===== Sambutan Pimpinan ===== */
                    .yp-sambutan-grid {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 40px;
                    }
                    @media (min-width: 1024px) {
                        .yp-sambutan-grid {
                            flex-direction: row;
                            align-items: flex-start;
                            gap: 56px;
                        }
                    }
                    .yp-sambutan-photo-wrapper {
                        flex-shrink: 0;
                        position: relative;
                        width: 220px;
                        height: 220px;
                    }
                    @media (min-width: 640px) {
                        .yp-sambutan-photo-wrapper {
                            width: 280px;
                            height: 280px;
                        }
                    }
                    @media (min-width: 1024px) {
                        .yp-sambutan-photo-wrapper {
                            width: 320px;
                            height: 320px;
                        }
                    }
                    .yp-sambutan-photo-ring {
                        position: absolute;
                        inset: -8px;
                        border-radius: 50%;
                        border: 3px solid rgba(200,169,81,0.4);
                        animation: yp-pulseGlow 3s ease-in-out infinite;
                    }
                    .yp-sambutan-photo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                        object-position: top center;
                        border: 4px solid rgba(200,169,81,0.5);
                        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    }
                    @keyframes yp-floatQuote {
                        0%, 100% { transform: translateY(0) rotate(-8deg); }
                        50% { transform: translateY(-6px) rotate(-8deg); }
                    }
                    .yp-quote-icon {
                        animation: yp-floatQuote 4s ease-in-out infinite;
                    }

                    /* ===== Prestasi Section ===== */
                    .yp-prestasi-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 32px;
                        align-items: center;
                    }
                    @media (min-width: 768px) {
                        .yp-prestasi-grid {
                            grid-template-columns: 1fr 1fr;
                            gap: 48px;
                        }
                    }
                    .yp-prestasi-img {
                        width: 100%;
                        height: 320px;
                        object-fit: cover;
                        display: block;
                    }
                    @media (min-width: 640px) { .yp-prestasi-img { height: 400px; } }
                    @media (min-width: 768px) { .yp-prestasi-img { height: 450px; } }
                    @keyframes yp-shimmer {
                        0% { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }
                    .yp-trophy-shimmer {
                        background: linear-gradient(90deg, #c8a951 0%, #e8d88a 25%, #c8a951 50%, #e8d88a 75%, #c8a951 100%);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        animation: yp-shimmer 3s linear infinite;
                    }
                `}</style>
            </Head>

            <div className="yp-page" style={{ minHeight: '100vh', backgroundColor: '#faf8f0' }}>
                {/* Navigation */}
                <nav
                    className="yp-glass"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        transition: 'all 0.5s',
                        backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
                        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.08)' : 'none',
                    }}
                >
                    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
                        <button
                            onClick={() => scrollToSection('beranda')}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <img
                                src="/images/yayasan-logo.png"
                                alt="Logo Rumah Qur'an Syababul Khair"
                                style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.2, color: isScrolled ? '#0d6e3f' : '#fff', margin: 0 }}>
                                    RQ Syababul
                                </p>
                                <p style={{ fontSize: '12px', color: isScrolled ? '#a88a3a' : '#e0c76e', margin: 0 }}>
                                    Khair
                                </p>
                            </div>
                        </button>

                        {/* Desktop Nav - hidden on mobile via CSS */}
                        <div className="yp-desktop-nav" style={{ alignItems: 'center', gap: '4px' }}>
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '24px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        backgroundColor: activeSection === item.id
                                            ? (isScrolled ? '#0d6e3f' : 'rgba(255,255,255,0.2)')
                                            : 'transparent',
                                        color: activeSection === item.id
                                            ? '#fff'
                                            : (isScrolled ? '#555' : 'rgba(255,255,255,0.8)'),
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                                onClick={toggleDarkMode}
                                style={{
                                    padding: '8px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: 'none',
                                    color: isScrolled ? '#555' : '#fff',
                                }}
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <Link
                                href="/login"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 20px',
                                    borderRadius: '24px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s',
                                    backgroundColor: isScrolled ? '#0d6e3f' : '#c8a951',
                                    color: isScrolled ? '#fff' : '#0a5832',
                                    boxShadow: isScrolled ? '0 4px 20px rgba(13,110,63,0.25)' : 'none',
                                }}
                            >
                                <GraduationCap size={16} />
                                E-Rapor
                            </Link>

                            {/* Mobile Menu Button - visible on mobile via CSS */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="yp-mobile-menu-btn"
                                style={{
                                    padding: '8px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: 'none',
                                    color: isScrolled ? '#555' : '#fff',
                                }}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="yp-mobile-dropdown yp-glass" style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderTop: '1px solid rgba(0,0,0,0.1)', padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '14px 16px',
                                        borderRadius: '16px',
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginBottom: '2px',
                                        transition: 'all 0.2s',
                                        backgroundColor: activeSection === item.id ? '#0d6e3f' : 'transparent',
                                        color: activeSection === item.id ? '#fff' : '#333',
                                    }}
                                >
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: activeSection === item.id ? '#c8a951' : 'rgba(0,0,0,0.15)',
                                        flexShrink: 0,
                                    }} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <section id="beranda" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <img
                            src={getContent('hero', 'hero_background', '/images/yayasan-foto-1.jpg')}
                            alt="Kegiatan Rumah Qur'an Syababul Khair"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div className="yp-hero-overlay" style={{ position: 'absolute', inset: 0 }} />
                        <div className="yp-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
                    </div>

                    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '960px', margin: '0 auto', padding: '0 16px' }}>
                        {/* Logo */}
                        <div className="yp-scaleIn" style={{ marginBottom: '32px' }}>
                            <div className="yp-pulseGlow" style={{ display: 'inline-block', borderRadius: '50%' }}>
                                <img
                                    src={getContent('hero', 'hero_logo', '/images/yayasan-logo.png')}
                                    alt="Logo Rumah Qur'an Syababul Khair"
                                    className="h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36"
                                    style={{
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '4px solid rgba(200,169,81,0.5)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="yp-fadeInUp">
                            <p style={{ color: '#e0c76e', fontSize: '14px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
                                {getContent('hero', 'hero_subtitle', "Rumah Qur'an")}
                            </p>
                            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 700, color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.3)', marginBottom: '24px', lineHeight: 1.1 }}>
                                {getContent('hero', 'hero_title', "Rumah Qur'an Syababul Khair")}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                                {getContent('hero', 'hero_description', "Membentuk Generasi Qur'ani yang Berakhlak Mulia, Berwawasan Luas, dan Bermanfaat bagi Umat")}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="yp-fadeInUp yp-cta-buttons" style={{ animationDelay: '0.3s' }}>
                            <button
                                onClick={() => scrollToSection('tentang')}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '14px 28px',
                                    fontSize: '15px',
                                    backgroundColor: '#c8a951',
                                    color: '#0a5832',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    transition: 'all 0.3s',
                                    width: 'fit-content',
                                }}
                            >
                                Jelajahi Profil
                                <ArrowRight size={20} />
                            </button>
                            <Link
                                href="/login"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px 28px',
                                    fontSize: '15px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    color: '#fff',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s',
                                    backgroundColor: 'transparent',
                                    width: 'fit-content',
                                }}
                            >
                                <GraduationCap size={20} />
                                Akses E-Rapor
                            </Link>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="yp-bounceDown" style={{ position: 'absolute', bottom: '32px', left: '50%' }}>
                            <ChevronDown size={32} color="rgba(255,255,255,0.5)" />
                        </div>
                    </div>
                </section>

                {/* Section Divider */}
                <div className="yp-divider" />

                {/* About Section */}
                <section id="tentang" className="yp-section" style={{ position: 'relative', padding: undefined }} >
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <div className="yp-fadeInLeft">
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(13,110,63,0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px' }}>
                                    <BookOpen size={16} color="#0d6e3f" />
                                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#0d6e3f' }}>Tentang Kami</span>
                                </div>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#0a5832', marginBottom: '24px', lineHeight: 1.2 }}>
                                    {getContent('about', 'about_title', "Rumah Qur'an Syababul Khair")}
                                </h2>
                                <p style={{ color: '#555', fontSize: '18px', lineHeight: 1.8, marginBottom: '24px' }}>
                                    {getContent('about', 'about_text_1', "Rumah Qur'an Syababul Khair adalah lembaga pendidikan Al-Qur'an yang berdedikasi dalam membina dan mendidik generasi muda untuk mencintai dan memahami Al-Qur'an.")}
                                </p>
                                <p style={{ color: '#555', fontSize: '18px', lineHeight: 1.8, marginBottom: '32px' }}>
                                    {getContent('about', 'about_text_2', "Dengan semangat kebersamaan dan keikhlasan, kami mengajak seluruh elemen masyarakat untuk bersinergi dalam mencetak generasi Qur'ani yang berakhlak mulia dan berwawasan luas.")}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div style={{ textAlign: 'center', padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(13,110,63,0.05)' }}>
                                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#0d6e3f', margin: 0 }}>{getContent('about', 'about_stat_santri', '50+')}</p>
                                        <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Santri Aktif</p>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(13,110,63,0.05)' }}>
                                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#0d6e3f', margin: 0 }}>{getContent('about', 'about_stat_pengajar', '5+')}</p>
                                        <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Pengajar</p>
                                    </div>
                                </div>
                            </div>

                            <div className="yp-fadeInRight">
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', inset: '-16px', background: 'linear-gradient(135deg, rgba(13,110,63,0.2), rgba(200,169,81,0.2))', borderRadius: '24px', filter: 'blur(30px)' }} />
                                    <div className="yp-photo" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '2px solid #c8a951', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                                        <img
                                            src={getContent('about', 'about_image', '/images/yayasan-foto-2.jpg')}
                                            alt="Kegiatan santri di Rumah Qur'an Syababul Khair"
                                            className="yp-about-img"
                                        />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '24px' }}>
                                            <p style={{ color: '#fff', fontWeight: 500, fontSize: '18px', margin: 0 }}>Kegiatan Santri</p>
                                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '4px 0 0' }}>Rumah Qur'an Syababul Khair</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sambutan Pimpinan Section */}
                <section className="yp-section" style={{ backgroundColor: '#0a5832', position: 'relative', overflow: 'hidden' }}>
                    <div className="yp-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
                    {/* Decorative gradient orbs */}
                    <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,81,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,110,63,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
                        {/* Section Header */}
                        <div className="yp-fadeInUp" style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px' }}>
                                <Quote size={16} color="#c8a951" />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#c8a951' }}>Sambutan Pimpinan</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
                                Kata Sambutan
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '640px', margin: '0 auto', fontSize: '18px' }}>
                                Pesan dari Pimpinan Rumah Qur'an Syababul Khair
                            </p>
                        </div>

                        {/* Content */}
                        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                            <div className="yp-sambutan-grid">
                                {/* Photo Column */}
                                <div className="yp-fadeInLeft" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className="yp-sambutan-photo-wrapper">
                                        <div className="yp-sambutan-photo-ring" />
                                        <img
                                            src={getContent('sambutan', 'sambutan_photo', '/images/ustadz-iqbal.png')}
                                            alt="Ustadz Aa Muhammad Iqbal, S.Pd."
                                            className="yp-sambutan-photo"
                                        />
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                        <p style={{ color: '#fff', fontWeight: 700, fontSize: '18px', margin: 0, lineHeight: 1.3 }}>
                                            {getContent('sambutan', 'sambutan_nama', 'Ustadz Aa Muhammad Iqbal, S.Pd.')}
                                        </p>
                                        <p style={{ color: '#c8a951', fontSize: '14px', fontWeight: 500, marginTop: '4px' }}>
                                            {getContent('sambutan', 'sambutan_jabatan', "Pimpinan Rumah Qur'an Syababul Khair")}
                                        </p>
                                    </div>
                                </div>

                                {/* Quote Column */}
                                <div className="yp-fadeInRight" style={{ flex: 1 }}>
                                    <div style={{
                                        backgroundColor: 'rgba(255,255,255,0.06)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '24px',
                                        padding: '36px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        position: 'relative',
                                    }}>
                                        {/* Decorative quote icon */}
                                        <div className="yp-quote-icon" style={{ position: 'absolute', top: '-16px', left: '24px' }}>
                                            <div style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #c8a951, #e0c76e)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 8px 24px rgba(200,169,81,0.3)',
                                            }}>
                                                <Quote size={24} color="#0a5832" />
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '16px' }}>
                                            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: 1.9, marginBottom: '16px' }}>
                                                {getContent('sambutan', 'sambutan_text_1', "Assalamu'alaikum Warahmatullahi Wabarakatuh.")}
                                            </p>
                                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.9, marginBottom: '16px' }}>
                                                {getContent('sambutan', 'sambutan_text_2', "Segala puji bagi Allah SWT yang telah memberikan rahmat dan karunia-Nya. Alhamdulillah, Rumah Qur'an Syababul Khair hadir di tengah-tengah masyarakat dengan semangat untuk mendidik generasi muda dalam mencintai, memahami, dan mengamalkan Al-Qur'an dalam kehidupan sehari-hari.")}
                                            </p>
                                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.9, marginBottom: '16px' }}>
                                                {getContent('sambutan', 'sambutan_text_3', "Kami berkomitmen untuk membentuk generasi Qur'ani yang tidak hanya mampu membaca dan menghafal Al-Qur'an, tetapi juga memiliki akhlak mulia dan kecintaan yang mendalam terhadap ilmu agama. Dengan dukungan para pengajar yang berdedikasi dan lingkungan belajar yang kondusif, kami optimis dapat mewujudkan visi tersebut.")}
                                            </p>
                                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.9, marginBottom: '0' }}>
                                                {getContent('sambutan', 'sambutan_text_4', "Kami mengajak seluruh masyarakat untuk bersama-sama mendukung dan berpartisipasi dalam kegiatan yang kami selenggarakan. Semoga Allah SWT senantiasa memberikan keberkahan dan kemudahan dalam setiap langkah perjuangan kita. Wassalamu'alaikum Warahmatullahi Wabarakatuh.")}
                                            </p>
                                        </div>

                                        {/* Signature line */}
                                        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                            <p style={{ color: '#c8a951', fontStyle: 'italic', fontSize: '14px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                                                {getContent('sambutan', 'sambutan_ttd', 'Billahi Taufiq Wal Hidayah')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Section */}
                <section id="visi-misi" className="yp-section" style={{ backgroundColor: '#0a5832', position: 'relative', overflow: 'hidden' }}>
                    <div className="yp-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
                        <div className="yp-fadeInUp" style={{ textAlign: 'center', marginBottom: '64px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px' }}>
                                <Target size={16} color="#c8a951" />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#c8a951' }}>Visi & Misi</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
                                Visi & Misi Kami
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '640px', margin: '0 auto', fontSize: '18px' }}>
                                Landasan dan arah perjuangan Rumah Qur'an Syababul Khair
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Visi */}
                            <div className="yp-fadeInLeft yp-card-hover" style={{ animationDelay: '0.2s' }}>
                                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div style={{ height: '56px', width: '56px', borderRadius: '16px', backgroundColor: 'rgba(200,169,81,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Eye size={28} color="#c8a951" />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>Visi</h3>
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.8 }}>
                                        {getContent('visi_misi', 'visi_text', "Menjadi lembaga pendidikan Al-Qur'an yang unggul dalam membentuk generasi Qur'ani yang berakhlak mulia, berwawasan luas, dan mampu memberikan kontribusi positif bagi masyarakat dan bangsa berdasarkan nilai-nilai Islam.")}
                                    </p>
                                </div>
                            </div>

                            {/* Misi */}
                            <div className="yp-fadeInRight yp-card-hover" style={{ animationDelay: '0.3s' }}>
                                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div style={{ height: '56px', width: '56px', borderRadius: '16px', backgroundColor: 'rgba(200,169,81,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Target size={28} color="#c8a951" />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>Misi</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {[
                                            getContent('visi_misi', 'misi_1', "Menyelenggarakan pendidikan Al-Qur'an yang berkualitas dan terstruktur."),
                                            getContent('visi_misi', 'misi_2', "Menanamkan nilai-nilai akhlak mulia dalam setiap aspek pembelajaran."),
                                            getContent('visi_misi', 'misi_3', "Mengembangkan potensi anak didik sesuai dengan bakat dan minatnya."),
                                            getContent('visi_misi', 'misi_4', "Membangun sinergi dengan masyarakat dalam dakwah dan pendidikan Islam."),
                                            getContent('visi_misi', 'misi_5', "Menyediakan sarana dan prasarana yang mendukung kegiatan belajar mengajar."),
                                        ].map((misi, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <div style={{ height: '24px', width: '24px', minWidth: '24px', borderRadius: '50%', backgroundColor: 'rgba(200,169,81,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                                                    <span style={{ color: '#c8a951', fontSize: '12px', fontWeight: 700 }}>{i + 1}</span>
                                                </div>
                                                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7 }}>{misi}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="yp-section">
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                        <div className="yp-fadeInUp" style={{ textAlign: 'center', marginBottom: '64px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(13,110,63,0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px' }}>
                                <Star size={16} color="#0d6e3f" />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#0d6e3f' }}>Program Kami</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#0a5832', marginBottom: '16px' }}>
                                Program Unggulan
                            </h2>
                            <p style={{ color: '#888', maxWidth: '640px', margin: '0 auto', fontSize: '18px' }}>
                                Berbagai program pendidikan dan kegiatan yang kami selenggarakan
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {programs.map((program, index) => {
                                const IconComponent = program.icon;
                                return (
                                    <div
                                        key={program.title}
                                        className="yp-fadeInUp yp-card-hover"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            backgroundColor: '#fff',
                                            borderRadius: '24px',
                                            padding: '32px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                            border: '1px solid rgba(0,0,0,0.06)',
                                        }}
                                    >
                                        <div style={{
                                            height: '56px',
                                            width: '56px',
                                            borderRadius: '16px',
                                            background: 'linear-gradient(135deg, #0d6e3f, #15a060)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '24px',
                                            boxShadow: '0 8px 20px rgba(13,110,63,0.25)',
                                        }}>
                                            <IconComponent size={28} color="#fff" />
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a5832', marginBottom: '12px' }}>
                                            {program.title}
                                        </h3>
                                        <p style={{ color: '#888', lineHeight: 1.7, margin: 0 }}>
                                            {program.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Prestasi Section */}
                <section className="yp-section" style={{ backgroundColor: '#f5f3eb', position: 'relative', overflow: 'hidden' }}>
                    {/* Decorative background elements */}
                    <div style={{ position: 'absolute', top: '40px', right: '40px', opacity: 0.06, pointerEvents: 'none' }}>
                        <Trophy size={200} color="#0d6e3f" />
                    </div>
                    <div style={{ position: 'absolute', bottom: '40px', left: '40px', opacity: 0.04, pointerEvents: 'none' }}>
                        <Award size={160} color="#c8a951" />
                    </div>

                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
                        {/* Section Header */}
                        <div className="yp-fadeInUp" style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(13,110,63,0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px' }}>
                                <Trophy size={16} color="#0d6e3f" />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#0d6e3f' }}>Prestasi Santri</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#0a5832', marginBottom: '16px' }}>
                                Prestasi Membanggakan
                            </h2>
                            <p style={{ color: '#888', maxWidth: '640px', margin: '0 auto', fontSize: '18px' }}>
                                Pencapaian santri-santri terbaik Rumah Qur'an Syababul Khair
                            </p>
                        </div>

                        {/* Content Grid */}
                        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                            <div className="yp-prestasi-grid">
                                {/* Photo Column */}
                                <div className="yp-fadeInLeft">
                                    <div className="yp-photo" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '2px solid rgba(200,169,81,0.3)', position: 'relative' }}>
                                        <img
                                            src="/images/prestasi-khatam.jpg"
                                            alt="Santri yang telah khatam hafalan 1 Juz Al-Qur'an"
                                            className="yp-prestasi-img"
                                        />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)', padding: '24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Award size={20} color="#c8a951" />
                                                <p style={{ color: '#c8a951', fontWeight: 600, fontSize: '14px', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Khatam 1 Juz</p>
                                            </div>
                                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '4px 0 0' }}>Rumah Qur'an Syababul Khair</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Names Column */}
                                <div className="yp-fadeInRight" style={{ animationDelay: '0.2s' }}>
                                    <div style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '24px',
                                        padding: '32px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                    }}>
                                        {/* Achievement Title */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                borderRadius: '16px',
                                                background: 'linear-gradient(135deg, #c8a951, #e0c76e)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 8px 24px rgba(200,169,81,0.25)',
                                                flexShrink: 0,
                                            }}>
                                                <Trophy size={28} color="#0a5832" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a5832', margin: 0, lineHeight: 1.3 }}>
                                                    Khatam Hafalan 1 Juz
                                                </h3>
                                                <p style={{ color: '#888', fontSize: '14px', margin: '2px 0 0' }}>Al-Qur&apos;an &mdash; 5 Santri Berprestasi</p>
                                            </div>
                                        </div>

                                        {/* Student List */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {[
                                                'Ikhsan Salfath Rambe',
                                                'Anisa Nur Ayu',
                                                'Asyfa Cordelia Darussalam',
                                                'Muhammad Azzam Fahlevi',
                                                'Shyren Putri Rendrano',
                                            ].map((name, i) => (
                                                <div
                                                    key={i}
                                                    className="yp-fadeInUp"
                                                    style={{
                                                        animationDelay: `${0.3 + i * 0.08}s`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px',
                                                        padding: '14px 16px',
                                                        borderRadius: '16px',
                                                        backgroundColor: i === 0 ? 'rgba(13,110,63,0.06)' : 'rgba(0,0,0,0.02)',
                                                        border: i === 0 ? '1px solid rgba(13,110,63,0.12)' : '1px solid transparent',
                                                        transition: 'all 0.3s',
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        minWidth: '36px',
                                                        borderRadius: '12px',
                                                        background: i === 0
                                                            ? 'linear-gradient(135deg, #c8a951, #e0c76e)'
                                                            : 'linear-gradient(135deg, #0d6e3f, #15a060)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: i === 0 ? '0 4px 12px rgba(200,169,81,0.3)' : '0 4px 12px rgba(13,110,63,0.2)',
                                                    }}>
                                                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>{i + 1}</span>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <p style={{ margin: 0, fontWeight: 600, color: '#0a5832', fontSize: '15px' }}>{name}</p>
                                                    </div>
                                                    <Award size={16} color={i === 0 ? '#c8a951' : '#0d6e3f'} style={{ opacity: 0.6 }} />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom note */}
                                        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
                                            <p style={{ color: '#888', fontSize: '13px', fontStyle: 'italic', margin: 0 }}>
                                                Semoga menjadi inspirasi dan motivasi bagi santri lainnya 🌟
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="galeri" className="yp-section" style={{ backgroundColor: '#f5f3eb' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                        <div className="yp-fadeInUp" style={{ textAlign: 'center', marginBottom: '64px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(13,110,63,0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px' }}>
                                <Heart size={16} color="#0d6e3f" />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#0d6e3f' }}>Galeri Kegiatan</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#0a5832', marginBottom: '16px' }}>
                                Dokumentasi Kegiatan
                            </h2>
                            <p style={{ color: '#888', maxWidth: '640px', margin: '0 auto', fontSize: '18px' }}>
                                Momen-momen berharga dari kegiatan Rumah Qur'an Syababul Khair
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="yp-fadeInLeft">
                                <div className="yp-photo" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative' }}>
                                    <img
                                        src={getContent('gallery', 'gallery_1', '/images/yayasan-foto-1.jpg')}
                                        alt="Kegiatan bersama santri dan KKN"
                                        className="yp-gallery-img"
                                    />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '24px' }}>
                                        <p style={{ color: '#fff', fontWeight: 600, fontSize: '18px', margin: 0 }}>{getContent('gallery', 'gallery_1_title', 'KKN Angkatan 84 - Sungai Pinang')}</p>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '4px 0 0' }}>{getContent('gallery', 'gallery_1_desc', 'Kegiatan bersama santri dan mahasiswa KKN')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="yp-fadeInRight" style={{ animationDelay: '0.2s' }}>
                                <div className="yp-photo" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative' }}>
                                    <img
                                        src={getContent('gallery', 'gallery_2', '/images/yayasan-foto-2.jpg')}
                                        alt="Kegiatan malam yang penuh kebersamaan"
                                        className="yp-gallery-img"
                                    />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '24px' }}>
                                        <p style={{ color: '#fff', fontWeight: 600, fontSize: '18px', margin: 0 }}>{getContent('gallery', 'gallery_2_title', 'Kebersamaan Santri')}</p>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '4px 0 0' }}>{getContent('gallery', 'gallery_2_desc', 'Momen kebersamaan yang penuh cinta dan kasih sayang')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location Section */}
                <section id="lokasi" className="yp-section">
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                        <div className="yp-fadeInUp" style={{ textAlign: 'center', marginBottom: '64px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(13,110,63,0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px' }}>
                                <MapPin size={16} color="#0d6e3f" />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#0d6e3f' }}>Lokasi Kami</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#0a5832', marginBottom: '16px' }}>
                                Temukan Kami
                            </h2>
                            <p style={{ color: '#888', maxWidth: '640px', margin: '0 auto', fontSize: '18px' }}>
                                Kunjungi Rumah Qur'an Syababul Khair di lokasi berikut
                            </p>
                        </div>

                        <div className="yp-location-grid">
                            <div className="yp-fadeInLeft">
                                <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '2px solid rgba(0,0,0,0.08)' }}>
                                    <iframe
                                        src={getContent('location', 'location_maps_embed', "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.5!2d104.8272009!3d-3.0559892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9dc9729d1b81%3A0x482ca8c781d80889!2sRumah%20Qur'an%20Syababul%20Khair!5e0!3m2!1sid!2sid!4v1707600000000!5m2!1sid!2sid")}
                                        className="yp-map-frame"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lokasi Rumah Qur'an Syababul Khair"
                                    />
                                </div>
                            </div>

                            <div className="yp-fadeInRight" style={{ animationDelay: '0.2s' }}>
                                <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a5832', marginBottom: '24px' }}>
                                        Informasi Lokasi
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                            <div style={{ height: '48px', width: '48px', minWidth: '48px', borderRadius: '16px', backgroundColor: 'rgba(13,110,63,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <MapPin size={24} color="#0d6e3f" />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600, color: '#0a5832', margin: 0 }}>Alamat</p>
                                                <p style={{ color: '#888', marginTop: '4px' }}>{getContent('location', 'location_address', 'Sungai Pinang, Sumatera Selatan, Indonesia')}</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                            <div style={{ height: '48px', width: '48px', minWidth: '48px', borderRadius: '16px', backgroundColor: 'rgba(13,110,63,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Phone size={24} color="#0d6e3f" />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600, color: '#0a5832', margin: 0 }}>Kontak</p>
                                                <p style={{ color: '#888', marginTop: '4px' }}>{getContent('contact', 'contact_phone', 'Hubungi kami untuk informasi lebih lanjut')}</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                            <div style={{ height: '48px', width: '48px', minWidth: '48px', borderRadius: '16px', backgroundColor: 'rgba(13,110,63,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Mail size={24} color="#0d6e3f" />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600, color: '#0a5832', margin: 0 }}>Email</p>
                                                <p style={{ color: '#888', marginTop: '4px' }}>{getContent('contact', 'contact_email', 'kknangkatanbaunserithe@gmail.com')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href={getContent('location', 'location_maps_link', 'https://maps.app.goo.gl/SPPXu4w6z4gHTQsXA')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            width: '100%',
                                            backgroundColor: '#0d6e3f',
                                            color: '#fff',
                                            padding: '16px 24px',
                                            borderRadius: '16px',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            marginTop: '32px',
                                            boxShadow: '0 8px 20px rgba(13,110,63,0.25)',
                                            transition: 'all 0.3s',
                                        }}
                                    >
                                        <MapPin size={20} />
                                        Buka di Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="kontak" className="yp-section" style={{ background: 'linear-gradient(135deg, #0a5832 0%, #0d6e3f 50%, #0a5832 100%)', position: 'relative', overflow: 'hidden' }}>
                    <div className="yp-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
                    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
                        <div className="yp-fadeInUp">
                            <div style={{ marginBottom: '32px' }}>
                                <img
                                    src="/images/yayasan-logo.png"
                                    alt="Logo"
                                    style={{ height: '80px', width: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(200,169,81,0.5)', margin: '0 auto', display: 'block' }}
                                />
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
                                {getContent('contact', 'contact_cta_title', 'Mari Bergabung Bersama Kami')}
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                                {getContent('contact', 'contact_cta_desc', "Daftarkan putra-putri Anda untuk belajar Al-Qur'an dan program keislaman lainnya di Rumah Qur'an Syababul Khair. Bersama kita wujudkan generasi Qur'ani.")}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                                <a
                                    href="https://maps.app.goo.gl/SPPXu4w6z4gHTQsXA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#c8a951',
                                        color: '#0a5832',
                                        padding: '16px 32px',
                                        borderRadius: '50px',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        textDecoration: 'none',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    <MapPin size={20} />
                                    Kunjungi Kami
                                </a>
                                <Link
                                    href="/login"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        color: '#fff',
                                        padding: '14px 32px',
                                        borderRadius: '50px',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    <GraduationCap size={20} />
                                    Akses E-Rapor
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ backgroundColor: '#0a5832', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '32px 0' }}>
                    <div className="yp-footer-inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                                src="/images/yayasan-logo.png"
                                alt="Logo"
                                style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '14px' }}>
                                Rumah Qur'an Syababul Khair
                            </span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0, textAlign: 'center' }}>
                            &copy; {new Date().getFullYear()} Rumah Qur'an Syababul Khair. Dibuat dengan ❤️ untuk pendidikan Al-Qur'an.
                        </p>
                        <Link
                            href="/login"
                            style={{ color: '#c8a951', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                            <GraduationCap size={16} />
                            E-Rapor
                        </Link>
                    </div>
                </footer>
            </div>
        </>
    );
}

