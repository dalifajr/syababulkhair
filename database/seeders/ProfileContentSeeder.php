<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfileContent;

class ProfileContentSeeder extends Seeder
{
    public function run(): void
    {
        $contents = [
            // Hero Section
            ['section' => 'hero', 'key' => 'hero_subtitle', 'type' => 'text', 'label' => 'Sub-judul Hero', 'value' => "Rumah Qur'an", 'sort_order' => 1],
            ['section' => 'hero', 'key' => 'hero_title', 'type' => 'text', 'label' => 'Judul Hero', 'value' => 'Yayasan RQ Syababul Khair', 'sort_order' => 2],
            ['section' => 'hero', 'key' => 'hero_description', 'type' => 'textarea', 'label' => 'Deskripsi Hero', 'value' => "Membentuk Generasi Qur'ani yang Berakhlak Mulia, Berwawasan Luas, dan Bermanfaat bagi Umat", 'sort_order' => 3],
            ['section' => 'hero', 'key' => 'hero_background', 'type' => 'image', 'label' => 'Background Hero', 'value' => '/images/yayasan-foto-1.jpg', 'sort_order' => 4],
            ['section' => 'hero', 'key' => 'hero_logo', 'type' => 'logo', 'label' => 'Logo Yayasan', 'value' => '/images/yayasan-logo.png', 'sort_order' => 5],

            // About Section
            ['section' => 'about', 'key' => 'about_title', 'type' => 'text', 'label' => 'Judul Tentang', 'value' => "Rumah Qur'an Syababul Khair", 'sort_order' => 1],
            ['section' => 'about', 'key' => 'about_text_1', 'type' => 'textarea', 'label' => 'Paragraf 1', 'value' => "Yayasan RQ Syababul Khair adalah lembaga pendidikan Al-Qur'an yang berdedikasi dalam membina dan mendidik generasi muda untuk mencintai dan memahami Al-Qur'an. Berlokasi di Sungai Pinang, Sumatera Selatan, yayasan ini menjalankan berbagai program kegiatan keislaman.", 'sort_order' => 2],
            ['section' => 'about', 'key' => 'about_text_2', 'type' => 'textarea', 'label' => 'Paragraf 2', 'value' => "Dengan semangat kebersamaan dan keikhlasan, kami mengajak seluruh elemen masyarakat untuk bersinergi dalam mencetak generasi Qur'ani yang berakhlak mulia dan berwawasan luas.", 'sort_order' => 3],
            ['section' => 'about', 'key' => 'about_image', 'type' => 'image', 'label' => 'Foto Tentang', 'value' => '/images/yayasan-foto-2.jpg', 'sort_order' => 4],
            ['section' => 'about', 'key' => 'about_stat_santri', 'type' => 'text', 'label' => 'Jumlah Santri', 'value' => '50+', 'sort_order' => 5],
            ['section' => 'about', 'key' => 'about_stat_pengajar', 'type' => 'text', 'label' => 'Jumlah Pengajar', 'value' => '5+', 'sort_order' => 6],

            // Visi Misi
            ['section' => 'visi_misi', 'key' => 'visi_text', 'type' => 'textarea', 'label' => 'Teks Visi', 'value' => "Menjadi lembaga pendidikan Al-Qur'an yang unggul dalam membentuk generasi Qur'ani yang berakhlak mulia, berwawasan luas, dan mampu memberikan kontribusi positif bagi masyarakat dan bangsa berdasarkan nilai-nilai Islam.", 'sort_order' => 1],
            ['section' => 'visi_misi', 'key' => 'misi_1', 'type' => 'textarea', 'label' => 'Misi 1', 'value' => "Menyelenggarakan pendidikan Al-Qur'an yang berkualitas dan terstruktur.", 'sort_order' => 2],
            ['section' => 'visi_misi', 'key' => 'misi_2', 'type' => 'textarea', 'label' => 'Misi 2', 'value' => "Menanamkan nilai-nilai akhlak mulia dalam setiap aspek pembelajaran.", 'sort_order' => 3],
            ['section' => 'visi_misi', 'key' => 'misi_3', 'type' => 'textarea', 'label' => 'Misi 3', 'value' => "Mengembangkan potensi anak didik sesuai dengan bakat dan minatnya.", 'sort_order' => 4],
            ['section' => 'visi_misi', 'key' => 'misi_4', 'type' => 'textarea', 'label' => 'Misi 4', 'value' => "Membangun sinergi dengan masyarakat dalam dakwah dan pendidikan Islam.", 'sort_order' => 5],
            ['section' => 'visi_misi', 'key' => 'misi_5', 'type' => 'textarea', 'label' => 'Misi 5', 'value' => "Menyediakan sarana dan prasarana yang mendukung kegiatan belajar mengajar.", 'sort_order' => 6],

            // Programs
            ['section' => 'programs', 'key' => 'program_1_title', 'type' => 'text', 'label' => 'Program 1 - Judul', 'value' => "Tahsin Al-Qur'an", 'sort_order' => 1],
            ['section' => 'programs', 'key' => 'program_1_desc', 'type' => 'textarea', 'label' => 'Program 1 - Deskripsi', 'value' => "Program perbaikan bacaan Al-Qur'an dengan metode yang mudah dan menyenangkan.", 'sort_order' => 2],
            ['section' => 'programs', 'key' => 'program_2_title', 'type' => 'text', 'label' => 'Program 2 - Judul', 'value' => "Tahfidz Al-Qur'an", 'sort_order' => 3],
            ['section' => 'programs', 'key' => 'program_2_desc', 'type' => 'textarea', 'label' => 'Program 2 - Deskripsi', 'value' => "Program hafalan Al-Qur'an dengan target dan bimbingan khusus dari ustadz/ustadzah.", 'sort_order' => 4],
            ['section' => 'programs', 'key' => 'program_3_title', 'type' => 'text', 'label' => 'Program 3 - Judul', 'value' => "Pembinaan Akhlak", 'sort_order' => 5],
            ['section' => 'programs', 'key' => 'program_3_desc', 'type' => 'textarea', 'label' => 'Program 3 - Deskripsi', 'value' => "Pembinaan karakter dan akhlak mulia berbasis nilai-nilai Islam bagi anak-anak.", 'sort_order' => 6],
            ['section' => 'programs', 'key' => 'program_4_title', 'type' => 'text', 'label' => 'Program 4 - Judul', 'value' => "Pengajian Rutin", 'sort_order' => 7],
            ['section' => 'programs', 'key' => 'program_4_desc', 'type' => 'textarea', 'label' => 'Program 4 - Deskripsi', 'value' => "Kegiatan pengajian untuk masyarakat dalam rangka memperkuat ukhuwah islamiyah.", 'sort_order' => 8],

            // Gallery
            ['section' => 'gallery', 'key' => 'gallery_1', 'type' => 'image', 'label' => 'Foto Galeri 1', 'value' => '/images/yayasan-foto-1.jpg', 'sort_order' => 1],
            ['section' => 'gallery', 'key' => 'gallery_1_title', 'type' => 'text', 'label' => 'Judul Foto 1', 'value' => 'KKN Angkatan 84 - Sungai Pinang', 'sort_order' => 2],
            ['section' => 'gallery', 'key' => 'gallery_1_desc', 'type' => 'text', 'label' => 'Deskripsi Foto 1', 'value' => 'Kegiatan bersama santri dan mahasiswa KKN', 'sort_order' => 3],
            ['section' => 'gallery', 'key' => 'gallery_2', 'type' => 'image', 'label' => 'Foto Galeri 2', 'value' => '/images/yayasan-foto-2.jpg', 'sort_order' => 4],
            ['section' => 'gallery', 'key' => 'gallery_2_title', 'type' => 'text', 'label' => 'Judul Foto 2', 'value' => 'Kebersamaan Santri', 'sort_order' => 5],
            ['section' => 'gallery', 'key' => 'gallery_2_desc', 'type' => 'text', 'label' => 'Deskripsi Foto 2', 'value' => 'Momen kebersamaan yang penuh cinta dan kasih sayang', 'sort_order' => 6],

            // Location
            ['section' => 'location', 'key' => 'location_address', 'type' => 'text', 'label' => 'Alamat', 'value' => 'Sungai Pinang, Sumatera Selatan, Indonesia', 'sort_order' => 1],
            ['section' => 'location', 'key' => 'location_maps_embed', 'type' => 'textarea', 'label' => 'Google Maps Embed URL', 'value' => "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.5!2d104.8272009!3d-3.0559892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9dc9729d1b81%3A0x482ca8c781d80889!2sRumah%20Qur'an%20Syababul%20Khair!5e0!3m2!1sid!2sid!4v1707600000000!5m2!1sid!2sid", 'sort_order' => 2],
            ['section' => 'location', 'key' => 'location_maps_link', 'type' => 'text', 'label' => 'Google Maps Link', 'value' => 'https://maps.app.goo.gl/SPPXu4w6z4gHTQsXA', 'sort_order' => 3],

            // Contact
            ['section' => 'contact', 'key' => 'contact_phone', 'type' => 'text', 'label' => 'Telepon', 'value' => 'Hubungi kami untuk informasi lebih lanjut', 'sort_order' => 1],
            ['section' => 'contact', 'key' => 'contact_email', 'type' => 'text', 'label' => 'Email', 'value' => 'kknangkatanbaunserithe@gmail.com', 'sort_order' => 2],
            ['section' => 'contact', 'key' => 'contact_cta_title', 'type' => 'text', 'label' => 'Judul CTA', 'value' => 'Mari Bergabung Bersama Kami', 'sort_order' => 3],
            ['section' => 'contact', 'key' => 'contact_cta_desc', 'type' => 'textarea', 'label' => 'Deskripsi CTA', 'value' => "Daftarkan putra-putri Anda untuk belajar Al-Qur'an dan program keislaman lainnya di Yayasan RQ Syababul Khair. Bersama kita wujudkan generasi Qur'ani.", 'sort_order' => 4],
        ];

        foreach ($contents as $content) {
            ProfileContent::updateOrCreate(
                ['key' => $content['key']],
                array_merge($content, ['is_active' => true])
            );
        }
    }
}
