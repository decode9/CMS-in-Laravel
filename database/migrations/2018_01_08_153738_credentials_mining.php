<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CredentialsMining extends Migration
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
                /*Clientes 0300-0349*/
                ['name' => 'Access Mining', 'code' => '0300', 'description' => 'Grant access to mining section' , 'belongs' => 'Clients'],
                ['name' => 'Search Mining', 'code' => '0301', 'description' => 'Grant permition to search mining', 'belongs' => 'Clients'],
                ['name' => 'Create Mining', 'code' => '0302', 'description' => 'Grant permition to create mining', 'belongs' => 'Clients'],
                ['name' => 'Edit Mining', 'code' => '0303', 'description' => 'Grant permition to  edit mining', 'belongs' => 'Clients'],
                ['name' => 'Delete Mining', 'code' => '0304', 'description' => 'Grant permition to delete mining', 'belongs' => 'Clients'],
                ['name' => 'Verify Mining', 'code' => '0305', 'description' => 'Grant permition to verify mining', 'belongs' => 'Clients'],
                ['name' => 'Invite Mining', 'code' => '0306', 'description' => 'Grant permition to invite mining', 'belongs' => 'Clients'],
                ['name' => 'Block Mining', 'code' => '0307', 'description' => 'Grant permition to block mining', 'belongs' => 'Clients'],
                ['name' => 'Unblock Mining', 'code' => '0308', 'description' => 'Grant permition to unblock mining', 'belongs' => 'Clients'],
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
