<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CredentialsUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table('credentials')->insert([
                /*usuarios 0100-0149*/
                ['name' => 'Access Users', 'code' => '0100', 'description' => 'Grant access to users section' , 'belongs' => 'Users'],
                ['name' => 'Search Users', 'code' => '0101', 'description' => 'Grant permition to search users', 'belongs' => 'Users'],
                ['name' => 'Create Users', 'code' => '0102', 'description' => 'Grant permition to create users', 'belongs' => 'Users'],
                ['name' => 'Edit Users', 'code' => '0103', 'description' => 'Grant permition to  edit users', 'belongs' => 'Users'],
                ['name' => 'Delete Users', 'code' => '0104', 'description' => 'Grant permition to delete users', 'belongs' => 'Users'],
                ['name' => 'Verify Users', 'code' => '0105', 'description' => 'Grant permition to verify users', 'belongs' => 'Users'],
                ['name' => 'Invite Users', 'code' => '0106', 'description' => 'Grant permition to invite users', 'belongs' => 'Users'],
                ['name' => 'Block Users', 'code' => '0107', 'description' => 'Grant permition to block users', 'belongs' => 'Users'],
                ['name' => 'Unblock Users', 'code' => '0108', 'description' => 'Grant permition to unblock users', 'belongs' => 'Users'],
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
        DB::table('credentials')->where('belongs', 'Users')->delete();
    }
}
