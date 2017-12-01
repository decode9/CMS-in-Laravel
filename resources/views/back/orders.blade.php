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
</style>
@section('content')
    <div class="orderscontent">
        <div class="makeOrder">
            <div class="selectMakeOrder">
                <button class="makeOrderbtn" id="btnBTC" type="button" name="button">BTC</button>
                <button class="makeOrderbtn" id="btnETH" type="button" name="button">ETH</button>
                <button class="makeOrderbtn" id="btnLTC" type="button" name="button">LTC</button>
            </div>
        </div>
        <div class="tab-pane active" id="list">
            <table id="table_order" class="table table-responsive table-striped table-hover">
                <thead class="thead-default">
                    <tr>
                        <th colspan="4">Orders</th>
                        <th colspan="3">
                            <div class="col-lg-12">
                                <form id="form_order_search" class="form_search">
                                    <div class="input-group">
                                        <input id="search_order_value" type="text" class="form-control" placeholder="Search Order">
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
                        <th id="table_order_header_reference" style="cursor: pointer;">Reference</th>
                        <th id="table_order_header_date" style="cursor: pointer;">Date</th>
                        <th id="table_order_header_confirmed" style="cursor: pointer;">Confirmed</th>
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
