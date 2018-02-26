<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFundOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fund_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('out_currency')->unsigned();
            $table->double('out_amount', 15, 8);
            $table->double('rate', 8, 5);
            $table->double('fee', 15, 8);
            $table->integer('in_currency')->unsigned();
            $table->double('in_amount', 15, 8);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('out_currency')->references('id')->on('currencies');
            $table->foreign('in_currency')->references('id')->on('currencies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('fund_orders', function($table){
            $table->dropForeign('fund_orders_user_id_foreign');
            $table->dropForeign('fund_orders_out_currency_foreign');
            $table->dropForeign('fund_orders_in_currency_foreign');
        });
        Schema::dropIfExists('fund_orders');
    }
}
