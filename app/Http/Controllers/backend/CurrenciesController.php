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

class CurrenciesController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private function url_exists( $url = NULL ) {

        if( empty( $url ) ){
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
    public function index(Request $request)
    {

            $searchValue = $request->searchvalue;
            $page = $request->page;
            $resultPage = $request->resultPage;
            $orderBy = $request->orderBy;
            $orderDirection = $request->orderDirection;
            $total = 0;

            //Select Users
            $query = Currency::select();
            //Search by

            if($searchValue != '')
            {
                    $query->Where(function($query) use($searchValue){
                        $query->Where('name', 'like', '%'.$searchValue.'%')
                        ->orWhere('symbol', 'like', '%'.$searchValue.'%')
                        ->orWhere('type', 'like', '%'.$searchValue.'%')
                        ->orWhere('created_at', 'like', '%'.$searchValue.'%')
                        ->orWhere('updated_at', 'like', '%'.$searchValue.'%');
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
                $query->orderBy('created_at');
            }else{
                 $query->orderBy('created_at', 'desc');
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

            $currencies  =  $query->get();

            foreach($currencies as $currency){
                if($currency->symbol == "VEF"){
                  $currency->value = 217200;
                  /*  $json = file_get_contents('https://s3.amazonaws.com/dolartoday/data.json');
                    $data = json_decode($json);
                    $currency->value = $data->USD->dolartoday;*/
                }elseif ($currency->symbol == "USD"){
                    $currency->value = 1;
                }elseif($currency->value == "coinmarketcap") {
                  $url = 'api.coinmarketcap.com/v1/ticker/'. $currency->name;
                  if($this->url_exists($url)){
                        $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $currency->name);
                        $data = json_decode($json);
                        $currency->value = $data[0]->price_usd;
                    }else{
                        $currency->value = 0.1;
                    }

                }
            }
            //Get fees by month and year

            return response()->json(['page' => $page, 'result' => $currencies,'total' => $total], 202);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required| max:20',
            'symbol' => 'required| max:6',
            'type' => 'required|max:20',
            'value' => 'required|max:20'
        ]);

        $name = ucfirst(strtolower($request->name));;
        $symbol = strtoupper($request->symbol);
        $type = $request->type;
        $value = $request->value;



        $currency = new Currency;
        $currency->name = $name;
        $currency->symbol = $symbol;
        $currency->type = $type;
        $currency->value = $value;
        $currency->save();

        $periods = Period::all();

            $balance = new Balance;
            $balance->amount = 0;
            $balance->type = 'fund';
            $balance->currency()->associate($currency);
            $balance->save();
          foreach ($periods as $period) {
            $balanceP = new Balance;
            $balanceP->amount = 0;
            $balanceP->type = 'fund';
            $balanceP->currency()->associate($currency);
            $balanceP->period()->associate($period);
            $balanceP->save();
          }



        return response()->json(['message' => "success"], 202);
    }

    public function show(Request $request)
    {
        //
        $currency = App\Currency::All();

        return response()->json(['message' => "success", 'result' => $currency], 202);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $request->validate([
            'id' => 'required',
            'name' => 'required| max:20',
            'symbol' => 'required| max:6',
            'type' => 'required|max:20',

        ]);

        $name = ucfirst(strtolower($request->name));;
        $symbol = strtoupper($request->symbol);
        $type = $request->type;
        $value = $request->value;
        $id = $request->id;

        $currency = Currency::Find($id);
        $currency->name = $name;
        $currency->symbol = $symbol;
        $currency->type = $type;
        $currency->value = $value;
        $currency->save();


        return response()->json(['message' => "success"], 202);
    }

    /**
     * Remove the specified resource from storage.•••••••••
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required',

        ]);

        $id = $request->id;

        $currency = Currency::find($id);

        $balances = $currency->balances()->get();
        foreach($balances as $balance){
            $bal = Balance::find($balance->id);
            $bal->delete();
        }
        $currency->delete();

        return response()->json(['message' => "success"], 202);
    }
}
