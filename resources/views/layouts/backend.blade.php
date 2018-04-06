<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'LatamBlock') }}</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{ url('/') }}/vendor/bootstrap/css/bootstrap.min.css">

        <link href="{{ asset('css/mainBack.css') }}" rel="stylesheet">

                <style media="screen">
                    /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
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

                  @guest
                  <li><a href="{{ route('login') }}">Login</a></li>
                  @else
                  <li><a href="{{ route('home') }}"><span class="glyphicon glyphicon-home"></span></a></li>
                  <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-user"></span> {{ Auth::user()->name }}
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                          <span class="glyphicon glyphicon-log-out"></span> Logout
                        </a>
                        <form class="logout-form" id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                          {{ csrf_field() }}
                        </form>
                      </li>
                      <li class="listprofile">
                        <a href="{{ route('profile') }}">Profile</a>
                      </li>
                    </ul>
                  </li>
                  @if(Auth::User()->getCredential(100))
                  <li class="listuser">
                    <a href="{{route('users')}}">
                      <span class="glyphicon glyphicon-user"></span> Users
                    </a>
                  </li>
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
                  @endguest
                </ul>
            </div>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row content">
          <nav class="navbar navbar-inverse hidden-xs navBack">
            <div class="container-fluid">
              <div class="navbar-header">
              </div>
              <ul class="nav navbar-nav navbar-right">
                @guest
                <li><a href="{{ route('login') }}">Login</a></li>
                @else
                <li><a href="{{ route('home') }}"><span class="glyphicon glyphicon-home" style='font-size:30px;'></span></a></li>
                <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class=""><img class="imageIcon" src="{{ url('/') }}/img/icons/user.png" width="32" alt="" height="auto"></span> {{ Auth::user()->name }}
                    <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <span class="glyphicon glyphicon-log-out"></span> Logout
                      </a>
                    </li>
                    <li class="listprofile">
                      <a href="{{ route('profile') }}"><span class="glyphicon glyphicon-user"> </span> Profile</a>
                    </li>
                  </ul>
                </li>
                @endguest

              </ul>
            </div>
          </nav>
          @guest
          <div class="col-sm-12 col-md-12 col-lg-12" id="rightContent">
              @yield('content')
          </div>
          @else
          <div class="col-sm-3 col-md-2 col-lg-2 sidenav hidden-xs">

              <ul class="nav nav-pills nav-stacked sub-nav">
                  @if(Auth::User()->getCredential(100))
                  <li class="list listuser">
                    <a href="{{route('users')}}">
                      <img src="{{ url('/') }}/img/icons/users.png" width="32" alt="" height="auto">
                      <p>Users</p>
                    </a>
                  </li>
                  @endif
                  @if(Auth::User()->getCredential(150))
                  <li class="list listcurrency">
                    <a href="{{route('currencies')}}">
                      <img src="{{ url('/') }}/img/icons/currencies.png" width="32" alt="" height="auto">
                      <p>Currencies</p>
                    </a>
                  </li>
                  @endif
                  @if(Auth::User()->getCredential(150))
                  <li class="list listfund">
                    <a href="{{route('funds')}}">
                      <img src="{{ url('/') }}/img/icons/funds.png" width="auto" alt="" height="32">
                      <p>Funds</p>
                    </a>
                  </li>
                  @endif
                  @if(Auth::User()->getCredential(250))
                  <li class="list listnews">
                    <a href="{{route('newsletter')}}">
                      <img src="{{ url('/') }}/img/icons/newsletter.png" width="32" alt="" height="auto">
                      <p>Newsletter</p>
                    </a>
                  </li>
                  @endif
                  @if(Auth::User()->getCredential(250))
                  <li class="list listclient">
                    <a href="{{route('clients')}}">
                      <img src="{{ url('/') }}/img/icons/client-company.png" width="auto" alt="" height="32">
                      <p>Clients</p>
                    </a>
                  </li>
                  @endif
              </ul><br>
          </div>
          <br>
          <div class="col-sm-9 col-md-10 col-lg-10" id="rightContent">
              @yield('content')
          </div>
          @endguest

        </div>
        <footer>
          <div class="col-sm-12 float-right">
            <div class="col-sm-6">
              <p>This system is in test, if you see a problem please contact us through postmaster@krypto.finance</p>
            </div>
            <div class="col-sm-6">
              <p>Copyright (c) 2018 Copyright KryptoGroup All Rights Reserved.</p>
            </div>
          </div>
        </footer>
    </div>
    <!-- Scripts -->
    <script src="{{ url('/') }}/js/jquery.min.js"></script>
    <script src="{{ url('/') }}/js/cropit.js"></script>
    <script src="{{ url('/') }}/vendor/Chart.js"></script>
    <script src="{{ url('/') }}/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="{{ url('/') }}/vendor/validator/jquery.validate.js"></script>
    <script src="{{ url('/') }}/vendor/validator/additional-methods.min.js"></script>

    <script src="{{ asset('js/mainbackEnd.js') }}"></script>
</body>
</html>
