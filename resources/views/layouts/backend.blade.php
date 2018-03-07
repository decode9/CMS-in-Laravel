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
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/mainBack.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="{{ url('/') }}/vendor/font-awesome/css/font-awesome.min.css">

                <script src="{{ asset('js/app.js') }}"></script>
</head>
<body>
        <div id="content">
            <div id="leftContent">
                <div id="menuToggle">
                    <i class="fa fa-navicon"></i>
                </div>
                <div id="mainLogo">
                    <a href="{{ route('home') }}"><img src="{{ url('/') }}/img/Logoblanco.png" width="100" alt="" height="auto"></a>
                </div>
                <div id="userLog">
                    <ul class="userAction">
                        <!-- Authentication Links -->
                        @guest
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="menuItem menuLogin">
                                <i class="fa fa-user-circle"></i> <p>{{ Auth::user()->name }}</p>
                                <ul class="submenuItem" id="userSubItem" style ="display: none;">
                                    <li>
                                        <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endguest
                    </ul>
                </div>
                <div id="menuBack">
                    <ul class="menuAction">
                        @if(Auth::User()->getCredential(100))
                        <a href="{{route('users')}}"><li class="menuItem menuUser"><i class="fa fa-address-book"></i> <p>Users</p></li></a>
                        @endif
                        @if(Auth::User()->getCredential(150))
                        <a href="{{route('currencies')}}"><li class="menuItem menuCurrencies"><i class="fa fa-money"></i> <p>Currencies</p></li></a>
                        @endif
                        @if(Auth::User()->getCredential(150))
                        <a href="{{route('funds')}}"><li class="menuItem menuFunds">
                            <i class="fa fa-money"></i><p>Funds</p>
                        </li></a>
                        @endif
                        <!--
                        @if(Auth::User()->getCredential(200))
                        <a href=""><li class="menuItem menuOrders"><i class="fa fa-list"></i> <p>Orders</p>
                        </li></a>
                        @endif
                          -->
                          @if(Auth::User()->getCredential(250))
                          <a href="{{route('newsletter')}}"><li class="menuItem menuClients"><i class="fa fa-address-book"></i> <p>Newsletter</p>
                          </li></a>
                          @endif
                        @if(Auth::User()->getCredential(250))
                        <a href="{{route('clients')}}"><li class="menuItem menuClients"><i class="fa fa-address-book"></i> <p>Clients</p>
                        </li></a>
                        @endif

                        <li class="menuItem menuPost"><i class="fa fa-pencil-square-o "></i> <p>Posts</p>
                            <ul class="submenuItem" style ="display: none;">
                                <a href="{{route('create.news')}}"><li>Create Post</li></a>
                                <a href="{{route('news')}}"><li>List Posts</li></a>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="rightContent">
                  @yield('content')
            </div>
        </div>
        <!-- Scripts -->
        <script src="{{ url('/') }}/vendor/Chart.js"></script>
        <script src="{{ url('/') }}/vendor/validator/jquery.validate.js"></script>
        <script src="{{ asset('js/mainbackEnd.js') }}"></script>

</body>
</html>
