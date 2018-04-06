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

     private function percent($user, $period){
             if($user->hasRole('30')){
                     $userInitials = $user->funds()->where('type', 'initial')->where('period_id', $period)->first();

                    $userInvest = $userInitials->amount;
                    $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->where('period_id', $period)->first();
                    $fundInvest = $fundInitial->amount;


                     $percent = $userInvest / $fundInvest;
                     return $percent;
             }
     }

    public function handle()
    {
      $users = User::whereHas('roles', function ($query) {
        $query->where('code', '30');
      })->get();

      $today = Carbon::now();

      foreach($users as $user){
        if($user->histories()->first() == null){
          $periods = $user->periods()->get();
          $peri = $user->periods()->first();
            $initial = $user->funds()->where('type', 'initial')->where('period_id', $peri->id)->first();
            $initialT = $initial->created_at;
            $initialTW = $initial->created_at;
            $initialTM = $initial->created_at;
            $initialA = $initial->amount;

            $diffD = $initialT->diffInDays($today);
            $diffW = $initialT->diffInWeeks($today);
            $diffM = $initialT->diffInMonths($today);

            $init = $initialT;

            for($i = 0;$i <= $diffD; $i++){
              $balances = array();
              $sum = 0;
              $initstamp = $init->timestamp;
              foreach ($periods as $period) {
                $percent = $this->percent($user, $period->id);
                  $count = 0;
                  $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', $period->id)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
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
              }
              foreach($balances as $balance){
                  if($balance->amount > 0){
                      $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initstamp);
                      $data = json_decode($json);
                      $symbol = $balance->symbol;
                      if(isset($data->Response)){
                        $this->info('Daily: '. $balance->symbol . ' '. $data->Response);
                        if(strtolower($balance->symbol) == 'origin' || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){
                          $balance->value = 1;
                        }else{
                          $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initstamp);
                          $data = json_decode($json);
                          $balance->value = $data->ETH->USD;

                        }
                      }else{
                        $this->info('Daily: '. $balance->symbol . ' value: '. $data->$symbol->USD);
                        $balance->value = $data->$symbol->USD;
                      }

                      $na = $balance->amount * $balance->value;
                  }else{
                     $na = 0;
                  }
                  $sum += $na;
              }
              $history = new History;
              $history->register = $init;
              if($i == 0){
                $history->amount = $initialA;
              }else{
                $history->amount = $sum;
              }
              $history->type = "daily";
              $history->user()->associate($user);
              $history->save();
              $init = $init->addDays(1);
            }

            $initW = $initialTW;
            for($i = 0;$i <= $diffW; $i++){
              $balances = array();
              $sum = 0;
              $initWstamp = $initW->timestamp;
              foreach ($periods as $period) {
                $percent = $this->percent($user, $period->id);
                  $count = 0;
                  $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', $period->id)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
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
              }
              foreach($balances as $balance){
                  if($balance->amount > 0){
                    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initstamp);
                    $data = json_decode($json);
                    $symbol = $balance->symbol;
                    if(isset($data->Response)){

                      if(strtolower($balance->symbol) == 'origin' || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){
                        $balance->value = 1;
                      }else{
                        $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initstamp);

                        $data = json_decode($json);
                        $balance->value = $data->ETH->USD;
                      }
                    }else{
                      $balance->value = $data->$symbol->USD;
                    }
                      $na = $balance->amount  * $balance->value;

                  }else{
                     $na = 0;
                  }
                $sum += $na;
              }
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

            $initM = $initialTM;
            for($i = 0;$i <= $diffM; $i++){
              $balances = array();
              $sum = 0;
              $initMstamp = $initM->timestamp;
              foreach ($periods as $period) {
                $percent = $this->percent($user, $period->id);
                  $count = 0;
                  $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', $period->id)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
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
              }
              foreach($balances as $balance){
                  if($balance->amount > 0){
                    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initstamp);
                    $data = json_decode($json);
                    $symbol = $balance->symbol;
                    if(isset($data->Response)){
                      if(strtolower($balance->symbol) == 'origin' || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){
                        $balance->value = 1;
                      }else{
                        $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initstamp);
                        $data = json_decode($json);
                        $balance->value = $data->ETH->USD;
                      }
                    }else{
                      $balance->value = $data->$symbol->USD;
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

      $historical = History::Where('user_id', null)->get();
      $attributes = isset($historical->amount) ? false : true;

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
          $balancesG = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
          foreach($balancesG as $balance){
              if($balance->amount > 0){
                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initGstamp);
                $data = json_decode($json);
                $symbol = $balance->symbol;
                if(isset($data->Response)){
                  if(strtolower($balance->symbol) == 'origin' || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){
                    $balance->value = 1;
                  }else{
                    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGstamp);
                    $data = json_decode($json);
                    $balance->value = $data->ETH->USD;
                  }
                }else{
                  $balance->value = $data->$symbol->USD;
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
          $balancesG = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
          foreach($balancesG as $balance){
              if($balance->amount > 0){
                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initGWstamp);
                $data = json_decode($json);
                $symbol = $balance->symbol;
                if(isset($data->Response)){
                  if(strtolower($balance->symbol) == 'origin' || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){
                    $balance->value = 1;
                  }else{
                    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGWstamp);
                    $data = json_decode($json);
                    $balance->value = $data->ETH->USD;
                  }
                }else{
                  $balance->value = $data->$symbol->USD;
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
          $balancesG = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
          foreach($balancesG as $balance){
              if($balance->amount > 0){
                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initGMstamp);
                $data = json_decode($json);
                $symbol = $balance->symbol;
                if(isset($data->Response)){
                  if(strtolower($balance->symbol) == 'origin' || (strtolower($balance->symbol) == 'sdt' || strtolower($balance->symbol) == 'tari')){
                    $balance->value = 1;
                  }else{
                    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts='.$initGMstamp);
                    $data = json_decode($json);
                    $balance->value = $data->ETH->USD;
                  }
                }else{
                  $balance->value = $data->$symbol->USD;
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
