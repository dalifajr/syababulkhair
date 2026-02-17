import { Head, router, useForm } from '@inertiajs/react';
import { Database, Download, Trash2, Upload, HardDrive, Shield, Plus, AlertTriangle } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { useRef, useState } from 'react';

type Backup = {
    name: string;
    size: string;
    date: string;
};

type Props = {
    backups: Backup[];
};

const colors = {
    primary: '#0d6e3f',
    primaryLight: '#15a060',
    primaryDark: '#0a5832',
    gold: '#c8a951',
    goldLight: '#e0c76e',
};

export default function BackupIndex({ backups }: Props) {
    const [showRestore, setShowRestore] = useState(false);
    const [creating, setCreating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const restoreForm = useForm<{ backup_file: File | null }>({ backup_file: null });

    const handleCreate = () => {
        setCreating(true);
        router.post('/admin/backup/create', {}, {
            onFinish: () => setCreating(false),
        });
    };

    const handleDelete = (name: string) => {
        if (confirm(`Hapus backup "${name}"?`)) {
            router.delete(`/admin/backup/${name}`);
        }
    };

    const handleRestoreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!restoreForm.data.backup_file) return;
        if (!confirm('⚠️ PERINGATAN: Restore akan mengganti semua data saat ini. Lanjutkan?')) return;
        restoreForm.post('/admin/backup/restore', {
            onFinish: () => {
                setShowRestore(false);
                restoreForm.reset();
            },
            forceFormData: true,
        });
    };

    return (
        <AppLayout title="Backup & Restore" showBack={true} backUrl="/dashboard">
            <Head title="Backup & Restore" />

            <div style={{ padding: '20px 16px 32px', maxWidth: '800px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                {/* Header Card */}
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
                                <Database size={20} color={colors.goldLight} />
                            </div>
                            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>Backup & Restore</h1>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>
                            Kelola backup database untuk keamanan data
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <button
                        onClick={handleCreate}
                        disabled={creating}
                        style={{
                            padding: '16px',
                            borderRadius: '16px',
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '13px',
                            border: 'none',
                            cursor: creating ? 'not-allowed' : 'pointer',
                            opacity: creating ? 0.7 : 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(13,110,63,0.2)',
                        }}
                    >
                        <Plus size={20} />
                        {creating ? 'Membuat...' : 'Buat Backup'}
                    </button>
                    <button
                        onClick={() => setShowRestore(!showRestore)}
                        style={{
                            padding: '16px',
                            borderRadius: '16px',
                            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
                            color: colors.primaryDark,
                            fontWeight: 600,
                            fontSize: '13px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(200,169,81,0.2)',
                        }}
                    >
                        <Upload size={20} />
                        Restore
                    </button>
                </div>

                {/* Restore Section */}
                {showRestore && (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '20px',
                        boxShadow: '0 2px 12px rgba(13,110,63,0.06)',
                        border: '2px solid rgba(251,146,60,0.3)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <AlertTriangle size={16} color="#ea580c" />
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#ea580c' }}>Restore Database</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
                            Upload file .sql untuk memulihkan database. <strong style={{ color: '#dc2626' }}>Data saat ini akan ditimpa!</strong>
                        </p>
                        <form onSubmit={handleRestoreSubmit}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".sql"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    restoreForm.setData('backup_file', file);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    border: '1.5px solid rgba(13,110,63,0.15)',
                                    fontSize: '14px',
                                    backgroundColor: '#fafafa',
                                    marginBottom: '12px',
                                }}
                            />
                            {restoreForm.errors.backup_file && (
                                <p style={{ fontSize: '12px', color: '#dc2626', marginBottom: '12px' }}>{restoreForm.errors.backup_file}</p>
                            )}
                            <button
                                type="submit"
                                disabled={!restoreForm.data.backup_file || restoreForm.processing}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '12px',
                                    backgroundColor: '#ea580c',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    border: 'none',
                                    cursor: restoreForm.data.backup_file ? 'pointer' : 'not-allowed',
                                    opacity: restoreForm.data.backup_file ? 1 : 0.5,
                                }}
                            >
                                {restoreForm.processing ? 'Memulihkan...' : 'Mulai Restore'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Backups List */}
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
                        gap: '10px',
                    }}>
                        <HardDrive size={18} color={colors.primary} />
                        <h2 style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '15px' }}>
                            Daftar Backup ({backups.length})
                        </h2>
                    </div>

                    {backups.length > 0 ? (
                        <div>
                            {backups.map((backup, idx) => (
                                <div key={backup.name} style={{
                                    padding: '14px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: idx < backups.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: colors.primaryDark, margin: 0, fontSize: '13px' }}>{backup.name}</p>
                                        <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>
                                            {backup.size} • {backup.date}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <a
                                            href={`/admin/backup/download/${backup.name}`}
                                            style={{
                                                width: '34px', height: '34px', borderRadius: '10px',
                                                backgroundColor: 'rgba(13,110,63,0.08)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <Download size={14} color={colors.primary} />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(backup.name)}
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
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                            <Shield size={48} color="#ddd" style={{ margin: '0 auto 16px' }} />
                            <p style={{ fontWeight: 600, color: '#bbb', fontSize: '15px', margin: '0 0 4px' }}>Belum ada backup</p>
                            <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>
                                Klik "Buat Backup" untuk membuat backup pertama.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
