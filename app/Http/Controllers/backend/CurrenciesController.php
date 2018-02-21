<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Currency;

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
            'symbol' => 'required| max:3',
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
            'symbol' => 'required| max:3',
            'type' => 'required|max:20',

        ]);

        $name = ucfirst(strtolower($request->name));;
        $symbol = strtoupper($request->symbol);
        $type = $request->type;

        $currency = Currency::Find($id);
        $currency->name = $name;
        $currency->symbol = $symbol;
        $currency->$type = $type;

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

        $currency->delete();

        return response()->json(['message' => "success"], 202);
    }
}
