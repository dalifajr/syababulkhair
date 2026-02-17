import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/layouts/mobile-layout';
import { ArrowLeft, FileText, Lock, Download, ChevronRight } from 'lucide-react';
import type { Student, ReportCard } from '@/types/academic';

interface Props {
    student: Student;
    reportCards: ReportCard[];
}

export default function ParentReportCards({ student, reportCards }: Props) {
    return (
        <MobileLayout>
            <Head title="Rapor" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('parent.dashboard')} className="rounded-full p-2 hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Rapor</h1>
                        <p className="text-sm text-muted-foreground">{student.name}</p>
                    </div>
                </div>

                {/* Report Cards List */}
                {reportCards.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <FileText className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground">Belum ada rapor tersedia</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {reportCards.map((reportCard) => (
                            <Link 
                                key={reportCard.id} 
                                href={route('parent.report-cards.show', reportCard.id)}
                            >
                                <Card className="transition-colors hover:bg-muted/50">
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                <FileText className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">
                                                    {reportCard.term?.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {reportCard.term?.academic_year?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {reportCard.is_locked ? (
                                                <Badge variant="default" className="gap-1">
                                                    <Lock className="h-3 w-3" />
                                                    Final
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">Draft</Badge>
                                            )}
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
