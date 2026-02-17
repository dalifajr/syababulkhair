import { Head, useForm } from '@inertiajs/react';
import { Save, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ClassEnrollment, Term } from '@/types/academic';

type Props = {
    enrollments: ClassEnrollment[];
    terms: Term[];
};

export default function HomeroomNoteCreate({ enrollments, terms }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        class_enrollment_id: '',
        term_id: '',
        academic_note: '',
        personality_note: '',
        attendance_note: '',
        recommendation: '',
        parent_note: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/homeroom-notes');
    };

    // Group enrollments by class
    const groupedEnrollments = enrollments.reduce((acc, e) => {
        const className = e.class_group?.name || 'Unknown';
        if (!acc[className]) acc[className] = [];
        acc[className].push(e);
        return acc;
    }, {} as Record<string, ClassEnrollment[]>);

    return (
        <AppLayout title="Tambah Catatan" showBack={true} backUrl="/admin/homeroom-notes">
            <Head title="Tambah Catatan Wali Kelas" />

            <div className="m3-container py-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Student */}
                    <div className="space-y-2">
                        <Label>Siswa</Label>
                        <Select value={data.class_enrollment_id} onValueChange={(v) => setData('class_enrollment_id', v)}>
                            <SelectTrigger className={errors.class_enrollment_id ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Pilih siswa" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(groupedEnrollments).map(([className, enrollments]) => (
                                    <div key={className}>
                                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted">
                                            {className}
                                        </div>
                                        {enrollments.map((e) => (
                                            <SelectItem key={e.id} value={e.id.toString()}>
                                                {e.student?.name} ({e.student?.nis})
                                            </SelectItem>
                                        ))}
                                    </div>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.class_enrollment_id && <p className="text-sm text-destructive">{errors.class_enrollment_id}</p>}
                    </div>

                    {/* Term */}
                    <div className="space-y-2">
                        <Label>Semester</Label>
                        <Select value={data.term_id} onValueChange={(v) => setData('term_id', v)}>
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

                    {/* Academic Note */}
                    <div className="space-y-2">
                        <Label htmlFor="academic_note">Catatan Akademik</Label>
                        <Textarea
                            id="academic_note"
                            value={data.academic_note}
                            onChange={(e) => setData('academic_note', e.target.value)}
                            placeholder="Catatan tentang perkembangan akademik siswa..."
                            rows={3}
                        />
                        {errors.academic_note && <p className="text-sm text-destructive">{errors.academic_note}</p>}
                    </div>

                    {/* Personality Note */}
                    <div className="space-y-2">
                        <Label htmlFor="personality_note">Catatan Kepribadian</Label>
                        <Textarea
                            id="personality_note"
                            value={data.personality_note}
                            onChange={(e) => setData('personality_note', e.target.value)}
                            placeholder="Catatan tentang sikap dan kepribadian siswa..."
                            rows={3}
                        />
                        {errors.personality_note && <p className="text-sm text-destructive">{errors.personality_note}</p>}
                    </div>

                    {/* Attendance Note */}
                    <div className="space-y-2">
                        <Label htmlFor="attendance_note">Catatan Kehadiran</Label>
                        <Textarea
                            id="attendance_note"
                            value={data.attendance_note}
                            onChange={(e) => setData('attendance_note', e.target.value)}
                            placeholder="Catatan tentang kehadiran dan kedisiplinan..."
                            rows={3}
                        />
                        {errors.attendance_note && <p className="text-sm text-destructive">{errors.attendance_note}</p>}
                    </div>

                    {/* Recommendation */}
                    <div className="space-y-2">
                        <Label htmlFor="recommendation">Rekomendasi</Label>
                        <Textarea
                            id="recommendation"
                            value={data.recommendation}
                            onChange={(e) => setData('recommendation', e.target.value)}
                            placeholder="Rekomendasi untuk perbaikan atau pengembangan siswa..."
                            rows={3}
                        />
                        {errors.recommendation && <p className="text-sm text-destructive">{errors.recommendation}</p>}
                    </div>

                    {/* Parent Note */}
                    <div className="space-y-2">
                        <Label htmlFor="parent_note">Catatan untuk Orang Tua</Label>
                        <Textarea
                            id="parent_note"
                            value={data.parent_note}
                            onChange={(e) => setData('parent_note', e.target.value)}
                            placeholder="Catatan khusus untuk dibaca orang tua..."
                            rows={3}
                        />
                        {errors.parent_note && <p className="text-sm text-destructive">{errors.parent_note}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="m3-button-filled w-full"
                    >
                        <Save className="w-5 h-5" />
                        {processing ? 'Menyimpan...' : 'Simpan Catatan'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
