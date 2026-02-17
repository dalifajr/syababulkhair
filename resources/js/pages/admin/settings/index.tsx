import { Head, useForm } from '@inertiajs/react';
import { Building2, Save, Globe, Mail, Phone, MapPin, UserSquare } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';

type Settings = {
    id?: number;
    name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    principal_name: string | null;
    npsn: string | null;
    letterhead_enabled?: boolean | null;
    letterhead_line1?: string | null;
    letterhead_line2?: string | null;
    letterhead_line3?: string | null;
    logo_path?: string | null;
} | null;

type Props = {
    settings: Settings;
};

export default function SettingsIndex({ settings }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: settings?.name || '',
        address: settings?.address || '',
        phone: settings?.phone || '',
        email: settings?.email || '',
        website: settings?.website || '',
        principal_name: settings?.principal_name || '',
        npsn: settings?.npsn || '',
        letterhead_enabled: settings?.letterhead_enabled || false,
        letterhead_line1: settings?.letterhead_line1 || '',
        letterhead_line2: settings?.letterhead_line2 || '',
        letterhead_line3: settings?.letterhead_line3 || '',
        logo: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/settings', { forceFormData: true });
    };

    return (
        <AppLayout title="Pengaturan Sekolah" showBack={true} backUrl="/dashboard">
            <Head title="Pengaturan Sekolah" />

            <div className="m3-container py-6">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                    {/* Header Card */}
                    <div className="m3-card-elevated bg-gradient-to-br from-primary/5 to-tertiary/5 text-center py-6">
                        <div className="w-16 h-16 mx-auto bg-surface-variant rounded-2xl flex items-center justify-center mb-3">
                            <Building2 className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold text-on-surface">Profil Sekolah</h2>
                        <p className="text-sm text-on-surface-variant mt-1">Kelola informasi identitas sekolah</p>
                    </div>

                    <div className="m3-card-elevated space-y-5">
                        <div>
                            <label className="text-sm font-medium text-on-surface-variant">Nama Sekolah</label>
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
                            <label className="text-sm font-medium text-on-surface-variant">Nomor Pokok Sekolah Nasional (NPSN)</label>
                            <input
                                type="text"
                                value={data.npsn}
                                onChange={(e) => setData('npsn', e.target.value)}
                                className="m3-input mt-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                                <UserSquare className="w-4 h-4" /> Kepala Sekolah
                            </label>
                            <input
                                type="text"
                                value={data.principal_name}
                                onChange={(e) => setData('principal_name', e.target.value)}
                                className="m3-input mt-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Alamat
                            </label>
                            <textarea
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                rows={3}
                                className="w-full mt-2 p-3 rounded-xl border-0 bg-surface-container-highest text-on-surface shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Telepon
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="m3-input mt-2"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="m3-input mt-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Website
                            </label>
                            <input
                                type="url"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                placeholder="https://"
                                className="m3-input mt-2"
                            />
                        </div>

                        <div className="pt-4 border-t border-border/60">
                            <h3 className="text-sm font-semibold text-on-surface">Kop Surat (Untuk Print Rapor)</h3>
                            <p className="text-xs text-on-surface-variant mt-1">
                                Aktifkan agar mode print memakai kop surat custom.
                            </p>

                            <label className="flex items-center gap-3 mt-4">
                                <input
                                    type="checkbox"
                                    checked={!!data.letterhead_enabled}
                                    onChange={(e) => setData('letterhead_enabled', e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm text-on-surface">Aktifkan kop surat</span>
                            </label>

                            <div className="grid grid-cols-1 gap-4 mt-4">
                                <div>
                                    <label className="text-sm font-medium text-on-surface-variant">Baris 1</label>
                                    <input
                                        type="text"
                                        value={data.letterhead_line1}
                                        onChange={(e) => setData('letterhead_line1', e.target.value)}
                                        placeholder={data.name || 'Nama sekolah'}
                                        className="m3-input mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-on-surface-variant">Baris 2</label>
                                    <input
                                        type="text"
                                        value={data.letterhead_line2}
                                        onChange={(e) => setData('letterhead_line2', e.target.value)}
                                        placeholder="Alamat / Kecamatan / Kabupaten"
                                        className="m3-input mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-on-surface-variant">Baris 3</label>
                                    <input
                                        type="text"
                                        value={data.letterhead_line3}
                                        onChange={(e) => setData('letterhead_line3', e.target.value)}
                                        placeholder="Telepon / Email / Website"
                                        className="m3-input mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-on-surface-variant">Logo (opsional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('logo', e.target.files?.[0] ?? null)}
                                        className="block w-full mt-2 text-sm"
                                    />
                                    <p className="text-xs text-on-surface-variant mt-1">
                                        Disarankan PNG/JPG, maks 2MB.
                                    </p>
                                </div>
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
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
