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
        box = "<div class='Modal' id='depositModal' style='display:none;'><div class='modalContent' id='modalDeposit'><h3>Deposit</h3><form class='FundForm' id='DepositForm' method='POST' enctype='multipart/form-data'></form></div></div>";
        $('#rightContent').append(box);
        $('#DepositForm').append("<label for='currency'>Currency</label><select id='currency' class='form-control' name='currency'><option value='VEF'>Bolivares</option><option value='USD'>Dollar</option><option value='BTC'>Bitcoin</option><option value='ETH'>Ethereum</option><option value='LTC'>LiteCoin</option></select>");
        $('#DepositForm').append("<label for='amount'>Amount</label><input id='amount' name='amount' type='text' class='form-control' required>");
        $('#DepositForm').append("<label for='reference'>Reference</label><input id='reference' name='reference' type='text' class='form-control' required>");
        $('#DepositForm').append("<label for='file'>File</label><input id='file' name='file' type='file' class='custom-file-input' required>");

        $('#depositModal').show();

    });
    $('#passwordBut').click(function () {
        $('.passwordField').slideToggle();
    });

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

    $.extend({
        xResponse: function(select) {
            // local var
            var price = null;
            // jQuery ajax
            $.ajax({
                url: "https://api.coinbase.com/v2/exchange-rates?currency=" + select,
                type: 'GET',
                dataType: "json",
                async: false,
                success: function(coins) {
                            price = parseFloat(coins.data.rates["USD"]);
                    }
            });
            // Return the response text
            return price;
        }
    });

    function balanceDeposits(){
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
                $('#unconfirmed').append('<p>BsF.'+vefut+'</p><p>$'+usdut+'</p><p>BTC '+btcut+' ~ $'+ (btcut * btcprice).toFixed(2) +'</p><p>LTC '+ltcut+' ~ $'+ (ltcut * ltcprice).toFixed(2) +'</p><p>ETH '+ethut+' ~ $'+ (ethut * ethprice).toFixed(2) +'</p>');
                $('#confirmed').append('<p>BsF.'+vefct+'</p><p>$'+usdct+'</p><p>BTC '+btcct+' ~ $'+ (btcct * btcprice).toFixed(2) +'</p><p>LTC '+ltcct+' ~ $'+ (ltcct * ltcprice).toFixed(2) +'</p><p>ETH '+ethct+' ~ $'+ (ethct * ethprice).toFixed(2) +'</p>');
                for( i = 0; i < data.deposit[1].length; i++){
                    $('#depositsTable').append('<tr><td>'+ Currency(data.deposit[1][i].currency_id) +'</td><td>'+ data.deposit[1][i].amount +'</td><td>'+ data.deposit[1][i].comment +'</td><td>'+ data.deposit[1][i].created_at +'</td><td>No</td><td></td></tr>');
                }
                for( i = 0; i < data.deposit[0].length; i++){
                    $('#depositsTable').append('<tr><td>'+ Currency(data.deposit[0][i].currency_id) +'</td><td>'+ data.deposit[0][i].amount +'</td><td>'+ data.deposit[0][i].comment +'</td><td>'+ data.deposit[0][i].created_at +'</td><td>Yes</td><td>'+ data.deposit[0][i].updated_at + '</td></tr>');
                }

                for( i = 0; i < data.withdraw[1].length; i++){
                    $('#depositsTable').append('<tr><td>'+ Currency(data.withdraw[1][i].currency_id) +'</td><td>'+ data.withdraw[1][i].amount +'</td><td>'+ data.withdraw[1][i].comment +'</td><td>'+ data.withdraw[1][i].created_at +'</td><td>No</td><td></td></tr>');
                }
                for( i = 0; i < data.withdraw[0].length; i++){
                    $('#depositsTable').append('<tr><td>'+ Currency(data.withdraw[0][i].currency_id) +'</td><td>'+ data.withdraw[0][i].amount +'</td><td>'+ data.withdraw[0][i].comment +'</td><td>'+ data.withdraw[0][i].created_at +'</td><td>Yes</td><td>'+ data.withdraw[0][i].updated_at + '</td></tr>');
                }


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

    balanceDeposits();
});

/***/ })

/******/ });
