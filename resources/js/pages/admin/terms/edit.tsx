import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Term = {
    id: number;
    academic_year_id: number;
    name: string;
    starts_at: string;
    ends_at: string;
    is_active: boolean;
};

type AcademicYear = {
    id: number;
    name: string;
};

type Props = {
    term: Term;
    academicYears: AcademicYear[];
};

export default function TermEdit({ term, academicYears }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        academic_year_id: term.academic_year_id,
        name: term.name,
        starts_at: term.starts_at,
        ends_at: term.ends_at,
        is_active: term.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/terms/${term.id}`);
    };

    return (
        <AppLayout title="Edit Semester" showBack={true} backUrl="/admin/terms">
            <Head title="Edit Semester" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Tahun Ajaran</label>
                            <select
                                value={data.academic_year_id}
                                onChange={(e) => setData('academic_year_id', parseInt(e.target.value))}
                                className="m3-input mt-2"
                                required
                            >
                                {academicYears.map((year) => (
                                    <option key={year.id} value={year.id}>
                                        {year.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nama Semester</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="m3-input mt-2"
                                required
                            />
                            {errors.name && <p className="text-sm text-destructive mt-2">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-on-surface-variant">Tanggal Mulai</label>
                                <input
                                    type="date"
                                    value={data.starts_at}
                                    onChange={(e) => setData('starts_at', e.target.value)}
                                    className="m3-input mt-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-on-surface-variant">Tanggal Selesai</label>
                                <input
                                    type="date"
                                    value={data.ends_at}
                                    onChange={(e) => setData('ends_at', e.target.value)}
                                    className="m3-input mt-2"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-on-surface">Status Aktif</p>
                                <p className="text-sm text-on-surface-variant">Set sebagai semester aktif</p>
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
