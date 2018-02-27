@extends('layouts.backend')
<style media="screen">
body{
    font-family: sans-serif !important;
}
    .fundContainer{
        height: 250px;
        width: 600px;
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
    .orderBox{
        width: 350px;
        float: left;
        margin: 50px;
        margin-top: 0px;
    }
    .orders{
        width: fit-content;
        margin: 0 auto;
        height: 300px;
    }
    .makeOrder{
        width: 902px;
        height: 350px;
        margin: 0 auto;
        margin-bottom: 50px;
        border: 1px solid black;
    }
    .selectMakeOrder{
        width: fit-content;
        float: right;
        position: absolute;
        border: 1px solid black;
        margin-top: 49px;
        border-top: 0px;
    }
    .makeOrderbtn{
        border: none;
        background-color: white;
        float: left;
    }
    .selectbtn{
        background-color: #bfbfbf;
        color: white;
    }
    .clientTable{
        width: 30%;
        position: relative;
        margin: 0 auto;
    }
    .clientTable table{
        font-size: 12px;
        text-align: center;
        vertical-align: middle !important;
    }
    .clientTable th{
        font-size: 12px;
        text-align: center;
        vertical-align: middle !important;
    }
    .clientTable td{
        font-size: 12px;
        text-align: center;
        vertical-align: middle !important;
    }
    .clientTable input{
        font-size: 12px;
    }
    .currenciesTable{
      border-left: 1px solid;
      border-right: 1px solid;
      width: 33%;
      height: fit-content;
      margin: 0 auto;
      position: relative;
      display: block;
      float: left;
    }
    .currenciesTable table{
      text-align: center;
      font-size: 12px;
      vertical-align: middle !important;
    }
    .currenciesTable th{
      text-align: center;
      font-size: 12px;
      vertical-align: middle !important;
    }
    .currenciesTable td{
      text-align: center;
      font-size: 12px;
      vertical-align: middle !important;
    }
    .currenciesTable input{
      font-size: 10px;
    }
    .fundAction{
        height: 50px;
        float: left;
        text-align: center;
        width: 100%;
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
</style>
@section('content')
    <div class="clientscontent">
        <div class="selection">
            <h2>Select Client</h2>
            <div class="tab-pane active clientTable" id="list">
                <table id="table_client" class="table table-responsive table-striped table-hover">
                    <thead class="thead-default">
                        <tr>
                            <th colspan="1">Clients</th>
                            <th colspan="2"><div class="col-lg-12">
                                <form id="form_client_search" class="form_search">
                                    <div class="input-group">
                                        <input id="search_client_value" type="text" class="form-control" placeholder="Search Client">
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                        </span>
                                    </div><!-- /input-group -->
                                </form>
                            </div><!-- /.col-lg-6 --></th>
                        </tr>
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
                                <select id="result_client_page">
                                    <option value="5" selected="selected">5</option>
                                    <option value="10">10</option>
                                </select>
                            </th>
                            <th id="table_client_pagination" colspan="2"></th>
                        </tr>
                    </tfoot>
                    <tbody id="table_client_content">
                    </tbody>
                </table>
            </div>
        </div>
        <div class="fundContainer">
            <div class="userBalance" id="balanceUser">
              <h3>Balance</h3>
              <div class="balanceTotal">
                <p>Total USD: <span id="usdtotal"></span> / BTC: <span id="btctotal"></span></p>
              </div>
              <div class="currenciesTable">
                <div class="tab-pane active" id="list">
                    <table id="table_balance_currency" class="table table-responsive table-striped table-hover">
                        <thead class="thead-default">
                            <tr>
                              <th colspan="1">Currencies</th>
                              <th colspan="2"><div class="col-lg-12">
                                  <form id="form_balance_currency_search" class="form_search">
                                      <div class="input-group">
                                          <input id="search_balance_currency_value" type="text" class="form-control" placeholder="Search Currency">
                                          <span class="input-group-btn">
                                              <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                          </span>
                                      </div><!-- /input-group -->
                                  </form>
                              </div><!-- /.col-lg-6 --></th>
                            </tr>
                            <tr>
                                <th id="table_balance_currency_header_symbol" style="cursor: pointer;">Symbol</th>
                                <th id="table_balance_currency_header_amount" style="cursor: pointer;">Amount</th>
                                <th id="table_balance_currency_header_equivalent" style="cursor: pointer;">USD Equivalent</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="1" id="balance_currency_page">
                                    <select id="result_balance_currency_page">
                                        <option value="5" selected="selected">5</option>
                                    </select>
                                </th>
                                <th id="table_balance_currency_pagination" colspan="2"></th>
                            </tr>
                        </tfoot>
                        <tbody id="table_balance_currency_content">
                        </tbody>
                    </table>
                </div>
              </div>
              <div class="currenciesTable">
                <div class="tab-pane active" id="list">
                    <table id="table_balance_crypto" class="table table-responsive table-striped table-hover">
                        <thead class="thead-default">
                            <tr>
                              <th colspan="1">CryptoCurrencies</th>
                              <th colspan="2"><div class="col-lg-12">
                                  <form id="form_balance_crypto_search" class="form_search">
                                      <div class="input-group">
                                          <input id="search_balance_crypto_value" type="text" class="form-control" placeholder="Search CryptoCurrency">
                                          <span class="input-group-btn">
                                              <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                          </span>
                                      </div><!-- /input-group -->
                                  </form>
                              </div><!-- /.col-lg-6 --></th>
                            </tr>
                            <tr>
                                <th id="table_balance_crypto_header_symbol" style="cursor: pointer;">Symbol</th>
                                <th id="table_balance_crypto_header_amount" style="cursor: pointer;">Amount</th>
                                <th id="table_balance_crypto_header_Equivalent" style="cursor: pointer;">USD Equivalent</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="1" id="balance_crypto_page">
                                    <select id="result_balance_crypto_page">
                                        <option value="5" selected="selected">5</option>
                                    </select>
                                </th>
                                <th id="table_balance_crypto_pagination" colspan="2"></th>
                            </tr>
                        </tfoot>
                        <tbody id="table_balance_crypto_content">
                        </tbody>
                    </table>
                </div>
              </div>
              <div class="currenciesTable">
                <div class="tab-pane active" id="list">
                    <table id="table_balance_token" class="table table-responsive table-striped table-hover">
                        <thead class="thead-default">
                            <tr>
                              <th colspan="1">Token</th>
                              <th colspan="2"><div class="col-lg-12">
                                  <form id="form_balance_token_search" class="form_search">
                                      <div class="input-group">
                                          <input id="search_balance_token_value" type="text" class="form-control" placeholder="Search Token">
                                          <span class="input-group-btn">
                                              <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                          </span>
                                      </div><!-- /input-group -->
                                  </form>
                              </div><!-- /.col-lg-6 --></th>
                            </tr>
                            <tr>
                                <th id="table_balance_token_header_symbol" style="cursor: pointer;">Symbol</th>
                                <th id="table_balance_token_header_amount" style="cursor: pointer;">Amount</th>
                                <th id="table_balance_token_header_Equivalent" style="cursor: pointer;">USD Equivalent</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="1" id="balance_token_page">
                                    <select id="result_balance_token_page">
                                        <option value="5" selected="selected">5</option>
                                    </select>
                                </th>
                                <th id="table_balance_token_pagination" colspan="2"></th>
                            </tr>
                        </tfoot>
                        <tbody id="table_balance_token_content">
                        </tbody>
                    </table>
                </div>
              </div>

            </div>
            <div class="fundAction">
                <button type="button" name="button" id="btnDepo">Deposit</button>
                <button type="button" name="button" id="btnWith">Withdraw</button>
            </div>
        </div>
    </div>
@endsection
