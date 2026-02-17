import { Head, router } from '@inertiajs/react';
import {
    BarChart3,
    Download,
    TrendingUp,
    TrendingDown,
    Award,
    Users,
    Target,
    CheckCircle,
    XCircle,
    Filter,
} from 'lucide-react';
import MobileLayout from '@/layouts/mobile-layout';
import { useState } from 'react';

type Subject = {
    id: number;
    name: string;
};

type ClassGroup = {
    id: number;
    name: string;
    level?: string;
};

type Term = {
    id: number;
    name: string;
    academic_year?: { name: string };
} | null;

type ScoreEntry = {
    student_id: number;
    student_name: string;
    nis: string;
    subject_id: number;
    subject_name: string;
    class_name: string;
    average: number;
    highest: number;
    lowest: number;
    total_scores: number;
    kkm: number | null;
    passing: boolean | null;
    predicate: string;
};

type Statistics = {
    average: number;
    highest: number;
    lowest: number;
    total_entries: number;
    pass_rate: number | null;
    distribution: {
        A: number;
        B: number;
        C: number;
        D: number;
        E: number;
    };
} | null;

type Props = {
    subjects: Subject[];
    classGroups: ClassGroup[];
    activeTerm: Term;
    scoresData: ScoreEntry[];
    statistics: Statistics;
    filters: {
        class_group_id: string | null;
        subject_id: string | null;
    };
};

// Yayasan color palette
const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
    goldLight: '#e0c76e',
    surface: '#faf8f0',
};

function predicateColor(predicate: string) {
    switch (predicate) {
        case 'A': return { bg: 'rgba(13,110,63,0.12)', color: colors.primary };
        case 'B': return { bg: 'rgba(200,169,81,0.15)', color: '#9a7d2e' };
        case 'C': return { bg: 'rgba(59,130,246,0.12)', color: '#2563eb' };
        case 'D': return { bg: 'rgba(251,146,60,0.12)', color: '#ea580c' };
        case 'E': return { bg: 'rgba(239,68,68,0.12)', color: '#dc2626' };
        default: return { bg: '#f1f5f9', color: '#64748b' };
    }
}

export default function ScoresReport({ subjects, classGroups, activeTerm, scoresData = [], statistics, filters }: Props) {
    const [classGroupId, setClassGroupId] = useState(filters?.class_group_id || '');
    const [subjectId, setSubjectId] = useState(filters?.subject_id || '');

    const handleFilter = () => {
        const params: Record<string, string> = {};
        if (classGroupId) params.class_group_id = classGroupId;
        if (subjectId) params.subject_id = subjectId;
        router.get('/reports/scores', params, { preserveState: true });
    };

    const handleExport = () => {
        const params = new URLSearchParams();
        if (classGroupId) params.set('class_group_id', classGroupId);
        if (subjectId) params.set('subject_id', subjectId);
        window.location.href = `/reports/scores/export?${params.toString()}`;
    };

    const maxDistribution = statistics?.distribution
        ? Math.max(...Object.values(statistics.distribution), 1)
        : 1;

    const hasData = scoresData.length > 0;
    const hasFilters = !!filters?.class_group_id || !!filters?.subject_id;

    return (
        <MobileLayout title="Rekap Nilai" backUrl="/dashboard">
            <Head title="Rekap Nilai">
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div style={{ padding: '20px 16px 32px', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                {/* Header Card */}
                <div
                    style={{
                        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 60%, ${colors.primaryLight} 100%)`,
                        borderRadius: '24px',
                        padding: '24px',
                        marginBottom: '20px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(13,110,63,0.25)',
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.5,
                    }} />
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(200,169,81,0.12)', filter: 'blur(40px)' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: 'rgba(200,169,81,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BarChart3 size={20} color={colors.goldLight} />
                            </div>
                            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>Rekap Nilai</h1>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>
                            {activeTerm?.name || 'Semester'} • {activeTerm?.academic_year?.name || 'Tahun Ajaran'}
                        </p>
                    </div>
                </div>

                {/* Filter Section */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                    border: '1px solid rgba(13,110,63,0.08)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Filter size={16} color={colors.primary} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: colors.primaryDark, letterSpacing: '0.05em' }}>FILTER DATA</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', display: 'block', marginBottom: '6px' }}>Kelas</label>
                            <select
                                value={classGroupId}
                                onChange={(e) => setClassGroupId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    border: '1.5px solid rgba(13,110,63,0.15)',
                                    fontSize: '14px',
                                    backgroundColor: '#fafafa',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="">Semua Kelas</option>
                                {classGroups.map((cg) => (
                                    <option key={cg.id} value={cg.id}>
                                        {cg.level ? `${cg.level} ` : ''}{cg.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', display: 'block', marginBottom: '6px' }}>Mata Pelajaran</label>
                            <select
                                value={subjectId}
                                onChange={(e) => setSubjectId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    border: '1.5px solid rgba(13,110,63,0.15)',
                                    fontSize: '14px',
                                    backgroundColor: '#fafafa',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="">Semua Mapel</option>
                                {subjects.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                            onClick={handleFilter}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '14px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                                transition: 'all 0.3s',
                            }}
                        >
                            <BarChart3 size={16} />
                            Tampilkan
                        </button>
                        {hasData && (
                            <button
                                onClick={handleExport}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '12px',
                                    background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
                                    color: colors.primaryDark,
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 12px rgba(200,169,81,0.2)',
                                    transition: 'all 0.3s',
                                }}
                            >
                                <Download size={16} />
                                Export CSV
                            </button>
                        )}
                    </div>
                </div>

                {/* Statistics Cards */}
                {statistics && (
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '4px' }}>STATISTIK</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                            <StatCard label="Rata-rata" value={statistics.average} icon={BarChart3} variant={0} />
                            <StatCard label="Tertinggi" value={statistics.highest} icon={TrendingUp} variant={1} />
                            <StatCard label="Terendah" value={statistics.lowest} icon={TrendingDown} variant={2} />
                            <StatCard label="Total Data" value={statistics.total_entries} icon={Users} variant={3} />
                            {statistics.pass_rate !== null && (
                                <StatCard label="% Lulus KKM" value={`${statistics.pass_rate}%`} icon={Target} variant={0} />
                            )}
                        </div>
                    </div>
                )}

                {/* Distribution Chart */}
                {statistics && (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '20px',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '10px',
                                background: 'linear-gradient(135deg, #c8a951, #e0c76e)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Award size={16} color="#0a5832" />
                            </div>
                            <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>Distribusi Predikat</h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px', paddingBottom: '30px', position: 'relative' }}>
                            {(['A', 'B', 'C', 'D', 'E'] as const).map((grade) => {
                                const count = statistics.distribution[grade];
                                const height = maxDistribution > 0 ? (count / maxDistribution) * 120 : 0;
                                const pColor = predicateColor(grade);
                                return (
                                    <div key={grade} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 700, color: pColor.color }}>{count}</span>
                                        <div style={{
                                            width: '100%',
                                            maxWidth: '60px',
                                            height: `${Math.max(height, 4)}px`,
                                            borderRadius: '10px 10px 4px 4px',
                                            background: `linear-gradient(180deg, ${pColor.color}dd, ${pColor.color}88)`,
                                            transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: `0 2px 8px ${pColor.color}33`,
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}>
                                        </div>
                                        <span style={{
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: pColor.color,
                                            backgroundColor: pColor.bg,
                                            padding: '2px 10px',
                                            borderRadius: '6px',
                                        }}>{grade}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', justifyContent: 'center' }}>
                            {[
                                { grade: 'A', label: 'Sangat Baik (≥90)' },
                                { grade: 'B', label: 'Baik (80-89)' },
                                { grade: 'C', label: 'Cukup (70-79)' },
                                { grade: 'D', label: 'Kurang (60-69)' },
                                { grade: 'E', label: 'Sangat Kurang (<60)' },
                            ].map(({ grade, label }) => {
                                const pColor = predicateColor(grade);
                                return (
                                    <span key={grade} style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '3px', backgroundColor: pColor.color, flexShrink: 0 }} />
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Scores Data Table */}
                {hasFilters && (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <div style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid rgba(13,110,63,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #0d6e3f, #15a060)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Users size={16} color="#fff" />
                                </div>
                                <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>
                                    Data Nilai ({scoresData.length} entri)
                                </h2>
                            </div>
                        </div>

                        {hasData ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: 'rgba(13,110,63,0.04)' }}>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>NIS</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>NAMA SISWA</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>KELAS</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>MAPEL</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>RATA-RATA</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>KKM</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>STATUS</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: colors.primaryDark, fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>PREDIKAT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scoresData.map((entry, idx) => {
                                            const pColor = predicateColor(entry.predicate);
                                            return (
                                                <tr key={`${entry.student_id}-${entry.subject_id}`} style={{
                                                    borderBottom: idx < scoresData.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                                    transition: 'background-color 0.2s',
                                                }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(13,110,63,0.02)')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                                >
                                                    <td style={{ padding: '12px 16px', color: '#666', whiteSpace: 'nowrap' }}>{entry.nis}</td>
                                                    <td style={{ padding: '12px 16px', fontWeight: 500, color: colors.primaryDark, whiteSpace: 'nowrap' }}>{entry.student_name}</td>
                                                    <td style={{ padding: '12px 16px', color: '#666', whiteSpace: 'nowrap' }}>{entry.class_name}</td>
                                                    <td style={{ padding: '12px 16px', color: '#666', whiteSpace: 'nowrap' }}>{entry.subject_name}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, fontSize: '15px', color: colors.primary }}>{entry.average}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center', color: '#888' }}>{entry.kkm ?? '-'}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                                        {entry.passing !== null ? (
                                                            <span style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '4px',
                                                                padding: '3px 10px',
                                                                borderRadius: '8px',
                                                                fontSize: '12px',
                                                                fontWeight: 600,
                                                                backgroundColor: entry.passing ? 'rgba(13,110,63,0.1)' : 'rgba(239,68,68,0.1)',
                                                                color: entry.passing ? colors.primary : '#dc2626',
                                                            }}>
                                                                {entry.passing ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                                {entry.passing ? 'Lulus' : 'Belum'}
                                                            </span>
                                                        ) : (
                                                            <span style={{ color: '#ccc' }}>-</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                                        <span style={{
                                                            display: 'inline-block',
                                                            padding: '3px 12px',
                                                            borderRadius: '8px',
                                                            fontSize: '13px',
                                                            fontWeight: 700,
                                                            backgroundColor: pColor.bg,
                                                            color: pColor.color,
                                                        }}>
                                                            {entry.predicate}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                                <BarChart3 size={48} color="#ddd" style={{ margin: '0 auto 16px' }} />
                                <p style={{ fontWeight: 600, color: '#bbb', fontSize: '15px', margin: '0 0 4px' }}>Belum ada data nilai</p>
                                <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>
                                    Pilih kelas atau mata pelajaran dan klik "Tampilkan"
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Initial state - no filter applied */}
                {!hasFilters && (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        padding: '48px 24px',
                        textAlign: 'center',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(13,110,63,0.08), rgba(200,169,81,0.08))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px',
                        }}>
                            <BarChart3 size={32} color={colors.primary} />
                        </div>
                        <p style={{ fontWeight: 600, color: colors.primaryDark, fontSize: '16px', margin: '0 0 8px' }}>Pilih Filter untuk Melihat Data</p>
                        <p style={{ color: '#999', fontSize: '14px', margin: 0, maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
                            Gunakan filter di atas untuk memilih kelas atau mata pelajaran, lalu klik "Tampilkan" untuk menampilkan rekap nilai.
                        </p>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}

// Stat Card matching dashboard style
function StatCard({
    label,
    value,
    icon: Icon,
    variant = 0
}: {
    label: string;
    value: string | number;
    icon: React.ElementType;
    variant?: number;
}) {
    const iconStyles = [
        { background: 'linear-gradient(135deg, #0d6e3f, #15a060)', color: '#fff' },
        { background: 'linear-gradient(135deg, #c8a951, #e0c76e)', color: '#0a5832' },
        { background: 'linear-gradient(135deg, #0a5832, #0d6e3f)', color: '#c8a951' },
        { background: 'linear-gradient(135deg, #15a060, #0d6e3f)', color: '#fff' },
    ];

    const style = iconStyles[variant % iconStyles.length];

    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '18px',
            boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
            border: '1px solid rgba(13,110,63,0.08)',
        }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: style.background,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '12px',
                boxShadow: '0 4px 12px rgba(13,110,63,0.15)',
            }}>
                <Icon size={18} color={style.color} />
            </div>
            <p style={{ fontSize: '24px', fontWeight: 700, color: colors.primaryDark, margin: 0, lineHeight: 1.2 }}>{value}</p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{label}</p>
        </div>
    );
}
