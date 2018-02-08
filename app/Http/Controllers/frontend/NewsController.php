<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Post;


class NewsController extends Controller
{
    public function index()
    {
        //
        $posts = Post::all();

        return view('front.news', ['posts' => $posts]);
    }

    public function show($id)
    {
        $post = Post::find($id);

        return view('front.notice', ['post' => $post]);
    }
}
