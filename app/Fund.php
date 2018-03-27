<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fund extends Model
{
    //
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $guarded = ['amount'];

    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public function period(){
        return $this->belongsTo('App\Period', 'period_id');
    }

    public function currency(){
        return $this->belongsTo('App\Currency', 'currency_id');
    }

}
