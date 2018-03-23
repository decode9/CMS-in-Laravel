@extends('layouts.frontend')
@section('content')
    <div class="welcome">
            <h1>Welcome To</h1>
            <h2>Fundus Valer</h2>
            @guest
            <div class="btn btn-alternative">
                <a href="{{route('login')}}">Log In</a>
            </div>
            @else
            <div class="btn btn-alternative">
                <a href="{{route('home')}}">Enter</a>
            </div>
            @endguest
    </div>
@endsection
