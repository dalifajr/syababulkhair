import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Camera, Calendar, Eye, EyeOff } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type GalleryPost = {
    id: number;
    title: string;
    description: string | null;
    image_path: string;
    event_date: string;
    is_published: boolean;
    created_by_user_id: number;
    created_by?: { name: string };
    created_at: string;
};

type Props = {
    posts: {
        data: GalleryPost[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        q: string | null;
    };
};

export default function GalleryPostIndex({ posts, filters }: Props) {
    const [search, setSearch] = useState(filters.q || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/gallery-posts', { q: search }, { preserveState: true });
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Hapus dokumentasi "${title}"?`)) {
            router.delete(`/admin/gallery-posts/${id}`);
        }
    };

    return (
        <AppLayout title="Dokumentasi Kegiatan" showBack={true} backUrl="/dashboard">
            <Head title="Dokumentasi Kegiatan" />

            <div className="m3-container py-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Dokumentasi Kegiatan</h1>
                        <p className="text-sm text-muted-foreground">Kelola foto dokumentasi kegiatan</p>
                    </div>
                    <Link
                        href="/admin/gallery-posts/create"
                        className="m3-button-filled inline-flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah
                    </Link>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari dokumentasi..."
                            className="pl-10"
                        />
                    </div>
                </form>

                {/* Grid */}
                {posts.data.length === 0 ? (
                    <div className="text-center py-12 rounded-xl border border-dashed">
                        <Camera className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">Belum ada dokumentasi kegiatan</p>
                        <Link
                            href="/admin/gallery-posts/create"
                            className="m3-button-tonal inline-flex items-center gap-2 mt-4"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Dokumentasi
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="group rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={`/storage/${post.image_path}`}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {!post.is_published && (
                                        <div className="absolute top-2 left-2 bg-yellow-500/90 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                                            <EyeOff className="w-3 h-3" />
                                            Draft
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-2">
                                    <h3 className="font-semibold text-sm line-clamp-2">{post.title}</h3>
                                    {post.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">{post.description}</p>
                                    )}
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.event_date).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2 border-t">
                                        <Link
                                            href={`/admin/gallery-posts/${post.id}/edit`}
                                            className="flex-1 m3-button-tonal text-xs inline-flex items-center justify-center gap-1"
                                        >
                                            <Edit2 className="w-3 h-3" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id, post.title)}
                                            className="flex-1 m3-button-tonal text-xs inline-flex items-center justify-center gap-1 text-destructive"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {posts.links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-3 py-2 rounded-lg text-sm ${link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted hover:bg-muted/80'
                                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
