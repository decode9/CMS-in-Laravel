<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\History;
use App\User;
use App\Balance;
use App\Fund;
use Carbon\Carbon;

class VerifyHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'history:verify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verify if Historical Data exist in the system';

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

        $this->info('Start History Data For User '. $user->name);

        //Verify If User Has Daily histories and has a period
        if($user->histories()->first() == null && $user->periods()->first() !== null){

          //Show In terminal
          $this->info('User: '. $user->name . ' Initiate Data History');

          //Select Last Date
          $initial = $user->funds()->where('type', 'initial')->where('period_id', $peri->id)->first();

          $initialT = $initial->created_at;
          $initialTW = $initial->created_at;
          $initialTM = $initial->created_at;
          $initialA = $initial->amount;

          //Diference beetween Last date and actual date
          $diffD = $initialT->diffInDays($today);
          $diffW = $initialT->diffInWeeks($today);
          $diffM = $initialT->diffInMonths($today);

          // Declare Initial Date for Daily
          $init = $initialT;

          //Loop Dates for Daily
          for($i = 0;$i <= $diffD; $i++){

            $this->info('Daily: Date '. $init->toFormattedDateString());

            //Create Array
            $balances = array();

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

                  $this->info('Daily: '. $balance->symbol . ' '. $data->Response);

                  //Check Symbols for assign values
                  if((strtolower($symbol) == 'hedge' || strtolower($symbol) == 'origin') || (strtolower($symbol) == 'sdt' || strtolower($symbol) == 'tari')){

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

                  $this->info('Daily: '. $balance->symbol . ' value: '. $data->$symbol->USD);

                  //Check Symbol for assign Values
                  if(strtolower($symbol) == 'prs'){
                    sleep(1);

                    $json2 = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initstamp);
                    $data2 = json_decode($json2);

                    //Put Data USD As Value
                    $balance->value = $data2->ETH->USD;

                  }else{

                    //Put Data USD As Value
                    $balance->value = $data->$symbol->USD;

                  }
                }

                //Assign USD Amount for balance
                $na = $balance->amount * $balance->value;

                $this->info('Daily: '. $balance->symbol . ' amount: '. $balance->amount . ' newAmount: ' . $na);

              }else{

                // Assign USD Amount as 0 if balance is equal to 0
                $na = 0;

              }

              //USD Amount Summatory
              $sum += $na;

            }

            $this->info('Daily: Date '. $init->toFormattedDateString(). ' Total: ' . $sum);

            //Create Date History in Database
            $history = new History;
            $history->register = $init;

            //If is the first historical data put the initial Amount as amount
            if($i == 0){

              $history->amount = $initialA;

            }else{

              $history->amount = $sum;

            }

            $history->type = "daily";
            $history->user()->associate($user);
            $history->save();

            //Add Days To Initial Time
            $init = $init->addDays(1);

          }

          $this->info('End Daily Historical Data');

          $this->info('Start Weekly History Data');

          //Declare initial date for Weekly
          $initW = $initialTW;

          //Loop Dates for Weekly
          for($i = 0;$i <= $diffW; $i++){

            $this->info('Weekly: Date '. $initW->toFormattedDateString());

            $balances = array();

            $sum = 0;

            $initWstamp = $initW->timestamp;

            $percent = $this->percent($user);

            $count = 0;

            $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

            foreach($balancesP as $balance){

              if(empty($balances[$count])){

                $balances[$count] = new \stdClass();

                $balances[$count]->amount = $balance->amount  * $percent;
                $balances[$count]->value = $balance->value;
                $balances[$count]->symbol = $balance->symbol;
                $balances[$count]->type = $balance->type;
                $balances[$count]->name = $balance->name;
                $balances[$count]->value_btc = 0;

              }else{

                foreach ($balances as $bal) {

                  if($bal->symbol == $balance->symbol){

                    $newBals = $bal->amount + ($balance->amount  * $percent);
                    $bal->amount = $newBals;

                  }
                }
              }
              $count += 1;
            }

            foreach($balances as $balance){

              if($balance->amount > 0){

                $symbol = $balance->symbol;

                sleep(1);

                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$symbol.'&tsyms=USD&ts='.$initWstamp);
                $data = json_decode($json);

                if(isset($data->Response)){

                  $this->info('Weekly: '. $balance->symbol . ' '. $data->Response);

                  if((strtolower($symbol) == 'hedge' || strtolower($symbol) == 'origin')|| (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){

                    $balance->value = 1;

                  }else{

                    if(strtolower($symbol) == 'npxs'){

                      $balance->value = 0.001;

                    }else{

                      sleep(1);

                      $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initWstamp);
                      $data = json_decode($json);

                      $balance->value = $data->ETH->USD;
                    }
                  }
                }else{

                  $this->info('Weekly: '. $balance->symbol . ' value: '. $data->$symbol->USD);

                  if(strtolower($symbol) == 'prs'){

                    sleep(1);

                    $json2 = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initWstamp);
                    $data2 = json_decode($json2);

                    $balance->value = $data2->ETH->USD;

                  }else{

                    $balance->value = $data->$symbol->USD;

                  }
                }

                $na = $balance->amount  * $balance->value;

                $this->info('Weekly: '. $balance->symbol . ' amount: '. $balance->amount . ' newAmount: ' . $na);
              }else{
                $na = 0;
              }
              $sum += $na;
            }

            $this->info('Weekly: Date '. $initW->toFormattedDateString(). ' Total: ' . $sum);

            $history = new History;
            $history->register = $initW;

            if($i == 0){

              $history->amount = $initialA;

            }else{

              $history->amount = $sum;

            }

            $history->type = "weekly";
            $history->user()->associate($user);
            $history->save();

            $initW = $initW->addWeeks(1);

          }

          $this->info('End Weekly Historical Data');

          $this->info('Start Monthly History Data');

          //Declare initial date for Monthly
          $initM = $initialTM;

          //Loop Dates for Weekly
          for($i = 0;$i <= $diffM; $i++){

            $balances = array();

            $sum = 0;

            $initMstamp = $initM->timestamp;

            $percent = $this->percent($user);

            $count = 0;

            $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

            foreach($balancesP as $balance){

              if(empty($balances[$count])){

                $balances[$count] = new \stdClass();

                $balances[$count]->amount = $balance->amount  * $percent;
                $balances[$count]->value = $balance->value;
                $balances[$count]->symbol = $balance->symbol;
                $balances[$count]->type = $balance->type;
                $balances[$count]->name = $balance->name;
                $balances[$count]->value_btc = 0;

              }else{

                foreach ($balances as $bal) {

                    if($bal->symbol == $balance->symbol){

                      $newBals = $bal->amount + ($balance->amount  * $percent);
                      $bal->amount = $newBals;

                    }
                  }
                }

                $count += 1;

              }

              foreach($balances as $balance){
                if($balance->amount > 0){

                  $symbol = $balance->symbol;

                  sleep(1);

                  $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$symbol.'&tsyms=USD&ts='.$initMstamp);
                  $data = json_decode($json);

                  if(isset($data->Response)){

                    if((strtolower($symbol) == 'hedge' || strtolower($symbol) == 'origin') || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){

                        $balance->value = 1;

                    }else{

                      if(strtolower($symbol) == 'npxs'){

                        $balance->value = 0.001;

                      }else{

                        sleep(1);

                        $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initMstamp);
                        $data = json_decode($json);

                        $balance->value = $data->ETH->USD;
                      }
                    }
                  }else{

                    if(strtolower($symbol) == 'prs'){

                      sleep(1);

                      $json2 = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initMstamp);
                      $data2 = json_decode($json2);

                      $balance->value = $data2->ETH->USD;
                    }else{

                      $balance->value = $data->$symbol->USD;

                    }
                  }

                  $na = $balance->amount * $balance->value;

                }else{

                  $na = 0;

                }

                $sum += $na;

              }

              $history = new History;
              $history->register = $initM;

              if($i == 0){

                $history->amount = $initialA;

              }else{

                $history->amount = $sum;

              }

              $history->type = "monthly";
              $history->user()->associate($user);
              $history->save();

              $initM = $initM->addMonths(1);
            }
          }
        }

        //Select Last historical Data from database for Fund
        $historical = History::Where('user_id', null)->first();

        //Assign boolean if exist historical
        $attributes = isset($historical->amount) ? false : true;

        //Check Attributes Variable
        if($attributes){

          $initialG = Fund::Where('user_id', null)->where('period_id', null)->where('type', 'initial')->first();

          $initialGT = $initialG->created_at;
          $initialGTW = $initialG->created_at;
          $initialGTM = $initialG->created_at;

          $initialGA = $initialG->amount;

          $diffGD = $initialGT->diffInDays($today);
          $diffGW = $initialGT->diffInWeeks($today);
          $diffGM = $initialGT->diffInMonths($today);

          $initG = $initialGT;

          for($i = 0;$i <= $diffGD; $i++){

            $sum = 0;

            $initGstamp = $initG->timestamp;

            $balancesG = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

            foreach($balancesG as $balance){

              if($balance->amount > 0){

                $symbol = $balance->symbol;

                sleep(1);

                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$symbol.'&tsyms=USD&ts='.$initGstamp);
                $data = json_decode($json);

                if(isset($data->Response)){

                  if(strtolower($balance->symbol) == 'origin' || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){

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

              }else{

                $newamount = 0;

              }

              $sum += $newamount;

          }

          $historyG = new History;
          $historyG->register = $initG;

          if($i == 0){

            $historyG->amount = $initialGA;

          }else{

            $historyG->amount = $sum;

          }

          $historyG->type = "daily";
          $historyG->save();

          $initG = $initG->addDays(1);
        }

        $initGW = $initialGTW;

        for($i = 0;$i <= $diffGW; $i++){

          $sum = 0;

          $initGWstamp = $initGW->timestamp;

          $balancesG = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

          foreach($balancesG as $balance){

            if($balance->amount > 0){

              $symbol = $balance->symbol;

              sleep(1);

              $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$symbol.'&tsyms=USD&ts='.$initGWstamp);

              $data = json_decode($json);

              if(isset($data->Response)){

                if((strtolower($symbol) == 'hedge' || strtolower($symbol) == 'origin') || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){

                  $balance->value = 1;

                }else{

                  if(strtolower($symbol) == 'npxs'){

                    $balance->value = 0.001;

                  }else{

                    sleep(1);

                    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGWstamp);
                    $data = json_decode($json);

                    $balance->value = $data->ETH->USD;
                  }
                }
              }else{

                if(strtolower($symbol) == 'prs'){

                  sleep(1);

                  $json2 = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGWstamp);
                  $data2 = json_decode($json2);

                  $balance->value = $data2->ETH->USD;

                }else{

                  $balance->value = $data->$symbol->USD;

                }
              }

              $newamount = $balance->amount * $balance->value;

            }else{

              $newamount = 0;

            }

            $sum += $newamount;

          }

          $historyG = new History;

          $historyG->register = $initGW;

          if($i == 0){

            $historyG->amount = $initialGA;

          }else{

            $historyG->amount = $sum;

          }

          $historyG->type = "weekly";
          $historyG->save();

          $initGW = $initGW->addWeeks(1);
        }

        $initGM = $initialGTM;

        for($i = 0;$i <= $diffGM; $i++){

          $sum = 0;

          $initGMstamp = $initGM->timestamp;

          $balancesG = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

          foreach($balancesG as $balance){

            if($balance->amount > 0){

              $symbol = $balance->symbol;

              sleep(1);

              $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$symbol.'&tsyms=USD&ts='.$initGMstamp);
              $data = json_decode($json);

              if(isset($data->Response)){

                if((strtolower($symbol) == 'hedge' || strtolower($symbol) == 'origin') || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){

                  $balance->value = 1;

                }else{

                  if(strtolower($symbol) == 'npxs'){

                    $balance->value = 0.001;

                  }else{

                    sleep(1);

                    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGMstamp);
                    $data = json_decode($json);

                    $balance->value = $data->ETH->USD;

                  }
                }
              }else{

                if(strtolower($symbol) == 'prs'){

                  sleep(1);

                  $json2 = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGMstamp);
                  $data2 = json_decode($json2);

                  $balance->value = $data2->ETH->USD;

                }else{

                  $balance->value = $data->$symbol->USD;

                }
              }

              $newamount = $balance->amount * $balance->value;

            }else{

              $newamount = 0;

            }

            $sum += $newamount;
          }

          $historyG = new History;
          $historyG->register = $initGM;

          if($i == 0){

            $historyG->amount = $initialGA;

          }else{

            $historyG->amount = $sum;

          }

          $historyG->type = "monthly";
          $historyG->save();

          $initGM = $initGM->addMonths(1);
        }
      }
    }
}
