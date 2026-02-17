<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Debugging Script: Show JS Errors on Screen -->
    <script>
        window.onerror = function(message, source, lineno, colno, error) {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:red;color:white;padding:20px;z-index:9999;font-family:monospace;white-space:pre-wrap;';
            errorDiv.textContent = 'JS Error: ' + message + '\nAt: ' + source + ':' + lineno + ':' + colno + '\n' + (error ? error.stack : '');
            document.body.appendChild(errorDiv);
            return false;
        };
        window.onunhandledrejection = function(event) {
             const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'position:fixed;top:50%;left:0;width:100%;background:orange;color:white;padding:20px;z-index:9999;font-family:monospace;white-space:pre-wrap;';
            errorDiv.textContent = 'Unhandled Promise Rejection: ' + event.reason;
            document.body.appendChild(errorDiv);
        };
    </script>

    @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <div id="debug-loader" style="background: #f0fdf4; color: #166534; padding: 10px; text-align: center; border-bottom: 1px solid #bbf7d0; font-family: sans-serif; font-size: 14px;">
            System Status: Loading Application... (If this persists, JS has crashed)
        </div>
        @inertia
    </body>
</html>
