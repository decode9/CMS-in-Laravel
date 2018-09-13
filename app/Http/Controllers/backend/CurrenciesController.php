<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Currency;
use App\User;
use App\Period;
use App\Balance;

class CurrenciesController extends Controller{

  //Execute if user is authenticated
  public function __construct(){

    $this->middleware('auth');

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

  //Listing Currencies
  public function index(Request $request){

    //Assign Variables
    $searchValue = $request->searchvalue;
    $page = $request->page;
    $resultPage = $request->resultPage;
    $orderBy = $request->orderBy;
    $orderDirection = $request->orderDirection;
    $total = 0;

    //Select Currencies
    $query = Currency::select();

    //Search by
    if($searchValue != ''){

      $query->Where(function($query) use($searchValue){
        $query->Where('name', 'like', '%'.$searchValue.'%')
        ->orWhere('symbol', 'like', '%'.$searchValue.'%')
        ->orWhere('type', 'like', '%'.$searchValue.'%')
        ->orWhere('created_at', 'like', '%'.$searchValue.'%')
        ->orWhere('updated_at', 'like', '%'.$searchValue.'%');
      });
    }

    //Order By
    if($orderBy != ''){

      if($orderDirection != ''){

        $query->orderBy($orderBy, 'desc');

      }else{

        $query->orderBy($orderBy);

      }
    }else if($orderDirection != ''){

      $query->orderBy('created_at');

    }else{

      $query->orderBy('created_at', 'desc');

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

    //Get Currencies
    $currencies  =  $query->get();

    //Loop Currencies
    foreach($currencies as $currency){

      //Verify Symbol $currency
      if($currency->symbol == "VEF"){

        //Assign Variable
        $currency->value = 217200;

        /*  $json = file_get_contents('https://s3.amazonaws.com/dolartoday/data.json');
        $data = json_decode($json);
        $currency->value = $data->USD->dolartoday;*/

      }elseif ($currency->symbol == "USD"){

        $currency->value = 1;

      }elseif($currency->value == "coinmarketcap") {

        //Take Data from coinmarketcap
        $url = 'api.coinmarketcap.com/v1/ticker/'. $currency->name;
        if($this->url_exists($url)){
          //Retrieve Data
          $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $currency->name);
          $data = json_decode($json);

          //Assign price usd as value
          $currency->value = $data[0]->price_usd;

        }else{

          //Verify Balance Name
          if(strtolower($currency->type) == 'token'){
            //Get Ethereum Value
            $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/ethereum');
            $data = json_decode($json);

            //Assign data as value
            $balance->value = $data[0]->price_usd;
          }

        }
      }
    }

    //Return Response in Json dataType
    return response()->json(['page' => $page, 'result' => $currencies,'total' => $total], 202);
  }

  public function store(Request $request){

    //Validate $request data
    $request->validate([
      'name' => 'required| max:20',
      'symbol' => 'required| max:6',
      'type' => 'required|max:20',
      'value' => 'required|max:20'
    ]);

    //Assign Variables
    $name = ucfirst(strtolower($request->name));;
    $symbol = strtoupper($request->symbol);
    $type = $request->type;
    $value = $request->value;

    if(isset($request->exch)){
      if($request->exch == 1){
        $exch = true;
      }else{
        $exch = false;
      }
    }else{
      $exch = false;
    }


    //Create Currency
    $currency = new Currency;
    $currency->name = $name;
    $currency->symbol = $symbol;
    $currency->type = $type;
    $currency->value = $value;
    $currency->exchangeable = $exch;
    $currency->save();

    //Create Balance for currency
    $balance = new Balance;
    $balance->amount = 0;
    $balance->type = 'fund';
    $balance->currency()->associate($currency);
    $balance->save();

    //Return Response in Json DataType
    return response()->json(['message' => "success"], 202);
  }

  //Show a Currency IN CONSTRUCCION
  public function show(Request $request){
  }

  //Update a Currency
  public function update(Request $request){

    //Validate $request data
    $request->validate([
      'id' => 'required',
      'name' => 'required| max:20',
      'symbol' => 'required| max:6',
      'type' => 'required|max:20',
    ]);

    //Assign Variables
    $name = ucfirst(strtolower($request->name));;
    $symbol = strtoupper($request->symbol);
    $type = $request->type;
    $value = $request->value;
    $id = $request->id;

    if(isset($request->exch)){
      if($request->exch == 1){
        $exch = true;
      }else{
        $exch = false;
      }
    }else{
      $exch = false;
    }


    //Update Currency
    $currency = Currency::Find($id);
    $currency->name = $name;
    $currency->symbol = $symbol;
    $currency->type = $type;
    $currency->value = $value;
    $currency->exchangeable = $exch;
    $currency->save();

    //Return Response in Json DataType
    return response()->json(['message' => "success"], 202);
  }

  //Destroy Currency
  public function destroy(Request $request){

    //Validate $request data
    $request->validate([
      'id' => 'required',
    ]);
    //Assign Variable
    $id = $request->id;

    //Find Currency with ID
    $currency = Currency::find($id);

    //Get Currency Balances
    $balances = $currency->balances()->get();

    //Loop Currency Balances
    foreach($balances as $balance){

      //Delete Balance
      $bal = Balance::find($balance->id);
      $bal->delete();

    }

    //Delete Currency
    $currency->delete();

    //Return Response in Json Datatype
    return response()->json(['message' => "success"], 202);
  }
}
