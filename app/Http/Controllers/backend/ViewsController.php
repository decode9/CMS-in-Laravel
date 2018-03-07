<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ViewsController extends Controller
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
     public function users(){
         return view('back.users');
     }
     public function currencies(){
         return view('back.currencies');
     }
    public function funds(){
        return view('back.funds');
    }
    public function orders(){
        return view('back.orders');
    }
    public function newsletter(){
        return view('back.newsletter');
    }
    public function clients(){
        return view('back.clients');
    }
}
