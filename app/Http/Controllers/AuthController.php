<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (Auth::attempt([
            'email' => $email,
            'password' => $password
        ], true)) {
            return Auth::user();
        }else{
            return response()->json([
                'error' => 'invalid_credentials'
            ], 403);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        return response('Logged out',202);
    }
}

