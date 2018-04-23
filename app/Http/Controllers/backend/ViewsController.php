<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ViewsController extends Controller {

  //Execute if user is authenticated
  public function __construct(){

    $this->middleware('auth');

  }

  //Return Home View
  public function index(){

    return view('home');

  }

  //Return User View
  public function users(){

    return view('back.users');

  }

  //Return Currencies View
  public function currencies(){

    return view('back.currencies');

  }

  //Return Funds View
  public function funds(){

    return view('back.funds');

  }

  //Return Orders View
  public function orders(){

    return view('back.orders');

  }

  //Return Newsletter View
  public function newsletter(){

    return view('back.newsletter');

  }

  //Return Clients View
  public function clients(){

    return view('back.clients');

  }

  //Return Profile View
  public function profile(){

    return view('back.profile');

  }
}
