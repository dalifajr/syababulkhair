import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Teacher = {
    id: number;
    name: string;
};

type Props = {
    teachers: Teacher[];
    days: string[];
};

const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
};

export default function CreateExtracurricular({ teachers, days }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        teacher_user_id: '' as string | number,
        day: '',
        time_start: '',
        time_end: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/extracurriculars');
    };

    return (
        <AppLayout title="Tambah Ekstrakurikuler" showBack={true} backUrl="/admin/extracurriculars">
            <Head title="Tambah Ekstrakurikuler" />

            <div style={{ padding: '20px 16px 32px', maxWidth: '600px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        padding: '24px',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '1px solid rgba(13,110,63,0.08)',
                    }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, color: colors.primaryDark, marginBottom: '20px' }}>Informasi Ekstrakurikuler</h2>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            <FormField label="Nama *" error={errors.name}>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="contoh: Pramuka, Futsal, dll"
                                    style={inputStyle}
                                />
                            </FormField>

                            <FormField label="Deskripsi" error={errors.description}>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat kegiatan..."
                                    rows={3}
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </FormField>

                            <FormField label="Pembina" error={errors.teacher_user_id}>
                                <select
                                    value={data.teacher_user_id}
                                    onChange={(e) => setData('teacher_user_id', e.target.value)}
                                    style={inputStyle}
                                >
                                    <option value="">Pilih Pembina</option>
                                    {teachers.map((t) => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </FormField>

                            <FormField label="Hari" error={errors.day}>
                                <select
                                    value={data.day}
                                    onChange={(e) => setData('day', e.target.value)}
                                    style={inputStyle}
                                >
                                    <option value="">Pilih Hari</option>
                                    {days.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </FormField>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <FormField label="Jam Mulai" error={errors.time_start}>
                                    <input
                                        type="time"
                                        value={data.time_start}
                                        onChange={(e) => setData('time_start', e.target.value)}
                                        style={inputStyle}
                                    />
                                </FormField>
                                <FormField label="Jam Selesai" error={errors.time_end}>
                                    <input
                                        type="time"
                                        value={data.time_end}
                                        onChange={(e) => setData('time_end', e.target.value)}
                                        style={inputStyle}
                                    />
                                </FormField>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    id="is_active"
                                    style={{ width: '18px', height: '18px', accentColor: colors.primary }}
                                />
                                <label htmlFor="is_active" style={{ fontSize: '14px', color: colors.primaryDark, fontWeight: 500 }}>Aktif</label>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <Link
                            href="/admin/extracurriculars"
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                padding: '12px',
                                borderRadius: '12px',
                                backgroundColor: '#f5f5f5',
                                color: '#666',
                                fontWeight: 600,
                                fontSize: '14px',
                                textDecoration: 'none',
                            }}
                        >
                            <ArrowLeft size={16} />
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                flex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                padding: '12px',
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '14px',
                                border: 'none',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                opacity: processing ? 0.7 : 1,
                                boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                            }}
                        >
                            <Save size={16} />
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

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

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', display: 'block', marginBottom: '6px' }}>{label}</label>
            {children}
            {error && <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{error}</p>}
        </div>
    );
}
