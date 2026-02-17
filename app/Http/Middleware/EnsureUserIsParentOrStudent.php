<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsParentOrStudent
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Allow parent and student roles, or admin for testing
        if (!in_array($user->role, ['parent', 'student', 'admin'])) {
            abort(403, 'Anda tidak memiliki akses ke portal ini');
        }

        // For parent/student, ensure they have a linked student
        if (in_array($user->role, ['parent', 'student']) && !$user->student_id) {
            return redirect()->route('dashboard')
                ->with('error', 'Akun Anda belum terhubung dengan data siswa');
        }

        return $next($request);
    }
}
