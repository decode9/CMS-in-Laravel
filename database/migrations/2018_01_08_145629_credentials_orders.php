<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CredentialsOrders extends Migration
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
                /*Ordenes 0200-0249*/
                ['name' => 'Access Orders', 'code' => '0200', 'description' => 'Grant access to orders section' , 'belongs' => 'Orders'],
                ['name' => 'Search Orders', 'code' => '0201', 'description' => 'Grant permition to search orders', 'belongs' => 'Orders'],
                ['name' => 'Create Orders', 'code' => '0202', 'description' => 'Grant permition to create orders', 'belongs' => 'Orders'],
                ['name' => 'Edit Orders', 'code' => '0203', 'description' => 'Grant permition to  edit orders', 'belongs' => 'Orders'],
                ['name' => 'Delete Orders', 'code' => '0204', 'description' => 'Grant permition to delete orders', 'belongs' => 'Orders'],
                ['name' => 'Verify Orders', 'code' => '0205', 'description' => 'Grant permition to verify orders', 'belongs' => 'Orders'],
                ['name' => 'Invite Orders', 'code' => '0206', 'description' => 'Grant permition to invite orders', 'belongs' => 'Orders'],
                ['name' => 'Block Orders', 'code' => '0207', 'description' => 'Grant permition to block orders', 'belongs' => 'Orders'],
                ['name' => 'Unblock Orders', 'code' => '0208', 'description' => 'Grant permition to unblock orders', 'belongs' => 'Orders'],
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
        DB::table('credentials')->where('belongs', 'Orders')->delete();
    }
}
