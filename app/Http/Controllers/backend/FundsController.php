<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Currency;
use App\Fund;



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

     private function confirmationBalance($blc){
         $conblc = [];
         $unconblc = [];
         foreach($blc as $bl){
             if($bl->active == true){
                 array_push($conblc, $bl);
             }else{
                 array_push($unconblc, $bl);
             }
         }
         $content = [$conblc, $unconblc];
         return $content;
     }


     private function selectCurrency($blc){
         $vef = [];
         $usd = [];
         $btc = [];
         $ltc = [];
         $eth = [];

         foreach ($blc as $bl) {
                 switch ($bl->currency_id) {
                     case 1:
                         array_push($vef, $bl);
                         break;
                     case 2:
                         array_push($usd, $bl);
                         break;
                     case 3:
                         array_push($btc, $bl);
                         break;
                     case 5:
                         array_push($eth, $bl);
                         break;
                     case 4:
                         array_push($ltc, $bl);
                         break;
                 }
             }

             $content = ['VEF' => $vef, 'USD' => $usd, 'BTC' => $btc, 'ETH' => $eth, 'LTC' => $ltc];
             return $content;
     }

     private function countBalance($blc){
         $count = 0;
         foreach($blc as $bl){
             $count += $bl->amount;
         }
         return $count;
     }
    public function index()
    {
        //
        $deposits = Fund::where('amount', '>', '0')->get();
        $withdraws = Fund::where('amount', '<', '0')->get();

        $depositsa = $this->confirmationBalance($deposits);
        $withdrawsa = $this->confirmationBalance($withdraws);
        $depositsc = $this->selectCurrency($depositsa[0]);
        $withdrawsc = $this->selectCurrency($withdrawsa[0]);
        $depositsuc = $this->selectCurrency($depositsa[1]);
        $withdrawsuc = $this->selectCurrency($withdrawsa[1]);

        $vefct = $this->countBalance($depositsc['VEF']) + $this->countBalance($withdrawsc['VEF']);
        $vefuct = $this->countBalance($depositsuc['VEF']) + $this->countBalance($withdrawsuc['VEF']);

        $usdct = $this->countBalance($depositsc['USD']) + $this->countBalance($withdrawsc['USD']);
        $usduct = $this->countBalance($depositsuc['USD']) + $this->countBalance($withdrawsuc['USD']);

        $btcct = $this->countBalance($depositsc['BTC']) + $this->countBalance($withdrawsc['BTC']);
        $btcuct = $this->countBalance($depositsuc['BTC']) + $this->countBalance($withdrawsuc['BTC']);

        $ethct = $this->countBalance($depositsc['ETH']) + $this->countBalance($withdrawsc['ETH']);
        $ethuct = $this->countBalance($depositsuc['ETH']) + $this->countBalance($withdrawsuc['ETH']);

        $ltcct = $this->countBalance($depositsc['LTC']) + $this->countBalance($withdrawsc['LTC']);
        $ltcuct = $this->countBalance($depositsuc['LTC']) + $this->countBalance($withdrawsuc['LTC']);

        $currencyBalance = ["Confirmed" => [$vefct, $usdct, $btcct, $ethct, $ltcct] , "Unconfirmed" => [$vefuct, $usduct, $btcuct, $ethuct, $ltcuct]];

        return response()->json(["currencyBalance" => $currencyBalance], 202);
    }

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
        $query = Fund::Where('amount','<', '0')->where('user_id', $user->id)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('funds.*', 'symbol');
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

        return response()->json(['page' => $page, 'result' => $deposits, 'total' => $total,], 202);


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        $query = Fund::Where('amount','>', '0')->where('user_id', $user->id)->leftJoin('currencies', 'currencies.id', '=', 'funds.currency_id')->select('funds.*', 'symbol');
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

        return response()->json(['page' => $page, 'result' => $deposits, 'total' => $total,], 202);


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

        $fund = New Fund;
        $fund->amount = $request->amount;
        $fund->comment = $request->reference;
        $fund->currency()->associate($currency);
        $fund->user()->associate($user);
        $fund->save();

        return response()->json(['response' => 'Deposit success', 'currency' => $currency->id], 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     private function generate($longitud) {
         $key = '';
         $pattern = '1234567890';
         $max = strlen($pattern)-1;
         for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
         return $key;
     }

    public function update(Request $request)
    {
        //
        $request->validate([
            'currency' => 'required',
            'amount' => 'required| min:03',
            'accountId' => 'required'
        ]);

        $currency = Currency::Where('symbol', $request->currency)->first();
        $user = Auth::User();

        $key = '';
        $pattern = '1234567890';
        $max = strlen($pattern)-1;
        for($i=0;$i < 7;$i++) $key .= $pattern{mt_rand(0,$max)};

        $amount = floatval($request->amount);
        $reference = $key;
        $fund = New Fund;
        $fund->amount = abs($amount);
        $fund->comment = $reference;
        $fund->currency()->associate($currency);
        $fund->user()->associate($user);
        $fund->account()->associate($request->accountId);
        $fund->save();

        return response()->json(['response' => 'Withdraw success'], 202);


    }
    /**
     * Remove the specified resource from storage.•••••••••
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $post = Post::find($id);

        $post->delete();
        $url = url('/') . '/news';
        return view('back.success',['url' => $url, 'response' => 'Congratulations the news as been deleted']);
    }
}
