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
                    $userInitial = $user->funds()->where('type', 'initial')->get()->last();
                    $userInvest = $userInitial->amount;
                    $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->get()->last();
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
      $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->get();
      $initial = Fund::Where('user_id', null)->where('funds.type', 'initial')->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('amount', 'symbol', 'funds.created_at')->first();
      $usd = 0;
      $btc = 0;
      $chart['symbol'] = [];
      $chart['amount'] = [];
      $jsonimg = file_get_contents('https://www.cryptocompare.com/api/data/coinlist/');
      $dataimg = json_decode($jsonimg);
      $baseimg = $dataimg->BaseImageUrl;

      foreach($balances as $balance){
          if($balance->value == "coinmarketcap"){
            $url = 'api.coinmarketcap.com/v1/ticker/'. $balance->name;
              if($this->url_exists($url)){
                  $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
                  $data = json_decode($json);
                  $balance->value = $data[0]->price_usd;
                  $balance->value_btc = $data[0]->price_btc;
                  $symbol = $balance->symbol;
                  $imgurl = $baseimg . $dataimg->Data->$symbol->ImageUrl;
                  $balance->img = $imgurl;
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

      $periods['open_date'] = [];
      $periods['open_amount'] = [];
      $periods['close_date'] = [];
      $periods['close_amount'] = [];
      $periods['diff_change'] = [];

      if($user->hasRole(30)){
        $query = $user->funds();
        foreach ($query as $fund) {
          $percentu = $this->percent($user);
          $period = $fund->period();

          $openA = $period->open_amount * $percentu;
          $closeA = $period->close_amount * $percentu;

          $profit = $closeA - $openA;

          $percent = ($profit / $openA) * 100;

          array_push($periods['open_date'], $period->open_date);
          array_push($periods['open_amount'], $openA);
          array_push($periods['close_date'], $period->close_date);
          array_push($periods['close_amount'], $closeA);
          array_push($periods['diff_change'], $percent);
        }
      }else{
        $query = Fund::where('user_id', null)->where('funds.type', 'initial')->get();
        foreach ($query as $fund) {
          $period = $fund->period()->get();
          $profit = $period[0]->close_amount - $period[0]->open_amount;
          $percent = ($profit / $period[0]->open_amount) * 100;
          array_push($periods['open_date'], $period[0]->open_date);
          array_push($periods['open_amount'], $period[0]->open_amount);
          array_push($periods['close_date'], $period[0]->close_date);
          array_push($periods['close_amount'], $period[0]->close_amount);
          array_push($periods['diff_change'], $percent);
        }
      }
      return response()->json(['result' => $periods], 202);
    }

}
