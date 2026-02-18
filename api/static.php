<?php
/**
 * Static File Server for Vercel PHP Runtime
 * 
 * This file serves static assets (JS, CSS, images) that can't be served
 * directly by Vercel's filesystem handler when using PHP runtime.
 */

// Get the requested path
$path = $_SERVER['REQUEST_URI'] ?? '';
$path = parse_url($path, PHP_URL_PATH);
$path = urldecode($path);

// Define allowed static file patterns
$staticPatterns = [
    '/^\/build\//' => ['basePath' => __DIR__ . '/../public', 'mimeTypes' => [
        'js' => 'application/javascript',
        'css' => 'text/css',
        'json' => 'application/json',
        'map' => 'application/json',
    ]],
    '/^\/images\//' => ['basePath' => __DIR__ . '/../public', 'mimeTypes' => [
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'webp' => 'image/webp',
        'ico' => 'image/x-icon',
    ]],
];

// Check if this is a static file request
foreach ($staticPatterns as $pattern => $config) {
    if (preg_match($pattern, $path)) {
        $filePath = $config['basePath'] . $path;
        
        if (file_exists($filePath) && is_file($filePath)) {
            // Get file extension
            $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
            
            // Set content type
            $contentType = $config['mimeTypes'][$ext] ?? 'application/octet-stream';
            
            // Set headers
            header('Content-Type: ' . $contentType);
            header('Content-Length: ' . filesize($filePath));
            
            // Cache headers for immutable assets
            if (preg_match('/^\/build\/assets\//', $path)) {
                header('Cache-Control: public, max-age=31536000, immutable');
            }
            
            // Output file
            readfile($filePath);
            exit;
        }
    }
}

// Check for root-level static files
$rootStaticFiles = [
    '/favicon.ico' => 'image/x-icon',
    '/favicon.svg' => 'image/svg+xml',
    '/robots.txt' => 'text/plain',
    '/apple-touch-icon.png' => 'image/png',
    '/logo.svg' => 'image/svg+xml',
];

if (isset($rootStaticFiles[$path])) {
    $filePath = __DIR__ . '/../public' . $path;
    if (file_exists($filePath)) {
        header('Content-Type: ' . $rootStaticFiles[$path]);
        header('Content-Length: ' . filesize($filePath));
        readfile($filePath);
        exit;
    }
}

// Not a static file, continue to Laravel...
return false;
