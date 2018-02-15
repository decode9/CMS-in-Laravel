<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Currencies extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('currencies')->insert([
                ['name' => 'Bolivar Fuerte', 'symbol' => 'VEF', 'type' => 'currency'],
                ['name' => 'Dollar', 'symbol' => 'USD', 'type' => 'currency'],
                ['name' => 'Bitcoin', 'symbol' => 'BTC', 'type' => 'Digital Coin'],
                ['name' => 'Litecoin', 'symbol' => 'LTC', 'type' => 'Digital Coin'],
                ['name' => 'Ethereum', 'symbol' => 'ETH', 'type' => 'Digital Coin'],
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
