import { Head, useForm, router } from '@inertiajs/react';
import { Save, Upload } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

type GalleryPost = {
    id: number;
    title: string;
    description: string | null;
    image_path: string;
    event_date: string;
    is_published: boolean;
};

type Props = {
    post: GalleryPost;
};

export default function GalleryPostEdit({ post: galleryPost }: Props) {
    const [preview, setPreview] = useState<string | null>(`/storage/${galleryPost.image_path}`);
    const { data, setData, processing, errors, progress } = useForm({
        title: galleryPost.title,
        description: galleryPost.description || '',
        image: null as File | null,
        event_date: galleryPost.event_date.split('T')[0],
        is_published: galleryPost.is_published,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(`/admin/gallery-posts/${galleryPost.id}`, {
            ...data,
            _method: 'put',
        }, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout title="Edit Dokumentasi" showBack={true} backUrl="/admin/gallery-posts">
            <Head title="Edit Dokumentasi Kegiatan" />

            <div className="m3-container py-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label>Foto Kegiatan</Label>
                        <div className="relative border-2 border-dashed rounded-2xl overflow-hidden border-muted-foreground/25 hover:border-primary/50 transition-colors">
                            {preview ? (
                                <div className="relative aspect-[16/9]">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <label className="absolute bottom-2 right-2 bg-black/60 text-white rounded-full px-3 py-1.5 text-xs hover:bg-black/80 cursor-pointer flex items-center gap-1">
                                        <Upload className="w-3 h-3" />
                                        Ganti
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <Upload className="w-7 h-7 text-primary" />
                                    </div>
                                    <p className="text-sm font-medium">Klik untuk upload foto</p>
                                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG, atau WebP (maks. 10MB)</p>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                        {progress && (
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                        )}
                        {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Foto *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: Kegiatan Belajar Mengaji"
                            className={errors.title ? 'border-destructive' : ''}
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                    </div>

                    {/* Event Date */}
                    <div className="space-y-2">
                        <Label htmlFor="event_date">Tanggal Kegiatan *</Label>
                        <Input
                            id="event_date"
                            type="date"
                            value={data.event_date}
                            onChange={(e) => setData('event_date', e.target.value)}
                            className={errors.event_date ? 'border-destructive' : ''}
                        />
                        {errors.event_date && <p className="text-sm text-destructive">{errors.event_date}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi Singkat</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Deskripsi singkat tentang kegiatan..."
                            rows={3}
                            className={errors.description ? 'border-destructive' : ''}
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                    </div>

                    {/* Is Published */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label>Publikasikan</Label>
                            <p className="text-sm text-muted-foreground">Tampilkan di halaman profil</p>
                        </div>
                        <Switch
                            checked={data.is_published}
                            onCheckedChange={(checked) => setData('is_published', checked)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="m3-button-filled w-full"
                    >
                        <Save className="w-5 h-5" />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
