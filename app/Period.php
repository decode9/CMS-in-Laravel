<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    //
    public function funds(){
        return $this->hasMany('App\Fund');
    }
}
