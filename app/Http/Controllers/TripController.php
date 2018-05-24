<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\Trip as TripResource;
use App\Http\Resources\Flight as FlightResource;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TripController extends Controller
{
    /**
     * Display all trips.
     *
     * @return \Illuminate\Http\Response
     */
    public function trips()
    {
        $trips = DB::table('trips')->get();
        return ['trips' => $trips];
    }

    /**
     * Display the flights under a trip.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function trip($id)
    {
      $flights = DB::table('flights')
        ->join('trip_join_flight', function ($join) use ($id) {
          $join->on('flights.id', '=', 'trip_join_flight.flight_id')
            ->where('trip_join_flight.trip_id', '=', $id);
        })
        ->get();
      return TripResource::collection($flights);
    }

    /**
     * Display the real airports in the world.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function airports()
    {
      $airports = json_decode(file_get_contents(__DIR__."/../Resources/airports.json"), true);
      return ['airports' => $airports];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $trip = $request->isMethod('put') ? Trip::findOrFail($request->trip_id) : new Trip;

        $trip->id = $request->input('trip_id');
        $trip->title = $request->input('title');
        $trip->body = $request->input('body');

        if($trip->save()) {
            return new TripResource($trip);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Get trip
        $trip = Trip::findOrFail($id);

        if($trip->delete()) {
            return new TripResource($trip);
        }    
    }
}
