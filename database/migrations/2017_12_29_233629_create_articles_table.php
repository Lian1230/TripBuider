<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTripsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->increments('id');
            $table->string('itinerary_number');
        });
        Schema::create('flights', function (Blueprint $table) {
            $table->increments('id');
            $table->string('from');
            $table->string('to');
        });
        Schema::create('trip_join_flight', function (Blueprint $table) {
            $table->increments('id');
            $table->string('trip_id');
            $table->string('flight_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trips');
        Schema::dropIfExists('flights');
        Schema::dropIfExists('trip_join_flight');
    }
}
