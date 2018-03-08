<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Styles -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="{{ asset('css/mainBack.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="{{ url('/') }}/vendor/font-awesome/css/font-awesome.min.css">

                <script src="{{ asset('js/app.js') }}"></script>
                <style media="screen">
                    /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
                    .row.content {height: auto;}

                    /* Set gray background color and 100% height */
                    .sidenav {
                      background-color: #f1f1f1;
                      height: 100%;
                    }

                    /* On small screens, set height to 'auto' for the grid */
                    @media screen and (max-width: 767px) {
                      .row.content {height: auto;}
                    }
                </style>
</head>
<body>
    <nav class="navbar navbar-inverse visible-xs">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="{{ route('home') }}"><img src="{{ url('/') }}/img/Logoblanco.png" width="100" alt="" height="auto"></a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="menuItem">
                        <i class="fa fa-user-circle"></i> {{ Auth::user()->name }}
                        <ul class="submenuItem" id="userSubItem" style ="display: none;">
                            <li>
                                <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Logout
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                            <a href="{{ route('profile') }}"><li>Profile</li></a>
                        </ul>
                    </li>
                    @if(Auth::User()->getCredential(100))
                    <a href="{{route('users')}}"><li><i class="fa fa-address-book"></i> Users</li></a>
                    @endif
                    @if(Auth::User()->getCredential(150))
                    <a href="{{route('currencies')}}"><li><i class="fa fa-money"></i> Currencies</li></a>
                    @endif
                    @if(Auth::User()->getCredential(150))
                    <a href="{{route('funds')}}"><li><i class="fa fa-money"></i> Funds</li></a>
                    @endif
                    @if(Auth::User()->getCredential(250))
                    <a href="{{route('newsletter')}}"><li><i class="fa fa-address-book"></i> Newsletter</li></a>
                    @endif
                    @if(Auth::User()->getCredential(250))
                    <a href="{{route('clients')}}"><li><i class="fa fa-address-book"></i> Clients</li></a>
                    @endif
                </ul>
            </div>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row content">
            <div class="col-sm-2 sidenav hidden-xs">
                <div id="mainLogo">
                    <a href="{{ route('home') }}"><img src="{{ url('/') }}/img/Logoblanco.png" width="100" alt="" height="auto"></a>
                </div>
                <ul class="nav nav-pills nav-stacked">
                    <li class="menuItem">
                        <i class="fa fa-user-circle"></i>{{ Auth::user()->name }}
                        <ul class="submenuItem nav nav-pills nav-stacked" id="userSubItem" style ="display: none;">
                            <li>
                                <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Logout
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                            <li id="listprofile"><a href="{{ route('profile') }}">Profile</a></li>
                        </ul>
                    </li>
                    @if(Auth::User()->getCredential(100))
                    <li id="listuser"><a href="{{route('users')}}"><i class="fa fa-address-book"></i> Users</a></li>
                    @endif
                    @if(Auth::User()->getCredential(150))
                    <li id="listcurrency"><a href="{{route('currencies')}}"><i class="fa fa-money"></i> Currencies</a></li>
                    @endif
                    @if(Auth::User()->getCredential(150))
                    <li id="listfund"><a href="{{route('funds')}}"><i class="fa fa-money"></i> Funds</a></li>
                    @endif
                    @if(Auth::User()->getCredential(250))
                    <li id="listnews"><a href="{{route('newsletter')}}"><i class="fa fa-address-book"></i> Newsletter</a></li>
                    @endif
                    @if(Auth::User()->getCredential(250))
                    <li id="listclient"><a href="{{route('clients')}}"><i class="fa fa-address-book"></i> Clients</a></li>
                    @endif
                </ul><br>
            </div>
            <br>
            <div class="col-sm-10" id="rightContent">
                @yield('content')
            </div>
        </div>
    </div>
    <!-- Scripts -->
    <script src="{{ url('/') }}/vendor/Chart.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="{{ url('/') }}/vendor/validator/jquery.validate.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
    <script src="{{ asset('js/mainbackEnd.js') }}"></script>
</body>
</html>
