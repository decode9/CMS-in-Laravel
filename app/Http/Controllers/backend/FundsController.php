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
use App\User;
use App\Period;
use Carbon\Carbon;

class FundsController extends Controller{

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

  //Function For Generate Random Number
  private function generate($longitud) {
    $key = '';
    $pattern = '1234567890';
    $max = strlen($pattern)-1;
    for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
    return $key;
  }

  //Get Total Balance for clients in USD and BTC
  public function total(Request $request){

    //Select User
    $user = User::find($request->id);

    //Create $balances array
    $balances = array();

    //Verify If User Has Client Role
    if($user->hasRole('30')){

      //Select Balances greater than 0
      $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>' , '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

      //Select User Percent
      $percent = $this->percent($user);

      //Assign $count variable
      $count = 0;

      foreach($balancesP as $balance){

        //Verify if $balance array is empty
        if(empty($balances[$count])){

          //Create object in array
          $balances[$count] = new \stdClass();

          $balances[$count]->amount = $balance->amount  * $percent;
          $balances[$count]->value = $balance->value;
          $balances[$count]->symbol = $balance->symbol;
          $balances[$count]->type = $balance->type;
          $balances[$count]->name = $balance->name;
          $balances[$count]->value_btc = 0;

        }else{
          //if $balance exist sum amount
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

      $balancesP = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>' , '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();

      $count = 0;

      foreach($balancesP as $balance){

        if(empty($balances[$count])){

          $balances[$count] = new \stdClass();

          $balances[$count]->amount = $balance->amount;
          $balances[$count]->value = $balance->value;
          $balances[$count]->symbol = $balance->symbol;
          $balances[$count]->type = $balance->type;
          $balances[$count]->name = $balance->name;
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
    }

    //Declare $usd and $btc variables
    $usd = 0;
    $btc = 0;

    //Loop $balances array
    foreach($balances as $balance){
      //Verify if value is through API
      if($balance->value == "coinmarketcap"){

        //Declare URL
        $url = 'api.coinmarketcap.com/v1/ticker/'. $balance->name;

        //Verify if url respond successfully
        if($this->url_exists($url)){

          //Take coinmarketcap API Data
          $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
          $data = json_decode($json);

          //Assign Value as USD Price
          $balance->value = $data[0]->price_usd;
          $balance->value_btc = $data[0]->price_btc;

        }else{
          //Verify Name Balance
          if(strtolower($balance->name) == 'originprotocol' || (strtolower($balance->name) == 'send' || strtolower($balance->name) == 'tari')){

            //Assign Balance Value
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

      if($balance->symbol == "VEF"){

        $balance->value_btc = 238000;
        $btcvalue = 0;

      }else{

        //Assign BTC value
        $btcvalue = $balance->amount * $balance->value_btc;

      }

      if($balance->symbol == "USD"){

        $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin');
        $data = json_decode($json);

        $balance->value_btc = $data[0]->price_usd;
        $btcvalue = $balance->amount / $balance->value_btc;

      }

      $usdvalue = $balance->amount * $balance->value;

      //Assign USD and BTC values
      $usd += $usdvalue;
      $btc += $btcvalue;
    }

    //Return Response in JSON Datatype
    return response()->json(['usd' => $usd, 'btc' => $btc], 202);
  }

  //Listing Balances
  public function indexCurrency(Request $request){

    //Select Authenticated User
    $user = Auth::User();

    //Declare Variables
    $searchValue = $request->searchvalue;
    $page = $request->page;
    $resultPage = $request->resultPage;
    $orderBy = $request->orderBy;
    $orderDirection = $request->orderDirection;
    $total = 0;

    //Declare $balancesCurrency array
    $balancesCurrency = array();

    //Declare $count variable
    $count = 0;

    //Verify If User has client role
    if($user->hasRole('30')){

      //Select fund percent for user
      $percent = $this->percent($user);

      //Select Balances greater than zero
      $query = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>' , '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->orderBy('amount', 'desc');

      //Search By
      if($searchValue != ''){
        $query->Where(function($query) use($searchValue){
          $query->Where('symbol', 'like', '%'.$searchValue.'%')
          ->orWhere('amount', 'like', '%'.$searchValue.'%')
          ->orWhere('value', 'like', '%'.$searchValue.'%');
        });
      }

      if($resultPage == null || $resultPage == 0){

                $resultPage = 10;

      }

      //Get Total
      $total  =  $query->get()->count();

      if($page > 1){

        $query->offset(    ($page -  1)   *    $resultPage);

      }

      $query->limit($resultPage);

      //Get Balances
      $balancesCurrencyP  =  $query->get();

      //Loop Balances
      foreach($balancesCurrencyP as $balanceP){

        //Verify If $balancesCurrency Array is empty
        if(empty($balancesCurrency[$count])){

          //Create object in array
          $balancesCurrency[$count] = new \stdClass();

          //Assign Amount with user percent
          $balancesCurrency[$count]->amount = $balanceP->amount * $percent;
          $balancesCurrency[$count]->value = $balanceP->value;
          $balancesCurrency[$count]->symbol = $balanceP->symbol;
          $balancesCurrency[$count]->type = $balanceP->type;
          $balancesCurrency[$count]->name = $balanceP->name;
          $balancesCurrency[$count]->equivalent = 0;

        }else{

          foreach ($balancesCurrency as $value) {

            if($value->symbol == $balanceP->symbol){

              $newBal = $value->amount + ($balanceP->amount * $percent);
              $value->amount = $newBal;

            }
          }
        }
        //Add 1 to $count
        $count += 1;
      }
    }else{

      //Select Balances
      $query = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->orderBy('amount', 'desc');

      //Search by
      if($searchValue != ''){
        $query->Where(function($query) use($searchValue){
          $query->Where('symbol', 'like', '%'.$searchValue.'%')
          ->orWhere('amount', 'like', '%'.$searchValue.'%')
          ->orWhere('value', 'like', '%'.$searchValue.'%');
        });
      }

      if($resultPage == null || $resultPage == 0){

        $resultPage = 10;

      }

      //Get Total
      $total  =  $query->get()->count();

      if($page > 1){

        $query->offset(    ($page -  1)   *    $resultPage);

      }

      $query->limit($resultPage);

      //Get Balances
      $balancesCurrencyP  =  $query->get();

      //Loop Balances
      foreach($balancesCurrencyP as $balanceP){

        if(empty($balancesCurrency[$count])){

          $balancesCurrency[$count] = new \stdClass();

          $balancesCurrency[$count]->amount = $balanceP->amount;
          $balancesCurrency[$count]->value = $balanceP->value;
          $balancesCurrency[$count]->symbol = $balanceP->symbol;
          $balancesCurrency[$count]->type = $balanceP->type;
          $balancesCurrency[$count]->name = $balanceP->name;
          $balancesCurrency[$count]->equivalent = 0;
        }else{

          foreach ($balancesCurrency as $value) {

            if($value->symbol == $balanceP->symbol){

              $newBal = $value->amount + $balanceP->amount;
              $value->amount = $newBal;
            }
          }
        }
        $count += 1;
      }
    }

    //Loop $balancesCurrency Array
    foreach($balancesCurrency as $balance){
      //Verify $balance Symbol
      if($balance->symbol == "USD"){

        $balance->value = 1;

      }
      if($balance->symbol == "VEF"){

        $balance->value = 217200;

      }

    }

    //Loop $balancesCurrency array
    foreach($balancesCurrency as $balance){

      //Check if value is take from API
      if($balance->value == "coinmarketcap"){
        //Declare API $url
        $url = 'api.coinmarketcap.com/v1/ticker/'. $balance->name;

        //Verify if $url Exists
        if($this->url_exists($url)){

          //Get Data From API
          $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
          $data = json_decode($json);
          //Assign Data to value
          $balance->value = $data[0]->price_usd;

        }else{
          //Verify $balance name
          if(strtolower($balance->name) == 'originprotocol' || (strtolower($balance->name) == 'send' || strtolower($balance->name) == 'tari')){

            //Declare Balance value
            $balance->value = 1;

          }else{

            $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/ethereum');
            $data = json_decode($json);

            $balance->value = $data[0]->price_usd;
          }
        }
      }

      //Declare $balance Equivalent
      $balance->equivalent = $balance->amount * $balance->value;
    }

    //Verify User Role
    if($user->hasRole('20') || $user->hasRole('901')){
      $eaccess = true;
    }else{
      $eaccess = false;
    }

    //Sort $balancesCurrency Array
    usort($balancesCurrency, $this->sorting($orderDirection, $orderBy));

    //Return Response in JSON datatype
    return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total, 'eaccess' => $eaccess], 202);
  }

  //Show Currencies for Exchange
  public function currencies(Request $request){

    //Declare Variable
    $symbol = $request->currency;

    //Select Currencies
    $currencies = Currency::WhereNotIn('symbol', [$symbol] )->get();

    //Return Response in JSON Datatype
    return response()->json(['data' => $currencies], 202);
  }

  //Show Periods for Exchange
  public function periods(){

    //Select Periods
    $periods = Period::All();

    //Return Response in JSON Datatype
    return response()->json(['data' => $periods], 202);
  }

  //Show Available Balance for Exchange
  public function available(Request $request){

    //Declare Variables
    $symbol = $request->currency;

    //Select Currency Balance
    $balance = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $symbol )->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type')->first();

    //Return Response in JSON dataType
    return response()->json(['data' => $balance], 202);
  }

  //Exchange Currencies
  public function exchange(Request $request){

    //Validate $request Data
    $request->validate([
      'cout' => 'required',
      'aout' => 'required| min:1',
      'cin' => 'required',
      'periodId' => 'required',
    ]);

    //Declare Variables
    $status = $request->status;
    $cout = $request->cout;
    $cin = $request->cin;
    $aout = $request->aout;
    $ain = $request->ain;
    $perid = $request->periodId;
    $rate = $request->rate;
    $created = $request->created;
    $funded = $request->funded;


    //Select Balance for validation of out currency
    $valid =  Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $cout)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();

    //Select Balance for change of in Currency
    $change = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $cin)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();

    //Select Out Currency
    $idout = Currency::Where('symbol', $cout)->select('id')->first();

    //Select In Currency
    $idin = Currency::Where('symbol', $cin)->select('id')->first();

    //Generate Random reference number
    $ref = $this->generate(7);

    //Validate if has balance
    if($aout <= $valid->amount){

      //Create new Order
      $order = new FundOrder;

      //Verify Status
      if($status == 'Complete'){

        //Select Validation Balance for update
        $balance = Balance::find($valid->id);
        $newbalance = $balance->amount - $aout;
        $balance->amount = $newbalance;

        //Select Change balance for update
        $balancen = Balance::find($change->id);
        $newbalancen = $balancen->amount + $ain;
        $balancen->amount = $newbalancen;

        //Assign Order Values
        $order->in_amount = $ain;
        $order->status = $status;
        $order->rate = $rate;
        $order->updated_at = $funded;

        //Save Balances
        $balance->save();
        $balancen->save();

      }else{
        //Assign Order Values
        $order->in_amount = 0;
        $order->status = $status;
        $order->rate = 0;
      }

      //Assign Order Values
      $order->reference = $ref;
      $order->created_at = $created;
      $order->inCurrencyOrder()->associate($idin);
      $order->outCurrencyOrder()->associate($idout);
      $order->period()->associate($perid);
      $order->out_amount = $aout;

    }else{

      //Return Response In JSON Datatype "Not Enough Funds"
      return response()->json(['error' => 'You don\'t have enough funds'], 403);

    }

    //Save Order
    $order->save();

    //Return Response in Json Datatype
    return response()->json(['message' => 'Your Exchange was processed successfully'], 202);

  }


     public function transactions(Request $request){

         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;

         if(empty($orderBy)){
             $orderBy = 'created_at';
         }
         $orderDirection = $request->orderDirection;
         $total = 0;


         $transactions = array();
         if($user->hasRole('30')){
           $count = 0;
           $percent = $this->percent($user);
           $query = FundOrder::where('user_id', null)->where('status', 'complete')->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.in_currency')->select('fund_orders.*', 'symbol')->orderBy('created_at', 'desc');
           if($searchValue != ''){
                       $query->Where(function($query) use($searchValue){
                           $query->Where('out_amount', 'like', '%'.$searchValue.'%')
                           ->orWhere('in_amount', 'like', '%'.$searchValue.'%')
                           ->orWhere('status', 'like', '%'.$searchValue.'%')
                           ->orWhere('fund_orders.created_at', 'like', '%'.$searchValue.'%')
                           ->orWhere('currencies.symbol', 'like', '%'.$searchValue.'%');
                       });
           }
           if($resultPage == null || $resultPage == 0) {
                   $resultPage = 10;
            }

               //Get Total of fees
               $total  =  $query->get()->count();

               if($page > 1)
               {
                    $query->offset(    ($page -  1)   *    $resultPage);
               }


               $query->limit($resultPage);

               $transactionsP  =  $query->get();

               foreach($transactionsP as $transaction){

                   if(empty($transactions[$count])){
                       $transactions[$count] = new \stdClass();
                       $transactions[$count]->out_amount = $transaction->out_amount * $percent;
                       $transactions[$count]->out_currency = $transaction->out_currency;
                       $transactions[$count]->in_amount = $transaction->in_amount * $percent;
                       $transactions[$count]->in_currency = $transaction->in_currency;
                       $transactions[$count]->symbol = $transaction->symbol;
                       $transactions[$count]->created_at = $transaction->created_at;
                       $transactions[$count]->reference = $transaction->reference;
                       $transactions[$count]->status = $transaction->status;
                       $transactions[$count]->updated_at = $transaction->updated_at;
                       $transactions[$count]->rate = $transaction->rate;
                   }
                   $count += 1;
               }

           usort($transactions, $this->sorting($orderDirection, $orderBy));
         }else{
           $query = FundOrder::where('user_id', null)->where('status', 'complete')->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.in_currency')->select('fund_orders.*', 'symbol')->orderBy('created_at', 'desc');
           //Search by
           if($searchValue != '')
           {
                   $query->Where(function($query) use($searchValue){
                       $query->Where('out_amount', 'like', '%'.$searchValue.'%')
                       ->orWhere('in_amount', 'like', '%'.$searchValue.'%')
                       ->orWhere('status', 'like', '%'.$searchValue.'%')
                       ->orWhere('fund_orders.created_at', 'like', '%'.$searchValue.'%')
                       ->orWhere('currencies.symbol', 'like', '%'.$searchValue.'%');
                   });
           }

           if($resultPage == null || $resultPage == 0)
           {
               $resultPage = 10;
           }

           //Get Total of fees
           $total  =  $query->get()->count();

           if($page > 1)
           {
                $query->offset(    ($page -  1)   *    $resultPage);
           }


           $query->limit($resultPage);

           $transactionsP  =  $query->get();
           $count = 0;
           foreach($transactionsP as $transaction){

               if(empty($transactions[$count])){
                   $transactions[$count] = new \stdClass();
                   $transactions[$count]->out_amount = $transaction->out_amount;
                   $transactions[$count]->out_currency = $transaction->out_currency;
                   $transactions[$count]->in_amount = $transaction->in_amount;
                   $transactions[$count]->in_currency = $transaction->in_currency;
                   $transactions[$count]->symbol = $transaction->symbol;
                   $transactions[$count]->created_at = $transaction->created_at;
                   $transactions[$count]->reference = $transaction->reference;
                   $transactions[$count]->status = $transaction->status;
                   $transactions[$count]->updated_at = $transaction->updated_at;
                   $transactions[$count]->rate = $transaction->rate;
               }
               $count += 1;
           }
           usort($transactions, $this->sorting($orderDirection, $orderBy));
         }

         foreach($transactions as $transaction){
             $currency = Currency::find($transaction->out_currency);
             $transaction->out_symbol = $currency->symbol;
             $newcreated = $transaction->created_at->toFormattedDateString();
             $newupdated = $transaction->updated_at->toFormattedDateString();
             $transaction->created_at = $newcreated;
             $transaction->updated_at = $newupdated;
         }

         if($user->hasRole('20') || $user->hasRole('901')){
             $eaccess = true;
         }else{
             $eaccess = false;
         }


         //Get fees by month and year

         return response()->json(['page' => $page, 'result' => $transactions, 'total' => $total, 'eaccess' => $eaccess], 202);
     }

     public function pendingTransactions(Request $request){

         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         if(empty($orderBy)){
             $orderBy = 'created_at';
         }
         $orderDirection = $request->orderDirection;
         $total = 0;

         $transactions = array();

         if($user->hasRole('30')){
           $count = 0;
          $percent = $this->percent($user);
               $transactions = array();
               $query = FundOrder::where('user_id', null)->where('status', 'pending')->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.in_currency')->select('fund_orders.*', 'symbol')->orderBy('created_at', 'desc');
               if($searchValue != '')
               {
                       $query->Where(function($query) use($searchValue){
                           $query->Where('out_amount', 'like', '%'.$searchValue.'%')
                           ->orWhere('in_amount', 'like', '%'.$searchValue.'%')
                           ->orWhere('status', 'like', '%'.$searchValue.'%')
                           ->orWhere('fund_orders.created_at', 'like', '%'.$searchValue.'%')
                           ->orWhere('currencies.symbol', 'like', '%'.$searchValue.'%');
                       });
               }

               if($resultPage == null || $resultPage == 0)
               {
                   $resultPage = 10;
               }

               //Get Total of fees
               $total  =  $query->get()->count();

               if($page > 1)
               {
                    $query->offset(    ($page -  1)   *    $resultPage);
               }


               $query->limit($resultPage);

               $transactionsP  =  $query->get();

               foreach($transactionsP as $transaction){

                   if(empty($transactions[$count])){
                       $transactions[$count] = new \stdClass();
                       $transactions[$count]->out_amount = $transaction->out_amount * $percent;
                       $transactions[$count]->out_currency = $transaction->out_currency;
                       $transactions[$count]->in_amount = $transaction->in_amount * $percent;
                       $transactions[$count]->in_currency = $transaction->in_currency;
                       $transactions[$count]->symbol = $transaction->symbol;
                       $transactions[$count]->created_at = $transaction->created_at->toFormattedDateString();
                       $transactions[$count]->reference = $transaction->reference;
                       $transactions[$count]->status = $transaction->status;
                       $transactions[$count]->updated_at = $transaction->updated_at->toFormattedDateString();
                       $transactions[$count]->rate = $transaction->rate;
                   }
                   $count += 1;
               }

           usort($transactions, $this->sorting($orderDirection, $orderBy));
         }else{
           $query = FundOrder::where('user_id', null)->where('status', 'pending')->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.in_currency')->select('fund_orders.*', 'symbol')->orderBy('created_at', 'desc');
           //Search by
           if($searchValue != '')
           {
                   $query->Where(function($query) use($searchValue){
                       $query->Where('out_amount', 'like', '%'.$searchValue.'%')
                       ->orWhere('in_amount', 'like', '%'.$searchValue.'%')
                       ->orWhere('status', 'like', '%'.$searchValue.'%')
                       ->orWhere('fund_orders.created_at', 'like', '%'.$searchValue.'%')
                       ->orWhere('currencies.symbol', 'like', '%'.$searchValue.'%');
                   });
           }


           //Order By

           if($resultPage == null || $resultPage == 0)
           {
               $resultPage = 10;
           }

           //Get Total of fees
           $total  =  $query->get()->count();

           if($page > 1)
           {
                $query->offset(    ($page -  1)   *    $resultPage);
           }


           $query->limit($resultPage);

           $transactionsP  =  $query->get();
           $count = 0;
           foreach($transactionsP as $transaction){

               if(empty($transactions[$count])){
                   $transactions[$count] = new \stdClass();
                   $transactions[$count]->out_amount = $transaction->out_amount;
                   $transactions[$count]->out_currency = $transaction->out_currency;
                   $transactions[$count]->in_amount = $transaction->in_amount;
                   $transactions[$count]->in_currency = $transaction->in_currency;
                   $transactions[$count]->symbol = $transaction->symbol;
                   $transactions[$count]->created_at = $transaction->created_at;
                   $transactions[$count]->reference = $transaction->reference;
                   $transactions[$count]->status = $transaction->status;
                   $transactions[$count]->updated_at = $transaction->updated_at;
                   $transactions[$count]->rate = $transaction->rate;
               }
               $count += 1;
           }
           usort($transactions, $this->sorting($orderDirection, $orderBy));
         }

         foreach($transactions as $transaction){
             $currency = Currency::find($transaction->out_currency);
             $transaction->out_symbol = $currency->symbol;
             $newcreated = $transaction->created_at->toFormattedDateString();
             $newupdated = $transaction->updated_at->toFormattedDateString();
             $transaction->created_at = $newcreated;
             $transaction->updated_at = $newupdated;
         }

         if($user->hasRole('20') || $user->hasRole('901')){
             $eaccess = true;
         }else{
             $eaccess = false;
         }
         //Get fees by month and year


         return response()->json(['page' => $page, 'result' => $transactions, 'total' => $total, 'eaccess' => $eaccess], 202);
     }


/*
    public function withdraws(Request $request)
    {
        $user = Auth::User();
        $searchValue = $request->searchvalue;
        $page = $request->page;
        $resultPage = $request->resultPage;
        $orderBy = $request->orderBy;
        $orderDirection = $request->orderDirection;
        $total = 0;

        //Select Witdraws of the user
        $query = Fund::Where('amount','<', '0')->where('funds.type', 'withdraw')->where('user_id', $user->id)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('funds.*', 'symbol');
        //Search by

        if($searchValue != '')
        {
                $query->Where(function($query) use($searchValue){
                    $query->Where('symbol', 'like', '%'.$searchValue.'%')
                    ->orWhere('amount', 'like', '%'.$searchValue.'%')
                    ->orWhere('comment', 'like', '%'.$searchValue.'%')
                    ->orWhere('funds.created_at', 'like', '%'.$searchValue.'%');
                });
        }

        //Order By

        if($orderBy != '')
        {
            if($orderDirection != '')
            {
                $query->orderBy($orderBy, 'desc');
            }else{
                $query->orderBy($orderBy);
            }
        }else if($orderDirection != ''){
            $query->orderBy('funds.created_at', 'desc');
        }else{
             $query->orderBy('funds.created_at');
        }

        if($resultPage == null || $resultPage == 0)
        {
            $resultPage = 10;
        }

        //Get Total of fees
        $total  =  $query->get()->count();

        if($page > 1)
        {
             $query->offset(    ($page -  1)   *    $resultPage);
        }


        $query->limit($resultPage);
        $deposits  =  $query->get();

        //Get fees by month and year

        return response()->json(['page' => $page, 'result' => $deposits, 'total' => $total, 'user' => $user->name], 202);


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
     /*
    public function deposits(Request $request)
    {
        $user = Auth::User();
        $searchValue = $request->searchvalue;
        $page = $request->page;
        $resultPage = $request->resultPage;
        $orderBy = $request->orderBy;
        $orderDirection = $request->orderDirection;
        $total = 0;

        //Select Deposits of the user
        $query = Fund::Where('amount','>', '0')->where('funds.type', 'deposit')->where('user_id', $user->id)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('funds.*', 'symbol');
        //Search by

        if($searchValue != '')
        {
                $query->Where(function($query) use($searchValue){
                    $query->Where('symbol', 'like', '%'.$searchValue.'%')
                    ->orWhere('amount', 'like', '%'.$searchValue.'%')
                    ->orWhere('comment', 'like', '%'.$searchValue.'%')
                    ->orWhere('funds.created_at', 'like', '%'.$searchValue.'%');
                });
        }
        //Order By

        if($orderBy != '')
        {
            if($orderDirection != '')
            {
                $query->orderBy($orderBy, 'desc');
            }else{
                $query->orderBy($orderBy);
            }
        }else if($orderDirection != ''){
            $query->orderBy('funds.created_at');
        }else{
             $query->orderBy('funds.created_at', 'desc');
        }

        if($resultPage == null || $resultPage == 0)
        {
            $resultPage = 10;
        }

        //Get Total of fees
        $total  =  $query->get()->count();

        if($page > 1)
        {
             $query->offset(    ($page -  1)   *    $resultPage);
        }


        $query->limit($resultPage);
        $deposits  =  $query->get();

        //Get fees by month and year

        return response()->json(['page' => $page, 'result' => $deposits, 'total' => $total, 'user' => $user->name], 202);


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
/*
    public function store(Request $request)
    {
        //
        $request->validate([
            'currency' => 'required|string',
            'amount' => 'required|max:50',
            'reference' => 'required',
            'file' =>'required',
        ]);

        $currency = Currency::Where('symbol', $request->currency)->first();
        $user = Auth::User();
        $name = str_replace(" ", "-", $request->reference);
        $imageName = $name . '.' . $request->file('file')->getClientOriginalExtension();

        $request->file('file')->move( public_path() . '/files/references/', $imageName);
        $type = "deposit";
        $fund = New Fund;
        $fund->amount = $request->amount;
        $fund->comment = $request->reference;
        $fund->type = $type;
        $fund->currency()->associate($currency);
        $fund->user()->associate($user);
        $fund->save();

        return response()->json(['message' => 'Your Deposit #'. $fund->comment .' was processed successfully', 'deposit' => $fund, 'user' => $user->name, 'symbol' => $currency->symbol], 202);
    }
*/


/*
    public function update(Request $request)
    {
        //
        $request->validate([
            'currency' => 'required',
            'amount' => 'required| min:01',
            'accountId' => 'required'
        ]);

        $currency = Currency::Where('symbol', $request->currency)->first();
        $user = Auth::User();

        $key = '';
        $pattern = '1234567890';
        $max = strlen($pattern)-1;
        for($i=0;$i < 7;$i++) $key .= $pattern{mt_rand(0,$max)};

        $type = "withdraw";

        $reference = $key;
        $fund = New Fund;
        $fund->amount = $request->amount;
        $fund->comment = $reference;
        $fund->type = $type;
        $fund->currency()->associate($currency);
        $fund->user()->associate($user);
        $fund->account()->associate($request->accountId);
        $fund->save();

        return response()->json(['message' => 'Your Withdraw #'. $fund->comment .' was processed successfully', 'withdraw' => $fund, 'user' => $user->name, 'symbol' => $currency->symbol], 202);

    }
*/


    public function destroyOrder(Request $request){
        $request->validate([
            'id' => 'required',
        ]);

        $id = $request->id;

        $order = FundOrder::find($id);

        $balancein = Balance::Where('currency_id', $order->out_currency)->where('user_id', null)->where('period_id', null)->first();
        $bin = Balance::find($balancein->id);
        $newin = $bin->amount + $order->out_amount;
        $bin->amount = $newin;
        $bin->save();

        $balanceout = Balance::Where('currency_id', $order->in_currency)->where('user_id', null)->where('period_id', null)->first();
        $bout = Balance::find($balanceout->id);
        $newout = $bout->amount - $order->in_amount;
        $bout->amount = $newout;
        $bout->save();

        $order->delete();

          return response()->json(['message' => 'Complete'], 202);
    }

    public function validateExchange(Request $request){

      $request->validate([
          'id' => 'required',
          'cout' => 'required',
          'aout' => 'required| min:1',
          'ain' => 'min:1',
          'cin' => 'required',
          'rate' => 'min:1',
      ]);

      $cout = $request->cout;
      $cin = $request->cin;

      $aout = $request->aout;
      $ain = $request->ain;
      $id = $request->id;
      $rate = $request->rate;

      $order = FundOrder::find($id);

      $valid =  Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->where('currencies.symbol', $cout)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();
      $change = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('period_id', null)->where('currencies.symbol', $cin)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();


      $idout = Currency::Where('symbol', $cout)->select('id')->first();

      $idin = Currency::Where('symbol', $cin)->select('id')->first();


      if($aout <= $valid->amount){


        $balance = Balance::find($valid->id);
        $newbalance = $balance->amount - $aout;
        $balance->amount = $newbalance;

        $order->in_amount = $ain;
        $order->status = 'complete';

        $balancen = Balance::find($change->id);
        $newbalancen = $balancen->amount + $ain;
        $balancen->amount = $newbalancen;

        $order->rate = $rate;
      }else{
        return response()->json(['error' => 'You don\'t have enough funds'], 403);
      }

      $order->save();
      $balance->save();
      $balancen->save();

      return response()->json(['message' => 'Your Validation was processed successfully'], 202);
    }
    /**
     * Remove the specified resource from storage.•••••••••
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }
}
