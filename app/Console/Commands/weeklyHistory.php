<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\History;
use App\User;
use App\Balance;
use App\Fund;
use Carbon\Carbon;

class weeklyHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'history:weekly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update weekly historical data';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
     // Fund Percent Function for user with client roles
     private function percent($user){

       //Check if user has client role
       if($user->hasRole('30')){

         // Take Initial Invest From User
         $userInitials = $user->funds()->where('type', 'initial')->get();
         $userInvest = 0;
         foreach ($userInitials as $initial) {
           $userInvest += $initial->amount;
         }

         // Take Initial Invest From Fund
         $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->where('period_id', null)->first();
         $fundInvest = $fundInitial->amount;
         $percent = $userInvest / $fundInvest;

         // Return user Fund Percent
         return $percent;
       }
     }

     public function handle(){

       //Select Users With Client Role
       $users = User::whereHas('roles', function ($query) {
         $query->where('code', '30');
       })->get();

       //Select Actual Date
       $today = Carbon::now();

       //Loop Users
       foreach($users as $user){

         //Verify If User Has Weekly histories and has a period
         if($user->histories()->first() !== null && $user->periods()->first() !== null){

           //Show In terminal
           $this->info('Start History Data For User '. $user->name);

           //Select Last Date
           $initial = $user->histories()->where('type', 'weekly')->get()->last();
           $initialT = Carbon::parse($initial->register);

           //Diference beetween Last date and actual date
           $diffD = $initialT->diffInWeeks($today);

           // Declare Initial Date
           $init = $initialT;

           //Loop Dates
           for($i = 1;$i <= $diffD; $i++){

             //Create Array
             $balances = array();

             //Add Day
             $init = $init->addWeeks(1);

             $this->info('Weekly: Date '. $init->toFormattedDateString());

             //Declare Sumatory
             $sum = 0;

             //Select initial date timestamp
             $initstamp = $init->timestamp;

             //Select User Percent
             $percent = $this->percent($user);

             //declare count
             $count = 0;

             //Select Balances
             $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

             //Loop Balances
             foreach($balancesP as $balance){

               //Check if $balances array if empty
               if(empty($balances[$count])){

                 //Create an object inside the array and put variables.
                 $balances[$count] = new \stdClass();
                 $balances[$count]->amount = $balance->amount  * $percent;
                 $balances[$count]->value = $balance->value;
                 $balances[$count]->symbol = $balance->symbol;
                 $balances[$count]->type = $balance->type;
                 $balances[$count]->name = $balance->name;
                 $balances[$count]->value_btc = 0;

               }else{

                 //If $balance array is not empty change variable amount
                 foreach ($balances as $bal) {
                   if($bal->symbol == $balance->symbol){
                     $newBals = $bal->amount + ($balance->amount  * $percent);
                     $bal->amount = $newBals;
                   }
                 }

               }

               //add one to count
               $count += 1;
             }

             //Loop $balances array
             foreach($balances as $balance){
               //Verify if balance amount is greater than 0
               if($balance->amount > 0){

                 //select Symbol balance
                 $symbol = $balance->symbol;

                 //Sleep System for 1 second
                 sleep(1);

                 //Get price historical data from CryptoCompare
                 $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$symbol.'&tsyms=USD&ts='.$initstamp);
                 $data = json_decode($json);

                 //Verify If Get Error from CryptoCompare
                 if(isset($data->Response)){
                   $this->info('Weekly: '. $balance->symbol . ' '. $data->Response);

                   //Check Symbols for assign values
                   if((strtolower($symbol) == 'hedge' || strtolower($symbol) == 'origin') || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){

                     //Put Balance Value
                     $balance->value = 1;

                   }else{
                     if(strtolower($symbol) == 'npxs'){

                       //Put Balance Value
                       $balance->value = 0.001;

                     }else{

                       sleep(1);

                       $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initstamp);
                       $data = json_decode($json);

                       //Put Data USD As Value
                       $balance->value = $data->ETH->USD;
                     }
                   }
                 }else{

                   $this->info('Weekly: '. $balance->symbol . ' value: '. $data->$symbol->USD);

                   //Check Symbol for assign Values
                   if(strtolower($symbol) == 'prs'){

                     sleep(1);

                     $json2 = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initstamp);
                     $data2 = json_decode($json2);
                     $balance->value = $data2->ETH->USD;

                   }else{

                     $balance->value = $data->$symbol->USD;

                   }
                 }
                 //Assign USD Amount for balance
                 $na = $balance->amount * $balance->value;

                 $this->info('Weekly: '. $balance->symbol . ' amount: '. $balance->amount . ' newAmount: ' . $na);

               }else{
                 // Assign USD Amount as 0 if balance is equal to 0
                 $na = 0;

               }

               //USD Amount Summatory
               $sum += $na;
             }

             $this->info('Weekly: Date '. $init->toFormattedDateString(). ' Total: ' . $sum);

             //Create Date History in Database
             $history = new History;
             $history->register = $init;
             $history->amount = $sum;
             $history->type = "weekly";
             $history->user()->associate($user);

             $history->save();
           }

           $this->info('End Weekly Historical Data for '. $user->name);

         }
       }

       //Select Last historical Data from database for Fund
       $historical = History::Where('user_id', null)->where('type', 'weekly')->get()->last();

       //Assign boolean if exist historical
       $attributes = isset($historical->amount) ? true : false;

       //Check Attributes Variable
       if($attributes){

         $this->info('Start History Data For Fund');

         $initialGT = Carbon::parse($historical->register);
         $diffGD = $initialGT->diffInWeeks($today);
         $initG = $initialGT;

         for($i = 1;$i <= $diffGD; $i++){

           $this->info('Weekly: Date '. $initG->toFormattedDateString());

           $sum = 0;

           $initG = $initG->addWeeks(1);
           $initGstamp = $initG->timestamp;

           $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

           foreach($balances as $balance){

             if($balance->amount > 0){

               $symbol = $balance->symbol;

               sleep(1);

               $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$symbol.'&tsyms=USD&ts='.$initGstamp);
               $data = json_decode($json);

               if(isset($data->Response)){
                 $this->info('Weekly: '. $balance->symbol . ' '. $data->Response);

                 if((strtolower($symbol) == 'hedge' || strtolower($symbol) == 'origin') || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){

                   $balance->value = 1;

                 }else{

                   if(strtolower($symbol) == 'npxs'){

                     $balance->value = 0.001;

                   }else{

                     sleep(1);

                     $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGstamp);
                     $data = json_decode($json);

                     $balance->value = $data->ETH->USD;

                   }
                 }
               }else{

                 $this->info('Weekly: '. $balance->symbol . ' value: '. $data->$symbol->USD);

                 if(strtolower($symbol) == 'prs'){

                   sleep(1);
                   $json2 = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGstamp);
                   $data2 = json_decode($json2);
                   $balance->value = $data2->ETH->USD;

                 }else{

                   $balance->value = $data->$symbol->USD;

                 }
               }

               $newamount = $balance->amount * $balance->value;
               $this->info('Weekly: '. $balance->symbol . ' amount: '. $balance->amount . ' newAmount: ' . $newamount);

             }else{

               $newamount = 0;

             }

             $sum += $newamount;

           }

           $this->info('Weekly: Date '. $initG->toFormattedDateString(). ' Total: ' . $sum);

           $history = new History;
           $history->register = $initG;
           $history->amount = $sum;
           $history->type = "weekly";
           $history->save();
         }
       }
     }
}
