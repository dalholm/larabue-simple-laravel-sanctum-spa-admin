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

    Route::group(['middleware' => ['role:admin']], function () {
        Route::prefix('users')->group(function () {
            Route::post('/', 'UserController@search');
            Route::put('/', 'UserController@put');
            Route::delete('/{id}', 'UserController@delete');
            Route::patch('/update', 'UserController@update');

            Route::prefix('roles')->group(function () {
                Route::get('/', 'Auth\RoleController@all');
                Route::post('/', 'Auth\RoleController@search');
                Route::put('/', 'Auth\RoleController@put');
                Route::delete('/{id}', 'Auth\RoleController@delete');
                Route::patch('/', 'Auth\RoleController@patch');
            });
        });



    });
});

Route::post('/login', 'AuthController@login');

Route::post('/register', 'UserController@register');

// Send reset password mail
Route::post('reset-password', 'Auth\ForgotPasswordController@sendResetLinkEmail');

// handle reset password form process
Route::post('reset/password', 'Auth\ResetPasswordController@reset');
