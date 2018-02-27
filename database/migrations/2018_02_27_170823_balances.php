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
        DB::table('balances')->insert([
                ['currency_id' => '1', 'symbol' => 'VEF', 'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '2', 'symbol' => 'USD', 'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '3', 'symbol' => 'BTC', 'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '4', 'symbol' => 'LTC', 'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '5', 'symbol' => 'ETH', 'type' => 'fund', 'amount' => '0'],
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
