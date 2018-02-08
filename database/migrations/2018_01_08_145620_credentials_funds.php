<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CredentialsFunds extends Migration
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
                /*fondos 0150-0199*/
                ['name' => 'Access Funds', 'code' => '0150', 'description' => 'Grant access to funds section' , 'belongs' => 'Funds'],
                ['name' => 'Search Funds', 'code' => '0151', 'description' => 'Grant permition to search funds', 'belongs' => 'Funds'],
                ['name' => 'Create Funds', 'code' => '0152', 'description' => 'Grant permition to create funds', 'belongs' => 'Funds'],
                ['name' => 'Edit Funds', 'code' => '0153', 'description' => 'Grant permition to  edit funds', 'belongs' => 'Funds'],
                ['name' => 'Delete Funds', 'code' => '0154', 'description' => 'Grant permition to delete funds', 'belongs' => 'Funds'],
                ['name' => 'Verify Funds', 'code' => '0155', 'description' => 'Grant permition to verify funds', 'belongs' => 'Funds'],
                ['name' => 'Block Funds', 'code' => '0156', 'description' => 'Grant permition to block funds', 'belongs' => 'Funds'],
                ['name' => 'Unblock Funds', 'code' => '0157', 'description' => 'Grant permition to unblock funds', 'belongs' => 'Funds'],
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
        DB::table('credentials')->where('belongs', 'Funds')->delete();
    }
}
