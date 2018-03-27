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

class PeriodController extends Controller
{
    //
    public function index(Request $request){

        $searchValue = $request->searchvalue;
        $page = $request->page;
        $resultPage = $request->resultPage;
        $orderBy = $request->orderBy;
        $orderDirection = $request->orderDirection;
        $total = 0;

        //Select Users
        $query = Period::select();
        //Search by

        if($searchValue != '')
        {
                $query->Where(function($query) use($searchValue){
                    $query->Where('open_date', 'like', '%'.$searchValue.'%')
                    ->orWhere('open_amount', 'like', '%'.$searchValue.'%')
                    ->orWhere('close_date', 'like', '%'.$searchValue.'%')
                    ->orWhere('close_amount', 'like', '%'.$searchValue.'%')
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

        $periods  =  $query->get();

        //Get fees by month and year

        return response()->json(['page' => $page, 'result' => $periods,'total' => $total], 202);
    }

    public function create(Request $request){
      $request->validate([
           'openD' => 'required',
      ]);

      $openD = $request->openD;

      $period = new Period;
      $period->open_date = $openD;
      $period->open_amount = 0;
      $period->close_amount = 0;
      $period->save();

      $currency = Currency::Where('symbol', 'USD')->first();

      $fund = new Fund;
      $fund->amount = 0;
      $fund->reference = 'initial';
      $fund->active = 1;
      $fund->comment = 'Initial Invest';
      $fund->type = "initial";
      $fund->created_at = $openD;
      $fund->currency()->associate($currency);
      $fund->period()->associate($period);
      $fund->save();

      return response()->json(['message' => 'success'], 202);
    }

    public function update(Request $request){
      $request->validate([
            'id' => 'required',
           'closeD' => 'required',
           'closeA' => 'required',
      ]);

      $closeD = $request->closeD;
      $closeA = $request->closeA;

      $period = Period::Find($request->id);
      $period->close_date = $closeD;
      $period->close_amount = $closeA;
      $period->save();

      return response()->json(['message' => 'success'], 202);
    }

    public function destroy(Request $request){
      $request->validate([
            'id' => 'required',
      ]);

      $id = $request->id;

      $fund = Fund::where('period_id', $id)->where('user_id', null)->first();

      $fundD = Fund::find($fund->id);
      $fundD->delete();

      $period = Period::Find($id);
      $period->delete();

      return response()->json(['message' => 'success'], 202);
    }
}
