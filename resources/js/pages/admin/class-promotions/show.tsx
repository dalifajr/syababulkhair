import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Users, TrendingUp, GraduationCap, RotateCcw, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ClassGroup, Student, ClassEnrollment } from '@/types/academic';
import { useState } from 'react';

type EnrollmentWithPromotion = {
    id: number;
    student: Student;
    promotion?: {
        id: number;
        status: string;
        to_class_group_id?: number;
        notes?: string;
    };
    status?: string;
};

type Props = {
    classGroup: ClassGroup;
    enrollments: EnrollmentWithPromotion[];
    nextTermClassGroups: ClassGroup[];
    statuses: Record<string, string>;
};

type PromotionData = {
    enrollment_id: number;
    status: string;
    to_class_group_id: string;
    notes: string;
};

export default function ClassPromotionShow({ classGroup, enrollments, nextTermClassGroups, statuses }: Props) {
    const [promotions, setPromotions] = useState<PromotionData[]>(
        enrollments.map((e) => ({
            enrollment_id: e.id,
            status: e.promotion?.status || 'promoted',
            to_class_group_id: e.promotion?.to_class_group_id?.toString() || '',
            notes: e.promotion?.notes || '',
        }))
    );

    const [processing, setProcessing] = useState(false);

    const updatePromotion = (enrollmentId: number, field: keyof PromotionData, value: string) => {
        setPromotions((prev) =>
            prev.map((p) =>
                p.enrollment_id === enrollmentId ? { ...p, [field]: value } : p
            )
        );
    };

    const handleBulkStatus = (status: string) => {
        setPromotions((prev) =>
            prev.map((p) => ({ ...p, status }))
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        router.post(`/admin/class-promotions/${classGroup.id}/process`, {
            promotions,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    const statusIcons: Record<string, JSX.Element> = {
        promoted: <TrendingUp className="w-4 h-4 text-green-500" />,
        retained: <RotateCcw className="w-4 h-4 text-red-500" />,
        graduated: <GraduationCap className="w-4 h-4 text-purple-500" />,
        transferred: <ArrowRight className="w-4 h-4 text-gray-500" />,
    };

    return (
        <AppLayout title={`Kenaikan Kelas - ${classGroup.name}`} showBack={true} backUrl="/admin/class-promotions">
            <Head title={`Kenaikan Kelas - ${classGroup.name}`} />

            <div className="m3-container py-6 space-y-6">
                {/* Class Info */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">{classGroup.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {classGroup.term?.name} • {enrollments.length} siswa
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bulk Actions */}
                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkStatus('promoted')}
                        className="gap-1"
                    >
                        <TrendingUp className="w-4 h-4" />
                        Semua Naik
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkStatus('graduated')}
                        className="gap-1"
                    >
                        <GraduationCap className="w-4 h-4" />
                        Semua Lulus
                    </Button>
                </div>

                {/* Student List */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {enrollments.map((enrollment, idx) => {
                        const promotionData = promotions.find((p) => p.enrollment_id === enrollment.id);

                        return (
                            <Card key={enrollment.id}>
                                <CardContent className="p-4 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                            {statusIcons[promotionData?.status || 'promoted']}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{enrollment.student?.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                NIS: {enrollment.student?.nis}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Select
                                            value={promotionData?.status || 'promoted'}
                                            onValueChange={(v) => updatePromotion(enrollment.id, 'status', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(statuses).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {(promotionData?.status === 'promoted' || promotionData?.status === 'retained') && (
                                            <Select
                                                value={promotionData?.to_class_group_id || ''}
                                                onValueChange={(v) => updatePromotion(enrollment.id, 'to_class_group_id', v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Kelas Tujuan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {nextTermClassGroups.map((cg) => (
                                                        <SelectItem key={cg.id} value={cg.id.toString()}>
                                                            {cg.name} - {cg.term?.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>

                                    <Textarea
                                        placeholder="Catatan (opsional)"
                                        value={promotionData?.notes || ''}
                                        onChange={(e) => updatePromotion(enrollment.id, 'notes', e.target.value)}
                                        rows={2}
                                    />
                                </CardContent>
                            </Card>
                        );
                    })}

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {processing ? 'Memproses...' : 'Simpan Kenaikan Kelas'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
