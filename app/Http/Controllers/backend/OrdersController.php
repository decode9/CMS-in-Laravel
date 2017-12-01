<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Currency;
use App\Fund;
use App\FundOrder;



class OrdersController extends Controller
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

     public function orders(Request $request){

         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Deposits of the user
         $query = FundOrder::Where('user_id', $user->id);
         $query2 = FundOrder::Where('user_id', $user->id);
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
     private function generate($longitud) {
         $key = '';
         $pattern = '1234567890';
         $max = strlen($pattern)-1;
         for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
         return $key;
     }

    public function balance(Request $request){
        $request->validate([
            'currency' => 'required',
        ]);
        $currency = $request->currency;
        $funds = Fund::whereHas('currency', function($query) use($currency){
            $query->where('symbol', $currency);
        })->sum("amount");

        return response()->json(['result' => $funds], 202);
    }

    public function buySell(Request $request){

        $request->validate([
            'currency' => 'required',
            'amount' => 'required|min:01',
            'type' => 'required',
            'alt' => 'required',
        ]);

        $user = Auth::user();

        $currency = $request->currency;
        $alt = $request->alt;
        $amount = $request->amount;
        $outer = Currency::Where('symbol', $request->currency)->first();
        $inner = Currency::Where('symbol', $request->alt)->first();

        $reference = $this->generate(7);

        $order = New FundOrder;
        if($request->type == 'buy'){
            $funds = Fund::whereHas('currency', function($query) use($currency){
                $query->where('symbol', $currency);
            })->sum("amount");
            if($funds > $request->amount){
                $order->out_amount = $request->amount;
                $fund = New Fund;
                $fund->amount = $request->amount * -1;
                $fund->comment = $reference;
                $fund->type = "orderOut";
                $fund->user()->associate($user);
                $fund->currency()->associate($outer);
            }else{
                return response()->json(['error' => 'You don\'t have enough funds'], 403);
            }
            $order->fee = 0;
            $order->rate = 0;
            $order->fee = 0;
            $order->in_amount = 0;
            $order->reference = $reference;
            $order->outCurrencyOrder()->associate($outer);
            $order->inCurrencyOrder()->associate($inner);
            $order->user()->associate($user);

        }else if($request->type == 'sell'){
            $funds = Fund::whereHas('currency', function($query) use($alt){
                $query->where('symbol', $alt);
            })->sum("amount");
            if($funds > $request->amount){
                $order->out_amount = $request->amount;
                $fund = New Fund;
                $fund->amount = $request->amount * -1;
                $fund->comment = $reference;
                $fund->type = "orderOut";
                $fund->user()->associate($user);
                $fund->currency()->associate($inner);
            }else{
                return response()->json(['error' => 'You don\'t have enough funds'], 403);
            }
            $order->fee = 0;
            $order->rate = 0;
            $order->fee = 0;
            $order->in_amount = 0;
            $order->reference = $reference;
            $order->outCurrencyOrder()->associate($inner);
            $order->inCurrencyOrder()->associate($outer);
            $order->user()->associate($user);
        }

        $order->save();
        $fund->save();

        return response()->json(['message' => 'Your order #'. $reference .' was place with success'], 202);
    }
}
