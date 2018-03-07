<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Newsletter;

class NewsletterController extends Controller
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
            $query = Newsletter::LeftJoin('users', 'newsletters.user_id', '=', 'users.id')->select('newsletters.*', 'username');
            //Search by

            if($searchValue != '')
            {
                    $query->Where(function($query) use($searchValue){
                        $query->Where('title', 'like', '%'.$searchValue.'%')
                        ->orWhere('username', 'like', '%'.$searchValue.'%')
                        ->orWhere('message', 'like', '%'.$searchValue.'%')
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

            $newsletters  =  $query->get();

            return response()->json(['page' => $page, 'result' => $newsletters,'total' => $total], 202);
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
            'title' => 'required| max:50',
            'message' => 'required| max:255',
        ]);

        $user = Auth::User();
        $title = $request->title;
        $message = $request->message;

        $new = new Newsletter;
        $new->title = $title;
        $new->message = $message;
        $new->user()->associate($user);
        $new->save();
        return response()->json(['message' => "success"], 202);
    }

    public function show($id)
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

    public function update(Request $request)
    {
        //
        $request->validate([
            'id' => 'required',
            'title' => 'required| max:50',
            'message' => 'required| max:255',
        ]);

        $user = Auth::User();
        $id = $request->id;
        $title = $request->title;
        $message = $request->message;

        $new = Newsletter::find($id);
        $new->title = $title;
        $new->message = $message;
        $new->save();

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
        $id = $request->id;
        $new = Newsletter::find($id);
        $new->delete();

        return response()->json(['message' => "success"], 202);
    }
}
