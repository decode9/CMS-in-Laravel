<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function newsletter(){
        return $this->hasMany('App\Newsletter');
    }

    public function roles(){
        return $this->belongsToMany('App\Role');
    }

    public function accounts(){
        return $this->hasMany('App\Account');
    }

    public function balances(){
        return $this->hasMany('App\Balance');
    }

    public function funds(){
        return $this->hasMany('App\Fund');
    }
    public function clients(){
        return $this->belongsToMany('App\User', 'user_client', 'user_id', 'client_id');
    }

    public function getRole(){
        return $this->roles()->get();
    }

    public function getCredential($creN){
        $roles = $this->roles()->get();
        foreach($roles as $role){
            $credentials = $role->credentials()->get();
            foreach($credentials as $credential){
                if($credential->code == $creN){
                    return true;
                }
            }
        }
        return false;
    }

    public function hasRole($roleN){
        $roles = $this->roles()->get();
        foreach($roles as $role){
            if($role->code == $roleN){
                return true;
            }
        }
        return false;
    }

}
