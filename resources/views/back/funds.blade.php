@extends('layouts.backend')
<style media="screen">
body{
    font-family: sans-serif !important;
}
</style>
@section('content')
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
                                    @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                    <th>Option</th>
                                    @endif
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
                                    @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                    <th id="table_balance_currency_pagination" class="text-right" colspan="3"></th>
                                    @else
                                    <th id="table_balance_currency_pagination" class="text-right" colspan="2"></th>
                                    @endif
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
                                    @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                    <th>Option</th>
                                    @endif
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
                                    @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                    <th id="table_balance_crypto_pagination" class="text-right" colspan="3"></th>
                                    @else
                                    <th id="table_balance_crypto_pagination" class="text-right" colspan="2"></th>
                                    @endif
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
                                    @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                    <th>Option</th>
                                    @endif
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
                                    @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                    <th id="table_balance_token_pagination" class="text-right" colspan="3"></th>
                                    @else
                                    <th id="table_balance_token_pagination" class="text-right" colspan="2"></th>
                                    @endif
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
    <div class="col-sm-12">
      <div class="panel panel-default">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-sm-7 text-center">
                    <h4>Transactions</h4>
                  </div>
                  <div class="col-sm-5">
                    <form id="form_transaction_search" class="form_search">
                        <div class="input-group">
                            <input id="search_transaction_value" type="text" class="small form-control" placeholder="Search Transaction">
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                            </span>
                        </div><!--/input-group-->
                    </form>
                  </div>
                </div>
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table id="table_transaction" class="table table-striped table-hover">
                      <thead class="thead-default">
                          <tr>
                              <th id="table_transaction_header_currency_out" style="cursor: pointer;">Currency Out</th>
                              <th id="table_transaction_header_amount_out" style="cursor: pointer;">Amount Out</th>
                              <th id="table_transaction_header_rate" style="cursor: pointer;">Rate</th>
                              <th id="table_transaction_header_currency_in" style="cursor: pointer;">Currency In</th>
                              <th id="table_transaction_header_amount_in" style="cursor: pointer;">Amount In</th>
                              <th id="table_transaction_header_reference" style="cursor: pointer;">Reference</th>
                              <th id="table_transaction_header_date" style="cursor: pointer;">Date</th>
                              <th id="table_transaction_header_confirmed" style="cursor: pointer;">Confirmed</th>
                              <th id="table_transaction_header_status" style="cursor: pointer;">Status</th>
                              <th>Options</th>
                          </tr>
                      </thead>
                      <tfoot>
                          <tr>
                              <th colspan="4" id="transaction_page">
                                <div class="form-group" style="width:70px;">
                                  <select id="result_transaction_page" class="form-control">
                                      <option value="5">5</option>
                                      <option value="10" selected="selected" >10</option>
                                      <option value="20">20</option>
                                      <option value="50">50</option>
                                  </select>
                                </div>

                              </th>
                              <th id="table_transaction_pagination" class="text-right" colspan="6"></th>
                          </tr>
                      </tfoot>
                      <tbody id="table_transaction_content">
                      </tbody>
                  </table>
                </div>
              </div>
      </div>
      <div class="panel panel-default">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-sm-7 text-center">
                    <h4>Pending Transactions</h4>
                  </div>
                  <div class="col-sm-5">
                    <form id="form_pending_transaction_search" class="form_search">
                        <div class="input-group">
                            <input id="search_pending_transaction_value" type="text" class="small form-control" placeholder="Search Pending Transaction">
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                            </span>
                        </div><!--/input-group-->
                    </form>
                  </div>
                </div>
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                    <table id="table_pending_transaction" class="table table-responsive table-striped table-hover">
                        <thead class="thead-default">
                            <tr>
                                <th id="table_pending_transaction_header_currency_out" style="cursor: pointer;">Currency Out</th>
                                <th id="table_pending_transaction_header_amount_out" style="cursor: pointer;">Amount Out</th>
                                <th id="table_pending_transaction_header_rate" style="cursor: pointer;">Rate</th>
                                <th id="table_pending_transaction_header_currency_in" style="cursor: pointer;">Currency In</th>
                                <th id="table_pending_transaction_header_amount_in" style="cursor: pointer;">Amount In</th>
                                <th id="table_pending_transaction_header_reference" style="cursor: pointer;">Reference</th>
                                <th id="table_pending_transaction_header_date" style="cursor: pointer;">Date</th>
                                <th id="table_pending_transaction_header_status" style="cursor: pointer;">Status</th>
                                @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                <th>Options</th>
                                @endif
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="4" id="pending_transaction_page">
                                  <div class="form-group" style="width:70px;">
                                    <select id="result_pending_transaction_page" class="form-control">
                                        <option value="5">5</option>
                                        <option value="10" selected="selected" >10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                  </div>
                                </th>
                                @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                                <th id="table_pending_transaction_pagination" class="text-right" colspan="5"></th>
                                @else
                                <th id="table_pending_transaction_pagination" class="text-right" colspan="4"></th>
                                @endif
                            </tr>
                        </tfoot>
                        <tbody id="table_pending_transaction_content">
                        </tbody>
                    </table>
                </div>
              </div>
      </div>
        <!--
        <div class="tab-pane active" id="list">
            <table id="table_deposit" class="table table-responsive table-striped table-hover">
                <thead class="thead-default">
                    <tr>
                        <th colspan="4">Deposits</th>
                        <th colspan="3"><div class="col-lg-12">
                            <form id="form_deposit_search" class="form_search">
                                <div class="input-group">
                                    <input id="search_deposit_value" type="text" class="form-control" placeholder="Search Deposit">
                                    <span class="input-group-btn">
                                        <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                    </span>
                                </div>/input-group
                            </form>
                        </div> /.col-lg-6 </th>
                    </tr>
                    <tr>
                        <th id="table_deposit_header_currency" style="cursor: pointer;">Currency</th>
                        <th id="table_deposit_header_amount" style="cursor: pointer;">Amount</th>
                        <th id="table_deposit_header_reference" style="cursor: pointer;">Reference</th>
                        <th id="table_deposit_header_date" style="cursor: pointer;">Date</th>
                        <th id="table_deposit_header_confirmed" style="cursor: pointer;">Confirmed</th>
                        <th id="table_deposit_header_confirm_date" style="cursor: pointer;">Confirm Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="3" id="deposit_page">
                            <select id="result_deposit_page">
                                <option value="5">5</option>
                                <option value="10" selected="selected" >10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </th>
                        <th id="table_deposit_pagination" colspan="4"></th>
                    </tr>
                </tfoot>
                <tbody id="table_deposit_content">
                </tbody>
            </table>
        </div>

        <div class="tab-pane active" id="list">
            <table id="table_withdraw" class="table table-responsive table-striped table-hover">
                <thead class="thead-default">
                    <tr>
                        <th colspan="4">Withdraws</th>
                        <th colspan="3"><div class="col-lg-12">
                            <form id="form_withdraw_search" class="form_search">
                                <div class="input-group">
                                    <input id="search_withdraw_value" type="text" class="form-control" placeholder="Search Withdraw">
                                    <span class="input-group-btn">
                                        <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                    </span>
                                </div>/input-group
                            </form>
                        </div> /.col-lg-6 </th>
                    </tr>
                    <tr>
                        <th id="table_withdraw_header_currency" style="cursor: pointer;">Currency</th>
                        <th id="table_withdraw_header_amount" style="cursor: pointer;">Amount</th>
                        <th id="table_withdraw_header_reference" style="cursor: pointer;">Reference</th>
                        <th id="table_withdraw_header_date" style="cursor: pointer;">Date</th>
                        <th id="table_withdraw_header_confirmed" style="cursor: pointer;">Confirmed</th>
                        <th id="table_withdraw_header_confirm_date" style="cursor: pointer;">Confirm Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="3" id="withdraw_page">
                            <select id="result_withdraw_page">
                                <option value="5">5</option>
                                <option value="10" selected="selected" >10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </th>
                        <th id="table_withdraw_pagination" colspan="4"></th>
                    </tr>
                </tfoot>
                <tbody id="table_withdraw_content">
                </tbody>
            </table>
        </div>
    -->
    </div>
    <div class="modal fade" id="fundsMod" role="dialog">
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
  <div class="modal fade" id="fundsAlertMod" role="dialog">
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
