import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Assignment = {
    id: number;
    term_id: number;
    class_group_id: number;
    subject_id: number;
    teacher_user_id: number;
};

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
    assignment: Assignment;
    terms: Term[];
    classGroups: ClassGroup[];
    subjects: Subject[];
    teachers: Teacher[];
};

export default function TeachingAssignmentEdit({ assignment, terms, classGroups, subjects, teachers }: Props) {
    const { data, setData, put, processing } = useForm({
        term_id: assignment.term_id,
        class_group_id: assignment.class_group_id,
        subject_id: assignment.subject_id,
        teacher_user_id: assignment.teacher_user_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/teaching-assignments/${assignment.id}`);
    };

    return (
        <AppLayout title="Edit Penugasan" showBack={true} backUrl="/admin/teaching-assignments">
            <Head title="Edit Penugasan Guru" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Semester</label>
                            <select
                                value={data.term_id}
                                onChange={(e) => setData('term_id', parseInt(e.target.value))}
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
                            <label className="text-sm font-medium text-on-surface-variant">Kelas</label>
                            <select
                                value={data.class_group_id}
                                onChange={(e) => setData('class_group_id', parseInt(e.target.value))}
                                className="m3-input mt-2"
                                required
                            >
                                {classGroups.map((cg) => (
                                    <option key={cg.id} value={cg.id}>
                                        {cg.name} (Tingkat {cg.level})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Mata Pelajaran</label>
                            <select
                                value={data.subject_id}
                                onChange={(e) => setData('subject_id', parseInt(e.target.value))}
                                className="m3-input mt-2"
                                required
                            >
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
                                onChange={(e) => setData('teacher_user_id', parseInt(e.target.value))}
                                className="m3-input mt-2"
                                required
                            >
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
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
