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

    
}
