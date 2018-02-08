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

     public function clientList(Request $request){

     }

     public function clientsOrders(Request $request){

         $user = $request->user_id;
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Deposits of the user


         $query = FundOrder::Where('user_id', $user)->where('type', 'outOrder')->where('type', 'inOrder');
         $query2 = FundOrder::Where('user_id', $user)->where('type', 'outOrder')->where('type', 'inOrder');
         //Search by

         if($searchValue != '')
         {
                 $query->Where(function($query) use($searchValue){
                     $query->Where('amount_out', 'like', '%'.$searchValue.'%')
                     ->orWhere('amount_in', 'like', '%'.$searchValue.'%')
                     ->orWhere('reference', 'like', '%'.$searchValue.'%')
                     ->orWhere('fund_orders.created_at', 'like', '%'.$searchValue.'%');
                 });
                 $query2->Where(function($query2) use($searchValue){
                     $query2->Where('amount_out', 'like', '%'.$searchValue.'%')
                     ->orWhere('amount_in', 'like', '%'.$searchValue.'%')
                     ->orWhere('reference', 'like', '%'.$searchValue.'%')
                     ->orWhere('fund_orders.created_at', 'like', '%'.$searchValue.'%');
                 });
         }
         //Order By

         if($orderBy != '')
         {
             if($orderDirection != '')
             {
                 $query->orderBy($orderBy, 'desc');
                 $query2->orderBy($orderBy, 'desc');
             }else{
                 $query->orderBy($orderBy);
                 $query2->orderBy($orderBy);
             }
         }else if($orderDirection != ''){
             $query->orderBy('fund_orders.created_at');
             $query2->orderBy('fund_orders.created_at');
         }else{
              $query->orderBy('fund_orders.created_at', 'desc');
              $query2->orderBy('fund_orders.created_at', 'desc');
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
              $query2->offset(    ($page -  1)   *    $resultPage);
         }


         $query->limit($resultPage);
         $query2->limit($resultPage);

         $orders  =  $query->get();

         $currencyOut = $query->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.out_currency')->select('symbol')->get();

         $currencyIn = $query2->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.in_currency')->select('symbol')->get();



         //Get fees by month and year

         return response()->json(['page' => $page, 'result' => $orders, 'in' => $currencyIn, 'out' => $currencyOut, 'total' => $total, 'user' => $user->name], 202);
     }

     public function clientsDeposits(Request $request){

         $user = $request->user_id;
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Witdraws of the user
         $query = Fund::where('type', 'deposit')->where('user_id', $user->id)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('funds.*', 'symbol');
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

     public function clientsWithdraw(Request $request){

         $user = $request->user_id;
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Witdraws of the user
         $query = Fund::Where('amount','<', '0')->where('type', 'withdraw')->where('user_id', $user->id)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('funds.*', 'symbol');
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


     private function generate($longitud) {
         $key = '';
         $pattern = '1234567890';
         $max = strlen($pattern)-1;
         for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
         return $key;
     }

}
