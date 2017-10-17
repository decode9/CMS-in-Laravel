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
                <img src="{{url('/')}}/img/krypto.png" width="auto" height="auto" alt="">
                <div class="menuFront">
                    <ul class="menuHeader">
                        <li>Home</li>
                        <li>Enterprise</li>
                        <li>Packages</li>
                        <li>News</li>
                        <li>Contacts</li>
                    </ul>
                </div>
            </header>
        </div>
        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('js/mainFront.js') }}"></script>
</body>
</html>
