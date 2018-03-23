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


$(document).ready(function(){

    /* Global PathName Variable */
    var pathname = window.location.pathname;

    /*Begin Menu Function BackEnd*/

    /*Click item Menu for slideToggle*/
    $('.menuItem').click(function(){
        if($('.menuItem').is('#open')){
            if(!$(this).is('#open')){
                $('#open').find(".submenuItem").slideToggle('200', 'linear');
                $('.menuItem').removeAttr('id');
            }
        }
        if(!($(this).is('#open'))){
            $(this).attr('id', 'open');
        }
        if($(this).find(".submenuItem").css('display') == 'block'){
            $(this).removeAttr('id');
        }
        $(this).find(".submenuItem").slideToggle('200', 'linear');
    })

    /*Open and Close Menu Tab*/
    $('#menuToggle').click(function(){
        if($('#leftContent').width() >= 140 ){
            $('#leftContent').animate({width: "3%"});
            $('#rightContent').animate({width: "97%"});
            $('.menuItem').find("p").css('display', 'none');
            $('#mainLogo').css('display', 'none');
            $('#menuToggle').css('float', 'none');
            $('#menuToggle').css('text-align', 'center');
            $('.submenuItem').css('margin-left', '98%');
            $('.submenuItem').css('position', 'absolute');
            $('.submenuItem').css('width', '150px');
        }else{
            $('#leftContent').animate({width: "13%"});
            $('#rightContent').animate({width: "87%"}, "fast");
            $('.menuItem').find("p").css('display', 'block');
            $('#mainLogo').css('display', 'block');
            $(this).css('float', 'right');
            $('.submenuItem').css('margin-left', '0');
            $('.submenuItem').css('position', 'relative');
            $('.submenuItem').css('width', 'auto');
        }
    })

    /* END Menu Functions BackEnd */

    /* Begin Common Functions */

    /* Read File URL */
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#picture").change(function(){
        readURL(this);
        $('#previewImage').animate({width: 'show'}, 'fast');
    });

    /*Close Button For Close a modal Box*/
    function closeButton(clsbut, modal){
        clsbut.click(function(){
                $(modal).remove();
        });
    }

    /* Alter Formulary for verification Process */
    function alterForm(form, change){
        $(form + ' input, ' + form +' select, '+ form +' textarea' ).each(function(index){
            input = $(this);
            if(change == true){
                input.attr('disabled', change);
            }else{
                input.removeAttr('disabled');
            }

        })

    }

    /* Back Button For Rewrite Data Storage */
    function backButton(backBut, form, target){
        backBut.click(function(){
            alterForm(form, false);
            $('#'+target+'Conf').remove();
            $('#'+target+'Back').remove();
            $('#'+target+'Cont').show();
            $('#'+target+'Pass').show();
        })
    }

    /*Currency Prices API, ON TEST*/
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

    function random_rgb() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
    }

    /* Format Number For Amounts*/
    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear:function (num){
            num +='';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';

              splitRight = splitRight.substring(0,8);

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
    var formatNumber2 = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear:function (num){
            num +='';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';

              splitRight = splitRight.substring(0,3);

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
    /* Applicate formatnumber function to an input */
    function formatInput(input){
        $(input).change(function(){
            value = $(this).val();
            val = formatNumber.num(value);
            $(this).val(val);
        })
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
    function closeModal(modal){
        $(modal).remove();
    }

    /* Operation Modal Print, Modal for prints recipients */
    function takeHeight(){
      height = $('.row.content' ).height();
      $('.row.content').css('height', height);
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


    function cutText(text){
      text1 = text.substr(0, 30);
      text1 = text1 + '...';
      return text1;
    }

    /* Print Recipients deposits or withdraw Recipients */

    function profilePhoto(){
      $.ajax({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          url: "/users/profile",
          type: 'post',
          success: function (data) {
            user = data.result;
            if(user.image !== null){
              $('.imageIcon').attr('src', user.image);
            }
          }
      })
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

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
    /* End Common Functions */

    /*Begin DashBoard Functions*/
    profilePhoto();
    takeHeight();

    if(pathname.toString() == '/home'){
      Chart.defaults.global.defaultFontColor = 'white';
      Chart.defaults.global.defaultFontFamily = 'florence';
      function balance(){
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/dashboard/balance",
            type: 'post',
            success: function (data) {
              var balances = data.result;
              var initial = data.initial.amount;
              var usd = data.usd;
              var btc = data.btc;
              var initialB = data.initialb;
              var profit = data.profit;
              var percent = data.percent;
              var chart = data.chart;
              var colors = ['#F08080', '#20B2AA', '#B0C4DE', '#87CEEB',
                            '#FFA07A', '#FF7F50', '#FF6347', '#FA8072',
                            '#FFA500', '#FFD700', '#FFFF00', '#FFE4B5',
                            '#FFDAB9', '#EEE8AA', '#E6E6FA', '#D8BFD8',
                            '#DDA0DD', '#9370DB', '#9966CC', '#8B008B',
                            '#6A5ACD', '#7B68EE', '#98FB98', '#66CDAA',
                            '#8FBC8F', '#DB7093', '#008B8B', '#E0FFFF',
                            '#AFEEEE', '#7FFFD4', '#40E0D0', '#FFC0CB',
                            '#B0E0E6', '#ADD8E6', '#F0FFF0',
                            '#F5FFFA', '#F0FFFF', '#FFB6C1', '#C0C0C0'];
              for(i=0; i < balances.length; i++){
                var balance = balances[i];
                var amount = chart['amount'][i];
                var symbol = chart['symbol'][i];

                list = '<div class="col-sm-12"><div class="col-sm-2 colorChart" id="colorChart'+i+'"><div class="color"></div></div><div class="col-sm-9 text-left"><h5 class="list-group-item-heading">'+symbol+'</h5><p class="small">Amount: '+formatNumber2.num(amount)+'</p><p class="small">percent: '+formatNumber2.num(balance.percent)+'%</p></div></div>';
                list2 = $('<div class="col-sm-12 text-center folioList"></div>');

                symbol = $('<div class="col-sm-3"><h5>'+balance.name+'</h5></div>');
                percents = parseInt(balance.percent);
                progress = $('<div class="col-sm-3 divPro"><div class="progress"><div class="progress-bar progress-bar-striped" id="progress'+i+'" role="progressbar" aria-valuenow="'+percents+'" aria-valuemin="0" aria-valuemax="100" style="width:'+percents+'%">'+percents+'%</div></div></div>');
                amount = $('<div class="col-sm-3"><h5>'+balance.amount+' '+ balance.symbol +'</h5></div>');
                va = $('<div class="col-sm-3"><h5>$ '+formatNumber2.num(chart['amount'][i])+'</h5></div>');

                list2.append(symbol);
                list2.append(progress);
                list2.append(amount);
                list2.append(va);

                $('.myPortfolio').append(list2);
                $('.list-gr').append(list);
                $('#colorChart'+i).css('background-color', colors[i]);
                $('#progress'+i).css('background-color', colors[i]);
              }

              diffI = initial - usd;
              diffP = initial - diffI;
              diffB = initialB - btc;
              if(profit > 0){
                  color = '#9966CC';
              }else{
                  color = '#40E0D0';
              }
              var configI = {
			             type: 'doughnut',

			                data: {
				                    datasets: [{
					                        data: [initial],
					                        backgroundColor: [
                                    "#36A2EB",
					                        ],
                                  borderColor:[
                                    'transparent'
                                  ],
					                        hoverBackgroundColor: [
					                          "#36A2EB",
					                        ],
                                  borderWidth: [1],
				                     }]
			                },
		                  options: {
                        cutoutPercentage: 90,
                        responsive:true,
                        maintainAspectRatio: false,
			                     elements: {
				                         center: {
					                              text: 'USD',
                                        color: 'white', // Default is #000000
                                        fontStyle: 'florence', // Default is Arial
                                        sidePadding: 40// Defualt is 20 (as a percentage)
				                         }
			                     },
                                 tooltips: {
                                     enabled: false,
                                 }
		                  }
	            };
                $('#initialAmount').append(formatNumber2.num(initial));

              var ctxI = document.getElementById("initialChart").getContext("2d");
		          var initialChart = new Chart(ctxI, configI);

              var configT = {
			             type: 'doughnut',

			                data: {
				                    datasets: [{
					                        data: [usd, diffI],
					                        backgroundColor: [
                                    color,
                                    '#8a8a8a47',
					                        ],
                                  borderColor:[
                                    'transparent',
                                    '#3a3a3a00'
                                  ],
					                        hoverBackgroundColor: [
					                          color,
                                    '#3a3a3a00'
					                        ],
				                     }]
			                },
		                  options: {
                        cutoutPercentage: 90,
                        responsive:true,
                        maintainAspectRatio: false,
			                     elements: {
				                         center: {
					                              text: 'USD',
                                        color: color, // Default is #000000
                                        fontStyle: 'florence', // Default is Arial
                                        sidePadding: 40// Defualt is 20 (as a percentage)
				                         }
			                     },
                                 tooltips: {
                                     enabled: false,
                                 }
		                  }
	            };
              var ctxT = document.getElementById("totalChart").getContext("2d");
		          var totalChart = new Chart(ctxT, configT);
                  $('#usdAmount').append(formatNumber2.num(usd));
                  var configP = {
    			             type: 'doughnut',

    			                data: {
    				                    datasets: [{
    					                        data: [profit, diffP],
    					                        backgroundColor: [
                                        '#ae6ec3',
                                        '#8a8a8a47',
    					                        ],
                                      borderColor:[
                                        'transparent',
                                        '#3a3a3a00'
                                      ],
    					                hoverBackgroundColor: [
    					                          "#ae6ec3",
                                        '#3a3a3a00'
    					                        ],
                                        hoverBorderColor:[
                                            'transparent',
                                            '#3a3a3a00'
                                        ]
    				                     }]
    			                },
    		                  options: {
                            cutoutPercentage: 90,
                            responsive:true,
                            maintainAspectRatio: false,
    			                     elements: {
    				                         center: {
    					                              text: formatNumber2.num(percent)+'%',
                                            color: '#ae6ec3', // Default is #000000
                                            fontStyle: 'florence', // Default is Arial
                                            sidePadding: 10// Defualt is 20 (as a percentage)
    				                         }
    			                     },
                                     tooltips: {
                                         enabled: false,
                                     }
    		                  }
    	            };
                  var ctxP = document.getElementById("profitChart").getContext("2d");
    		      var profitChart = new Chart(ctxP, configP);

                  if(btc < initialB){
                      colorb = '#dc677d';
                  }else{
                      colorb = '#9370DB';
                  }
                  var configB = {
    			             type: 'doughnut',

    			                data: {
    				                    datasets: [{
    					                        data: [btc, diffB],
    					                        backgroundColor: [
                                        colorb,
                                        '#8a8a8a47',
    					                        ],
                                      borderColor:[
                                        'transparent',
                                        '#3a3a3a00'
                                      ],
    					                hoverBackgroundColor: [
    					                          colorb,
                                        '#3a3a3a00'
    					                        ],
                                        hoverBorderColor:[
                                            'transparent',
                                            '#3a3a3a00'
                                        ]
    				                     }]
    			                },
    		                  options: {
                            cutoutPercentage: 90,
                            responsive:true,
                            maintainAspectRatio: false,
    			                     elements: {
    				                         center: {
    					                              text: 'BTC',
                                            color: colorb, // Default is #000000
                                            fontStyle: 'florence', // Default is Arial
                                            sidePadding: 40// Defualt is 20 (as a percentage)
    				                         }
    			                     },
                                     tooltips: {
                                         enabled: false,
                                     }
    		                  }
    	            };
                  var ctxB = document.getElementById("BTCChart").getContext("2d");
    		      var btcChart = new Chart(ctxB, configB);
                  $('#btcAmount').append(formatNumber.num(btc));

              var ctx = document.getElementById("myChart").getContext('2d');
              var myChart = new Chart(ctx, {
                options:{
                    responsive:true,
                    maintainAspectRatio: false,
                    tooltips: {
                        enabled: false,
                    }
                },
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: 'Balances',
                        data: chart['amount'],
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
              });
            }
        })
      }

      function newsletter(){

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/dashboard/newsletter",
            type: 'post',
            success: function (data) {
                newsletters = data.result;
                if(newsletters.length == 0){
                    $('.bodyNews').empty()
                    $('.bodyNews').append('<p>No Messages</p>');
                }else{
                    for(i=0;i< newsletters.length; i++){
                      var newsletter = newsletters[i];
                      divM = $('<div class="messageSlides fade"></div>');
                      message = $('<p>'+cutText(newsletter.message)+'</p>');

                      div = $('<div class="dateSlides fade text-center"></div>')
                      date = $('<h5>'+newsletter.date+'</h5>');

                      divR = $('<div class="readSlides fade text-center"></div>')
                      readM = $('<button type="button" data-toggle="modal" data-target="#newsMod"  class="btn btn-alternative">Read More</button>');

                      prev = $('<a class="prev">&#10094;</a>');
                      next = $('<a class="next">&#10095;</a>');


                      divM.append(message);
                      div.append(date);
                      divR.append(readM);



                      $('.message-container').append(divM);
                      $('.date-container').append(div);
                      $('.read-container').append(divR);
                      viewNews(readM, newsletter);

                    }
                    slide(prev, next);
                    slideD(prev, next);
                    slideR(prev, next);
                    $('.date-container').append(prev);
                    $('.date-container').append(next);
                }

            }
        })
      }

      function viewNews(but, news){
        but.click(function(){
          title = $('<h4>'+news.title+'</h4>');
          message = $('<p>'+news.message+'</p>');
          textby = $('<p id="created by">Created By '+ news.name +'</p>');
          $('.modal-header').empty();
          $('.modal-body').empty();
          $('.modal-header').append(title);
          $('.modal-body').append(message);
          $('.modal-body').append(textby);
        })
      }

      function slide(prev, next){
        var slideIndex = 1;

        showSlides(slideIndex);

        // Next/previous controls
        prev.click(function(){
          showSlides(slideIndex += -1);
        })
        next.click(function(){
          showSlides(slideIndex += 1);
        })

        // Thumbnail image controls
        function currentSlide(n) {
        showSlides(slideIndex = n);
        }

        function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("messageSlides");

        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        }

      }

      function slideD(prev, next) {
          var slideIndex = 1;

          showSlidesD(slideIndex);

          // Next/previous controls
          prev.click(function(){
            showSlidesD(slideIndex += -1);
          })
          next.click(function(){
            showSlidesD(slideIndex += 1);
          })

          // Thumbnail image controls
          function currentSlideD(n) {
          showSlidesD(slideIndex = n);
          }

          function showSlidesD(n) {
          var i;
          var slides = document.getElementsByClassName("dateSlides");

          if (n > slides.length) {slideIndex = 1}
          if (n < 1) {slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
          }
          slides[slideIndex-1].style.display = "block";
          }
      }

      function slideR(prev, next) {
          var slideIndex = 1;

          showSlidesR(slideIndex);

          // Next/previous controls
          prev.click(function(){
            showSlidesR(slideIndex += -1);
          })
          next.click(function(){
            showSlidesR(slideIndex += 1);
          })

          // Thumbnail image controls
          function currentSlideR(n) {
          showSlidesR(slideIndex = n);
          }

          function showSlidesR(n) {
          var i;
          var slides = document.getElementsByClassName("readSlides");

          if (n > slides.length) {slideIndex = 1}
          if (n < 1) {slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
          }
          slides[slideIndex-1].style.display = "block";
          }
      }

      function lineChart(but, type){
        $(but).click(function(){
          $('.btn-chart').removeClass('active');
          $(this).addClass('active');
          $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {type: type},
            url: "/dashboard/charts",
            type: 'post',
            success: function (data) {
              chart = data.result;
              var ctx = document.getElementById("historicalChart").getContext('2d');
              var myChart = new Chart(ctx, {
                options:{
                    responsive:true,
                    maintainAspectRatio: false,
                },
                type: 'line',
                data: {
                    labels: chart['register'],
                    datasets: [{
                        label: 'USD Value',
                        data: chart['amount'],
                        backgroundColor: [
                            'rgba(52, 152, 219, 0.5)',
                        ],
                        borderColor: [
                            'rgba(52, 112, 241, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
              });
            },
          })
        })
      }


      lineChart('#daily', 'daily');

      lineChart('#weekly', 'weekly');

      lineChart('#monthly', 'monthly');

      $('#daily').trigger('click');

      newsletter();

      balance();
    }

    /*End DashBoard Functions*/

    /*Begin Profile Functions*/

    if(pathname.toString() == '/profile'){
        $('.listprofile').addClass('active');
        function profile(){

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/users/profile",
                type: 'post',
                success: function (data) {
                    user = data.result;
                    var name = user.name.split(' ');
                    firstname = name[0];
                    lastname = name[1];
                    title = user.roles[0].slug;
                    email = user.email;

                    if(user.image !== null){
                      image = user.image;
                      $('#profilePic').attr("src", image);
                    }

                    $('#name').empty();
                    $('#lastname').empty();
                    $('#title').empty();
                    $('#email').empty();

                    $('#name').append(firstname);
                    $('#lastname').append(lastname);
                    $('#title').append(title);
                    $('#email').append(email);
                    button = $('<button type="button" class="btn btn-alternative btn-edit" data-toggle="modal" data-target="#profileMod" name="button">Edit Information</button>');
                    editProfile(button, user);
                    $('.btn-edit').remove();
                    $('.basicInfo').append(button);

                }
            })


        }

        $('.btn-photo').click(function(){
            box = $('<div id="image-cropper" class="text-center" style="padding: 50px 0px;" ></div>');
            divpreview = $('<div class="cropit-preview" style="margin: 0 auto; display:block;"></div>');
            controls = $('<div class="cropit-controls col-sm-12"></div>');
            rotation = $('<div class="col-sm-4 text-center"><span class="glyphicon glyphicon-repeat icon icon-right rotate-ccw-btn"></span><span class="glyphicon glyphicon-repeat icon rotate-cw-btn"></span></div>');
            range = $('<div class="col-sm-8"></div>')
            inputrange = $('<span class="glyphicon glyphicon-picture icon small" style="float:left; margin-top:2px;"></span><input type="range" class="slider cropit-image-zoom-input" style="float:left;" /><span class="glyphicon icon glyphicon-picture" style="float:left;"></span>');
            inputimg = $('<input type="file" class="cropit-image-input" />');
            btnimg = $('<div class="text-center"><button type="button" class="btn btn-alternative btn-select-image text-center">Select Photo</button></div>');

            $('.modal-title').empty();
            $('.modal-body').empty();
            $('.modal-footer').empty();

            $('.modal-title').append('Upload Photo');

            controls.append(rotation);
            range.append(inputrange);
            controls.append(range);



            box.append(divpreview);
            box.append(inputimg);
            box.append(controls);

            $('.modal-body').append(box);


            $('.modal-body').append(btnimg);

            $('.modal-footer').append("<div id='profButts'></div>");

            closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
            makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='profCont'>Upload</button>");

            cropt();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/users/profile",
                type: 'post',
                success: function (data) {
                    user = data.result;
                    uploadPicture(makeBut, user.id);
                }
            })


            $('#profButts').append(makeBut);
            $('#profButts').append(closebut);
        })

        function uploadPicture(but, id){
          but.click(function(){
            var imageData = $('#image-cropper').cropit('export');
            var formData = new FormData();
            formData.append('picture', imageData);
            formData.append('id', id);

            $.ajax({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
        	     url: "/profile/upload/picture",
			         type: "POST",
			         data: formData,
	             contentType: false,
    	         processData:false,
               success: function(data){
                   $('#profileMod').modal('hide');
                   $('.text-alert').empty();
                   $('.text-alert').append('Photo Upload Successfully');
                   $('.alert').removeClass('alert-warning');
                   $('.alert').removeClass('alert-danger');
                   $('.alert').addClass('alert-success');
                   $('#profileAlertMod').modal('show');
                   profile();
                   profilePhoto();
               },
               error: function (error) {
                   $(this).removeClass('disabled');
                   $('.text-alert').empty();
                   $('.text-alert').append('An error has ocurred');
                   $('.alert').removeClass('alert-success');
                   $('.alert').removeClass('alert-danger');
                   $('.alert').addClass('alert-warning');
                   $('#profileAlertMod').modal('show');
               }
	          });
          })
        }
        function cropt(){
          $('#image-cropper').cropit({ imageBackground: true });
          // When user clicks select image button,
          // open select file dialog programmatically
          $('.btn-select-image').click(function() {
            $('.cropit-image-input').click();
          });

          // Handle rotation
          $('.rotate-cw-btn').click(function() {
            $('#image-cropper').cropit('rotateCW');
          });
          $('.rotate-ccw-btn').click(function() {
            $('#image-cropper').cropit('rotateCCW');
          });
        }

        function passwordEditUser(pebutton){
            pebutton.click(function(){
                $('.PasswordBox').toggle('slow');
            })
        }

        function editProfile(edit, user){
          edit.click(function(){
            var name = user.name.split(' ');
            box = $("<form class='ProfileForm' id='ProfileForm' enctype='multipart/form-data' ></form>");
            alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Currency</strong></div>');
            inputN = $('<div class="form-group"><label for="name">Name</label><input id="nameI" name="name" type="text" class="form-control" placeholder="Name" value="'+name[0]+'" required></div>');
            inputI = $('<input id="idI" name="lastname" value="'+user.id+'" type="text" class="form-control" placeholder="Lastname" required style="display:none;">')
            inputS = $('<div class="form-group"><label for="lastname">Lastname</label><input id="lastnameI" name="lastname" value="'+name[1]+'" type="text" class="form-control" placeholder="Lastname" required></div>');
            inputA = $('<div class="form-group"><label for="email">Email</label><input id="emailI" name="email" type="text" class="form-control" placeholder="Email" value="'+user.email+'" required></div></div>');
            inputP = $('<div class="PasswordBox form-group" style="display:none;"><label for="password">Password</label><input id="passwordI" name="password" type="password" class="form-control" placeholder="Password" required></div>');
            inputPC = $('<div class="PasswordBox form-group" style="display:none;"><label for="passwordConf">Confirm Password</label><input id="passwordConfI" name="passwordConf" type="password" class="form-control" placeholder="Confirm Password" required></div>');

            $('.modal-title').empty();
            $('.modal-body').empty();
            $('.modal-footer').empty();
            $('.modal-title').append('Edit Basic Information');
            $('.modal-body').append(box);

            $('#ProfileForm').append(alert);

            $('#ProfileForm').append(inputI);
            $('#ProfileForm').append(inputN);
            $('#ProfileForm').append(inputS);
            $('#ProfileForm').append(inputA);
            $('#ProfileForm').append(inputP);
            $('#ProfileForm').append(inputPC);

            $('.modal-footer').append("<div id='profButts'></div>");
            peBut = $("<button type='button' name='button' class='btn btn-alternative' id='profPass'>Change Password</button>");
            closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
            makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='profCont'>Make</button>");

            addMakeprofileButton(makeBut);
            passwordEditUser(peBut);

            $('#profButts').append(makeBut);
            $('#profButts').append(peBut);
            $('#profButts').append(closebut);

          })
        }

        function addMakeprofileButton(makeBut){
            jQuery.validator.addMethod("lettersonly", function(value, element) {
                return this.optional(element) || /^[a-z\s]+$/i.test(value);
            }, "Only alphabetical characters");
            jQuery.validator.addMethod("username", function(value, element) {
                return this.optional(element) || /^[a-z\s\d]+$/i.test(value);
            }, "Only alphabetical characters and numbers");
            jQuery.validator.addMethod("password", function(value, element) {
                return this.optional(element) || /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/i.test(value);
            }, "please introduce at least one capital letter, lower letter, and number, minimun 6 characters");


            $('#password').change(function(){
                var password = $(this).val();
            })

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
                    email:{
                        required: true,
                        email: true,
                    },
                    password:{
                        password:true,
                    },
                    passwordConf:{
                        password: true,
                        equalTo: "#password",
                    },
                },
                    messages:{
                    },

            });
            makeBut.click(function(e){
                if($('#ProfileForm').valid()){
                    alterForm('#ProfileForm', true);
                    $('#profCont').hide();
                    $('#profPass').hide();
                    $('#profedit').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='profConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' class='btn btn-alternative' id='profBack'>Back</button>");
                    backButton(backBut, '#ProfileForm', 'prof');
                    confirmEuserButton(confirmBut);
                    $('#profButts').prepend(backBut);
                    $('#profButts').prepend(confirmBut);


                }
            })
        }

        /* Confirm Button For Editing User */
        function confirmEuserButton(confirmBut){
            confirmBut.click(function(){
                $(this).addClass('disabled');
                name = $('#nameI').val();
                lastname = $('#lastnameI').val();
                email = $('#emailI').val();
                password = $('#passwordI').val();
                confirm = $('#passwordConfI').val();
                id = $('#idI').val();
                console.log(lastname);
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/users/profile/update',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id, name: name, lastname: lastname,  email:email, password:password, password_confirmation:confirm},
                    success: function(data){
                        $('#profileMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('Information Change Successfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#profileAlertMod').modal('show');
                        profile();
                    },
                    error: function (error) {
                        $(this).removeClass('disabled');
                        $('.text-alert').empty();
                        $('.text-alert').append('An error has ocurred');
                        $('.alert').removeClass('alert-success');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-warning');
                        $('#profileAlertMod').modal('show');
                    }
                })
            })
        }

        profile();
    }

    /*End Profile Functions*/

    /*User Functions*/

    if(pathname.toString() == '/users'){

        $('.listuser').addClass('active');
        /*Search User Table*/

        $('#table_user_header_name').click(function (e) {
          orderTableUserBy('name');
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

        //Get User Data

        function searchUser(page){
            resultPage =  $( "#result_user_page" ).val();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/users",
                type: 'post',
                data: { searchvalue : searchUserValue, page : page, orderBy :orderUserBy, orderDirection: orderUserDirection, resultPage: resultPage } ,
                success: function (data) {
                    //Inicio
                    var users = data.result;
                    var roles = data.roles;
                    if(users.length == 0){
                        $("#table_user_content").html("");
                        $('#table_user_content').append('<tr><td colspan="7">None</td></tr>');
                    }else{
                        $("#table_user_content").html("");
                        for(i=0;i < users.length;i++)
                        {
                            var user = users[i];
                            var role = roles[i];

                            var rowResult = $( '<tr></tr>');
                            var colvalue_1 = $( '<td>'+  user.name +'</td>');
                            var colvalue_3 = $( '<td>'+  user.email  +'</td>');

                            var colvalue_4 = $('<td></td>');
                            for(a=0 ; a < role.length ; a++){
                                var rol = role[a];
                                colvalue_4.append(rol.name + '<br/>');
                            }
                            editBut = $('<button type="button" class="btn btn-alternative btn-sm" data-toggle="modal" data-target="#userMod" id="editBut">Edit</button> ');
                            delBut = $('<button type="button" data-toggle="modal" data-target="#userMod" class="btn btn-alternative-danger btn-alternative btn-sm" id="delBut">Delete</button>');
                            // we have to make in steps to add the onclick event
                            addEditUserClick(editBut, user, role);
                            addMakeDuserButton(delBut, user);
                            var colvalue_5 = $( '<td>'+  user.created_at  +'</td>');
                            var colvalue_6 = $( '<td>'+  user.updated_at  +'</td>');
                            var colvalue_7 = $( '<td class="text-center"></td>');

                            colvalue_7.append(editBut);
                            colvalue_7.append(delBut);

                            rowResult.append(colvalue_1);
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
                                pagebutton = $( '<li class="page_user pages"><a href="#">'+ i +'</a></li>');
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
                                pagebutton = $( '<li class="page_user pages"><a href="#">'+ i +'</a></li>');
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

                                pagebutton = $( '<li class="page_user pages"><a href="#">'+ i +'</a></li>');
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

        /* Modal Create User */

        $('.btn-create').click(function(){

            box = $("<form class='UserForm' id='UserForm' enctype='multipart/form-data' ></form>");
            alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the User</strong></div>');
            inputN = $('<div class="form-group"><label for="name">Name</label><input id="name" name="name" type="text" class="form-control" placeholder="Name" required></div>');
            inputL = $('<div class="form-group"><label for="lastname">Last Name</label><input id="lastname" name="lastname" type="text" class="form-control" placeholder="Last Name" required></div>');
            inputE = $('<div class="form-group"><label for="email">Email</label><input id="email" name="email" type="text" class="form-control" placeholder="Email" required></div>');
            inputP = $('<div class="form-group"><label for="password">Password</label><input id="password" name="password" type="password" class="form-control" placeholder="Password" required></div>');
            inputPC = $('<div class="form-group"><label for="passwordConf">Confirm Password</label><input id="passwordConf" name="passwordConf" type="password" class="form-control" placeholder="Confirm Password" required></div>');
            selectR = $('<div class="form-group"><label for="role" >Role</label><div id="roles" style="height:fit-content;" class="form-control"></div>');
            selectC = $('<div class="form-group" id="clientBox" style="display:none;"><label for="selectc" >Client</label><div><select id="client" class="form-control" name="selectc"></select></div>');

            $('.modal-title').empty();
            $('.modal-body').empty();
            $('.modal-footer').empty();
            $('.modal-title').append('Create User');
            $('.modal-body').append(box);

            $('#UserForm').append(alert);
            $('#UserForm').append(inputN);
            $('#UserForm').append(inputL);
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
                success: function (data) {
                    //Inicio
                    roles = data.data;
                    for(i=0;i < roles.length;i++)
                    {
                        var role = roles[i];
                        var label = $('<label id="labelr'+i+'" class="RoleLabel checkbox-inline" >'+ role.name + '</label>');
                        var input = $('<input class="roles" type="checkbox" name="role" value="'+ role.id +'"/>');
                        $('#roles').append('<div class="checkRoles'+i+' checkbox-inline" data-toggle="tooltip" data-placement="bottom" title="'+ role.description +'"></div>');
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
            closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
            $('.modal-footer').prepend("<div id='userButts'></div>");

            makeBut = $("<button type='button' name='button' class='btn btn-alternative' id='userCont'>Make</button>");
            addMakeuserButton(makeBut);


            $('#userButts').append(makeBut);
            $('#userButts').append(closebut);
        });

        /*List Users for Clients*/
        function userClient(location){
            location.click(function(){
                if($(this).hasClass('selected')){
                    $(this).removeClass('selected');
                    $('#clientBox').hide();
                }else{
                    $('#client').html('');
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
                                for(i=0; i < clients.length; i++)
                                {
                                    var client = clients[i];
                                    $('#client').append('<option class="clients" value="'+ client.id +'">' +client.name+'</option>');

                                }
                                $('#clientBox').show();
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

        /*Make Button For Create User*/
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

            $('#password').change(function(){
                var password = $(this).val();
            })

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
                    email:{
                        required: true,
                        email: true,
                    },
                    password:{
                        required:true,
                        password:true,
                    },
                    passwordConf:{
                        required: true,
                        password: true,
                        equalTo: "#password",
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
                    confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='userConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' class='btn btn-alternative' id='userBack'>Back</button>");
                    backButton(backBut, '#UserForm', 'user');
                    confirmuserButton(confirmBut);
                    $('#userButts').prepend(backBut);
                    $('#userButts').prepend(confirmBut);

                }
            })

        }

        /* Confirm User For Creation */
        function confirmuserButton(confirmBut){
            confirmBut.click(function(){
                    $(this).addClass('disabled');
                    name = $('#name').val();
                    lastname = $('#lastname').val();
                    username = $('#username').val();
                    email = $('#email').val();
                    password = $('#password').val();
                    confirm = $('#passwordConf').val();
                    client = $('#client').val();
                    var role = [];
                    $('input[name="role"]').each(function(){
                        if($(this).is(':checked')){
                            role.push($(this).val());
                        }
                    });

                    $.ajax({

                        headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                        url: '/users/create',
                        type: 'POST',
                        dataType: "json",
                        data: {name: name, lastname: lastname, username: username, email:email, password:password, password_confirmation:confirm, roles:role, client:client},
                        success: function(data){
                            $('#form_user_search').trigger("submit");
                            $('#userMod').modal('hide');
                            $('.text-alert').empty();
                            $('.text-alert').append('User Created Sucessfully');
                            $('.alert').removeClass('alert-warning');
                            $('.alert').removeClass('alert-danger');
                            $('.alert').addClass('alert-success');
                            $('#userAlertMod').modal('show');
                        },
                        error: function (error) {
                            $(this).removeClass('disabled');
                            $('.text-alert').empty();
                            $('.text-alert').append('An error has ocurred');
                            $('.alert').removeClass('alert-success');
                            $('.alert').removeClass('alert-danger');
                            $('.alert').addClass('alert-warning');
                            $('#userAlertMod').modal('show');
                        }
                    })
            })
        }

        /*Edit Button With Modal edition for Users*/
        function addEditUserClick(buttonEdit, user, rols){
            var name = user.name.split(' ');
            buttonEdit.click(function (){
                box = $("<form class='UserForm' id='UserForm' enctype='multipart/form-data' ></form>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the User</strong></div>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ user.id +'" required>');
                inputN = $('<div class="form-group"><label for="name">Name</label><input id="name" name="name" type="text" class="form-control" placeholder="Name" value="'+ name[0] +'" required></div>');
                inputL = $('<div class="form-group"><label for="lastname">Last Name</label><input id="lastname" name="lastname" type="text" class="form-control" placeholder="Last Name" value="'+ name[1] +'" required></div>');
                inputE = $('<div class="form-group"><label for="email">Email</label><input id="email" name="email" type="text" class="form-control" placeholder="Email" value="'+ user.email +'" required></div>');
                inputP = $('<div class="PasswordBox form-group" style="display:none;"><label for="password">Password</label><<input id="password" name="password" type="password" class="form-control" placeholder="Password" required></div>');
                inputPC = $('<div class="PasswordBox form-group" style="display:none;"><label for="passwordConf">Confirm Password</label><input id="passwordConf" name="passwordConf" type="password" class="form-control" placeholder="Confirm Password" required></div>');
                selectR = $('<div class="form-group"><label for="role" >Role</label><div id="roles" style="height:fit-content;" class="form-control"></div>');
                selectC = $('<div class="form-group" id="clientBox" style="display:none;"><label for="selectc" >Client</label><select id="client" class="form-control" name="selectc"></select></div>');

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Edit User');
                $('.modal-body').append(box);
                $('#UserForm').append(alert);
                $('#UserForm').append(inputI);
                $('#UserForm').append(inputN);
                $('#UserForm').append(inputL);
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
                    success: function (data) {
                        //Inicio
                        roles = data.data;
                        for(i=0;i < roles.length;i++)
                        {
                            var role = roles[i];
                            var label = $('<label id="labelr'+ i +'" class="RoleLabel" >'+ role.name + '</label>');
                            var input = $('<input class="roles" id="role'+i+'" type="checkbox" name="role" value="'+ role.id +'"/>');
                            $('#roles').append('<div class="checkRoles'+i+' checkbox-inline" title="'+ role.description +'"></div>');
                            userClient(input);
                            $('.checkRoles'+i).append(label);
                            $('#labelr'+i).prepend(input);
                            for(a=0;a < rols.length;a++){
                                rol = rols[a];
                                if(role.name == rol.name){
                                    $('#role'+i).trigger('click');
                                }
                            }
                        }
                    },
                    // Fin
                    error: function (error) {
                        ReadError(error);
                    }
                })

                $('.modal-footer').append("<div id='userButts'></div>");
                closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                makeBut = $("<button type='button' name='button' class='btn btn-alternative' id='userCont'>Make</button>");
                peBut = $("<button type='button' name='button' class='btn btn-alternative' id='userPass'>Change Password</button>");
                passwordEditUser(peBut);
                addMakeEuserButton(makeBut);

                $('#userButts').append(makeBut);
                $('#userButts').append(peBut);
                $('#userButts').append(closebut);
            });
        }

        /*Password Edition For Users*/
        function passwordEditUser(pebutton){
            pebutton.click(function(){
                $('.PasswordBox').toggle('slow');
            })
        }
        /* Make User Button For editing */
        function addMakeEuserButton(makeBut){
            jQuery.validator.addMethod("lettersonly", function(value, element) {
                return this.optional(element) || /^[a-z\s]+$/i.test(value);
            }, "Only alphabetical characters");
            jQuery.validator.addMethod("username", function(value, element) {
                return this.optional(element) || /^[a-z\s\d]+$/i.test(value);
            }, "Only alphabetical characters and numbers");
            jQuery.validator.addMethod("password", function(value, element) {
                return this.optional(element) || /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/i.test(value);
            }, "please introduce at least one capital letter, lower letter, and number, minimun 6 characters");


            $('#password').change(function(){
                var password = $(this).val();
            })

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
                    email:{
                        required: true,
                        email: true,
                    },
                    password:{
                        password:true,
                    },
                    passwordConf:{
                        password: true,
                        equalTo: "#password",
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
                    $('#userPass').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='userConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' class='btn btn-alternative' id='userBack'>Back</button>");
                    backButton(backBut, '#UserForm', 'user');
                    confirmEuserButton(confirmBut);
                    $('#userButts').prepend(backBut);
                    $('#userButts').prepend(confirmBut);


                }
            })
        }

        /* Confirm Button For Editing User */
        function confirmEuserButton(confirmBut){
            confirmBut.click(function(){
                $(this).addClass('disabled');
                name = $('#name').val();
                lastname = $('#lastname').val();
                username = $('#username').val();
                email = $('#email').val();
                password = $('#password').val();
                confirm = $('#passwordConf').val();
                client = $('#client').val();
                id = $('#id').val();
                var role = [];
                $('input[name="role"]').each(function(){
                    if($(this).is(':checked')){
                        role.push($(this).val());
                    }
                });
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/users/update',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id,name: name, lastname: lastname, username: username, email:email, password:password, password_confirmation:confirm, roles:role, client:client},
                    success: function(data){
                        $('#form_user_search').trigger("submit");
                        $('#userMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('User Edited Sucessfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#userAlertMod').modal('show');
                    },
                    error: function(error){
                      $(this).removeClass('disabled');
                      $('.text-alert').empty();
                      $('.text-alert').append('An error has ocurred');
                      $('.alert').removeClass('alert-success');
                      $('.alert').removeClass('alert-danger');
                      $('.alert').addClass('alert-warning');
                      $('#userAlertMod').modal('show');
                    }
                })
            })
        }

        /* Delete Function For User */
        function addMakeDuserButton(delButt, user){
            delButt.click(function(){
                box = $("<form class='UserForm' id='UserForm' enctype='multipart/form-data' ></form>");
                alert = $('<h4><strong>Are You Sure for delete '+ user.name +' user?</strong></h4></div>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ user.id +'" required>');

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Delete User');
                $('.modal-body').append(box);
                $('#UserForm').append(alert);
                $('#UserForm').append(inputI);

                $('.modal-footer').append("<div id='userButts'></div>");

                closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                makeBut = $("<button type='button' name='button' class='btn btn-alternative-danger btn-alternative' id='userCont'>Delete</button>");

                DeleteUserButton(makeBut);

                $('#userButts').append(makeBut);
                $('#userButts').append(closebut);
            })
        }

        /* Confirmation Of User Deletion */
        function DeleteUserButton(delButt){
            delButt.click(function(){
                $(this).addClass('disabled');
                id = $('#id').val();

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/users/delete',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id},
                    success: function(data){
                        $('#form_user_search').trigger("submit");
                        $('#userMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('User Deleted Sucessfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#userAlertMod').modal('show');
                    },
                    error: function(error){
                      $(this).removeClass('disabled');
                      $('.text-alert').empty();
                      $('.text-alert').append('An error has ocurred');
                      $('.alert').removeClass('alert-success');
                      $('.alert').removeClass('alert-danger');
                      $('.alert').addClass('alert-warning');
                      $('#userAlertMod').modal('show');
                    }
                });
            });
        }

        /*Execute Script*/
        $('#result_user_page').change(function(){
            $('#form_user_search').trigger("submit");
        })

        $('#form_user_search').trigger("submit");
    }

    /*End User Functions*/

    /*Begin Currency Functions*/

    if(pathname.toString() == '/currencies'){
        $('.listcurrency').addClass('active');
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

        $( "#form_currency_search" ).submit(function(e){
            e.preventDefault();
            //DESC
            searchCurrencyValue = $( "#search_currency_value" ).val();
            searchCurrency(1);
        });

        function orderTableCurrencyBy(by){
            if(orderCurrencyBy === by){
                if(orderCurrencyDirection === ""){
                    orderCurrencyDirection = "DESC";
                }else{
                    orderCurrencyDirection = "";
                }
            }else{
                orderCurrencyBy = by;
                orderCurrencyDirection = "";
            }
            searchCurrency(1);
        }

        //Get Currency Data

        function searchCurrency(page){
            resultPage =  $( "#result_currency_page" ).val();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/currencies",
                type: 'post',
                data: { searchvalue : searchCurrencyValue, page : page, orderBy :orderCurrencyBy, orderDirection: orderCurrencyDirection, resultPage: resultPage } ,
                success: function (data) {
                    //Inicio
                    var currencies = data.result;
                    if(currencies.length == 0){
                        $("#table_currency_content").html("");
                        $('#table_currency_content').append('<tr><td colspan="6">None</td></tr>');
                    }else{
                        $("#table_currency_content").html("");
                        for(i=0;i < currencies.length;i++)
                        {
                            var currency = currencies[i];
                            // we have to make in steps to add the onclick event
                            var rowResult = $( '<tr></tr>');
                            var colvalue_1 = $( '<td>'+ currency.name +'</td>');
                            var colvalue_2 = $( '<td>'+ currency.symbol +'</td>');
                            var colvalue_3 = $( '<td>'+  currency.type +'</td>');
                            var colvalue_4 = $( '<td>'+  formatNumber.num(currency.value) +'</td>');
                            var colvalue_5 = $( '<td>'+  currency.created_at  +'</td>');
                            var colvalue_6 = $( '<td>'+ currency.updated_at  +'</td>');
                            var colvalue_7 = $( '<td class="text-center"></td>');

                            editBut = $('<button type="button" data-toggle="modal" data-target="#currencyMod" class="btn btn-alternative btn-sm" id="editBut">Edit</button>');
                            delBut = $('<button type="button" data-toggle="modal" data-target="#currencyMod" class="btn btn-alternative-danger btn-alternative btn-sm" id="delBut">Delete</button>');
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
                        var resultPage =  $( "#result_currency_page" ).val();
                        var totalPages = Math.ceil(total / resultPage);
                        if(page === 1){
                            maxPage = page + 2;
                            totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');
                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_currency pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPageCButton(pagebutton);
                            }
                            $("#table_currency_pagination").append(pageList);
                        }else if(page === totalPages){
                            page = page - 2;
                        if(page < 1){
                            page = 1;
                        }
                            totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');
                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_currency pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPageCButton(pagebutton);
                            }
                            $("#table_currency_pagination").append(pageList);
                        }else{
                            page = page - 2;
                            if(page < 1){
                                page = 1;
                            }
                            totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');
                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_currency pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPageCButton(pagebutton);
                            }
                            $("#table_currency_pagination").append(pageList);
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

        function addPageCButton(pagebutton){
            pagebutton.click(function(){
                page = $(this).text();
                searchCurrency(page);
            })
        }

        /* Create Modal Button for Creation of currency*/
        $('.btn-create-Cu').click(function(){

            box = $("<form class='CurrencyForm' id='CurrencyForm' enctype='multipart/form-data' ></form>");
            alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Currency</strong></div>');
            inputN = $('<div class="form-group"><label for="name">Name</label><input id="name" name="name" type="text" class="form-control" placeholder="Name" required></div>');
            inputS = $('<div class="form-group"><label for="symbol">Symbol</label><input id="symbol" name="symbol" type="text" class="form-control" placeholder="Symbol" required></div>');
            selectT = $('<div class="form-group"><label for="type">Type</label><select id="type" class="form-control" name="type"></select></div>');
            inputA = $('<div class="form-group"><label for="value">Value</label><div id="valuechange"><input id="value" name="value" type="text" class="form-control" placeholder="Value" required></div></div>')
            inputC = ('<div class="checkbox-inline" title="Change between manual value or an API value"><label id="labelch" ><input class="changevalue" id="valuechanges" type="checkbox" name="chnge" value=""/> Change value selection</label></div>');

            types = ['Currency', 'Cryptocurrency', 'Token'];

            $('.modal-title').empty();
            $('.modal-body').empty();
            $('.modal-footer').empty();
            $('.modal-title').append('Create Currency');
            $('.modal-body').append(box);

            $('#CurrencyForm').append(alert);
            $('#CurrencyForm').append(inputN);
            $('#CurrencyForm').append(inputS);
            $('#CurrencyForm').append(selectT);
            $('#CurrencyForm').append(inputA);
            $('#CurrencyForm').append(inputC);

            for(i = 0; i < types.length; i++){
                type = types[i];
                option = $('<option value="'+type+'">'+type+'</option>');
                $('#type').append(option);
            }

            changeValueCurrency('#valuechanges');
            formatInput('#value');

            $('.modal-footer').append("<div id='currnButts'></div>");
            closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
            makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='currnCont'>Make</button>");
            addMakeCurrencyButton(makeBut);


            $('#currnButts').append(makeBut);
            $('#currnButts').append(closebut);
        });

        /*Change between Input or Selection Value*/
        function changeValueCurrency(checkbox){
            $(checkbox).click(function(){
                if(!($(this).hasClass('selected'))){
                    var value = $('<select id="value" class="form-control" name="selectv"></select>');
                    var types = ['coinmarketcap'];
                    for(i = 0; i < types.length; i++){
                        var type = types[i];
                        option = $('<option value="'+type+'">'+type+'</option>');
                        value.append(option);
                    }
                    $('#valuechange').html('');
                    $('#valuechange').append(value);
                    $(this).addClass('selected');
                }else{
                    var value = $('<input id="value" name="value" type="text" class="form-control" placeholder="Value" required>');
                    $('#valuechange').html('');
                    $('#valuechange').append(value);
                    formatInput('#value');
                    $(this).removeClass('selected');
                }
            })
        }

        /*Add Make Button for currency Creation*/
        function addMakeCurrencyButton(makeBut){
            jQuery.validator.addMethod("lettersonly", function(value, element) {
                return this.optional(element) || /^[a-z\S]+$/i.test(value);
            }, "Only alphabetical characters");

            jQuery.validator.addMethod("amount", function(value, element) {
                return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
            }, 'Insert a valid format value please.');

            $('#CurrencyForm').validate({
                rules: {
                    name:{
                        required: true,
                        minlength: 2,
                        lettersonly: true,
                    },
                    symbol:{
                        required: true,
                        minlength: 3,
                        maxlength: 6,
                        lettersonly: true,
                    },
                    type:{
                        required: true,
                    },
                    value:{
                        minlength: 3,
                        amount: true,
                    }
                },
                messages:{
                    type: 'Please select one Type',
                },

            });
            makeBut.click(function(e){
                if($('#CurrencyForm').valid()){
                    alterForm('#CurrencyForm', true);
                    $('#currnCont').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='currnConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' class='btn btn-alternative' id='currnBack'>Back</button>");
                    backButton(backBut, '#CurrencyForm', 'currn');
                    confirmcurrencyButton(confirmBut);
                    $('#currnButts').prepend(backBut);
                    $('#currnButts').prepend(confirmBut);

                }
            })
        }

        /*Add Confirm Button For Currency Creation*/
        function confirmcurrencyButton(confirmBut){
            confirmBut.click(function(){
                $(this).addClass('disabled');
                name = $('#name').val();
                symbol = $('#symbol').val();
                type = $('#type').val();
                value = $('#value').val();
                if(value != 'coinmarketcap'){
                    value = value.replace(/,/g, '.');
                    value = parseFloat(value) * -1;
                }
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/create',
                    type: 'POST',
                    dataType: "json",
                    data: {name: name, symbol: symbol, type: type, value:value},
                    success: function(data){
                        $('#form_currency_search').trigger("submit");
                        $('#currencyMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('Currency Created Sucessfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#currencyAlertMod').modal('show');
                    },
                    error: function (error) {
                        $(this).removeClass('disabled');
                        $('.text-alert').empty();
                        $('.text-alert').append('An error has ocurred');
                        $('.alert').removeClass('alert-success');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-warning');
                        $('#currencyAlertMod').modal('show');
                    }
                })
            })
        }

        /*Add Edit Button With Modal For Editing Currency*/
        function addEditCurrencyClick(buttonEdit, currency){
            buttonEdit.click(function (){

                box = $("<form class='CurrencyForm' id='CurrencyForm' enctype='multipart/form-data' ></form>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Currency</strong></div>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ currency.id +'" required>');
                inputN = $('<div class="form-group"><label for="name">Name</label><input id="name" name="name" type="text" class="form-control" placeholder="Name" value="'+ currency.name +'"  required></div>');
                inputS = $('<div class="form-group"><label for="symbol">Symbol</label><input id="symbol" name="symbol" type="text" class="form-control" placeholder="Symbol" value="'+ currency.symbol +'"  required ></div>');
                selectT = $('<div class="form-group"><label for="type">Type</label><select id="type" class="form-control" name="selectt"></select></div>');
                inputA = $('<div class="form-group"><label for="value">Value</label><div id="valuechange"><input id="value" name="value" type="text" class="form-control" placeholder="Value" value="'+ currency.value +'" required></div></div>')
                inputC = ('<div class="checkbox-inline" title="Change between manual value or an API value"><label id="labelch" ><input class="changevalue" id="valuechanges" type="checkbox" name="chnge" value=""/> Change value selection</label></div>');

                types = ['Currency', 'Cryptocurrency', 'Token'];

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Edit Currency');
                $('.modal-body').append(box);

                $('#CurrencyForm').append(alert);
                $('#CurrencyForm').append(inputI);
                $('#CurrencyForm').append(inputN);
                $('#CurrencyForm').append(inputS);
                $('#CurrencyForm').append(selectT);
                $('#CurrencyForm').append(inputA);
                $('#CurrencyForm').append(inputC);

                $('#valuechanges').click(function(){
                    if(!($(this).hasClass('selected'))){
                        var value = $('<select id="value" class="form-control" name="selectv"></select>');
                        var types2 = ['coinmarketcap'];
                        for(i = 0; i < types2.length; i++){
                            var type2 = types2[i];
                            if(currency.value == type2){
                                option = $('<option value="'+type2+'" selected="selected" >'+type2+'</option>');
                                value.append(option);
                            }
                            option = $('<option value="'+type2+'" >'+type2+'</option>');
                            value.append(option);
                        }
                        $('#valuechange').html('');
                        $('#valuechange').append(value);
                        $(this).addClass('selected');
                    }else{
                        var value = $('<input id="value" name="value" type="text" class="form-control" placeholder="Value" required>');
                        $('#valuechange').html('');
                        $('#valuechange').append(value);
                        formatInput('#value');
                        $(this).removeClass('selected');
                    }
                })
                formatInput('#value');

                if(!(Number.isInteger(currency.value))){
                    $('valuechanges').trigger('click');
                }

                for(i = 0; i < types.length; i++){
                    type = types[i];
                    if(currency.type == type){
                        option = $('<option value="'+type+'" selected="selected">'+type+'</option>');
                    }else{
                        option = $('<option value="'+type+'">'+type+'</option>');
                    }
                    $('#type').append(option);
                }

                $('.modal-footer').append("<div id='currnButts'></div>");
                closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                makeBut = $("<button type='button' name='button' class='btn btn-alternative' id='currnCont'>Make</button>");
                addMakeEcurrencyButton(makeBut);

                $('#currnButts').append(makeBut);
                $('#currnButts').append(closebut);
            });
        }

        /*Add Make Button for Editing Currency*/
        function addMakeEcurrencyButton(makeBut){
            jQuery.validator.addMethod("lettersonly", function(value, element) {
                return this.optional(element) || /^[a-z\S]+$/i.test(value);
            }, "Only alphabetical characters");

            jQuery.validator.addMethod("amount", function(value, element) {
                return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
            }, 'Insert a valid format value please.');

            $('#CurrencyForm').validate({
                rules: {
                    name:{
                        required: true,
                        minlength: 2,
                        lettersonly: true,
                    },
                    symbol:{
                        required: true,
                        minlength: 2,
                        maxlength: 6,
                        lettersonly: true,
                    },
                    type:{
                        required: true,
                    },
                    value:{
                        minlength: 3,
                        amount: true,
                    },
                },
                messages:{
                    type: 'Please select one Type',
                },
            });
            makeBut.click(function(e){
                if($('#CurrencyForm').valid()){
                    alterForm('#CurrencyForm', true);
                    $('#currnCont').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' class='btn btn-alternative-success btn-alternative' name='button' id='currnConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' class='btn btn-alternative' id='currnBack'>Back</button>");
                    backButton(backBut, '#CurrencyForm', 'currn');
                    confirmEcurrencyButton(confirmBut);
                    $('#currnButts').prepend(backBut);
                    $('#currnButts').prepend(confirmBut);

                }
            })
        }

        /*Add Confirm Button for Editing Currency*/
        function confirmEcurrencyButton(confirmBut){
            confirmBut.click(function(){
                $(this).addClass('disabled');
                id = $('#id').val();
                name = $('#name').val();
                symbol = $('#symbol').val();
                type = $('#type').val();
                value = $('#value').val();
                if(value != 'coinmarketcap'){
                    value = value.replace(/,/g, '.');
                    value = parseFloat(value);
                }

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/update',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id, name: name, symbol: symbol, type: type, value: value},
                    success: function(data){
                        $('#form_currency_search').trigger("submit");
                        $('#currencyMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('Currency Edited Sucessfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#currencyAlertMod').modal('show');
                    },
                    error: function (error) {
                        $(this).removeClass('disabled');
                        $('.text-alert').empty();
                        $('.text-alert').append('An error has ocurred');
                        $('.alert').removeClass('alert-success');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-warning');
                        $('#currencyAlertMod').modal('show');
                    }
                })
            })
        }

        /*Add Make Delete Button For Currency*/
        function addMakeDcurrencyButton(delButt, currency){
            delButt.click(function(){

                box = $("<form class='CurrencyForm' id='CurrencyForm' enctype='multipart/form-data' ></form>");
                alert = $('<h4><strong>Are You Sure for delete '+ currency.name +' currency?</strong></h4>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ currency.id +'" required>');

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Delete Currency');
                $('.modal-body').append(box);

                $('#CurrencyForm').append(alert);
                $('#CurrencyForm').append(inputI);

                $('.modal-footer').append("<div id='currnButts'></div>");
                closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                makeBut = $("<button type='button' name='button' class='btn btn-alternative-danger btn-alternative' id='currnCont'>Delete</button>");
                DeleteCurrencyButton(makeBut);

                $('#currnButts').append(makeBut);
                $('#currnButts').append(closebut);
            })
        }

        /*Delete Currency Confirm*/
        function DeleteCurrencyButton(delButt){
            delButt.click(function(){
                $(this).addClass('disabled');
                id = $('#id').val();

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/delete',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id},
                    success: function(data){
                        $('#form_currency_search').trigger("submit");
                        $('#currencyMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('Currency Deleted Sucessfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#currencyAlertMod').modal('show');
                    },
                    error: function (error) {
                        $(this).removeClass('disabled');
                        $('.text-alert').empty();
                        $('.text-alert').append('An error has ocurred');
                        $('.alert').removeClass('alert-success');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-warning');
                        $('#currencyAlertMod').modal('show');
                    }
                });
            });
        }

        /*Execute The Script*/
        $('#result_currency_page').change(function(){
            $('#form_currency_search').trigger("submit");
        })

        $('#form_currency_search').trigger("submit");

    }

    /* END Currency Functions */

    /* Begin Funds Functions */

    if(pathname.toString() == '/funds'){
        $('.listfund').addClass('active');
        /*Funds Balances*/

        function totalBalance(){
          $.ajax({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              url: "/funds/total",
              type: 'post',
              success: function success(data) {
                usd = data.usd;
                btc = data.btc;
                $('#usdtotal').html('');
                $('#usdtotal').append(formatNumber.num(usd));
                $('#btctotal').html('');
                $('#btctotal').append(formatNumber.num(btc));
              },
            })

        }

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
                            var colvalue_1 = $('<td>' + balance.symbol + '</td>');
                            var colvalue_2 = $('<td>' + formatNumber2.num(balance.amount) + '</td>');
                            if(balance.symbol == 'VEF'){
                                var colvalue_3 = $('<td>' + formatNumber2.num(balance.amount / balance.value) + '</td>');
                            }else{
                                var colvalue_3 = $('<td>' + formatNumber2.num(balance.amount * balance.value)+ '</td>');
                            }


                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            if(data.eaccess){
                                var colvalue_4 = $('<td class="text-center"></td>');
                                var buttEx = $('<button class="btn btn-sm btn-alternative" data-toggle="modal" data-target="#fundsMod" type="button">Exchange</button>');
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
                                pagebutton = $('<li class="page_balance_currency pages"><a href="#">' + i + '</a></li>');
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
                                pagebutton = $('<li class="page_balance_currency pages"><a href="#">' + i + '</a></li>');
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
                                pagebutton = $('<li class="page_balance_currency pages"><a href="#">' + i + '</a></li>');
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

        /*End Funds Balances*/

        /*Exchange Currencies*/

        function exchangeButton(button, currency){
            button.click(function(){

                box = $("<form class='ExchangeForm' id='ExchangeForm' enctype='multipart/form-data' ></form>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Exchange</strong></div>');
                labelA = $('<div class="form-group"><label>Available Balance: <span id="availableB"></span></label></div>');
                selectO = $('<div class="form-group"><label for="selectout" >Change For:</label><select id="out" class="form-control" name="selectout"></select></div>');
                inputO = $('<div class="form-group"><label for="valueout">Value</label><input id="valueout" name="valueout" type="text" class="form-control" placeholder="Value Out" required></div>');
                inputIC = $('<input id="currencyin" name="currencyin" type="text" class="form-control" required value="'+currency.symbol+'" style="display:none;" disabled>');
                inputI = $('<div class="form-group"><label for="valuein">Value In</label><input id="valuein" name="valuein" type="text" class="form-control" placeholder="Value In" ></div>');
                inputR = $('<div class="form-group"><label for="rate">Exchange Rate</label><input id="rate" name="rate" type="text" class="form-control" placeholder="Exchange Rate" ></div>');
                inputA = $('<div class="form-group"><label for="created">Allocated</label><input id="created" name="created" type="date" class="form-control" placeholder="Allocated" ></div>');
                inputF = $('<div class="form-group"><label for="funded">Funded</label><input id="funded" name="funded" type="date" class="form-control" placeholder="Funded" ></div>');

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Exchange Currency');
                $('.modal-body').append(box);

                $('#ExchangeForm').append(alert);
                $('#ExchangeForm').append(labelA);
                $('#ExchangeForm').append(selectO);
                $('#ExchangeForm').append(inputO);
                $('#ExchangeForm').append(inputIC);
                $('#ExchangeForm').append(inputI);
                $('#ExchangeForm').append(inputR);
                $('#ExchangeForm').append(inputA);
                $('#ExchangeForm').append(inputF);

                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/funds/currencies",
                    type: 'post',
                    datatype: 'json',
                    data: {currency: currency.symbol},
                    success: function (data) {
                        //Inicio
                        currencies = data.data;
                        for(i=0;i < currencies.length;i++)
                        {
                            var currenc = currencies[i];
                            if(currenc.symbol == 'USD'){
                                var option = '<option value="'+currenc.symbol+'" selected>'+ currenc.symbol +'</option>';
                            }else{
                              var option = '<option value="'+currenc.symbol+'">'+ currenc.symbol +'</option>';
                            }

                            $('#out').append(option);
                        }
                    },
                    // Fin
                    error: function (error) {
                        ReadError(error);
                    }
                })
                availableBalance('#out');

                $('.modal-footer').append("<div id='exButts'></div>");

                exchangeInValue('#valueout', '#rate', '#valuein');
                exchangeInValue('#valueout', '#valuein', '#rate');

                makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='exCont'>Make</button>");
                addMakeExButton(makeBut);
                closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                $('#exButts').append(makeBut);
                $('#exButts').append(closebut);

                $('#out').trigger("change");
        })
        }

        function availableBalance(selection){
            $(selection).change(function(){
                currency = $(this).val();
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/funds/available",
                    type: 'post',
                    datatype: 'json',
                    data: {currency: currency},
                    success: function (data) {
                        //Inicio
                        currenc = data.data;
                        amount = formatNumber.num(currenc.amount)
                        $('#availableB').html('');
                        $('#availableB').append(amount);

                    },
                    // Fin
                    error: function (error) {
                        ReadError(error);
                    }
                })
            })
        }

        function exchangeInValue(value, select, target,){
            $(select).change(function(){
                var val = $(value).val();


                var sel = $(select).val();

                var newval = val / sel;

                $(target).val(newval);
            })
        }

        function addMakeExButton(makeBut){
            makeBut.click(function(e){

                $('#ExchangeForm').validate({
                    rules: {
                        valueout:{
                            required: true,
                            minlength: 1,
                            number: true,
                        },

                        valuein:{

                            number: true,
                        },
                        rate:{

                            number: true,
                        },
                        created:{
                            date:true,
                            required: true,
                        },
                        funded:{
                            date:true,
                        }
                    },
                    messages:{
                        valueout: "Please introduce a valid amount, minimun 1 digits",
                    },
                })

                if($('#ExchangeForm').valid()){
                    alterForm('#ExchangeForm', true);
                    $('#exCont').hide();
                    $('.alert').show();

                    confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='exConf'>Confirm</button>");
                    backBut = $("<button type='button' class='btn btn-alternative' name='button' id='exBack'>Back</button>");
                    backButton(backBut, '#ExchangeForm', 'ex');
                    confirmExButton(confirmBut);

                    $('#exButts').prepend(backBut);
                    $('#exButts').prepend(confirmBut);

                }
            })
        }

        function confirmExButton(confirmBut){
            confirmBut.click(function(){
              $(this).addClass('disabled');
                currencyout = $('#out').val();
                currencyin = $('#currencyin').val();

                amountout = $('#valueout').val();


                amountin = $('#valuein').val();


                rate = $('#rate').val();

                created = $('#created').val();
                created = created.replace(/\//g, '-');

                funded = $('#funded').val();
                funded = funded.replace(/\//g, '-');

                    $.ajax({
                        headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                        url: '/funds/exchange',
                        type: 'POST',
                        dataType: "json",
                        data: {cout : currencyout, cin : currencyin, aout : amountout, ain : amountin, rate: rate, created:created, funded: funded},
                        success: function(data){

                          $('#fundsMod').modal('hide');
                          $('.text-alert').empty();
                          $('.text-alert').append('Exchange Made Sucessfully');
                          $('.alert').removeClass('alert-warning');
                          $('.alert').removeClass('alert-danger');
                          $('.alert').addClass('alert-success');
                          $('#fundsAlertMod').modal('show');

                            $('#form_balance_currency_search').trigger("submit");
                            $('#form_balance_crypto_search').trigger("submit");
                            $('#form_balance_token_search').trigger("submit");
                            $('#form_transaction_search').trigger("submit");
                            $('#form_pending_transaction_search').trigger("submit");
                            totalBalance();

                        },
                        error: function (error) {
                            $(this).removeClass('disabled');
                            $('.text-alert').empty();
                            $('.text-alert').append('An error has ocurred');
                            $('.alert').removeClass('alert-success');
                            $('.alert').removeClass('alert-danger');
                            $('.alert').addClass('alert-warning');
                            $('#fundsAlertMod').modal('show');
                        }
                    })

            })
        }

        /*End Exchange Currencies*/

        /*Transaction History*/

        $('#table_transaction_header_currency_out').click(function (e) {
          orderTableTransactionBy('currencies.symbol');
        });

        $('#table_transaction_header_amount_out').click(function (e) {
          orderTableTransactionBy('amount_out');
        });

        $('#table_transaction_header_rate').click(function (e) {
          orderTableTransactionBy('rate');
        });

        $('#table_transaction_header_amount_in').click(function (e) {
          orderTableTransactionBy('amount_in');
        });

        $('#table_transaction_header_date').click(function (e) {
          orderTableTransactionBy('fund_orders.created_at');
        });

        $('#table_transaction_header_confirmed').click(function (e) {
          orderTableTransactionBy('fund_orders.updated_at');
        });

        $('#table_transaction_header_status').click(function (e) {
          orderTableTransactionBy('status');
        });

        var orderTransactionBy = "";
        var orderTransactionDirection = "";
        var searchTransactionValue = "";

        $( "#form_transaction_search" ).submit(function(e){
            e.preventDefault();
            //DESC
            searchTransactionValue = $( "#search_transaction_value" ).val();
            searchTransaction(1);
        });

        function orderTableTransactionBy(by){
            if(orderTransactionBy === by){
                if(orderTransactionDirection === ""){
                    orderTransactionDirection = "DESC";
                }else{
                    orderTransactionDirection = "";
                }
            }else{
                orderTransactionBy = by;
                orderTransactionDirection = "";
            }
            searchTransaction(1);
        }

        //Get Deposit Data
        function searchTransaction(page){

            resultPage =  $( "#result_transaction_page" ).val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/funds/transactions",
                type: 'post',
                data: { searchvalue : searchTransactionValue, page : page, orderBy :orderTransactionBy, orderDirection: orderTransactionDirection,    resultPage: resultPage } ,
                success: function (data) {
                    //Inicio
                    var transactions = data.result;
                    var user = data.user;

                    if(transactions.length == 0){
                        $("#table_transaction_content").html("");
                        $('#table_transaction_content').append('<tr><td colspan="10">None</td></tr>');
                    }else{
                        // Put the data into the element you care about.
                        $("#table_transaction_content").html("");

                        for(i=0;i<  transactions.length;i++){
                            var transaction = transactions[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $( '<tr></tr>');
                            var colvalue_1 = $( '<td>'+  transaction.out_symbol +'</td>');
                            var colvalue_2 = $( '<td>'+ formatNumber.num( transaction.out_amount ) +'</td>');
                            var colvalue_3 = $( '<td>'+ formatNumber.num( transaction.rate )  +'</td>');
                            var colvalue_4 = $( '<td>'+  transaction.symbol  +'</td>');
                            var colvalue_5 = $( '<td>'+  formatNumber.num( transaction.in_amount )  +'</td>');
                            var colvalue_6 = $( '<td>'+ transaction.reference +'</td>');
                            var colvalue_7 = $( '<td>'+ transaction.created_at  +'</td>');
                            var colvalue_8 = $( '<td>'+ transaction.updated_at  +'</td>');
                            var colvalue_9 = $( '<td>'+ transaction.status  +'</td>');
                            var colvalue_10 = $( '<td class="text-center"></td>');
                            var printbut = $("<button type='button' name='button' class='btn btn-alternative btn-sm' id='txPrint'>Receipt</button>");

                            if(data.eaccess){
                                var delbut = $("<button type='button' name='button' data-toggle='modal' data-target='#fundsMod' class='btn btn-alternative-danger btn-alternative btn-sm' id='txdel'>Delete</button>");
                                addMakeDTxButton(delbut, transaction);
                                colvalue_10.append(delbut);
                            }


                            colvalue_10.append(printbut);

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);
                            rowResult.append(colvalue_5);
                            rowResult.append(colvalue_6);
                            rowResult.append(colvalue_7);
                            rowResult.append(colvalue_8);
                            rowResult.append(colvalue_9);
                            rowResult.append(colvalue_10);

                            $("#table_transaction_content").append(rowResult);
                        }

                        $("#table_transaction_pagination").html("");

                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage =  $( "#result_transaction_page" ).val();
                        var totalPages = Math.ceil(total / resultPage);

                        if(page === 1){
                            maxPage = page + 2;
                            totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');

                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_transaction pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPageTButton(pagebutton);
                            }

                            $("#table_transaction_pagination").append(pageList);

                        }else if(page === totalPages){
                            page = page - 2;

                            if(page < 1){
                                page = 1;
                            }

                            totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');

                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_transaction pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPageTButton(pagebutton);
                            }

                            $("#table_transaction_pagination").append(pageList);

                        }else{
                            page = page - 2;

                            if(page < 1){
                                page = 1;
                            }

                            totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');

                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_transaction pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPageTButton(pagebutton);
                            }

                            $("#table_transaction_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function (error) {
                    ReadError(error);
                }
            });
        }

        function addPageTButton(pagebutton){
            pagebutton.click(function(){
                page = $(this).text();
                searchTransaction(page);
            })
        }

        $('#table_pending_transaction_header_currency_out').click(function (e) {
          orderTablePendingTransactionBy('currencies.symbol');
        });

        $('#table_pending_transaction_header_amount_out').click(function (e) {
          orderTablePendingTransactionBy('amount_out');
        });

        $('#table_pending_transaction_header_rate').click(function (e) {
          orderTablePendingTransactionBy('rate');
        });

        $('#table_pending_transaction_header_amount_in').click(function (e) {
          orderTablePendingTransactionBy('amount_in');
        });

        $('#table_pending_transaction_header_date').click(function (e) {
          orderTablePendingTransactionBy('fund_orders.created_at');
        });

        $('#table_pending_transaction_header_status').click(function (e) {
          orderTablePendingTransactionBy('status');
        });

        var orderPendingTransactionBy = "";
        var orderPendingTransactionDirection = "";
        var searchPendingTransactionValue = "";

        $( "#form_pending_transaction_search" ).submit(function(e){
            e.preventDefault();
            //DESC
            searchPendingTransactionValue = $( "#search_pending_transaction_value" ).val();
            searchPendingTransaction(1);
        });

        function orderTablePendingTransactionBy(by){
            if(orderPendingTransactionBy === by){
                if(orderPendingTransactionDirection === ""){
                    orderPendingTransactionDirection = "DESC";
                }else{
                    orderPendingTransactionDirection = "";
                }
            }else{
                orderPendingTransactionBy = by;
                orderPendingTransactionDirection = "";
            }
            searchPendingTransaction(1);
        }

        //Get Deposit Data
        function searchPendingTransaction(page){

            resultPage =  $( "#result_pending_transaction_page" ).val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/funds/transactions/pending",
                type: 'post',
                data: { searchvalue : searchPendingTransactionValue, page : page, orderBy :orderPendingTransactionBy, orderDirection: orderPendingTransactionDirection,    resultPage: resultPage } ,
                success: function (data) {
                    //Inicio
                    var transactions = data.result;

                    if(transactions.length == 0){
                        $("#table_pending_transaction_content").html("");
                        if(data.eaccess){
                        $('#table_pending_transaction_content').append('<tr><td colspan="9">None</td></tr>');
                      }else{
                        $('#table_pending_transaction_content').append('<tr><td colspan="8">None</td></tr>');
                      }
                    }else{
                        // Put the data into the element you care about.
                        $("#table_pending_transaction_content").html("");

                        for(i=0;i<  transactions.length;i++){
                            var transaction = transactions[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $( '<tr></tr>');
                            var colvalue_1 = $( '<td>'+  transaction.out_symbol +'</td>');
                            var colvalue_2 = $( '<td>'+ formatNumber.num( transaction.out_amount ) +'</td>');
                            var colvalue_3 = $( '<td>'+ formatNumber.num( transaction.rate )  +'</td>');
                            var colvalue_4 = $( '<td>'+  transaction.symbol  +'</td>');
                            var colvalue_5 = $( '<td>'+  formatNumber.num( transaction.in_amount )  +'</td>');
                            var colvalue_6 = $( '<td>'+ transaction.reference +'</td>');
                            var colvalue_7 = $( '<td>'+ transaction.created_at  +'</td>');
                            var colvalue_8 = $( '<td>'+ transaction.status  +'</td>');
                            if(data.eaccess){
                              var colvalue_9 = $( '<td class="text-center"></td>');
                              var printbut = $("<button type='button' name='button' data-toggle='modal' data-target='#fundsMod' class='btn btn-alternative-success btn-alternative btn-sm' id='validateTrans'>Validate</button>");
                              var delbut = $("<button type='button' name='button' data-toggle='modal' data-target='#fundsMod' class='btn btn-alternative-danger btn-alternative btn-sm' id='txdel'>Delete</button>");
                              addMakeDTxButton(delbut, transaction);
                              colvalue_9.append(delbut);
                              colvalue_9.append(printbut);
                              validateTransaction(printbut, transaction);
                            }




                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);
                            rowResult.append(colvalue_5);
                            rowResult.append(colvalue_6);
                            rowResult.append(colvalue_7);
                            rowResult.append(colvalue_8);
                            if(data.eaccess){
                            rowResult.append(colvalue_9);
                            }
                            $("#table_pending_transaction_content").append(rowResult);
                        }

                        $("#table_pending_transaction_pagination").html("");

                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage =  $( "#result_pending_transaction_page" ).val();
                        var totalPages = Math.ceil(total / resultPage);

                        if(page === 1){
                            maxPage = page + 2;
                            totalPages = (maxPage < totalPages) ?  maxPage: totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');

                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_pending_transaction pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPagePTButton(pagebutton);
                            }

                            $("#table_pending_transaction_pagination").append(pageList);

                        }else if(page === totalPages){
                            page = page - 2;

                            if(page < 1){
                                page = 1;
                            }

                            totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');

                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_pending_transaction pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPagePTButton(pagebutton);
                            }

                            $("#table_pending_transaction_pagination").append(pageList);

                        }else{
                            page = page - 2;

                            if(page < 1){
                                page = 1;
                            }

                            totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                            var pageList = $( '<ul class="pagination"></ul>');

                            for(i = page ; i <= totalPages; i++){
                                pagebutton = $( '<li class="page_pending_transaction pages"><a href="#">'+ i +'</a></li>');
                                pageList.append(pagebutton);
                                addPagePTButton(pagebutton);
                            }

                            $("#table_pending_transaction_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function (error) {
                    ReadError(error);
                }
            });
        }

        function addPagePTButton(pagebutton){
            pagebutton.click(function(){
                page = $(this).text();
                searchPendingTransaction(page);
            })
        }

        function validateTransaction(button, transaction){
          button.click(function(){

              box = $("<form class='ExchangeForm' id='ExchangeForm' enctype='multipart/form-data'></form>");
              alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Exchange</strong></div>');
              labelA = $('<div class="form-group"><label>Available Balance: <span id="availableB"></span></label></div>');
              selectO = $('<div class="form-group"><label for="selectout" >Change For:</label><select  disabled="disabled" id="out" class="form-control" name="selectout"></select></div>');
              inputO = $('<div class="form-group"><label for="valueout">Value out</label><input id="valueout" name="valueout" type="text" class="form-control" value="'+formatNumber.num(transaction.out_amount)+'" placeholder="Value Out" required disabled></div>');
              inputIC = $('<input id="currencyin" name="currencyin" type="text" class="form-control" required value="'+transaction.symbol+'" style="display:none;" disabled>');
              inputID = $('<input id="transid" name="transid" type="text" class="form-control" required value="'+transaction.id+'" style="display:none;" disabled>');
              inputI = $('<div class="form-group"><label for="valuein">Value In</label><input id="valuein" name="valuein" type="text" class="form-control" placeholder="Value In" required></div>');
              inputR = $('<div class="form-group"><label for="rate">Exchange Rate</label><input id="rate" name="rate" type="text" class="form-control" placeholder="Exchange Rate" required></div>');

              $('.modal-title').empty();
              $('.modal-body').empty();
              $('.modal-footer').empty();
              $('.modal-title').append('Validate Transaction');
              $('.modal-body').append(box);

              $('#ExchangeForm').append(alert);
              $('#ExchangeForm').append(labelA);
              $('#ExchangeForm').append(selectO);
              $('#ExchangeForm').append(inputO);
              $('#ExchangeForm').append(inputIC);
              $('#ExchangeForm').append(inputID);
              $('#ExchangeForm').append(inputI);
              $('#ExchangeForm').append(inputR);

              $.ajax({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  url: "/funds/currencies",
                  type: 'post',
                  datatype: 'json',
                  data: {currency: transaction.symbol},
                  success: function (data) {
                      //Inicio
                      currencies = data.data;
                      for(i=0;i < currencies.length;i++)
                      {
                          var currenc = currencies[i];
                          if(currenc.symbol == transaction.out_symbol){
                              var option = '<option value="'+currenc.symbol+'" selected>'+ currenc.symbol +'</option>';
                          }else{
                            var option = '<option value="'+currenc.symbol+'">'+ currenc.symbol +'</option>';
                          }

                          $('#out').append(option);
                      }
                  },
                  // Fin
                  error: function (error) {
                      ReadError(error);
                  }
              })
              availableBalance('#out');
              closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
              $('.modal-footer').append("<div id='exButts'></div>");

              exchangeInValue('#valueout', '#rate', '#valuein')

              makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='exCont'>Make</button>");
              addMakeVExButton(makeBut);

              formatInput('#valueout');
              formatInput('#valuein');
              formatInput('#rate');

              $('#exButts').append(makeBut);
              $('#exButts').append(closebut);

              $('#out').trigger("change");
            })
        }

        function addMakeVExButton(makeBut){
            makeBut.click(function(e){

                jQuery.validator.addMethod("amount", function(value, element) {
                    return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
                });

                $('#ExchangeForm').validate({
                    rules: {
                        valueout:{
                            required: true,
                            minlength: 1,
                            amount: true,
                        },

                        valuein:{
                          minlength: 1,
                            amount: true,
                        },
                        rate:{
                            minlength: 1,
                            amount: true,
                        }
                    },
                    messages:{
                        valueout: "Please introduce a valid amount, minimun 1 digits",
                        valuein: "Please introduce a valid amount, minimun 1 digits",
                        rate: "Please introduce a valid amount, minimun 1 digits",
                    },
                })

                if($('#ExchangeForm').valid()){
                    alterForm('#ExchangeForm', true);
                    $('#exCont').hide();
                    $('.alert').show();

                    confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='exConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' class='btn btn-alternative' id='exBack'>Back</button>");
                    backButton(backBut, '#ExchangeForm', 'ex');
                    confirmVExButton(confirmBut);

                    $('#exButts').prepend(backBut);
                    $('#exButts').prepend(confirmBut);

                }
            })
        }

        function confirmVExButton(confirmBut){
            confirmBut.click(function(){
              $(this).addClass('disabled');
                currencyout = $('#out').val();
                id = $('#transid').val();
                currencyin = $('#currencyin').val();

                amountout = $('#valueout').val().replace(/\./g, '');
                amountout = amountout.replace(/,/g, '.');

                amountin = $('#valuein').val().replace(/\./g, '');
                amountin = amountin.replace(/,/g, '.');

                rate = $('#rate').val().replace(/\./g, '');
                rate = rate.replace(/,/g, '.');

                    $.ajax({
                        headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                        url: '/funds/exchange/validate',
                        type: 'POST',
                        dataType: "json",
                        data: {id:id, cout : currencyout, cin : currencyin, aout : amountout, ain : amountin, rate: rate},
                        success: function(data){

                          $('#fundsMod').modal('hide');
                          $('.text-alert').empty();
                          $('.text-alert').append('Validation Made Sucessfully');
                          $('.alert').removeClass('alert-warning');
                          $('.alert').removeClass('alert-danger');
                          $('.alert').addClass('alert-success');
                          $('#fundsAlertMod').modal('show');

                            $('#form_balance_currency_search').trigger("submit");
                            $('#form_balance_crypto_search').trigger("submit");
                            $('#form_balance_token_search').trigger("submit");
                            $('#form_transaction_search').trigger("submit");
                            $('#form_pending_transaction_search').trigger("submit");
                            totalBalance();

                        },
                        error: function (error) {
                            $(this).removeClass('disabled');
                            $('.text-alert').empty();
                            $('.text-alert').append('An error has ocurred');
                            $('.alert').removeClass('alert-success');
                            $('.alert').removeClass('alert-danger');
                            $('.alert').addClass('alert-warning');
                            $('#fundsAlertMod').modal('show');
                        }
                    })

            })
        }

        /* Delete Function For User */
        function addMakeDTxButton(delButt, trans){
            delButt.click(function(){
                box = $("<form class='TxForm' id='TxForm' enctype='multipart/form-data' ></form>");
                alert = $('<h4><strong>Are You Sure for delete transaction #'+trans.reference+'?</strong></h4>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ trans.id +'" required>');

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Delete Transaction');
                $('.modal-body').append(box);

                $('#TxForm').append(alert);
                $('#TxForm').append(inputI);

                $('.modal-footer').append("<div id='txButts'></div>");

                makeBut = $("<button type='button' class='btn btn-alternative-danger btn-alternative' name='button' id='txCont'>Delete</button>");
                closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                DeleteTxButton(makeBut);

                $('#txButts').append(makeBut);
                $('#txButts').append(closebut);
            })
        }

        /* Confirmation Of User Deletion */
        function DeleteTxButton(delButt){
            delButt.click(function(){
              $(this).addClass('disabled');
                id = $('#id').val();

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/funds/transactions/delete',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id},
                    success: function(data){
                      $('#fundsMod').modal('hide');
                      $('.text-alert').empty();
                      $('.text-alert').append('Transaction Deleted Sucessfully');
                      $('.alert').removeClass('alert-warning');
                      $('.alert').removeClass('alert-danger');
                      $('.alert').addClass('alert-success');
                      $('#fundsAlertMod').modal('show');

                        $('#form_balance_currency_search').trigger("submit");
                        $('#form_balance_crypto_search').trigger("submit");
                        $('#form_balance_token_search').trigger("submit");
                        $('#form_transaction_search').trigger("submit");
                        $('#form_pending_transaction_search').trigger("submit");
                        totalBalance();

                    },
                    error: function (error) {
                        $(this).removeClass('disabled');
                        $('.text-alert').empty();
                        $('.text-alert').append('An error has ocurred');
                        $('.alert').removeClass('alert-success');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-warning');
                        $('#fundsAlertMod').modal('show');
                    }
                });
            });
        }
        /*End Transaction History*/

        /*Search Deposit Table

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
        var searchDepositValue = "";

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
                        $("#table_deposit_content").html("");
                        $('#table_deposit_content').append('<tr><td colspan="7">None</td></tr>');
                    }else{
                        // Put the data into the element you care about.
                        $("#table_deposit_content").html("");

                        for(i=0;i<  deposits.length;i++){
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

        /*Deposit Form*/
        /*
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
        /*
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

                        for(i=0;i<  withdraws.length;i++){
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

        /*Withdraw Form*/
        /*
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
        /*
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
            var searchAccountValue = "";

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

            $('#form_account_search').trigger("submit");
        }

        /*Account Management*/
        /*
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
        */

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

        $('#result_balance_currency_page').change(function () {
            $('#form_balance_currency_search').trigger("submit");
        });
        $('#result_transaction_page').change(function () {
            $('#form_transaction_search').trigger("submit");
        });
        $('#result_pending_transaction_page').change(function () {
            $('#form_pending_transaction_search').trigger("submit");
        });
        /*$('#result_deposit_page').change(function(){
            $('#form_deposit_search').trigger("submit");
        })
        $('#result_withdraw_page').change(function(){
            $('#form_withdraw_search').trigger("submit");
        })*/

        $('#form_balance_currency_search').trigger("submit");
        $('#form_transaction_search').trigger("submit");
        $('#form_pending_transaction_search').trigger("submit");
        totalBalance();
        /*$('#form_deposit_search').trigger("submit");
        $('#form_withdraw_search').trigger("submit");*/
    }

    /* End Funds Functions */

    /* Begin Client Functions */

    if(pathname.toString() == '/clients'){

        $('.listclient').addClass('active');
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

        function orderTableClientBy(by) {
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

        function searchClient(page) {

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
                            var colvalue_1 = $('<td>' + client.name + '</td>');
                            var colvalue_2 = $('<td>' + client.email + '</td>');
                            var colvalue_3 = $('<td>'+ formatNumber2.num(client.amount) +'</td>');
                            var colvalue_4 = $('<td class="text-center"></td>');
                            var buttonS = $('<button class="btn btn-alternative btn-sm" type="button">Select Client</button>');
                            var buttonI = $('<button class="btn btn-alternative-success btn-alternative btn-sm" data-toggle="modal" data-target="#clientMod" type="button">Initial Investment</button>');
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
                                pagebutton = $('<li class="page_client pages"><a href="#">' + i + '</a></li>');
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
                                pagebutton = $('<li class="page_client pages"><a href="#">' + i + '</a></li>');
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
                                pagebutton = $('<li class="page_client pages"><a href="#">' + i + '</a></li>');
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

        function addPageCLButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchClient(page);
            });
        };


        $("#form_client_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchClientValue = $("#search_client_value").val();
            searchClient(1);
        });

        $('#result_client_page').change(function(){
            $('#form_client_search').trigger("submit");
        })

        $('#form_client_search').trigger("submit");

        function selectClient(button, id){
            button.click(function(){
                /*Funds Balances*/
                $("#table_balance_currency_content").empty();

                /*Search Balances Currency Table*/
                function totalBalance(){
                  $.ajax({
                      headers: {
                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                      },
                      url: "/clients/total",
                      type: 'post',
                      data: {id: id},
                      success: function success(data) {
                        usd = data.usd;
                        btc = data.btc;
                        $('#usdtotal').html('');
                        $('#usdtotal').append(formatNumber.num(usd));
                        $('#btctotal').html('');
                        $('#btctotal').append(formatNumber.num(btc));
                      },
                    })

                }

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
                        data: {id: id, searchvalue: searchBalanceCurrencyValue, page: page, orderBy: orderBalanceCurrencyBy, orderDirection: orderBalanceCurrencyDirection, resultPage: resultPage },
                        success: function success(data) {
                            //Inicio
                            var balances = data.result;

                            if (balances.length == 0) {
                                $("#table_balance_currency_content").html('');
                                $('#table_balance_currency_content').append('<tr><td colspan="3">None</td></tr>');
                            } else {
                                // Put the data into the element you care about.
                                $("#table_balance_currency_content").html('');

                                for (i = 0; i < balances.length; i++) {
                                    var balance = balances[i];

                                    // we have to make in steps to add the onclick event
                                    var rowResult = $('<tr></tr>');
                                    var colvalue_1 = $('<td>' + balance.symbol + '</td>');
                                    var colvalue_2 = $('<td>' + formatNumber2.num(balance.amount) + '</td>');
                                    if(balance.symbol == 'VEF'){
                                        var colvalue_3 = $('<td>' + formatNumber2.num(balance.amount / balance.value) + '</td>');
                                    }else{
                                        var colvalue_3 = $('<td>' + formatNumber2.num(balance.amount * balance.value) + '</td>');
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
                                        pagebutton = $('<li class="page_balance_currency pages"><a href="#">' + i + '</a></li>');
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
                                        pagebutton = $('<li class="page_balance_currency pages"><a href="#">' + i + '</a></li>');
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
                                        pagebutton = $('<li class="page_balance_currency pages"><a href="#">' + i + '</a></li>');
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

                $('#result_balance_currency_page').change(function () {
                    $('#form_balance_currency_search').trigger("submit");
                });

                $('#form_balance_currency_search').trigger("submit");
                totalBalance();
                /*End Funds Balances*/
            })
        }

        function initialInvest(button, user){
            button.click(function(){

                box = $("<form class='InitialForm' id='InitialForm' enctype='multipart/form-data' ></form>");
                alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Initial Fund Invest</strong></div>');
                inputN = $('<div class="form-group"><label for="inital">Initial Invest USD</label><input id="initial" name="initial" type="text" class="form-control" placeholder="Initial Invest" required></div>');
                inputA = $('<div class="form-group"><label for="created">Initial Date</label><input id="created" name="created" type="date" class="form-control" placeholder="Initial Date" ></div>');

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();

                $('.modal-title').append('Initial Invest');
                $('.modal-body').append(box);

                $('#InitialForm').append(alert);
                $('#InitialForm').append(inputN);
                $('#InitialForm').append(inputA);
                $('.modal-footer').append("<div id='iniButts'></div>");

                closeBut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='iniCont'>Make</button>");
                addMakeiButton(makeBut);
                $('#iniButts').append(makeBut);
                $('#iniButts').append(closeBut);

                formatInput("#initial");
            });
            function addMakeiButton(makeBut){
                makeBut.click(function(e){

                    jQuery.validator.addMethod("amount", function(value, element) {
                        return this.optional(element) || /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/i.test(value);
                    });

                    $('#InitialForm').validate({
                        rules: {
                            initial:{
                                required: true,
                                minlength: 1,
                                amount: true,
                            },
                            created:{
                              date: true,
                              required: true,
                            }

                        },
                        messages:{
                            amount: "Please introduce a valid amount, minimun 3 digits",
                        },
                    })

                    if($('#InitialForm').valid()){
                        alterForm('#InitialForm', true);
                        $('#iniCont').hide();
                        $('.alert').show();

                        confirmBut = $("<button type='button' class='btn btn-alternative-success btn-alternative' name='button' id='iniConf'>Confirm</button>");
                        backBut = $("<button type='button' class='btn btn-alternative' name='button' id='iniBack'>Back</button>");
                        backButton(backBut, '#InitialForm', 'ini');
                        confirmiButton(confirmBut);
                        $('#iniButts').prepend(backBut);
                        $('#iniButts').prepend(confirmBut);

                    }
                })
            }

            function confirmiButton(confirmBut){
                confirmBut.click(function(){
                  $(this).addClass('disabled');
                    amount = $('#initial').val().replace(/\./g, '');
                    amount = amount.replace(/,/g, '.');
                    date = $('#created').val();

                        $.ajax({
                            headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                            url: '/clients/initials',
                            type: 'POST',
                            dataType: "json",
                            data: {amount:amount, id: user.id, date: date},
                            success: function(data){
                                $('#form_client_search').trigger("submit");
                                $('#newsMod').modal('hide');
                                $('.text-alert').empty();
                                $('.text-alert').append('Initial Invest Sucessfully');
                                $('.alert').removeClass('alert-warning');
                                $('.alert').removeClass('alert-danger');
                                $('.alert').addClass('alert-success');
                                $('#newsAlertMod').modal('show');
                            },
                            error: function (error) {
                                $(this).removeClass('disabled');
                                $('.text-alert').empty();
                                $('.text-alert').append('An error has ocurred');
                                $('.alert').removeClass('alert-success');
                                $('.alert').removeClass('alert-danger');
                                $('.alert').addClass('alert-warning');
                                $('#newsAlertMod').modal('show');
                            }
                        })

                })
            }
        }
    }

    /* End Client Functions */

    /* Begin Newsletter Functions */
    if(pathname.toString() == '/newsletter'){
      /*Search User Table*/

      $('.listnews').addClass('active');

      $('#table_newsletter_header_title').click(function (e) {
        orderTableNewsletterBy('title');
      });

       $('#table_newsletter_header_username').click(function (e) {
        orderTableNewsletterBy('username');
      });

      $('#table_newsletter_header_message').click(function (e) {
        orderTableNewsletterBy('message');
      });

      $('#table_newsletter_header_date').click(function (e) {
        orderTableNewsletterBy('created_at');
      });

      $('#table_newsletter_header_update').click(function (e) {
        orderTableNewsletterBy('updated_at');
      });

      var orderNewsletterBy = "";
      var orderNewsletterDirection = "";
      var searchNewsletterValue = "";

      $( "#form_newsletter_search" ).submit(function(e){
          e.preventDefault();
          //DESC
          searchNewsletterValue = $( "#search_newsletter_value" ).val();
          searchNewsletter(1);
      });

      function orderTableNewsletterBy(by){
          if(orderNewsletterBy === by){
              if(orderNewsletterDirection === ""){
                  orderNewsletterDirection = "DESC";
              }else{
                  orderNewsletterDirection = "";
              }
          }else{
              orderNewsletterBy = by;
              orderNewsletterDirection = "";
          }
          searchNewsletter(1);
      }

      //Get Newsletter Data

      function searchNewsletter(page){
          resultPage =  $( "#result_newsletter_page" ).val();
          $.ajax({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              url: "/newsletter",
              type: 'post',
              data: { searchvalue : searchNewsletterValue, page : page, orderBy :orderNewsletterBy, orderDirection: orderNewsletterDirection, resultPage: resultPage } ,
              success: function (data) {
                  //Inicio
                  var newsletters = data.result;

                  if(newsletters.length == 0){
                      $("#table_newsletter_content").html("");
                      $('#table_newsletter_content').append('<tr><td colspan="6">None</td></tr>');
                  }else{
                      $("#table_newsletter_content").html("");
                      for(i=0;i < newsletters.length;i++)
                      {
                          var newsletter = newsletters[i];

                          var rowResult = $( '<tr></tr>');
                          var colvalue_1 = $( '<td>'+  newsletter.title +'</td>');
                          var colvalue_2 = $( '<td>'+ newsletter.name +'</td>');
                          var colvalue_3 = $( '<td>'+  newsletter.message  +'</td>');
                          var colvalue_4 = $('<td></td>');

                          editBut = $('<button type="button"  data-toggle="modal" data-target="#newsMod" id="editBut" class="btn btn-alternative btn-sm">Edit</button>');
                          delBut = $('<button type="button"  data-toggle="modal" data-target="#newsMod" id="delBut" class="btn btn-alternative-danger btn-alternative btn-sm">Delete</button>');
                          // we have to make in steps to add the onclick event
                          addEditNewsletterClick(editBut, newsletter);
                          addMakeDnewsButton(delBut, newsletter);
                          var colvalue_4 = $( '<td>'+  newsletter.created_at  +'</td>');
                          var colvalue_5 = $( '<td>'+  newsletter.updated_at  +'</td>');
                          var colvalue_6 = $( '<td></td>');

                          colvalue_6.append(editBut);
                          colvalue_6.append(delBut);

                          rowResult.append(colvalue_1);
                          rowResult.append(colvalue_2);
                          rowResult.append(colvalue_3);
                          rowResult.append(colvalue_4);
                          rowResult.append(colvalue_5);
                          rowResult.append(colvalue_6);

                          $("#table_newsletter_content").append(rowResult);

                      }

                      $("#table_newsletter_pagination").html("");

                      page = parseInt(data.page);

                      var total = data.total;
                      var resultPage =  $( "#result_newsletter_page" ).val();
                      var totalPages = Math.ceil(total / resultPage);

                      if(page === 1){
                          maxPage = page + 2;
                          totalPages = (maxPage < totalPages) ?  maxPage: totalPages;

                          var pageList = $( '<ul class="pagination"></ul>');

                          for(i = page ; i <= totalPages; i++){
                              pagebutton = $( '<li class="page_newsletter pages"><a href="#">'+ i +'</a></li>');
                              pageList.append(pagebutton);
                              addPageNButton(pagebutton);
                          }

                          $("#table_newsletter_pagination").append(pageList);

                      }else if(page === totalPages){

                          page = page - 2;

                          if(page < 1){
                              page = 1;
                          }

                          totalPages = ( page + 2 < totalPages) ?  (page + 2): totalPages;
                          var pageList = $( '<ul class="pagination"></ul>');

                          for(i = page ; i <= totalPages; i++){
                              pagebutton = $( '<li class="page_newsletter pages"><a href="#">'+ i +'</a></li>');
                              pageList.append(pagebutton);
                              addPageNButton(pagebutton);
                          }

                          $("#table_newsletter_pagination").append(pageList);

                      }else{

                          page = page - 2;

                          if(page < 1){
                              page = 1;
                          }

                          totalPages = ( page + 4 < totalPages) ?  (page + 2): totalPages;
                          var pageList = $( '<ul class="pagination"></ul>');

                          for(i = page ; i <= totalPages; i++){

                              pagebutton = $( '<li class="page_newsletter pages"><a href="#">'+ i +'</a></li>');
                              pageList.append(pagebutton);
                              addPageNButton(pagebutton);

                          }
                          $("#table_newsletter_pagination").append(pageList);
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

      function addPageNButton(pagebutton){
          pagebutton.click(function(){
              page = $(this).text();
              searchNewsletter(page);
          })
      }

      /* Modal Create Newsletter */

      $('.btn-create').click(function(){

          box = $("<form class='NewsForm' id='NewsForm' enctype='multipart/form-data' ></form>");
          alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Newsletter</strong></div>');
          inputN = $('<div class="form-group"><label for="title">Title</label><input id="title" name="title" type="text" class="form-control" placeholder="Title" required></div>');
          inputL = $('<div class="form-group"><label for="message">Message</label><textarea id="message" class="form-control" name="message" rows="4" cols="50" placeholder="Message"></textarea></div>');

          $('.modal-title').empty();
          $('.modal-body').empty();
          $('.modal-footer').empty();

          $('.modal-title').append('Create Newsletter');
          $('.modal-body').append(box);

          $('#NewsForm').append(alert);
          $('#NewsForm').append(inputN);
          $('#NewsForm').append(inputL);


          $('.modal-footer').append("<div id='newsButts'></div>");

          closeBut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
          makeBut = $("<button type='button' name='button' class='btn btn-alternative' id='newsCont'>Make</button>");
          addMakeNewsButton(makeBut);


          $('#newsButts').append(makeBut);
          $('#newsButts').append(closeBut);
      });

      /*Make Button For Create News*/
      function addMakeNewsButton(makeBut){

          $('#NewsForm').validate({
              rules: {
                  title:{
                      required: true,
                      minlength: 2,
                  },
                  message:{
                      required: true,
                      minlength: 2,
                  },
              },
          });

          makeBut.click(function(e){
              if($('#NewsForm').valid()){

                  alterForm('#NewsForm', true);

                  $('#newsCont').hide();
                  $('.alert').show();
                  confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='newsConf'>Confirm</button>");
                  backBut = $("<button type='button' name='button' class='btn btn-alternative' id='newsBack'>Back</button>");
                  backButton(backBut, '#NewsForm', 'news');
                  confirmnewsButton(confirmBut);
                  $('#newsButts').prepend(backBut);
                  $('#newsButts').prepend(confirmBut);


              }
          })

      }

      /* Confirm User For Creation */
      function confirmnewsButton(confirmBut){
          confirmBut.click(function(){
            $(this).addClass('disabled');
                  title = $('#title').val();
                  message = $('#message').val();

                  $.ajax({

                      headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                      url: '/newsletter/create',
                      type: 'POST',
                      dataType: "json",
                      data: {title: title, message: message},
                      success: function(data){
                          $('#form_newsletter_search').trigger("submit");
                          $('#newsMod').modal('hide');
                          $('.text-alert').empty();
                          $('.text-alert').append('Newsletter Created Sucessfully');
                          $('.alert').removeClass('alert-warning');
                          $('.alert').removeClass('alert-danger');
                          $('.alert').addClass('alert-success');
                          $('#newsAlertMod').modal('show');
                      },
                      error: function (error) {
                          $(this).removeClass('disabled');
                          $('.text-alert').empty();
                          $('.text-alert').append('An error has ocurred');
                          $('.alert').removeClass('alert-success');
                          $('.alert').removeClass('alert-danger');
                          $('.alert').addClass('alert-warning');
                          $('#newsAlertMod').modal('show');
                      }
                  })
          })
      }

      /*Edit Button With Modal edition for Users*/
      function addEditNewsletterClick(buttonEdit, newsletter){
          buttonEdit.click(function (){
              box = $("<form class='NewsForm' id='NewsForm' enctype='multipart/form-data' ></form>");
              alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Newsletter</strong></div>');
              inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ newsletter.id +'" required>');
              inputN = $('<div class="form-group"><label for="title">Title</label><input id="title" name="title" type="text" class="form-control" placeholder="Title" value="'+newsletter.title+'" required></div>');
              inputL = $('<div class="form-group"><label for="message">Message</label><textarea id="message" class="form-control" name="message" rows="4" cols="50" placeholder="Message">'+newsletter.message+'</textarea></div>');

              $('.modal-title').empty();
              $('.modal-body').empty();
              $('.modal-footer').empty();

              $('.modal-title').append('Edit Newsletter');
              $('.modal-body').append(box);

              $('#NewsForm').append(alert);
              $('#NewsForm').append(inputI);
              $('#NewsForm').append(inputN);
              $('#NewsForm').append(inputL);


              $('.modal-footer').append("<div id='newsButts'></div>");
              closeBut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
              makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='newsCont'>Make</button>");
              addMakeENewsButton(makeBut);

              $('#newsButts').append(makeBut);
              $('#newsButts').append(closeBut);
          });
      }

      /* Make User Button For editing */
      function addMakeENewsButton(makeBut){

        $('#NewsForm').validate({
            rules: {
                title:{
                    required: true,
                    minlength: 2,
                },
                message:{
                    required: true,
                    minlength: 2,
                },
            },
        });
        makeBut.click(function(e){
            if($('#NewsForm').valid()){

                alterForm('#NewsForm', true);

                $('#newsCont').hide();
                $('.alert').show();
                confirmBut = $("<button type='button' class='btn btn-alternative-success btn-alternative' name='button' id='newsConf'>Confirm</button>");
                backBut = $("<button type='button' class='btn btn-alternative' name='button' id='newsBack'>Back</button>");
                backButton(backBut, '#NewsForm', 'news');
                confirmEnewsButton(confirmBut);
                $('#newsButts').prepend(backBut);
                $('#newsButts').prepend(confirmBut);


            }
        })
      }

      /* Confirm Button For Editing User */
      function confirmEnewsButton(confirmBut){
        confirmBut.click(function(){
          $(this).addClass('disabled');
                id = $('#id').val();
                title = $('#title').val();
                message = $('#message').val();

                $.ajax({

                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/newsletter/update',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id, title: title, message: message},
                    success: function(data){
                        $('#form_newsletter_search').trigger("submit");
                        $('#newsMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('Newsletter Edited Sucessfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#newsAlertMod').modal('show');
                    },
                    error: function (error) {
                        $(this).removeClass('disabled');
                        $('.text-alert').empty();
                        $('.text-alert').append('An error has ocurred');
                        $('.alert').removeClass('alert-success');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-warning');
                        $('#newsAlertMod').modal('show');
                    }
                })
        })
      }

      /* Delete Function For User */
      function addMakeDnewsButton(delButt, news){
          delButt.click(function(){
              box = $("<form class='NewsForm' id='NewsForm' enctype='multipart/form-data'></form>");
              alert = $('<h4><strong>Are You Sure for delete '+ news.title +' Newsletter?</strong></h4>');
              inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ news.id +'" required>');

              $('.modal-title').empty();
              $('.modal-body').empty();
              $('.modal-footer').empty();
              $('.modal-title').append('Delete Newsletter');
              $('.modal-body').append(box);

              $('#NewsForm').append(alert);
              $('#NewsForm').append(inputI);

              $('.modal-footer').append("<div id='newsButts'></div>");

              closeBut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
              makeBut = $("<button type='button' name='button' class='btn btn-alternative-danger btn-alternative' id='newsCont'>Delete</button>");

              DeleteNewsButton(makeBut);


              $('#newsButts').append(makeBut);
              $('#newsButts').append(closeBut);
          })
      }

      /* Confirmation Of User Deletion */
      function DeleteNewsButton(delButt){
          delButt.click(function(){
            $(this).addClass('disabled');
              id = $('#id').val();

              $.ajax({
                  headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                  url: '/newsletter/delete',
                  type: 'POST',
                  dataType: "json",
                  data: {id: id},
                  success: function(data){
                      $('#form_newsletter_search').trigger("submit");
                      $('#newsMod').modal('hide');
                      $('.text-alert').empty();
                      $('.text-alert').append('Newsletter Deleted Sucessfully');
                      $('.alert').removeClass('alert-warning');
                      $('.alert').removeClass('alert-danger');
                      $('.alert').addClass('alert-success');
                      $('#newsAlertMod').modal('show');
                  },
                  error: function (error) {
                      $(this).removeClass('disabled');
                      $('.text-alert').empty();
                      $('.text-alert').append('An error has ocurred');
                      $('.alert').removeClass('alert-success');
                      $('.alert').removeClass('alert-danger');
                      $('.alert').addClass('alert-warning');
                      $('#newsAlertMod').modal('show');
                  }
              });
          });
      }

      /*Execute Script*/
      $('#result_newsletter_page').change(function(){
          $('#form_newsletter_search').trigger("submit");
      })

      $('#form_newsletter_search').trigger("submit");
    }
    /* End Newsletter Functions */

    /* Begin Orders Functions */
/*
     if(pathname.toString() == '/orders'){

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


         /*Search Orders Table
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
                         for(i=0;i<  orders.length;i++){
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
     }

    /* End Orders Functions */


})
