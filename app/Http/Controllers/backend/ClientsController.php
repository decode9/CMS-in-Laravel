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


class ClientsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function index(Request $request){
         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Users
         $query = User::whereHas('roles', function ($query2) {
             $query2->where('code', '30');
        })->WhereNotIn('users.id', [$user->id]);
         //Search by

         if($searchValue != '')
         {
                 $query->Where(function($query) use($searchValue){
                     $query->Where('name', 'like', '%'.$searchValue.'%')
                     ->orWhere('username', 'like', '%'.$searchValue.'%')
                     ->orWhere('email', 'like', '%'.$searchValue.'%')
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

         $users  =  $query->get();

         foreach($users as $user){
             $funds = $user->funds()->where('type', 'initial')->first();
             if(isset($funds)){
                 $user->amount = $funds->amount;
             }else{
                 $user->amount = 0;
             }
         }
         //Get fees by month and year

         return response()->json(['page' => $page, 'result' => $users,'total' => $total], 202);
     }

     public function indexCurrency(Request $request){

         $user = $request->id;
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Witdraws of the user
         $query = Balance::Where('balances.type', 'fund')->where('user_id', $user)->where('currencies.type', 'currency')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type');
         //Search by

         if($searchValue != '')
         {
                 $query->Where(function($query) use($searchValue){
                     $query->Where('symbol', 'like', '%'.$searchValue.'%')
                     ->orWhere('amount', 'like', '%'.$searchValue.'%')
                     ->orWhere('value', 'like', '%'.$searchValue.'%')
                     ->orWhere('balances.created_at', 'like', '%'.$searchValue.'%');
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
             $query->orderBy('balances.created_at', 'desc');
         }else{
              $query->orderBy('balances.created_at');
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
         $balancesCurrency  =  $query->get();

         foreach($balancesCurrency as $balance){
             if($balance->symbol == "VEF"){
                 $json = file_get_contents('https://s3.amazonaws.com/dolartoday/data.json');
                 $data = json_decode($json);
                 $balance->value = $data->USD->dolartoday;
             }
         }

         return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total,], 202);
     }

     public function indexCrypto(Request $request){

         $user = $request->id;
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Witdraws of the user
         $query = Balance::Where('balances.type', 'fund')->where('user_id', $user)->where('currencies.type', 'Cryptocurrency')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'name', 'symbol', 'value', 'currencies.type');
         //Search by

         if($searchValue != '')
         {
                 $query->Where(function($query) use($searchValue){
                     $query->Where('symbol', 'like', '%'.$searchValue.'%')
                     ->orWhere('amount', 'like', '%'.$searchValue.'%')
                     ->orWhere('value', 'like', '%'.$searchValue.'%')
                     ->orWhere('balances.created_at', 'like', '%'.$searchValue.'%');
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
             $query->orderBy('balances.created_at', 'desc');
         }else{
              $query->orderBy('balances.created_at');
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
         $balancesCurrency  =  $query->get();

         foreach($balancesCurrency as $balance){
             if($balance->value == "coinmarketcap"){
                 $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
                 $data = json_decode($json);
                 $balance->value = $data[0]->price_usd;
             }
         }
         //Get fees by month and year

         return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total], 202);
     }

     public function indexToken(Request $request){

         $user = $request->id;
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Withdraws of the user
         $query = Balance::Where('balances.type', 'fund')->where('user_id', $user)->where('currencies.type', 'Token')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type');
         //Search by

         if($searchValue != '')
         {
                 $query->Where(function($query) use($searchValue){
                     $query->Where('symbol', 'like', '%'.$searchValue.'%')
                     ->orWhere('amount', 'like', '%'.$searchValue.'%')
                     ->orWhere('value', 'like', '%'.$searchValue.'%')
                     ->orWhere('balances.created_at', 'like', '%'.$searchValue.'%');
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
             $query->orderBy('balances.created_at', 'desc');
         }else{
              $query->orderBy('balances.created_at');
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
         $balancesCurrency  =  $query->get();

         //Get fees by month and year

         return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total], 202);
     }

     public function initial(Request $request){
         $request->validate([
             'amount' => 'required| min:01',
             'id' => 'required',
         ]);

         $currency = Currency::Where('symbol', 'USD')->first();
         $id = $request->id;
         $amount = $request->amount;
         $user = User::find($id);

         $hasini = $user->funds()->where('type', 'initial')->first();

         if(isset($hasini)){
             $fund = Fund::find($hasini->id);
         }else{
             $fund = new Fund;
         }

         $fund->amount = $amount;
         $fund->reference = 'initial';
         $fund->active = 1;
         $fund->comment = 'Initial Invest';
         $fund->type = "initial";

         $fund->user()->associate($id);
         $fund->currency()->associate($currency);

         $fund->save();



         return response()->json(['result' => 'Success'], 202);
     }

     private function generate($longitud) {
         $key = '';
         $pattern = '1234567890';
         $max = strlen($pattern)-1;
         for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
         return $key;
     }



}
