@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
title Deploy E-Rapor ke Vercel
color 0B

echo ╔══════════════════════════════════════════════════════╗
echo ║       DEPLOY E-RAPOR KE VERCEL via GITHUB           ║
echo ║       Aplikasi: Syababul Khair E-Rapor              ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM ==========================================
REM  1. CEK PRASYARAT
REM ==========================================
echo [1/6] Memeriksa prasyarat...
echo.

REM Cek Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git tidak ditemukan!
    echo         Download di: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
echo   [OK] Git terdeteksi

REM Cek Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js tidak ditemukan!
    echo         Download di: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo   [OK] Node.js terdeteksi

REM Cek npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm tidak ditemukan!
    echo         Biasanya terinstal bersama Node.js
    echo.
    pause
    exit /b 1
)
echo   [OK] npm terdeteksi

REM Cek PHP
where php >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] PHP tidak ditemukan di PATH.
    echo           Ini diperlukan untuk composer install.
    echo           Lanjutkan? (Y/N^)
    set /p CONTINUE_PHP=
    if /i "!CONTINUE_PHP!" neq "Y" exit /b 1
) else (
    echo   [OK] PHP terdeteksi
)

REM Cek Composer
where composer >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Composer tidak ditemukan di PATH.
    echo           Ini diperlukan jika vendor/ belum ada.
    echo.
) else (
    echo   [OK] Composer terdeteksi
)

echo.

REM ==========================================
REM  2. CEK & INSTALL VERCEL CLI
REM ==========================================
echo [2/6] Memeriksa Vercel CLI...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo   Vercel CLI belum terinstal. Menginstal...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo [ERROR] Gagal menginstal Vercel CLI!
        pause
        exit /b 1
    )
    echo   [OK] Vercel CLI berhasil diinstal
) else (
    echo   [OK] Vercel CLI terdeteksi
)
echo.

REM ==========================================
REM  3. INSTALL DEPENDENCIES
REM ==========================================
echo [3/6] Menginstal dependencies...

if not exist "vendor" (
    echo   Menginstal PHP dependencies (composer install)...
    call composer install --no-dev --optimize-autoloader
    if %errorlevel% neq 0 (
        echo [ERROR] Composer install gagal!
        pause
        exit /b 1
    )
)
echo   [OK] PHP dependencies siap

if not exist "node_modules" (
    echo   Menginstal Node dependencies (npm install)...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install gagal!
        pause
        exit /b 1
    )
)
echo   [OK] Node dependencies siap
echo.

REM ==========================================
REM  4. BUILD FRONTEND ASSETS
REM ==========================================
echo [4/6] Build frontend assets (Vite)...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build frontend gagal!
    echo         Periksa error di atas.
    pause
    exit /b 1
)
echo   [OK] Frontend build selesai
echo.

REM ==========================================
REM  5. PUSH KE GITHUB
REM ==========================================
echo [5/6] Push kode ke GitHub...

REM Cek apakah ada remote
git remote -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Repository Git belum di-setup!
    echo         Jalankan: git init ^&^& git remote add origin [URL]
    pause
    exit /b 1
)

REM Cek apakah ada perubahan
git status --porcelain 2>nul | findstr /r "." >nul
if %errorlevel% equ 0 (
    echo   Ada perubahan yang belum di-commit.
    set /p COMMIT_MSG="  Masukkan pesan commit (atau tekan Enter untuk default): "
    if "!COMMIT_MSG!"=="" set COMMIT_MSG=chore: update for Vercel deployment
    
    git add -A
    git commit -m "!COMMIT_MSG!"
    if %errorlevel% neq 0 (
        echo [ERROR] Git commit gagal!
        pause
        exit /b 1
    )
)

REM Push ke remote
git push origin main 2>nul
if %errorlevel% neq 0 (
    git push origin master 2>nul
    if %errorlevel% neq 0 (
        echo [WARNING] Push gagal. Coba tentukan branch secara manual.
        set /p BRANCH_NAME="  Masukkan nama branch (contoh: main): "
        git push origin !BRANCH_NAME!
        if %errorlevel% neq 0 (
            echo [ERROR] Push tetap gagal!
            pause
            exit /b 1
        )
    )
)
echo   [OK] Kode berhasil di-push ke GitHub
echo.

REM ==========================================
REM  6. DEPLOY KE VERCEL
REM ==========================================
echo [6/6] Deploy ke Vercel...
echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║  PILIH METODE DEPLOY:                               ║
echo ║  1. Deploy via Vercel CLI (langsung dari terminal)   ║
echo ║  2. Buka Vercel Dashboard (import dari GitHub)       ║
echo ╚══════════════════════════════════════════════════════╝
echo.
set /p DEPLOY_METHOD="Pilih (1 atau 2): "

if "%DEPLOY_METHOD%"=="1" (
    echo.
    echo   Menjalankan Vercel deploy...
    echo   [INFO] Jika pertama kali, Anda akan diminta login dan setup project.
    echo.
    call vercel --prod
    if %errorlevel% neq 0 (
        echo.
        echo [WARNING] Deploy mungkin gagal. Cek error di atas.
        echo           Anda bisa coba deploy manual via dashboard.
    ) else (
        echo.
        echo   [OK] Deploy berhasil!
    )
) else (
    echo.
    echo   Membuka Vercel Dashboard...
    start https://vercel.com/new
    echo.
    echo   [INFO] Di browser:
    echo     1. Login ke Vercel (gunakan akun GitHub)
    echo     2. Klik "Import" pada repository: dalifajr/rq-syababul-khair
    echo     3. Atur Environment Variables (lihat PANDUAN-DEPLOY-VERCEL.md)
    echo     4. Klik "Deploy"
)

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║                   SELESAI!                           ║
echo ╠══════════════════════════════════════════════════════╣
echo ║  PENTING: Jangan lupa set Environment Variables      ║
echo ║  di Vercel Dashboard:                                ║
echo ║    - APP_KEY                                         ║
echo ║    - DB_CONNECTION, DB_HOST, DB_PORT                 ║
echo ║    - DB_DATABASE, DB_USERNAME, DB_PASSWORD            ║
echo ║    - APP_ENV=production                              ║
echo ║    - APP_DEBUG=false                                 ║
echo ║                                                      ║
echo ║  Baca: PANDUAN-DEPLOY-VERCEL.md untuk detail lengkap ║
echo ╚══════════════════════════════════════════════════════╝
echo.
pause
