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
</style>
@section('content')
    <div class="orderscontent">
        <div class="orders ordersBTC">
            <div class="orderBox" id="buyBTC">
                <div class="titleOrder">
                    <h3>Buy BTC</h3>
                    <p>Available <span id="available-btcBuy"></span></p>
                </div>
                <form class="OrderForm" id="btcBuyForm">
                    <div>
                        <label for="currency">Currency</label>
                        <select id="currency" class="form-control" name="currency">
                            <option value="VEF">Bolivares</option>
                            <option value="USD">Dollar</option>
                            <option value="ETH">Ethereum</option>
                            <option value="LTC">LiteCoin</option>
                        </select>
                    </div>
                    <div id="amountD">
                        <label for="amount">Amount</label>
                        <input id="amount" name="amount" type="text" class="form-control" required="">
                    </div>
                    <div id="depoButts">
                        <button type="button" name="button" id="maxCubtcBuy">Max</button>
                        <button type="button" name="button" id="btcBuy">Buy</button>
                    </div>
                </form>
            </div>
            <div class="orderBox" id="sellBTC">
                <div class="titleOrder">
                    <h3>Sell BTC</h3>
                    <p>Available <span id="available-btcSell"></span></p>
                </div>
                <form class="OrderForm" id="btcSellForm">
                    <div id="amountD">
                        <label for="amount">BTC Amount</label>
                        <input id="amount" name="amount" type="text" class="form-control" required="">
                    </div>
                    <div>
                        <label for="currency">Currency</label>
                        <select id="currency" class="form-control" name="currency">
                            <option value="VEF">Bolivares</option>
                            <option value="USD">Dollar</option>
                            <option value="ETH">Ethereum</option>
                            <option value="LTC">LiteCoin</option>
                        </select>
                    </div>

                    <div id="depoButts">
                        <button type="button" name="button" id="MaxCubtcSell">Max</button>
                        <button type="button" name="button" id="btcSell">Sell</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="orders ordersETH">
            <div class="orderBox" id="buyETH">
                <div class="titleOrder">
                    <h3>Buy ETH</h3>
                    <p>Available <span id="available-ethBuy"></span></p>
                </div>
                <form class="OrderForm" id="ethBuyForm">
                    <div>
                        <label for="currency">Currency</label>
                        <select id="currency" class="form-control" name="currency">
                            <option value="VEF">Bolivares</option>
                            <option value="USD">Dollar</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="LTC">LiteCoin</option>
                        </select>
                    </div>
                    <div id="amountD">
                        <label for="amount">Amount</label>
                        <input id="amount" name="amount" type="text" class="form-control" required="">
                    </div>
                    <div id="depoButts">
                        <button type="button" name="button" id="maxCuethBuy">Max</button>
                        <button type="button" name="button" id="ethBuy">Buy</button>
                    </div>
                </form>
            </div>
            <div class="orderBox" id="sellETH">
                <div class="titleOrder">
                    <h3>Sell ETH</h3>
                    <p>Available <span id="available-ethSell"></span></p>
                </div>
                <form class="OrderForm" id="ethSellForm">
                    <div id="amountD">
                        <label for="amount">ETH Amount</label>
                        <input id="amount" name="amount" type="text" class="form-control" required="">
                    </div>
                    <div>
                        <label for="currency">Currency</label>
                        <select id="currency" class="form-control" name="currency">
                            <option value="VEF">Bolivares</option>
                            <option value="USD">Dollar</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="LTC">LiteCoin</option>
                        </select>
                    </div>

                    <div id="depoButts">
                        <button type="button" name="button" id="MaxCuethSell">Max</button>
                        <button type="button" name="button" id="ethSell">Sell</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="orders ordersLTC">
            <div class="orderBox" id="buyLTC">
                <div class="titleOrder">
                    <h3>Buy LTC</h3>
                    <p>Available <span id="available-ltcBuy"></span></p>
                </div>
                <form class="OrderForm" id="ltcBuyForm">
                    <div>
                        <label for="currency">Currency</label>
                        <select id="currency" class="form-control" name="currency">
                            <option value="VEF">Bolivares</option>
                            <option value="USD">Dollar</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="ETH">Ethereum</option>
                        </select>
                    </div>
                    <div id="amountD">
                        <label for="amount">Amount</label>
                        <input id="amount" name="amount" type="text" class="form-control" required="">
                    </div>
                    <div id="depoButts">
                        <button type="button" name="button" id="maxCultcBuy">Max</button>
                        <button type="button" name="button" id="ltcBuy">Buy</button>
                    </div>
                </form>
            </div>
            <div class="orderBox" id="sellLTC">
                <div class="titleOrder">
                    <h3>Sell LTC</h3>
                    <p>Available <span id="available-ltcSell"></span></p>
                </div>
                <form class="OrderForm" id="ltcSellForm">
                    <div id="amountD">
                        <label for="amount">LTC Amount</label>
                        <input id="amount" name="amount" type="text" class="form-control" required="">
                    </div>
                    <div>
                        <label for="currency">Currency</label>
                        <select id="currency" class="form-control" name="currency">
                            <option value="VEF">Bolivares</option>
                            <option value="USD">Dollar</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="ETH">Ethereum</option>
                        </select>
                    </div>

                    <div id="depoButts">
                        <button type="button" name="button" id="MaxCultcSell">Max</button>
                        <button type="button" name="button" id="ltcSell">Sell</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="tab-pane active" id="list">
            <table id="table_order" class="table table-responsive table-striped table-hover">
                <thead class="thead-default">
                    <tr>
                        <th colspan="4">Orders</th>
                        <th colspan="3">
                            <div class="col-lg-12">
                                <form id="form_orders_search" class="form_search">
                                    <div class="input-group">
                                        <input id="search_orders_value" type="text" class="form-control" placeholder="Search Order">
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                        </span>
                                    </div><!-- /input-group -->
                                </form>
                            </div><!-- /.col-lg-6 -->
                        </th>
                    </tr>
                    <tr>
                        <th id="table_order_header_currency_out" style="cursor: pointer;">Currency Out</th>
                        <th id="table_order_header_amount_out" style="cursor: pointer;">Amount Out</th>
                        <th id="table_order_header_rate" style="cursor: pointer;">Rate</th>
                        <th id="table_order_header_fee" style="cursor: pointer;">Fee</th>
                        <th id="table_order_header_currency_in" style="cursor: pointer;">Currency In</th>
                        <th id="table_order_header_amount_in" style="cursor: pointer;">Amount In</th>
                        <th id="table_order_header_date" style="cursor: pointer;">Date</th>
                        <th id="table_order_header_reference" style="cursor: pointer;">Reference</th>
                        <th id="table_order_header_confirmed" style="cursor: pointer;">Confirmed</th>
                        <th id="table_order_header_confirm_date" style="cursor: pointer;">Confirm Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="3" id="order_page">
                            <select id="result_order_page">
                                <option value="5">5</option>
                                <option value="10" selected="selected" >10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </th>
                        <th id="table_order_pagination" colspan="4"></th>
                    </tr>
                </tfoot>
                <tbody id="table_order_content">
                </tbody>
            </table>
        </div>
    </div>
@endsection
