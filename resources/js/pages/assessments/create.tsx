import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Assignment = {
    id: number;
    term: {
        name: string;
        academic_year: { name: string };
    };
    class_group: { name: string };
    subject: { name: string };
};

type Props = {
    assignment: Assignment;
};

export default function AssessmentCreate({ assignment }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'daily',
        max_score: 100,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/assessments/${assignment.id}`);
    };

    return (
        <AppLayout title="Tambah Penilaian" showBack={true} backUrl={`/assessments/${assignment.id}`}>
            <Head title="Tambah Penilaian" />

            <div className="m3-container py-6">
                <div className="m3-card-elevated bg-primary/5 border border-primary/20 mb-6">
                    <p className="font-medium text-on-surface">{assignment.subject.name}</p>
                    <p className="text-sm text-on-surface-variant">{assignment.class_group.name} • {assignment.term.name}</p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nama Penilaian</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: UH 1, Quiz Bab 1"
                                className="m3-input mt-2"
                                required
                            />
                            {errors.name && <p className="text-sm text-destructive mt-2">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Jenis Penilaian</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'daily')}
                                    className={`py-3 rounded-xl font-medium transition-all text-sm border ${data.type === 'daily'
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'border-border text-on-surface-variant hover:bg-surface-variant'
                                        }`}
                                >
                                    Ulangan Harian
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'mid')}
                                    className={`py-3 rounded-xl font-medium transition-all text-sm border ${data.type === 'mid'
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'border-border text-on-surface-variant hover:bg-surface-variant'
                                        }`}
                                >
                                    UTS
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'final')}
                                    className={`py-3 rounded-xl font-medium transition-all text-sm border ${data.type === 'final'
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'border-border text-on-surface-variant hover:bg-surface-variant'
                                        }`}
                                >
                                    UAS
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'practical')}
                                    className={`py-3 rounded-xl font-medium transition-all text-sm border ${data.type === 'practical'
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'border-border text-on-surface-variant hover:bg-surface-variant'
                                        }`}
                                >
                                    Praktik
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nilai Maksimal</label>
                            <input
                                type="number"
                                value={data.max_score}
                                onChange={(e) => setData('max_score', parseInt(e.target.value))}
                                min={1}
                                max={100}
                                className="m3-input mt-2"
                                required
                            />
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
