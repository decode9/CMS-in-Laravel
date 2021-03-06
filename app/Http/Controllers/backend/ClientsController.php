<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Currency;
use App\Fund;
use App\FundOrder;
use App\User;
use App\Balance;
use App\Period;

class ClientsController extends Controller
{

    public function __construct(){
        $this->middleware('auth');
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

      return response()->json(['usd' => $usd, 'btc' => $btc], 202);

    }

     //Index Client List
     public function index(Request $request){

       //Select Authenticate user
       $user = Auth::User();

       //Assign Variables
       $searchValue = $request->searchvalue;
       $page = $request->page;
       $resultPage = $request->resultPage;
       $orderBy = $request->orderBy;
       $orderDirection = $request->orderDirection;
       $total = 0;

       //Select Users without authenticate user
       $query = User::whereHas('roles', function ($query2) {
         $query2->where('code', '30');
       })->WhereNotIn('users.id', [$user->id]);

       //Search by
       if($searchValue != ''){

         $query->Where(function($query) use($searchValue){
           $query->Where('name', 'like', '%'.$searchValue.'%')
           ->orWhere('username', 'like', '%'.$searchValue.'%')
           ->orWhere('email', 'like', '%'.$searchValue.'%')
           ->orWhere('created_at', 'like', '%'.$searchValue.'%')
           ->orWhere('updated_at', 'like', '%'.$searchValue.'%');
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

       //Assign Query to variable
       $users  =  $query->get();

       //Loop Query
       foreach($users as $user){

         //Select Funds for user
         $funds = $user->funds()->where('type', 'initial')->get();

         //Assign percent of user
         $percent = $this->percent($user);

         //Verify if user has funds
         if(isset($funds)){
           $user->amount = 0;

           foreach($funds as $fund){

             $user->amount += $fund->amount;

           }
         }else{

           $user->amount = 0;

         }

         //Get percent of user
         $user->percent = $percent * 100;

       }

       //Create Array
       $usersA = array();

       //Assign $count variable
       $count = 0;

       //Loop Users
       foreach ($users as $user) {

         //Verify if $usersA variable is empty
         if(empty($usersA[$count])){

           //Create object in array
           $usersA[$count] = new \stdClass();

           $usersA[$count]->name = $user->name;
           $usersA[$count]->amount = $user->amount;
           $usersA[$count]->email = $user->email;
           $usersA[$count]->percent = $user->percent;
           $usersA[$count]->id = $user->id;
         }
         //Add 1 to count
         $count += 1;

       }
       //Sort Query Result
       usort($usersA, $this->sorting($orderDirection, $orderBy));

       //Return Response in Json dataType
       return response()->json(['page' => $page, 'result' => $usersA,'total' => $total], 202);

     }

     //Get Currencies Balance for Users
     public function indexCurrency(Request $request){

       //Get Client
       $user = User::find($request->id);

       //Assign Variables
       $searchValue = $request->searchvalue;
       $page = $request->page;
       $resultPage = $request->resultPage;
       $orderBy = $request->orderBy;
       $orderDirection = $request->orderDirection;
       $total = 0;

       //Assign $balancesCurrency Array
       $balancesCurrency = array();

       //Assign Percent of fund
       $percent = $this->percent($user);

       //Assign $count variable
       $count = 0;

       //Select Balances
       $query = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('amount', '>' , '0')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->orderBy('amount', 'desc');

       //Verify if $searchValue is empty
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

       $total  =  $query->get()->count();

       if($page > 1){

         $query->offset(    ($page -  1)   *    $resultPage);

       }

       $query->limit($resultPage);

       $balancesCurrencyP  =  $query->get();

       //Loop Query
       foreach($balancesCurrencyP as $balanceP){

         if(empty($balancesCurrency[$count])){

           $balancesCurrency[$count] = new \stdClass();

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
         $count += 1;
       }

       foreach($balancesCurrency as $balancec){

         if($balancec->symbol == "USD"){

           $balancec->value = 1;

         }

         if($balancec->symbol == "VEF"){

           $balancec->value = 217200;

         }

       }

       foreach($balancesCurrency as $balancecs){
         if($balancecs->value == "coinmarketcap"){
           $url = 'api.coinmarketcap.com/v1/ticker/'. $balancecs->name;
           if($this->url_exists($url)){

             $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balancecs->name);
             $data = json_decode($json);

             $balancecs->value = $data[0]->price_usd;
           }else{
             if(strtolower($balancecs->name) == 'originprotocol' || (strtolower($balancecs->name) == 'send' || strtolower($balancecs->name) == 'tari')){
             $balancecs->value = 1;
             }else{

               $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/ethereum');
               $data = json_decode($json);

               $balancecs->value = $data[0]->price_usd;
             }
           }
         }

         $balancecs->equivalent = $balancecs->amount * $balancecs->value;

       }

       usort($balancesCurrency, $this->sorting($orderDirection, $orderBy));

       return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total], 202);
     }


     public function initial(Request $request){

       $request->validate([
         'date' => 'required',
         'amount' => 'required| min:01',
         'id' => 'required',
       ]);

       //Select Currency
       $currency = Currency::Where('symbol', 'USD')->first();

       //Assign Variables
       $id = $request->id;
       $amount = $request->amount;
       $date = $request->date;

       //Select User
       $user = User::find($id);

       //Select open period
       $period = Period::where('close_date', null)->first();

       //Declara $hasini variable
       $hasini = $user->funds()->where('type', 'initial')->where('period_id', $period->id)->first();

       //Verify if user has an initial invest
       if(isset($hasini)){

         //Select existed fund
         $fund = Fund::find($hasini->id);


         //Select General Initial Fund on Period
         $poolP = Fund::where('user_id', null )->where('type', 'initial')->where('period_id', $period->id)->first();

         //Declare new amount for general initial fund on period
         $newamountP = $poolP->amount - $fund->amount;
         $newamountP = $newamountP + $amount;

         //Update General Initial Fund on period
         $poolfP = Fund::find($poolP->id);
         $poolfP->amount = $newamountP;
         $poolfP->save();

         //Select General Initial Fund
         $pool = Fund::where('user_id', null )->where('type', 'initial')->where('period_id', null)->first();

         //Declare new amount for General Initial Fund
         $newamount = $pool->amount - $fund->amount;
         $newamount = $newamount + $amount;

         //Update General Initial Fund
         $poolf = Fund::find($pool->id);
         $poolf->amount = $newamount;
         $poolf->save();

         //Declare new period Amount
         $newPamount = $period->open_amount - $fund->amount;
         $newPamount = $newPamount + $amount;

         //Update Period
         $periodf = Period::find($period->id);
         $periodf->open_amount = $newamount;
         $periodf->save();


         //Select USD in Balance
         $balance = Balance::where('user_id', null)->where('currency_id', '2')->first();

         //Declare new balance
         $newbalance = $balance->amount - $fund->amount;
         $newbalance = $newbalance + $amount;

         //Update Balance
         $balancef = Balance::find($balance->id);
         $balancef->amount = $newbalance;
         $balancef->save();

       }else{

         //Create New Fund
         $fund = new Fund;

         //Select General Initial Fund
         $pool = Fund::where('user_id', null)->where('type', 'initial')->where('period_id', null)->first();
         $newamount = $pool->amount + $amount;

         //Update General Initial Fund
         $poolf = Fund::find($pool->id);
         $poolf->amount = $newamount;
         $poolf->save();

         //Select General Initial Fund for Period
         $poolP = Fund::where('user_id', null)->where('type', 'initial')->where('period_id', $period->id)->first();
         $newamountP = $poolP->amount + $amount;

         //Update General Initial Fund for Period
         $poolfP = Fund::find($poolP->id);
         $poolfP->amount = $newamountP;
         $poolfP->save();

         //Declare New Period Amount
         $newPamount = $period->open_amount + $amount;

         //Update Period
         $periodf = Period::find($period->id);
         $periodf->open_amount = $newPamount;
         $periodf->save();

         //Select USD Balance
         $balance = Balance::where('user_id', null)->where('currency_id', '2')->first();
         $newbalance = $balance->amount + $amount;

         //Update Balance
         $balancef = Balance::find($balance->id);
         $balancef->amount = $newbalance;
         $balancef->save();
       }

       //Assign new Fund values
       $fund->amount = $amount;
       $fund->reference = 'initial';
       $fund->active = 1;
       $fund->comment = 'Initial Invest';
       $fund->type = "initial";
       $fund->created_at = $date;

       //Associate Fund Dependencies
       $fund->user()->associate($id);
       $fund->period()->associate($period->id);
       $fund->currency()->associate($currency);

       //Save Fund
       $fund->save();

       //Assignate Period to user
       $user->periods()->attach($period->id);
       $user->save();

       //Return Response in Json dataType
       return response()->json(['result' => 'Success'], 202);
     }
}
