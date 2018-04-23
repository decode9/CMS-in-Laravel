<?php

namespace App\Http\Controllers\Mail;


use App\Mail\ContactWebsite;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


class MailController extends Controller {

  //Function for Mail Contact
  public function contactMail(Request $request){

    //Validate $request data
    $this->validate($request, [
      'name' => 'required',
      'phone' => 'required',
      'address' => 'required',
      'subject' => 'required',
      'email' => 'required|email',
      'message' => 'required',
    ]);

    //Assign Variables in $data Array
    $data = [
      'name' => $request->name,
      'phone' => $request->phone,
      'address' => $request->address,
      'subject' => $request->subject,
      'email' => $request->email,
      'message' => $request->message,
    ];

    //Send Mail With Data
    Mail::to('info@kryptogroup.net')->send(new ContactWebsite($data));
  }

}
