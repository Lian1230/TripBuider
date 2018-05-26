<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('trips')->insert([
      [ 'id' => 1, 'itinerary_number' => '4324534453242'],
      [ 'id' => 2, 'itinerary_number' => '3532532423253'],
      [ 'id' => 3, 'itinerary_number' => '1234324324325'],
      [ 'id' => 4, 'itinerary_number' => '8345342343242'],
    ]);
    DB::table('flights')->insert([
      [ 'id' => 1, 'from' => 'Toronto City Centre Airport', 'to' => 'Beijing Capital International'],
      [ 'id' => 2, 'from' => 'Pierre Elliott Trudeau International', 'to' => 'Beijing Capital International'],
      [ 'id' => 3, 'from' => 'Toronto City Centre Airport', 'to' => 'Shanghai Pudong International'],
      [ 'id' => 4, 'from' => 'Toronto City Centre Airport', 'to' => 'Pierre Elliott Trudeau International'],
      [ 'id' => 5, 'from' => 'Quebec Stn. Railway', 'to' => 'Vancouver International'],
      [ 'id' => 6, 'from' => 'Quebec Stn. Railway', 'to' => 'St. John\'s International'],
      [ 'id' => 7, 'from' => 'Fuzhou', 'to' => 'Warren County'],
      [ 'id' => 8, 'from' => 'Vancouver International', 'to' => 'Montreux Railway Station'],
      [ 'id' => 9, 'from' => 'Penn Valley', 'to' => '108 Mile Ranch'],
      [ 'id' => 10, 'from' => 'Vejle Railway Station', 'to' => 'East 34th St Landing'],
      [ 'id' => 11, 'from' => '39th Street Ferry', 'to' => 'Salote Pilolevu'],
      [ 'id' => 12, 'from' => 'Goldsworthy', 'to' => 'East Midlands'],
      [ 'id' => 13, 'from' => 'Chikkalthana', 'to' => 'Woensdrecht'],
      [ 'id' => 14, 'from' => 'Dubai World Central', 'to' => 'Aeroparque Jorge Newbery'],
    ]);
    DB::table('trip_join_flight')->insert([
      [ 'id' => 1, 'trip_id' => '1', 'flight_id' => '1'],
      [ 'id' => 2, 'trip_id' => '1', 'flight_id' => '2'],
      [ 'id' => 3, 'trip_id' => '1', 'flight_id' => '3'],
      [ 'id' => 4, 'trip_id' => '1', 'flight_id' => '4'],
      [ 'id' => 5, 'trip_id' => '2', 'flight_id' => '5'],
      [ 'id' => 6, 'trip_id' => '2', 'flight_id' => '6'],
      [ 'id' => 7, 'trip_id' => '2', 'flight_id' => '7'],
      [ 'id' => 8, 'trip_id' => '3', 'flight_id' => '8'],
      [ 'id' => 9, 'trip_id' => '3', 'flight_id' => '9'],
      [ 'id' => 10, 'trip_id' => '3', 'flight_id' => '10'],
      [ 'id' => 11, 'trip_id' => '4', 'flight_id' => '11'],
      [ 'id' => 12, 'trip_id' => '4', 'flight_id' => '12'],
      [ 'id' => 13, 'trip_id' => '4', 'flight_id' => '13'],
      [ 'id' => 14, 'trip_id' => '4', 'flight_id' => '14'],
    ]);
  }
}
