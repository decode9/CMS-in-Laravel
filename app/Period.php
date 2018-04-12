<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    //
    public function funds(){
        return $this->hasMany('App\Fund');
    }


    public function fundOrders(){
        return $this->hasMany('App\FundOrder');
    }

    public function users(){
        return $this->belongsToMany('App\User');
    }
}
