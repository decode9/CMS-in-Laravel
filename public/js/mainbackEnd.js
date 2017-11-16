/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(44);


/***/ }),

/***/ 44:
/***/ (function(module, exports) {

$(document).ready(function () {
    $('.menuItem').click(function () {
        if ($('.menuItem').is('#open')) {
            if (!$(this).is('#open')) {
                $('#open').find(".submenuItem").slideToggle('200', 'linear');
                $('.menuItem').removeAttr('id');
            }
        }
        if (!$(this).is('#open')) {
            $(this).attr('id', 'open');
        }
        if ($(this).find(".submenuItem").css('display') == 'block') {
            $(this).removeAttr('id');
        }
        $(this).find(".submenuItem").slideToggle('200', 'linear');
    });
    $('#menuToggle').click(function () {

        if ($('#leftContent').width() >= 240) {
            $('#leftContent').animate({ width: "3%" });
            $('#rightContent').animate({ width: "97%" });
            $('.menuItem').find("p").css('display', 'none');
            $('#mainLogo').css('display', 'none');
            $('#menuToggle').css('float', 'none');
            $('#menuToggle').css('text-align', 'center');
            $('.submenuItem').css('margin-left', '98%');
            $('.submenuItem').css('position', 'absolute');
            $('.submenuItem').css('width', '150px');
        } else {
            $('#leftContent').animate({ width: "13%" });
            $('#rightContent').animate({ width: "87%" }, "fast");
            $('.menuItem').find("p").css('display', 'block');
            $('#mainLogo').css('display', 'block');
            $(this).css('float', 'right');
            $('.submenuItem').css('margin-left', '0');
            $('.submenuItem').css('position', 'relative');
            $('.submenuItem').css('width', 'auto');
        }
    });
    $('#btnDepo').click(function(){
        box = "<div class='Modal' id='depositModal' style='display:none;'><div class='modalContent' id='modalDeposit'><h3>Deposit</h3><form class='FundForm' id='DepositForm' enctype='multipart/form-data' ></form></div></div>";
        $('#rightContent').append(box);
        $('#DepositForm').append('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Deposit</strong></div>')
        $('#DepositForm').append("<div><label for='currency'>Currency</label><select id='currency' class='form-control' name='currency'><option value='VEF'>Bolivares</option><option value='USD'>Dollar</option><option value='BTC'>Bitcoin</option><option value='ETH'>Ethereum</option><option value='LTC'>LiteCoin</option></select></div>");
        $('#DepositForm').append("<div><label for='amount'>Amount</label><input id='amount' name='amount' type='text' class='form-control' required></div>");
        $('#DepositForm').append("<div><label for='reference'>Reference</label><input id='reference' name='reference' type='text' class='form-control' required></div>");
        $('#DepositForm').append("<div><label for='file'>File</label><input id='file' name='file' type='file' class='custom-file-input' required></div>");
        $('#DepositForm').append("<div id='depoButts'></div>");
        makeBut = $("<button type='button' name='button' id='depoCont'>Make</button>");
        clsbut = $("<span class='close'>&times;</span>");
        addMakedButton(makeBut);
        closeButton(clsbut, '#depositModal');
        $('#modalDeposit').prepend(clsbut);
        $('#depoButts').append(makeBut);
        $('#depositModal').show();

    });

    $('#passwordBut').click(function () {
        $('.passwordField').slideToggle();
    });

    function closeButton(clsbut, modal){
        clsbut.click(function(){
                $(modal).remove();
        });
    }
    $('#btnWith').click(function(){
        box = "<div class='Modal' id='withdrawModal' style='display:none;'><div class='modalContent' id='modalWithdraw'><h3>Withdraw</h3><form class='FundForm' id='WithdrawForm' enctype='multipart/form-data' ></form></div></div>";
        $('#rightContent').append(box);
        $('#WithdrawForm').append('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Withdraw</strong></div>')
        $('#WithdrawForm').append("<div><label for='currency'>Currency</label><select id='currency' class='form-control' name='currency'><option value='VEF'>Bolivares</option><option value='USD'>Dollar</option><option value='BTC'>Bitcoin</option><option value='ETH'>Ethereum</option><option value='LTC'>LiteCoin</option></select></div>");
        $('#WithdrawForm').append("<div><label for='amount'>Amount</label><input id='amount' name='amount' type='text' class='form-control' required></div>");
        $('#WithdrawForm').append("<div><label for='account'>Account</label><input id='account' name='account' type='text' class='form-control' required></div>");
        $('#WithdrawForm').append("<div id='withButts'></div>");
        makeBut = $("<button type='button' name='button' id='withCont'>Make</button>");
        clsbut = $("<span class='close'>&times;</span>");
        addMakewButton(makeBut);
        closeButton(clsbut, '#withdrawModal');
        $('#modalWithdraw').prepend(clsbut);
        $('#withButts').append(makeBut);
        $('#withdrawModal').show();

    });
    $.validator.addMethod("letters", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
    });
    $('#WithdrawForm').validate({
        rules: {
            amount:{
                required: true,
                minlength: 3,
                number: true,
            },

            account:{
                required: true,
            },
        },
        messages:{
            amount: "Please introduce only numbers, minimun 3 digits",
            account: 'Please introduce the account of the withdraw',
            file: 'Please attach the deposit confirmation file',
        },
    })
    function addMakewButton(makeBut){
        makeBut.click(function(e){
            if($('#WithdrawForm').valid()){
                alterForm('#WithdrawForm', true);
                $('#depoCont').hide();
                $('.alert').show();
                confirmBut = $("<button type='button' name='button' id='withConf'>Confirm</button>");
                backBut = $("<button type='button' name='button' id='withBack'>Back</button>");
                backButton(backBut, '#WithdrawForm', 'with');
                confirmButton(confirmBut);
                $('#withButts').append(confirmBut);
                $('#withButts').append(backBut);
            }
        })
    }
    $('#DepositForm').validate({
        rules: {
            amount:{
                required: true,
                minlength: 3,
                number: true,
            },

            reference:{
                required: true,
                minlength: 3,
            },
            file:{
                required: true,
            }
        },
        messages:{
            amount: "Please introduce only numbers, minimun 3 digits",
            reference: 'Please introduce the reference of the deposit',
            file: 'Please attach the deposit confirmation file',
        },
    })
    function addMakedButton(makeBut){
        makeBut.click(function(e){


            if($('#DepositForm').valid()){
                alterForm('#DepositForm', true);
                $('#depoCont').hide();
                $('.alert').show();
                confirmBut = $("<button type='button' name='button' id='depoConf'>Confirm</button>");
                backBut = $("<button type='button' name='button' id='depoBack'>Back</button>");
                backButton(backBut, '#DepositForm', 'depo');
                confirmButton(confirmBut);
                $('#depoButts').append(confirmBut);
                $('#depoButts').append(backBut);
            }
        })
    }

    function alterForm(form, change){
        $(form + ' input, ' + form +' select').each(function(index){
            input = $(this);
            if(change == true){
                input.attr('disabled', change);
            }else{
                input.removeAttr('disabled');
            }

        })
    }
    function backButton(backBut, form, target){
        backBut.click(function(){
            alterForm(form, false);
            $('#'+target+'Conf').remove();
            $('#'+target+'Back').remove();
            $('#'+target+'Cont').show();
        })
    }
    function confirmdButton(confirmBut){
        confirmBut.click(function(){

                currency = $('#currency').val();
                reference = $('#reference').val();
                amount = $('#amount').val();
                data = new FormData();

                data.append('currency', currency);
                data.append('amount', amount);
                data.append('reference', reference);
                data.append('file', $('#file')[0].files[0]);
                alert(currency);
                $.ajax({

                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/deposit',
                    type: 'POST',
                    dataType: "json",
                    data: data,
                    cache: false,
                contentType: false,
	               processData: false,
                    success: function(data){
                        alert(data.response);
                    }
                })

        })
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#picture").change(function () {
        readURL(this);
        $('#previewImage').animate({ width: 'show' }, 'fast');
    });

    function currencyPrice(select,callback){
        $.ajax({
            url: "https://api.coinbase.com/v2/exchange-rates?currency=" + select,
            type: 'GET',
            dataType: "json",
            success: function(coins) {
                        callback(parseFloat(coins.data.rates["USD"]));
                }
        });
    }

    $.extend({
        xResponse: function(select) {
            // jQuery ajax
            var prices = null;
            $.ajax({
                url: "https://api.coinbase.com/v2/exchange-rates?currency=" + select,
                type: 'GET',
                dataType: "json",
                async: false,
                success: function(coins) {
                            prices = parseFloat(coins.data.rates["USD"]);
                    }
            });
            // Return the response text
            return prices;
        }
    });
    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear:function (num){
            num +='';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return this.simbol + splitLeft +splitRight;
        },
        num:function(num, simbol){
            this.simbol = simbol ||'';
            return this.formatear(num);
        }
    }

    function balances(){

        btcprice = $.xResponse('BTC');
        ethprice = $.xResponse('ETH');
        ltcprice = $.xResponse('LTC');
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: '/funds/transactions',
            success: function(data){

                box = "<div class='balance'><div id='unconfirmed'><h3>Unconfirmed Balance</h3></div><div id= 'confirmed'><h3>Confirmed Balance</h3></div></div>";

                vefct = data.currencyBalance.Confirmed[0];
                usdct = data.currencyBalance.Confirmed[1];
                btcct = data.currencyBalance.Confirmed[2];
                ethct = data.currencyBalance.Confirmed[3];
                ltcct = data.currencyBalance.Confirmed[4];

                vefut = data.currencyBalance.Unconfirmed[0];
                usdut = data.currencyBalance.Unconfirmed[1];
                btcut = data.currencyBalance.Unconfirmed[2];
                ethut = data.currencyBalance.Unconfirmed[3];
                ltcut = data.currencyBalance.Unconfirmed[4];



                $('#balanceUser').append(box);
                $('#unconfirmed').append('<p>BsF. '+formatNumber.num(vefut)+'</p><p>$ '+formatNumber.num(usdut)+'</p><p>BTC '+formatNumber.num(btcut)+' ~ $ '+ formatNumber.num((btcut * btcprice).toFixed(2)) +'</p><p>LTC '+formatNumber.num(ltcut)+' ~ $ '+ formatNumber.num((ltcut * ltcprice).toFixed(2)) +'</p><p>ETH '+formatNumber.num(ethut)+' ~ $ '+ formatNumber.num((ethut * ethprice).toFixed(2)) +'</p>');
                $('#confirmed').append('<p>BsF. '+formatNumber.num(vefct)+'</p><p>$ '+formatNumber.num(usdct)+'</p><p>BTC '+formatNumber.num(btcct)+' ~ $ '+ formatNumber.num((btcct * btcprice).toFixed(2)) +'</p><p>LTC '+formatNumber.num(ltcct)+' ~ $ '+ formatNumber.num((ltcct * ltcprice).toFixed(2)) +'</p><p>ETH '+formatNumber.num(ethct)+' ~ $ '+ formatNumber.num((ethct * ethprice).toFixed(2)) +'</p>');
            }
        })
    }



    function Currency(id){
        switch (id) {
            case 1:
                return "VEF";
                break;
            case 2:
                return "USD";
                break;
            case 3:
                return "BTC";
                break;
            case 4:
                return 'LTC';
                break;
            case 5:
                return 'ETH';
                break;
        }
    }
    function active(act){
        if(act){
            return 'Yes';
        }else{
            return 'No';
        }
    }
    function updated(vari){
        if(vari.active){
            return vari.updated_at;
        }else{
            return '';
        }
    }

    /*Search Deposit Table*/

    $('#table_deposit_header_currency').click(function (e) {
      orderTableDepositBy('currencies.symbol');
    });

     $('#table_deposit_header_amount').click(function (e) {
      orderTableDepositBy('amount');
    });

    $('#table_deposit_header_reference').click(function (e) {
      orderTableDepositBy('comment');
    });
    $('#table_deposit_header_date').click(function (e) {
      orderTableDepositBy('funds.created_at');
    });
    $('#table_deposit_header_confirmed').click(function (e) {
      orderTableDepositBy('active');
    });
    $('#table_deposit_header_confirm_date').click(function (e) {
      orderTableDepositBy('funds.updated_at');
    });

    var orderDepositBy = "";
    var orderDepositDirection = "";
    var seachDepositValue = "";

    $( "#form_deposit_search" ).submit(function(e){
        e.preventDefault();
        //DESC
        searchDepositValue = $( "#search_deposit_value" ).val();
        searchDeposit(1);
    });

    function orderTableDepositBy(by){
        if(orderDepositBy === by){
            if(orderDepositDirection === ""){
                orderDepositDirection = "DESC";
            }else{
                orderDepositDirection = "";
            }
        }else{
            orderDepositBy = by;
            orderDepositDirection = "";
        }
        searchDeposit(1);
    }

    //Get Deposit Data

    function searchDeposit(page){
        resultPage =  $( "#result_deposit_page" ).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/deposit",
            type: 'post',
            data: { searchvalue : searchDepositValue, page : page, orderBy :orderDepositBy, orderDirection: orderDepositDirection,    resultPage: resultPage } ,
            success: function (data) {
                //Inicio
                var deposits = data.result;
                if(deposits.length == 0){
                    $('#table_withdraw_content').append('<tr><td colspan="7">None</td></tr>');
                }else{
                // Put the data into the element you care about.
                $("#table_deposit_content").html("");
                for(i=0;i<  deposits.length;i++)
                {
                    var deposit = deposits[i];
                    // we have to make in steps to add the onclick event
                    var rowResult = $( '<tr></tr>');
                    var colvalue_1 = $( '<td class="col-sm-12 col-md-2">'+  Currency(deposit.currency_id) +'</td>');
                    var colvalue_2 = $( '<td class="col-sm-12 col-md-2">'+ formatNumber.num( deposit.amount ) +'</td>');
                    var colvalue_3 = $( '<td class="col-sm-12 col-md-2">'+  deposit.comment  +'</td>');
                    var colvalue_4 = $( '<td class="col-sm-12 col-md-2">'+  deposit.created_at  +'</td>');
                    var colvalue_5 = $( '<td class="col-sm-12 col-md-2">'+  active(deposit.active)  +'</td>');
                    var colvalue_6 = $( '<td class="col-sm-12 col-md-2">'+  updated(deposit)  +'</td>');

                    var colvalue_7 = $( '<td class="col-sm-12 col-md-2"></td>');

                    rowResult.append(colvalue_1);
                    rowResult.append(colvalue_2);
                    rowResult.append(colvalue_3);
                    rowResult.append(colvalue_4);
                    rowResult.append(colvalue_5);
                    rowResult.append(colvalue_6);
                    rowResult.append(colvalue_7);
                    $("#table_deposit_content").append(rowResult);
                }
                $("#table_deposit_pagination").html("");
                page = parseInt(data.page);
                var total = data.total;
                var resultPage =  $( "#result_deposit_page" ).val();
                var totalPages = Math.ceil(total / resultPage);
                if(page === 1){
                    maxPage = page + 2;
                    totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                    var pageList = $( '<ul class="pagination"></ul>');
                    for(i = page ; i <= totalPages; i++){
                        pagebutton = $( '<li class="page_Deposit">'+ i +'</li>');
                        pageList.append(pagebutton);
                        addPageButton(pagebutton);
                    }
                    $("#table_deposit_pagination").append(pageList);
                }else if(page === totalPages){
                    page = page - 2;
                    if(page < 1){
                        page = 1;
                    }
                    totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                    var pageList = $( '<ul class="pagination"></ul>');
                    for(i = page ; i <= totalPages; i++){
                        pagebutton = $( '<li class="page_Deposit">'+ i +'</li>');
                        pageList.append(pagebutton);
                        addPageButton(pagebutton);
                    }
                    $("#table_deposit_pagination").append(pageList);
                }else{
                    page = page - 2;
                    if(page < 1){
                        page = 1;
                    }
                    totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                    var pageList = $( '<ul class="pagination"></ul>');
                    for(i = page ; i <= totalPages; i++){
                        pagebutton = $( '<li class="page_Deposit">'+ i +'</li>');
                        pageList.append(pagebutton);
                        addPageButton(pagebutton);
                    }

                    $("#table_deposit_pagination").append(pageList);
                }
                }
            },
            // Fin
            error: function (error) {
                ReadError(error);
            }
        });
    }
    function addPageButton(pagebutton){
        pagebutton.click(function(){
            page = $(this).text();
            searchDeposit(page);
        })
    }

    /*Search Withdraws Table*/

    $('#table_withdraw_header_currency').click(function (e) {
      orderTableWithdrawBy('currencies.symbol');
    });

     $('#table_withdraw_header_amount').click(function (e) {
      orderTableWithdrawBy('amount');
    });

    $('#table_withdraw_header_reference').click(function (e) {
      orderTableWithdrawBy('comment');
    });
    $('#table_withdraw_header_date').click(function (e) {
      orderTableWithdrawBy('funds.created_at');
    });
    $('#table_withdraw_header_confirmed').click(function (e) {
      orderTableWithdrawBy('active');
    });
    $('#table_withdraw_header_confirm_date').click(function (e) {
      orderTableWithdrawBy('funds.updated_at');
    });

    var orderWithdrawBy = "";
    var orderWithdrawDirection = "";
    var seachWithdrawValue = "";

    $( "#form_withdraw_search" ).submit(function(e){
        e.preventDefault();
        //DESC
        searchWithdrawValue = $( "#search_withdraw_value" ).val();
        searchWithdraw(1);
    });

    function orderTableWithdrawBy(by){
        if(orderWithdrawBy === by){
            if(orderWithdrawDirection === ""){
                orderWithdrawDirection = "DESC";
            }else{
                orderWithdrawDirection = "";
            }
        }else{
            orderWithdrawBy = by;
            orderWithdrawDirection = "";
        }
        searchWithdraw(1);
    }

    //Get Withdraw Data

    function searchWithdraw(page){
        resultPage =  $( "#result_withdraw_page" ).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/withdraw",
            type: 'post',
            data: { searchvalue : searchWithdrawValue, page : page, orderBy :orderWithdrawBy, orderDirection: orderWithdrawDirection,    resultPage: resultPage } ,
            success: function (data) {
                //Inicio

                var withdraws = data.result;
                if(withdraws.length == 0){
                    $('#table_withdraw_content').append('<tr><td colspan="7">None</td></tr>');
                }else{
                    $("#table_withdraw_content").html("");
                    for(i=0;i<  withdraws.length;i++)
                    {
                        var withdraw = withdraws[i];
                        // we have to make in steps to add the onclick event
                        var rowResult = $( '<tr></tr>');
                        var colvalue_1 = $( '<td class="col-sm-12 col-md-2">'+  Currency(withdraw.currency_id) +'</td>');
                        var colvalue_2 = $( '<td class="col-sm-12 col-md-2">'+ formatNumber.num( withdraw.amount ) +'</td>');
                        var colvalue_3 = $( '<td class="col-sm-12 col-md-2">'+  withdraw.comment  +'</td>');
                        var colvalue_4 = $( '<td class="col-sm-12 col-md-2">'+  withdraw.created_at  +'</td>');
                        var colvalue_5 = $( '<td class="col-sm-12 col-md-2">'+  active(withdraw.active)  +'</td>');
                        var colvalue_6 = $( '<td class="col-sm-12 col-md-2">'+  updated(withdraw)  +'</td>');

                        var colvalue_7 = $( '<td class="col-sm-12 col-md-2"></td>');

                        rowResult.append(colvalue_1);
                        rowResult.append(colvalue_2);
                        rowResult.append(colvalue_3);
                        rowResult.append(colvalue_4);
                        rowResult.append(colvalue_5);
                        rowResult.append(colvalue_6);
                        rowResult.append(colvalue_7);
                        $("#table_withdraw_content").append(rowResult);
                    }
                    $("#table_withdraw_pagination").html("");
                    page = parseInt(data.page);
                    var total = data.total;
                    var resultPage =  $( "#result_withdraw_page" ).val();
                    var totalPages = Math.ceil(total / resultPage);
                    if(page === 1){
                        maxPage = page + 2;
                        totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_withdraw">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageButton(pagebutton);
                        }
                        $("#table_withdraw_pagination").append(pageList);
                    }else if(page === totalPages){
                        page = page - 2;
                        if(page < 1){
                            page = 1;
                        }
                        totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_Withdraw">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageButton(pagebutton);
                        }
                        $("#table_withdraw_pagination").append(pageList);
                    }else{
                        page = page - 2;
                        if(page < 1){
                            page = 1;
                        }
                        totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_Withdraw">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPagewButton(pagebutton);
                        }

                        $("#table_withdraw_pagination").append(pageList);
                    }
                }
                // Put the data into the element you care about.

            },
            // Fin
            error: function (error) {
                ReadError(error);
            }
        });
    }
    function addPagewButton(pagebutton){
        pagebutton.click(function(){
            page = $(this).text();
            searchWithdraw(page);
        })
    }
    $('#form_deposit_search').trigger("submit");
    $('#form_withdraw_search').trigger("submit");
    balances();
});

/***/ })

/******/ });
