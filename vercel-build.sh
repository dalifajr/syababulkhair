#!/bin/bash
# Vercel Build Script for Laravel + Vite

echo "Starting Vercel build..."

# Install Node dependencies
npm install

# Build frontend assets
npm run build

# Copy build output to root for Vercel static file serving
echo "Copying build files to root..."
if [ -d "public/build" ]; then
    cp -r public/build build
    echo "Build files copied successfully"
else
    echo "Warning: public/build directory not found"
fi

# Copy images to root
if [ -d "public/images" ]; then
    cp -r public/images images
    echo "Images copied successfully"
fi

# Copy other static files
cp public/favicon.ico favicon.ico 2>/dev/null || true
cp public/favicon.svg favicon.svg 2>/dev/null || true  
cp public/robots.txt robots.txt 2>/dev/null || true

echo "Build completed!"
