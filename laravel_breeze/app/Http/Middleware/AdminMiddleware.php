<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated and has an admin type
        if (Auth::check() && Auth::user()->type === 'admin') {
            return $next($request); // Allow access if the user is an admin
        }

        // If not an admin, redirect to home or another page
        return redirect('/')->with('error', 'You do not have access to this page.');
    }
}
