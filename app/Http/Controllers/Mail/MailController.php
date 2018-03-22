<?php

namespace App\Http\Controllers\Mail;


use App\Mail\ContactWebsite;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


class MailController extends Controller
{
    //
    public function contactMail(Request $request){

        $this->validate($request, [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'subject' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        $data = [
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'subject' => $request->subject,
            'email' => $request->email,
            'message' => $request->message,
        ];

        Mail::to('info@kryptogroup.net')->send(new ContactWebsite($data));

    }

}
