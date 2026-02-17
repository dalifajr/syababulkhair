import { Head, router, useForm } from '@inertiajs/react';
import { BookText, Check, Target, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/mobile-layout';

type Subject = {
    id: number;
    name: string;
    category: string | null;
    kkm_id: number | null;
    kkm_value: number;
    has_kkm: boolean;
};

type Term = {
    id: number;
    name: string;
    academic_year: {
        id: number;
        name: string;
    } | null;
};

type Props = {
    subjects: Subject[];
    terms: Term[];
    selectedTermId: number | null;
    activeTerm: Term | null;
};

export default function KkmIndex({ subjects, terms, selectedTermId, activeTerm }: Props) {
    const [kkmValues, setKkmValues] = useState<Record<number, number>>(() => {
        const initial: Record<number, number> = {};
        subjects.forEach(s => {
            initial[s.id] = s.kkm_value;
        });
        return initial;
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleTermChange = (termId: string) => {
        router.get('/admin/kkm', { term_id: termId }, { preserveState: true });
    };

    const handleKkmChange = (subjectId: number, value: string) => {
        const numValue = parseFloat(value) || 0;
        setKkmValues(prev => ({ ...prev, [subjectId]: numValue }));
        setHasChanges(true);
    };

    const handleSaveAll = () => {
        if (!selectedTermId) return;

        setSaving(true);
        const kkmData = Object.entries(kkmValues).map(([subjectId, value]) => ({
            subject_id: parseInt(subjectId),
            kkm_value: value,
        }));

        router.post('/admin/kkm/bulk', {
            term_id: selectedTermId,
            kkm_data: kkmData,
        }, {
            onSuccess: () => {
                setHasChanges(false);
                setSaving(false);
            },
            onError: () => {
                setSaving(false);
            },
        });
    };

    const getPredicate = (score: number): string => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'E';
    };

    const getPredicateColor = (predicate: string): string => {
        switch (predicate) {
            case 'A': return 'bg-chart-3/15 text-chart-3';
            case 'B': return 'bg-chart-4/15 text-chart-4';
            case 'C': return 'bg-primary/15 text-primary';
            case 'D': return 'bg-chart-5/15 text-chart-5';
            default: return 'bg-destructive/15 text-destructive';
        }
    };

    return (
        <AppLayout title="KKM & Predikat" showBack={true} backUrl="/dashboard">
            <Head title="KKM & Predikat" />

            <div className="m3-container py-6 space-y-6">
                {/* Header */}
                <div className="m3-card-elevated bg-gradient-to-br from-primary/5 to-tertiary/5">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[18px] bg-primary/10 flex items-center justify-center">
                            <Target className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-on-surface">Kriteria Ketuntasan Minimal</h1>
                            <p className="text-on-surface-variant mt-1">Atur KKM per mata pelajaran per semester</p>
                        </div>
                    </div>
                </div>

                {/* Term Selector */}
                <div className="relative">
                    <label className="text-sm font-medium text-on-surface-variant mb-2 block">
                        Pilih Semester
                    </label>
                    <div className="relative">
                        <select
                            value={selectedTermId || ''}
                            onChange={(e) => handleTermChange(e.target.value)}
                            className="m3-input appearance-none pr-10"
                        >
                            {terms.map(term => (
                                <option key={term.id} value={term.id}>
                                    {term.name} - {term.academic_year?.name || 'N/A'}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                {/* Predikat Legend */}
                <div className="m3-card-outlined">
                    <p className="text-sm font-medium text-on-surface-variant mb-3">Keterangan Predikat:</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { code: 'A', range: '90-100', desc: 'Sangat Baik' },
                            { code: 'B', range: '80-89', desc: 'Baik' },
                            { code: 'C', range: '70-79', desc: 'Cukup' },
                            { code: 'D', range: '60-69', desc: 'Kurang' },
                            { code: 'E', range: '<60', desc: 'Sangat Kurang' },
                        ].map(p => (
                            <span
                                key={p.code}
                                className={`text-xs px-3 py-1.5 rounded-full ${getPredicateColor(p.code)}`}
                            >
                                {p.code} ({p.range})
                            </span>
                        ))}
                    </div>
                </div>

                {/* Subject KKM List */}
                <div className="m3-card-elevated p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                        <h2 className="font-medium text-on-surface">Daftar Mata Pelajaran</h2>
                        <span className="text-sm text-on-surface-variant">{subjects.length} mapel</span>
                    </div>
                    <div className="divide-y divide-border">
                        {subjects.map((subject, idx) => (
                            <div
                                key={subject.id}
                                className="px-5 py-4 flex items-center gap-4 animate-m3-fade"
                                style={{ animationDelay: `${idx * 30}ms` }}
                            >
                                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                                    <BookText className="w-5 h-5 text-secondary-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-on-surface truncate">{subject.name}</p>
                                    <p className="text-sm text-on-surface-variant">
                                        {subject.category || 'Umum'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.1"
                                        value={kkmValues[subject.id] || 70}
                                        onChange={(e) => handleKkmChange(subject.id, e.target.value)}
                                        className="w-20 h-10 rounded-xl border border-border bg-surface-container 
                                                   text-center text-sm font-medium text-on-surface
                                                   focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                                    ${getPredicateColor(getPredicate(kkmValues[subject.id] || 70))}`}>
                                        {getPredicate(kkmValues[subject.id] || 70)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                {hasChanges && (
                    <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
                        <button
                            onClick={handleSaveAll}
                            disabled={saving}
                            className="m3-button-filled w-full py-4"
                        >
                            <Check className="w-5 h-5" />
                            {saving ? 'Menyimpan...' : 'Simpan Semua KKM'}
                        </button>
                    </div>
                )}

                {/* Info Note */}
                <div className="bg-surface-variant/50 rounded-2xl p-4">
                    <p className="text-sm text-on-surface-variant">
                        💡 KKM adalah nilai minimal yang harus dicapai siswa untuk dinyatakan tuntas.
                        Nilai di bawah KKM akan ditandai dengan warna merah pada laporan nilai.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
