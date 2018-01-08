<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CredentialsClients extends Migration
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
                /*Clientes 0250-0299*/
                ['name' => 'Access Clients', 'code' => '0250', 'description' => 'Grant access to clients section' , 'belongs' => 'Clients'],
                ['name' => 'Search Clients', 'code' => '0251', 'description' => 'Grant permition to search clients', 'belongs' => 'Clients'],
                ['name' => 'Create Clients', 'code' => '0252', 'description' => 'Grant permition to create clients', 'belongs' => 'Clients'],
                ['name' => 'Edit Clients', 'code' => '0253', 'description' => 'Grant permition to  edit clients', 'belongs' => 'Clients'],
                ['name' => 'Delete Clients', 'code' => '0254', 'description' => 'Grant permition to delete clients', 'belongs' => 'Clients'],
                ['name' => 'Verify Clients', 'code' => '0255', 'description' => 'Grant permition to verify clients', 'belongs' => 'Clients'],
                ['name' => 'Invite Clients', 'code' => '0256', 'description' => 'Grant permition to invite clients', 'belongs' => 'Clients'],
                ['name' => 'Block Clients', 'code' => '0257', 'description' => 'Grant permition to block clients', 'belongs' => 'Clients'],
                ['name' => 'Unblock Clients', 'code' => '0258', 'description' => 'Grant permition to unblock clients', 'belongs' => 'Clients'],
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
        DB::table('credentials')->where('belongs', 'Clients')->delete();
    }
}
