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
                ['name' => 'Bolivar Fuerte', 'symbol' => 'VEF'],
                ['name' => 'Dollar', 'symbol' => 'USD'],
                ['name' => 'Bitcoin', 'symbol' => 'BTC'],
                ['name' => 'Litecoin', 'symbol' => 'LTC'],
                ['name' => 'Ethereum', 'symbol' => 'ETH'],
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
