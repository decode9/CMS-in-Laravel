@extends('layouts.backend')
<style media="screen">
body{
    font-family: sans-serif !important;
}
    .fundContainer{
        height: fit-content;
        width: 90%;
        margin: 0 auto;
    }
    .titleBalance{
            text-align: center;
    }
    .fundContainer h3{
        margin: 0;
    }

    #unconfirmed{
        float: left;
        width: 50%;
        text-align: center;
    }
    #confirmed{
        float: left;
        width: 50%;
        text-align: center;
    }
    #table_deposit{
        width: 90%;
        margin: 0 auto;
    }
    #table_deposit th{
        text-align: center;
    }
    .pagination{
        margin: 0 !important;
        cursor: pointer;
    }
    #deposit_page{
        text-align: left !important;
    }
    #table_deposit_pagination{
        text-align: right !important;
    }

    #table_withdraw{
        width: 90%;
        margin: 0 auto;
    }
    #table_withdraw th{
        text-align: center;
    }
    #withdraw_page{
        text-align: left !important;
    }
    #table_withdraw_pagination{
        text-align: right !important;
    }
    #addcount{
        float: right;
position: relative;
top: -30px;
    }
    #account{
        width: 90%;
    }
    .pages{
        margin: 0 2px;
    }
    .modal{
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    .modalContent {
        background-color: #fefefe;
        margin: 0;
        position: fixed;
        left: 33%;
        top: 30%;
        padding: 20px;
        border: 1px solid #888;
        width: 700px;
        box-shadow: 0px 0px 14px 1px black;
        border-radius: 10px;
    }
    .fundAction{
        height: 50px;
        float: left;
        text-align: center;
        width: 100%;
    }
    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
    .currenciesTable{
      border-left: 1px solid;
      border-right: 1px solid;
      width: 33%;
      height: 360px;
      margin: 0 auto;
      position: relative;
      display: block;
      float: left;
    }
    .currenciesTable table{
      text-align: center;
      font-size: 12px;
    }
    .currenciesTable input{
      font-size: 10px;
    }
</style>
@section('content')
    <div class="col-sm-12">
        <h3>Balance</h3>
        <div class="balanceTotal">
            <p>Total USD: <span id="usdtotal"></span> / BTC: <span id="btctotal"></span></p>
        </div>
        <div class="col-sm-4">
            <div class="tab-pane active table-responsive" id="list">
                <table id="table_balance_currency" class="table table-striped table-hover">
                    <thead class="thead-default">
                        <tr class="small">
                            <th colspan="1">Currencies</th>
                            @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                            <th colspan="3"><div class="col-sm-12">
                            @else
                            <th colspan="2"><div class="col-sm-12">
                            @endif
                                <form id="form_balance_currency_search" class="form_search">
                                    <div class="input-group">
                                        <input id="search_balance_currency_value" type="text" class="small form-control" placeholder="Search Currency">
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                        </span>
                                    </div><!-- /input-group -->
                                </form>
                            </div><!-- /.col-lg-6 --></th>
                        </tr>
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
        <div class="col-sm-4">
            <div class="tab-pane active table-responsive" id="list">
                <table id="table_balance_crypto" class="table table-striped table-hover">
                    <thead class="thead-default">
                        <tr class="small">
                            <th colspan="1">CryptoCurrencies</th>
                            @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                            <th colspan="3"><div class="col-sm-12">
                            @else
                            <th colspan="2"><div class="col-sm-12">
                            @endif
                                <form id="form_balance_crypto_search" class="form_search">
                                    <div class="input-group">
                                        <input id="search_balance_crypto_value" type="text" class="small form-control" placeholder="Search CryptoCurrency">
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                        </span>
                                    </div><!-- /input-group -->
                                </form>
                            </div><!-- /.col-lg-6 --></th>
                        </tr>
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
        <div class="col-sm-4">
            <div class="tab-pane active table-responsive" id="list">
                <table id="table_balance_token" class="table table-striped table-hover">
                    <thead class="thead-default">
                        <tr class="small">
                            <th colspan="1">Token</th>
                            @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                            <th colspan="3"><div class="col-sm-12">
                            @else
                            <th colspan="2"><div class="col-sm-12">
                            @endif
                                <form id="form_balance_token_search" class="form_search">
                                    <div class="input-group">
                                        <input id="search_balance_token_value" type="text" class="small form-control" placeholder="Search Token">
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                        </span>
                                    </div><!-- /input-group -->
                                </form>
                            </div><!-- /.col-lg-6 --></th>
                        </tr>
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
    <div class="col-sm-12">
        <div class="col-sm-12 table-responsive" id="list">
            <table id="table_transaction" class="table table-striped table-hover">
                <thead class="thead-default">
                    <tr>
                        <th colspan="4">Transactions</th>
                        <th colspan="6"><div class="col-sm-12">
                            <form id="form_transaction_search" class="form_search">
                                <div class="input-group">
                                    <input id="search_transaction_value" type="text" class="small form-control" placeholder="Search Transaction">
                                    <span class="input-group-btn">
                                        <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                    </span>
                                </div><!--/input-group-->
                            </form>
                        </div> <!--/.col-lg-6 --></th>
                    </tr>
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

        <div class="col-sm-12 table-responsive" id="list">
            <table id="table_pending_transaction" class="table table-responsive table-striped table-hover">
                <thead class="thead-default">
                    <tr>
                        <th colspan="4">Pending Transactions</th>
                        @if(Auth::User()->hasRole('20') || Auth::User()->hasRole('901'))
                        <th colspan="5"><div class="col-sm-12">
                        @else
                        <th colspan="4"><div class="col-sm-12">
                        @endif
                            <form id="form_pending_transaction_search" class="form_search">
                                <div class="input-group">
                                    <input id="search_pending_transaction_value" type="text" class="small form-control" placeholder="Search Pending Transaction">
                                    <span class="input-group-btn">
                                        <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                    </span>
                                </div><!--/input-group-->
                            </form>
                        </div> <!--/.col-lg-6--> </th>
                    </tr>
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
@endsection
