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
    .depositOp{
        width: 100%;
        height: auto;
    }
    .depositOp table{
        width: 95%;
        margin: 0 auto;
    }
    .depositOp th{
        text-align: center;
    }
    .withdrawOp{
        width: 100%;
        height: auto;
        margin-top: 50px;
    }
    .withdrawOp table{
        width: 95%;
        margin: 0 auto;
    }
    .withdrawOp th{
        text-align: center;
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
        <div class="depositOp">
            <table>
                <thead>
                    <tr>
                        <th colspan="6">Deposits</th>
                    </tr>
                </thead>
                <tbody id="depositsTable">
                    <tr>
                        <td>Currency</td>
                        <td>Amount</td>
                        <td>Reference</td>
                        <td>Date</td>
                        <td>Confirmed</td>
                        <td>Confirm Date</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="withdrawOp">
            <table>
                <thead>
                    <tr>
                        <th colspan="6">withdraws</th>
                    </tr>
                </thead>
                <tbody id="withdrawsTable">
                    <tr>
                        <td>Currency</td>
                        <td>Amount</td>
                        <td>Reference</td>
                        <td>Date</td>
                        <td>Confirmed</td>
                        <td>Confirm Date</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
@endsection
