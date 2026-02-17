import { Head, useForm } from '@inertiajs/react';
import { Save, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import type { HomeroomNote } from '@/types/academic';

type Props = {
    homeroomNote: HomeroomNote;
};

export default function HomeroomNoteEdit({ homeroomNote }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        academic_note: homeroomNote.academic_note || '',
        personality_note: homeroomNote.personality_note || '',
        attendance_note: homeroomNote.attendance_note || '',
        recommendation: homeroomNote.recommendation || '',
        parent_note: homeroomNote.parent_note || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/homeroom-notes/${homeroomNote.id}`);
    };

    return (
        <AppLayout title="Edit Catatan" showBack={true} backUrl="/admin/homeroom-notes">
            <Head title="Edit Catatan Wali Kelas" />

            <div className="m3-container py-6 space-y-6">
                {/* Student Info */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">{homeroomNote.class_enrollment?.student?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {homeroomNote.class_enrollment?.class_group?.name} • {homeroomNote.term?.name}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {processing ? 'Menyimpan...' : 'Update Catatan'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
