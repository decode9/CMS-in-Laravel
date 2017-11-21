<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Account;



class AccountController extends Controller
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
    public function index(Request $request)
    {
        //
        $user = Auth::User();
        $searchValue = $request->searchvalue;
        $page = $request->page;
        $resultPage = $request->resultPage;
        $orderBy = $request->orderBy;
        $orderDirection = $request->orderDirection;
        $total = 0;

        //Select Witdraws of the user
        $query = Account::Where('user_id', $user->id);
        //Search by

        if($searchValue != '')
        {
                $query->Where(function($query) use($searchValue){
                    $query->Where('type', 'like', '%'.$searchValue.'%')
                    ->orWhere('entity', 'like', '%'.$searchValue.'%')
                    ->orWhere('address', 'like', '%'.$searchValue.'%');
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
            $query->orderBy('created_at', 'desc');
        }else{
             $query->orderBy('created_at');
        }

        if($resultPage == null || $resultPage == 0)
        {
            $resultPage = 10;
        }

        //Get Total of account
        $total  =  $query->get()->count();

        if($page > 1)
        {
             $query->offset(    ($page -  1)   *    $resultPage);
        }


        $query->limit($resultPage);
        $account  =  $query->get();

        //Get fees by month and year

        return response()->json(['page' => $page, 'result' => $account, 'total' => $total,], 202);

    }


    public function store(Request $request)
    {
        //
        $request->validate([
            'type' => 'required|string',
            'entity' => 'required|max:50',
            'address' => 'required',
        ]);

        $user = Auth::User();

        $account = New Account;
        $account->type = $request->type;
        $account->entity = $request->entity;
        $account->address = $request->address;
        $account->user()->associate($user);
        $account->save();

        return response()->json(['response' => 'Account Created'], 202);
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
            'currency' => 'required',
            'amount' => 'required| min:03',
            'account' => 'required'
        ]);


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
