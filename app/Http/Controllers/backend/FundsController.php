<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Fund;
use App\Currency;


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

        $deposits = $this->confirmationBalance($deposits);
        $withdraws = $this->confirmationBalance($withdraws);
        $depositsc = $this->selectCurrency($deposits[0]);
        $withdrawsc = $this->selectCurrency($withdraws[0]);
        $depositsuc = $this->selectCurrency($deposits[1]);
        $withdrawsuc = $this->selectCurrency($withdraws[1]);

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

        return response()->json(['deposit' => $deposits, 'withdraw' => $withdraws, "currencyBalance" => $currencyBalance], 202);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //


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

        $currency = Currency::Where('symbol', '=', $request->currency)->get();

        $name = str_replace(" ", "-", $request->reference);
        $imageName = $name . '.' . $request->file('file')->getClientOriginalExtension();

        $request->file('file')->move( public_path() . '/files/references/', $imageName);

        $fund = New Fund;
        $fund->amount = $request->amount;
        $fund->comment = $request->reference;
        $fund->associate($currency);
        $fund->save();
        return response()->json(['response' => 'Deposit success'], 202);
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
        $post = Post::find($id);
        $edit = true;
        return view('back.newpost',['post' => $post, 'edit' => $edit]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'name' => 'required| max:50',
            'email' => 'required|max:50'
        ]);


        $post = Post::find($id);

        $user->name = $request->name;
        $user->email = $request->email;
        if(isset($request->password)){
            $user->password= $request->password;
        }
        $user->save();

        $url = url('/') . '/news';

        return view('back.success',['url' => $url, 'response' => 'Congratulations the news as been updated']);
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
