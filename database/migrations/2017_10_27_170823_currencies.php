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
                ['name' => 'Bolivar Fuerte', 'symbol' => 'VEF', 'type' => 'currency', 'value' => 'coinmarketcap'],
                ['name' => 'Dollar', 'symbol' => 'USD', 'type' => 'currency', 'value' => 'coinmarketcap'],
                ['name' => 'Bitcoin', 'symbol' => 'BTC', 'type' => 'Digital Coin', 'value' => 'coinmarketcap'],
                ['name' => 'Litecoin', 'symbol' => 'LTC', 'type' => 'Digital Coin', 'value' => 'coinmarketcap'],
                ['name' => 'Ethereum', 'symbol' => 'ETH', 'type' => 'Digital Coin', 'value' => 'coinmarketcap'],
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
