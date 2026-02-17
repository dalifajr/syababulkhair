import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Term = {
    id: number;
    name: string;
    academic_year: {
        name: string;
    };
};

type Teacher = {
    id: number;
    name: string;
};

type Props = {
    terms: Term[];
    teachers: Teacher[];
};

export default function ClassGroupCreate({ terms, teachers }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        term_id: terms[0]?.id || '',
        name: '',
        level: 1,
        stage: 'sd',
        homeroom_teacher_user_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/class-groups');
    };

    return (
        <AppLayout title="Tambah Kelas" showBack={true} backUrl="/admin/class-groups">
            <Head title="Tambah Kelas" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Semester</label>
                            <select
                                value={data.term_id}
                                onChange={(e) => setData('term_id', e.target.value)}
                                className="m3-input mt-2"
                                required
                            >
                                {terms.map((term) => (
                                    <option key={term.id} value={term.id}>
                                        {term.name} - {term.academic_year.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nama Kelas</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: 7A, 8B, 9C"
                                className="m3-input mt-2"
                                required
                            />
                            {errors.name && <p className="text-sm text-destructive mt-2">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Tingkat Kelas</label>
                            <input
                                type="number"
                                value={data.level}
                                onChange={(e) => setData('level', parseInt(e.target.value))}
                                min={0}
                                max={12}
                                className="m3-input mt-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Jenjang</label>
                            <select
                                value={data.stage}
                                onChange={(e) => setData('stage', e.target.value)}
                                className="m3-input mt-2"
                                required
                            >
                                <option value="tk">TK</option>
                                <option value="sd">SD</option>
                                <option value="smp">SMP</option>
                            </select>
                            {errors.stage && <p className="text-sm text-destructive mt-2">{errors.stage}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Wali Kelas</label>
                            <select
                                value={data.homeroom_teacher_user_id}
                                onChange={(e) => setData('homeroom_teacher_user_id', e.target.value)}
                                className="m3-input mt-2"
                            >
                                <option value="">-- Pilih Wali Kelas --</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
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
                                Simpan
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
