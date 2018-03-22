<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="{{ url('/') }}/vendor/bootstrap/css/bootstrap.min.css">
    <link href="{{ asset('css/mainBack.css') }}" rel="stylesheet">
  </head>
  <body>
    <div class="col-sm-12 col-md-8 col-md-offset-2">
      <div class="col-sm-6">
        <div class="panel panel-alternative">
          <div class="panel-heading">
            <h4>Welcome to LatamBlock</h4>
          </div>
          <div class="panel-body">
            <p>Your user has been created in our system, to enter the system go to <a href="www.latamblock.io">www.latamblock.io</a></p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="panel panel-alternative">
          <div class="panel-heading">
            <h4>Your user Information is:</h4>
          </div>
          <div class="panel-body">
            <p>username: {{ $data['email']}}</p>
            <p>password: {{ $data['password']}}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
