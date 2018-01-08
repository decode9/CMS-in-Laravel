<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RoleCredential extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('role_credential', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('credential_id');
            $table->integer('role_id');
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
        Schema::table('role_credential', function($table){
            $table->dropForeign('role_credential_credential_id_foreign');
            $table->dropForeign('role_credential_role_id_foreign');
        });
        Schema::dropIfExists('role_credential');
    }
}
