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
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 700px;
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
</style>
@section('content')
    <div class="fundContainer">
        <div class="userBalance" id="balanceUser">
            <div class="titleBalance">
                <h3>Balance</h3>
            </div>

        </div>
        <div class="fundAction">
            <button type="button" name="button" id="btnDepo">Deposit</button>
            <button type="button" name="button" id="btnWith">Withdraw</button>
        </div>
    </div>


    <div class="fundsOperations">
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
                                </div><!-- /input-group -->
                            </form>
                        </div><!-- /.col-lg-6 --></th>
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
                                </div><!-- /input-group -->
                            </form>
                        </div><!-- /.col-lg-6 --></th>
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
    </div>
@endsection
