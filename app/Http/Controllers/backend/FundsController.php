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


class FundsController extends Controller
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

     public function currencies(Request $request){
         $symbol = $request->currency;

         $balance = Currency::WhereNotIn('symbol', [$symbol] )->get();

         return response()->json(['data' => $balance], 202);
     }

     public function total(Request $request){
        $user = Auth::User();
        $balances = Balance::Where('balances.type', 'fund')->where('user_id', null)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name')->get();
        $usd = 0;
        $btc = 0;
        foreach($balances as $balance){
            if($balance->value == "coinmarketcap"){
                $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
                $data = json_decode($json);
                $balance->value = $data[0]->price_usd;
                $balance->value_btc = $data[0]->price_btc;

            }

            if($balance->symbol == "VEF"){
              $balance->value_btc = 238000;
              $btcvalue = 0;
            }else{
              $btcvalue = $balance->amount * $balance->value_btc;
            }
            if($balance->symbol == "USD"){
              $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin');
              $data = json_decode($json);
              $balance->value_btc = $data[0]->price_usd;
              $btcvalue = $balance->amount / $balance->value_btc;
            }
            $usdvalue = $balance->amount * $balance->value;
            $usd += $usdvalue;
            $btc += $btcvalue;
        }
        if($user->hasRole('30')){
            $percent = $this->percent($user);
            $usd = $usd * $percent;
            $btc = $btc * $percent;
        }
         return response()->json(['usd' => $usd, 'btc' => $btc], 202);
     }

     public function available(Request $request){
         $symbol = $request->currency;

         $balance = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $symbol )->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type')->first();

         return response()->json(['data' => $balance], 202);
     }

     private function percent($user){
             if($user->hasRole('30')){
                     $userInitial = $user->funds()->where('type', 'initial')->first();
                     $userInvest = $userInitial->amount;
                     $fundInitial = Fund::Where('user_id', null)->where('type', 'initial')->first();
                     $fundInvest = $fundInitial->amount;
                     $percent = $userInvest / $fundInvest;
                     return $percent;
             }
     }
     public function indexCurrency(Request $request){

         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;


         //Select Witdraws of the user
         $query = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.type', 'currency')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name');
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
             if($balance->symbol == "USD"){
                $balance->value = 1;
             }
             if($balance->symbol == "VEF"){
                $balance->value = 217200;
             }

         }
         if($user->hasRole('30')){
             $percent = $this->percent($user);
             foreach($balancesCurrency as $balance){
                 $newbalance = $balance->amount * $percent;
                 $balance->amount = $newbalance;
             }
         }
         if($user->hasRole('20') || $user->hasRole('901')){
             $eaccess = true;
         }else{
             $eaccess = false;
         }

         return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total, 'eaccess' => $eaccess], 202);
     }

     public function indexCrypto(Request $request){

         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Witdraws of the user
         $query = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.type', 'Cryptocurrency')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name');
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

         if($user->hasRole('30')){
             $percent = $this->percent($user);
             foreach($balancesCurrency as $balance){
                 $newbalance = $balance->amount * $percent;
                 $balance->amount = $newbalance;
             }
         }

         foreach($balancesCurrency as $balance){
             if($balance->value == "coinmarketcap"){
                 $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
                 $data = json_decode($json);
                 $balance->value = $data[0]->price_usd;
             }
         }

         if($user->hasRole('20') || $user->hasRole('901')){
             $eaccess = true;
         }else{
             $eaccess = false;
         }
         //Get fees by month and year

         return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total, 'eaccess' => $eaccess], 202);
     }

     public function indexToken(Request $request){

         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Withdraws of the user
         $query = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.type', 'Token')->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*', 'symbol', 'value', 'currencies.type', 'name');
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

         if($user->hasRole('30')){
             $percent = $this->percent($user);
             foreach($balancesCurrency as $balance){
                 $newbalance = $balance->amount * $percent;
                 $balance->amount = $newbalance;
             }
         }

         foreach($balancesCurrency as $balance){
             if($balance->value == "coinmarketcap"){
                 $json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/'. $balance->name);
                 $data = json_decode($json);
                 $balance->value = $data[0]->price_usd;
             }
         }

         if($user->hasRole('20') || $user->hasRole('901')){
             $eaccess = true;
         }else{
             $eaccess = false;
         }
         //Get fees by month and year

         return response()->json(['page' => $page, 'result' => $balancesCurrency, 'total' => $total, 'eaccess' => $eaccess], 202);
     }

     public function transactions(Request $request){

         $user = Auth::User();
         $searchValue = $request->searchvalue;
         $page = $request->page;
         $resultPage = $request->resultPage;
         $orderBy = $request->orderBy;
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Withdraws of the user
         $query = FundOrder::where('user_id', null)->where('status', 'complete')->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.in_currency')->select('fund_orders.*', 'symbol');
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

         if($orderBy != '')
         {
             if($orderDirection != '')
             {
                 $query->orderBy($orderBy, 'desc');
             }else{
                 $query->orderBy($orderBy);
             }
         }else if($orderDirection != ''){
             $query->orderBy('fund_orders.created_at', 'desc');
         }else{
              $query->orderBy('fund_orders.created_at');
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

         $transactions  =  $query->get();

         if($user->hasRole('30')){
             $percent = $this->percent($user);
             foreach($transactions as $transaction){
                 $newamountin = $transaction->in_amount * $percent;
                 $newamountout = $transaction->out_amount * $percent;
                 $transaction->in_amount = $newamountin;
                 $transaction->out_amount = $newamountout;
             }
         }

         foreach($transactions as $transaction){
             $currency = Currency::find($transaction->out_currency);
             $transaction->out_symbol = $currency->symbol;
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
         $orderDirection = $request->orderDirection;
         $total = 0;

         //Select Withdraws of the user
         $query = FundOrder::where('user_id', null)->where('status', 'pending')->leftJoin('currencies', 'currencies.id', '=', 'fund_orders.in_currency')->select('fund_orders.*', 'symbol');
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

         if($orderBy != '')
         {
             if($orderDirection != '')
             {
                 $query->orderBy($orderBy, 'desc');
             }else{
                 $query->orderBy($orderBy);
             }
         }else if($orderDirection != ''){
             $query->orderBy('fund_orders.created_at', 'desc');
         }else{
              $query->orderBy('fund_orders.created_at');
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

         $transactions  =  $query->get();

         if($user->hasRole('30')){
             $percent = $this->percent($user);
             foreach($transactions as $transaction){
                 $newamountin = $transaction->in_amount * $percent;
                 $newamountout = $transaction->out_amount * $percent;
                 $transaction->in_amount = $newamountin;
                 $transaction->out_amount = $newamountout;
             }
         }

         foreach($transactions as $transaction){
             $currency = Currency::find($transaction->out_currency);
             $transaction->out_symbol = $currency->symbol;
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

     private function generate($longitud) {
         $key = '';
         $pattern = '1234567890';
         $max = strlen($pattern)-1;
         for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
         return $key;
     }

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
    public function exchange(Request $request){

      $request->validate([
          'cout' => 'required',
          'aout' => 'required| min:1',

          'cin' => 'required',

      ]);

      $cout = $request->cout;
      $cin = $request->cin;

      $aout = $request->aout;
      $ain = $request->ain;

      $rate = $request->rate;

      $valid =  Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $cout)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();
      $change = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $cin)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();
      $idout = Currency::Where('symbol', $cout)->select('id')->first();

      $idin = Currency::Where('symbol', $cin)->select('id')->first();


      if($aout < $valid->amount){
        $order = new FundOrder;
        if(isset($ain)){
          $balance = Balance::find($valid->id);
          $newbalance = $balance->amount - $aout;
          $balance->amount = $newbalance;
          $order->in_amount = $ain;
          $order->status = 'complete';
          $balancen = Balance::find($change->id);
          $newbalancen = $balancen->amount + $ain;
          $balancen->amount = $newbalancen;
          $order->rate = $rate;
          $balance->save();
          $balancen->save();
        }else{
          $order->in_amount = 0;
          $order->status = 'pending';
          $order->rate = 0;
        }
        $order->inCurrencyOrder()->associate($idin);
        $order->outCurrencyOrder()->associate($idout);
        $order->out_amount = $aout;
      }else{
        return response()->json(['error' => 'You don\'t have enough funds'], 403);
      }

      $order->save();


      return response()->json(['message' => 'Your Exchange was processed successfully'], 202);
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

      $valid =  Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $cout)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();
      $change = Balance::Where('balances.type', 'fund')->where('user_id', null)->where('currencies.symbol', $cin)->leftJoin('currencies', 'currencies.id', '=', 'balances.currency_id')->select('balances.*')->first();
      $idout = Currency::Where('symbol', $cout)->select('id')->first();

      $idin = Currency::Where('symbol', $cin)->select('id')->first();


      if($aout < $valid->amount){
        $order = FundOrder::find($id);
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
