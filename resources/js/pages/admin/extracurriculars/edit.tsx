import { Head, useForm, Link, router } from '@inertiajs/react';
import { Save, ArrowLeft, UserPlus, Trash2, Award } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useState } from 'react';

type Teacher = { id: number; name: string };
type Student = { id: number; name: string; nis: string };
type Term = { id: number; name: string } | null;

type Enrollment = {
    id: number;
    student_id: number;
    student: Student;
    grade: string | null;
    description: string | null;
};

type Extracurricular = {
    id: number;
    name: string;
    description: string | null;
    teacher_user_id: number | null;
    day: string | null;
    time_start: string | null;
    time_end: string | null;
    is_active: boolean;
};

type Props = {
    extracurricular: Extracurricular;
    teachers: Teacher[];
    days: string[];
    enrollments: Enrollment[];
    availableStudents: Student[];
    activeTerm: Term;
};

const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1.5px solid rgba(13,110,63,0.15)',
    fontSize: '14px',
    backgroundColor: '#fafafa',
    outline: 'none',
    boxSizing: 'border-box',
};

export default function EditExtracurricular({ extracurricular, teachers, days, enrollments, availableStudents, activeTerm }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: extracurricular.name,
        description: extracurricular.description || '',
        teacher_user_id: extracurricular.teacher_user_id || ('' as string | number),
        day: extracurricular.day || '',
        time_start: extracurricular.time_start?.slice(0, 5) || '',
        time_end: extracurricular.time_end?.slice(0, 5) || '',
        is_active: extracurricular.is_active,
    });

    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [editingEnrollment, setEditingEnrollment] = useState<number | null>(null);
    const [enrollmentGrade, setEnrollmentGrade] = useState('');
    const [enrollmentDesc, setEnrollmentDesc] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/extracurriculars/${extracurricular.id}`);
    };

    const handleEnroll = () => {
        if (selectedStudents.length === 0) return;
        router.post(`/admin/extracurriculars/${extracurricular.id}/enroll`, {
            student_ids: selectedStudents,
        }, {
            preserveState: false,
        });
    };

    const handleUpdateEnrollment = (enrollmentId: number) => {
        router.put(`/admin/extracurricular-enrollments/${enrollmentId}`, {
            grade: enrollmentGrade,
            description: enrollmentDesc,
        }, {
            preserveState: false,
            onSuccess: () => setEditingEnrollment(null),
        });
    };

    const handleRemoveEnrollment = (enrollmentId: number) => {
        if (confirm('Keluarkan siswa ini dari ekstrakurikuler?')) {
            router.delete(`/admin/extracurricular-enrollments/${enrollmentId}`, { preserveState: false });
        }
    };

    const toggleSelectStudent = (id: number) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    return (
        <AppLayout title="Edit Ekstrakurikuler" showBack={true} backUrl="/admin/extracurriculars">
            <Head title={`Edit ${extracurricular.name}`} />

            <div style={{ padding: '20px 16px 32px', maxWidth: '800px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                {/* Edit Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        padding: '24px',
                        marginBottom: '20px',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, color: colors.primaryDark, marginBottom: '20px' }}>Informasi Ekstrakurikuler</h2>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            <FormField label="Nama *" error={errors.name}>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} style={inputStyle} />
                            </FormField>

                            <FormField label="Deskripsi" error={errors.description}>
                                <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                            </FormField>

                            <FormField label="Pembina" error={errors.teacher_user_id}>
                                <select value={data.teacher_user_id} onChange={(e) => setData('teacher_user_id', e.target.value)} style={inputStyle}>
                                    <option value="">Pilih Pembina</option>
                                    {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </FormField>

                            <FormField label="Hari" error={errors.day}>
                                <select value={data.day} onChange={(e) => setData('day', e.target.value)} style={inputStyle}>
                                    <option value="">Pilih Hari</option>
                                    {days.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </FormField>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <FormField label="Jam Mulai" error={errors.time_start}>
                                    <input type="time" value={data.time_start} onChange={(e) => setData('time_start', e.target.value)} style={inputStyle} />
                                </FormField>
                                <FormField label="Jam Selesai" error={errors.time_end}>
                                    <input type="time" value={data.time_end} onChange={(e) => setData('time_end', e.target.value)} style={inputStyle} />
                                </FormField>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} id="is_active" style={{ width: '18px', height: '18px', accentColor: colors.primary }} />
                                <label htmlFor="is_active" style={{ fontSize: '14px', color: colors.primaryDark, fontWeight: 500 }}>Aktif</label>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <Link href="/admin/extracurriculars" style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                padding: '12px', borderRadius: '12px', backgroundColor: '#f5f5f5', color: '#666',
                                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                            }}>
                                <ArrowLeft size={16} /> Batal
                            </Link>
                            <button type="submit" disabled={processing} style={{
                                flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                padding: '12px', borderRadius: '12px',
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                                color: '#fff', fontWeight: 600, fontSize: '14px', border: 'none',
                                cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1,
                                boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                            }}>
                                <Save size={16} /> {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Enrollment Management */}
                {activeTerm && (
                    <>
                        {/* Current Enrollments */}
                        <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            marginBottom: '20px',
                            boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                            border: '1px solid rgba(13,110,63,0.08)',
                        }}>
                            <div style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid rgba(13,110,63,0.06)',
                                display: 'flex', alignItems: 'center', gap: '10px',
                            }}>
                                <Award size={18} color={colors.gold} />
                                <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>
                                    Siswa Terdaftar ({enrollments.length})
                                </h2>
                            </div>

                            {enrollments.length > 0 ? (
                                <div>
                                    {enrollments.map((e, idx) => (
                                        <div key={e.id} style={{
                                            padding: '14px 20px',
                                            borderBottom: idx < enrollments.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <div>
                                                    <p style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '14px' }}>{e.student.name}</p>
                                                    <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>NIS: {e.student.nis}</p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                    {e.grade && (
                                                        <span style={{
                                                            padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                                                            backgroundColor: 'rgba(13,110,63,0.1)', color: colors.primary,
                                                        }}>
                                                            {e.grade}
                                                        </span>
                                                    )}
                                                    <button onClick={() => {
                                                        setEditingEnrollment(editingEnrollment === e.id ? null : e.id);
                                                        setEnrollmentGrade(e.grade || '');
                                                        setEnrollmentDesc(e.description || '');
                                                    }} style={{
                                                        padding: '4px 10px', borderRadius: '8px', fontSize: '11px',
                                                        backgroundColor: 'rgba(13,110,63,0.08)', color: colors.primary,
                                                        border: 'none', cursor: 'pointer', fontWeight: 600,
                                                    }}>
                                                        {editingEnrollment === e.id ? 'Batal' : 'Nilai'}
                                                    </button>
                                                    <button onClick={() => handleRemoveEnrollment(e.id)} style={{
                                                        width: '28px', height: '28px', borderRadius: '8px',
                                                        backgroundColor: 'rgba(239,68,68,0.08)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        border: 'none', cursor: 'pointer',
                                                    }}>
                                                        <Trash2 size={12} color="#dc2626" />
                                                    </button>
                                                </div>
                                            </div>

                                            {editingEnrollment === e.id && (
                                                <div style={{
                                                    padding: '12px', backgroundColor: '#fafafa', borderRadius: '12px',
                                                    display: 'grid', gap: '10px',
                                                }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                                                        <div>
                                                            <label style={{ fontSize: '11px', fontWeight: 600, color: '#888' }}>Nilai</label>
                                                            <select value={enrollmentGrade} onChange={(e) => setEnrollmentGrade(e.target.value)}
                                                                style={{ ...inputStyle, padding: '8px 12px', fontSize: '13px' }}>
                                                                <option value="">-</option>
                                                                {['A', 'B', 'C', 'D', 'E'].map((g) => <option key={g} value={g}>{g}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '11px', fontWeight: 600, color: '#888' }}>Keterangan</label>
                                                            <input type="text" value={enrollmentDesc} onChange={(e) => setEnrollmentDesc(e.target.value)}
                                                                placeholder="Catatan singkat..." style={{ ...inputStyle, padding: '8px 12px', fontSize: '13px' }} />
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleUpdateEnrollment(e.id)} style={{
                                                        padding: '8px', borderRadius: '10px',
                                                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                                                        color: '#fff', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer',
                                                    }}>
                                                        Simpan Nilai
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                                    <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>Belum ada siswa terdaftar</p>
                                </div>
                            )}
                        </div>

                        {/* Add Students */}
                        {availableStudents.length > 0 && (
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
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <UserPlus size={18} color={colors.primary} />
                                        <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>Tambah Siswa</h2>
                                    </div>
                                    {selectedStudents.length > 0 && (
                                        <button onClick={handleEnroll} style={{
                                            padding: '8px 16px', borderRadius: '10px',
                                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                                            color: '#fff', fontWeight: 600, fontSize: '12px', border: 'none', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                                        }}>
                                            <UserPlus size={14} />
                                            Daftarkan ({selectedStudents.length})
                                        </button>
                                    )}
                                </div>
                                <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                                    {availableStudents.map((s, idx) => (
                                        <div key={s.id} onClick={() => toggleSelectStudent(s.id)} style={{
                                            padding: '12px 20px',
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            borderBottom: idx < availableStudents.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                            cursor: 'pointer',
                                            backgroundColor: selectedStudents.includes(s.id) ? 'rgba(13,110,63,0.04)' : 'transparent',
                                            transition: 'background-color 0.2s',
                                        }}>
                                            <input type="checkbox" checked={selectedStudents.includes(s.id)} readOnly
                                                style={{ width: '16px', height: '16px', accentColor: colors.primary }} />
                                            <div>
                                                <p style={{ fontWeight: 500, color: colors.primaryDark, margin: 0, fontSize: '13px' }}>{s.name}</p>
                                                <p style={{ fontSize: '11px', color: '#999', margin: '2px 0 0' }}>NIS: {s.nis}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', display: 'block', marginBottom: '6px' }}>{label}</label>
            {children}
            {error && <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{error}</p>}
        </div>
    );
}
