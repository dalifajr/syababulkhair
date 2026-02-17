import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/mobile-layout';

type Student = {
    id: number;
    nis: string;
    name: string;
};

type StudentWithScore = {
    student: Student;
    score: number | null;
    score_id: number | null;
};

type Assessment = {
    id: number;
    name: string;
    type: string;
    max_score: number;
    teaching_assignment: {
        id: number;
        class_group: { name: string };
        subject: { name: string };
    };
};

type Props = {
    assessment: Assessment;
    students: StudentWithScore[];
};

export default function InputScores({ assessment, students: initialStudents }: Props) {
    const [students, setStudents] = useState(initialStudents);
    const { data, setData, post, processing } = useForm({
        scores: initialStudents.map((s) => ({
            student_id: s.student.id,
            score: s.score,
        })),
    });

    const handleScoreChange = (studentId: number, score: string) => {
        const numScore = score === '' ? null : parseFloat(score);

        // Update local state
        setStudents(prev => prev.map(s =>
            s.student.id === studentId ? { ...s, score: numScore } : s
        ));

        // Update form data
        const newScores = data.scores.map((s) =>
            s.student_id === studentId ? { ...s, score: numScore } : s
        );
        setData('scores', newScores);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        post(`/assessments/scores/${assessment.id}`);
    };

    return (
        <AppLayout
            title="Input Nilai"
            showBack={true}
            backUrl={`/assessments/${assessment.teaching_assignment.id}`}
            showFab={true}
            fabIcon={<Save className="w-6 h-6" />}
            onFabClick={() => handleSubmit()}
        >
            <Head title={`Input Nilai - ${assessment.name}`} />

            <div className="m3-container py-6">
                <div className="m3-card-elevated bg-gradient-to-br from-primary/5 to-secondary/5 mb-6">
                    <h2 className="text-xl font-semibold text-on-surface">{assessment.name}</h2>
                    <p className="text-sm text-on-surface-variant">
                        {assessment.teaching_assignment.subject.name} • {assessment.teaching_assignment.class_group.name}
                    </p>
                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-surface-variant text-xs font-medium text-on-surface-variant">
                        Maksimal Nilai: {assessment.max_score}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="m3-card-elevated p-0 overflow-hidden">
                        <div className="px-5 py-4 border-b border-border flex justify-between items-center">
                            <h3 className="font-medium text-on-surface">Daftar Siswa</h3>
                            <span className="text-xs text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">
                                {students.length} Siswa
                            </span>
                        </div>
                        {students.length > 0 ? (
                            <div className="divide-y divide-border">
                                {students.map((item) => (
                                    <div key={item.student.id} className="flex items-center justify-between p-4 hover:bg-surface-variant/30 transition-colors">
                                        <div className="flex-1 min-w-0 pr-4">
                                            <p className="font-medium text-on-surface truncate">{item.student.name}</p>
                                            <p className="text-sm text-on-surface-variant">NIS: {item.student.nis}</p>
                                        </div>
                                        <div className="w-20">
                                            <input
                                                type="number"
                                                value={item.score ?? ''}
                                                onChange={(e) => handleScoreChange(item.student.id, e.target.value)}
                                                min={0}
                                                max={assessment.max_score}
                                                placeholder="-"
                                                className="m3-input h-12 text-center font-bold text-lg p-0"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 text-center">
                                <p className="text-lg font-medium text-on-surface">Belum ada siswa di kelas ini</p>
                                <p className="text-on-surface-variant mt-1">
                                    Tambahkan siswa dulu agar bisa menginput nilai.
                                </p>
                                <Link
                                    href={`/assessments/${assessment.teaching_assignment.id}`}
                                    className="m3-button-filled mt-6 inline-flex"
                                >
                                    Kelola Siswa
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 md:hidden">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full m3-button-filled h-12"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Nilai'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
