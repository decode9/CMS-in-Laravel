<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Role;

class UserController extends Controller
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

            $user = Auth::User();
            $searchValue = $request->searchvalue;
            $page = $request->page;
            $resultPage = $request->resultPage;
            $orderBy = $request->orderBy;
            $orderDirection = $request->orderDirection;
            $total = 0;

            //Select Users
            $query = User::WhereNotIn('id', [$user->id]);
            //Search by

            if($searchValue != '')
            {
                    $query->Where(function($query) use($searchValue){
                        $query->Where('name', 'like', '%'.$searchValue.'%')
                        ->orWhere('username', 'like', '%'.$searchValue.'%')
                        ->orWhere('email', 'like', '%'.$searchValue.'%')
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

            $users  =  $query->get();

            $roles = [];
            foreach($users as $user){
                $role = $user->roles()->get();
                array_push($roles, $role);
            }
            //Get fees by month and year

            return response()->json(['page' => $page, 'result' => $users,'total' => $total, 'roles' => $roles], 202);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function userRoles()
    {
        $roles = Role::All();

        return response()->json(['data' => $roles], 202);
    }

    public function userClients(Request $request){

        $rolid = $request->role;

        $role = Role::find($rolid);

        $user = $role->users()->get();

        return response()->json(['data' => $user], 202);
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
            'lastname' => 'required| max:50',
            'username' => 'required|unique:users|max:20',
            'email' => 'required|unique:users|max:50',
            'password' => 'required|min:8|confirmed',
            'roles' => 'required',

        ]);

        $name = $request->name;
        $lastname = $request->lastname;
        $username = strtolower($request->username);
        $email = strtolower($request->email);
        $password = bcrypt($request->password);
        $roles = $request->roles;

        $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

        $user = new User;
        $user->name = $fullname;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password= $request->password;
        $user->save();


        foreach($roles as $role){
            $user->roles()->attach($role);
        }
        if(isset($request->client)){
            $client = $request->client;
            $user->clients()->attach($client);
        }

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
            'name' => 'required| max:50',
            'lastname' => 'required| max:50',
            'username' => 'required|unique:users|max:20',
            'email' => 'required|unique:users|max:50',
            'password' => 'min:8|confirmed',
            'roles' => 'required',

        ]);

        $id = $request->id;
        $name = $request->name;
        $lastname = $request->lastname;
        $username = strtolower($request->username);
        $email = strtolower($request->email);
        $password = bcrypt($request->password);
        $roles = $request->roles;

        $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

        $user = User::Find($id);

        $user->name = $fullname;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password= $request->password;
        $user->save();

        $rols = $User->roles()->get();
        foreach($roles as $role){
            foreach($rols as $rol){
                if($rol->id != $role){
                    $user->roles()->attach($role);
                }
            }
        }
        if(isset($request->client)){
            $clients = $User->clients()->get();
            $client = $request->client;
            foreach($clients as $c){
                if($c->id != $client){
                    $user->clients()->attach($client);
                }
            }
        }

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
        $user = User::find($id);
        $user->roles()->detach();
        $user->clients()->detach();
        $funds = $user->funds()->get();
        if($funds){
            foreach($funds as $fund){
                $fd = App\Fund::find($fund->id);
                    $fd->delete();
            }
        }

        $accounts = $user->accounts()->get();
        if($accounts){
            foreach($accounts as $account){
                $ac = App\Fund::find($account->id);
                    $ac->delete();
            }
        }

        $user->delete();

        return response()->json(['message' => "success"], 202);
    }
}
