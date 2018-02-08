<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    //
    protected $table = 'currencies';
    public function funds(){
        return $this->hasMany('App\Fund');
    }

    public function outFundTrans(){
        return $this->hasMany('App\FundOrder', 'out_currency');
    }

    public function inFundTrans(){
        return $this->hasMany('App\FundOrder', 'in_currency');
    }
}
