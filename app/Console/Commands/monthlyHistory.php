<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\History;
use App\User;
use App\Balance;
use App\Fund;
use Carbon\Carbon;

class monthlyHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'history:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update monthly historical data';

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
                     $userInitials = $user->funds()->where('type', 'initial')->get();
                     $userInvest = 0;
                     foreach($userInitials as $initial){
                         $userInvest += $initial->amount;
                     }
                     $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->where('period_id', null)->first();
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
              $initial = $user->histories()->where('type', 'monthly')->get()->last();

              $initialT = Carbon::parse($initial->register);
              $periods = $user->periods()->get();
              $diffD = $initialT->diffInMonths($today);

              $init = $initialT;

              for($i = 1;$i <= $diffD; $i++){
                $init = $init->addMonths(1);
                $sum = 0;
                $initstamp = $init->timestamp;
                foreach ($periods as $period) {
                    $count = 0;
                    $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', $period->id)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
                    foreach($balancesP as $balance){
                        $balances[$count] = new \stdClass();
                        if(property_exists($balances[$count], 'amount')){
                            $balances[$count]->amount = $balance->amount;
                            $balances[$count]->value = $balance->value;
                            $balances[$count]->symbol = $balance->symbol;
                            $balances[$count]->type = $balance->type;
                            $balances[$count]->name = $balance->name;
                            $balances[$count]->value_btc = 0;
                        }else{
                           $balances[$count]->amount += $balance->amount;
                        }
                        $count += 1;
                    }
                }
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
                  $history->type = "monthly";
                  $history->user()->associate($user);
                  $history->save();
              }
            }
          }

          $historical = History::Where('user_id', null)->where('type', 'monthly')->get()->last();
          $attributes = isset($historical->amount) ? true : false;

          if($attributes){

              $initialGT = Carbon::parse($historical->register);

              $diffGD = $initialGT->diffInMonths($today);

              $initG = $initialGT;
              for($i = 1;$i <= $diffGD; $i++){
                $initG = $initG->addMonths(1);
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
                  $history->type = "monthly";
                  $history->save();
              }

          }
    }
}
