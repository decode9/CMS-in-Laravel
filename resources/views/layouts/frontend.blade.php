<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Krypto Group') }}</title>

        <!-- Styles -->
        <link href="{{ asset('css/mainFront.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="{{ url('/') }}/vendor/font-awesome/css/font-awesome.min.css">
</head>
<body>
        <div id="content">
            <header>
                <div class="mainLogoFront">
                    <a href="{{route('index')}}"><img src="{{url('/')}}/img/krypto.png" width="357" height="auto" alt=""></a>
                </div>
                <div class="menuFront">
                    <ul class="menuHeader">
                        <li>Home</li>
                        <li>Enterprise</li>
                        <li>Packages</li>
                        <a href=""><li>News</li></a>
                        <li>Contacts</li>
                    </ul>
                </div>
                <div class="userAction">
                    @guest
                        <ul class="menuLogin">
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        </ul>
                    @else
                        <ul class="menuUser">
                            <li class="menuItem">
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
                        </ul>
                    @endguest
                </div>
            </header>
            <div class="page">
                @yield('content')
            </div>
        </div>
        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('js/mainFront.js') }}"></script>
</body>
</html>
