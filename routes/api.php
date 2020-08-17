<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', 'AuthController@logout');

    // User
    Route::get('/user', 'UserController@get');
    Route::patch('/user', 'UserController@patch');
    Route::patch('/user/password', 'UserController@password');

});

Route::post('/login', 'AuthController@login');

Route::post('/register', 'UserController@register');

// Send reset password mail
Route::post('reset-password', 'Auth\ForgotPasswordController@sendResetLinkEmail');

// handle reset password form process
Route::post('reset/password', 'Auth\ResetPasswordController@reset');
