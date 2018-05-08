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
        <link href="{{ asset('css/mainFront.css') }}" rel="stylesheet">
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
                      @endguest
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row content">
              <nav class="navbar navbar-inverse hidden-xs navBack">
                <div class="container-fluid" style="margin-bottom:0px;">
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
              <div class="linePrices">
    			<div class="mover-1">

    			</div>
		      </div>
              <div class="page">
                  @yield('content')
              </div>
          </div>
      </div>
    </body>
    <script src="{{ url('/') }}/js/jquery.min.js"></script>
    <script src="{{ url('/') }}/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="{{ asset('js/mainFront.js') }}"></script>
</html>
