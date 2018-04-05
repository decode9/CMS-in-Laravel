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

    private function percent($user){
            if($user->hasRole('30')){
                    $userInitials = $user->funds()->where('type', 'initial')->get();
                    $userInvest = 0;
                    $fundInvest = 0;
                    foreach($userInitials as $initial){
                        $userInvest += $initial->amount;
                        $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->where('period_id', $initial->period_id)->first();
                        $fundInvest += $fundInitial->amount;
                    }

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
        $periods = $user->periods()->get();
        foreach ($periods as $period) {
            $count = 0;
            $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', $period->id)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->get();
            foreach($balancesP as $balance){
                $balances[$count] = new \stdClass();
                if(!(property_exists($balances[$count], 'amount'))){
                    $balances[$count]->amount = $balance->amount;
                    $balances[$count]->value = $balance->value;
                    $balances[$count]->symbol = $balance->symbol;
                    $balances[$count]->name = $balance->name;
                    $balances[$count]->value_btc = 0;
                }else{
                    $balances[$count]->amount =$balances[$count]->amount + $balance->amount;
                }
                $count += 1;
            }
        }

      }
      $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->get();
      $initial = Fund::Where('user_id', null)->where('funds.type', 'initial')->where('period_id', null)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('amount', 'symbol', 'funds.created_at')->first();
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
                  $balance->value = 0.1;
                  $balance->value_btc = 0.00001;
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
      foreach ($balances as $balance) {
          $usdvalue = $balance->amount * $balance->value;
          if($user->hasRole('30')){
            $percent = $this->percent($user);
            $camount = $usdvalue * $percent;
            $balance->percent = ($camount / $usd) * 100;
          }else{
          $balance->percent = ($usdvalue / $usd) * 100;
          }
      }

      $initstamp = $initial->created_at->timestamp;

      $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts='.$initstamp);
      $data = json_decode($json);

      $btcU = $data->BTC->USD;

      $btcI = $initial->amount / $btcU;

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
          $btcI = $btcI * $percent;
      }



       $profit = $usd - $initial->amount;
       $Tpercent = $profit / $initial->amount;
       $Tpercent = $Tpercent * 100;

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
