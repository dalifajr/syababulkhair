import { Head, useForm, router } from '@inertiajs/react';
import { Save, Camera } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useState } from 'react';

type Student = {
    id: number;
    nis: string;
    name: string;
    gender: string;
    birth_date: string;
    status: string;
    photo: string | null;
};

type Props = {
    student: Student;
};

export default function StudentEdit({ student }: Props) {
    const { data, setData, processing, errors } = useForm<{
        nis: string;
        name: string;
        gender: string;
        birth_date: string;
        status: string;
        photo: File | null;
    }>({
        nis: student.nis,
        name: student.name,
        gender: student.gender,
        birth_date: student.birth_date || '',
        status: student.status,
        photo: null,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(
        student.photo ? `/storage/${student.photo}` : null
    );

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(`/admin/students/${student.id}`, {
            _method: 'PUT',
            ...data,
        }, { forceFormData: true });
    };

    return (
        <AppLayout title="Edit Siswa" showBack={true} backUrl="/admin/students">
            <Head title="Edit Siswa" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    {/* Photo Upload */}
                    <div className="flex justify-center">
                        <label className="relative cursor-pointer group">
                            <div className="w-28 h-28 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden ring-4 ring-surface-container-highest">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Foto siswa" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="w-8 h-8 text-on-surface-variant" />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-md group-hover:scale-110 transition-transform">
                                <Camera className="w-4 h-4" />
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </label>
                    </div>
                    {errors.photo && <p className="text-sm text-destructive text-center">{errors.photo}</p>}

                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">NIS</label>
                            <input
                                type="text"
                                value={data.nis}
                                onChange={(e) => setData('nis', e.target.value)}
                                className="m3-input mt-2"
                                placeholder="Nomor Induk Siswa"
                                required
                            />
                            {errors.nis && <p className="text-sm text-destructive mt-2">{errors.nis}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="m3-input mt-2"
                                placeholder="Nama lengkap siswa"
                                required
                            />
                            {errors.name && <p className="text-sm text-destructive mt-2">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Jenis Kelamin</label>
                            <div className="flex gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setData('gender', 'L')}
                                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${data.gender === 'L'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                                        }`}
                                >
                                    Laki-laki
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('gender', 'P')}
                                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${data.gender === 'P'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                                        }`}
                                >
                                    Perempuan
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Tanggal Lahir</label>
                            <input
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className="m3-input mt-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="m3-input mt-2"
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
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
