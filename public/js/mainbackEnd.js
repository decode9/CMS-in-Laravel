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

/*****************************************************************/
/*****************************************************************/
/** Javascript Archive for KryptoEnterprise Backend Web System  **/
/** This code was development for one person in the begin       **/
/** But the idea is colaborate and make it bigger and better    **/
/** For that reason comment your code and put your name, City   **/
/** begin of line and end of line of your code.                 **/
/** Thanks for coding                                           **/
/**                                                             **/
/** 1.- Jorge Bastidas - Caracas, Venezuela - 13 to 2742        **/
/*****************************************************************/
/*****************************************************************/

/* Jorge Bastidas Code */

$(document).ready(function () {

    /* Global PathName Variable */
    var pathname = window.location.pathname;

    /*Begin Menu Function BackEnd*/

    /*Click item Menu for slideToggle*/
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

    /*Open and Close Menu Tab*/
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

    /* END Menu Functions BackEnd */

    /* Begin Common Functions */

    /* Read File URL */
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

    /*Close Button For Close a modal Box*/
    function closeButton(clsbut, modal) {
        clsbut.click(function () {
            $(modal).remove();
        });
    }

    /* Alter Formulary for verification Process */
    function alterForm(form, change) {
        $(form + ' input, ' + form + ' select').each(function (index) {
            input = $(this);
            if (change == true) {
                input.attr('disabled', change);
            } else {
                input.removeAttr('disabled');
            }
        });
    }

    /* Back Button For Rewrite Data Storage */
    function backButton(backBut, form, target) {
        backBut.click(function () {
            alterForm(form, false);
            $('#' + target + 'Conf').remove();
            $('#' + target + 'Back').remove();
            $('#' + target + 'Cont').show();
            $('#' + target + 'Pass').show();
        });
    }

    /*Currency Prices API, ON TEST*/
    function currencyPrice(select, callback) {
        $.ajax({
            url: "https://api.coinbase.com/v2/exchange-rates?currency=" + select,
            type: 'GET',
            dataType: "json",
            success: function success(coins) {
                callback(parseFloat(coins.data.rates["USD"]));
            }
        });
    }

    $.extend({
        xResponse: function xResponse(select) {
            // jQuery ajax
            var prices = null;
            $.ajax({
                url: "https://api.coinbase.com/v2/exchange-rates?currency=" + select,
                type: 'GET',
                dataType: "json",
                async: false,
                success: function success(coins) {
                    prices = parseFloat(coins.data.rates["USD"]);
                }
            });
            // Return the response text
            return prices;
        }
    });

    /* Format Number For Amounts*/
    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear: function formatear(num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return this.simbol + splitLeft + splitRight;
        },
        num: function num(_num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(_num);
        }
        /* Applicate formatnumber function to an input */
    };function formatInput(input) {
        $(input).change(function () {
            value = $(this).val();
            val = formatNumber.num(value);
            $(this).val(val);
        });
    }

    /* Selection of currency Symbol By ID (OLD USE THIS IS NOT APPLICABLE ANYMORE) */
    /*function Currency(id){
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
    }*/

    /* Status Of a fund (OLD USE THIS IS NOT APPLICABLE ANYMORE) */
    /*function active(act){
        if(act){
            return 'Yes';
        }else{
            return 'No';
        }
    }*/

    /* CloseModal Inmediatly */
    function closeModal(modal) {
        $(modal).remove();
    }

    /* Operation Modal Print, Modal for prints recipients */

    function opModalPrint(message, data, symbol, user, type) {
        modal = "<div class='Modal' id='opModal' style='display:none;'><div class='modalContent' id='modalop'><h3>Success</h3><p>" + message + "</p></div></div>";
        var printbut = $("<button type='button' name='button' id='opPrint'>Receipt</button>");
        printRecipient(user, data, symbol, type, printbut);
        clsbut = $("<span class='close'>&times;</span>");
        closeButton(clsbut, '#opModal');
        $('#rightContent').append(modal);
        $('#modalop').prepend(clsbut);
        $('#modalop').append(printbut);
        $('#opModal').show();
    }

    /* Print Recipients deposits or withdraw Recipients */

    function printRecipient(user, data, symbol, type, printbut) {
        printbut.click(function () {
            if (type == "deposit") {
                table = "<table style='width: 300px; text-align: center; border: 1px solid black; vertical-align: middle; margin: 0 auto' ><thead><tr><td><img src='/img/Logoblanco.png' width='100px'/></td><td><h2>Deposit Receipt</h2></td></tr></thead><tbody ><tr><td style='padding: 10px 0px;' >Currency</td><td style='padding: 10px 0px;'>" + symbol + "</td></tr><tr><td style='padding: 10px 0px;'>Amount</td><td style='padding: 10px 0px;'>" + formatNumber.num(data.amount) + "</td></tr><tr><td style='padding: 10px 0px;'>Reference</td><td style='padding: 10px 0px;'>" + data.comment + "</td></tr><tr><td style='padding: 10px 0px;'>From</td><td style='padding: 10px 0px;'>" + user + "</td></tr><tr><td style='padding: 10px 0px;'>To</td><td style='padding: 10px 0px;'>Krypto Group</td></tr></tbody></table>";
            } else {
                table = "<table style='width: 300px; text-align: center; border: 1px solid black; vertical-align: middle; margin: 0 auto' ><thead><tr><td><img src='/img/Logoblanco.png' width='100px'/></td><td><h2>Withdraw Receipt</h2></td></tr></thead><tbody ><tr><td style='padding: 10px 0px;' >Currency</td><td style='padding: 10px 0px;'>" + symbol + "</td></tr><tr><td style='padding: 10px 0px;'>Amount</td><td style='padding: 10px 0px;'>" + formatNumber.num(data.amount) + "</td></tr><tr><td style='padding: 10px 0px;'>Reference</td><td style='padding: 10px 0px;'>" + data.comment + "</td></tr><tr><td style='padding: 10px 0px;'>From</td><td style='padding: 10px 0px;'>Krypto Group</td></tr><tr><td style='padding: 10px 0px;'>To</td><td style='padding: 10px 0px;'>" + user + "</td></tr></tbody></table>";
            }

            newWin = window.open("");
            newWin.document.write(table);
            newWin.print();
            newWin.close();
        });
    }

    /* End Common Functions */

    /*User Functions*/

    if (pathname.toString() == '/users') {
        var orderTableUserBy = function orderTableUserBy(by) {
            if (orderUserBy === by) {
                if (orderUserDirection === "") {
                    orderUserDirection = "DESC";
                } else {
                    orderUserDirection = "";
                }
            } else {
                orderUserBy = by;
                orderUserDirection = "";
            }
            searchUser(1);
        };

        //Get User Data

        var searchUser = function searchUser(page) {
            resultPage = $("#result_user_page").val();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/users",
                type: 'post',
                data: { searchvalue: searchUserValue, page: page, orderBy: orderUserBy, orderDirection: orderUserDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var users = data.result;
                    var roles = data.roles;
                    if (users.length == 0) {
                        $("#table_user_content").html("");
                        $('#table_user_content').append('<tr><td colspan="7">None</td></tr>');
                    } else {
                        $("#table_user_content").html("");
                        for (i = 0; i < users.length; i++) {
                            var user = users[i];
                            var role = roles[i];

                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + user.name + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + user.username + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + user.email + '</td>');

                            var colvalue_4 = $('<td class="col-sm-12 col-md-2"></td>');
                            for (a = 0; a < role.length; a++) {
                                var rol = role[a];
                                colvalue_4.append(rol.name + '<br/>');
                            }
                            editBut = $('<button type="button" id="editBut">Edit</button>');
                            delBut = $('<button type="button" id="delBut">Delete</button>');
                            // we have to make in steps to add the onclick event
                            addEditUserClick(editBut, user, role);
                            addMakeDuserButton(delBut, user);
                            var colvalue_5 = $('<td class="col-sm-12 col-md-2">' + user.created_at + '</td>');
                            var colvalue_6 = $('<td class="col-sm-12 col-md-2">' + user.updated_at + '</td>');
                            var colvalue_7 = $('<td class="col-sm-12 col-md-2"></td>');

                            colvalue_7.append(editBut);
                            colvalue_7.append(delBut);

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
                        var resultPage = $("#result_user_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;

                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_user pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageUButton(pagebutton);
                            }

                            $("#table_user_pagination").append(pageList);
                        } else if (page === totalPages) {

                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_user pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageUButton(pagebutton);
                            }

                            $("#table_user_pagination").append(pageList);
                        } else {

                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {

                                pagebutton = $('<li class="page_user pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageUButton(pagebutton);
                            }
                            $("#table_user_pagination").append(pageList);
                        }
                    }
                    // Put the data into the element you care about.
                },
                // Fin
                error: function error(_error) {
                    ReadError(_error);
                }
            });
        };

        var addPageUButton = function addPageUButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchUser(page);
            });
        };

        /* Modal Create User */

        /*List Users for Clients*/
        var userClient = function userClient(location) {
            location.click(function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('#clientBox').hide();
                } else {
                    $('#client').html('');
                    role = $(this).val();
                    $(this).addClass('selected');
                    if (role == 4 || role == 5) {
                        var rtoken = 0;
                        role == 4 ? rtoken = 3 : rtoken = 6;
                        $.ajax({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            url: "/users/clients",
                            type: 'post',
                            data: { role: rtoken },
                            datatype: 'json',
                            success: function success(data) {
                                //Inicio
                                clients = data.data;
                                for (i = 0; i < clients.length; i++) {
                                    var client = clients[i];
                                    $('#client').append('<option class="clients" value="' + client.id + '">' + client.name + '</option>');
                                }
                                $('#clientBox').show();
                            },
                            // Fin
                            error: function error(_error3) {
                                ReadError(_error3);
                            }
                        });
                    }
                }
            });
        };

        /*Make Button For Create User*/


        var addMakeuserButton = function addMakeuserButton(makeBut) {
            jQuery.validator.addMethod("lettersonly", function (value, element) {
                return this.optional(element) || /^[a-z\s]+$/i.test(value);
            }, "Only alphabetical characters");

            jQuery.validator.addMethod("username", function (value, element) {
                return this.optional(element) || /^[a-z\s\d]+$/i.test(value);
            }, "Only alphabetical characters and numbers");

            jQuery.validator.addMethod("password", function (value, element) {
                return this.optional(element) || /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/i.test(value);
            }, "please introduce at least one capital letter, lower letter, and number, minimun 6 characters");

            $('#password').change(function () {
                var password = $(this).val();
            });

            $('#UserForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                        lettersonly: true
                    },
                    lastname: {
                        required: true,
                        minlength: 2,
                        lettersonly: true
                    },
                    username: {
                        required: true,
                        minlength: 4,
                        username: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        password: true
                    },
                    passwordConf: {
                        required: true,
                        password: true,
                        equalTo: "#password"
                    },
                    role: {
                        required: true
                    }
                },
                messages: {
                    role: 'Please select at least one role'
                }

            });

            makeBut.click(function (e) {
                if ($('#UserForm').valid()) {

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
            });
        };

        /* Confirm User For Creation */


        var confirmuserButton = function confirmuserButton(confirmBut) {
            confirmBut.click(function () {

                name = $('#name').val();
                lastname = $('#lastname').val();
                username = $('#username').val();
                email = $('#email').val();
                password = $('#password').val();
                confirm = $('#passwordConf').val();
                client = $('#client').val();
                var role = [];
                $('input[name="role"]').each(function () {
                    if ($(this).is(':checked')) {
                        role.push($(this).val());
                    }
                });

                $.ajax({

                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/users/create',
                    type: 'POST',
                    dataType: "json",
                    data: { name: name, lastname: lastname, username: username, email: email, password: password, password_confirmation: confirm, roles: role, client: client },
                    success: function success(data) {
                        $('#form_user_search').trigger("submit");
                        closeModal('.Modal');
                    }
                });
            });
        };

        /*Edit Button With Modal edition for Users*/


        var addEditUserClick = function addEditUserClick(buttonEdit, user, rols) {
            var name = user.name.split(' ');
            buttonEdit.click(function () {
                box = $("<div class='Modal' id='userModal' style='display:none;'><div class='modalContent' id='modalUpdateUser'><h3>Update User</h3><form class='UserForm' id='UserForm' enctype='multipart/form-data' ></form></div></div>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the User</strong></div>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="' + user.id + '" required>');
                inputN = $('<div><label for="name">Name<label></div><div><input id="name" name="name" type="text" class="form-control" placeholder="Name" value="' + name[0] + '" required></div>');
                inputL = $('<div><label for="lastname">Last Name<label></div><div><input id="lastname" name="lastname" type="text" class="form-control" placeholder="Last Name" value="' + name[1] + '" required></div>');
                inputU = $('<div><label for="username">Username<label></div><div><input id="username" name="username" type="text" class="form-control" placeholder="Username" value="' + user.username + '" required></div>');
                inputE = $('<div><label for="email">Email<label></div><div><input id="email" name="email" type="text" class="form-control" placeholder="Email" value="' + user.email + '" required></div>');
                inputP = $('<div class="PasswordBox" style="display:none;"><div><label for="password">Password<label></div><div><input id="password" name="password" type="password" class="form-control" placeholder="Password" required></div></div>');
                inputPC = $('<div class="PasswordBox" style="display:none;"><div><label for="passwordConf">Confirm Password<label></div><div><input id="passwordConf" name="passwordConf" type="password" class="form-control" placeholder="Confirm Password" required></div></div>');
                selectR = $('<div><label for="role" >Role<label><div id="roles" style="height:fit-content;" class="form-control"></div>');
                selectC = $('<div id="clientBox" style="display:none;"><div><label for="selectc" >Client<label></div><div><select id="client" class="form-control" name="selectc"></select></div>');

                $('#rightContent').append(box);
                $('#UserForm').append(alert);
                $('#UserForm').append(inputI);
                $('#UserForm').append(inputN);
                $('#UserForm').append(inputL);
                $('#UserForm').append(inputU);
                $('#UserForm').append(inputE);
                $('#UserForm').append(inputP);
                $('#UserForm').append(inputPC);
                $('#UserForm').append(selectR);
                $('#UserForm').append(selectC);

                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/users/roles",
                    type: 'post',
                    datatype: 'json',
                    success: function success(data) {
                        //Inicio
                        roles = data.data;
                        for (i = 0; i < roles.length; i++) {
                            var role = roles[i];
                            var label = $('<label id="labelr' + i + '" class="RoleLabel" >' + role.name + '</label>');
                            var input = $('<input class="roles" id="role' + i + '" type="checkbox" name="role" value="' + role.id + '"/>');
                            $('#roles').append('<div class="checkRoles' + i + ' checkbox-inline" title="' + role.description + '"></div>');
                            userClient(input);
                            $('.checkRoles' + i).append(label);
                            $('#labelr' + i).prepend(input);
                            for (a = 0; a < rols.length; a++) {
                                rol = rols[a];
                                if (role.name == rol.name) {
                                    $('#role' + i).trigger('click');
                                }
                            }
                        }
                    },
                    // Fin
                    error: function error(_error4) {
                        ReadError(_error4);
                    }
                });

                $('#UserForm').append("<div id='userButts'></div>");
                clsbut = $("<span class='close'>&times;</span>");
                closeButton(clsbut, '.Modal');
                makeBut = $("<button type='button' name='button' id='userCont'>Make</button>");
                peBut = $("<button type='button' name='button' id='userPass'>Change Password</button>");
                passwordEditUser(peBut);
                addMakeEuserButton(makeBut);
                $('#modalUpdateUser').prepend(clsbut);
                $('#userButts').append(makeBut);
                $('#userButts').append(peBut);
                $('.Modal').css('display', 'block');
            });
        };

        /*Password Edition For Users*/


        var passwordEditUser = function passwordEditUser(pebutton) {
            pebutton.click(function () {
                $('.PasswordBox').toggle('slow');
            });
        };
        /* Make User Button For editing */


        var addMakeEuserButton = function addMakeEuserButton(makeBut) {
            jQuery.validator.addMethod("lettersonly", function (value, element) {
                return this.optional(element) || /^[a-z\s]+$/i.test(value);
            }, "Only alphabetical characters");
            jQuery.validator.addMethod("username", function (value, element) {
                return this.optional(element) || /^[a-z\s\d]+$/i.test(value);
            }, "Only alphabetical characters and numbers");
            jQuery.validator.addMethod("password", function (value, element) {
                return this.optional(element) || /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/i.test(value);
            }, "please introduce at least one capital letter, lower letter, and number, minimun 6 characters");

            $('#password').change(function () {
                var password = $(this).val();
            });

            $('#UserForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                        lettersonly: true
                    },
                    lastname: {
                        required: true,
                        minlength: 2,
                        lettersonly: true
                    },
                    username: {
                        required: true,
                        minlength: 4,
                        username: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        password: true
                    },
                    passwordConf: {
                        password: true,
                        equalTo: "#password"
                    },
                    role: {
                        required: true
                    }
                },
                messages: {
                    role: 'Please select at least one role'
                }

            });
            makeBut.click(function (e) {
                if ($('#UserForm').valid()) {
                    alterForm('#UserForm', true);
                    $('#userCont').hide();
                    $('#userPass').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' id='userConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' id='userBack'>Back</button>");
                    backButton(backBut, '#UserForm', 'user');
                    confirmEuserButton(confirmBut);
                    $('#userButts').append(confirmBut);
                    $('#userButts').append(backBut);
                }
            });
        };

        /* Confirm Button For Editing User */


        var confirmEuserButton = function confirmEuserButton(confirmBut) {
            confirmBut.click(function () {
                name = $('#name').val();
                lastname = $('#lastname').val();
                username = $('#username').val();
                email = $('#email').val();
                password = $('#password').val();
                confirm = $('#passwordConf').val();
                client = $('#client').val();
                id = $('#id').val();
                var role = [];
                $('input[name="role"]').each(function () {
                    if ($(this).is(':checked')) {
                        role.push($(this).val());
                    }
                });
                $.ajax({
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/users/update',
                    type: 'POST',
                    dataType: "json",
                    data: { id: id, name: name, lastname: lastname, username: username, email: email, password: password, password_confirmation: confirm, roles: role, client: client },
                    success: function success(data) {
                        $('#form_user_search').trigger("submit");
                        closeModal('.Modal');
                    }
                });
            });
        };

        /* Delete Function For User */


        var addMakeDuserButton = function addMakeDuserButton(delButt, user) {
            delButt.click(function () {
                box = $("<div class='Modal' id='userDModal' style='display:none;'><div class='modalContent' id='modalDeleteUser'><h3>Delete User</h3><form class='UserForm' id='UserForm' enctype='multipart/form-data' ></form></div></div>");
                alert = $('<div class="alert alert-warning" ><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Are You Sure for delete ' + user.name + ' user?</strong></div>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="' + user.id + '" required>');
                $('#rightContent').append(box);
                $('#UserForm').append(alert);
                $('#UserForm').append(inputI);

                $('#UserForm').append("<div id='userButts'></div>");
                clsbut = $("<span class='close'>&times;</span>");
                closeButton(clsbut, '.Modal');

                makeBut = $("<button type='button' name='button' id='userCont'>Delete</button>");
                peBut = $("<button type='button' name='button' id='userPass'>Back</button>");
                closeButton(peBut, '.Modal');
                DeleteUserButton(makeBut);

                $('#modalDeleteUser').prepend(clsbut);
                $('#userButts').append(makeBut);
                $('#userButts').append(peBut);
                $('.Modal').css('display', 'block');
            });
        };

        /* Confirmation Of User Deletion */


        var DeleteUserButton = function DeleteUserButton(delButt) {
            delButt.click(function () {
                id = $('#id').val();

                $.ajax({
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/users/delete',
                    type: 'POST',
                    dataType: "json",
                    data: { id: id },
                    success: function success(data) {
                        $('#form_user_search').trigger("submit");
                        closeModal('.Modal');
                    }
                });
            });
        };

        /*Execute Script*/


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

        var orderUserBy = "";
        var orderUserDirection = "";
        var searchUserValue = "";

        $("#form_user_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchUserValue = $("#search_user_value").val();
            searchUser(1);
        });

        $('.btn-create').click(function () {

            box = $("<div class='Modal' id='userModal' style='display:none;'><div class='modalContent' id='modalCreateUser'><h3>New User</h3><form class='UserForm' id='UserForm' enctype='multipart/form-data' ></form></div></div>");
            alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the User</strong></div>');
            inputN = $('<div><label for="name">Name<label></div><div><input id="name" name="name" type="text" class="form-control" placeholder="Name" required></div>');
            inputL = $('<div><label for="lastname">Last Name<label></div><div><input id="lastname" name="lastname" type="text" class="form-control" placeholder="Last Name" required></div>');
            inputU = $('<div><label for="username">Username<label></div><div><input id="username" name="username" type="text" class="form-control" placeholder="Username" required></div>');
            inputE = $('<div><label for="email">Email<label></div><div><input id="email" name="email" type="text" class="form-control" placeholder="Email" required></div>');
            inputP = $('<div><label for="password">Password<label></div><div><input id="password" name="password" type="password" class="form-control" placeholder="Password" required></div>');
            inputPC = $('<div><label for="passwordConf">Confirm Password<label></div><div><input id="passwordConf" name="passwordConf" type="password" class="form-control" placeholder="Confirm Password" required></div>');
            selectR = $('<div><label for="role" >Role<label><div id="roles" style="height:fit-content;" class="form-control"></div>');
            selectC = $('<div id="clientBox" style="display:none;"><div><label for="selectc" >Client<label></div><div><select id="client" class="form-control" name="selectc"></select></div>');

            $('#rightContent').append(box);
            $('#UserForm').append(alert);
            $('#UserForm').append(inputN);
            $('#UserForm').append(inputL);
            $('#UserForm').append(inputU);
            $('#UserForm').append(inputE);
            $('#UserForm').append(inputP);
            $('#UserForm').append(inputPC);
            $('#UserForm').append(selectR);
            $('#UserForm').append(selectC);

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/users/roles",
                type: 'post',
                datatype: 'json',
                success: function success(data) {
                    //Inicio
                    roles = data.data;
                    for (i = 0; i < roles.length; i++) {
                        var role = roles[i];
                        var label = $('<label id="labelr' + i + '" class="RoleLabel" >' + role.name + '</label>');
                        var input = $('<input class="roles" type="checkbox" name="role" value="' + role.id + '"/>');
                        $('#roles').append('<div class="checkRoles' + i + ' checkbox-inline" title="' + role.description + '"></div>');
                        userClient(input);
                        $('.checkRoles' + i).append(label);
                        $('#labelr' + i).prepend(input);
                    }
                },
                // Fin
                error: function error(_error2) {
                    ReadError(_error2);
                }
            });

            $('#UserForm').append("<div id='userButts'></div>");

            clsbut = $("<span class='close'>&times;</span>");
            closeButton(clsbut, '.Modal');

            makeBut = $("<button type='button' name='button' id='userCont'>Make</button>");
            addMakeuserButton(makeBut);

            $('#modalCreateUser').prepend(clsbut);

            $('#userButts').append(makeBut);

            $('.Modal').css('display', 'block');
        });$('#result_user_page').change(function () {
            $('#form_user_search').trigger("submit");
        });

        $('#form_user_search').trigger("submit");
    }

    /*End User Functions*/

    /*Begin Currency Functions*/

    if (pathname.toString() == '/currencies') {
        var orderTableCurrencyBy = function orderTableCurrencyBy(by) {
            if (orderCurrencyBy === by) {
                if (orderCurrencyDirection === "") {
                    orderCurrencyDirection = "DESC";
                } else {
                    orderCurrencyDirection = "";
                }
            } else {
                orderCurrencyBy = by;
                orderCurrencyDirection = "";
            }
            searchCurrency(1);
        };

        //Get Currency Data

        var searchCurrency = function searchCurrency(page) {
            resultPage = $("#result_currency_page").val();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/currencies",
                type: 'post',
                data: { searchvalue: searchCurrencyValue, page: page, orderBy: orderCurrencyBy, orderDirection: orderCurrencyDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var currencies = data.result;
                    if (currencies.length == 0) {
                        $("#table_currency_content").html("");
                        $('#table_currency_content').append('<tr><td colspan="6">None</td></tr>');
                    } else {
                        $("#table_currency_content").html("");
                        for (i = 0; i < currencies.length; i++) {
                            var currency = currencies[i];
                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + currency.name + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + currency.symbol + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + currency.type + '</td>');
                            var colvalue_4 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(currency.value) + '</td>');
                            var colvalue_5 = $('<td class="col-sm-12 col-md-2">' + currency.created_at + '</td>');
                            var colvalue_6 = $('<td class="col-sm-12 col-md-2">' + currency.updated_at + '</td>');
                            var colvalue_7 = $('<td class="col-sm-12 col-md-2"></td>');

                            editBut = $('<button type="button" id="editBut">Edit</button>');
                            delBut = $('<button type="button" id="delBut">Delete</button>');
                            addEditCurrencyClick(editBut, currency);
                            addMakeDcurrencyButton(delBut, currency);

                            colvalue_7.append(editBut);
                            colvalue_7.append(delBut);
                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);
                            rowResult.append(colvalue_5);
                            rowResult.append(colvalue_6);
                            rowResult.append(colvalue_7);

                            $("#table_currency_content").append(rowResult);
                        }

                        $("#table_currency_pagination").html("");
                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage = $("#result_currency_page").val();
                        var totalPages = Math.ceil(total / resultPage);
                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');
                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_currency pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageCButton(pagebutton);
                            }
                            $("#table_currency_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;
                            if (page < 1) {
                                page = 1;
                            }
                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');
                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_currency pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageCButton(pagebutton);
                            }
                            $("#table_currency_pagination").append(pageList);
                        } else {
                            page = page - 2;
                            if (page < 1) {
                                page = 1;
                            }
                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');
                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_currency pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageCButton(pagebutton);
                            }
                            $("#table_currency_pagination").append(pageList);
                        }
                    }
                    // Put the data into the element you care about.
                },
                // Fin
                error: function error(_error5) {
                    ReadError(_error5);
                }
            });
        };

        var addPageCButton = function addPageCButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchCurrency(page);
            });
        };

        /* Create Modal Button for Creation of currency*/


        /*Change between Input or Selection Value*/
        var changeValueCurrency = function changeValueCurrency(checkbox) {
            $(checkbox).click(function () {
                if (!$(this).hasClass('selected')) {
                    var value = $('<select id="value" class="form-control" name="selectv"></select>');
                    var types = ['coinmarketcap'];
                    for (i = 0; i < types.length; i++) {
                        var type = types[i];
                        option = $('<option value="' + type + '">' + type + '</option>');
                        value.append(option);
                    }
                    $('#valuechange').html('');
                    $('#valuechange').append(value);
                    $(this).addClass('selected');
                } else {
                    var value = $('<input id="value" name="value" type="text" class="form-control" placeholder="Value" required>');
                    $('#valuechange').html('');
                    $('#valuechange').append(value);
                    formatInput('#value');
                    $(this).removeClass('selected');
                }
            });
        };

        /*Add Make Button for currency Creation*/


        var addMakeCurrencyButton = function addMakeCurrencyButton(makeBut) {
            jQuery.validator.addMethod("lettersonly", function (value, element) {
                return this.optional(element) || /^[a-z\S]+$/i.test(value);
            }, "Only alphabetical characters");

            jQuery.validator.addMethod("amount", function (value, element) {
                return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
            }, 'Insert a valid format value please.');

            $('#CurrencyForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                        lettersonly: true
                    },
                    symbol: {
                        required: true,
                        minlength: 3,
                        maxlength: 3,
                        lettersonly: true
                    },
                    type: {
                        required: true
                    },
                    value: {
                        minlength: 3,
                        amount: true
                    }
                },
                messages: {
                    type: 'Please select one Type'
                }

            });
            makeBut.click(function (e) {
                if ($('#CurrencyForm').valid()) {
                    alterForm('#CurrencyForm', true);
                    $('#currnCont').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' id='currnConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' id='currnBack'>Back</button>");
                    backButton(backBut, '#CurrencyForm', 'currn');
                    confirmcurrencyButton(confirmBut);
                    $('#currnButts').append(confirmBut);
                    $('#currnButts').append(backBut);
                }
            });
        };

        /*Add Confirm Button For Currency Creation*/


        var confirmcurrencyButton = function confirmcurrencyButton(confirmBut) {
            confirmBut.click(function () {

                name = $('#name').val();
                symbol = $('#symbol').val();
                type = $('#type').val();
                value = $('#value').val();
                if (value != 'coinmarketcap') {
                    value = value.replace(/,/g, '.');
                    value = parseFloat(value) * -1;
                }
                $.ajax({
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/create',
                    type: 'POST',
                    dataType: "json",
                    data: { name: name, symbol: symbol, type: type, value: value },
                    success: function success(data) {
                        $('#form_currency_search').trigger("submit");
                        closeModal('.Modal');
                    }
                });
            });
        };

        /*Add Edit Button With Modal For Editing Currency*/


        var addEditCurrencyClick = function addEditCurrencyClick(buttonEdit, currency) {
            buttonEdit.click(function () {

                box = $("<div class='Modal' id='currencyModal' style='display:none;'><div class='modalContent' id='modalUpdateCurrency'><h3>Update Currency</h3><form class='CurrencyForm' id='CurrencyForm' enctype='multipart/form-data' ></form></div></div>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Currency</strong></div>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="' + currency.id + '" required>');
                inputN = $('<div><label for="name">Name<label></div><div><input id="name" name="name" type="text" class="form-control" placeholder="Name" value="' + currency.name + '"  required></div>');
                inputS = $('<div><label for="symbol">Symbol<label></div><div><input id="symbol" name="symbol" type="text" class="form-control" placeholder="Symbol" value="' + currency.symbol + '"  required ></div>');
                selectT = $('<div><label for="type">Type<label></div><div><select id="type" class="form-control" name="selectt"></select></div>');
                inputA = $('<div><label for="value">Value<label></div><div id="valuechange"><input id="value" name="value" type="text" class="form-control" placeholder="Value" value="' + currency.value + '" required></div>');
                inputC = '<div class="checkbox-inline" title="Change between manual value or an API value"><label id="labelch" ><input class="changevalue" id="valuechanges" type="checkbox" name="chnge" value=""/> Change value selection</label></div>';

                types = ['Currency', 'Cryptocurrency', 'Token'];

                $('#rightContent').append(box);
                $('#CurrencyForm').append(alert);
                $('#CurrencyForm').append(inputI);
                $('#CurrencyForm').append(inputN);
                $('#CurrencyForm').append(inputS);
                $('#CurrencyForm').append(selectT);
                $('#CurrencyForm').append(inputA);
                $('#CurrencyForm').append(inputC);

                $('#valuechanges').click(function () {
                    if (!$(this).hasClass('selected')) {
                        var value = $('<select id="value" class="form-control" name="selectv"></select>');
                        var types2 = ['coinmarketcap'];
                        for (i = 0; i < types2.length; i++) {
                            var type2 = types2[i];
                            if (currency.value == type2) {
                                option = $('<option value="' + type2 + '" selected="selected" >' + type2 + '</option>');
                                value.append(option);
                            }
                            option = $('<option value="' + type2 + '" >' + type2 + '</option>');
                            value.append(option);
                        }
                        $('#valuechange').html('');
                        $('#valuechange').append(value);
                        $(this).addClass('selected');
                    } else {
                        var value = $('<input id="value" name="value" type="text" class="form-control" placeholder="Value" required>');
                        $('#valuechange').html('');
                        $('#valuechange').append(value);
                        formatInput('#value');
                        $(this).removeClass('selected');
                    }
                });
                formatInput('#value');

                if (!Number.isInteger(currency.value)) {
                    $('valuechanges').trigger('click');
                }

                for (i = 0; i < types.length; i++) {
                    type = types[i];
                    if (currency.type == type) {
                        option = $('<option value="' + type + '" selected="selected">' + type + '</option>');
                    } else {
                        option = $('<option value="' + type + '">' + type + '</option>');
                    }
                    $('#type').append(option);
                }

                $('#CurrencyForm').append("<div id='currnButts'></div>");

                clsbut = $("<span class='close'>&times;</span>");
                closeButton(clsbut, '.Modal');

                makeBut = $("<button type='button' name='button' id='currnCont'>Make</button>");
                addMakeEcurrencyButton(makeBut);

                $('#modalUpdateCurrency').prepend(clsbut);
                $('#currnButts').append(makeBut);
                $('.Modal').css('display', 'block');
            });
        };

        /*Add Make Button for Editing Currency*/


        var addMakeEcurrencyButton = function addMakeEcurrencyButton(makeBut) {
            jQuery.validator.addMethod("lettersonly", function (value, element) {
                return this.optional(element) || /^[a-z\S]+$/i.test(value);
            }, "Only alphabetical characters");

            jQuery.validator.addMethod("amount", function (value, element) {
                return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
            }, 'Insert a valid format value please.');

            $('#CurrencyForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                        lettersonly: true
                    },
                    symbol: {
                        required: true,
                        minlength: 2,
                        lettersonly: true
                    },
                    type: {
                        required: true
                    },
                    value: {
                        minlength: 3,
                        amount: true
                    }
                },
                messages: {
                    type: 'Please select one Type'
                }
            });
            makeBut.click(function (e) {
                if ($('#CurrencyForm').valid()) {
                    alterForm('#CurrencyForm', true);
                    $('#currnCont').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' id='currnConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' id='currnBack'>Back</button>");
                    backButton(backBut, '#CurrencyForm', 'currn');
                    confirmEcurrencyButton(confirmBut);
                    $('#currnButts').append(confirmBut);
                    $('#currnButts').append(backBut);
                }
            });
        };

        /*Add Confirm Button for Editing Currency*/


        var confirmEcurrencyButton = function confirmEcurrencyButton(confirmBut) {
            confirmBut.click(function () {

                id = $('#id').val();
                name = $('#name').val();
                symbol = $('#symbol').val();
                type = $('#type').val();
                value = $('#value').val();
                if (value != 'coinmarketcap') {
                    value = value.replace(/,/g, '.');
                    value = parseFloat(value);
                }
                console.log(value);

                $.ajax({
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/update',
                    type: 'POST',
                    dataType: "json",
                    data: { id: id, name: name, symbol: symbol, type: type, value: value },
                    success: function success(data) {
                        $('#form_currency_search').trigger("submit");
                        closeModal('.Modal');
                    }
                });
            });
        };

        /*Add Make Delete Button For Currency*/


        var addMakeDcurrencyButton = function addMakeDcurrencyButton(delButt, currency) {
            delButt.click(function () {

                box = $("<div class='Modal' id='userDModal' style='display:none;'><div class='modalContent' id='modalDeleteCurrency'><h3>Delete Currency</h3><form class='CurrencyForm' id='CurrencyForm' enctype='multipart/form-data' ></form></div></div>");
                alert = $('<div class="alert alert-warning" ><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Are You Sure for delete ' + currency.name + ' currency?</strong></div>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="' + currency.id + '" required>');

                $('#rightContent').append(box);
                $('#CurrencyForm').append(alert);
                $('#CurrencyForm').append(inputI);

                $('#CurrencyForm').append("<div id='currnButts'></div>");

                clsbut = $("<span class='close'>&times;</span>");
                closeButton(clsbut, '.Modal');

                makeBut = $("<button type='button' name='button' id='currnCont'>Delete</button>");
                peBut = $("<button type='button' name='button' id='currnPass'>Back</button>");
                closeButton(peBut, '.Modal');
                DeleteCurrencyButton(makeBut);

                $('#modalDeleteCurrency').prepend(clsbut);
                $('#currnButts').append(makeBut);
                $('#currnButts').append(peBut);
                $('.Modal').css('display', 'block');
            });
        };

        /*Delete Currency Confirm*/


        var DeleteCurrencyButton = function DeleteCurrencyButton(delButt) {
            delButt.click(function () {
                id = $('#id').val();

                $.ajax({
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/delete',
                    type: 'POST',
                    dataType: "json",
                    data: { id: id },
                    success: function success(data) {
                        $('#form_currency_search').trigger("submit");
                        closeModal('.Modal');
                    }
                });
            });
        };

        /*Execute The Script*/


        /*Search Currencies Table*/

        $('#table_currency_header_name').click(function (e) {
            orderTableCurrencyBy('name');
        });

        $('#table_currency_header_symbol').click(function (e) {
            orderTableCurrencyBy('symbol');
        });

        $('#table_currency_header_type').click(function (e) {
            orderTableCurrencyBy('type');
        });

        $('#table_currency_header_value').click(function (e) {
            orderTableCurrencyBy('value');
        });

        $('#table_currency_header_date').click(function (e) {
            orderTableCurrencyBy('created_at');
        });

        $('#table_currency_header_update').click(function (e) {
            orderTableCurrencyBy('updated_at');
        });

        var orderCurrencyBy = "";
        var orderCurrencyDirection = "";
        var searchCurrencyValue = "";

        $("#form_currency_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchCurrencyValue = $("#search_currency_value").val();
            searchCurrency(1);
        });

        $('.btn-create-Cu').click(function () {

            box = $("<div class='Modal' id='currencyModal' style='display:none;'><div class='modalContent' id='modalCreateCurrency'><h3>New Currency</h3><form class='CurrencyForm' id='CurrencyForm' enctype='multipart/form-data' ></form></div></div>");
            alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Currency</strong></div>');
            inputN = $('<div><label for="name">Name<label></div><div><input id="name" name="name" type="text" class="form-control" placeholder="Name" required></div>');
            inputS = $('<div><label for="symbol">Symbol<label></div><div><input id="symbol" name="symbol" type="text" class="form-control" placeholder="Symbol" required></div>');
            selectT = $('<div><label for="type">Type<label></div><div><select id="type" class="form-control" name="type"></select></div>');
            inputA = $('<div><label for="value">Value<label></div><div id="valuechange"><input id="value" name="value" type="text" class="form-control" placeholder="Value" required></div>');
            inputC = '<div class="checkbox-inline" title="Change between manual value or an API value"><label id="labelch" ><input class="changevalue" id="valuechanges" type="checkbox" name="chnge" value=""/> Change value selection</label></div>';

            types = ['Currency', 'Cryptocurrency', 'Token'];

            $('#rightContent').append(box);
            $('#CurrencyForm').append(alert);
            $('#CurrencyForm').append(inputN);
            $('#CurrencyForm').append(inputS);
            $('#CurrencyForm').append(selectT);
            $('#CurrencyForm').append(inputA);
            $('#CurrencyForm').append(inputC);

            for (i = 0; i < types.length; i++) {
                type = types[i];
                option = $('<option value="' + type + '">' + type + '</option>');
                $('#type').append(option);
            }
            changeValueCurrency('#valuechanges');
            formatInput('#value');

            $('#CurrencyForm').append("<div id='currnButts'></div>");

            clsbut = $("<span class='close'>&times;</span>");
            closeButton(clsbut, '.Modal');

            makeBut = $("<button type='button' name='button' id='currnCont'>Make</button>");
            addMakeCurrencyButton(makeBut);

            $('#modalCreateCurrency').prepend(clsbut);

            $('#currnButts').append(makeBut);

            $('.Modal').css('display', 'block');
        });$('#result_currency_page').change(function () {
            $('#form_currency_search').trigger("submit");
        });

        $('#form_currency_search').trigger("submit");
    }

    /* END Currency Functions */

    /* Begin Funds Functions */

    if (pathname.toString() == '/funds') {

        /*Funds Balances*/
        /*Search Balances Currency Table*/

        var orderTableBalanceCurrencyBy = function orderTableBalanceCurrencyBy(by) {
            if (orderBalanceCurrencyBy === by) {
                if (orderBalanceCurrencyDirection === "") {
                    orderBalanceCurrencyDirection = "DESC";
                } else {
                    orderBalanceCurrencyDirection = "";
                }
            } else {
                orderBalanceCurrencyBy = by;
                orderBalanceCurrencyDirection = "";
            }
            searchBalanceCurrency(1);
        };

        //Get Balance Currency Data

        var searchBalanceCurrency = function searchBalanceCurrency(page) {

            resultPage = $("#result_balance_currency_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/funds/currency",
                type: 'post',
                data: { searchvalue: searchBalanceCurrencyValue, page: page, orderBy: orderBalanceCurrencyBy, orderDirection: orderBalanceCurrencyDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var balances = data.result;

                    if (balances.length == 0) {
                        $("#table_balance_currency_content").html("");
                        $('#table_balance_currency_content').append('<tr><td colspan="3">None</td></tr>');
                    } else {
                        // Put the data into the element you care about.
                        $("#table_balance_currency_content").html("");

                        for (i = 0; i < balances.length; i++) {
                            var balance = balances[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + balance.symbol + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount) + '</td>');
                            if (balance.symbol == 'VEF') {
                                var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount / balance.value) + '</td>');
                            } else {
                                var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount * balance.value) + '</td>');
                            }

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            if (data.eaccess) {
                                var colvalue_4 = $('<td class="col-sm-12 col-md-2"></td>');
                                var buttEx = $('<button type="button">Exchange</button>');
                                exchangeButton(buttEx, balance);
                                colvalue_4.append(buttEx);
                                rowResult.append(colvalue_4);
                            }

                            $("#table_balance_currency_content").append(rowResult);
                        }

                        $("#table_balance_currency_pagination").html("");

                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage = $("#result_balance_currency_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_currency pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageBCButton(pagebutton);
                            }

                            $("#table_balance_currency_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_currency pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageBCButton(pagebutton);
                            }

                            $("#table_balance_currency_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_currency pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageBCButton(pagebutton);
                            }

                            $("#table_balance_currency_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function error(_error6) {
                    ReadError(_error6);
                }
            });
        };

        var addPageBCButton = function addPageBCButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchBalanceCurrency(page);
            });
        };

        var orderTableBalanceCryptoBy = function orderTableBalanceCryptoBy(by) {
            if (orderBalanceCryptoBy === by) {
                if (orderBalanceCryptoDirection === "") {
                    orderBalanceCryptoDirection = "DESC";
                } else {
                    orderBalanceCryptoDirection = "";
                }
            } else {
                orderBalanceCryptoBy = by;
                orderBalanceCryptoDirection = "";
            }
            searchBalanceCrypto(1);
        };

        //Get Balance Currency Data

        var searchBalanceCrypto = function searchBalanceCrypto(page) {

            resultPage = $("#result_balance_crypto_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/funds/crypto",
                type: 'post',
                data: { searchvalue: searchBalanceCryptoValue, page: page, orderBy: orderBalanceCryptoBy, orderDirection: orderBalanceCryptoDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var balances = data.result;

                    if (balances.length == 0) {
                        $("#table_balance_crypto_content").html("");
                        $('#table_balance_crypto_content').append('<tr><td colspan="3">None</td></tr>');
                    } else {
                        // Put the data into the element you care about.
                        $("#table_balance_crypto_content").html("");

                        for (i = 0; i < balances.length; i++) {
                            var balance = balances[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + balance.symbol + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount) + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount * balance.value) + '</td>');

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            if (data.eaccess) {
                                var colvalue_4 = $('<td class="col-sm-12 col-md-2"></td>');
                                var buttEx = $('<button type="button">Exchange</button>');
                                exchangeButton(buttEx, balance);
                                colvalue_4.append(buttEx);
                                rowResult.append(colvalue_4);
                            }

                            $("#table_balance_crypto_content").append(rowResult);
                        }

                        $("#table_balance_crypto_pagination").html("");

                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage = $("#result_balance_crypto_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_crypto pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageBCRButton(pagebutton);
                            }

                            $("#table_balance_crypto_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_crypto pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageBCRButton(pagebutton);
                            }

                            $("#table_balance_crypto_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_crypto pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageBCRButton(pagebutton);
                            }

                            $("#table_balance_crypto_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function error(_error6) {
                    ReadError(_error6);
                }
            });
        };

        var addPageBCRButton = function addPageBCRButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchBalanceCrypto(page);
            });
        };

        var orderTableBalanceTokenBy = function orderTableBalanceTokenBy(by) {
            if (orderBalanceTokenBy === by) {
                if (orderBalanceTokenDirection === "") {
                    orderBalanceTokenDirection = "DESC";
                } else {
                    orderBalanceTokenDirection = "";
                }
            } else {
                orderBalanceTokenBy = by;
                orderBalanceTokenDirection = "";
            }
            searchBalanceToken(1);
        };

        //Get Balance Currency Data

        var searchBalanceToken = function searchBalanceToken(page) {

            resultPage = $("#result_balance_token_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/funds/token",
                type: 'post',
                data: { searchvalue: searchBalanceTokenValue, page: page, orderBy: orderBalanceTokenBy, orderDirection: orderBalanceTokenDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var balances = data.result;

                    if (balances.length == 0) {
                        $("#table_balance_token_content").html("");
                        $('#table_balance_token_content').append('<tr><td colspan="3">None</td></tr>');
                    } else {
                        // Put the data into the element you care about.
                        $("#table_balance_token_content").html("");

                        for (i = 0; i < balances.length; i++) {
                            var balance = balances[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + balance.symbol + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount) + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount * balance.value) + '</td>');

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            if (data.eaccess) {
                                var colvalue_4 = $('<td class="col-sm-12 col-md-2"></td>');
                                var buttEx = $('<button type="button">Exchange</button>');
                                exchangeButton(buttEx, balance);
                                colvalue_4.append(buttEx);
                                rowResult.append(colvalue_4);
                            }

                            $("#table_balance_token_content").append(rowResult);
                        }

                        $("#table_balance_token_pagination").html("");

                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage = $("#result_balance_token_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_token pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageTButton(pagebutton);
                            }

                            $("#table_balance_token_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_token pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageTButton(pagebutton);
                            }

                            $("#table_balance_token_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_balance_token pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageTButton(pagebutton);
                            }

                            $("#table_balance_token_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function error(_error6) {
                    ReadError(_error6);
                }
            });
        };

        var addPageTButton = function addPageTButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchBalanceToken(page);
            });
        };

        /*End Funds Balances*/

        /*Exchange Currencies*/

        var exchangeButton = function exchangeButton(button, currency) {
            button.click(function () {

                box = $("<div class='Modal' id='exchangeModal' style='display:none;'><div class='modalContent' id='modalExchange'><h3>Exchange</h3><form class='ExchangeForm' id='ExchangeForm' enctype='multipart/form-data' ></form></div></div>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Exchange</strong></div>');
                labelA = $('<div><label >Available Balance: <span id="availableB"></span><label></div>');
                selectO = $('<div><label for="selectout" >Change For:<label></div><div><select id="out" class="form-control" name="selectout"></select></div>');
                inputO = $('<div><label for="valueout">Value<label></div><div><input id="valueout" name="valueout" type="text" class="form-control" placeholder="Value Out" required></div>');
                inputI = $('<input id="currencyin" name="currencyin" type="text" class="form-control" required value="' + currency.symbol + '" display:none;>');
                inputI = $('<div><label for="valuein">Value In<label></div><div><input id="valuein" name="valuein" type="text" class="form-control" placeholder="Value In" required></div>');
                inputR = $('<div><label for="rate">Exchange Rate<label></div><div><input id="rate" name="rate" type="text" class="form-control" placeholder="Exchange Rate" required></div>');

                $('#rightContent').append(box);
                $('#ExchangeForm').append(alert);
                $('#ExchangeForm').append(labelA);
                $('#ExchangeForm').append(selectO);
                $('#ExchangeForm').append(inputO);
                $('#ExchangeForm').append(inputI);
                $('#ExchangeForm').append(inputR);

                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/funds/currencies",
                    type: 'post',
                    datatype: 'json',
                    data: { currency: currency.symbol },
                    success: function success(data) {
                        //Inicio
                        currencies = data.data;
                        for (i = 0; i < currencies.length; i++) {
                            var currenc = currencies[i];
                            if (currenc.symbol == 'USD') {
                                var option = '<option value="' + currenc.symbol + ' selected="selected"">' + currenc.symbol + '</option>';
                            }
                            var option = '<option value="' + currenc.symbol + '">' + currenc.symbol + '</option>';
                            $('#out').append(option);
                        }
                    },
                    // Fin
                    error: function error(_error7) {
                        ReadError(_error7);
                    }
                });
                availableBalance('#out');
                $('#ExchangeForm').append("<div id='exButts'></div>");

                clsbut = $("<span class='close'>&times;</span>");
                closeButton(clsbut, '.Modal');

                makeBut = $("<button type='button' name='button' id='exCont'>Make</button>");
                addMakeExButton(makeBut);

                $('#modalExchange').prepend(clsbut);
                formatInput('#valueout');
                formatInput('#valuein');
                formatInput('#rate');
                $('#exButts').append(makeBut);
                $('#out').trigger('change');
                $('.Modal').css('display', 'block');
            });
        };

        var availableBalance = function availableBalance(selection) {
            $(selection).change(function () {
                currency = $(this).val();
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/funds/available",
                    type: 'post',
                    datatype: 'json',
                    data: { currency: currency },
                    success: function success(data) {
                        //Inicio
                        currenc = data.data;
                        amount = formatNumber.num(currenc.amount);
                        $('#availableB').html('');
                        $('#availableB').append(amount);
                    },
                    // Fin
                    error: function error(_error8) {
                        ReadError(_error8);
                    }
                });
            });
        };

        var addMakeExButton = function addMakeExButton(makeBut) {
            makeBut.click(function (e) {

                jQuery.validator.addMethod("amount", function (value, element) {
                    return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
                });

                $('#ExchangeForm').validate({
                    rules: {
                        valueout: {
                            required: true,
                            minlength: 1,
                            amount: true
                        },

                        valuein: {
                            minlength: 1,
                            amount: true
                        },
                        rate: {
                            minlength: 1,
                            amount: true
                        }
                    },
                    messages: {
                        valueout: "Please introduce a valid amount, minimun 1 digits",
                        valuein: "Please introduce a valid amount, minimun 1 digits",
                        rate: "Please introduce a valid amount, minimun 1 digits"
                    }
                });

                if ($('#ExchangeForm').valid()) {
                    alterForm('#ExhangeForm', true);
                    $('#exCont').hide();
                    $('.alert').show();

                    confirmBut = $("<button type='button' name='button' id='exConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' id='exBack'>Back</button>");
                    backButton(backBut, '#ExchangeForm', 'ex');
                    confirmExButton(confirmBut);

                    $('#exButts').append(confirmBut);
                    $('#exButts').append(backBut);
                }
            });
        };

        var confirmExButton = function confirmExButton(confirmBut) {
            confirmBut.click(function () {
                currencyout = $('#out').val();
                currencyin = $('#in').val();

                amountout = $('#valueout').val().replace(/\./g, '');
                amountout = amountout.replace(/,/g, '.');

                amountin = $('#valuein').val().replace(/\./g, '');
                amountin = amountin.replace(/,/g, '.');

                rate = $('#rate').val().replace(/\./g, '');
                rate = rate.replace(/,/g, '.');

                $.ajax({
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/funds/exchange',
                    type: 'POST',
                    dataType: "json",
                    data: { cout: currencyout, cin: currencyin, aout: amountout, ain: amountin, rate: rate },
                    success: function success(data) {
                        closeModal('#ExchangeModal');

                        $('#form_balance_currency_search').trigger("submit");
                        $('#form_balance_crypto_search').trigger("submit");
                        $('#form_balance_token_search').trigger("submit");
                    }
                });
            });
        };
        /*End Exchange Currencies*/
        /*Search Deposit Table*/


        var orderTableDepositBy = function orderTableDepositBy(by) {
            if (orderDepositBy === by) {
                if (orderDepositDirection === "") {
                    orderDepositDirection = "DESC";
                } else {
                    orderDepositDirection = "";
                }
            } else {
                orderDepositBy = by;
                orderDepositDirection = "";
            }
            searchDeposit(1);
        };

        //Get Deposit Data


        var searchDeposit = function searchDeposit(page) {

            resultPage = $("#result_deposit_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/deposit",
                type: 'post',
                data: { searchvalue: searchDepositValue, page: page, orderBy: orderDepositBy, orderDirection: orderDepositDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var deposits = data.result;
                    var user = data.user;

                    if (deposits.length == 0) {
                        $("#table_deposit_content").html("");
                        $('#table_deposit_content').append('<tr><td colspan="7">None</td></tr>');
                    } else {
                        // Put the data into the element you care about.
                        $("#table_deposit_content").html("");

                        for (i = 0; i < deposits.length; i++) {
                            var deposit = deposits[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + deposit.symbol + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(deposit.amount) + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + deposit.comment + '</td>');
                            var colvalue_4 = $('<td class="col-sm-12 col-md-2">' + deposit.created_at + '</td>');
                            var colvalue_5 = $('<td class="col-sm-12 col-md-2">' + active(deposit.active) + '</td>');
                            var colvalue_6 = $('<td class="col-sm-12 col-md-2">' + updated(deposit) + '</td>');
                            var colvalue_7 = $('<td class="col-sm-12 col-md-2"></td>');

                            var printbut = $("<button type='button' name='button' id='depoPrint'>Receipt</button>");
                            printRecipient(user, deposit, deposit.symbol, 'deposit', printbut);

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
                        var resultPage = $("#result_deposit_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_Deposit pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                _addPageButton(pagebutton);
                            }

                            $("#table_deposit_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_Deposit pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                _addPageButton(pagebutton);
                            }

                            $("#table_deposit_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_Deposit pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                _addPageButton(pagebutton);
                            }

                            $("#table_deposit_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function error(_error9) {
                    ReadError(_error9);
                }
            });
        };

        var _addPageButton = function _addPageButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchDeposit(page);
            });
        };

        /*Deposit Form*/

        var addMakedButton = function addMakedButton(makeBut) {
            makeBut.click(function (e) {

                jQuery.validator.addMethod("amount", function (value, element) {
                    return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
                });

                $('#DepositForm').validate({
                    rules: {
                        amount: {
                            required: true,
                            minlength: 1,
                            amount: true
                        },

                        reference: {
                            required: true,
                            minlength: 3
                        },
                        file: {
                            required: true
                        }
                    },
                    messages: {
                        amount: "Please introduce a valid amount, minimun 3 digits",
                        reference: 'Please introduce the reference of the deposit',
                        file: 'Please attach the deposit confirmation file'
                    }
                });

                if ($('#DepositForm').valid()) {
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
            });
        };

        var confirmdButton = function confirmdButton(confirmBut) {
            confirmBut.click(function () {
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
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/deposit/create',
                    type: 'POST',
                    dataType: "json",
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function success(data) {
                        closeModal('#depositModal');
                        $('#form_deposit_search').trigger("submit");
                        balances();
                        message = data.message;
                        deposit = data.deposit;
                        user = data.user;
                        symbol = data.symbol;
                        opModalPrint(message, deposit, symbol, user, 'deposit');
                    }
                });
            });
        };

        /*Search Withdraws Table*/

        var orderTableWithdrawBy = function orderTableWithdrawBy(by) {
            if (orderWithdrawBy === by) {
                if (orderWithdrawDirection === "") {
                    orderWithdrawDirection = "DESC";
                } else {
                    orderWithdrawDirection = "";
                }
            } else {
                orderWithdrawBy = by;
                orderWithdrawDirection = "";
            }
            searchWithdraw(1);
        };

        //Get Withdraw Data

        var searchWithdraw = function searchWithdraw(page) {

            resultPage = $("#result_withdraw_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/withdraw",
                type: 'post',
                data: { searchvalue: searchWithdrawValue, page: page, orderBy: orderWithdrawBy, orderDirection: orderWithdrawDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var user = data.user;
                    var withdraws = data.result;

                    if (withdraws.length == 0) {
                        $("#table_withdraw_content").html("");
                        $('#table_withdraw_content').append('<tr><td colspan="7">None</td></tr>');
                    } else {
                        $("#table_withdraw_content").html("");

                        for (i = 0; i < withdraws.length; i++) {
                            var withdraw = withdraws[i];
                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');

                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + withdraw.symbol + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(withdraw.amount) + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + withdraw.comment + '</td>');
                            var colvalue_4 = $('<td class="col-sm-12 col-md-2">' + withdraw.created_at + '</td>');
                            var colvalue_5 = $('<td class="col-sm-12 col-md-2">' + active(withdraw.active) + '</td>');
                            var colvalue_6 = $('<td class="col-sm-12 col-md-2">' + updated(withdraw) + '</td>');
                            var colvalue_7 = $('<td class="col-sm-12 col-md-2"></td>');

                            var printbut = $("<button type='button' name='button' id='withPrint'>Receipt</button>");
                            printRecipient(user, withdraw, withdraw.symbol, 'withdraw', printbut);

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
                        var resultPage = $("#result_withdraw_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_withdraw pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                _addPageButton(pagebutton);
                            }

                            $("#table_withdraw_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_Withdraw pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                _addPageButton(pagebutton);
                            }

                            $("#table_withdraw_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_Withdraw pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPagewButton(pagebutton);
                            }

                            $("#table_withdraw_pagination").append(pageList);
                        }
                    }
                    // Put the data into the element you care about.
                },
                // Fin
                error: function error(_error10) {
                    ReadError(_error10);
                }
            });
        };

        var addPagewButton = function addPagewButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchWithdraw(page);
            });
        };

        /*Withdraw Form*/

        var addMakewButton = function addMakewButton(makeBut) {
            jQuery.validator.addMethod("amount", function (value, element) {
                return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
            });

            $('#WithdrawForm').validate({
                rules: {
                    amount: {
                        required: true,
                        minlength: 1,
                        amount: true
                    },

                    account: {
                        required: true
                    }
                },
                messages: {
                    amount: "Please introduce only numbers, minimun 1 digits",
                    account: 'Please introduce the account of the withdraw'
                }
            });

            makeBut.click(function (e) {
                if ($('#WithdrawForm').valid()) {
                    amount = $('#amount').val();
                    currency = $('#currency').val();
                    balance = $('#' + currency + 'CT').val();
                    if (amount > balance) {
                        $('.alert').empty();
                        $('.alert').removeClass('alert-success');
                        $('.alert').addClass('alert-danger');
                        $('.alert').append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>You dont have enough funds, please tried with a smaller amount</strong>');
                        $('.alert').show();
                    } else {
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
            });
        };

        var confirmwButton = function confirmwButton(confirmBut) {
            confirmBut.click(function () {

                currency = $('#currency').val();
                amount = $('#amount').val().replace(/\./g, '');
                amount = amount.replace(/,/g, '.');
                amount = parseFloat(amount) * -1;
                accountId = $('#accountId').val();

                $.ajax({
                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/withdraw/create',
                    type: 'POST',
                    dataType: "json",
                    data: { currency: currency, amount: amount, accountId: accountId },
                    success: function success(data) {
                        closeModal('#withdrawModal');
                        $('#form_withdraw_search').trigger("submit");
                        balances();
                        message = data.message;
                        deposit = data.withdraw;
                        user = data.user;
                        symbol = data.symbol;
                        opModalPrint(message, deposit, symbol, user, 'withdraw');
                    }
                });
            });
        };

        /*Search Accounts Table*/


        var addTableManager = function addTableManager() {

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
            var searchAccountValue = "";

            $("#form_account_search").submit(function (e) {
                e.preventDefault();
                //DESC
                searchAccountValue = $("#search_account_value").val();
                searchAccount(1);
            });

            function orderTableAccountBy(by) {
                if (orderAccountBy === by) {
                    if (orderAccountDirection === "") {
                        orderAccountDirection = "DESC";
                    } else {
                        orderAccountDirection = "";
                    }
                } else {
                    orderAccountBy = by;
                    orderAccountDirection = "";
                }
                searchAccount(1);
            }

            //Get Account Data
            function searchAccount(page) {
                resultPage = $("#result_account_page").val();
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/account",
                    type: 'post',
                    data: { searchvalue: searchAccountValue, page: page, orderBy: orderAccountBy, orderDirection: orderAccountDirection, resultPage: resultPage },
                    success: function success(data) {
                        //Inicio

                        var accounts = data.result;
                        if (accounts.length == 0) {
                            $('#table_account_content').append('<tr><td colspan="4">None</td></tr>');
                        } else {
                            $("#table_account_content").html("");
                            for (i = 0; i < accounts.length; i++) {
                                var account = accounts[i];

                                // we have to make in steps to add the onclick event
                                var rowResult = $('<tr></tr>');
                                var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + account.type + '</td>');
                                var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + account.entity + '</td>');
                                var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + account.address + '</td>');
                                var colvalue_4 = $('<td class="col-sm-12 col-md-2"></td>');

                                var selectbut = $("<button type='button' name='button' id='accSelect'>Select</button>");
                                selectAccount(account.type, account.id, account.address, selectbut);
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
                            var resultPage = $("#result_account_page").val();
                            var totalPages = Math.ceil(total / resultPage);

                            if (page === 1) {
                                maxPage = page + 2;
                                totalPages = maxPage < totalPages ? maxPage : totalPages;
                                var pageList = $('<ul class="pagination"></ul>');

                                for (i = page; i <= totalPages; i++) {
                                    pagebutton = $('<li class="page_account pages">' + i + '</li>');
                                    pageList.append(pagebutton);
                                    _addPageButton(pagebutton);
                                }

                                $("#table_account_pagination").append(pageList);
                            } else if (page === totalPages) {
                                page = page - 2;

                                if (page < 1) {
                                    page = 1;
                                }

                                totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                                var pageList = $('<ul class="pagination"></ul>');

                                for (i = page; i <= totalPages; i++) {
                                    pagebutton = $('<li class="page_account pages">' + i + '</li>');
                                    pageList.append(pagebutton);
                                    _addPageButton(pagebutton);
                                }

                                $("#table_account_pagination").append(pageList);
                            } else {
                                page = page - 2;

                                if (page < 1) {
                                    page = 1;
                                }

                                totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                                var pageList = $('<ul class="pagination"></ul>');

                                for (i = page; i <= totalPages; i++) {
                                    pagebutton = $('<li class="page_account pages">' + i + '</li>');
                                    pageList.append(pagebutton);
                                    addPageaButton(pagebutton);
                                }

                                $("#table_account_pagination").append(pageList);
                            }
                        }
                        // Put the data into the element you care about.
                    },
                    // Fin
                    error: function error(_error11) {
                        ReadError(_error11);
                    }
                });
            }

            function addPageaButton(pagebutton) {
                pagebutton.click(function () {
                    page = $(this).text();
                    searchAccount(page);
                });
            }

            function selectAccount(type, id, address, butslect) {
                butslect.click(function () {
                    currency = $('#currency').val();
                    if (currency == 'BTC' || currency == 'LTC' || currency == 'ETH') {
                        if (type !== 'crypto') {
                            $('.alert-account').empty();
                            $('.alert-account').addClass('alert-danger');
                            $('.alert-account').append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please only select a ' + currency + ' Address</strong>');
                            $('.alert-account').show();
                        } else {
                            $('#accountId').val(id);
                            $('#account').val(address);
                            closeModal('#modalAccount');
                        }
                    } else if (currency == 'VEF' || currency == 'USD') {
                        if (type !== 'bank') {
                            $('.alert-account').empty();
                            $('.alert-account').css('background-color', 'red');
                            $('.alert-account').append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please only select a ' + currency + ' Account</strong>');
                            $('.alert-account').show();
                        } else {
                            $('#accountId').val(id);
                            $('#account').val(address);
                            closeModal('#modalAccount');
                        }
                    }
                });
            }

            $('#form_account_search').trigger("submit");
        };

        /*Account Management*/


        var addAccount = function addAccount(butaccount) {
            butaccount.click(function () {
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

        var createAccount = function createAccount(createacc) {
            createacc.click(function () {
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
        };

        var changeEntity = function changeEntity() {
            $('#type').change(function () {
                selection = $('#type').val();
                if (selection == 'bank') {
                    $('#entyCont').empty();
                    $('#entyCont').append("<label for='entity'>Entity</label><input id='entity' name='entity' type='text' class='form-control' required>");
                } else if (selection == 'crypto') {
                    $('#entyCont').empty();
                    $('#entyCont').append("<label for='entity'>Entity</label><select id='entity' class='form-control' name='entity'><option value='BTC'>BTC</option><option value='LTC'>LTC</option><option value='ETH'>ETH</option></select>");
                }
            });
        };

        var addMakeaButton = function addMakeaButton(makeBut) {
            $('#AccountForm').validate({
                rules: {
                    entity: {
                        required: true,
                        minlength: 2

                    },
                    account: {
                        required: true,
                        minlength: 8
                    }
                },
                messages: {
                    entity: "Please introduce the entity of the account",
                    account: 'Please introduce the account of the withdraw'
                }
            });
            makeBut.click(function (e) {
                if ($('#AccountForm').valid()) {
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
            });
        };

        var confirmaButton = function confirmaButton(confirmBut) {
            confirmBut.click(function () {

                type = $('#type').val();
                entity = $('#entity').val();
                address = $('#address').val();

                $.ajax({

                    headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                    url: '/account/create',
                    type: 'POST',
                    dataType: "json",
                    data: { type: type, entity: entity, address: address },
                    success: function success(data) {
                        addTableManager();
                        closeModal('#modalCreateAccount');
                    }
                });
            });
        };

        ;;

        ;

        ;;

        ;

        ;;

        ;$('#table_deposit_header_currency').click(function (e) {
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
        var searchDepositValue = "";

        $("#form_deposit_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchDepositValue = $("#search_deposit_value").val();
            searchDeposit(1);
        });

        $('#btnDepo').click(function () {
            box = "<div class='Modal' id='depositModal' style='display:none;'><div class='modalContent' id='modalDeposit'><h3>Deposit</h3><form class='FundForm' id='DepositForm' enctype='multipart/form-data' ></form></div></div>";

            $('#rightContent').append(box);
            $('#DepositForm').append('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Deposit</strong></div>');
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

        $("#form_withdraw_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchWithdrawValue = $("#search_withdraw_value").val();
            searchWithdraw(1);
        });

        $('#btnWith').click(function () {

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

        ;

        $('#table_balance_currency_header_symbol').click(function (e) {
            orderTableBalanceCurrencyBy('currencies.symbol');
        });

        $('#table_balance_currency_header_amount').click(function (e) {
            orderTableBalanceCurrencyBy('amount');
        });

        $('#table_balance_currency_header_equivalent').click(function (e) {
            orderTableBalanceCurrencyBy('value');
        });

        var orderBalanceCurrencyBy = "";
        var orderBalanceCurrencyDirection = "";
        var searchBalanceCurrencyValue = "";

        $("#form_balance_currency_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchBalanceCurrencyValue = $("#search_balance_currency_value").val();
            searchBalanceCurrency(1);
        });

        $('#table_balance_crypto_header_symbol').click(function (e) {
            orderTableBalanceCryptoBy('currencies.symbol');
        });

        $('#table_balance_crypto_header_amount').click(function (e) {
            orderTableBalanceCryptoBy('amount');
        });

        $('#table_balance_crypto_header_equivalent').click(function (e) {
            orderTableBalanceCryptoBy('value');
        });

        var orderBalanceCryptoBy = "";
        var orderBalanceCryptoDirection = "";
        var searchBalanceCryptoValue = "";

        $("#form_balance_crypto_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchBalanceCryptoValue = $("#search_balance_crypto_value").val();
            searchBalanceCrypto(1);
        });

        $('#table_balance_token_header_symbol').click(function (e) {
            orderTableBalanceTokenBy('currencies.symbol');
        });

        $('#table_balance_token_header_amount').click(function (e) {
            orderTableBalanceTokenBy('amount');
        });

        $('#table_balance_token_header_equivalent').click(function (e) {
            orderTableBalanceTokenBy('value');
        });

        var orderBalanceTokenBy = "";
        var orderBalanceTokenDirection = "";
        var searchBalanceTokenValue = "";

        $("#form_balance_token_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchBalanceTokenValue = $("#search_balance_token_value").val();
            searchBalanceToken(1);
        });

        $('#result_balance_currency_page').change(function () {
            $('#form_balance_currency_search').trigger("submit");
        });
        $('#result_balance_crypto_page').change(function () {
            $('#form_balance_crypto_search').trigger("submit");
        });
        $('#result_balance_token_page').change(function () {
            $('#form_balance_token_search').trigger("submit");
        });
        $('#result_deposit_page').change(function () {
            $('#form_deposit_search').trigger("submit");
        });
        $('#result_withdraw_page').change(function () {
            $('#form_withdraw_search').trigger("submit");
        });

        $('#form_balance_currency_search').trigger("submit");
        $('#form_balance_crypto_search').trigger("submit");
        $('#form_balance_token_search').trigger("submit");
        $('#form_deposit_search').trigger("submit");
        $('#form_withdraw_search').trigger("submit");
    }

    /* End Funds Functions */

    /* Begin Client Functions */

    if (pathname.toString() == '/clients') {
        var orderTableClientBy = function orderTableClientBy(by) {
            if (orderClientBy === by) {
                if (orderClientDirection === "") {
                    orderClientDirection = "DESC";
                } else {
                    orderClientDirection = "";
                }
            } else {
                orderClientBy = by;
                orderClientDirection = "";
            }
            searchClient(1);
        };

        //Get Client Data

        var searchClient = function searchClient(page) {

            resultPage = $("#result_client_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/clients/list",
                type: 'post',
                data: { searchvalue: searchClientValue, page: page, orderBy: orderClientBy, orderDirection: orderClientDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var clients = data.result;

                    if (clients.length == 0) {
                        $("#table_client_content").html("");
                        $('#table_client_content').append('<tr><td colspan="3">None</td></tr>');
                    } else {
                        // Put the data into the element you care about.
                        $("#table_client_content").html("");

                        for (i = 0; i < clients.length; i++) {
                            var client = clients[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + client.name + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + client.email + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(client.amount) + '</td>');
                            var colvalue_4 = $('<td class="col-sm-12 col-md-2"></td>');
                            var buttonS = $('<button type="button">Select Client</button>');
                            var buttonI = $('<button type="button">Initial Investment</button>');
                            selectClient(buttonS, client.id);
                            initialInvest(buttonI, client);

                            colvalue_4.append(buttonS);
                            colvalue_4.append(buttonI);

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);
                            $("#table_client_content").append(rowResult);
                        }

                        $("#table_client_pagination").html("");

                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage = $("#result_client_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_client pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageCLButton(pagebutton);
                            }

                            $("#table_client_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_client pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageCLButton(pagebutton);
                            }

                            $("#table_client_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_client pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageCLButton(pagebutton);
                            }

                            $("#table_client_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function error(error) {
                    ReadError(error);
                }
            });
        };

        var addPageCLButton = function addPageCLButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchClient(page);
            });
        };

        var selectClient = function selectClient(button, id) {
            button.click(function () {
                /*Funds Balances*/
                /*Search Balances Currency Table*/

                function orderTableBalanceCurrencyBy(by) {
                    if (orderBalanceCurrencyBy === by) {
                        if (orderBalanceCurrencyDirection === "") {
                            orderBalanceCurrencyDirection = "DESC";
                        } else {
                            orderBalanceCurrencyDirection = "";
                        }
                    } else {
                        orderBalanceCurrencyBy = by;
                        orderBalanceCurrencyDirection = "";
                    }
                    searchBalanceCurrency(1);
                };

                //Get Balance Currency Data

                function searchBalanceCurrency(page) {

                    resultPage = $("#result_balance_currency_page").val();

                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "/clients/currency",
                        type: 'post',
                        data: { id: id, searchvalue: searchBalanceCurrencyValue, page: page, orderBy: orderBalanceCurrencyBy, orderDirection: orderBalanceCurrencyDirection, resultPage: resultPage },
                        success: function success(data) {
                            //Inicio
                            var balances = data.result;

                            if (balances.length == 0) {
                                $("#table_balance_currency_content").html("");
                                $('#table_balance_currency_content').append('<tr><td colspan="3">None</td></tr>');
                            } else {
                                // Put the data into the element you care about.
                                $("#table_balance_currency_content").html("");

                                for (i = 0; i < balances.length; i++) {
                                    var balance = balances[i];

                                    // we have to make in steps to add the onclick event
                                    var rowResult = $('<tr></tr>');
                                    var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + balance.symbol + '</td>');
                                    var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount) + '</td>');
                                    if (balance.symbol == 'VEF') {
                                        var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount / balance.value) + '</td>');
                                    } else {
                                        var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount * balance.value) + '</td>');
                                    }

                                    rowResult.append(colvalue_1);
                                    rowResult.append(colvalue_2);
                                    rowResult.append(colvalue_3);

                                    $("#table_balance_currency_content").append(rowResult);
                                }

                                $("#table_balance_currency_pagination").html("");

                                page = parseInt(data.page);
                                var total = data.total;
                                var resultPage = $("#result_balance_currency_page").val();
                                var totalPages = Math.ceil(total / resultPage);

                                if (page === 1) {
                                    maxPage = page + 2;
                                    totalPages = maxPage < totalPages ? maxPage : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_currency pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageBCButton(pagebutton);
                                    }

                                    $("#table_balance_currency_pagination").append(pageList);
                                } else if (page === totalPages) {
                                    page = page - 2;

                                    if (page < 1) {
                                        page = 1;
                                    }

                                    totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_currency pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageBCButton(pagebutton);
                                    }

                                    $("#table_balance_currency_pagination").append(pageList);
                                } else {
                                    page = page - 2;

                                    if (page < 1) {
                                        page = 1;
                                    }

                                    totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_currency pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageBCButton(pagebutton);
                                    }

                                    $("#table_balance_currency_pagination").append(pageList);
                                }
                            }
                        },
                        // Fin
                        error: function error(_error6) {
                            ReadError(_error6);
                        }
                    });
                };

                function addPageBCButton(pagebutton) {
                    pagebutton.click(function () {
                        page = $(this).text();
                        searchBalanceCurrency(page);
                    });
                };

                function orderTableBalanceCryptoBy(by) {
                    if (orderBalanceCryptoBy === by) {
                        if (orderBalanceCryptoDirection === "") {
                            orderBalanceCryptoDirection = "DESC";
                        } else {
                            orderBalanceCryptoDirection = "";
                        }
                    } else {
                        orderBalanceCryptoBy = by;
                        orderBalanceCryptoDirection = "";
                    }
                    searchBalanceCrypto(1);
                };

                //Get Balance Currency Data

                function searchBalanceCrypto(page) {

                    resultPage = $("#result_balance_crypto_page").val();

                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "/clients/crypto",
                        type: 'post',
                        data: { id: id, searchvalue: searchBalanceCryptoValue, page: page, orderBy: orderBalanceCryptoBy, orderDirection: orderBalanceCryptoDirection, resultPage: resultPage },
                        success: function success(data) {
                            //Inicio
                            var balances = data.result;

                            if (balances.length == 0) {
                                $("#table_balance_crypto_content").html("");
                                $('#table_balance_crypto_content').append('<tr><td colspan="3">None</td></tr>');
                            } else {
                                // Put the data into the element you care about.
                                $("#table_balance_crypto_content").html("");

                                for (i = 0; i < balances.length; i++) {
                                    var balance = balances[i];

                                    // we have to make in steps to add the onclick event
                                    var rowResult = $('<tr></tr>');
                                    var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + balance.symbol + '</td>');
                                    var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount) + '</td>');
                                    var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount * balance.value) + '</td>');

                                    rowResult.append(colvalue_1);
                                    rowResult.append(colvalue_2);
                                    rowResult.append(colvalue_3);

                                    $("#table_balance_crypto_content").append(rowResult);
                                }

                                $("#table_balance_crypto_pagination").html("");

                                page = parseInt(data.page);
                                var total = data.total;
                                var resultPage = $("#result_balance_crypto_page").val();
                                var totalPages = Math.ceil(total / resultPage);

                                if (page === 1) {
                                    maxPage = page + 2;
                                    totalPages = maxPage < totalPages ? maxPage : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_crypto pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageBCRButton(pagebutton);
                                    }

                                    $("#table_balance_crypto_pagination").append(pageList);
                                } else if (page === totalPages) {
                                    page = page - 2;

                                    if (page < 1) {
                                        page = 1;
                                    }

                                    totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_crypto pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageBCRButton(pagebutton);
                                    }

                                    $("#table_balance_crypto_pagination").append(pageList);
                                } else {
                                    page = page - 2;

                                    if (page < 1) {
                                        page = 1;
                                    }

                                    totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_crypto pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageBCRButton(pagebutton);
                                    }

                                    $("#table_balance_crypto_pagination").append(pageList);
                                }
                            }
                        },
                        // Fin
                        error: function error(_error6) {
                            ReadError(_error6);
                        }
                    });
                };

                function addPageBCRButton(pagebutton) {
                    pagebutton.click(function () {
                        page = $(this).text();
                        searchBalanceCrypto(page);
                    });
                };

                function orderTableBalanceTokenBy(by) {
                    if (orderBalanceTokenBy === by) {
                        if (orderBalanceTokenDirection === "") {
                            orderBalanceTokenDirection = "DESC";
                        } else {
                            orderBalanceTokenDirection = "";
                        }
                    } else {
                        orderBalanceTokenBy = by;
                        orderBalanceTokenDirection = "";
                    }
                    searchBalanceToken(1);
                };

                //Get Balance Currency Data

                function searchBalanceToken(page) {

                    resultPage = $("#result_balance_token_page").val();

                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "/clients/token",
                        type: 'post',
                        data: { id: id, searchvalue: searchBalanceTokenValue, page: page, orderBy: orderBalanceTokenBy, orderDirection: orderBalanceTokenDirection, resultPage: resultPage },
                        success: function success(data) {
                            //Inicio
                            var balances = data.result;

                            if (balances.length == 0) {
                                $("#table_balance_token_content").html("");
                                $('#table_balance_token_content').append('<tr><td colspan="3">None</td></tr>');
                            } else {
                                // Put the data into the element you care about.
                                $("#table_balance_token_content").html("");

                                for (i = 0; i < balances.length; i++) {
                                    var balance = balances[i];

                                    // we have to make in steps to add the onclick event
                                    var rowResult = $('<tr></tr>');
                                    var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + balance.symbol + '</td>');
                                    var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount) + '</td>');
                                    var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(balance.amount * balance.value) + '</td>');

                                    rowResult.append(colvalue_1);
                                    rowResult.append(colvalue_2);
                                    rowResult.append(colvalue_3);

                                    $("#table_balance_token_content").append(rowResult);
                                }

                                $("#table_balance_token_pagination").html("");

                                page = parseInt(data.page);
                                var total = data.total;
                                var resultPage = $("#result_balance_token_page").val();
                                var totalPages = Math.ceil(total / resultPage);

                                if (page === 1) {
                                    maxPage = page + 2;
                                    totalPages = maxPage < totalPages ? maxPage : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_token pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageTButton(pagebutton);
                                    }

                                    $("#table_balance_token_pagination").append(pageList);
                                } else if (page === totalPages) {
                                    page = page - 2;

                                    if (page < 1) {
                                        page = 1;
                                    }

                                    totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_token pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageTButton(pagebutton);
                                    }

                                    $("#table_balance_token_pagination").append(pageList);
                                } else {
                                    page = page - 2;

                                    if (page < 1) {
                                        page = 1;
                                    }

                                    totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                                    var pageList = $('<ul class="pagination"></ul>');

                                    for (i = page; i <= totalPages; i++) {
                                        pagebutton = $('<li class="page_balance_token pages">' + i + '</li>');
                                        pageList.append(pagebutton);
                                        addPageTButton(pagebutton);
                                    }

                                    $("#table_balance_token_pagination").append(pageList);
                                }
                            }
                        },
                        // Fin
                        error: function error(_error6) {
                            ReadError(_error6);
                        }
                    });
                };

                function addPageTButton(pagebutton) {
                    pagebutton.click(function () {
                        page = $(this).text();
                        searchBalanceToken(page);
                    });
                };

                $('#table_balance_currency_header_symbol').click(function (e) {
                    orderTableBalanceCurrencyBy('currencies.symbol');
                });

                $('#table_balance_currency_header_amount').click(function (e) {
                    orderTableBalanceCurrencyBy('amount');
                });

                $('#table_balance_currency_header_equivalent').click(function (e) {
                    orderTableBalanceCurrencyBy('value');
                });

                var orderBalanceCurrencyBy = "";
                var orderBalanceCurrencyDirection = "";
                var searchBalanceCurrencyValue = "";

                $("#form_balance_currency_search").submit(function (e) {
                    e.preventDefault();
                    //DESC
                    searchBalanceCurrencyValue = $("#search_balance_currency_value").val();
                    searchBalanceCurrency(1);
                });

                $('#table_balance_crypto_header_symbol').click(function (e) {
                    orderTableBalanceCryptoBy('currencies.symbol');
                });

                $('#table_balance_crypto_header_amount').click(function (e) {
                    orderTableBalanceCryptoBy('amount');
                });

                $('#table_balance_crypto_header_equivalent').click(function (e) {
                    orderTableBalanceCryptoBy('value');
                });

                var orderBalanceCryptoBy = "";
                var orderBalanceCryptoDirection = "";
                var searchBalanceCryptoValue = "";

                $("#form_balance_crypto_search").submit(function (e) {
                    e.preventDefault();
                    //DESC
                    searchBalanceCryptoValue = $("#search_balance_crypto_value").val();
                    searchBalanceCrypto(1);
                });

                $('#table_balance_token_header_symbol').click(function (e) {
                    orderTableBalanceTokenBy('currencies.symbol');
                });

                $('#table_balance_token_header_amount').click(function (e) {
                    orderTableBalanceTokenBy('amount');
                });

                $('#table_balance_token_header_equivalent').click(function (e) {
                    orderTableBalanceTokenBy('value');
                });

                var orderBalanceTokenBy = "";
                var orderBalanceTokenDirection = "";
                var searchBalanceTokenValue = "";

                $("#form_balance_token_search").submit(function (e) {
                    e.preventDefault();
                    //DESC
                    searchBalanceTokenValue = $("#search_balance_token_value").val();
                    searchBalanceToken(1);
                });

                $('#result_balance_currency_page').change(function () {
                    $('#form_balance_currency_search').trigger("submit");
                });
                $('#result_balance_crypto_page').change(function () {
                    $('#form_balance_crypto_search').trigger("submit");
                });
                $('#result_balance_token_page').change(function () {
                    $('#form_balance_token_search').trigger("submit");
                });

                $('#form_balance_currency_search').trigger("submit");
                $('#form_balance_crypto_search').trigger("submit");
                $('#form_balance_token_search').trigger("submit");
                /*End Funds Balances*/
            });
        };

        var initialInvest = function initialInvest(button, user) {
            button.click(function () {

                box = $("<div class='Modal' id='initalModal' style='display:none;'><div class='modalContent' id='modalCreateInitial'><h3>Initial Invest for " + user.name + "</h3><form class='InitialForm' id='InitialForm' enctype='multipart/form-data' ></form></div></div>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Initial Fund Invest</strong></div>');
                inputN = $('<div><label for="inital">Initial Invest USD<label></div><div><input id="initial" name="initial" type="text" class="form-control" placeholder="Initial Invest" required></div>');

                $('#rightContent').append(box);
                $('#InitialForm').append(alert);
                $('#InitialForm').append(inputN);

                $('#InitialForm').append("<div id='iniButts'></div>");

                clsbut = $("<span class='close'>&times;</span>");
                closeButton(clsbut, '.Modal');

                makeBut = $("<button type='button' name='button' id='iniCont'>Make</button>");
                addMakeiButton(makeBut);

                $('#modalCreateInitial').prepend(clsbut);
                $('#iniButts').append(makeBut);

                formatInput("#initial");
                $('.Modal').css('display', 'block');
            });
            function addMakeiButton(makeBut) {
                makeBut.click(function (e) {

                    jQuery.validator.addMethod("amount", function (value, element) {
                        return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
                    });

                    $('#InitialForm').validate({
                        rules: {
                            initial: {
                                required: true,
                                minlength: 1,
                                amount: true
                            }
                        },
                        messages: {
                            amount: "Please introduce a valid amount, minimun 3 digits"
                        }
                    });

                    if ($('#InitialForm').valid()) {
                        alterForm('#InitialForm', true);
                        $('#iniCont').hide();
                        $('.alert').show();

                        confirmBut = $("<button type='button' name='button' id='iniConf'>Confirm</button>");
                        backBut = $("<button type='button' name='button' id='iniBack'>Back</button>");
                        backButton(backBut, '#InitialForm', 'ini');
                        confirmiButton(confirmBut);

                        $('#iniButts').append(confirmBut);
                        $('#iniButts').append(backBut);
                    }
                });
            }

            function confirmiButton(confirmBut) {
                confirmBut.click(function () {
                    amount = $('#initial').val().replace(/\./g, '');
                    amount = amount.replace(/,/g, '.');

                    $.ajax({
                        headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                        url: '/clients/initials',
                        type: 'POST',
                        dataType: "json",
                        data: { amount: amount, id: user.id },
                        success: function success(data) {
                            closeModal('.Modal');
                            $('#form_client_search').trigger("submit");
                        }
                    });
                });
            }
        };

        /*Search Client Table*/

        $('#table_client_header_name').click(function (e) {
            orderTableClientBy('name');
        });

        $('#table_client_header_email').click(function (e) {
            orderTableClientBy('email');
        });

        var orderClientBy = "";
        var orderClientDirection = "";
        var searchClientValue = "";

        ;;

        ;

        $("#form_client_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchClientValue = $("#search_client_value").val();
            searchClient(1);
        });

        $('#result_client_page').change(function () {
            $('#form_client_search').trigger("submit");
        });

        $('#form_client_search').trigger("submit");
    }

    /* End Client Functions */

    /* Begin Orders Functions */

    if (pathname.toString() == '/orders') {
        var selectCurrencyOrder = function selectCurrencyOrder(button, currency) {

            $(button).click(function () {
                $('.selectbtn').removeClass('selectbtn');
                $(this).addClass('selectbtn');

                $('.orders').remove();

                box = $('<div class="orders"></div>');
                buy = $('<div class="orderBox" id="buy"><div class="titleOrder"><h3>Buy ' + currency + '</h3><p>Available <span id="availableBuy"></span></p></div></div>');
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

                sell = $('<div class="orderBox" id="sell"><div class="titleOrder"><h3>Sell ' + currency + '</h3><p>Available <span id="availableSell"></span></p></div></div>');
                sellform = $('<form class="OrderForm" id="SellForm"></form>');
                sellinput = $('<div id="amountD"><label for="amount">' + currency + ' Amount</label><input id="amountSell" name="amount" type="text" class="form-control" required=""></div>');

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

                _availableBalance('#currencyBuy', '#availableBuy', '', '');
                _availableBalance('', '#availableSell', currency, '');

                selectMaxvalue('#maxCuBuy', '#amountBuy', 'buy');
                selectMaxvalue('#MaxCuSell', '#amountSell', 'sell');

                buySell('#buyalt', 'buy');
                buySell('#Sell', 'sell');

                $('#currencyBuy').trigger('change');
            });
        };

        var _availableBalance = function _availableBalance(selection, target, currency, type) {
            if (selection !== '') {
                $(selection).on('change', function () {
                    currency = $(this).val();
                    $.ajax({
                        headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                        url: '/orders/balance',
                        type: 'POST',
                        dataType: "json",
                        data: { currency: currency },
                        success: function success(data) {

                            value = formatNumber.num(data.result) + ' ' + currency;
                            $(target).html(value);
                        }
                    });
                });
            } else if (currency !== '') {
                if (type == "max") {
                    $.ajax({
                        headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                        url: '/orders/balance',
                        type: 'POST',
                        dataType: "json",
                        data: { currency: currency },
                        success: function success(data) {

                            value = formatNumber.num(data.result);
                            $(target).val(value);
                        }
                    });
                } else {
                    $.ajax({
                        headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                        url: '/orders/balance',
                        type: 'POST',
                        dataType: "json",
                        data: { currency: currency },
                        success: function success(data) {
                            value = formatNumber.num(data.result) + ' ' + currency;
                            $(target).html(value);
                        }
                    });
                }
            }
        };

        var selectMaxvalue = function selectMaxvalue(button, target, type) {
            if (type == 'buy') {
                $(button).click(function () {
                    currency = $('#currencyBuy').val();
                    _availableBalance('', target, currency, 'max');
                });
            } else if (type == 'sell') {
                $(button).click(function () {
                    currency = $('#altSell').val();
                    _availableBalance('', target, currency, 'max');
                });
            }
        };

        var buySell = function buySell(button, type) {
            if (type == 'buy') {
                $(button).click(function () {
                    alt = $('#altBuy').val();
                    type = $('#typeBuy').val();
                    currency = $('#currencyBuy').val();
                    amount = $('#amountBuy').val().replace(/\./g, '');
                    amount = amount.replace(/,/g, '.');

                    $.ajax({
                        headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                        url: '/orders/buySell',
                        type: 'POST',
                        dataType: "json",
                        data: { currency: currency, amount: amount, type: type, alt: alt },
                        success: function success(data) {
                            alert(data.message);
                            $('#form_order_search').trigger("submit");
                        }
                    });
                });
            } else if (type == 'sell') {
                $(button).click(function () {
                    alt = $('#altSell').val();
                    type = $('#typeSell').val();
                    currency = $('#currencySell').val();
                    amount = $('#amountSell').val().replace(/\./g, '');
                    amount = amount.replace(/,/g, '.');

                    $.ajax({
                        headers: { 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content') },
                        url: '/orders/buySell',
                        type: 'POST',
                        dataType: "json",
                        data: { currency: currency, amount: amount, type: type, alt: alt },
                        success: function success(data) {
                            alert(data.message);
                            $('#form_order_search').trigger("submit");
                        }
                    });
                });
            }
        };

        /*Search Orders Table*/


        var orderTableOrderBy = function orderTableOrderBy(by) {
            if (orderOrderBy === by) {
                if (orderOrderDirection === "") {
                    orderOrderDirection = "DESC";
                } else {
                    orderOrderDirection = "";
                }
            } else {
                orderOrderBy = by;
                orderOrderDirection = "";
            }
            searchOrder(1);
        };

        //Get Order Data

        var searchOrder = function searchOrder(page) {
            resultPage = $("#result_order_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/orders",
                type: 'post',
                data: { searchvalue: searchOrderValue, page: page, orderBy: orderOrderBy, orderDirection: orderOrderDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var user = data.user;
                    var orders = data.result;
                    var currentsIn = data.in;
                    var currentsOut = data.out;

                    if (orders.length == 0) {
                        $("#table_order_content").html("");
                        $('#table_order_content').append('<tr><td colspan="11">None</td></tr>');
                    } else {
                        $("#table_order_content").html("");
                        for (i = 0; i < orders.length; i++) {
                            var order = orders[i];
                            var currentIn = currentsIn[i];
                            var currentOut = currentsOut[i];
                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');

                            var colvalue_1 = $('<td class="col-sm-12 col-md-2">' + currentOut.symbol + '</td>');
                            var colvalue_2 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(order.out_amount) + '</td>');
                            var colvalue_3 = $('<td class="col-sm-12 col-md-2">' + order.rate + '</td>');
                            var colvalue_4 = $('<td class="col-sm-12 col-md-2">' + order.fee + '</td>');
                            var colvalue_5 = $('<td class="col-sm-12 col-md-2">' + currentIn.symbol + '</td>');
                            var colvalue_6 = $('<td class="col-sm-12 col-md-2">' + formatNumber.num(order.in_amount) + '</td>');
                            var colvalue_7 = $('<td class="col-sm-12 col-md-2">' + +'</td>');
                            var colvalue_8 = $('<td class="col-sm-12 col-md-2">' + order.reference + '</td>');
                            var colvalue_9 = $('<td class="col-sm-12 col-md-2">' + order.created_at + '</td>');
                            var colvalue_10 = $('<td class="col-sm-12 col-md-2">' + active(order.confirmed) + '</td>');
                            var colvalue_11 = $('<td class="col-sm-12 col-md-2"></td>');

                            var printbut = $("<button type='button' name='button' id='withPrint'>Receipt</button>");
                            printRecipient(user, order, currentOut.symbol, 'withdraw', printbut);

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
                        var resultPage = $("#result_order_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_order pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageButton(pagebutton);
                            }

                            $("#table_order_pagination").append(pageList);
                        } else if (page === totalPages) {

                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_order pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageButton(pagebutton);
                            }

                            $("#table_order_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_order pages">' + i + '</li>');
                                pageList.append(pagebutton);
                                addPageOButton(pagebutton);
                            }

                            $("#table_order_pagination").append(pageList);
                        }
                    }
                    // Put the data into the element you care about.
                },
                // Fin
                error: function error(_error12) {
                    ReadError(_error12);
                }
            });
        };

        var addPageOButton = function addPageOButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchOrder(page);
            });
        };

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

        $("#form_order_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchOrderValue = $("#search_order_value").val();
            searchOrder(1);
        });

        $('#result_order_page').change(function () {
            $('#form_order_search').trigger("submit");
        });

        $('#form_order_search').trigger("submit");

        selectCurrencyOrder('#btnBTC', 'BTC');
        selectCurrencyOrder('#btnETH', 'ETH');
        selectCurrencyOrder('#btnLTC', 'LTC');

        $('#btnBTC').trigger('click');
    }

    /* End Orders Functions */
});

/***/ })

/******/ });