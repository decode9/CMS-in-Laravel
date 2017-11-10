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
            $table->integer('out_currency')->unsigned();
            $table->double('out_amount', 15, 8);
            $table->double('rate', 8, 5);
            $table->double('fee', 15, 8);
            $table->integer('in_currency')->unsigned();
            $table->double('in_amount', 15, 8);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fund_orders');
    }
}
