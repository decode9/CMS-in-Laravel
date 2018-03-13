@extends('layouts.backend')
<style media="screen">
body{
    font-family: sans-serif !important;
}
</style>
@section('content')
    <div class="col-sm-12">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading text-center">
            <div class="row">
              <div class="col-sm-7">
                <h4>Select Client</h4>
              </div>
              <div class="col-sm-5">
                  <form id="form_client_search" class="form_search">
                      <div class="input-group">
                          <input id="search_client_value" type="text" class="form-control" placeholder="Search Client">
                          <span class="input-group-btn">
                              <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                          </span>
                      </div><!-- /input-group -->
                  </form>
              </div>
            </div>
          </div>
                <div class="panel-body">
                  <div class="col-sm-12 table-responsive" id="list">
                      <table id="table_client" class="table table-striped table-hover">
                          <thead class="thead-default">
                              <tr>
                                  <th id="table_client_header_name" style="cursor: pointer;">Name</th>
                                  <th id="table_client_header_email" style="cursor: pointer;">Email</th>
                                  <th id="table_client_header_initial" style="cursor: pointer;">Initial Invest</th>
                                  <th>Options</th>
                              </tr>
                          </thead>
                          <tfoot>
                              <tr>
                                  <th colspan="1" id="client_page">
                                    <div class="form-group" style='width:70px'>
                                      <select id="result_client_page" class='form-control'>
                                          <option value="5">5</option>
                                          <option value="10" selected="selected">10</option>
                                      </select>
                                    </div>
                                  </th>
                                  <th id="table_client_pagination" class="text-right" colspan="3"></th>
                              </tr>
                          </tfoot>
                          <tbody id="table_client_content">
                          </tbody>
                      </table>
                  </div>
                </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="panel panel-default">
                <div class="panel-heading">
                  <div class="row">
                    <div class="col-sm-2 text-center">
                      <h4>Balance</h4>
                    </div>
                    <div class="col-sm-10 text-left">
                        <h4>Total USD: <span id="usdtotal"></span> / BTC: <span id="btctotal"></span></h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body">
                  <div class="col-sm-4">
                    <div class="row">
                      <div class="col-sm-3 text-center">
                        <h5>Currencies</h5>
                      </div>
                      <div class="col-sm-9">
                        <form id="form_balance_currency_search" class="form_search">
                            <div class="input-group">
                                <input id="search_balance_currency_value" type="text" class="small form-control" placeholder="Search Currency">
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                </span>
                            </div><!-- /input-group -->
                        </form>
                      </div>
                    </div>
                    <div class="row">
                      <div class="tab-pane active table-responsive" id="list">
                          <table id="table_balance_currency" class="table table-striped table-hover">
                              <thead class="thead-default">
                                  <tr class="small">
                                      <th id="table_balance_currency_header_symbol" style="cursor: pointer;">Symbol</th>
                                      <th id="table_balance_currency_header_amount" style="cursor: pointer;">Amount</th>
                                      <th id="table_balance_currency_header_equivalent" style="cursor: pointer;">USD Equivalent</th>
                                  </tr>
                              </thead>
                              <tfoot>
                                  <tr class="small">
                                      <th colspan="1" id="balance_currency_page">
                                        <div class="form-group" style="width: 70px;">
                                          <select id="result_balance_currency_page" class="form-control">
                                              <option value="5" selected="selected">5</option>
                                          </select>
                                        </div>
                                      </th>
                                      <th id="table_balance_currency_pagination" class="text-right" colspan="2"></th>
                                  </tr>
                              </tfoot>
                              <tbody class="small" id="table_balance_currency_content">
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="row">
                      <div class="col-sm-4 text-center">
                        <h5>CryptoCurrencies</h5>
                      </div>
                      <div class="col-sm-8">
                        <form id="form_balance_crypto_search" class="form_search">
                            <div class="input-group">
                                <input id="search_balance_crypto_value" type="text" class="small form-control" placeholder="Search CryptoCurrency">
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                </span>
                            </div><!-- /input-group -->
                        </form>
                      </div>
                    </div>
                    <div class="row">
                      <div class="tab-pane active table-responsive" id="list">
                          <table id="table_balance_crypto" class="table table-striped table-hover">
                              <thead class="thead-default">
                                  <tr class="small">
                                      <th id="table_balance_crypto_header_symbol" style="cursor: pointer;">Symbol</th>
                                      <th id="table_balance_crypto_header_amount" style="cursor: pointer;">Amount</th>
                                      <th id="table_balance_crypto_header_Equivalent" style="cursor: pointer;">USD Equivalent</th>
                                  </tr>
                              </thead>
                              <tfoot>
                                  <tr class="small">
                                      <th colspan="1" id="balance_crypto_page">
                                        <div class="form-group" style="width:70px;">
                                          <select id="result_balance_crypto_page" class="form-control">
                                              <option value="5" selected="selected">5</option>
                                          </select>
                                        </div>
                                      </th>
                                      <th id="table_balance_crypto_pagination" class="text-right" colspan="2"></th>
                                  </tr>
                              </tfoot>
                              <tbody class="small" id="table_balance_crypto_content">
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="row">
                      <div class="col-sm-3 text-center">
                        <h5>Token</h5>
                      </div>
                      <div class="col-sm-9">
                        <form id="form_balance_token_search" class="form_search">
                            <div class="input-group">
                                <input id="search_balance_token_value" type="text" class="small form-control" placeholder="Search Token">
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                </span>
                            </div><!-- /input-group -->
                        </form>
                      </div>
                    </div>
                    <div class="row">
                      <div class="tab-pane active table-responsive" id="list">
                          <table id="table_balance_token" class="table table-striped table-hover">
                              <thead class="thead-default">
                                  <tr class="small">
                                      <th id="table_balance_token_header_symbol" style="cursor: pointer;">Symbol</th>
                                      <th id="table_balance_token_header_amount" style="cursor: pointer;">Amount</th>
                                      <th id="table_balance_token_header_Equivalent" style="cursor: pointer;">USD Equivalent</th>
                                  </tr>
                              </thead>
                              <tfoot>
                                  <tr class="small">
                                      <th colspan="1" id="balance_token_page">
                                        <div class="form-group" style="width:70px;">
                                          <select id="result_balance_token_page" class="form-control">
                                              <option value="5" selected="selected">5</option>
                                          </select>
                                        </div>
                                      </th>
                                      <th id="table_balance_token_pagination" class="text-right" colspan="2"></th>
                                  </tr>
                              </tfoot>
                              <tbody class="small" id="table_balance_token_content">
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="clientMod" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
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
  <div class="modal fade" id="clientAlertMod" role="dialog">
  <div class="modal-dialog modal-sm">

    <!-- Modal content-->
    <div class="modal-content content-alert">
        <div class="alert" style="margin: 0px;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
    </div>

  </div>

  </div>
@endsection
