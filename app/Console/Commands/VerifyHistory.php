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

     private function percent($user){
             if($user->hasRole('30')){
                     $userInitial = $user->funds()->where('type', 'initial')->first();
                     $userInvest = $userInitial->amount;
                     $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->first();
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

            $percent = $this->percent($user);
            $initial = $user->funds()->where('type', 'initial')->first();
            $initialT = $initial->created_at;
            $initialTW = $initial->created_at;
            $initialTM = $initial->created_at;
            $initialA = $initial->amount;

            $diffD = $initialT->diffInDays($today);
            $diffW = $initialT->diffInWeeks($today);
            $diffM = $initialT->diffInMonths($today);

            $init = $initialT;

            for($i = 0;$i <= $diffD; $i++){
              $sum = 0;
              $initstamp = $init->timestamp;
              $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
              foreach($balances as $balance){
                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initstamp);
                $data = json_decode($json);
                $symbol = $balance->symbol;
                $balance->value = $data->$symbol->USD;

                $newamount = $balance->amount * $percent;
                $na = $newamount * $balance->value;
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
              $sum = 0;
              $initWstamp = $initW->timestamp;
              $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
              foreach($balances as $balance){
                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initWstamp);
                $data = json_decode($json);
                $symbol = $balance->symbol;
                $balance->value = $data->$symbol->USD;

                $newamount = $balance->amount * $percent;
                $na = $newamount * $balance->value;
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
              $sum = 0;
              $initMstamp = $initM->timestamp;
              $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
              foreach($balances as $balance){
                $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initMstamp);
                $data = json_decode($json);
                $symbol = $balance->symbol;
                $balance->value = $data->$symbol->USD;

                $newamount = $balance->amount * $percent;
                $na = $newamount * $balance->value;
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

          $initialG = Fund::Where('user_id', null)->where('type', 'initial')->first();
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
            $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initGstamp);
            $data = json_decode($json);
            $symbol = $balance->symbol;
            $balance->value = $data->$symbol->USD;

            $newamount = $balance->amount * $balance->value;
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
            $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initGWstamp);
            $data = json_decode($json);
            $symbol = $balance->symbol;
            $balance->value = $data->$symbol->USD;

            $newamount = $balance->amount * $balance->value;
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
            $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initGMstamp);
            $data = json_decode($json);
            $symbol = $balance->symbol;
            $balance->value = $data->$symbol->USD;

            $newamount = $balance->amount * $balance->value;
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
