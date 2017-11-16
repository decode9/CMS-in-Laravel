<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('funds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('currency_id')->unsigned();
            $table->double('amount', 15, 8);
            $table->string('reference');
            $table->double('rate', 5, 5);
            $table->double('fee', 15, 8);
            $table->boolean('active')->default(0);
            $table->timestamps();
            $table->softDeletes();
            $table->string('comment');
            $table->string('account')->nullable();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('currency_id')->references('id')->on('currencies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('funds', function($table){
            $table->dropForeign('funds_user_id_foreign');
            $table->dropForeign('funds_currency_id_foreign');
        });
        Schema::dropIfExists('funds');
    }
}
