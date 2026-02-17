import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock, GraduationCap } from 'lucide-react';
import type { FormEventHandler} from 'react';
import { useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Masuk" />

            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                {/* Background Decoration */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-tertiary/5 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="relative w-full max-w-md animate-m3-slide-up">
                    {/* Logo & Branding */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-primary mb-6 shadow-lg">
                            <GraduationCap className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-on-surface">E-Rapor</h1>
                        <p className="text-on-surface-variant mt-2">Sistem Penilaian Digital</p>
                    </div>

                    {/* Login Card */}
                    <div className="m3-card-elevated">
                        <h2 className="text-xl font-semibold text-on-surface mb-6">Masuk ke Akun</h2>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-on-surface-variant">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="m3-input pl-12"
                                        placeholder="nama@sekolah.sch.id"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-on-surface-variant">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="m3-input pl-12 pr-12"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full 
                                                   hover:bg-surface-variant transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5 text-on-surface-variant" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-on-surface-variant" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-destructive">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    role="checkbox"
                                    aria-checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                                        ${data.remember
                                            ? 'bg-primary border-primary'
                                            : 'border-on-surface-variant hover:border-primary'
                                        }`}
                                >
                                    {data.remember && (
                                        <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 12 10">
                                            <polyline
                                                points="1.5 6 4.5 9 10.5 1"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </button>
                                <span className="text-sm text-on-surface-variant">Ingat saya</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full m3-button-filled h-12 text-base mt-2"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                ) : (
                                    'Masuk'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-on-surface-variant mt-8">
                        © 2026 E-Rapor. Sistem Informasi Akademik.
                    </p>
                </div>
            </div>
        </>
    );
}
