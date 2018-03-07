<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Currency;
use App\Fund;
use App\Balance;
use App\FundOrder;
use App\Newsletter;

class DashboardController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

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

    public function balance(Request $request){
      $user = Auth::User();
      $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->get();
      $initial = Fund::Where('user_id', null)->where('funds.type', 'initial')->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('amount', 'symbol')->first();
      $usd = 0;
      $btc = 0;
      $chart['symbol'] = [];
      $chart['amount'] = [];
      foreach($balances as $balance){
          if($balance->value == "coinmarketcap"){
              $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
              $data = json_decode($json);
              $balance->value = $data[0]->price_usd;
              $balance->value_btc = $data[0]->price_btc;
          }
          array_push($chart['symbol'], $balance->symbol);
          if($balance->symbol == "VEF"){
            $balance->value_btc = 238000;
            $btcvalue = 0;
          }else{
            $btcvalue = $balance->amount * $balance->value_btc;
          }
          if($balance->symbol == "USD"){
            $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin');
            $data = json_decode($json);
            $balance->value_btc = $data[0]->price_usd;
            $btcvalue = $balance->amount / $balance->value_btc;
          }
          $usdvalue = $balance->amount * $balance->value;
          if($user->hasRole('30')){
            $percent = $this->percent($user);
            $camount = $usdvalue * $percent;
            array_push($chart['amount'], $camount);
          }else{
          array_push($chart['amount'], $usdvalue);
          }

          $usd += $usdvalue;
          $btc += $btcvalue;
      }
      if($user->hasRole('30')){
          $percent = $this->percent($user);
          foreach($balances as $balance){
            $newamount = $balance->amount * $percent;
            $balance->amount = $newamount;
          }
          $newinitial = $initial->amount * $percent;
          $initial->amount = $newinitial;
          $usd = $usd * $percent;
          $btc = $btc * $percent;
      }
       $profit = $usd - $initial->amount;
       $Tpercent = $profit / $initial->amount;
       $Tpercent = $Tpercent * 100;

      return response()->json(['result' => $balances, 'initial' => $initial, 'usd' => $usd, 'btc' => $btc, 'profit' => $profit, 'percent' => $Tpercent , 'chart' => $chart], 202);
    }

    public function newsletter(){

      $newsletters = Newsletter::LeftJoin('users', 'newsletters.user_id', '=', 'users.id')->select('newsletters.*', 'name')->get();

      return response()->json(['result' => $newsletters], 202);

    }
}
