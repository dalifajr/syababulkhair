<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileContent extends Model
{
    protected $fillable = [
        'section',
        'key',
        'type',
        'label',
        'value',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public const SECTIONS = [
        'hero' => 'Hero / Beranda',
        'about' => 'Tentang Kami',
        'visi_misi' => 'Visi & Misi',
        'programs' => 'Program',
        'gallery' => 'Galeri',
        'location' => 'Lokasi',
        'contact' => 'Kontak',
        'footer' => 'Footer',
    ];

    public const TYPES = [
        'text' => 'Teks Pendek',
        'textarea' => 'Teks Panjang',
        'image' => 'Gambar',
        'logo' => 'Logo',
    ];
}
