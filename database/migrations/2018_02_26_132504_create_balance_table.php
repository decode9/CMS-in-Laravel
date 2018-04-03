<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBalanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('balances', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('period_id')->unsigned();
            $table->integer('currency_id')->unsigned();
            $table->double('amount', 15, 8);
            $table->string('type');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('currency_id')->references('id')->on('currencies');
            $table->foreign('period_id')->references('id')->on('periods');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('balances', function($table){
            $table->dropForeign('balances_currency_id_foreign');
            $table->dropForeign('balances_user_id_foreign');
            $table->dropForeign('balances_period_id_foreign');
        });

        Schema::dropIfExists('balance');
    }
}
