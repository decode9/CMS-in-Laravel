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

class PeriodController extends Controller{

  //List of Periods
  public function index(Request $request){

    //Assign Variables
    $searchValue = $request->searchvalue;
    $page = $request->page;
    $resultPage = $request->resultPage;
    $orderBy = $request->orderBy;
    $orderDirection = $request->orderDirection;
    $total = 0;

    //Select Periods
    $query = Period::select();

    //Search by
    if($searchValue != ''){

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

    //Get Periods
    $periods  =  $query->get();

    //Return Response in JSON DataType
    return response()->json(['page' => $page, 'result' => $periods,'total' => $total], 202);
  }

  //Create Period
  public function create(Request $request){

    //Validate $request Data
    $request->validate([
      'openD' => 'required',
    ]);

    //Assign Variables
    $openD = $request->openD;

    //Create Period
    $period = new Period;
    $period->open_date = $openD;
    $period->open_amount = 0;
    $period->close_amount = 0;
    $period->save();

    //Select USD Currency
    $currency1 = Currency::Where('symbol', 'USD')->first();

    //Create Period initial Fund
    $fund = new Fund;
    $fund->amount = 0;
    $fund->reference = 'initial';
    $fund->active = 1;
    $fund->comment = 'Initial Invest';
    $fund->type = "initial";
    $fund->created_at = $openD;
    $fund->currency()->associate($currency1);
    $fund->period()->associate($period);
    $fund->save();

    //Return Response in JSON DataType
    return response()->json(['message' => 'success'], 202);
  }

  //Update Period
  public function update(Request $request){

    //Validate $request data
    $request->validate([
      'id' => 'required',
      'closeD' => 'required',
      'closeA' => 'required',
    ]);

    //Assign Variables
    $closeD = $request->closeD;
    $closeA = $request->closeA;

    //Select USD Currency
    $currency1 = Currency::Where('symbol', 'USD')->first();

    //Find Period
    $period = Period::Find($request->id);

    //Update Period
    $period->close_date = $closeD;
    $period->close_amount = $closeA;
    $period->save();

    //Create Period
    $periodN = new Period;
    $periodN->open_date = $closeD;
    $periodN->open_amount = $closeA;
    $periodN->close_amount = 0;
    $periodN->save();

    //Create Period Initial Fund
    $fund = new Fund;
    $fund->amount = 0;
    $fund->reference = 'initial';
    $fund->active = 1;
    $fund->comment = 'Initial Invest';
    $fund->type = "initial";
    $fund->created_at = $closeD;
    $fund->currency()->associate($currency1);
    $fund->period()->associate($periodN);
    $fund->save();

    //Return Response in JSON DataType
    return response()->json(['message' => 'success'], 202);
  }

  //Destroy Period
  public function destroy(Request $request){

    //Validate $request Data
    $request->validate([
      'id' => 'required',
    ]);

    //Assign Variables
    $id = $request->id;

    //Select Period Initial Funds
    $funds = Fund::where('period_id', $id)->where('user_id', null)->get();

    //Loop Period Initial Funds
    foreach($funds as $fund){
      //Delete Period Initial Fund
      $fund->delete();
    }

    //Find Period
    $period = Period::Find($id);

    //Delete Period
    $period->delete();

    //Return Response in JSON DataType
    return response()->json(['message' => 'success'], 202);
  }
}
