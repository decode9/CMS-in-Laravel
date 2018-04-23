<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Newsletter;

class NewsletterController extends Controller{

  //Execute if user is authenticated
  public function __construct(){

    $this->middleware('auth');

  }

  //List of Newsletters
  public function index(Request $request){

    //assign Variables
    $searchValue = $request->searchvalue;
    $page = $request->page;
    $resultPage = $request->resultPage;
    $orderBy = $request->orderBy;
    $orderDirection = $request->orderDirection;
    $total = 0;

    //Select Newsletters
    $query = Newsletter::LeftJoin('users', 'newsletters.user_id', '=', 'users.id')->select('newsletters.*', 'name');

    //Search by
    if($searchValue != ''){
      $query->Where(function($query) use($searchValue){
        $query->Where('title', 'like', '%'.$searchValue.'%')
        ->orWhere('username', 'like', '%'.$searchValue.'%')
        ->orWhere('message', 'like', '%'.$searchValue.'%')
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

    //Get Newsletters
    $newsletters  =  $query->get();

    //Return Response in JSON DataType
    return response()->json(['page' => $page, 'result' => $newsletters,'total' => $total], 202);
  }

  //Store Newsletter
  public function store(Request $request){

    //Validate $request data
    $request->validate([
      'title' => 'required| max:50',
      'message' => 'required| max:255',
    ]);

    //Select Authenticated user
    $user = Auth::User();

    //Assign Variables
    $title = $request->title;
    $message = $request->message;

    //Create Newsletter
    $new = new Newsletter;
    $new->title = $title;
    $new->message = $message;
    $new->user()->associate($user);
    $new->save();

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }

  //Update Newsletter
  public function update(Request $request){

    //Validate $request Data
    $request->validate([

      'id' => 'required',
      'title' => 'required| max:50',
      'message' => 'required| max:255',

    ]);

    //Select Authenticated User
    $user = Auth::User();

    //Assign Variables
    $id = $request->id;
    $title = $request->title;
    $message = $request->message;

    //Find Newsletter
    $new = Newsletter::find($id);

    //Modify Newsletter
    $new->title = $title;
    $new->message = $message;
    $new->save();

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }

  //Destroy Newsletter
  public function destroy(Request $request){

    //Assign Newsletter ID
    $id = $request->id;

    //Find Newsletter
    $new = Newsletter::find($id);

    //Delete
    $new->delete();

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }
}
