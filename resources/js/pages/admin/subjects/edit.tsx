import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Subject = {
    id: number;
    name: string;
    category: string;
    is_active: boolean;
};

type Props = {
    subject: Subject;
};

export default function SubjectEdit({ subject }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: subject.name,
        category: subject.category || '',
        is_active: subject.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/subjects/${subject.id}`);
    };

    return (
        <AppLayout title="Edit Mapel" showBack={true} backUrl="/admin/subjects">
            <Head title="Edit Mata Pelajaran" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nama Mata Pelajaran</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="m3-input mt-2"
                                placeholder="Contoh: Matematika"
                                required
                            />
                            {errors.name && <p className="text-sm text-destructive mt-2">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Kategori</label>
                            <input
                                type="text"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="m3-input mt-2"
                                placeholder="Contoh: Wajib, Muatan Lokal, Pilihan"
                            />
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-on-surface">Status Aktif</p>
                                <p className="text-sm text-on-surface-variant">Mata pelajaran dapat digunakan</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData('is_active', !data.is_active)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${data.is_active ? 'bg-primary' : 'bg-surface-container-highest'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${data.is_active ? 'left-7' : 'left-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full m3-button-filled h-12"
                    >
                        {processing ? (
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
