# 📖 Panduan Deploy Website E-Rapor ke Vercel (Manual)

Panduan ini menjelaskan cara deploy aplikasi **E-Rapor (Laravel + React)** ke **Vercel** secara manual menggunakan **GitHub Import**.

---

## 📋 Daftar Isi

1. [Prasyarat](#1-prasyarat)
2. [Persiapan Database Cloud](#2-persiapan-database-cloud)
3. [Persiapan Repository GitHub](#3-persiapan-repository-github)
4. [Deploy ke Vercel](#4-deploy-ke-vercel)
5. [Konfigurasi Environment Variables](#5-konfigurasi-environment-variables)
6. [Verifikasi Deployment](#6-verifikasi-deployment)
7. [Update / Re-deploy](#7-update--re-deploy)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prasyarat

Pastikan Anda memiliki:

| Requirement | Keterangan |
|---|---|
| **Akun GitHub** | Repository sudah di-push ke GitHub |
| **Akun Vercel** | Daftar gratis di [vercel.com](https://vercel.com) (gunakan akun GitHub) |
| **Database MySQL Cloud** | Vercel tidak menyediakan MySQL, perlu layanan eksternal |
| **Git** | Terinstal di komputer |
| **Node.js** | Versi 18 atau lebih baru |
| **PHP + Composer** | Untuk install dependencies |

---

## 2. Persiapan Database Cloud

Karena Vercel tidak menyediakan database, Anda perlu menggunakan layanan MySQL cloud. Berikut beberapa pilihan gratis:

### Opsi A: TiDB Cloud Serverless (Rekomendasi)

1. Buka [tidbcloud.com](https://tidbcloud.com)
2. Daftar / Login
3. Klik **"Create Cluster"** → pilih **"Serverless"**
4. Pilih region terdekat (Singapore)
5. Setelah cluster dibuat, klik **"Connect"**
6. Catat informasi berikut:
   - **Host**: `gateway01.xxx.prod.aws.tidbcloud.com`
   - **Port**: `4000`
   - **User**: `xxx.root`
   - **Password**: `(password yang dibuat)`
   - **Database**: Buat database baru, misal `erapor`

### Opsi B: PlanetScale

1. Buka [planetscale.com](https://planetscale.com)
2. Daftar / Login
3. Buat database baru
4. Dapatkan connection string

### Opsi C: Aiven MySQL

1. Buka [aiven.io](https://aiven.io)
2. Daftar (free tier tersedia)
3. Buat service MySQL
4. Catat kredensial koneksi

> **⚠️ PENTING:** Setelah mendapatkan kredensial database cloud, Anda perlu menjalankan migrasi Laravel. Caranya:
> ```bash
> # Di komputer lokal, ubah .env ke kredensial database cloud
> php artisan migrate --seed
> ```

---

## 3. Persiapan Repository GitHub

### 3.1 Pastikan file konfigurasi Vercel sudah ada

File-file berikut harus ada di repository:

```
📁 project/
├── vercel.json          ← Konfigurasi Vercel
├── api/
│   └── index.php        ← Entry point serverless
├── .vercelignore        ← File yang diabaikan saat deploy
└── ... (file lainnya)
```

### 3.2 Build dan Push ke GitHub

```bash
# 1. Install dependencies
npm install

# 2. Build frontend assets
npm run build

# 3. Commit semua perubahan
git add -A
git commit -m "chore: setup vercel deployment"

# 4. Push ke GitHub
git push origin main
```

> **💡 Tips:** Pastikan folder `public/build/` yang berisi hasil build Vite sudah ter-commit. Cek file `.gitignore` — jika ada baris `/public/build`, **hapus baris tersebut** agar hasil build ikut ter-push.

---

## 4. Deploy ke Vercel

### 4.1 Login ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"** atau **"Log In"**
3. Pilih **"Continue with GitHub"** untuk otomatis terhubung ke repository Anda

### 4.2 Import Project dari GitHub

1. Setelah login, klik **"Add New..."** → **"Project"**
2. Anda akan melihat daftar repository GitHub
3. Cari repository **`dalifajr/rq-syababul-khair`**
4. Klik **"Import"**

### 4.3 Konfigurasi Project

Di halaman konfigurasi project:

| Setting | Nilai |
|---|---|
| **Framework Preset** | `Other` |
| **Root Directory** | `./ ` (biarkan default) |
| **Build Command** | `npm run build` |
| **Output Directory** | `public` (biarkan default) |
| **Install Command** | `npm install` |

### 4.4 Tambahkan Environment Variables

Sebelum klik Deploy, tambahkan Environment Variables (lihat [Bagian 5](#5-konfigurasi-environment-variables)).

### 4.5 Deploy

Klik tombol **"Deploy"** dan tunggu proses selesai (biasanya 2-5 menit).

---

## 5. Konfigurasi Environment Variables

Di halaman project Vercel, buka **Settings** → **Environment Variables**.

Tambahkan variabel-variabel berikut:

### Wajib (Required)

| Key | Value | Keterangan |
|---|---|---|
| `APP_NAME` | `E-Rapor Syababul Khair` | Nama aplikasi |
| `APP_ENV` | `production` | Environment |
| `APP_KEY` | `base64:xxxxx` | Generate dengan `php artisan key:generate --show` |
| `APP_DEBUG` | `false` | Matikan debug di production |
| `APP_URL` | `https://your-app.vercel.app` | URL dari Vercel |
| `DB_CONNECTION` | `mysql` | Tipe database |
| `DB_HOST` | `(host dari database cloud)` | Host MySQL |
| `DB_PORT` | `3306` atau `4000` | Port MySQL |
| `DB_DATABASE` | `(nama database)` | Nama database |
| `DB_USERNAME` | `(username)` | Username database |
| `DB_PASSWORD` | `(password)` | Password database |

### Opsional (Recommended)

| Key | Value | Keterangan |
|---|---|---|
| `LOG_CHANNEL` | `errorlog` | Logging ke stderr (Vercel logs) |
| `SESSION_DRIVER` | `cookie` | Session via cookie (tanpa database) |
| `CACHE_STORE` | `array` | Cache in-memory |
| `QUEUE_CONNECTION` | `sync` | Synchronous queue |
| `FILESYSTEM_DISK` | `local` | Filesystem lokal |

> **💡 Tips:** Untuk mendapatkan `APP_KEY`, jalankan di terminal lokal:
> ```bash
> php artisan key:generate --show
> ```
> Salin hasilnya (misal `base64:IYF9xw15lLmYv4xplXY94Vx9eTi/n+xfSwBXVPXQwa0=`)

---

## 6. Verifikasi Deployment

### 6.1 Cek Status Deploy

1. Buka dashboard Vercel
2. Klik project Anda
3. Lihat tab **"Deployments"**
4. Pastikan deployment terbaru berstatus **"Ready"** (✓ hijau)

### 6.2 Cek Website

1. Klik URL yang diberikan Vercel (misal `https://rq-syababul-khair.vercel.app`)
2. Pastikan halaman utama (landing page) bisa diakses
3. Coba login ke dashboard admin
4. Cek beberapa fitur utama

### 6.3 Cek Logs (jika ada error)

1. Di dashboard Vercel, buka tab **"Functions"** atau **"Logs"**
2. Lihat apakah ada error PHP/Laravel
3. Error umum biasanya terkait Environment Variables yang kurang

---

## 7. Update / Re-deploy

### Auto-deploy (Rekomendasi)

Setelah project terhubung ke GitHub, setiap kali Anda **push ke branch main**, Vercel akan **otomatis re-deploy**:

```bash
# 1. Buat perubahan di kode

# 2. Build frontend
npm run build

# 3. Commit dan push
git add -A
git commit -m "fix: perbaikan fitur X"
git push origin main

# Vercel otomatis deploy! ✨
```

### Manual Re-deploy

1. Buka dashboard Vercel → Project
2. Klik tab **"Deployments"**
3. Klik **"..."** pada deployment terakhir
4. Pilih **"Redeploy"**

---

## 8. Troubleshooting

### ❌ Error: "500 Internal Server Error"

**Penyebab:** Biasanya `APP_KEY` belum di-set atau salah.

**Solusi:**
1. Generate key: `php artisan key:generate --show`
2. Masukkan ke Environment Variables di Vercel
3. Redeploy

---

### ❌ Error: "SQLSTATE[HY000] Connection refused"

**Penyebab:** Database belum dikonfigurasi atau kredensial salah.

**Solusi:**
1. Pastikan `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` sudah benar
2. Pastikan database cloud mengizinkan koneksi dari luar (whitelist IP: `0.0.0.0/0`)
3. Jika menggunakan TiDB Cloud, pastikan port `4000` (bukan `3306`)

---

### ❌ Error: Build Failed

**Penyebab:** Dependencies atau build script gagal.

**Solusi:**
1. Pastikan `npm run build` berhasil di lokal
2. Cek apakah `package-lock.json` ada di repository
3. Pastikan Node.js version compatible (cek di Vercel Settings → General → Node.js Version)

---

### ❌ CSS / JavaScript tidak muncul

**Penyebab:** File build tidak ter-deploy atau path salah.

**Solusi:**
1. Pastikan `public/build/` tidak ada di `.gitignore`
2. Jalankan `npm run build` sebelum push
3. Cek apakah file ada di `public/build/manifest.json`

---

### ❌ Halaman selain homepage error 404

**Penyebab:** Routing tidak dikonfigurasi dengan benar.

**Solusi:**
1. Pastikan file `vercel.json` ada dan berisi route catch-all ke `api/index.php`
2. Redeploy setelah menambahkan `vercel.json`

---

### ❌ Upload file tidak berfungsi

**Penyebab:** Vercel serverless functions tidak memiliki persistent storage.

**Solusi:**
- Gunakan cloud storage (misal AWS S3, Cloudinary) untuk file uploads
- Atau gunakan platform lain yang mendukung persistent storage (Railway, Render)

---

## 📌 Catatan Penting

1. **Vercel Free Plan** memiliki batas:
   - Max 10 detik execution time per request
   - Max 100 GB bandwidth per bulan
   - Tidak ada persistent file storage

2. **Untuk production serius**, pertimbangkan:
   - **[Railway](https://railway.app)** — mendukung PHP + MySQL natively
   - **[Render](https://render.com)** — Docker-based, lebih fleksibel
   - **[DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)** — scalable

3. **Database migration** harus dijalankan secara manual dari komputer lokal setelah setup database cloud.

---

*Dokumen ini dibuat untuk membantu deployment aplikasi E-Rapor Syababul Khair ke Vercel.*
*Terakhir diperbarui: Februari 2026*
