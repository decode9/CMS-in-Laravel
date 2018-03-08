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
        top: 0;
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
    .checkRoles{
        padding: 7px;
    }
    #userButts{
        position: relative;
        top: 20px;
    }
    #role-error{
        position: fixed;
        margin-top: 60px;
    }
</style>
@section('content')
    <div class="col-sm-12">
            <div class="col-sm-12 table-responsive active" id="list">
                <table id="table_user" class="table table-striped table-hover">
                    <thead class="thead-default">
                        <tr>
                            <th colspan="4">Users</th>
                            <th colspan="2"><div class="col-sm-12">
                                <form id="form_user_search" class="form_search">
                                    <div class="input-group">
                                        <input id="search_user_value" type="text" class="form-control" placeholder="Search User">
                                        <span class="input-group-btn">
                                            <button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button>
                                        </span>
                                    </div><!-- /input-group -->
                                </form>
                            </div><!-- /.col-lg-6 --></th>
                            <th colspan="1" style="text-align:center; vertical-align:middle;"><button type="button" class="btn btn-default btn-create" value="Go!"><i id="new_icon" class="fa fa-user" aria-hidden="true"> Create User</i></button></th>
                        </tr>
                        <tr>
                            <th id="table_user_header_name" style="cursor: pointer;">Name</th>
                            <th id="table_user_header_username" style="cursor: pointer;">Username</th>
                            <th id="table_user_header_email" style="cursor: pointer;">Email</th>
                            <th id="table_user_header_roles" style="cursor: pointer;">Roles</th>
                            <th id="table_user_header_date" style="cursor: pointer;">Created</th>
                            <th id="table_user_header_update" style="cursor: pointer;">Last Modified</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th colspan="3" id="user_page">
                                <div class="form-group" style="width:70px;">
                                    <select id="result_user_page" class="form-control">
                                        <option value="5">5</option>
                                        <option value="10" selected="selected" >10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </th>
                            <th id="table_user_pagination" class="text-right" colspan="4"></th>
                        </tr>
                    </tfoot>
                    <tbody id="table_user_content">
                    </tbody>
                </table>
            </div>
    </div>
@endsection
