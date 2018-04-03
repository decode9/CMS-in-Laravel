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
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('period_id')->unsigned()->nullable(0);
            $table->integer('currency_id')->unsigned();
            $table->double('amount', 15, 8);
            $table->string('reference');
            $table->boolean('active')->default(0);
            $table->string('comment');
            $table->string('type');
            $table->integer('account_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('currency_id')->references('id')->on('currencies');
            $table->foreign('period_id')->references('id')->on('periods');
            $table->foreign('account_id')->references('id')->on('accounts');
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
            $table->dropForeign('funds_period_id_foreign');
            $table->dropForeign('funds_currency_id_foreign');
            $table->dropForeign('funds_account_id_foreign');
        });
        Schema::dropIfExists('funds');
    }
}
