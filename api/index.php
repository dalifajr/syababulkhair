<?php

/**
 * Vercel Serverless Entry Point
 *
 * This file serves as the entry point for the Laravel application
 * when deployed on Vercel's serverless infrastructure.
 */

// Set the working directory to the project root
chdir(__DIR__ . '/..');

// Register the Composer auto-loader
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel and handle the incoming request
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Fix for Vercel read-only filesystem
if (isset($_SERVER['VERCEL_REGION']) || isset($_ENV['VERCEL_REGION'])) {
    $path = '/tmp/storage';
    $app->useStoragePath($path);

    // Create necessary directories
    if (!is_dir($path . '/framework/views')) {
        mkdir($path . '/framework/views', 0755, true);
    }
    if (!is_dir($path . '/framework/cache')) {
        mkdir($path . '/framework/cache', 0755, true);
    }
    if (!is_dir($path . '/framework/sessions')) {
        mkdir($path . '/framework/sessions', 0755, true);
    }
    if (!is_dir($path . '/logs')) {
        mkdir($path . '/logs', 0755, true);
    }
    
    // Force logs to stderr so they appear in Vercel dashboard
    $_ENV['LOG_CHANNEL'] = 'stderr';
    $_SERVER['LOG_CHANNEL'] = 'stderr';
}

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::capture();

$response = $kernel->handle($request);

$response->send();

$kernel->terminate($request, $response);
