<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
//USER
Route::post('/register', 'Api\RegisterController')->name('register');
Route::post('/login', 'Api\LoginController')->name('login');

Route::get('/userAll', function () {
    return App\User::all();
});

Route::post('/logout', 'Api\LogoutController')->name('logout');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Usergroup
Route::get('/usergroup', 'Api\Usergroup\UsergroupController@GetUsergroup')->name('usergroup');