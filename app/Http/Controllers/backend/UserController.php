<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
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

        $user = $role->users();

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

        $user = new User;
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password= $request->password;
        $roles = $request->roles;
        foreach($roles as $role){
            $user->attach($role);
        }

        $user->save();

        return response()->json();
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
