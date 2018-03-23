@extends('layouts.frontend')
@section('content')
    <div class="welcome">
            <div class="image">
                <img src="/img/krypto.png"  width="100%" height="auto"alt="">
            </div>
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
