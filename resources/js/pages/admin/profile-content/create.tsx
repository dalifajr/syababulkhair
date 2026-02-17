import { Head, useForm, router } from '@inertiajs/react';
import { Save, ArrowLeft, Image, Type, FileText, Upload } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useState } from 'react';

type Props = {
    sections: Record<string, string>;
    types: Record<string, string>;
};

export default function ProfileContentCreate({ sections, types }: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        section: 'hero',
        key: '',
        type: 'text',
        label: '',
        value: '',
        sort_order: 0,
        is_active: true,
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('section', data.section);
        formData.append('key', data.key);
        formData.append('type', data.type);
        formData.append('label', data.label);
        formData.append('value', data.value || '');
        formData.append('sort_order', String(data.sort_order));
        formData.append('is_active', data.is_active ? '1' : '0');
        if (data.image) {
            formData.append('image', data.image);
        }

        router.post('/admin/profile-content', formData, {
            forceFormData: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const isImageType = data.type === 'image' || data.type === 'logo';

    return (
        <AppLayout
            title="Tambah Konten Profil"
            showBack={true}
            backUrl="/admin/profile-content"
        >
            <Head title="Tambah Konten Profil" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section */}
                    <div className="m3-card-elevated space-y-4">
                        <h3 className="font-semibold text-on-surface text-lg">Informasi Konten</h3>

                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Bagian (Section)</label>
                            <select
                                value={data.section}
                                onChange={(e) => setData('section', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                {Object.entries(sections).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            {errors.section && <p className="text-destructive text-xs mt-1">{errors.section}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Tipe Konten</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                {Object.entries(types).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            {errors.type && <p className="text-destructive text-xs mt-1">{errors.type}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Label (Nama tampilan)</label>
                            <input
                                type="text"
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                                placeholder="contoh: Judul Hero, Foto Galeri 3, dll"
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                            {errors.label && <p className="text-destructive text-xs mt-1">{errors.label}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Key (Identifier unik)</label>
                            <input
                                type="text"
                                value={data.key}
                                onChange={(e) => setData('key', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                                placeholder="contoh: hero_title, gallery_3, dll"
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                            {errors.key && <p className="text-destructive text-xs mt-1">{errors.key}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Urutan</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 rounded accent-primary"
                                    />
                                    <span className="text-sm font-medium text-on-surface">Aktif</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Content Value */}
                    <div className="m3-card-elevated space-y-4">
                        <h3 className="font-semibold text-on-surface text-lg">
                            {isImageType ? 'Upload Gambar' : 'Isi Konten'}
                        </h3>

                        {isImageType ? (
                            <div>
                                <label className="block w-full cursor-pointer">
                                    <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                                        {preview ? (
                                            <div className="space-y-3">
                                                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-xl object-cover" />
                                                <p className="text-sm text-on-surface-variant">Klik untuk ganti gambar</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <Upload className="w-12 h-12 mx-auto text-muted-foreground/50" />
                                                <p className="text-sm text-on-surface-variant">
                                                    Klik untuk upload gambar<br />
                                                    <span className="text-xs">JPG, PNG, WebP (Maks. 5MB)</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                {errors.image && <p className="text-destructive text-xs mt-1">{errors.image}</p>}
                            </div>
                        ) : data.type === 'textarea' ? (
                            <div>
                                <textarea
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    rows={5}
                                    placeholder="Masukkan teks..."
                                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                />
                                {errors.value && <p className="text-destructive text-xs mt-1">{errors.value}</p>}
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    placeholder="Masukkan teks..."
                                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                                {errors.value && <p className="text-destructive text-xs mt-1">{errors.value}</p>}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="flex-1 px-6 py-3 rounded-xl text-sm font-semibold bg-muted text-on-surface transition-all"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
                            style={{ backgroundColor: '#0d6e3f' }}
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
