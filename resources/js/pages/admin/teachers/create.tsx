import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

export default function TeacherCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'teacher',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/teachers');
    };

    return (
        <AppLayout title="Tambah Guru" showBack={true} backUrl="/admin/teachers">
            <Head title="Tambah Guru/Staff" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="m3-input mt-2"
                                required
                            />
                            {errors.name && <p className="text-sm text-destructive mt-2">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="m3-input mt-2"
                                required
                            />
                            {errors.email && <p className="text-sm text-destructive mt-2">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="m3-input mt-2"
                                required
                            />
                            {errors.password && <p className="text-sm text-destructive mt-2">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Konfirmasi Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="m3-input mt-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Role</label>
                            <div className="flex gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setData('role', 'teacher')}
                                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${data.role === 'teacher'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                                        }`}
                                >
                                    Guru
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('role', 'admin')}
                                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${data.role === 'admin'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                                        }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full m3-button-filled h-12"
                    >
                        {processing ? (
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Simpan
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
