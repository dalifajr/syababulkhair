import { Head, Link, router } from '@inertiajs/react';
import {
    Plus, Edit, Trash2, Eye, EyeOff, Image, Type, FileText, Globe,
    Search, Filter, Award
} from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

type ProfileContent = {
    id: number;
    section: string;
    key: string;
    type: string;
    label: string;
    value: string | null;
    sort_order: number;
    is_active: boolean;
};

type Props = {
    contents: ProfileContent[];
    sections: Record<string, string>;
    types: Record<string, string>;
    filters: {
        section: string | null;
        q: string | null;
    };
};

const typeIcons: Record<string, React.ReactNode> = {
    text: <Type className="w-5 h-5" />,
    textarea: <FileText className="w-5 h-5" />,
    image: <Image className="w-5 h-5" />,
    logo: <Award className="w-5 h-5" />,
};

const sectionColors: Record<string, string> = {
    hero: 'bg-emerald-500/10 text-emerald-600',
    about: 'bg-blue-500/10 text-blue-600',
    visi_misi: 'bg-purple-500/10 text-purple-600',
    programs: 'bg-amber-500/10 text-amber-600',
    gallery: 'bg-pink-500/10 text-pink-600',
    location: 'bg-teal-500/10 text-teal-600',
    contact: 'bg-orange-500/10 text-orange-600',
    footer: 'bg-gray-500/10 text-gray-600',
};

export default function ProfileContentIndex({ contents, sections, types, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [selectedSection, setSelectedSection] = useState(filters.section || '');

    const handleDelete = (id: number, label: string) => {
        if (confirm(`Hapus konten "${label}"? Aksi ini tidak bisa dibatalkan.`)) {
            router.delete(`/admin/profile-content/${id}`);
        }
    };

    const handleToggleActive = (id: number) => {
        router.post(`/admin/profile-content/${id}/toggle-active`);
    };

    const handleSearch = () => {
        router.get('/admin/profile-content', {
            q: searchQuery || undefined,
            section: selectedSection || undefined,
        }, { preserveState: true });
    };

    const handleFilterSection = (section: string) => {
        setSelectedSection(section);
        router.get('/admin/profile-content', {
            q: searchQuery || undefined,
            section: section || undefined,
        }, { preserveState: true });
    };

    // Group contents by section
    const grouped = contents.reduce((acc, item) => {
        if (!acc[item.section]) acc[item.section] = [];
        acc[item.section].push(item);
        return acc;
    }, {} as Record<string, ProfileContent[]>);

    return (
        <AppLayout
            title="Kelola Profil Web"
            showBack={true}
            backUrl="/dashboard"
            showFab={true}
            fabIcon={<Plus className="w-6 h-6" />}
            fabHref="/admin/profile-content/create"
        >
            <Head title="Kelola Profil Web" />

            <div className="m3-container py-6 space-y-6">
                {/* Header Card */}
                <div className="m3-card-elevated" style={{ background: 'linear-gradient(135deg, rgba(13,110,63,0.08) 0%, rgba(200,169,81,0.08) 100%)' }}>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0d6e3f, #15a060)' }}>
                            <Globe className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-on-surface">Kelola Profil Yayasan</h2>
                            <p className="text-sm text-on-surface-variant">
                                Kelola teks, foto, logo dan elemen pada halaman profil yayasan
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="m3-card-elevated text-center">
                        <p className="text-2xl font-semibold" style={{ color: '#0d6e3f' }}>{contents.length}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Total Item</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <p className="text-2xl font-semibold text-blue-600">{contents.filter(c => c.type === 'image' || c.type === 'logo').length}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Gambar</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <p className="text-2xl font-semibold text-purple-600">{contents.filter(c => c.type === 'text' || c.type === 'textarea').length}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Teks</p>
                    </div>
                    <div className="m3-card-elevated text-center">
                        <p className="text-2xl font-semibold text-green-600">{contents.filter(c => c.is_active).length}</p>
                        <p className="text-xs text-on-surface-variant mt-1">Aktif</p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="m3-card-elevated space-y-3">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Cari konten..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                            style={{ backgroundColor: '#0d6e3f' }}
                        >
                            Cari
                        </button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        <button
                            onClick={() => handleFilterSection('')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${!selectedSection ? 'text-white' : 'bg-muted/50 text-muted-foreground'}`}
                            style={!selectedSection ? { backgroundColor: '#0d6e3f' } : {}}
                        >
                            Semua
                        </button>
                        {Object.entries(sections).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => handleFilterSection(key)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedSection === key ? 'text-white' : 'bg-muted/50 text-muted-foreground'}`}
                                style={selectedSection === key ? { backgroundColor: '#0d6e3f' } : {}}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="/admin/profile-content/create"
                        className="m3-button-filled w-full"
                        style={{ backgroundColor: '#0d6e3f' }}
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Konten Baru
                    </Link>
                </div>

                {/* Content grouped by section */}
                {Object.entries(grouped).map(([section, items]) => (
                    <div key={section} className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${sectionColors[section] || 'bg-gray-100 text-gray-600'}`}>
                                {sections[section] || section}
                            </div>
                            <span className="text-xs text-muted-foreground">{items.length} item</span>
                        </div>

                        <div className="m3-card-elevated p-0 overflow-hidden">
                            <div className="divide-y divide-border">
                                {items.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="m3-list-item animate-m3-fade"
                                        style={{ animationDelay: `${idx * 30}ms`, opacity: item.is_active ? 1 : 0.5 }}
                                    >
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${sectionColors[item.section] || 'bg-gray-100'}`}>
                                            {typeIcons[item.type] || <Type className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-on-surface truncate">
                                                {item.label}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant={item.is_active ? 'default' : 'secondary'}>
                                                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                                <Badge variant="outline">
                                                    {types[item.type] || item.type}
                                                </Badge>
                                                {(item.type === 'text' || item.type === 'textarea') && item.value && (
                                                    <span className="text-xs text-on-surface-variant truncate max-w-[120px]">
                                                        {item.value.substring(0, 40)}...
                                                    </span>
                                                )}
                                            </div>
                                            {(item.type === 'image' || item.type === 'logo') && item.value && (
                                                <div className="mt-2">
                                                    <img
                                                        src={item.value}
                                                        alt={item.label}
                                                        className="h-12 w-auto rounded-lg object-cover border border-border/50"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleToggleActive(item.id)}
                                                className="p-2 rounded-full hover:bg-muted transition-colors"
                                                title={item.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                            >
                                                {item.is_active ? (
                                                    <EyeOff className="w-4 h-4 text-gray-500" />
                                                ) : (
                                                    <Eye className="w-4 h-4 text-green-500" />
                                                )}
                                            </button>
                                            <Link
                                                href={`/admin/profile-content/${item.id}/edit`}
                                                className="p-2 rounded-full hover:bg-muted transition-colors"
                                            >
                                                <Edit className="w-4 h-4 text-primary" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id, item.label)}
                                                className="p-2 rounded-full hover:bg-muted transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {contents.length === 0 && (
                    <div className="m3-card-elevated p-8 text-center">
                        <Globe className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-on-surface-variant">Belum ada konten profil</p>
                        <Link href="/admin/profile-content/create" className="m3-button-tonal mt-4">
                            <Plus className="w-4 h-4" />
                            Tambah Konten Pertama
                        </Link>
                    </div>
                )}

                {/* Preview Link */}
                <div className="m3-card-elevated">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-on-surface">Lihat Hasil</p>
                            <p className="text-sm text-on-surface-variant">Pratinjau halaman profil yayasan</p>
                        </div>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                            style={{ backgroundColor: '#0d6e3f' }}
                        >
                            <Eye className="w-4 h-4 inline mr-2" />
                            Buka Profil
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
