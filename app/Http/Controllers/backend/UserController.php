<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Mail\newUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Mail;
use App\User;
use App\Role;
use App\Currency;
use App\Balance;

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
     * Take All roles for users
     */
    public function userRoles()
    {
        $roles = Role::All();

        return response()->json(['data' => $roles], 202);
    }

    /**
     * Take Manager Users for Clients
     */

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
            'email' => 'required|unique:users|max:50',
            'password' => 'required|min:6|confirmed',
            'roles' => 'required',

        ]);

        $name = $request->name;
        $lastname = $request->lastname;
        $username = strtolower($request->username);
        $email = strtolower($request->email);
        $password = bcrypt($request->password);
        $roles = $request->roles;

        $data = ['email' => $email, 'password' => $request->password];
        $currencies = Currency::All();

        $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

        $user = new User;
        $user->name = $fullname;
        $user->email = $request->email;
        $user->password= $password;
        $user->save();

        if($user->hasRole('20')){
          foreach($currencies as $currency){
                  $balance = New Balance;
                  $balance->amount = 0;
                  $balance->type = 'fund';
                  $balance->currency()->associate($currency);
                  $balance->user()->  associate($user);
                  $balance->save();
          }
        }



        foreach($roles as $role){
            $user->roles()->attach($role);
        }
        if(isset($request->client)){
            $client = $request->client;
            $user->clients()->attach($client);
        }

        Mail::to($email)->send(new newUser($data));
        return response()->json(['message' => "success"], 202);
    }

    public function show(Request $request)
    {
        //
        $auth = Auth::User();
        $user = User::Where('id', $auth->id)->with('roles:slug')->first();

        return response()->json(['result' => $user], 202);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


     public function picture(Request $request){

       $request->validate([
           'picture' => 'required',
           'id' => 'required',
       ]);

       $id = $request->id;
       $user = User::find($id);



       if($user->image !== null){
         Storage::delete(public_path() . '\\' .$user->image);
       }
       $pic = $request->picture;


       $imageName = $id . ".png";

       $path = public_path() . '\img\profile\\' . $imageName;

       $pathS = '\img\profile\\' . $imageName;
       Image::make(file_get_contents($pic))->save($path);

       $user->image = $pathS;
       $user->save();

      return response()->json(['message' => "success"], 202);
     }
    public function update(Request $request)
    {
        //
        $request->validate([
            'name' => 'required| max:50',
            'lastname' => 'required| max:50',
            'email' => 'required|max:50',
            'password' => 'confirmed',
            'roles' => 'required',
        ]);

        $id = $request->id;
        $name = $request->name;
        $lastname = $request->lastname;
        $username = strtolower($request->username);
        $email = strtolower($request->email);
        if($request->password != ''){
            $password = bcrypt($request->password);
        }
        $roles = $request->roles;

        $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

        $user = User::Find($id);

        $user->name = $fullname;
        $user->email = $request->email;
        if($request->password != ''){
            $user->password= $request->password;
        }
        $user->save();


        $user->roles()->detach();

        foreach($roles as $role){
            $user->roles()->attach($role);
        }

        $user->clients()->detach();

        if(isset($request->client)){
            $client = $request->client;
            $user->clients()->attach($client);
        }

        return response()->json(['message' => "success"], 202);
    }

    public function updateProfile(Request $request)
    {
        //
        $request->validate([
            'name' => 'required| max:50',
            'lastname' => 'required| max:50',
            'email' => 'required|max:50',
            'password' => 'confirmed',
        ]);

        $id = $request->id;
        $name = $request->name;
        $lastname = $request->lastname;
        $email = strtolower($request->email);

        if($request->password != ''){
            $password = bcrypt($request->password);
        }

        $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

        $user = User::Find($id);

        $user->name = $fullname;
        $user->username = $request->username;
        $user->email = $request->email;

        if($request->password != ''){
            $user->password= $request->password;
        }

        $user->save();

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
