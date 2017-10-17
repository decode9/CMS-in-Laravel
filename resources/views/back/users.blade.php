@extends('layouts.backend')

@section('content')
    <div class="backTitle">
        <h2>Users</h2>
    </div>
    <div class="TableInfo">
        <table class="backTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Last Modified</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                    <tr>
                        <td>{{$user->name}}</td>
                        <td>{{$user->username}}</td>
                        <td>{{$user->email}}</td>
                        <td>{{$user->updated_at}}</td>
                        <td><a href="{{route('edit.user', $user->id)}}"><button type="button">Edit</button></a><br/><a href="{{route('destroy.user', $user->id)}}"><button>Delete</button></a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
