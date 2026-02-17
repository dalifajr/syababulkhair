import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileLayout from '@/layouts/mobile-layout';
import { router } from '@inertiajs/react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Student, AssessmentScore, Term, PaginatedData } from '@/types/academic';
import { ASSESSMENT_CATEGORIES } from '@/types/academic';

interface Props {
    student: Student;
    scores: Record<string, AssessmentScore[]>;
    terms: Term[];
    filters: {
        term_id: number | null;
    };
}

export default function ParentScores({ student, scores, terms, filters }: Props) {
    const handleTermChange = (value: string) => {
        router.get(route('parent.scores'), { term_id: value }, { preserveState: true });
    };

    const getScoreColor = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 80) return 'text-green-600';
        if (percentage >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBadgeVariant = (score: number, maxScore: number): 'default' | 'secondary' | 'destructive' => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 70) return 'default';
        if (percentage >= 50) return 'secondary';
        return 'destructive';
    };

    const subjectNames = Object.keys(scores);

    return (
        <MobileLayout>
            <Head title="Nilai Siswa" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('parent.dashboard')} className="rounded-full p-2 hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Nilai</h1>
                        <p className="text-sm text-muted-foreground">{student.name}</p>
                    </div>
                </div>

                {/* Term Filter */}
                <Select value={filters.term_id?.toString() || ''} onValueChange={handleTermChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {terms.map((term) => (
                            <SelectItem key={term.id} value={term.id.toString()}>
                                {term.name} - {term.academic_year?.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Scores by Subject */}
                {subjectNames.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <p className="text-muted-foreground">Belum ada nilai di semester ini</p>
                        </CardContent>
                    </Card>
                ) : (
                    subjectNames.map((subjectName) => {
                        const subjectScores = scores[subjectName];
                        const avgScore = subjectScores.reduce((sum, s) => sum + s.score, 0) / subjectScores.length;
                        const maxAvgScore = subjectScores.reduce((sum, s) => sum + (s.assessment?.max_score || 100), 0) / subjectScores.length;
                        const avgPercentage = (avgScore / maxAvgScore) * 100;

                        return (
                            <Card key={subjectName}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base">{subjectName}</CardTitle>
                                        <div className="flex items-center gap-1">
                                            {avgPercentage >= 70 ? (
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            ) : avgPercentage >= 50 ? (
                                                <Minus className="h-4 w-4 text-yellow-600" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-red-600" />
                                            )}
                                            <span className={`text-sm font-medium ${getScoreColor(avgScore, maxAvgScore)}`}>
                                                {avgScore.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {subjectScores.map((score) => (
                                        <div key={score.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                            <div>
                                                <p className="font-medium">{score.assessment?.name}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Badge variant="outline" className="text-xs">
                                                        {ASSESSMENT_CATEGORIES[score.assessment?.category || 'tugas']}
                                                    </Badge>
                                                    {score.assessment?.date && (
                                                        <span>{new Date(score.assessment.date).toLocaleDateString('id-ID')}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge variant={getScoreBadgeVariant(score.score, score.assessment?.max_score || 100)}>
                                                {score.score}/{score.assessment?.max_score}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </MobileLayout>
    );
}
