<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Balances   extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('balances')->insert([
                ['currency_id' => '1',  'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '2',  'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '3',  'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '4',  'type' => 'fund', 'amount' => '0'],
                ['currency_id' => '5',  'type' => 'fund', 'amount' => '0'],
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
