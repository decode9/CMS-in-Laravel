<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use App;
use App\User;

class PermisionUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $permition)
    {
        $user = $request->get('user');
        if($user == null || $user == 0){
            return response()->json(['error' => 'Access Denied 1'], 404);
        }

        $role = $user->getRole();

        if(!$role){
            return response()->json(['error' => 'Access Denied 2'], 404);
        }
        $denied = false;
        if(is_array($role)){
            foreach ($role as $r) {
                foreach ($r->credentials()->get() as $credential) {
                    if($credential->code == $permition){
                        $denied = true;
                    }
                }
            }
        }else{
            foreach ($role->credentials()->get() as $credential) {
                if($credential->code == $permition){
                    $denied = true;
                }
            }
        }
        if(!$denied){
            return response()->json(['error' => 'Access Denied 4'], 404);
        }

        return $next($request);
    }
}
