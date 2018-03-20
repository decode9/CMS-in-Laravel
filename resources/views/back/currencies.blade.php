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
                    <h4>Currencies</h4>
                  </div>
                  <div class="col-sm-8 float-right">
                    <div class="col-sm-9">
                      <form id="form_currency_search" class="form_search">
                          <div class="input-group">
                              <input id="search_currency_value" type="text" class="form-control" placeholder="Search Currency">
                              <span class="input-group-btn">
                                  <button type="submit" class="btn btn-alternative" value="Go!"><span class="glyphicon glyphicon-search"></span></button>
                              </span>
                          </div><!-- /input-group -->
                      </form>
                    </div>
                    <div class="col-sm-3">
                      <button type="button" class="btn btn-alternative btn-create-Cu" data-toggle="modal" data-target="#currencyMod" value="Go!"><i id="new_icon" class="fa fa-currency" aria-hidden="true">Create Currency</i></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel-body">
                <div class="col-sm-12 table-responsive" id="list">
                    <table id="table_currency" class="table table-hover">
                        <thead class="thead-default">
                            <tr>
                                <th id="table_currency_header_name" style="cursor: pointer;">Name</th>
                                <th id="table_currency_header_symbol" style="cursor: pointer;">Symbol</th>
                                <th id="table_currency_header_type" style="cursor: pointer;">Type</th>
                                <th id="table_currency_header_type" style="cursor: pointer;">Value</th>
                                <th id="table_currency_header_date" style="cursor: pointer;">Created</th>
                                <th id="table_currency_header_update" style="cursor: pointer;">Last Modified</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="3" id="currency_page">
                                    <div class="form-group" style="width:70px;">
                                        <select id="result_currency_page" class="form-control">
                                            <option value="5">5</option>
                                            <option value="10" selected="selected">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                        </select>
                                    </div>
                                </th>
                                <th id="table_currency_pagination" class="text-right" colspan="4"></th>
                            </tr>
                        </tfoot>
                        <tbody id="table_currency_content">
                        </tbody>
                    </table>
                </div>
              </div>
      </div>

    </div>
    <div class="modal fade" id="currencyMod" role="dialog">
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
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>

  </div>
  <div class="modal fade" id="currencyAlertMod" role="dialog">
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
