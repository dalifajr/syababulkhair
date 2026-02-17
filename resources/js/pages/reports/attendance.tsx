import { Head, router } from '@inertiajs/react';
import { BarChart3, Users, CheckCircle, XCircle, AlertTriangle, Clock, Filter } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useState } from 'react';

type ClassGroup = { id: number; name: string; level?: string };
type Term = { id: number; name: string; academic_year?: { name: string } } | null;

type StudentAttendance = {
    student_id: number;
    student_name: string;
    nis: string;
    total: number;
    present: number;
    absent: number;
    sick: number;
    permit: number;
    present_pct: number;
};

type Overview = {
    total_records: number;
    present: number;
    absent: number;
    sick: number;
    permit: number;
    present_pct: number;
    total_students: number;
} | null;

type Props = {
    activeTerm: Term;
    classGroups: ClassGroup[];
    studentData: StudentAttendance[];
    overview: Overview;
    filters: { class_group_id: string | null };
};

const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
    goldLight: '#e0c76e',
};

function getPresenceColor(pct: number) {
    if (pct >= 90) return { bg: 'rgba(13,110,63,0.12)', color: colors.primary, label: 'Sangat Baik' };
    if (pct >= 75) return { bg: 'rgba(200,169,81,0.15)', color: '#9a7d2e', label: 'Baik' };
    if (pct >= 60) return { bg: 'rgba(251,146,60,0.12)', color: '#ea580c', label: 'Cukup' };
    return { bg: 'rgba(239,68,68,0.12)', color: '#dc2626', label: 'Kurang' };
}

export default function AttendanceAnalytics({ activeTerm, classGroups, studentData = [], overview, filters }: Props) {
    const [classGroupId, setClassGroupId] = useState(filters?.class_group_id || '');

    const handleFilter = () => {
        if (!classGroupId) return;
        router.get('/reports/attendance', { class_group_id: classGroupId }, { preserveState: true });
    };

    const hasData = studentData.length > 0;
    const hasFilters = !!filters?.class_group_id;

    return (
        <AppLayout title="Rekap Kehadiran" showBack={true} backUrl="/dashboard">
            <Head title="Rekap Kehadiran" />

            <div style={{ padding: '20px 16px 32px', maxWidth: '1000px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                {/* Header */}
                <div style={{
                    background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 60%, ${colors.primaryLight} 100%)`,
                    borderRadius: '24px',
                    padding: '24px',
                    marginBottom: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(13,110,63,0.25)',
                }}>
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(200,169,81,0.12)', filter: 'blur(40px)' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: 'rgba(200,169,81,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Users size={20} color={colors.goldLight} />
                            </div>
                            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>Rekap Kehadiran</h1>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>
                            {activeTerm?.name || 'Semester'} • {activeTerm?.academic_year?.name || 'Tahun Ajaran'}
                        </p>
                    </div>
                </div>

                {/* Filter */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                    border: '1px solid rgba(13,110,63,0.08)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <Filter size={16} color={colors.primary} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: colors.primaryDark }}>FILTER</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '180px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', display: 'block', marginBottom: '6px' }}>Kelas</label>
                            <select
                                value={classGroupId}
                                onChange={(e) => setClassGroupId(e.target.value)}
                                style={{
                                    width: '100%', padding: '10px 14px', borderRadius: '12px',
                                    border: '1.5px solid rgba(13,110,63,0.15)', fontSize: '14px',
                                    backgroundColor: '#fafafa', outline: 'none', cursor: 'pointer',
                                }}
                            >
                                <option value="">Pilih Kelas</option>
                                {classGroups.map((cg) => (
                                    <option key={cg.id} value={cg.id}>{cg.level ? `${cg.level} ` : ''}{cg.name}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleFilter} style={{
                            padding: '10px 24px', borderRadius: '12px',
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                            color: '#fff', fontWeight: 600, fontSize: '14px', border: 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                            boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                        }}>
                            <BarChart3 size={16} /> Tampilkan
                        </button>
                    </div>
                </div>

                {/* Overview Stats */}
                {overview && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
                            {[
                                { label: 'Kehadiran', value: `${overview.present_pct}%`, icon: CheckCircle, color: colors.primary },
                                { label: 'Hadir', value: overview.present, icon: CheckCircle, color: colors.primary },
                                { label: 'Alpha', value: overview.absent, icon: XCircle, color: '#dc2626' },
                                { label: 'Sakit', value: overview.sick, icon: AlertTriangle, color: '#ea580c' },
                                { label: 'Izin', value: overview.permit, icon: Clock, color: '#2563eb' },
                            ].map(({ label, value, icon: Icon, color }) => (
                                <div key={label} style={{
                                    backgroundColor: '#fff', borderRadius: '16px', padding: '14px',
                                    boxShadow: '0 2px 12px rgba(13,110,63,0.06)', border: '1px solid rgba(13,110,63,0.08)',
                                    textAlign: 'center',
                                }}>
                                    <Icon size={20} color={color} style={{ margin: '0 auto 8px' }} />
                                    <p style={{ fontSize: '20px', fontWeight: 700, color: colors.primaryDark, margin: 0 }}>{value}</p>
                                    <p style={{ fontSize: '11px', color: '#888', margin: '2px 0 0' }}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Student Table */}
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
                            display: 'flex', alignItems: 'center', gap: '10px',
                        }}>
                            <Users size={18} color={colors.primary} />
                            <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>
                                Per Siswa ({studentData.length})
                            </h2>
                        </div>

                        {hasData ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: 'rgba(13,110,63,0.04)' }}>
                                            <th style={thStyle}>NIS</th>
                                            <th style={thStyle}>NAMA SISWA</th>
                                            <th style={{ ...thStyle, textAlign: 'center' }}>HADIR</th>
                                            <th style={{ ...thStyle, textAlign: 'center' }}>ALPHA</th>
                                            <th style={{ ...thStyle, textAlign: 'center' }}>SAKIT</th>
                                            <th style={{ ...thStyle, textAlign: 'center' }}>IZIN</th>
                                            <th style={{ ...thStyle, textAlign: 'center' }}>% HADIR</th>
                                            <th style={{ ...thStyle, textAlign: 'center' }}>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((s, idx) => {
                                            const pColor = getPresenceColor(s.present_pct);
                                            return (
                                                <tr key={s.student_id} style={{
                                                    borderBottom: idx < studentData.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                                }}>
                                                    <td style={{ padding: '12px 16px', color: '#666', whiteSpace: 'nowrap' }}>{s.nis}</td>
                                                    <td style={{ padding: '12px 16px', fontWeight: 500, color: colors.primaryDark, whiteSpace: 'nowrap' }}>{s.student_name}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: colors.primary }}>{s.present}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: s.absent > 0 ? '#dc2626' : '#ccc' }}>{s.absent}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: s.sick > 0 ? '#ea580c' : '#ccc' }}>{s.sick}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: s.permit > 0 ? '#2563eb' : '#ccc' }}>{s.permit}</td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                                        {/* Progress bar */}
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                                            <div style={{ width: '60px', height: '6px', borderRadius: '3px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                                                                <div style={{
                                                                    width: `${s.present_pct}%`,
                                                                    height: '100%',
                                                                    borderRadius: '3px',
                                                                    backgroundColor: pColor.color,
                                                                    transition: 'width 0.6s ease',
                                                                }} />
                                                            </div>
                                                            <span style={{ fontSize: '12px', fontWeight: 700, color: pColor.color, minWidth: '36px' }}>{s.present_pct}%</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                                        <span style={{
                                                            padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
                                                            backgroundColor: pColor.bg, color: pColor.color,
                                                        }}>{pColor.label}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                                <Users size={48} color="#ddd" style={{ margin: '0 auto 16px' }} />
                                <p style={{ fontWeight: 600, color: '#bbb', fontSize: '15px', margin: '0 0 4px' }}>Belum ada data kehadiran</p>
                                <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>Pilih kelas dan klik "Tampilkan"</p>
                            </div>
                        )}
                    </div>
                )}

                {!hasFilters && (
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '20px', padding: '48px 24px', textAlign: 'center',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)', border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(13,110,63,0.08), rgba(200,169,81,0.08))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px',
                        }}>
                            <Users size={32} color={colors.primary} />
                        </div>
                        <p style={{ fontWeight: 600, color: colors.primaryDark, fontSize: '16px', margin: '0 0 8px' }}>Pilih Kelas</p>
                        <p style={{ color: '#999', fontSize: '14px', margin: 0, maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
                            Pilih kelas di atas lalu klik "Tampilkan" untuk melihat rekap kehadiran siswa.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

const thStyle: React.CSSProperties = {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: 600,
    color: '#0a5832',
    fontSize: '12px',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
};
