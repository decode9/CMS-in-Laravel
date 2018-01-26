<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CredentialRole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('credential_role', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('credential_id')->unsigned();
            $table->integer('role_id')->unsigned();
            $table->timestamps();

            $table->foreign('credential_id')->references('id')->on('credentials');
            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('credential_role', function($table){
            $table->dropForeign('role_credential_credential_id_foreign');
            $table->dropForeign('role_credential_role_id_foreign');
        });
        Schema::dropIfExists('role_credential');
    }
}
