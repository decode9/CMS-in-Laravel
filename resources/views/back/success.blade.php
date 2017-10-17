@extends('layouts.backend')

@section('content')
    <div class="responseBox">
        <div class="responseText">
            {{$response}}
        </div>
        <div class="Responsebutton">
            <a href="{{$url}}"><button type="button" name="return">Return</button></a> <a href="{{route('home')}}"><button type="button" name="return">HomePage</button></a>
        </div>
    </div>
@endsection
