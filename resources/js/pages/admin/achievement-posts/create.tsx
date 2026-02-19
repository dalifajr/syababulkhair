import { Head, useForm } from '@inertiajs/react';
import { Save, Upload } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function AchievementPostCreate() {
    const [preview, setPreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        event_date: new Date().toISOString().split('T')[0],
        is_published: true,
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
        post('/admin/achievement-posts', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout title="Tambah Prestasi" showBack={true} backUrl="/admin/achievement-posts">
            <Head title="Tambah Prestasi Membanggakan" />

            <div className="m3-container py-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label>Foto Prestasi *</Label>
                        <div
                            className={`relative border-2 border-dashed rounded-2xl overflow-hidden transition-colors ${errors.image ? 'border-destructive' : 'border-muted-foreground/25 hover:border-primary/50'
                                }`}
                        >
                            {preview ? (
                                <div className="relative aspect-[16/9]">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            setData('image', null);
                                        }}
                                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-black/80"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                                        <Upload className="w-7 h-7 text-amber-600" />
                                    </div>
                                    <p className="text-sm font-medium">Klik untuk upload foto</p>
                                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG, atau WebP (maks. 10MB)</p>
                                    <p className="text-xs text-muted-foreground">Gambar akan dikompresi otomatis</p>
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
                                    className="bg-amber-500 h-2 rounded-full transition-all"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                        )}
                        {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Prestasi *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: Khatam Hafalan 1 Juz Al-Qur'an"
                            className={errors.title ? 'border-destructive' : ''}
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                    </div>

                    {/* Event Date */}
                    <div className="space-y-2">
                        <Label htmlFor="event_date">Tanggal Prestasi *</Label>
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
                        <Label htmlFor="description">Deskripsi Prestasi</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Deskripsi tentang prestasi yang diraih, nama-nama santri yang berprestasi, dll."
                            rows={4}
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
                        {processing ? 'Mengupload...' : 'Simpan Prestasi'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
