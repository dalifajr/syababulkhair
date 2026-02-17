import { Head, useForm, router } from '@inertiajs/react';
import { Save, Upload } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
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
    content: ProfileContent;
    sections: Record<string, string>;
    types: Record<string, string>;
};

export default function ProfileContentEdit({ content, sections, types }: Props) {
    const [preview, setPreview] = useState<string | null>(content.value || null);
    const isImageType = content.type === 'image' || content.type === 'logo';

    const { data, setData, processing, errors } = useForm({
        section: content.section,
        key: content.key,
        type: content.type,
        label: content.label,
        value: content.value || '',
        sort_order: content.sort_order,
        is_active: content.is_active,
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
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

        router.post(`/admin/profile-content/${content.id}`, formData, {
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

    return (
        <AppLayout
            title="Edit Konten Profil"
            showBack={true}
            backUrl="/admin/profile-content"
        >
            <Head title={`Edit: ${content.label}`} />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Info Card */}
                    <div className="m3-card-elevated space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-on-surface text-lg">Edit: {content.label}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                {sections[content.section]}
                            </span>
                        </div>

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
                            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Label</label>
                            <input
                                type="text"
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                            {errors.label && <p className="text-destructive text-xs mt-1">{errors.label}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Key</label>
                            <input
                                type="text"
                                value={data.key}
                                onChange={(e) => setData('key', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
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
                            {isImageType ? 'Gambar' : 'Isi Konten'}
                        </h3>

                        {isImageType ? (
                            <div>
                                {/* Current image */}
                                {preview && (
                                    <div className="mb-4">
                                        <p className="text-xs text-on-surface-variant mb-2">Gambar saat ini:</p>
                                        <img
                                            src={preview}
                                            alt={content.label}
                                            className="max-h-48 rounded-xl object-cover border border-border/50"
                                        />
                                    </div>
                                )}
                                <label className="block w-full cursor-pointer">
                                    <div className="border-2 border-dashed border-border/50 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                                        <Upload className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
                                        <p className="text-sm text-on-surface-variant">
                                            Klik untuk upload gambar baru<br />
                                            <span className="text-xs">JPG, PNG, WebP (Maks. 5MB)</span>
                                        </p>
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
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
