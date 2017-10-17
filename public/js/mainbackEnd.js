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
});

/***/ })

/******/ });