@extends('layouts.backend')

@section('content')
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-alternative">

                    <div class="panel-heading">User Profile</div>
                    <div class="panel-body">
                      <div class="col-sm-4 text-center">
                        <div class="col-sm-12 profilePic" style="height:150px">
                          <img id="profilePic" src="" width="auto" height="100%" alt="">
                        </div>
                        <button type="button" class="btn btn-alternative btn-photo" data-toggle="modal" data-target="#profileMod" name="button">Upload Photo</button>
                      </div>
                      <div class="col-sm-8 basicInfo">
                        <h4>Basic Information</h4>

                        <p>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="name"></span></p>
                        <p>Lastname: &nbsp;&nbsp;<span id="lastname"></span></p>
                        <p>Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="title"></span></p>
                        <p>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="email"></span></p>

                      </div>
                    </div>

            </div>
        </div>
    </div>
    <div class="modal fade" id="profileMod" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content modal-alternative">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"></h4>
        </div>
        <div class="modal-body">

        </div>
        <div class="modal-footer">

        </div>
      </div>

    </div>
  </div>
    <div class="modal fade" id="profileAlertMod" role="dialog">
    <div class="modal-dialog modal-sm">

      <!-- Modal content-->
      <div class="modal-content modal-alternative content-alert">
          <div class="alert" style="margin: 0px;">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <p class="text-alert"></p>
          </div>
      </div>

    </div>

  </div>
@endsection
