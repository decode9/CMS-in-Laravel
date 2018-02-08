@extends('layouts.frontend')

@section('content')
    <div class="news">
        @foreach($posts as $post)
            <div class="newsContainer">
                <img src="{{$post->picture_path}}" alt="" width="" height="" />
                <h2>{{$post->name}}</h2>
                <div class="textPreviewNews">
                    <p>{{$post->content}}</p>
                </div>
                <div class="buttonReview">
                    <button type="button">See More</button>
                </div>
            </div>
        @endforeach
    </div>
@endsection
