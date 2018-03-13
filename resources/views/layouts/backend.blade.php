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
        <link rel="stylesheet" href="{{ url('/') }}/vendor/bootstrap/css/bootstrap.min.css">

        <link href="{{ asset('css/mainBack.css') }}" rel="stylesheet">

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
                  <a href="#"><span class="glyphicon glyphicon-user"></span> {{ Auth::user()->name }}</a>
                      <ul class="submenuItem nav nav-pills nav-stacked" id="userSubItem" style ="display: none;">
                          <li>
                              <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                  <span class="glyphicon glyphicon-log-out"></span> Logout
                              </a>
                              <form class="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                  {{ csrf_field() }}
                              </form>
                          </li>
                          <li class="listprofile"><a href="{{ route('profile') }}">Profile</a></li>
                      </ul>
                  </li>
                  @if(Auth::User()->getCredential(100))
                  <li class="listuser"><a href="{{route('users')}}"><span class="glyphicon glyphicon-user"></span> Users</a></li>
                  @endif
                  @if(Auth::User()->getCredential(150))
                  <li class="listcurrency"><a href="{{route('currencies')}}"><span class="glyphicon glyphicon-usd"></span> Currencies</a></li>
                  @endif
                  @if(Auth::User()->getCredential(150))
                  <li class="listfund"><a href="{{route('funds')}}"><span class="glyphicon glyphicon-bitcoin"></span> Funds</a></li>
                  @endif
                  @if(Auth::User()->getCredential(250))
                  <li class="listnews"><a href="{{route('newsletter')}}"><span class="glyphicon glyphicon-envelope"></span> Newsletter</a></li>
                  @endif
                  @if(Auth::User()->getCredential(250))
                  <li class="listclient"><a href="{{route('clients')}}"><span class="glyphicon glyphicon-list-alt"></span> Clients</a></li>
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
                    <a href="#"><span class="glyphicon glyphicon-user"></span> {{ Auth::user()->name }}</a>
                        <ul class="submenuItem nav nav-pills nav-stacked" id="userSubItem" style ="display: none;">
                            <li>
                                <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <span class="glyphicon glyphicon-log-out"></span> Logout
                                </a>
                                <form class="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                            <li class="listprofile"><a href="{{ route('profile') }}">Profile</a></li>
                        </ul>
                    </li>
                    @if(Auth::User()->getCredential(100))
                    <li class="listuser"><a href="{{route('users')}}"><span class="glyphicon glyphicon-user"></span> Users</a></li>
                    @endif
                    @if(Auth::User()->getCredential(150))
                    <li class="listcurrency"><a href="{{route('currencies')}}"><span class="glyphicon glyphicon-usd"></span> Currencies</a></li>
                    @endif
                    @if(Auth::User()->getCredential(150))
                    <li class="listfund"><a href="{{route('funds')}}"><span class="glyphicon glyphicon-bitcoin"></span> Funds</a></li>
                    @endif
                    @if(Auth::User()->getCredential(250))
                    <li class="listnews"><a href="{{route('newsletter')}}"><span class="glyphicon glyphicon-envelope"></span> Newsletter</a></li>
                    @endif
                    @if(Auth::User()->getCredential(250))
                    <li class="listclient"><a href="{{route('clients')}}"><span class="glyphicon glyphicon-list-alt"></span> Clients</a></li>
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
    <script src="{{ url('/') }}/js/jquery.min.js"></script>
    <script src="{{ url('/') }}/vendor/Chart.js"></script>
    <script src="{{ url('/') }}/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="{{ url('/') }}/vendor/validator/jquery.validate.js"></script>
    <script src="{{ url('/') }}/vendor/validator/additional-methods.min.js"></script>
    <script src="{{ asset('js/mainbackEnd.js') }}"></script>
</body>
</html>
