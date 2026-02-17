import { Head, Link, useForm } from '@inertiajs/react';
import { Save, FileText, Users } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import type { ClassGroup, Term, ClassEnrollment } from '@/types/academic';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

type Props = {
    classGroups: ClassGroup[];
    terms: Term[];
    enrollments: ClassEnrollment[];
};

export default function ReportCardCreate({ classGroups, terms, enrollments }: Props) {
    const [selectedClassGroup, setSelectedClassGroup] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [selectedEnrollments, setSelectedEnrollments] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        class_group_id: '',
        term_id: '',
        enrollment_ids: [] as number[],
        generate_all: true,
    });

    // Filter enrollments by selected class group
    const filteredEnrollments = enrollments.filter(
        (e) => e.class_group_id?.toString() === selectedClassGroup
    );

    useEffect(() => {
        if (selectAll) {
            setSelectedEnrollments(filteredEnrollments.map((e) => e.id));
        } else {
            setSelectedEnrollments([]);
        }
    }, [selectAll, selectedClassGroup]);

    useEffect(() => {
        setData({
            ...data,
            class_group_id: selectedClassGroup,
            term_id: selectedTerm,
            enrollment_ids: selectedEnrollments,
        });
    }, [selectedClassGroup, selectedTerm, selectedEnrollments]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/report-cards');
    };

    const toggleEnrollment = (id: number) => {
        if (selectedEnrollments.includes(id)) {
            setSelectedEnrollments(selectedEnrollments.filter((e) => e !== id));
        } else {
            setSelectedEnrollments([...selectedEnrollments, id]);
        }
    };

    return (
        <AppLayout title="Generate Rapor" showBack={true} backUrl="/admin/report-cards">
            <Head title="Generate Rapor" />

            <div className="m3-container py-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Term */}
                    <div className="space-y-2">
                        <Label>Semester</Label>
                        <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                            <SelectTrigger className={errors.term_id ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Pilih semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {terms.map((term) => (
                                    <SelectItem key={term.id} value={term.id.toString()}>
                                        {term.name} - {term.academic_year?.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.term_id && <p className="text-sm text-destructive">{errors.term_id}</p>}
                    </div>

                    {/* Class Group */}
                    <div className="space-y-2">
                        <Label>Kelas</Label>
                        <Select value={selectedClassGroup} onValueChange={setSelectedClassGroup}>
                            <SelectTrigger className={errors.class_group_id ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Pilih kelas" />
                            </SelectTrigger>
                            <SelectContent>
                                {classGroups.map((cg) => (
                                    <SelectItem key={cg.id} value={cg.id.toString()}>{cg.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.class_group_id && <p className="text-sm text-destructive">{errors.class_group_id}</p>}
                    </div>

                    {/* Generate All Toggle */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label>Generate untuk Semua Siswa</Label>
                            <p className="text-sm text-muted-foreground">
                                Rapor akan di-generate untuk semua siswa di kelas ini
                            </p>
                        </div>
                        <Switch
                            checked={data.generate_all}
                            onCheckedChange={(checked) => {
                                setData('generate_all', checked);
                                if (checked) {
                                    setSelectAll(true);
                                }
                            }}
                        />
                    </div>

                    {/* Student Selection */}
                    {!data.generate_all && selectedClassGroup && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label>Pilih Siswa</Label>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="select-all"
                                        checked={selectAll}
                                        onCheckedChange={(checked) => setSelectAll(!!checked)}
                                    />
                                    <label htmlFor="select-all" className="text-sm">Pilih Semua</label>
                                </div>
                            </div>
                            <div className="max-h-64 overflow-y-auto rounded-lg border divide-y">
                                {filteredEnrollments.map((enrollment) => (
                                    <div
                                        key={enrollment.id}
                                        className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                                        onClick={() => toggleEnrollment(enrollment.id)}
                                    >
                                        <Checkbox
                                            checked={selectedEnrollments.includes(enrollment.id)}
                                            onCheckedChange={() => toggleEnrollment(enrollment.id)}
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{enrollment.student?.name}</p>
                                            <p className="text-sm text-muted-foreground">{enrollment.student?.nis}</p>
                                        </div>
                                    </div>
                                ))}
                                {filteredEnrollments.length === 0 && (
                                    <div className="p-4 text-center text-muted-foreground">
                                        Tidak ada siswa di kelas ini
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {selectedEnrollments.length} siswa dipilih
                            </p>
                        </div>
                    )}

                    {/* Info */}
                    <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                        <p className="font-medium mb-2">Informasi:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Rapor akan di-generate berdasarkan nilai yang sudah diinput</li>
                            <li>Nilai akhir dihitung dari bobot setiap kategori penilaian</li>
                            <li>Peringkat kelas akan dihitung otomatis</li>
                            <li>Rapor yang sudah dikunci tidak dapat diedit</li>
                        </ul>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing || (!data.generate_all && selectedEnrollments.length === 0)}
                        className="m3-button-filled w-full"
                    >
                        <FileText className="w-5 h-5" />
                        {processing ? 'Generating...' : 'Generate Rapor'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
