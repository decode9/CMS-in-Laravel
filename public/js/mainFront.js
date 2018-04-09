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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ({

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(42);


/***/ }),

/***/ 42:
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

    $window = $('window');

    $('.parallax').each(function () {
        var $scroll = $(this);

        $('window').scroll(function () {
            var yPos = -($window.scrollTop() / $scroll.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $scroll.css({ backgroundPosition: coords });
        });
    });
    $('#SendContact').click(function () {
        name = $('#name').val();
        email = $('#email').val();
        phone = $('#phone').val();
        address = $('#address').val();
        subject = $('#subject').val();
        message = $('#message').val();
        token = document.getElementsByName('_token').value;
        $.ajax({
            type: "POST",
            url: 'mailcontact',
            data: { name: name, email: email, phone: phone, address: address, message: message, subject: subject, _token: token },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function success(data) {
                $('#success').show();
            },
            error: function error() {
                $('#error').show();
            }
        });
    });
    plus = 1;
    $.ajax({
        type: "GET",
        url: "https://api.coinmarketcap.com/v1/ticker/?limit=20",
        datatype: "json",
        success: function success(coins) {

            for (i = 0; i < coins.length; i++) {
                if (!(coins[i].name == "Bitcoin Cash")) {
                    Name = coins[i].name + " (" + coins[i].symbol + ")";
                    price = "$" + coins[i].price_usd + " USD" + " <span id='stats" + plus + "'> (" + coins[i].percent_change_24h + "%) </span>";
                    upDown = parseFloat(coins[i].percent_change_24h);

                    trace = "<p style='float:left; margin: 6px 20px'>" + Name + " " + price + "</p>";

                    $('.mover-1').append(trace);

                    if (upDown > 0) {
                        $('#stats' + plus).css('color', "green");
                    } else {
                        $('#stats' + plus).css('color', "red");
                    }
                    plus++;
                }
            }
        }
    });
});

/***/ })

/******/ });