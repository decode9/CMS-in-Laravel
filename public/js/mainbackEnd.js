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

    /*Menu Functions*/
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

    /*END menu Functions*/

    /*Generics Functions*/

    $('#passwordBut').click(function () {
        $('.passwordField').slideToggle();
    });

    function closeButton(clsbut, modal){
        clsbut.click(function(){
                $(modal).remove();
        });
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

    function formatInput(input){
        $(input).change(function(){
            value = $(this).val();
            val = formatNumber.num(value);
            $(this).val(val);
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

    function closeModal(modal){
        $(modal).remove();
    }

    function opModalPrint(message, data, symbol, user, type){
        modal = "<div class='Modal' id='opModal' style='display:none;'><div class='modalContent' id='modalop'><h3>Success</h3><p>"+message+"</p></div></div>";
        var printbut = $("<button type='button' name='button' id='opPrint'>Receipt</button>");
        printRecipient(user, data, symbol, type, printbut);
        clsbut = $("<span class='close'>&times;</span>");
        closeButton(clsbut, '#opModal');
        $('#rightContent').append(modal);
        $('#modalop').prepend(clsbut);
        $('#modalop').append(printbut);
        $('#opModal').show();

    }

    function printRecipient(user, data, symbol, type , printbut ){
        printbut.click(function(){
            if(type == "deposit"){
                table = "<table style='width: 300px; text-align: center; border: 1px solid black; vertical-align: middle; margin: 0 auto' ><thead><tr><td><img src='/img/Logoblanco.png' width='100px'/></td><td><h2>Deposit Receipt</h2></td></tr></thead><tbody ><tr><td style='padding: 10px 0px;' >Currency</td><td style='padding: 10px 0px;'>" + symbol + "</td></tr><tr><td style='padding: 10px 0px;'>Amount</td><td style='padding: 10px 0px;'>" + formatNumber.num(data.amount) + "</td></tr><tr><td style='padding: 10px 0px;'>Reference</td><td style='padding: 10px 0px;'>"+data.comment+"</td></tr><tr><td style='padding: 10px 0px;'>From</td><td style='padding: 10px 0px;'>"+user+"</td></tr><tr><td style='padding: 10px 0px;'>To</td><td style='padding: 10px 0px;'>Krypto Group</td></tr></tbody></table>";
            }else{
                table = "<table style='width: 300px; text-align: center; border: 1px solid black; vertical-align: middle; margin: 0 auto' ><thead><tr><td><img src='/img/Logoblanco.png' width='100px'/></td><td><h2>Withdraw Receipt</h2></td></tr></thead><tbody ><tr><td style='padding: 10px 0px;' >Currency</td><td style='padding: 10px 0px;'>" + symbol + "</td></tr><tr><td style='padding: 10px 0px;'>Amount</td><td style='padding: 10px 0px;'>" + formatNumber.num(data.amount) + "</td></tr><tr><td style='padding: 10px 0px;'>Reference</td><td style='padding: 10px 0px;'>"+data.comment+"</td></tr><tr><td style='padding: 10px 0px;'>From</td><td style='padding: 10px 0px;'>Krypto Group</td></tr><tr><td style='padding: 10px 0px;'>To</td><td style='padding: 10px 0px;'>"+user+"</td></tr></tbody></table>";
            }


            newWin= window.open("");
            newWin.document.write(table);
            newWin.print();
            newWin.close();
        })
    }
    /*END Generics Functions*/

    /*Funds Page*/

    /*Funds Balances*/

    function balances(){

        btcprice = $.xResponse('BTC');
        ethprice = $.xResponse('ETH');
        ltcprice = $.xResponse('LTC');
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: '/funds/transactions',
            success: function(data){

                box = "<div class='titleBalance'><h3>Balance</h3></div><div class='balance'><div id='unconfirmed'><h3>Unconfirmed Balance</h3></div><div id= 'confirmed'><h3>Confirmed Balance</h3></div></div>";

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


                $('#balanceUser').html("");
                $('#balanceUser').append(box);
                $('#unconfirmed').append('<p id="VEFUT">BsF. '+formatNumber.num(vefut)+'</p><p id="USDUT">$ '+formatNumber.num(usdut)+'</p><p id="BTCUT">BTC '+formatNumber.num(btcut)+' ~ $ '+ formatNumber.num((btcut * btcprice).toFixed(2)) +'</p><p id="LTCUT">LTC '+formatNumber.num(ltcut)+' ~ $ '+ formatNumber.num((ltcut * ltcprice).toFixed(2)) +'</p><p id="ETHUT">ETH '+formatNumber.num(ethut)+' ~ $ '+ formatNumber.num((ethut * ethprice).toFixed(2)) +'</p>');
                $('#confirmed').append('<pid="VEFCT">BsF. '+formatNumber.num(vefct)+'</p><p id="USDCT">$ '+formatNumber.num(usdct)+'</p><p id="BTCCT">BTC '+formatNumber.num(btcct)+' ~ $ '+ formatNumber.num((btcct * btcprice).toFixed(2)) +'</p><p id="LTCCT">LTC '+formatNumber.num(ltcct)+' ~ $ '+ formatNumber.num((ltcct * ltcprice).toFixed(2)) +'</p><p id="ETHCT">ETH '+formatNumber.num(ethct)+' ~ $ '+ formatNumber.num((ethct * ethprice).toFixed(2)) +'</p>');
            }
        })
    }

    /*END Funds Balance*/



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
                var user = data.user;
                if(deposits.length == 0){
                    $("#table_withdraw_content").html("");

                    $('#table_withdraw_content').append('<tr><td colspan="7">None</td></tr>');
                }else{
                // Put the data into the element you care about.
                $("#table_deposit_content").html("");
                for(i=0;i<  deposits.length;i++)
                {
                    var deposit = deposits[i];
                    // we have to make in steps to add the onclick event
                    var rowResult = $( '<tr></tr>');
                    var colvalue_1 = $( '<td class="col-sm-12 col-md-2">'+  deposit.symbol +'</td>');
                    var colvalue_2 = $( '<td class="col-sm-12 col-md-2">'+ formatNumber.num( deposit.amount ) +'</td>');
                    var colvalue_3 = $( '<td class="col-sm-12 col-md-2">'+  deposit.comment  +'</td>');
                    var colvalue_4 = $( '<td class="col-sm-12 col-md-2">'+  deposit.created_at  +'</td>');
                    var colvalue_5 = $( '<td class="col-sm-12 col-md-2">'+  active(deposit.active)  +'</td>');
                    var colvalue_6 = $( '<td class="col-sm-12 col-md-2">'+  updated(deposit)  +'</td>');

                    var colvalue_7 = $( '<td class="col-sm-12 col-md-2"></td>');
                    var printbut = $("<button type='button' name='button' id='depoPrint'>Receipt</button>");
                    printRecipient(user, deposit, deposit.symbol , 'deposit', printbut);
                    colvalue_7.append(printbut);
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
                        pagebutton = $( '<li class="page_Deposit pages">'+ i +'</li>');
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
                        pagebutton = $( '<li class="page_Deposit pages">'+ i +'</li>');
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
                        pagebutton = $( '<li class="page_Deposit pages">'+ i +'</li>');
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

    $('#result_deposit_page').change(function(){
        $('#form_deposit_search').trigger("submit");
    })
    /*Deposit Form*/

    $('#btnDepo').click(function(){
        box = "<div class='Modal' id='depositModal' style='display:none;'><div class='modalContent' id='modalDeposit'><h3>Deposit</h3><form class='FundForm' id='DepositForm' enctype='multipart/form-data' ></form></div></div>";
        $('#rightContent').append(box);
        $('#DepositForm').append('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Deposit</strong></div>')
        $('#DepositForm').append("<div><label for='currency'>Currency</label><select id='currency' class='form-control' name='currency'><option value='VEF'>Bolivares</option><option value='USD'>Dollar</option><option value='BTC'>Bitcoin</option><option value='ETH'>Ethereum</option><option value='LTC'>LiteCoin</option></select></div>");
        $('#DepositForm').append("<div id='amountD'><label for='amount'>Amount</label></div>");
        input = $("<input id='amount' name='amount' type='text' class='form-control' required>");

        $('#amountD').append(input);
        $('#DepositForm').append("<div><label for='reference'>Reference</label><input id='reference' name='reference' type='text' class='form-control' required></div>");
        $('#DepositForm').append("<div><label for='file'>File</label><input id='file' name='file' type='file' class='custom-file-input' required></div>");
        $('#DepositForm').append("<div id='depoButts'></div>");
        makeBut = $("<button type='button' name='button' id='depoCont'>Make</button>");
        clsbut = $("<span class='close'>&times;</span>");
        addMakedButton(makeBut);
        closeButton(clsbut, '#depositModal');
        $('#modalDeposit').prepend(clsbut);
        $('#depoButts').append(makeBut);
        formatInput("#amount");
        $('#depositModal').show();

    });

    function addMakedButton(makeBut){

        makeBut.click(function(e){
            jQuery.validator.addMethod("amount", function(value, element) {
                    return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
                });
            $('#DepositForm').validate({
                rules: {
                    amount:{
                        required: true,
                        minlength: 1,
                        amount: true,
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
                    amount: "Please introduce a valid amount, minimun 3 digits",
                    reference: 'Please introduce the reference of the deposit',
                    file: 'Please attach the deposit confirmation file',
                },
            })

            if($('#DepositForm').valid()){
                alterForm('#DepositForm', true);
                $('#depoCont').hide();
                $('.alert').show();
                confirmBut = $("<button type='button' name='button' id='depoConf'>Confirm</button>");
                backBut = $("<button type='button' name='button' id='depoBack'>Back</button>");
                backButton(backBut, '#DepositForm', 'depo');
                confirmdButton(confirmBut);
                $('#depoButts').append(confirmBut);
                $('#depoButts').append(backBut);
            }
        })
    }

    function confirmdButton(confirmBut){
        confirmBut.click(function(){

                currency = $('#currency').val();
                reference = $('#reference').val();
                amount = $('#amount').val().replace(/\./g, '');
                amount = amount.replace(/,/g, '.');
                data = new FormData();

                data.append('currency', currency);
                data.append('amount', amount);
                data.append('reference', reference);
                data.append('file', $('#file')[0].files[0]);
                $.ajax({

                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/deposit/create',
                    type: 'POST',
                    dataType: "json",
                    data: data,
                    cache: false,
                    contentType: false,
	                processData: false,
                    success: function(data){
                        closeModal('#depositModal');
                        $('#form_deposit_search').trigger("submit");
                        balances();
                        message = data.message;
                        deposit = data.deposit;
                        user = data.user;
                        symbol = data.symbol;
                        opModalPrint(message, deposit, symbol, user, 'deposit');
                    }
                })

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
    var searchWithdrawValue = "";

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
                var user = data.user;
                var withdraws = data.result;
                if(withdraws.length == 0){
                    $("#table_withdraw_content").html("");
                    $('#table_withdraw_content').append('<tr><td colspan="7">None</td></tr>');
                }else{
                    $("#table_withdraw_content").html("");
                    for(i=0;i<  withdraws.length;i++)
                    {
                        var withdraw = withdraws[i];
                        // we have to make in steps to add the onclick event
                        var rowResult = $( '<tr></tr>');
                        var colvalue_1 = $( '<td class="col-sm-12 col-md-2">'+  withdraw.symbol +'</td>');
                        var colvalue_2 = $( '<td class="col-sm-12 col-md-2">'+ formatNumber.num( withdraw.amount ) +'</td>');
                        var colvalue_3 = $( '<td class="col-sm-12 col-md-2">'+  withdraw.comment  +'</td>');
                        var colvalue_4 = $( '<td class="col-sm-12 col-md-2">'+  withdraw.created_at  +'</td>');
                        var colvalue_5 = $( '<td class="col-sm-12 col-md-2">'+  active(withdraw.active)  +'</td>');
                        var colvalue_6 = $( '<td class="col-sm-12 col-md-2">'+  updated(withdraw)  +'</td>');

                        var colvalue_7 = $( '<td class="col-sm-12 col-md-2"></td>');
                        var printbut = $("<button type='button' name='button' id='withPrint'>Receipt</button>");
                        printRecipient(user, withdraw, withdraw.symbol , 'withdraw', printbut);
                        colvalue_7.append(printbut);
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
                            pagebutton = $( '<li class="page_withdraw pages">'+ i +'</li>');
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
                            pagebutton = $( '<li class="page_Withdraw pages">'+ i +'</li>');
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
                            pagebutton = $( '<li class="page_Withdraw pages">'+ i +'</li>');
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

    $('#result_withdraw_page').change(function(){
        $('#form_withdraw_search').trigger("submit");
    })
    /*Withdraw Form*/

    $('#btnWith').click(function(){
        box = "<div class='Modal' id='withdrawModal' style='display:none;'><div class='modalContent' id='modalWithdraw'><h3>Withdraw</h3><form class='FundForm' id='WithdrawForm' enctype='multipart/form-data' ></form></div></div>";
        $('#rightContent').append(box);
        $('#WithdrawForm').append('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Withdraw</strong></div>');
        $('#WithdrawForm').append("<div><label for='currency'>Currency</label><select id='currency' class='form-control' name='currency'><option value='VEF'>Bolivares</option><option value='USD'>Dollar</option><option value='BTC'>Bitcoin</option><option value='ETH'>Ethereum</option><option value='LTC'>LiteCoin</option></select></div>");
        $('#WithdrawForm').append("<div id='amountW'><label for='amount'>Amount</label></div>");
        input = $("<input id='amount' name='amount' type='text' class='form-control' required>");
        $('#amountW').append(input);
        $('#WithdrawForm').append("<div ><input id='accountId' name='accountId' type='text' class='form-control' style='display:none;' required disabled></div>");
        $('#WithdrawForm').append("<div id='acc'><label for='account'>Account</label><input id='account' name='account' type='text' class='form-control' required disabled></div>");
        $('#WithdrawForm').append("<div id='withButts'></div>");
        accountbut = $("<button type='button' name='addcount' id='addcount'>+</button>");
        makeBut = $("<button type='button' name='button' id='withCont'>Make</button>");
        clsbut = $("<span class='close'>&times;</span>");
        addMakewButton(makeBut);
        addAccount(accountbut);
        closeButton(clsbut, '#withdrawModal');

        $('#acc').append(accountbut);
        $('#modalWithdraw').prepend(clsbut);
        $('#withButts').append(makeBut);
                formatInput("#amount");
        $('#withdrawModal').show();

    });

    function addMakewButton(makeBut){
        jQuery.validator.addMethod("amount", function(value, element) {
                return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
            });
        $('#WithdrawForm').validate({
            rules: {
                amount:{
                    required: true,
                    minlength: 1,
                    amount: true,
                },

                account:{
                    required: true,
                },
            },
                messages:{
                    amount: "Please introduce only numbers, minimun 1 digits",
                    account: 'Please introduce the account of the withdraw',
                },

        });

        makeBut.click(function(e){
            if($('#WithdrawForm').valid()){
                amount = $('#amount').val();
                currency = $('#currency').val();
                balance = $( '#'+currency+'CT').val();
                if(amount > balance){
                    $('.alert').empty();
                    $('.alert').removeClass('alert-success');
                    $('.alert').addClass('alert-danger');
                    $('.alert').append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>You dont have enough funds, please tried with a smaller amount</strong>');
                    $('.alert').show();
                }else{
                    alterForm('#WithdrawForm', true);
                    $('#withCont').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' id='withConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' id='withBack'>Back</button>");
                    backButton(backBut, '#WithdrawForm', 'with');
                    confirmwButton(confirmBut);
                    $('#withButts').append(confirmBut);
                    $('#withButts').append(backBut);
                }
            }
        })
    }

    function confirmwButton(confirmBut){
        confirmBut.click(function(){

                currency = $('#currency').val();
                amount = $('#amount').val().replace(/\./g, '');
                amount = amount.replace(/,/g, '.');
                amount = parseFloat(amount) * -1;
                accountId = $('#accountId').val();

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/withdraw/create',
                    type: 'POST',
                    dataType: "json",
                    data: {currency:currency, amount:amount, accountId:accountId},
                    success: function(data){
                        closeModal('#withdrawModal');
                        $('#form_withdraw_search').trigger("submit");
                        balances();
                        message = data.message;
                        deposit = data.withdraw;
                        user = data.user;
                        symbol = data.symbol;
                        opModalPrint(message, deposit, symbol, user, 'withdraw');
                    }
                })

        })
    }

    /*Search Accounts Table*/
    function addTableManager(){
        $('#table_account_header_type').click(function (e) {
          orderTableAccountBy('type');
        });

         $('#table_account_header_entity').click(function (e) {
          orderTableAccountBy('entity');
        });

        $('#table_account_header_address').click(function (e) {
          orderTableAccountBy('address');
        });
        var orderAccountBy = "";
        var orderAccountDirection = "";
        var seachAccountValue = "";

        $( "#form_account_search" ).submit(function(e){
            e.preventDefault();
            //DESC
            searchAccountValue = $( "#search_account_value" ).val();
            searchAccount(1);
        });

        function orderTableAccountBy(by){
            if(orderAccountBy === by){
                if(orderAccountDirection === ""){
                    orderAccountDirection = "DESC";
                }else{
                    orderAccountDirection = "";
                }
            }else{
                orderAccountBy = by;
                orderAccountDirection = "";
            }
            searchAccount(1);
        }
        //Get Account Data

        function searchAccount(page){
            resultPage =  $( "#result_account_page" ).val();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/account",
                type: 'post',
                data: { searchvalue : searchAccountValue, page : page, orderBy :orderAccountBy, orderDirection: orderAccountDirection,    resultPage: resultPage } ,
                success: function (data) {
                    //Inicio

                    var accounts = data.result;
                    if(accounts.length == 0){
                        $('#table_account_content').append('<tr><td colspan="4">None</td></tr>');
                    }else{
                        $("#table_account_content").html("");
                        for(i=0;i<  accounts.length;i++)
                        {
                            var account = accounts[i];
                            // we have to make in steps to add the onclick event
                            var rowResult = $( '<tr></tr>');
                            var colvalue_1 = $( '<td class="col-sm-12 col-md-2">'+  account.type +'</td>');
                            var colvalue_2 = $( '<td class="col-sm-12 col-md-2">'+ account.entity +'</td>');
                            var colvalue_3 = $( '<td class="col-sm-12 col-md-2">'+  account.address  +'</td>');
                            var colvalue_4 = $( '<td class="col-sm-12 col-md-2"></td>');
                            var selectbut = $("<button type='button' name='button' id='accSelect'>Select</button>");
                            selectAccount(account.type ,account.id, account.address, selectbut);
                            colvalue_4.append(selectbut);
                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);

                            $("#table_account_content").append(rowResult);
                        }
                        $("#table_account_pagination").html("");
                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage =  $( "#result_account_page" ).val();
                        var totalPages = Math.ceil(total / resultPage);
                        if(page === 1){
                            maxPage = page + 2;
                            totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');
                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_account pages">'+ i +'</li>');
                                pageList.append(pagebutton);
                                addPageButton(pagebutton);
                            }
                            $("#table_account_pagination").append(pageList);
                        }else if(page === totalPages){
                            page = page - 2;
                            if(page < 1){
                                page = 1;
                            }
                            totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');
                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_account pages">'+ i +'</li>');
                                pageList.append(pagebutton);
                                addPageButton(pagebutton);
                            }
                            $("#table_account_pagination").append(pageList);
                        }else{
                            page = page - 2;
                            if(page < 1){
                                page = 1;
                            }
                            totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');
                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_account pages">'+ i +'</li>');
                                pageList.append(pagebutton);
                                addPageaButton(pagebutton);
                            }

                            $("#table_account_pagination").append(pageList);
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
        function addPageaButton(pagebutton){
            pagebutton.click(function(){
                page = $(this).text();
                searchAccount(page);
            })
        }
        $('#form_account_search').trigger("submit");

        function selectAccount(type, id, address, butslect){



            butslect.click(function(){
                currency = $('#currency').val();
                if(currency == 'BTC' || currency == 'LTC' || currency == 'ETH'){
                    if(type !== 'crypto'){
                        $('.alert-account').empty();
                        $('.alert-account').addClass('alert-danger');
                        $('.alert-account').append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please only select a ' + currency + ' Address</strong>');
                        $('.alert-account').show();
                    }else{
                        $('#accountId').val(id);
                        $('#account').val(address);
                        closeModal('#modalAccount');
                    }
                }else if(currency == 'VEF' || currency == 'USD'){
                    if(type !== 'bank'){
                        $('.alert-account').empty();
                        $('.alert-account').css('background-color', 'red');
                        $('.alert-account').append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please only select a ' + currency + ' Account</strong>');
                        $('.alert-account').show();
                    }else{
                        $('#accountId').val(id);
                        $('#account').val(address);
                        closeModal('#modalAccount');
                    }
                }


            })
        }
    }

    /*Account Management*/

    function addAccount(butaccount){
        butaccount.click(function(){
            box = $('<div class="modalContent" id="modalAccount"><h3>Accounts</h3><div class="alert-account alert" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></div></div>');
            table = $('<table id="table_account" class="table table-responsive table-striped table-hover">');
            thead = $('<thead class="thead-default"></thead>');
            row1 = $('<tr><th colspan="2">Accounts</th><th colspan="2"><div class="col-lg-12"><form id="form_account_search" class="form_search"><div class="input-group"><input id="search_account_value" type="text" class="form-control" placeholder="Search Account"><span class="input-group-btn"><button type="submit" class="btn btn-default" value="Go!"><i id="search_icon" class="fa fa-search" aria-hidden="true"></i></button></span></div><!-- /input-group --></form></div><!-- /.col-lg-6 --></th></tr>');
            row2 = $('<tr><th id="table_account_header_type" style="cursor: pointer;">Type</th><th id="table_account_header_entity" style="cursor: pointer;">Entity</th><th id="table_account_header_address" style="cursor: pointer;">Address</th><th>Options</th></tr>');
            tfoot = $('<tfoot><tr><th colspan="2" id="account_page"><select id="result_account_page"><option value="5" selected="selected">5</option><option value="10"  >10</option><option value="20">20</option><option value="50">50</option></select></th><th id="table_account_pagination" colspan="2"></th></tr></tfoot>');
            tbody = $('<tbody id="table_account_content"></tbody>');
            clsbut = $("<span class='close'>&times;</span>");
            createacc = $("<button type='button' name='button' id='createacc'>Create</button>");
            closeButton(clsbut, '#modalAccount');
            createAccount(createacc);
            thead.append(row1);
            thead.append(row2);
            table.append(thead);
            table.append(tfoot);
            table.append(tbody);
            box.append(table);
            $('.Modal').append(box);
            $('#modalAccount').append(createacc);
            $('#modalAccount').prepend(clsbut);
            addTableManager();
        });
    };


    function createAccount(createacc){
        createacc.click(function(){
            box = $("<div class='modalContent' id='modalCreateAccount'><h3>Accounts</h3><form class='FundForm' id='AccountForm' enctype='multipart/form-data' ></form></div>");
            alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Withdraw</strong></div>');
            select1 = $("<div><label for='type'>Type</label><select id='type' class='form-control' name='type'><option value='bank'>Bank Account</option><option value='crypto'>CryptoCurrency</option></select></div>");
            input1 = $("<div id='entyCont'><label for='entity'>Entity</label><input id='entity' name='entity' type='text' class='form-control' required></div>");
            input2 = $("<div><label for='address'>Address</label><input id='address' name='address' type='text' class='form-control' required></div>");
            $('.Modal').append(box);
            $('#AccountForm').append(alert);
            $('#AccountForm').append(select1);
            $('#AccountForm').append(input1);
            $('#AccountForm').append(input2);
            $('#AccountForm').append("<div id='accButts'></div>");
            clsbut = $("<span class='close'>&times;</span>");
            closeButton(clsbut, '#modalCreateAccount');
            makeBut = $("<button type='button' name='button' id='accCont'>Make</button>");
            addMakeaButton(makeBut);
            $('#modalCreateAccount').prepend(clsbut);
            $('#accButts').append(makeBut);
            changeEntity();
        });
    }
    function changeEntity(){
        $('#type').change(function(){
            selection = $('#type').val();
            if(selection == 'bank'){
                $('#entyCont').empty();
                $('#entyCont').append("<label for='entity'>Entity</label><input id='entity' name='entity' type='text' class='form-control' required>");
            }else if(selection == 'crypto'){
                $('#entyCont').empty();
                $('#entyCont').append("<label for='entity'>Entity</label><select id='entity' class='form-control' name='entity'><option value='BTC'>BTC</option><option value='LTC'>LTC</option><option value='ETH'>ETH</option></select>");
            }
        })
    }
    function addMakeaButton(makeBut){
        $('#AccountForm').validate({
            rules: {
                entity:{
                    required: true,
                    minlength: 2,

                },
                account:{
                    required: true,
                    minlength: 8,
                },
            },
                messages:{
                    entity: "Please introduce the entity of the account",
                    account: 'Please introduce the account of the withdraw',
                },

        });
        makeBut.click(function(e){
            if($('#AccountForm').valid()){
                alterForm('#AccountForm', true);
                $('#accCont').hide();
                $('.alert').show();
                confirmBut = $("<button type='button' name='button' id='accConf'>Confirm</button>");
                backBut = $("<button type='button' name='button' id='accBack'>Back</button>");
                backButton(backBut, '#AccountForm', 'acc');
                confirmaButton(confirmBut);
                $('#accButts').append(confirmBut);
                $('#accButts').append(backBut);

            }
        })
    }

    function confirmaButton(confirmBut){
        confirmBut.click(function(){

                type = $('#type').val();
                entity = $('#entity').val();
                address = $('#address').val();

                $.ajax({

                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/account/create',
                    type: 'POST',
                    dataType: "json",
                    data: {type: type, entity: entity, address: address},
                    success: function(data){
                        addTableManager();
                        closeModal('#modalCreateAccount');
                    }
                })

        })
    }

    $('#form_deposit_search').trigger("submit");
    $('#form_withdraw_search').trigger("submit");
    balances();

    /*END Funds Page*/

    /*Orders Page*/

    function selectCurrencyOrder(button, currency){
        $(button).click(function(){

            $('.selectbtn').removeClass('selectbtn');
            $(this).addClass('selectbtn');

            $('.orders').remove();
            box = $('<div class="orders"></div>');

            buy = $('<div class="orderBox" id="buy"><div class="titleOrder"><h3>Buy '+ currency +'</h3><p>Available <span id="availableBuy"></span></p></div></div>');
            buyform = $('<form class="OrderForm" id="BuyForm"></form>');

            switch (currency) {
                case 'BTC':
                    buyform.append('<div><input id="altBuy" name="alt" style="display:none;" type="text" class="form-control" value="BTC" disabled required></div>');
                    inputcurrent = $('<div><input id="altSell" name="alt" style="display:none;" type="text" class="form-control" value="BTC" disabled required></div>');
                    buyselect = $('<div><label for="currency">Currency</label><select id="currencyBuy" class="form-control" name="currencybuy"><option value="VEF" selected>Bolivares</option><option value="USD">Dollar</option><option value="ETH">Ethereum</option><option value="LTC">Litecoin</option></select></div>');
                    sellselect = $('<div><label for="currency">Currency</label><select id="currencySell" class="form-control" name="currencysell"><option value="VEF" selected>Bolivares</option><option value="USD">Dollar</option><option value="ETH">Ethereum</option><option value="LTC">LiteCoin</option></select></div><div id="sellButts"><button type="button" name="button" id="MaxCuSell">Max</button><button type="button" name="button" id="Sell">Sell</button></div>');
                    break;
                case 'ETH':
                    buyform.append('<div><input id="altBuy" name="alt" style="display:none;" type="text" class="form-control" value="ETH" disabled required></div>');
                    inputcurrent = $('<div><input id="altSell" name="alt" style="display:none;" type="text" class="form-control" value="ETH" disabled required></div>');
                    buyselect = $('<div><label for="currency">Currency</label><select id="currencyBuy" class="form-control" name="currency"><option value="VEF" selected>Bolivares</option><option value="USD">Dollar</option><option value="BTC">Bitcoin</option><option value="LTC">Litecoin</option></select></div>');
                    sellselect = $('<div><label for="currency">Currency</label><select id="currencySell" class="form-control" name="currencysell"><option value="VEF" selected>Bolivares</option><option value="USD">Dollar</option><option value="BTC">Bitcoin</option><option value="LTC">LiteCoin</option></select></div><div id="sellButts"><button type="button" name="button" id="MaxCuSell">Max</button><button type="button" name="button" id="Sell">Sell</button></div>');
                    break;
                case 'LTC':
                    buyform.append('<div><input id="altBuy" name="alt" style="display:none;" type="text" class="form-control" value="ETH" disabled required></div>');
                    inputcurrent = $('<div><input id="altSell" name="alt" style="display:none;" type="text" class="form-control" value="LTC" disabled required></div>');
                    buyselect = $('<div><label for="currency">Currency</label><select id="currencyBuy" class="form-control" name="currency"><option value="VEF" selected>Bolivares</option><option value="USD">Dollar</option><option value="BTC">Bitcoin</option><option value="ETH">Ethereum</option></select></div>');
                    sellselect = $('<div><label for="currency">Currency</label><select id="currencySell" class="form-control" name="currencysell"><option value="VEF" selected>Bolivares</option><option value="USD">Dollar</option><option value="BTC">Bitcoin</option><option value="ETH">Ethereum</option></select></div><div id="sellButts"><button type="button" name="button" id="MaxCuSell">Max</button><button type="button" name="button" id="Sell">Sell</button></div>');
                    break;
            }

            buyinput = $('<div id="amountD"><label for="amount">Amount</label><input id="amountBuy" name="amount" type="text" class="form-control" required></div><div id="buyButts"><button type="button" name="button" id="maxCuBuy">Max</button><button type="button" name="button" id="buyalt">Buy</button></div>');
            buyform.append('<div><input id="typeBuy" name="type" style="display:none;" type="text" class="form-control" value="buy" disabled required></div>');
            buyform.append(buyselect);
            buyform.append(buyinput);

            buy.append(buyform);


            sell = $('<div class="orderBox" id="sell"><div class="titleOrder"><h3>Sell '+ currency +'</h3><p>Available <span id="availableSell"></span></p></div></div>');

            sellform = $('<form class="OrderForm" id="SellForm"></form>');

            sellinput = $('<div id="amountD"><label for="amount">'+ currency +' Amount</label><input id="amountSell" name="amount" type="text" class="form-control" required=""></div>');

            sellform.append('<div><input id="typeSell" name="type" style="display:none;" type="text" class="form-control" value="sell" disabled required></div>');
            sellform.append(inputcurrent);
            sellform.append(sellinput);
            sellform.append(sellselect);
            sell.append(sellform);

            box.append(buy);
            box.append(sell);
            $('.makeOrder').prepend(box);

            formatInput('#amountSell');
            formatInput('#amountBuy');

            availableBalance('#currencyBuy', '#availableBuy', '', '');
            availableBalance('', '#availableSell', currency, '');


            selectMaxvalue('#maxCuBuy', '#amountBuy', 'buy');
            selectMaxvalue('#MaxCuSell', '#amountSell', 'sell');


            buySell('#buyalt' ,  'buy');

            buySell('#Sell' , 'sell');


            $('#currencyBuy').trigger('change');


        });
    }

    function availableBalance(selection, target, currency, type){
        if(selection !== ''){
            $(selection).on('change', function(){
                currency = $(this).val();
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/orders/balance',
                    type: 'POST',
                    dataType: "json",
                    data: {currency: currency},
                    success: function(data){

                        value = formatNumber.num(data.result) + ' ' + currency;
                        $(target).html(value);

                    }
                })
            })
        }else if(currency !== ''){
            if(type == "max"){
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/orders/balance',
                    type: 'POST',
                    dataType: "json",
                    data: {currency: currency},
                    success: function(data){

                        value = formatNumber.num(data.result);
                        $(target).val(value);

                    }
                })
            }else{
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/orders/balance',
                    type: 'POST',
                    dataType: "json",
                    data: {currency: currency},
                    success: function(data){
                        value = formatNumber.num(data.result) + ' ' + currency;
                        $(target).html(value);
                    }
                })
            }

        }

    }

    function selectMaxvalue(button, target, type){
        if(type == 'buy'){
            $(button).click(function(){
                currency = $('#currencyBuy').val();
                availableBalance('', target, currency, 'max');
            })
        }else if(type == 'sell'){
            $(button).click(function(){
                currency = $('#altSell').val();
                availableBalance('', target, currency, 'max');
            })
        }
    }

    function buySell(button, type){
        if(type == 'buy'){
            $(button).click(function(){
                alt = $('#altBuy').val();
                type = $('#typeBuy').val();
                currency = $('#currencyBuy').val();
                amount = $('#amountBuy').val().replace(/\./g, '');
                amount = amount.replace(/,/g, '.');
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/orders/buySell',
                    type: 'POST',
                    dataType: "json",
                    data: {currency:currency, amount:amount, type:type, alt:alt},
                    success: function(data){
                        alert(data.message);
                        $('#form_order_search').trigger("submit");
                    }
                })
            })
        }else if(type == 'sell'){
            $(button).click(function(){
                alt = $('#altSell').val();
                type = $('#typeSell').val();
                currency = $('#currencySell').val();
                amount = $('#amountSell').val().replace(/\./g, '');
                amount = amount.replace(/,/g, '.');

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/orders/buySell',
                    type: 'POST',
                    dataType: "json",
                    data: {currency:currency, amount:amount, type:type, alt:alt},
                    success: function(data){
                        alert(data.message);
                        $('#form_order_search').trigger("submit");
                    }
                })
            })
        }
    }

    /*Search Orders Table*/


     $('#table_order_header_amount_out').click(function (e) {
      orderTableOrderBy('amount_out');
    });


     $('#table_order_header_amount_in').click(function (e) {
      orderTableOrderBy('amount_out');
    });

    $('#table_order_header_rate').click(function (e) {
     orderTableOrderBy('rate');
   });

   $('#table_order_header_fee').click(function (e) {
    orderTableOrderBy('fee');
  });

    $('#table_order_header_reference').click(function (e) {
      orderTableOrderBy('reference');
    });
    $('#table_order_header_date').click(function (e) {
      orderTableOrderBy('fund_orders.created_at');
    });
    $('#table_order_header_confirmed').click(function (e) {
      orderTableOrderBy('confirmed');
    });
    $('#table_order_header_confirm_date').click(function (e) {
      orderTableOrderBy('fund_orders.updated_at');
    });

    var orderOrderBy = "";
    var orderOrderDirection = "";
    var searchOrderValue = "";

    $( "#form_order_search" ).submit(function(e){
        e.preventDefault();
        //DESC
        searchOrderValue = $( "#search_order_value" ).val();
        searchOrder(1);
    });

    function orderTableOrderBy(by){
        if(orderOrderBy === by){
            if(orderOrderDirection === ""){
                orderOrderDirection = "DESC";
            }else{
                orderOrderDirection = "";
            }
        }else{
            orderOrderBy = by;
            orderOrderDirection = "";
        }
        searchOrder(1);
    }

    //Get Order Data

    function searchOrder(page){
        resultPage =  $( "#result_order_page" ).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/orders",
            type: 'post',
            data: { searchvalue : searchOrderValue, page : page, orderBy :orderOrderBy, orderDirection: orderOrderDirection,    resultPage: resultPage } ,
            success: function (data) {
                //Inicio
                var user = data.user;
                var orders = data.result;
                var currentsIn = data.in;
                var currentsOut = data.out;

                if(orders.length == 0){
                    $("#table_order_content").html("");
                    $('#table_order_content').append('<tr><td colspan="11">None</td></tr>');
                }else{
                    $("#table_order_content").html("");
                    for(i=0;i<  orders.length;i++)
                    {
                        var order = orders[i];
                        var currentIn = currentsIn[i];
                        var currentOut = currentsOut[i];
                        // we have to make in steps to add the onclick event
                        var rowResult = $( '<tr></tr>');
                        var colvalue_1 = $( '<td class="col-sm-12 col-md-2">'+  currentOut.symbol +'</td>');
                        var colvalue_2 = $( '<td class="col-sm-12 col-md-2">'+ formatNumber.num( order.out_amount ) +'</td>');
                        var colvalue_3 = $( '<td class="col-sm-12 col-md-2">'+  order.rate +'</td>');
                        var colvalue_4 = $( '<td class="col-sm-12 col-md-2">'+  order.fee  +'</td>');
                        var colvalue_5 = $( '<td class="col-sm-12 col-md-2">'+  currentIn.symbol +'</td>');
                        var colvalue_6 = $( '<td class="col-sm-12 col-md-2">'+ formatNumber.num( order.in_amount ) +'</td>');
                        var colvalue_7 = $( '<td class="col-sm-12 col-md-2">'+    +'</td>');
                        var colvalue_8 = $( '<td class="col-sm-12 col-md-2">'+ order.reference  +'</td>');
                        var colvalue_9 = $( '<td class="col-sm-12 col-md-2">'+   order.created_at  +'</td>');
                        var colvalue_10 = $( '<td class="col-sm-12 col-md-2">'+active(order.confirmed)+'</td>');

                        var colvalue_11 = $( '<td class="col-sm-12 col-md-2"></td>');
                        var printbut = $("<button type='button' name='button' id='withPrint'>Receipt</button>");
                        printRecipient(user, order, currentOut.symbol , 'withdraw', printbut);
                        colvalue_11.append(printbut);
                        rowResult.append(colvalue_1);
                        rowResult.append(colvalue_2);
                        rowResult.append(colvalue_3);
                        rowResult.append(colvalue_4);
                        rowResult.append(colvalue_5);
                        rowResult.append(colvalue_6);
                        rowResult.append(colvalue_8);
                        rowResult.append(colvalue_9);
                        rowResult.append(colvalue_10);
                        rowResult.append(colvalue_11);
                        $("#table_order_content").append(rowResult);
                    }
                    $("#table_order_pagination").html("");
                    page = parseInt(data.page);
                    var total = data.total;
                    var resultPage =  $( "#result_order_page" ).val();
                    var totalPages = Math.ceil(total / resultPage);
                    if(page === 1){
                        maxPage = page + 2;
                        totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_order pages">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageButton(pagebutton);
                        }
                        $("#table_order_pagination").append(pageList);
                    }else if(page === totalPages){
                        page = page - 2;
                        if(page < 1){
                            page = 1;
                        }
                        totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_order pages">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageButton(pagebutton);
                        }
                        $("#table_order_pagination").append(pageList);
                    }else{
                        page = page - 2;
                        if(page < 1){
                            page = 1;
                        }
                        totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_order pages">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageOButton(pagebutton);
                        }

                        $("#table_order_pagination").append(pageList);
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

    function addPageOButton(pagebutton){
        pagebutton.click(function(){
            page = $(this).text();
            searchOrder(page);
        })
    }

    $('#result_order_page').change(function(){
        $('#form_order_search').trigger("submit");
    })

    $('#form_order_search').trigger("submit");
    selectCurrencyOrder('#btnBTC', 'BTC');
    selectCurrencyOrder('#btnETH', 'ETH');
    selectCurrencyOrder('#btnLTC', 'LTC');
    $('#btnBTC').trigger('click');

    /*Search User Table*/

    $('#table_user_header_name').click(function (e) {
      orderTableUserBy('name');
    });

     $('#table_user_header_username').click(function (e) {
      orderTableUserBy('username');
    });

    $('#table_user_header_email').click(function (e) {
      orderTableUserBy('email');
    });
    $('#table_user_header_date').click(function (e) {
      orderTableUserBy('created_at');
    });
    $('#table_user_header_update').click(function (e) {
      orderTableUserBy('updated_at');
    });
    $('#table_user_header_roles').click(function (e) {
      orderTableUserBy('');
    });

    var orderUserBy = "";
    var orderUserDirection = "";
    var searchUserValue = "";

    $( "#form_user_search" ).submit(function(e){
        e.preventDefault();
        //DESC
        searchUserValue = $( "#search_user_value" ).val();
        searchUser(1);
    });

    function orderTableUserBy(by){
        if(orderUserBy === by){
            if(orderUserDirection === ""){
                orderUserDirection = "DESC";
            }else{
                orderUserDirection = "";
            }
        }else{
            orderUserBy = by;
            orderUserDirection = "";
        }
        searchUser(1);
    }

    //Get Withdraw Data

    function searchUser(page){
        resultPage =  $( "#result_user_page" ).val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/users",
            type: 'post',
            data: { searchvalue : searchUserValue, page : page, orderBy :orderUserBy, orderDirection: orderUserDirection,    resultPage: resultPage } ,
            success: function (data) {
                //Inicio
                var users = data.result;

                if(users.length == 0){
                    $("#table_user_content").html("");
                    $('#table_user_content').append('<tr><td colspan="7">None</td></tr>');
                }else{
                    $("#table_user_content").html("");
                    for(i=0;i < users.length;i++)
                    {
                        var user = users[i];
                        // we have to make in steps to add the onclick event
                        var rowResult = $( '<tr></tr>');
                        var colvalue_1 = $( '<td class="col-sm-12 col-md-2">'+  user.name +'</td>');
                        var colvalue_2 = $( '<td class="col-sm-12 col-md-2">'+ user.username +'</td>');
                        var colvalue_3 = $( '<td class="col-sm-12 col-md-2">'+  user.email  +'</td>');
                        var colvalue_4 = $( '<td class="col-sm-12 col-md-2">'+  +'</td>');
                        var colvalue_5 = $( '<td class="col-sm-12 col-md-2">'+  user.created_at  +'</td>');
                        var colvalue_6 = $( '<td class="col-sm-12 col-md-2">'+  user.updated_at  +'</td>');
                        var colvalue_7 = $( '<td class="col-sm-12 col-md-2"></td>');

                        rowResult.append(colvalue_1);
                        rowResult.append(colvalue_2);
                        rowResult.append(colvalue_3);
                        rowResult.append(colvalue_4);
                        rowResult.append(colvalue_5);
                        rowResult.append(colvalue_6);
                        rowResult.append(colvalue_7);
                        $("#table_user_content").append(rowResult);
                    }
                    $("#table_user_pagination").html("");

                    page = parseInt(data.page);
                    var total = data.total;
                    var resultPage =  $( "#result_user_page" ).val();
                    var totalPages = Math.ceil(total / resultPage);
                    if(page === 1){
                        maxPage = page + 2;
                        totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_user pages">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageUButton(pagebutton);
                        }
                        $("#table_user_pagination").append(pageList);
                    }else if(page === totalPages){
                        page = page - 2;
                        if(page < 1){
                            page = 1;
                        }
                        totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_user pages">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageUButton(pagebutton);
                        }
                        $("#table_user_pagination").append(pageList);
                    }else{
                        page = page - 2;
                        if(page < 1){
                            page = 1;
                        }
                        totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                        var pageList = $( '<ul class="pagination"></ul>');
                        for(i = page ; i <= totalPages; i++){
                            pagebutton = $( '<li class="page_user pages">'+ i +'</li>');
                            pageList.append(pagebutton);
                            addPageUButton(pagebutton);
                        }

                        $("#table_user_pagination").append(pageList);
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

    function addPageUButton(pagebutton){
        pagebutton.click(function(){
            page = $(this).text();
            searchUser(page);
        })
    }

    $('#result_user_page').change(function(){
        $('#form_user_search').trigger("submit");
    })

    $('#form_user_search').trigger("submit");

    $('.btn-create').click(function(){
        box = $("<div class='Modal' id='userModal' style='display:none;'><div class='modalContent' id='modalCreateUser'><h3>New User</h3><form class='UserForm' id='UserForm' enctype='multipart/form-data' ></form></div></div>");
        alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Withdraw</strong></div>');
        inputN = $('<div><label for="name">Name<label></div><div><input id="name" name="name" type="text" class="form-control" placeholder="Name" required></div>');
        inputL = $('<div><label for="lastname">Last Name<label></div><div><input id="lastname" name="lastname" type="text" class="form-control" placeholder="Last Name" required></div>');
        inputU = $('<div><label for="username">Username<label></div><div><input id="username" name="username" type="text" class="form-control" placeholder="Username" required></div>');
        inputE = $('<div><label for="email">Email<label></div><div><input id="email" name="email" type="text" class="form-control" placeholder="Email" required></div>');
        inputP = $('<div><label for="password">Password<label></div><div><input id="password" name="password" type="password" class="form-control" placeholder="Password" required></div>');
        selectR = $('<div><label for="role" >Role<label><div id="roles" style="height:fit-content;" class="form-control"></div>');
        selectC = $('<div id="clientBox" style="display:none;"><div><label for="selectc" >Client<label></div><div><select id="client" class="form-control" name="selectc"></select></div>');

        $('#rightContent').append(box);
        $('#UserForm').append(alert);
        $('#UserForm').append(inputN);
        $('#UserForm').append(inputL);
        $('#UserForm').append(inputU);
        $('#UserForm').append(inputE);
        $('#UserForm').append(inputP);
        $('#UserForm').append(selectR);
        $('#UserForm').append(selectC);

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/users/roles",
            type: 'post',
            datatype: 'json',
            success: function (data) {
                //Inicio
                roles = data.data;
                for(i=0;i < roles.length;i++)
                {
                    var role = roles[i];
                    var label = $('<label id="labelr'+i+'" class="RoleLabel" >'+ role.name + '</label>');
                    var input = $('<input class="roles" type="checkbox" name="role" value="'+ role.id +'"/>');
                    $('#roles').append('<div class="checkRoles'+i+' checkbox-inline" title="'+ role.description +'"></div>');
                    userClient(input);
                    $('.checkRoles'+i).append(label);
                    $('#labelr'+i).prepend(input);

                }
            },
            // Fin
            error: function (error) {
                ReadError(error);
            }
        })

        $('#UserForm').append("<div id='userButts'></div>");
        clsbut = $("<span class='close'>&times;</span>");
        closeButton(clsbut, '.Modal');
        makeBut = $("<button type='button' name='button' id='userCont'>Make</button>");
        addMakeuserButton(makeBut);
        $('#modalCreateUser').prepend(clsbut);
        $('#userButts').append(makeBut);
        $('.Modal').css('display', 'block');
    });

    function userClient(location){
        location.click(function(){
            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
                $('#clientBox').hide();
            }else{
                role = $(this).val();
                $(this).addClass('selected');
                if(role == 4 || role == 5){
                    var rtoken = 0;
                    (role==4) ? rtoken = 3 : rtoken = 6;
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "/users/clients",
                        type: 'post',
                        data: {role: rtoken},
                        datatype: 'json',
                        success: function (data) {
                            //Inicio
                            clients = data.data;
                            for(i=0;i < clients.length;i++)
                            {
                                var client = clients[i];
                                $('#client').append('<option class="clients" value="'+ client.id +'">' +client.name+'</option>');
                                $('.clientBox').show();
                            }
                        },
                        // Fin
                        error: function (error) {
                            ReadError(error);
                        }
                    })
                }
            }

        });
    }

    function addMakeuserButton(makeBut){
        jQuery.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) || /^[a-z\s]+$/i.test(value);
        }, "Only alphabetical characters");
        jQuery.validator.addMethod("username", function(value, element) {
            return this.optional(element) || /^[a-z\s\d]+$/i.test(value);
        }, "Only alphabetical characters and numbers");
        jQuery.validator.addMethod("password", function(value, element) {
            return this.optional(element) || /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/i.test(value);
        }, "please introduce at least one capital letter, lower letter, and number, minimun 6 characters");
        $('#UserForm').validate({
            rules: {
                name:{
                    required: true,
                    minlength: 2,
                    lettersonly: true,
                },
                lastname:{
                    required: true,
                    minlength: 2,
                    lettersonly: true,
                },
                username:{
                    required: true,
                    minlength: 4,
                    username: true,
                },
                email:{
                    required: true,
                    email: true,
                },
                password:{
                    required:true,
                    password:true,
                },
                role:{
                    required: true,
                },
            },
                messages:{
                    role: 'Please select at least one role',
                },

        });
        makeBut.click(function(e){
            if($('#UserForm').valid()){
                alterForm('#UserForm', true);
                $('#userCont').hide();
                $('.alert').show();
                confirmBut = $("<button type='button' name='button' id='userConf'>Confirm</button>");
                backBut = $("<button type='button' name='button' id='userBack'>Back</button>");
                backButton(backBut, '#UserForm', 'user');
                confirmuserButton(confirmBut);
                $('#userButts').append(confirmBut);
                $('#userButts').append(backBut);

            }
        })
        function confirmuserButton(confirmBut){
            confirmBut.click(function(){

                    name = $('#name').val();
                    lastname = $('#lastname').val();
                    username = $('#username').val();
                    email = $('#email').val();
                    password = $('#password').val();
                    var role = [];
                    $('input[name="role"]').each(function(){
                        if($(this).is(':checked')){
                            role.push($(this).val());
                        }
                    });

                    $.ajax({

                        headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                        url: '/user/create',
                        type: 'POST',
                        dataType: "json",
                        data: {name: name, lastname: lastname, username: username, email:email, password:password, roles:role},
                        success: function(data){
                            $('#form_user_search').trigger("submit");
                            closeModal('#modalCreateUser');
                        }
                    })
            })
        }
    }

});

/***/ })

/******/ });
