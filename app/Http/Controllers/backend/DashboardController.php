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
use App\History;
use App\Period;

class DashboardController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    private function sorting($order, $key) {
      return function ($a, $b) use ($order, $key) {

        if($order == 'DESC'){
          return strnatcmp($a->$key, $b->$key);
        }else{
          if(empty($key)){
             return strnatcmp($b->amount, $a->amount);
          }else{
             return strnatcmp($b->$key, $a->$key);
          }

        }

      };
    }

    private function percent($user){
            if($user->hasRole('30')){
                   $userInitials = $user->funds()->where('type', 'initial')->get();
                   $userInvest = 0;
                   foreach ($userInitials as $initial) {
                     $userInvest += $initial->amount;
                   }
                   $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->where('period_id', null)->first();
                   $fundInvest = $fundInitial->amount;
                   $percent = $userInvest / $fundInvest;
                   return $percent;
            }
    }
    private function url_exists( $url = NULL ) {

        if( empty( $url ) ){
            return false;
        }

        $ch = curl_init($url);

        //Establecer un tiempo de espera
        curl_setopt( $ch, CURLOPT_TIMEOUT, 5 );
        curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5 );

        //establecer NOBODY en true para hacer una solicitud tipo HEAD
        curl_setopt( $ch, CURLOPT_NOBODY, true );
        //Permitir seguir redireccionamientos
        curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
        //recibir la respuesta como string, no output
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

        $data = curl_exec( $ch );

        //Obtener el código de respuesta
        $httpcode = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
        //cerrar conexión
        curl_close( $ch );
        //Aceptar solo respuesta 200 (Ok), 301 (redirección permanente) o 302 (redirección temporal)
        $accepted_response = array( 200, 301, 302);
        if( in_array( $httpcode, $accepted_response ) ) {
            return true;
        } else {
            return false;
        }

    }

    public function balance(Request $request){
      $user = Auth::User();
      if($user->hasRole('30')){
        $balances = array();
            $percent = $this->percent($user);
            $initialsP = $user->funds()->where('type', 'initial')->get();
            $count = 0;
            $ci = 0;

            $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->get();

            foreach ($initialsP as $initialP) {
              if(!(empty($initial))){
                $newini = $initial->amount + $initialP->amount;
                $initial->amount = $newini;
              }else{
                $initial = new \stdClass();
                $initial->amount = $initialP->amount;
                $initial->symbol = 'USD';
                $initial->created_at = $initialP->created_at;
              }
            }

            foreach($balancesP as $balance){
              if(empty($balances[$count])){
                $balances[$count] = new \stdClass();
                $balances[$count]->amount = $balance->amount  * $percent;
                $balances[$count]->value = $balance->value;
                $balances[$count]->symbol = $balance->symbol;
                $balances[$count]->type = $balance->type;
                $balances[$count]->name = $balance->name;
                $balances[$count]->equivalent = 0;
                $balances[$count]->percent = 0;
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

      }else{
        $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->orderBy('amount', 'DESC')->get();
        $count = 0;
        foreach($balancesP as $balance){
          if(empty($balances[$count])){
            $balances[$count] = new \stdClass();
            $balances[$count]->amount = $balance->amount;
            $balances[$count]->value = $balance->value;
            $balances[$count]->symbol = $balance->symbol;
            $balances[$count]->type = $balance->type;
            $balances[$count]->name = $balance->name;
            $balances[$count]->equivalent = 0;
            $balances[$count]->percent = 0;
            $balances[$count]->value_btc = 0;
          }else{
            foreach ($balances as $bal) {
              if($bal->symbol == $balance->symbol){
                $newBals = $bal->amount + $balance->amount;
                $bal->amount = $newBals;
              }
            }
          }
            $count += 1;
        }
        $initial = Fund::Where('user_id', null)->where('funds.type', 'initial')->where('period_id', null)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('amount', 'symbol', 'funds.created_at')->first();
      }

      $usd = 0;
      $btc = 0;
      $chart['symbol'] = [];
      $chart['amount'] = [];

      foreach($balances as $balance){
          if($balance->value == "coinmarketcap"){
            $url = 'api.coinmarketcap.com/v1/ticker/'. $balance->name;
              if($this->url_exists($url)){
                  $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
                  $data = json_decode($json);
                  $balance->value = $data[0]->price_usd;
                  $balance->value_btc = $data[0]->price_btc;
                  $symbol = $balance->symbol;

              }else{
                if(strtolower($balance->name) == 'originprotocol' || (strtolower($balance->name) == 'send' || strtolower($balance->name) == 'tari')){
                  $balance->value = 1;
                  $balance->value_btc = 0.0000000000001;
                }else{
                  $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/ethereum');
                  $data = json_decode($json);
                  $balance->value = $data[0]->price_usd;
                  $balance->value_btc = $data[0]->price_btc;
                }
              }
          }
          array_push($chart['symbol'], $balance->symbol);
          if($balance->symbol == "VEF"){
            $balance->value_btc = 238000;
            $btcvalue = 0;
            $balance->img = "none";
          }else{
            $btcvalue = $balance->amount * $balance->value_btc;
          }
          if($balance->symbol == "USD"){
              $balance->img = "none";
            $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin');
            $data = json_decode($json);
            $balance->value_btc = $data[0]->price_usd;
            $btcvalue = $balance->amount / $balance->value_btc;
          }

          $usdvalue = $balance->amount * $balance->value;
          array_push($chart['amount'], $usdvalue);


          $usd += $usdvalue;
          $btc += $btcvalue;
      }
      foreach ($balances as $balance) {
          $usdvalue = $balance->amount * $balance->value;
          $balance->percent = ($usdvalue / $usd) * 100;
          $balance->equivalent = $usdvalue;
      }

      $initstamp = $initial->created_at->timestamp;

      $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts='.$initstamp);
      $data = json_decode($json);

      $btcU = $data->BTC->USD;

      $btcI = $initial->amount / $btcU;

       $profit = $usd - $initial->amount;
       $Tpercent = $profit / $initial->amount;
       $Tpercent = $Tpercent * 100;
       usort($balances, $this->sorting('', 'equivalent'));
      return response()->json(['result' => $balances, 'initial' => $initial, 'usd' => $usd, 'btc' => $btc, 'profit' => $profit, 'percent' => $Tpercent , 'chart' => $chart, 'initialb' => $btcI], 202);
    }

    public function newsletter(){

      $newsletters = Newsletter::LeftJoin('users', 'newsletters.user_id', '=', 'users.id')->select('newsletters.*', 'name')->orderBy('newsletters.created_at')->get();

      foreach($newsletters as $newsletter){
        $date = $newsletter->created_at->toFormattedDateString();;
        $newsletter->date = $date;
      }
      return response()->json(['result' => $newsletters], 202);
    }

    public function historyChart(Request $request){
      $type = $request->type;
      $user = Auth::User();
      $chart['register'] = [];
      $chart['amount'] = [];
      $query = History::Where('type', $type)->select('register', 'amount')->orderBy('register');

      if($user->hasRole(30)){
        $query->where('user_id', $user->id);
      }else{
        $query->where('user_id', null);
      }
      $histories = $query->get();
      foreach($histories as $history){
        array_push($chart['amount'], $history->amount);
        array_push($chart['register'], $history->register);
      }

      return response()->json(['result' => $chart], 202);
    }

    public function periods(){
      $user = Auth::user();

      if($user->hasRole(30)){
        $percent = $this->percent($user);

        $periods = $user->periods()->get();

        foreach($periods as $period){
          $fund = $user->funds()->where('type', 'initial')->first();

          $period->open_amount = $fund->amount;
          if($period->close_amount !== 0){
            $period->close_amount = $period->close_amount * $percent;
            $change = ($period->close_amount / $period->open_amount) * 100;
            $period->diff_change = $change;
          }

        }
      }else{
        $periods = Period::all();
        foreach($periods as $period){
          $change = ($period->close_amount / $period->open_amount) * 100;
          $period->diff_change = $change;
        }
      }
      return response()->json(['result' => $periods], 202);
    }

}
