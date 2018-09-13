<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Currency;
use App\Fund;
use App\Balance;
use App\Newsletter;
use App\History;
use App\Period;

class DashboardController extends Controller{

  //Execute if user is authenticated
  public function __construct(){

    $this->middleware('auth');

  }

  //Function for order arrays
  private function sorting($order, $key) {

    return function ($a, $b) use ($order, $key) {

      if($order == 'DESC'){
        if(empty($key)){

          return strnatcmp($a->amount, $b->amount);

        }else{

           return strnatcmp($a->$key, $b->$key);

        }

      }else{

        if(empty($key)){

          return strnatcmp($b->amount, $a->amount);

        }else{

          return strnatcmp($b->$key, $a->$key);

        }
      }
    };
  }

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

  //Function for Check if a url have a successfully response
  private function url_exists( $url = NULL ) {

    if(empty($url)){
      return false;
    }

    $ch = curl_init( $url );

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
    $accepted_response = array( 200, 301, 302 );

    if( in_array( $httpcode, $accepted_response ) ) {

      return true;

    } else {

      return false;

    }
  }

  //Dashboard Balances
  public function balance(Request $request){

    //Select Authenticated user
    $user = Auth::User();

    //Declare $count variable
    $count = 0;

    //Declare $balances Array
    $balances = array();

    //Verify if user has Client Role
    if($user->hasRole('30')){

      //Select user fund Percent
      $percent = $this->percent($user);

      //Select Initials Invest for user
      $initialsP = $user->funds()->where('type', 'initial')->get();

      //Loop Initials Invest
      foreach ($initialsP as $initialP) {
        //Verify if exist $initial variable
        if(!(empty($initial))){
          //If Exist sum initial Invest Amount
          $newini = $initial->amount + $initialP->amount;
          $initial->amount = $newini;

        }else{
          //Create $initial variabel as object
          $initial = new \stdClass();

          $initial->amount = $initialP->amount;
          $initial->symbol = 'USD';
          $initial->created_at = $initialP->created_at;
        }
      }

      //Select General Balances
      $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->orderBy('amount', 'DESC')->get();

      //Loop General Balances
      foreach($balancesP as $balance){

        //Verify if $balances array is empty
        if(empty($balances[$count])){

          //Create in $balances array an Object
          $balances[$count] = new \stdClass();

          //Assign Amount with user percent
          $balances[$count]->amount = $balance->amount  * $percent;
          $balances[$count]->value = $balance->value;
          $balances[$count]->symbol = $balance->symbol;
          $balances[$count]->type = $balance->type;
          $balances[$count]->name = $balance->name;
          $balances[$count]->equivalent = 0;
          $balances[$count]->percent = 0;
        }else{

          //If $balances Array is not empty sum general balance amount
          foreach ($balances as $bal) {

            if($bal->symbol == $balance->symbol){

              $newBals = $bal->amount + ($balance->amount  * $percent);
              $bal->amount = $newBals;

            }
          }
        }
        //Add 1 to $count variable
        $count += 1;
      }
    }else{

      $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>', '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.amount', 'value', 'symbol', 'name')->orderBy('amount', 'DESC')->get();

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
      //Select Initial General Fund Invest
      $initial = Fund::Where('user_id', null)->where('funds.type', 'initial')->where('period_id', null)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('amount', 'symbol', 'funds.created_at')->first();
    }

    //Declare USD and BTC Variables
    $usd = 0;
    $btc = 0;

    //Declare $chartt variable array
    $chart['symbol'] = [];
    $chart['amount'] = [];

    //Loop $balances Array
    foreach($balances as $balance){

      //Verify if $balance value is from API
      if($balance->value == "coinmarketcap"){

        //Declare coinmarketcap $url
        $url = 'api.coinmarketcap.com/v1/ticker/'. $balance->name;

        //Verify If $url exists
        if($this->url_exists($url)){

          //Get Data from coinmarketcap
          $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
          $data = json_decode($json);

          //Assign Data as Value
          $balance->value = $data[0]->price_usd;

        }else{
          //Verify Balance Name
          if(strtolower($balance->name) == 'originprotocol' || (strtolower($balance->name) == 'send' || strtolower($balance->name) == 'tari')){
            //Assign $balance value
            $balance->value = 1;
          }else{
            //Get Ethereum Value
            $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/ethereum');
            $data = json_decode($json);

            //Assign data as value
            $balance->value = $data[0]->price_usd;
          }
        }
      }

      if($balance->symbol == "USD"){

        //Get bitcoin price
        $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin');
        $data = json_decode($json);

        //Assign bitcoin price to usd
        $balance->value_btc = $data[0]->price_usd;

      }

      //Assign USD value
      $usdvalue = $balance->amount * $balance->value;

      //Sum values
      $usd += $usdvalue;

    }
    //Take BTC Value
    $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin');
    $data = json_decode($json);

    $btc = $usd / $data[0]->price_usd;
    foreach ($balances as $balance) {

      //Assign $balance percent an equivalent data
      $usdvalue = $balance->amount * $balance->value;
      $balance->percent = ($usdvalue / $usd) * 100;
      $balance->equivalent = $usdvalue;

    }

    //Sort $balances array
    usort($balances, $this->sorting('', 'equivalent'));

    foreach ($balances as $balance) {

      //Put data in $chart array
      array_push($chart['amount'], $balance->equivalent);
      array_push($chart['symbol'], $balance->symbol);

    }

    //Select timestamp for initial fund invest
    $initstamp = $initial->created_at->timestamp;

    //Get timestamp historical price data
    $json = file_get_contents('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts='.$initstamp);
    $data = json_decode($json);

    //Declare BTC initial Data
    $btcU = $data->BTC->USD;

    //Declare BTC diference
    $btcI = $initial->amount / $btcU;

    //Declare profit and percent
    $profit = $usd - $initial->amount;
    $Tpercent = $profit / $initial->amount;
    $Tpercent = $Tpercent * 100;

    //Return Response in JSON DataType
    return response()->json(['result' => $balances, 'initial' => $initial, 'usd' => $usd, 'btc' => $btc, 'profit' => $profit, 'percent' => $Tpercent , 'chart' => $chart, 'initialb' => $btcI], 202);

  }

  //Newsletter Dashboard
  public function newsletter(){
    //Select Newsletters
    $newsletters = Newsletter::LeftJoin('users', 'newsletters.user_id', '=', 'users.id')->select('newsletters.*', 'name')->orderBy('newsletters.created_at')->get();

    //Loop Newsletters
    foreach($newsletters as $newsletter){

      //Give String format to created date newsletter
      $date = $newsletter->created_at->toFormattedDateString();;
      $newsletter->date = $date;

    }

    //Return Response In JSON Datatype
    return response()->json(['result' => $newsletters], 202);
  }

  //Historical Chart Data Dashboard
  public function historyChart(Request $request){

    //Select Authenticated user
    $user = Auth::User();

    //Declare Variables
    $type = $request->type;
    $count = 0;

    //Select History Data with type
    $query = History::Where('type', $type)->select('register', 'amount')->orderBy('register', 'desc')->limit(30);

    //Verify if user is client
    if($user->hasRole(30)){
      $query->where('user_id', $user->id);
    }else{
      $query->where('user_id', null);
    }

    //Get history data
    $histories = $query->get();

    //loop Histories
    foreach($histories as $history){

      $chart[$count] = new \stdClass();

      //Assign $chart data
      $chart[$count]->register = $history->register;
      $chart[$count]->amount = $history->amount;
      $count += 1;
    }
    usort($chart, $this->sorting('DESC','register'));
    //Return Response In Json Datatype
    return response()->json(['result' => $chart], 202);
  }

  //Period Data Dashboard
  public function periods(){

    //Select Authenticated User
    $user = Auth::user();

    //Verify if user don't have client role
    if(!($user->hasRole('30'))){

      //Select Periods
      $periods = Period::all();

      //Loop $periods
      foreach($periods as $period){

        //Declare diff change for $period
        $change = ($period->close_amount / $period->open_amount) * 100;
        $period->diff_change = $change;

      }
    }

    //Return Response In JSON Datatype
    return response()->json(['result' => $periods], 202);
  }

}
