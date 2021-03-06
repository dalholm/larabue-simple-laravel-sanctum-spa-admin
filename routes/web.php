<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('app');
});

Route::get('/mail', function () {
    $user = \App\User::first();
    $password = 'dasdsad';
    return (new \App\Notifications\ForgotPasswordMail($password))->toMail($user);
});

// Localization
Route::get('/js/{language}/lang', function ($language) {

    $strings = Cache::remember('lang.js', 0, function () use ($language) {

        $files   = glob(resource_path('lang/' . $language . '/*.php'));
        $strings = [];

        foreach ($files as $file) {
            $name           = basename($file, '.php');
            $strings[$name] = require $file;
        }

        return $strings;
    });
    return $strings;
});



Route::get('/{path}', function () {
    return view('app');
})->where('path', '(.*)');
