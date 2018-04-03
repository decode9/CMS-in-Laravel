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
     private function percent($user){
             if($user->hasRole('30')){
                     $userInitial = $user->funds()->where('type', 'initial')->first();
                     $userInvest = $userInitial->amount;
                     $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->where('period_id', $userInitial->period_id)->first();
                     $fundInvest = $fundInitial->amount;
                     $percent = $userInvest / $fundInvest;
                     return $percent;
             }
     }


    public function handle()
    {
        //
        $users = User::whereHas('roles', function ($query) {
          $query->where('code', '30');
        })->get();

        $today = Carbon::now();

        foreach($users as $user){
          if($user->histories()->first() !== null){

              $percent = $this->percent($user);
              $initial = $user->histories()->where('type', 'weekly')->get()->last();

              $initialT = Carbon::parse($initial->register);
              $period = $user->periods()->first();
              $diffD = $initialT->diffInWeeks($today);

              $init = $initialT;

              for($i = 1;$i <= $diffD; $i++){
                $init = $init->addDays(1);
                $sum = 0;
                $initstamp = $init->timestamp;
                $balances = Balance::Where('balances.type', 'fund')->where('user_id', $period->id)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
                  foreach($balances as $balance){
                      if($balance->amount > 0){
                          $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initstamp);
                          $data = json_decode($json);
                          $symbol = $balance->symbol;
                          $balance->value = $data->$symbol->USD;

                          $newamount = $balance->amount * $percent;
                          $na = $newamount * $balance->value;

                      }else{
                         $na = 0;
                      }
                      $sum += $na;
                  }
                  $history = new History;
                  $history->register = $init;
                  $history->amount = $sum;
                  $history->type = "weekly";
                  $history->user()->associate($user);
                  $history->save();
              }
            }
          }

          $historical = History::Where('user_id', null)->where('type', 'weekly')->get()->last();
          $attributes = isset($historical->amount) ? true : false;

          if($attributes){

              $initialGT = Carbon::parse($historical->created_at);

              $diffGD = $initialGT->diffInWeeks($today);

              $initG = $initialGT;
              for($i = 1;$i <= $diffGD; $i++){
                $initG = $initG->addDays(1);
                $sum = 0;
                $initstamp = $initG->timestamp;
                $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
                  foreach($balances as $balance){
                      if($balance->amount > 0){
                          $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym='.$balance->symbol.'&tsyms=USD&ts='.$initstamp);
                          $data = json_decode($json);
                          $symbol = $balance->symbol;
                          $balance->value = $data->$symbol->USD;

                          $newamount = $balance->amount * $balance->value;
                      }else{
                         $newamount = 0;
                      }
                      $sum += $newamount;
                  }
                  $history = new History;
                  $history->register = $initG;
                  $history->amount = $sum;
                  $history->type = "weekly";
                  $history->save();
              }

          }
    }
}
