<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Post;


class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $posts = Post::all();

        return view('back.posts', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $edit = false;
        return view('back.newpost', ['edit' => $edit]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'picture' => 'required|image',
            'name' => 'required|max:50',
            'content' => 'required'
        ]);

        $name = str_replace(" ", "-", $request->name);

        $imageName = $name . '.' . $request->file('picture')->getClientOriginalExtension();

        $request->file('picture')->move( public_path() . '/img/news/', $imageName);

        $path = '/public/img/news/' . $imageName;

        $user = Auth::user();

        $post = new Post;

        $post->name = $request->name;
        $post->content = $request->content;
        $post->picture_path = $path;

        $post->user()->associate($user);

        $post->save();

        $url = url('/') . '/news/new';

        return view('back.success',['url' => $url, 'response' => 'Congratulations the news as been created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $post = Post::find($id);
        $edit = true;
        return view('back.newpost',['post' => $post, 'edit' => $edit]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'name' => 'required| max:50',
            'email' => 'required|max:50'
        ]);


        $post = Post::find($id);

        $user->name = $request->name;
        $user->email = $request->email;
        if(isset($request->password)){
            $user->password= $request->password;
        }
        $user->save();

        $url = url('/') . '/news';

        return view('back.success',['url' => $url, 'response' => 'Congratulations the news as been updated']);
    }
    /**
     * Remove the specified resource from storage.•••••••••
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $post = Post::find($id);

        $post->delete();
        $url = url('/') . '/news';
        return view('back.success',['url' => $url, 'response' => 'Congratulations the news as been deleted']);
    }
}
