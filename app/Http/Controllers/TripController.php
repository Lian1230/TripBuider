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
     * @SWG\Get(
     *  path="/trips",
     *  operationId="trips",
     *  tags={"Trip"},
     *  summary="Get list of trips",
     *  description="Returns list of trips",
     *  @SWG\Response(
     *    response=200,
     *    description="successful operation"
     *   ),
     * )
     */
    /**
     * @return \Illuminate\Http\Response
     */
    public function trips()
    {
        $trips = DB::table('trips')->get();
        return ['trips' => $trips];
    }

    /**
     * @SWG\Get(
     *  path="/trip/{id}",
     *  operationId="trip",
     *  tags={"Trip"},
     *  summary="Get info of a trip",
     *  description="Get all details of a trip.",
     * @SWG\Parameter(
     *  name="id",
     *  description="trip id",
     *  required=true,
     *  type="integer",
     *  in="path"
     *  ),
     *  @SWG\Response(
     *    response=200,
     *    description="successful operation"
     *  ),
     * )
     */
    /**
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function trip($id)
    {
      $trip = DB::table('trips')
        ->where('trips.id', '=', $id)
        ->get();
      return ['trip' => $trip[0]];
    }

  
    /**
     * @SWG\Get(
     *  path="/trip/{id}/flights",
     *  operationId="tripFlights",
     *  tags={"Trip"},
     *  summary="Get list of flights under a trip",
     *  description="Get the flights under a trip.",
     * @SWG\Parameter(
     *  name="id",
     *  description="trip id",
     *  required=true,
     *  type="integer",
     *  in="path"
     *  ),
     *  @SWG\Response(
     *    response=200,
     *    description="successful operation"
     *  ),
     * )
     */
    /**
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function tripFlights($id)
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
     * @SWG\Get(
     *  path="/airports",
     *  operationId="airports",
     *  tags={"Trip"},
     *  summary="Get list of airports",
     *  description="Get the real airports in the world",
     *  @SWG\Response(
     *    response=200,
     *    description="successful operation"
     *  ),
     * )
     */
    /**
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
