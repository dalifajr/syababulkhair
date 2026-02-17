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

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::capture();

$response = $kernel->handle($request);

$response->send();

$kernel->terminate($request, $response);
