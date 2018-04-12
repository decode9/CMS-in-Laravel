<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    //
    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public function currency(){
        return $this->belongsTo('App\Currency', 'currency_id');
    }


    public function account(){
        return $this->belongsTo('App\Account');
    }

}
