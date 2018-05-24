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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// List trips
Route::get('trips', 'TripController@trips');

// List airports
Route::get('airports', 'TripController@airports');

// List single trip
Route::get('trip/{id}', 'TripController@trip');

// Create new trip
Route::post('trip', 'TripController@store');

// Update trip
Route::put('trip', 'TripController@store');

// Delete trip
Route::delete('trip/{id}', 'TripController@destroy');


