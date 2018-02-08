<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    protected $fillable = [
        'name', 'content', 'picture_path',
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function getPicturePathAttribute($value){
        $url = url('/');
        $value = $url . $value;
        return $value;
    }
}
