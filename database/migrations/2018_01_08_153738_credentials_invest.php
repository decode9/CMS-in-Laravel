<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CredentialsInvest extends Migration
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
                /*Clientes 0350-0399*/
                ['name' => 'Access Invest', 'code' => '0350', 'description' => 'Grant access to mining section' , 'belongs' => 'Invest'],
                ['name' => 'Search Invest', 'code' => '0351', 'description' => 'Grant permition to search mining', 'belongs' => 'Invest'],
                ['name' => 'Create Invest', 'code' => '0352', 'description' => 'Grant permition to create mining', 'belongs' => 'Invest'],
                ['name' => 'Edit Invest', 'code' => '0353', 'description' => 'Grant permition to  edit mining', 'belongs' => 'Invest'],
                ['name' => 'Delete Invest', 'code' => '0354', 'description' => 'Grant permition to delete mining', 'belongs' => 'Invest'],
                ['name' => 'Verify Invest', 'code' => '0355', 'description' => 'Grant permition to verify mining', 'belongs' => 'Invest'],
                ['name' => 'Block Invest', 'code' => '0356', 'description' => 'Grant permition to block mining', 'belongs' => 'Invest'],
                ['name' => 'Unblock Invest', 'code' => '0357', 'description' => 'Grant permition to unblock mining', 'belongs' => 'Invest'],
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
