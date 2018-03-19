@extends('layouts.backend')
<style media="screen">
body{
    font-family: sans-serif !important;
}

</style>
@section('content')
    <div class="col-sm-12">
      <div class="panel panel-alternative">
              <div class="panel-heading text-center">
                <div class="row">
                  <div class="col-sm-4">
                    <h4>Users</h4>
                  </div>
                  <div class="col-sm-8 float-right">
                    <div class="col-sm-10">
                        <form id="form_user_search" class="form_search">
                            <div class="input-group">
                                <input id="search_user_value" type="text" class="form-control" placeholder="Search User">
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-alternative" value="Go!"><span class="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div><!-- /input-group -->
                        </form>
                    </div>
                    <div class="col-sm-2">
                      <button type="button" class="btn btn-alternative btn-create" data-toggle="modal" data-target="#userMod" value="Go!"><i id="new_icon" class="fa fa-user" aria-hidden="true"> Create User</i></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel-body">
                <div class="col-sm-12 table-responsive active" id="list">
                    <table id="table_user" class="table table-striped table-hover">
                        <thead class="thead-default">
                            <tr>
                                <th id="table_user_header_name" style="cursor: pointer;">Name</th>
                                <th id="table_user_header_username" style="cursor: pointer;">Username</th>
                                <th id="table_user_header_email" style="cursor: pointer;">Email</th>
                                <th id="table_user_header_roles" style="cursor: pointer;">Roles</th>
                                <th id="table_user_header_date" style="cursor: pointer;">Created</th>
                                <th id="table_user_header_update" style="cursor: pointer;">Last Modified</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="3" id="user_page">
                                    <div class="form-group" style="width:70px;">
                                        <select id="result_user_page" class="form-control">
                                            <option value="5">5</option>
                                            <option value="10" selected="selected" >10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                        </select>
                                    </div>
                                </th>
                                <th id="table_user_pagination" class="text-right" colspan="4"></th>
                            </tr>
                        </tfoot>
                        <tbody id="table_user_content">
                        </tbody>
                    </table>
                </div>
              </div>
      </div>
    </div>
    <div class="modal fade" id="userMod" role="dialog">
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
  <div class="modal fade" id="userAlertMod" role="dialog">
  <div class="modal-dialog modal-sm">

    <!-- Modal content-->
    <div class="modal-content modal-alternative content-alert">
        <div class="alert" style="margin: 0px;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
    </div>

  </div>

  </div>
@endsection
