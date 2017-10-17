<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $users = User::all();

        return view('back.users', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $edit = false;
        return view('back.newuser', ['edit' => $edit]);
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
            'name' => 'required| max:50',
            'username' => 'required|unique:users|max:20',
            'email' => 'required|unique:users|max:50',
            'password' => 'required|min:8|confirmed'
        ]);

        $user = new User;
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password= $request->password;
        $user->save();

        $url = url('/') . '/users/new';

        return view('back.success',['url' => $url, 'response' => 'Congratulations the user as been created']);
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
    public function edit($id)
    {
        //
        $user = User::find($id);
        $edit = true;
        return view('back.newuser',['user' => $user, 'edit' => $edit]);

    }

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
            'name' => 'required| max:50',
            'email' => 'required|max:50'
        ]);


        $user = User::find($id);

        $user->name = $request->name;
        $user->email = $request->email;
        if(isset($request->password)){
            $user->password= $request->password;
        }
        $user->save();

        $url = url('/') . '/users/edit/' . $id;

        return view('back.success',['url' => $url, 'response' => 'Congratulations the user as been updated']);
    }

    /**
     * Remove the specified resource from storage.•••••••••
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $user = User::find($id);

        $user->delete();
        $url = url('/') . '/users';
        return view('back.success',['url' => $url, 'response' => 'Congratulations the user as been deleted']);
    }
}
