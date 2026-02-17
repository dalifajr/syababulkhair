import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Term = {
    id: number;
    name: string;
    academic_year: { name: string };
};

type ClassGroup = {
    id: number;
    name: string;
    level: number;
};

type Subject = {
    id: number;
    name: string;
};

type Teacher = {
    id: number;
    name: string;
};

type Props = {
    terms: Term[];
    classGroups: ClassGroup[];
    subjects: Subject[];
    teachers: Teacher[];
};

export default function TeachingAssignmentCreate({ terms, classGroups, subjects, teachers }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        term_id: terms[0]?.id || '',
        class_group_id: '',
        subject_id: '',
        teacher_user_id: '',
    });

    const generalError = (errors as Record<string, string | undefined>).general;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/teaching-assignments');
    };

    return (
        <AppLayout title="Tambah Penugasan" showBack={true} backUrl="/admin/teaching-assignments">
            <Head title="Tambah Penugasan Guru" />

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
                                <option value="">-- Pilih Semester --</option>
                                {terms.map((term) => (
                                    <option key={term.id} value={term.id}>
                                        {term.name} - {term.academic_year.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Kelas</label>
                            <select
                                value={data.class_group_id}
                                onChange={(e) => setData('class_group_id', e.target.value)}
                                className="m3-input mt-2"
                                required
                            >
                                <option value="">-- Pilih Kelas --</option>
                                {classGroups.map((cg) => (
                                    <option key={cg.id} value={cg.id}>
                                        {cg.name} (Tingkat {cg.level})
                                    </option>
                                ))}
                            </select>
                            {errors.class_group_id && <p className="text-sm text-destructive mt-2">{errors.class_group_id}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Mata Pelajaran</label>
                            <select
                                value={data.subject_id}
                                onChange={(e) => setData('subject_id', e.target.value)}
                                className="m3-input mt-2"
                                required
                            >
                                <option value="">-- Pilih Mata Pelajaran --</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Guru</label>
                            <select
                                value={data.teacher_user_id}
                                onChange={(e) => setData('teacher_user_id', e.target.value)}
                                className="m3-input mt-2"
                                required
                            >
                                <option value="">-- Pilih Guru --</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {generalError && (
                        <p className="text-sm text-destructive text-center">{generalError}</p>
                    )}

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
