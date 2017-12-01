<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FundOrder extends Model
{
    //

    public function outCurrencyOrder(){
        return $this->belongsTo('App\Currency', 'out_currency');
    }

    public function inCurrencyOrder(){
        return $this->belongsTo('App\Currency', 'in_currency');
    }
    public function user(){
        return $this->belongsTo('App\User');
    }
}
