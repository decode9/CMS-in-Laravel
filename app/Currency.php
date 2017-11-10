<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    //
    public function funds(){
        $this->hasMany('App\Fund');
    }

    public function outFundTrans(){
        $this->hasMany('App\FundOrder', 'out_currency');
    }

    public function inFundTrans(){
        $this->hasMany('App\FundOrder', 'in_currency');
    }
}
