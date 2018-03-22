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
              <h4>Newsletters</h4>
            </div>
            <div class="col-sm-8 float-right">
              <div class="col-sm-12 col-md-8 col-lg-8">
                <form id="form_newsletter_search" class="form_search">
                    <div class="input-group">
                        <input id="search_newsletter_value" type="text" class="form-control" placeholder="Search Newsletter">
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-alternative" value="Go!"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                        </span>
                    </div><!-- /input-group -->
                </form>
              </div>
              <div class="col-sm-12 col-md-5 col-lg-4 text-center">
                <button type="button" class="btn btn-alternative btn-create" data-toggle="modal" data-target="#newsMod" value="Go!">Create Newsletter</button>
              </div>
            </div>
          </div>
        </div>
              <div class="panel-body">
                <div class="col-sm-12 table-responsive" id="list">
                    <table id="table_newsletter" class="table table-hover">
                        <thead class="thead-default">
                            <tr>
                                <th id="table_newsletter_header_title" style="cursor: pointer;">Title</th>
                                <th id="table_newsletter_header_username" style="cursor: pointer;">created By</th>
                                <th id="table_newsletter_header_message" style="cursor: pointer;">Message</th>
                                <th id="table_newsletter_header_date" style="cursor: pointer;">Created</th>
                                <th id="table_newsletter_header_update" style="cursor: pointer;">Last Modified</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="3" id="newsletter_page">
                                  <div class="form-group" style="width:70px">
                                    <select class='form-control' id="result_newsletter_page">
                                        <option value="5">5</option>
                                        <option value="10" selected="selected" >10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                  </div>
                                </th>
                                <th id="table_newsletter_pagination" class="text-right" colspan="3"></th>
                            </tr>
                        </tfoot>
                        <tbody id="table_newsletter_content">
                        </tbody>
                    </table>
                </div>
              </div>
      </div>
    </div>
    <div class="modal fade" id="newsMod" role="dialog">
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
  <div class="modal fade" id="newsAlertMod" role="dialog">
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
