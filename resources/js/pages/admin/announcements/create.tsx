import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Megaphone } from 'lucide-react';
import AppLayout from '@/layouts/mobile-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ANNOUNCEMENT_TYPES, ANNOUNCEMENT_AUDIENCES } from '@/types/academic';

type Props = {};

export default function AnnouncementCreate({}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        type: 'general' as keyof typeof ANNOUNCEMENT_TYPES,
        target_audience: 'all' as keyof typeof ANNOUNCEMENT_AUDIENCES,
        is_published: false,
        published_at: '',
        expires_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/announcements');
    };

    return (
        <AppLayout title="Buat Pengumuman" showBack={true} backUrl="/admin/announcements">
            <Head title="Buat Pengumuman" />

            <div className="m3-container py-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Pengumuman</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Masukkan judul pengumuman"
                            className={errors.title ? 'border-destructive' : ''}
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                    </div>

                    {/* Type */}
                    <div className="space-y-2">
                        <Label>Tipe Pengumuman</Label>
                        <Select value={data.type} onValueChange={(v) => setData('type', v as keyof typeof ANNOUNCEMENT_TYPES)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(ANNOUNCEMENT_TYPES).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-2">
                        <Label>Target Penerima</Label>
                        <Select value={data.target_audience} onValueChange={(v) => setData('target_audience', v as keyof typeof ANNOUNCEMENT_AUDIENCES)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih target" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(ANNOUNCEMENT_AUDIENCES).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.target_audience && <p className="text-sm text-destructive">{errors.target_audience}</p>}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <Label htmlFor="content">Isi Pengumuman</Label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Tulis isi pengumuman..."
                            rows={8}
                            className={errors.content ? 'border-destructive' : ''}
                        />
                        {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                    </div>

                    {/* Published At */}
                    <div className="space-y-2">
                        <Label htmlFor="published_at">Tanggal Publikasi</Label>
                        <Input
                            id="published_at"
                            type="datetime-local"
                            value={data.published_at}
                            onChange={(e) => setData('published_at', e.target.value)}
                        />
                        {errors.published_at && <p className="text-sm text-destructive">{errors.published_at}</p>}
                    </div>

                    {/* Expires At */}
                    <div className="space-y-2">
                        <Label htmlFor="expires_at">Tanggal Kedaluwarsa (Opsional)</Label>
                        <Input
                            id="expires_at"
                            type="datetime-local"
                            value={data.expires_at}
                            onChange={(e) => setData('expires_at', e.target.value)}
                        />
                        {errors.expires_at && <p className="text-sm text-destructive">{errors.expires_at}</p>}
                    </div>

                    {/* Is Published */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label>Publikasikan Sekarang</Label>
                            <p className="text-sm text-muted-foreground">Pengumuman akan langsung terlihat</p>
                        </div>
                        <Switch
                            checked={data.is_published}
                            onCheckedChange={(checked) => setData('is_published', checked)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="m3-button-filled w-full"
                    >
                        <Save className="w-5 h-5" />
                        {processing ? 'Menyimpan...' : 'Simpan Pengumuman'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
