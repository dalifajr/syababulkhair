import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Student = {
    id: number;
    nis: string;
    name: string;
};

type Props = {
    students: Student[];
    termId: number | null;
};

export default function BehavioralNoteCreate({ students, termId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        term_id: termId || '',
        type: 'achievement',
        description: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/behavioral-notes');
    };

    return (
        <AppLayout title="Tambah Catatan Perilaku" showBack={true} backUrl="/admin/behavioral-notes">
            <Head title="Tambah Catatan Perilaku" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Siswa</label>
                            <select
                                value={data.student_id}
                                onChange={(e) => setData('student_id', e.target.value)}
                                className="m3-input mt-2"
                                required
                            >
                                <option value="">Pilih siswa...</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>{s.nis} - {s.name}</option>
                                ))}
                            </select>
                            {errors.student_id && <p className="text-sm text-destructive mt-2">{errors.student_id}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Jenis Catatan</label>
                            <div className="flex gap-2 mt-2">
                                {[
                                    { value: 'achievement', label: 'Prestasi', active: 'bg-green-600 text-white', inactive: 'bg-green-100 text-green-700' },
                                    { value: 'violation', label: 'Pelanggaran', active: 'bg-red-600 text-white', inactive: 'bg-red-100 text-red-700' },
                                    { value: 'counseling', label: 'Konseling', active: 'bg-blue-600 text-white', inactive: 'bg-blue-100 text-blue-700' },
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setData('type', opt.value)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${data.type === opt.value ? opt.active : opt.inactive
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                            {errors.type && <p className="text-sm text-destructive mt-2">{errors.type}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Tanggal</label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="m3-input mt-2"
                                required
                            />
                            {errors.date && <p className="text-sm text-destructive mt-2">{errors.date}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Deskripsi</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="m3-input mt-2 min-h-[120px]"
                                placeholder="Tuliskan catatan perilaku siswa..."
                                required
                            />
                            {errors.description && <p className="text-sm text-destructive mt-2">{errors.description}</p>}
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
                                Simpan
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
