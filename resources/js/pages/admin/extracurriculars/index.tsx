import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Users, Clock, Calendar, Award } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Teacher = {
    id: number;
    name: string;
};

type Extracurricular = {
    id: number;
    name: string;
    description: string | null;
    teacher_user_id: number | null;
    teacher: Teacher | null;
    day: string | null;
    time_start: string | null;
    time_end: string | null;
    is_active: boolean;
    enrollments_count: number;
};

type Props = {
    extracurriculars: Extracurricular[];
};

const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
    goldLight: '#e0c76e',
};

export default function ExtracurricularsIndex({ extracurriculars }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus ekstrakurikuler "${name}"?`)) {
            router.delete(`/admin/extracurriculars/${id}`);
        }
    };

    return (
        <AppLayout title="Ekstrakurikuler" showBack={true} backUrl="/dashboard">
            <Head title="Ekstrakurikuler" />

            <div style={{ padding: '20px 16px 32px', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: 700, color: colors.primaryDark, margin: 0 }}>Ekstrakurikuler</h1>
                        <p style={{ fontSize: '13px', color: '#888', margin: '4px 0 0' }}>{extracurriculars.length} kegiatan</p>
                    </div>
                    <Link
                        href="/admin/extracurriculars/create"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '10px 18px',
                            borderRadius: '12px',
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                        }}
                    >
                        <Plus size={16} />
                        Tambah
                    </Link>
                </div>

                {/* List */}
                {extracurriculars.length > 0 ? (
                    <div style={{ display: 'grid', gap: '12px' }}>
                        {extracurriculars.map((ekskul) => (
                            <div
                                key={ekskul.id}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    padding: '18px 20px',
                                    boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                                    border: '1px solid rgba(13,110,63,0.08)',
                                    opacity: ekskul.is_active ? 1 : 0.6,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <h3 style={{ fontSize: '15px', fontWeight: 600, color: colors.primaryDark, margin: 0 }}>{ekskul.name}</h3>
                                            {!ekskul.is_active && (
                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: 600,
                                                    padding: '2px 8px',
                                                    borderRadius: '6px',
                                                    backgroundColor: 'rgba(239,68,68,0.1)',
                                                    color: '#dc2626',
                                                }}>Nonaktif</span>
                                            )}
                                        </div>
                                        {ekskul.description && (
                                            <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0', lineHeight: 1.5 }}>{ekskul.description}</p>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <Link
                                            href={`/admin/extracurriculars/${ekskul.id}/edit`}
                                            style={{
                                                width: '34px', height: '34px', borderRadius: '10px',
                                                backgroundColor: 'rgba(13,110,63,0.08)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <Edit size={14} color={colors.primary} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(ekskul.id, ekskul.name)}
                                            style={{
                                                width: '34px', height: '34px', borderRadius: '10px',
                                                backgroundColor: 'rgba(239,68,68,0.08)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: 'none', cursor: 'pointer',
                                            }}
                                        >
                                            <Trash2 size={14} color="#dc2626" />
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#888' }}>
                                    {ekskul.teacher && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Users size={12} color={colors.gold} />
                                            {ekskul.teacher.name}
                                        </span>
                                    )}
                                    {ekskul.day && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={12} color={colors.primary} />
                                            {ekskul.day}
                                        </span>
                                    )}
                                    {ekskul.time_start && ekskul.time_end && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} color={colors.primary} />
                                            {ekskul.time_start?.slice(0, 5)} - {ekskul.time_end?.slice(0, 5)}
                                        </span>
                                    )}
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Award size={12} color={colors.gold} />
                                        {ekskul.enrollments_count} siswa
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        padding: '48px 24px',
                        textAlign: 'center',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <Award size={48} color="#ddd" style={{ margin: '0 auto 16px' }} />
                        <p style={{ fontWeight: 600, color: '#bbb', fontSize: '15px', margin: '0 0 4px' }}>Belum ada ekstrakurikuler</p>
                        <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>
                            Klik tombol "Tambah" untuk menambahkan kegiatan ekstrakurikuler baru.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
