<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fund extends Model
{
    //
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $guarded = ['bs_amount', 'dollar_amount', 'btc_amount'];

    public function user(){
        $this->belongsTo('App\User');
    }

    public function currency(){
        $this->belongsTo('App\Currency');
    }
}
