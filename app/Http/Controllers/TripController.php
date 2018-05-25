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
     *  path="/airports",
     *  operationId="airports",
     *  tags={"Trip"},
     *  summary="Get list of airports",
     *  description="Get the real airports in the world",
     * 
     * @SWG\Parameter(
     *  name="order",
     *  description="order by, name or code",
     *  required=false,
     *  type="string",
     *  in="query"
     *  ),
     * 
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
    public function airports(Request $request)
    {
      $order = $request->query('order');
      $orderby = $order === 'name' ? 'nameAirport' : 'codeIataAirport';
      $airports = json_decode(file_get_contents(__DIR__."/../Resources/airports.json"), true);
      $sorted = array_values(array_sort($airports, function ($value) use ($orderby) {
          return $value[$orderby];
      }));

      return ['airports' => $sorted];
    }


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
     * 
     * @SWG\Parameter(
     *  name="id",
     *  description="trip id",
     *  required=true,
     *  type="integer",
     *  in="path"
     *  ),
     *
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
     * 
     * @SWG\Parameter(
     *  name="id",
     *  description="trip id",
     *  required=true,
     *  type="integer",
     *  in="path"
     *  ),
     * 
     * @SWG\Response(
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
     * @SWG\POST(
     *  path="/flight/add",
     *  operationId="addFlight",
     *  tags={"Trip"},
     *  summary="Add Flight",
     *  description="Add a new flight into a trip",
     * 
     * @SWG\Parameter(
     *  name="trip_id",
     *  description="the id of the selected trip",
     *  required=true,
     *  type="integer",
     *  in="header"
     *  ),
     * 
     * @SWG\Parameter(
     *  name="from",
     *  description="leaving from",
     *  required=true,
     *  type="string",
     *  in="header"
     *  ),
     * 
     * @SWG\Parameter(
     *  name="to",
     *  description="going to",
     *  required=true,
     *  type="string",
     *  in="header"
     *  ),
     * 
     *  @SWG\Response(
     *    response=200,
     *    description="successful operation"
     *  ),
     * )
     */
    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addFlight(Request $request)
    {
      $tripId = $request->header('tripId');
      $from = $request->header('from');
      $to = $request->header('to');

      $exist = DB::table('flights')
        ->where('from', $from)
        ->where('to', $to)
        ->get();

      $flightId = empty($exist[0])
        ? DB::table('flights')->insertGetId(['from' => $from, 'to' => $to])
        : $exist[0]->id;

      DB::table('trip_join_flight')->insert(['trip_id' => $tripId, 'flight_id' => $flightId]);

      return ['message' => 'success'];
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
