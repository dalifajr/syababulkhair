<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// --- STATIC FILE HANDLER (Vercel PHP can't serve static files directly) ---
$staticResult = require_once __DIR__ . '/static.php';
if ($staticResult !== false) {
    exit; // Static file was served
}
// ---

// --- VERCEL CONFIGURATION (must be before autoload for early env setup) ---
$isVercel = isset($_SERVER['VERCEL_REGION']) || isset($_ENV['VERCEL_REGION']) || getenv('VERCEL_REGION');

if ($isVercel) {
    // Set default environment variables if not set in Vercel Dashboard
    // These can be overridden by setting Environment Variables in Vercel
    
    // Required Laravel settings
    if (!getenv('APP_KEY') && !isset($_ENV['APP_KEY'])) {
        // IMPORTANT: This key should be set in Vercel Dashboard for security!
        // This is a fallback to prevent crashes. Generate a new key for production.
        putenv('APP_KEY=base64:IYF9xw15lLmYv4xplXY94Vx9eTi/n+xfSwBXVPXQwa0=');
        $_ENV['APP_KEY'] = 'base64:IYF9xw15lLmYv4xplXY94Vx9eTi/n+xfSwBXVPXQwa0=';
    }
    
    if (!getenv('APP_ENV') && !isset($_ENV['APP_ENV'])) {
        putenv('APP_ENV=production');
        $_ENV['APP_ENV'] = 'production';
    }
    
    if (!getenv('APP_DEBUG') && !isset($_ENV['APP_DEBUG'])) {
        putenv('APP_DEBUG=false');
        $_ENV['APP_DEBUG'] = 'false';
    }
    
    if (!getenv('APP_URL') && !isset($_ENV['APP_URL'])) {
        putenv('APP_URL=https://rq-syababul-khair.vercel.app');
        $_ENV['APP_URL'] = 'https://rq-syababul-khair.vercel.app';
    }
    
    // Database configuration (TiDB Cloud)
    if (!getenv('DB_CONNECTION') && !isset($_ENV['DB_CONNECTION'])) {
        putenv('DB_CONNECTION=mysql');
        $_ENV['DB_CONNECTION'] = 'mysql';
    }
    
    if (!getenv('DB_HOST') && !isset($_ENV['DB_HOST'])) {
        putenv('DB_HOST=gateway01.ap-southeast-1.prod.aws.tidbcloud.com');
        $_ENV['DB_HOST'] = 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com';
    }
    
    if (!getenv('DB_PORT') && !isset($_ENV['DB_PORT'])) {
        putenv('DB_PORT=4000');
        $_ENV['DB_PORT'] = '4000';
    }
    
    if (!getenv('DB_DATABASE') && !isset($_ENV['DB_DATABASE'])) {
        putenv('DB_DATABASE=test');
        $_ENV['DB_DATABASE'] = 'test';
    }
    
    if (!getenv('DB_USERNAME') && !isset($_ENV['DB_USERNAME'])) {
        putenv('DB_USERNAME=ZXxEW3axBqJMsHX.root');
        $_ENV['DB_USERNAME'] = 'ZXxEW3axBqJMsHX.root';
    }
    
    if (!getenv('DB_PASSWORD') && !isset($_ENV['DB_PASSWORD'])) {
        putenv('DB_PASSWORD=MQ8s4kgI9Aj638zu');
        $_ENV['DB_PASSWORD'] = 'MQ8s4kgI9Aj638zu';
    }
    
    if (!getenv('MYSQL_ATTR_SSL_CA') && !isset($_ENV['MYSQL_ATTR_SSL_CA'])) {
        putenv('MYSQL_ATTR_SSL_CA=certdb.pem');
        $_ENV['MYSQL_ATTR_SSL_CA'] = 'certdb.pem';
    }
    
    // Vercel-compatible drivers (stateless)
    putenv('SESSION_DRIVER=cookie');
    $_ENV['SESSION_DRIVER'] = 'cookie';
    
    putenv('CACHE_STORE=array');
    $_ENV['CACHE_STORE'] = 'array';
    
    putenv('QUEUE_CONNECTION=sync');
    $_ENV['QUEUE_CONNECTION'] = 'sync';
    
    putenv('LOG_CHANNEL=stderr');
    $_ENV['LOG_CHANNEL'] = 'stderr';
}
// ----------------------------

// Check if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
$app = require_once __DIR__ . '/../bootstrap/app.php';

// --- VERCEL STORAGE CONFIGURATION (after app bootstrap) ---
if ($isVercel) {
    // 1. Storage Path Fix (Read-only filesystem)
    $path = '/tmp/storage';
    $app->useStoragePath($path);
    
    // 2. Cache Path Fix (Read-only bootstrap/cache)
    // Laravel tries to write to these files. On Vercel, bootstrap/cache is read-only.
    // We redirect them to /tmp which is writable.
    $cachePath = '/tmp/cache';
    if (!is_dir($cachePath)) {
        mkdir($cachePath, 0755, true);
    }
    
    $_ENV['APP_SERVICES_CACHE'] = $cachePath . '/services.php';
    $_ENV['APP_PACKAGES_CACHE'] = $cachePath . '/packages.php';
    $_ENV['APP_CONFIG_CACHE'] = $cachePath . '/config.php';
    $_ENV['APP_ROUTES_CACHE'] = $cachePath . '/routes.php';
    $_ENV['APP_EVENTS_CACHE'] = $cachePath . '/events.php';
    
    // Ensure directories exist
    $dirs = [
        $path . '/framework/views',
        $path . '/framework/cache',
        $path . '/framework/sessions',
        $path . '/logs',
    ];
    
    foreach ($dirs as $dir) {
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
    }
}
// ----------------------------

// Handle the request
$app->handleRequest(Request::capture());