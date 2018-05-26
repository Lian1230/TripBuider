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

// Get details of a trip
Route::get('trip/{id}', 'TripController@trip');

// List all flight under a trip
Route::get('trip/{id}/flights', 'TripController@tripFlights');

// Add flight to trip
Route::post('trip/{id}/add', 'TripController@addFlight');

// From flight from a trip
Route::delete('trip/{id}/{refId}', 'TripController@removeFlight');


