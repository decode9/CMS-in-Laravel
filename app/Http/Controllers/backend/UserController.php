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

class UserController extends Controller{

  //Execute if user is authenticated
  public function __construct(){

    $this->middleware('auth');

  }

  //List Users
  public function index(Request $request) {

    //Select Authenticated User
    $user = Auth::User();

    //Assign Variables
    $searchValue = $request->searchvalue;
    $page = $request->page;
    $resultPage = $request->resultPage;
    $orderBy = $request->orderBy;
    $orderDirection = $request->orderDirection;
    $total = 0;


    //Select Users
    $query = User::WhereNotIn('id', [$user->id]);

    //Search by
    if($searchValue != ''){

      $query->Where(function($query) use($searchValue){
        $query->Where('name', 'like', '%'.$searchValue.'%')
        ->orWhere('username', 'like', '%'.$searchValue.'%')
        ->orWhere('email', 'like', '%'.$searchValue.'%')
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

    //Get Users
    $users  =  $query->get();

    //Create Roles Array
    $roles = [];

    //Loop Users
    foreach($users as $user){

      //Get Role from user
      $role = $user->roles()->get();

      //Insert role in roles array
      array_push($roles, $role);

    }

    //Return Response in JSON Datatype
    return response()->json(['page' => $page, 'result' => $users,'total' => $total, 'roles' => $roles], 202);
  }

  //Get Roles for users
  public function userRoles(){

    //Select Roles
    $roles = Role::All();

    //Return Response in JSON dataType
    return response()->json(['data' => $roles], 202);
  }

  //Get User For Clients
  public function userClients(Request $request){

    //Assign Variables
    $rolid = $request->role;

    //Find Role
    $role = Role::find($rolid);

    //Get users with trader role
    $user = $role->users()->get();

    //Return Response In JSON DataType
    return response()->json(['data' => $user], 202);
  }

  //Create User
  public function store(Request $request){

    //Validate $request data
    $request->validate([
      'name' => 'required| max:50',
      'lastname' => 'required| max:50',
      'email' => 'required|unique:users|max:50',
      'password' => 'required|min:6|confirmed',
      'roles' => 'required',
    ]);

    //Assign Variables
    $name = $request->name;
    $lastname = $request->lastname;
    $username = strtolower($request->username);
    $email = strtolower($request->email);
    $password = bcrypt($request->password);
    $roles = $request->roles;

    //Create $data Variable for Email
    $data = ['email' => $email, 'password' => $request->password];

    //Get Currencies
    $currencies = Currency::All();

    //Order Full Name
    $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

    //Create New User
    $user = new User;
    $user->name = $fullname;
    $user->email = $request->email;
    $user->password= $password;
    $user->save();

    //Loop $roles
    foreach($roles as $role){

      //Attach roles to user
      $user->roles()->attach($role);

    }

    //Verify if user is client
    if(isset($request->client)){

      //Assign Variable
      $client = $request->client;

      //Attach client to user
      $user->clients()->attach($client);
    }

    //Mail To User
    Mail::to($email)->send(new newUser($data));

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }

  //Show User Profile
  public function show(Request $request){
    //Select Authenticated User
    $auth = Auth::User();

    //Select user with Role
    $user = User::Where('id', $auth->id)->with('roles:slug')->first();

    //Return Response in JSON DataType
    return response()->json(['result' => $user], 202);
  }

  //Profile Picture Update
  public function picture(Request $request){

    //Validate $request DataType
    $request->validate([
      'picture' => 'required',
      'id' => 'required',
    ]);

    //Assign Variables
    $id = $request->id;
    $pic = $request->picture;

    //Find User
    $user = User::find($id);

    //Verify if user has image
    if($user->image !== null){

      //Delete Image if exists
      Storage::delete(public_path() . '/' .$user->image);

    }

    //Declare Name Image
    $imageName = $id . ".png";

    //Declare image Path
    $path = base_path() . '/public/img/profile/' . $imageName;

    //Declare image Path for database
    $pathS = '/img/profile/' . $imageName;

    //Make image and save
    Image::make(file_get_contents($pic))->save($path);

    //Save Path in database
    $user->image = $pathS;
    $user->save();

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }

  //Update User
  public function update(Request $request){

    //Validate $request Data
    $request->validate([
      'name' => 'required| max:50',
      'lastname' => 'required| max:50',
      'email' => 'required|max:50',
      'password' => 'confirmed',
      'roles' => 'required',
    ]);

    //Assign Variables
    $id = $request->id;
    $name = $request->name;
    $lastname = $request->lastname;
    $username = strtolower($request->username);
    $email = strtolower($request->email);
    $roles = $request->roles;

    //Verify if Password is empty
    if($request->password != ''){
      $password = bcrypt($request->password);
    }

    //Order Fullname
    $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

    //Find User
    $user = User::Find($id);

    //Edit User
    $user->name = $fullname;
    $user->email = $request->email;

    //Verify if Password is empty
    if($request->password != ''){
      $user->password= $request->password;
    }

    //Save edit user
    $user->save();

    //Detach old roles
    $user->roles()->detach();

    //Loop Roles
    foreach($roles as $role){

      //Attach New Role
      $user->roles()->attach($role);

    }

    //Detach old Client
    $user->clients()->detach();

    //Verify if has client
    if(isset($request->client)){

      //Assign Variable
      $client = $request->client;

      //Attach new client
      $user->clients()->attach($client);
    }

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }

  //Update User Profile
  public function updateProfile(Request $request){

    //Validate $request Data
    $request->validate([
      'id' => 'required',
      'name' => 'required| max:50',
      'lastname' => 'required| max:50',
      'email' => 'required|max:50',
      'password' => 'confirmed',
    ]);

    //Assign Variables
    $id = $request->id;
    $name = $request->name;
    $lastname = $request->lastname;
    $email = strtolower($request->email);

    //Verify if password is empty
    if($request->password != ''){

      $password = bcrypt($request->password);

    }

    //Order FullName
    $fullname = ucfirst(strtolower($name)) . " " . ucfirst(strtolower($lastname));

    //Find User
    $user = User::Find($id);

    //Update User
    $user->name = $fullname;
    $user->email = $request->email;

    if($request->password != ''){

      $user->password= $request->password;

    }

    //Save User
    $user->save();

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }

  //Destroy User
  public function destroy(Request $request){

    //Assign Variables
    $id = $request->id;

    //Find User
    $user = User::find($id);

    //Detach Roles And Clients
    $user->roles()->detach();
    $user->clients()->detach();

    //Get User Funds
    $funds = $user->funds()->get();

    //Verify if exists Funds
    if($funds){

      //Loop Funds
      foreach($funds as $fund){

        //Select Fund
        $fd = App\Fund::find($fund->id);

        //Delete Fund
        $fd->delete();

      }
    }

    //Delete User
    $user->delete();

    //Return Response in JSON DataType
    return response()->json(['message' => "success"], 202);
  }
}
