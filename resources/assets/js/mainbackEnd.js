/*****************************************************************/
/*****************************************************************/
/** Javascript Archive for KryptoEnterprise Backend Web System  **/
/** This code was development for one person in the begin       **/
/** But the idea is colaborate and make it bigger and better    **/
/** For that reason comment your code and put your name, City   **/
/** begin of line and end of line of your code.                 **/
/** Thanks for coding                                           **/
/**                                                             **/
/** 1.- Jorge Bastidas - Caracas, Venezuela - 13 to 5300        **/
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

                list = '<div class="col-sm-6" style="padding:0px; margin-bottom: 6px;"><div class="col-sm-12" style="padding:0px;"><div class="col-sm-3 colorChart" style="padding:0px;" id="colorChart'+i+'"><div class="color"></div></div><div class="col-sm-9" style="padding:0px;"><h5 class="list-group-item-heading text-center">'+symbol+'</h5></div></div><div class="col-sm-12 text-center" style="padding:0px;"><p class="small">Amount: '+formatNumber2.num(amount)+'</p><p class="small">percent: '+formatNumber2.num(balance.percent)+'%</p></div></div>';
                list2 = $('<div class="col-sm-12 text-center folioList"></div>');

                symbol = $('<div class="col-sm-3"><h5>'+symbol+'</h5></div>');
                percents = parseInt(balance.percent);
                progress = $('<div class="col-sm-3 divPro"><div class="progress"><div class="progress-bar progress-bar-striped" id="progress'+i+'" role="progressbar" aria-valuenow="'+percents+'" aria-valuemin="0" aria-valuemax="100" style="width:'+percents+'%">'+percents+'%</div></div></div>');
                amount = $('<div class="col-sm-3"><h5>'+formatNumber2.num(balance.amount)+' '+ balance.symbol +'</h5></div>');
                va = $('<div class="col-sm-3"><h5>$ '+formatNumber2.num(balance.equivalent)+'</h5></div>');

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


                  var arraych = new Array();

                  for(a=0; a < chart['amount'].length; a++){
                    var colunm = { y: chart['amount'][a], label: chart['symbol'][a]};
                    arraych.push(colunm);

                  }


                    var chart = new CanvasJS.Chart("chartContainer", {
                       theme: "dark1", // "light1", "light2", "dark1", "dark2"
                       animationEnabled: true,
                       backgroundColor: "transparent",
                       data: [{
                           type: "pie",
                           startAngle: 25,
                           toolTipContent: "<b>{label}</b>: ${y} - #percent%",
                           showInLegend: "true",
                           legendText: "{label}",
                           indexLabelFontSize: 16,
                           indexLabel: "{label} - #percent%",
                           dataPoints: arraych,
                       }]
                     });
                  chart.render();
                  chart.legend.set("fontColor", "white");
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
              chartD = data.result;
              var arraych = new Array();

              for(a=0; a < chartD.length; a++){
                chart = chartD[a];
                var colunm = { y: chart.amount, label: chart.register};
                arraych.push(colunm);

              }

              var charts = new CanvasJS.Chart("historicalChart", {
                 animationEnabled: true,
                 backgroundColor: "transparent",
                 axisX: {
                   labelFontColor: "white",
                 },
                 axisY: {
                     title: "USD",
                     titleFontColor: "#4F81BC",
                     labelFontColor: "white",
                     suffix: "$"
                 },
                 data: [{
                     name: "views",
                     type: "area",
                     yValueFormatString: "#,##0.0$",
                     dataPoints: arraych
                 }]
               });

               charts.render();
               charts.legend.set("fontColor", "white");
            },
          })
        })
      }

      $('#table_period_header_open_date').click(function (e) {
          orderTablePeriodBy('open_date');
      });

      $('#table_period_header_open_amount').click(function (e) {
          orderTablePeriodBy('open_amount');
      });

      $('#table_period_header_close_date').click(function (e) {
          orderTablePeriodBy('close_date');
      });

      $('#table_period_header_close_amount').click(function (e) {
          orderTablePeriodBy('close_amount');
      });

      var orderPeriodBy = "";
      var orderPeriodDirection = "";
      var searchPeriodValue = "";

      function orderTablePeriodBy(by) {
          if (orderClientBy === by) {
              if (orderPeriodDirection === "") {
                  orderPeriodDirection = "DESC";
              } else {
                  orderPeriodDirection = "";
              }
          } else {
              orderPeriodBy = by;
              orderPeriodDirection = "";
          }
          searchPeriod(1);
      };

      //Get Period Data

      function searchPeriod(page) {

          resultPage = $("#result_period_page").val();

          $.ajax({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              url: "/dashboard/periods",
              type: 'post',
              data: { searchvalue: searchPeriodValue, page: page, orderBy: orderPeriodBy, orderDirection: orderPeriodDirection, resultPage: resultPage },
              success: function success(data) {
                  //Inicio
                  var periods = data.result;

                  if (periods.length == 0) {
                      $("#table_period_content").html("");
                      $('#table_period_content').append('<tr><td colspan="7">None</td></tr>');
                  } else {
                      // Put the data into the element you care about.
                      $("#table_period_content").html("");

                      for (i = 0; i < periods.length; i++) {
                          var period = periods[i];

                          // we have to make in steps to add the onclick event
                          var rowResult = $('<tr></tr>');
                          var colvalue_1 = $('<td>' + period.open_date + '</td>');
                          var colvalue_2 = $('<td>' + formatNumber2.num(period.open_amount) + '</td>');
                          if(period.close_amount == 0){
                            var colvalue_3 = $('<td>0000-00-00</td>');
                            var colvalue_4 = $('<td>0</td>');
                            var colvalue_5 = $('<td class="text-center">0<br/>0%</td>');
                          }else{
                            var colvalue_3 = $('<td>'+ period.close_date +'</td>');
                            var colvalue_4 = $('<td>' + formatNumber2.num(period.close_amount) + '</td>');

                            var change = period.close_amount - period.open_amount;
                            var Pchange = (change / period.open_amount) * 100;

                            var colvalue_5 = $('<td class="text-center">'+formatNumber2.num(change)+'<br/>'+formatNumber2.num(Pchange)+'%</td>');
                          }

                          rowResult.append(colvalue_1);
                          rowResult.append(colvalue_2);
                          rowResult.append(colvalue_3);
                          rowResult.append(colvalue_4);
                          rowResult.append(colvalue_5);

                          $("#table_period_content").append(rowResult);
                      }

                      $("#table_period_pagination").html("");

                      page = parseInt(data.page);
                      var total = data.total;
                      var resultPage = $("#result_client_page").val();
                      var totalPages = Math.ceil(total / resultPage);

                      if (page === 1) {
                          maxPage = page + 2;
                          totalPages = maxPage < totalPages ? maxPage : totalPages;
                          var pageList = $('<ul class="pagination"></ul>');

                          for (i = page; i <= totalPages; i++) {
                              pagebutton = $('<li class="page_period pages"><a href="#">' + i + '</a></li>');
                              pageList.append(pagebutton);
                              addPagePDButton(pagebutton);
                          }

                          $("#table_period_pagination").append(pageList);
                      } else if (page === totalPages) {
                          page = page - 2;

                          if (page < 1) {
                              page = 1;
                          }

                          totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                          var pageList = $('<ul class="pagination"></ul>');

                          for (i = page; i <= totalPages; i++) {
                              pagebutton = $('<li class="page_period pages"><a href="#">' + i + '</a></li>');
                              pageList.append(pagebutton);
                              addPagePDButton(pagebutton);
                          }

                          $("#table_period_pagination").append(pageList);
                      } else {
                          page = page - 2;

                          if (page < 1) {
                              page = 1;
                          }

                          totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                          var pageList = $('<ul class="pagination"></ul>');

                          for (i = page; i <= totalPages; i++) {
                              pagebutton = $('<li class="page_period pages"><a href="#">' + i + '</a></li>');
                              pageList.append(pagebutton);
                              addPagePDButton(pagebutton);
                          }

                          $("#table_period_pagination").append(pageList);
                      }
                  }
              },
              // Fin
              error: function error(error) {
                  ReadError(error);
              }
          });

      };

      function addPagePDButton(pagebutton) {
          pagebutton.click(function () {
              page = $(this).text();
              searchPeriod(page);
          });
      };

      lineChart('#daily', 'daily');

      lineChart('#weekly', 'weekly');

      lineChart('#monthly', 'monthly');

      $('#daily').trigger('click');

      newsletter();
      searchPeriod(1);
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
            $(this).addClass('disabled');
            $(this).prop('disabled', true);
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
                   $(this).prop('disabled', false);
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
                $(this).prop('disabled', true);
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
                        $(this).prop('disabled', false);
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
                    $(this).prop('disabled', true);
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
                            $(this).prop('disabled', false);
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
                $(this).prop('disabled', true);
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
                      $(this).prop('disabled', false);
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
                $(this).prop('disabled', true);
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
                      $(this).prop('disabled', false);
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

                            if(currency.exchangeable == 1){
                              var colvalue_7 = $( '<td>Exchangeable</td>');
                            }else{
                              var colvalue_7 = $( '<td>No Exchangeable</td>');
                            }

                            var colvalue_8 = $( '<td class="text-center"></td>');
                            if(currency.type == 'Token'){
                              viewBut = $('<button type="button" class="btn btn-alternative btn-sm" id="editBut">View</button>');
                              viewToken(viewBut, currency.type, currency.name);
                              colvalue_8.append(viewBut);
                            }
                            editBut = $('<button type="button" data-toggle="modal" data-target="#currencyMod" class="btn btn-alternative btn-sm" id="editBut">Edit</button>');
                            delBut = $('<button type="button" data-toggle="modal" data-target="#currencyMod" class="btn btn-alternative-danger btn-alternative btn-sm" id="delBut">Delete</button>');
                            addEditCurrencyClick(editBut, currency);
                            addMakeDcurrencyButton(delBut, currency);

                            colvalue_8.append(editBut);
                            colvalue_8.append(delBut);

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);
                            rowResult.append(colvalue_5);
                            rowResult.append(colvalue_6);
                            rowResult.append(colvalue_7);
                            rowResult.append(colvalue_8);

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

        function viewToken(viewbut, type, name){
          viewbut.click(function(){
            if(type == 'Token'){
              $('#rightContent').html('<iframe width="100%" height="100%" src="https://icodrops.com/'+name.toLowerCase()+'"></iframe>');
            }
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
            inputCE = ('<div class="checkbox-inline" title="Made Coin Exchangeable"><label id="labelce" ><input class="exch" id="exch" type="checkbox" name="exch" value="1"/> Exchangeable</label></div>');
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
            $('#CurrencyForm').append(inputCE);
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
                $(this).prop('disabled', true);
                name = $('#name').val();
                symbol = $('#symbol').val();
                type = $('#type').val();
                value = $('#value').val();
                exch = $('#exch').val();
                if(value != 'coinmarketcap'){
                    value = value.replace(/,/g, '.');
                    value = parseFloat(value) * -1;
                }
                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/create',
                    type: 'POST',
                    dataType: "json",
                    data: {name: name, symbol: symbol, type: type, value:value, exch: exch},
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
                        $(this).prop('disabled', false);
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
                inputCE = ('<div class="checkbox-inline" title="Made Coin Exchangeable"><label id="labelce" ><input class="exch" id="exch" type="checkbox" name="exch" value="1"/> Exchangeable</label></div>');

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
                $('#CurrencyForm').append(inputCE);

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
                $(this).prop('disabled', true);
                id = $('#id').val();
                name = $('#name').val();
                symbol = $('#symbol').val();
                type = $('#type').val();
                value = $('#value').val();
                exch = $('#exch').val();

                if(value != 'coinmarketcap'){
                    value = value.replace(/,/g, '.');
                    value = parseFloat(value);
                }

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/currencies/update',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id, name: name, symbol: symbol, type: type, value: value, exch:exch},
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
                        $(this).prop('disabled', false);
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
                $(this).prop('disabled', true);
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
                        $(this).prop('disabled', false);
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
                                var colvalue_3 = $('<td>' + formatNumber2.num(balance.equivalent)+ '</td>');
                            }


                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            if(data.eaccess){
                              if(balance.exchangeable){
                                var colvalue_4 = $('<td class="text-center"></td>');
                                var buttEx = $('<button class="btn btn-sm btn-alternative" data-toggle="modal" data-target="#fundsMod" type="button">Exchange</button>');
                                exchangeButton(buttEx, balance);
                                colvalue_4.append(buttEx);
                                rowResult.append(colvalue_4);
                              }else{
                                var colvalue_4 = $('<td class="text-center">No Exchangeable</td>');
                                rowResult.append(colvalue_4);
                              }

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
                selectP = $('<div class="form-group"><label for="selectper" >Period:</label><select id="period" class="form-control" name="period"></select></div>');
                BoS = $('<div class="col-sm-12 text-center"></div>');
                selectO = $('<div class="form-group" id="selectcuchange"><label for="selectout" >Change For:</label><select id="out" class="form-control" name="selectout"></select></div>');
                selectS = $('<div class="form-group"><label for="status">Status</label><select id="status" class="form-control" name="status"></select></div>');
                inputO = $('<div class="form-group" id="quantitychange"><label for="valueout">Quantity</label><input id="valueout" name="valueout" type="text" class="form-control" placeholder="Quantity" required></div>');
                inputSB = $('<input id="typeb" name="typeb" type="text" class="form-control" required value="buy" style="display:none;" disabled>');
                inputIC = $('<div id="currencyChange" style="display:none;"><input id="currencyin" name="currencyin" type="text" class="form-control" required value="'+currency.symbol+'" style="display:none;" disabled></div>');
                inputI = $('<div class="form-group statusch" id="totalChange"><label for="valuein">Total</label><input id="valuein" name="valuein" type="text" class="form-control" placeholder="Total" ></div>');
                inputR = $('<div class="form-group statusch" id="rateChange"><label for="rate">Exchange Rate</label><input id="rate" name="rate" type="text" class="form-control" placeholder="Exchange Rate" ></div>');
                inputA = $('<div class="form-group"><label for="created">Allocated</label><input id="created" name="created" type="date" class="form-control" placeholder="Allocated" ></div>');
                inputF = $('<div class="form-group statusch"><label for="funded">Funded</label><input id="funded" name="funded" type="date" class="form-control" placeholder="Funded" ></div>');

                var status = ['Complete', 'Pending'];


                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Exchange ' + currency.symbol);
                $('.modal-body').append(box);

                buyButt = $("<button type='button' style='font-size:20px;' class='btn btn-alternative btn-alternative-success btn-alternative-selected' id='buybut' name='button'>Buy</button>");
                sellButt = $("<button type='button' style='font-size:20px;' class='btn btn-alternative btn-alternative-danger' name='button' id='sellbut'>Sell</button>");

                BoS.append(buyButt);
                BoS.append(sellButt);

                buySelect(buyButt, currency.symbol);
                sellSelect(sellButt, currency.symbol);

                $('#ExchangeForm').append(alert);
                $('#ExchangeForm').append(selectP);
                $('#ExchangeForm').append(BoS);
                $('#ExchangeForm').append(labelA);
                $('#ExchangeForm').append(selectO);
                $('#ExchangeForm').append(selectS);
                $('#ExchangeForm').append(inputO);
                $('#ExchangeForm').append(inputSB);
                $('#ExchangeForm').append(inputIC);
                $('#ExchangeForm').append(inputR);
                $('#ExchangeForm').append(inputI);
                $('#ExchangeForm').append(inputA);
                $('#ExchangeForm').append(inputF);

                for(i = 0; i < status.length; i++){
                    stat = status[i];
                    if (stat == 'Complete') {
                      option = $('<option value="'+stat+'" selected>'+stat+'</option>');
                    }
                    option = $('<option value="'+stat+'">'+stat+'</option>');
                    $('#status').append(option);
                }

                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/funds/periods",
                    type: 'post',
                    datatype: 'json',
                    success: function (data) {
                        //Inicio
                        periods = data.data;
                        for(i=0;i < periods.length;i++)
                        {
                            var period = periods[i];
                            if(i == 0){
                                var option = '<option value="'+period.id+'" selected>Open In '+ period.open_date +'</option>';
                            }else{
                              var option = '<option value="'+period.id+'">Open In '+ period.open_date +'</option>';
                            }

                            $('#period').append(option);
                        }
                    },
                    // Fin
                    error: function (error) {
                        ReadError(error);
                    }
                })

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
                availableBalance('#period');

                $('.modal-footer').append("<div id='exButts'></div>");

                statusChange('#status');
                makeBut = $("<button type='button' class='btn btn-alternative' name='button' id='exCont'>Make</button>");
                addMakeExButton(makeBut);
                closebut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                $('#exButts').append(makeBut);
                $('#exButts').append(closebut);

                exchangeOutValue('#valueout', '#rate', '#valuein');
                exchangeOutValue('#valueout', '#valuein', '#rate');

                $('#out').trigger("change");
                $('#buybut').trigger("click");
              })
        }

        function buySelect(butt, symbol){
          butt.click(function(){
            if(!($(this).hasClass("btn-alternative-selected"))){
              $('.btn-alternative-selected').removeClass("btn-alternative-selected");
              $(this).addClass("btn-alternative-selected");
              $('#typeb').val('buy');
              $('#selectcuchange').empty();
              $('#quantitychange').empty();
              $('#totalChange').empty();
              $('#currencyChange').empty();
              $('#rateChange').empty();


              $('#selectcuchange').append('<label for="selectout" >Change For:</label><select id="out" class="form-control" name="selectout"></select>');
              $('#quantitychange').append('<label for="valueout">Quantity</label><input id="valueout" name="valueout" type="text" class="form-control" placeholder="Quantity" required>');
              $('#currencyChange').append('<input id="currencyin" name="currencyin" type="text" class="form-control" required value="'+symbol+'" style="display:none;" disabled>');
              $('#totalChange').append('<label for="valuein">Total</label><input id="valuein" name="valuein" type="text" class="form-control" placeholder="Total" >');
              $('#rateChange').append('<label for="rate">Exchange Rate</label><input id="rate" name="rate" type="text" class="form-control" placeholder="Exchange Rate" >');

              $.ajax({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  url: "/funds/currencies",
                  type: 'post',
                  datatype: 'json',
                  data: {currency: symbol},
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
              $('#out').trigger('change');

              exchangeOutValue('#valueout', '#rate', '#valuein');
              exchangeOutValue('#valueout', '#valuein', '#rate');

            }
          })
        }

        function sellSelect(butt, symbol){
          butt.click(function(){
            if(!($(this).hasClass("btn-alternative-selected"))){
              $('.btn-alternative-selected').removeClass("btn-alternative-selected");
              $(this).addClass("btn-alternative-selected");
              $('#typeb').val('sell');
              $('#selectcuchange').empty();
              $('#quantitychange').empty();
              $('#totalChange').empty();
              $('#currencyChange').empty();
              $('#rateChange').empty();

              $('#selectcuchange').append('<label for="selectin" >Change For:</label><select id="currencyin" class="form-control" name="selectin"></select>');
              $('#quantitychange').append('<label for="valuein">Quantity</label><input id="valueinS" name="valuein" type="text" class="form-control" placeholder="Quantity" required>');
              $('#currencyChange').append('<input id="out" name="currencyin" type="text" class="form-control" required value="'+symbol+'" style="display:none;" disabled>');
              $('#totalChange').append('<label for="valueout">Total</label><input id="valueoutS" name="valueout" type="text" class="form-control" placeholder="Total" >');
              $('#rateChange').append('<label for="rate">Exchange Rate</label><input id="rateS" name="rate" type="text" class="form-control" placeholder="Exchange Rate" >');

              $.ajax({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  url: "/funds/currencies",
                  type: 'post',
                  datatype: 'json',
                  data: {currency: symbol},
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

                          $('#currencyin').append(option);
                      }
                  },
                  // Fin
                  error: function (error) {
                      ReadError(error);
                  }
              })

              availableBalance('#out');
              $('#out').trigger('change');

              exchangeOutValue('#valueinS', '#rateS', '#valueoutS');
              exchangeOutValue('#valueinS', '#valueoutS', '#rateS');

            }
          })
        }

        function statusChange(status){
          $(status).change(function(){
            statu = $(this).val();
            if(statu == 'Pending'){
              $('.statusch').hide();
            }else{
                $('.statusch').show();
            }
          })
        }

        function availableBalance(selection){
            $(selection).change(function(){
                currency = $('#out').val();
                if(currency == null){
                  currency = 'VEF';
                }
                period = $('#period').val();
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "/funds/available",
                    type: 'post',
                    datatype: 'json',
                    data: {currency: currency, period: period},
                    success: function (data) {
                        //Inicio
                        currenc = data.data;
                        amount = formatNumber.num(currenc.amount);
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

        function exchangeInValue(value, select, target){
            $(select).change(function(){
              if(target == '#rate' || target == '#rateS'){

                var val = $(value).val();
                var sel = $(select).val();
                var newval = val / sel;

                $(target).val(newval);
              }else if (target == '#valuein' || target == '#valueoutS') {
                var val = $(value).val();
                var sel = $(select).val();
                var newval = val * sel;

                $(target).val(newval);
              }

            })
        }

        function exchangeOutValue(value, select, target){
            $(select).change(function(){
              if(target == '#rate' || target == '#rateS'){

                var val = $(value).val();
                var sel = $(select).val();

                var newval = sel / val;

                $(target).val(newval);
              }else if (target == '#valuein' || target == '#valueoutS') {
                var val = $(value).val();
                var sel = $(select).val();
                var newval = val * sel;

                $(target).val(newval);
              }
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
                        period:{
                          required: true,
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
              $(this).prop('disabled', true);

              typeb = $('#typeb').val();

              if(typeb == 'buy'){
                amountout = $('#valueout').val();
                amountin = $('#valuein').val();
                rate = $('#rate').val();
              }else{
                amountout = $('#valueoutS').val();
                amountin = $('#valueinS').val();
                rate = $('#rateS').val();
              }
              currencyout = $('#out').val();
              currencyin = $('#currencyin').val();
              status = $('#status').val();
              period = $('#period').val();



                created = $('#created').val();
                created = created.replace(/\//g, '-');

                funded = $('#funded').val();
                funded = funded.replace(/\//g, '-');

                    $.ajax({
                        headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                        url: '/funds/exchange',
                        type: 'POST',
                        dataType: "json",
                        data: {periodId: period, cout : currencyout, cin : currencyin, aout : amountout, ain : amountin, rate: rate, created:created, funded: funded, status: status},
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
                            $(this).prop('disabled', false);
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
          orderTableTransactionBy('symbol');
        });

        $('#table_transaction_header_amount_out').click(function (e) {
          orderTableTransactionBy('out_amount');
        });

        $('#table_transaction_header_rate').click(function (e) {
          orderTableTransactionBy('rate');
        });

        $('#table_transaction_header_amount_in').click(function (e) {
          orderTableTransactionBy('in_amount');
        });

        $('#table_transaction_header_date').click(function (e) {
          orderTableTransactionBy('created_at');
        });

        $('#table_transaction_header_confirmed').click(function (e) {
          orderTableTransactionBy('updated_at');
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
          orderTablePendingTransactionBy('symbol');
        });

        $('#table_pending_transaction_header_amount_out').click(function (e) {
          orderTablePendingTransactionBy('out_amount');
        });

        $('#table_pending_transaction_header_rate').click(function (e) {
          orderTablePendingTransactionBy('rate');
        });

        $('#table_pending_transaction_header_amount_in').click(function (e) {
          orderTablePendingTransactionBy('in_amount');
        });

        $('#table_pending_transaction_header_date').click(function (e) {
          orderTablePendingTransactionBy('created_at');
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
              $(this).prop('disabled', true);
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
                            $(this).prop('disabled', false);
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
              $(this).prop('disabled', true);
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
                        $(this).prop('disabled', false);
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


        $('#table_balance_currency_header_symbol').click(function (e) {
            orderTableBalanceCurrencyBy('currencies.symbol');
        });

        $('#table_balance_currency_header_amount').click(function (e) {
            orderTableBalanceCurrencyBy('amount');
        });

        $('#table_balance_currency_header_equivalent').click(function (e) {
            orderTableBalanceCurrencyBy('equivalent');
        });

        var orderBalanceCurrencyBy = "equivalent";
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

        $('#table_period_header_open_date').click(function (e) {
            orderTablePeriodBy('open_date');
        });

        $('#table_period_header_open_amount').click(function (e) {
            orderTablePeriodBy('open_amount');
        });

        $('#table_period_header_close_date').click(function (e) {
            orderTablePeriodBy('close_date');
        });

        $('#table_period_header_close_amount').click(function (e) {
            orderTablePeriodBy('close_amount');
        });

        var orderPeriodBy = "";
        var orderPeriodDirection = "";
        var searchPeriodValue = "";

        function orderTablePeriodBy(by) {
            if (orderClientBy === by) {
                if (orderPeriodDirection === "") {
                    orderPeriodDirection = "DESC";
                } else {
                    orderPeriodDirection = "";
                }
            } else {
                orderPeriodBy = by;
                orderPeriodDirection = "";
            }
            searchPeriod(1);
        };

        //Get Period Data

        function searchPeriod(page) {

            resultPage = $("#result_period_page").val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/periods",
                type: 'post',
                data: { searchvalue: searchPeriodValue, page: page, orderBy: orderPeriodBy, orderDirection: orderPeriodDirection, resultPage: resultPage },
                success: function success(data) {
                    //Inicio
                    var periods = data.result;

                    if (periods.length == 0) {
                        $("#table_period_content").html("");
                        $('#table_period_content').append('<tr><td colspan="7">None</td></tr>');
                    } else {
                        // Put the data into the element you care about.
                        $("#table_period_content").html("");

                        for (i = 0; i < periods.length; i++) {
                            var period = periods[i];

                            // we have to make in steps to add the onclick event
                            var rowResult = $('<tr></tr>');
                            var colvalue_1 = $('<td>' + period.id + '</td>');
                            var colvalue_2 = $('<td>' + period.open_date + '</td>');
                            var colvalue_3 = $('<td>' + formatNumber2.num(period.open_amount) + '</td>');
                            if(period.close_amount == 0){
                              var colvalue_4 = $('<td>0000-00-00</td>');
                              var colvalue_5 = $('<td>0</td>');
                              var colvalue_6 = $('<td class="text-center">0<br/>0%</td>');
                            }else{
                              var colvalue_4 = $('<td>'+ period.close_date +'</td>');
                              var colvalue_5 = $('<td>' + formatNumber2.num(period.close_amount) + '</td>');

                              var change = period.close_amount - period.open_amount;
                              var Pchange = (change / period.open_amount) * 100;

                              var colvalue_6 = $('<td class="text-center">'+formatNumber2.num(change)+'<br/>'+formatNumber2.num(Pchange)+'%</td>');
                            }
                            var colvalue_7 = $('<td class="text-center"></td>');
                            var buttonS = $('<button class="btn btn-alternative-success btn-alternative btn-sm" data-toggle="modal" data-target="#clientMod" type="button">Close Period</button>');
                            var buttonI = $('<button class="btn btn-alternative-danger btn-alternative btn-sm" data-toggle="modal" data-target="#clientMod" type="button">Delete</button>');

                            addEditPeriodClick(buttonS, period);
                            addMakeDperiodButton(buttonI, period);

                            colvalue_7.append(buttonS);
                            colvalue_7.append(buttonI);

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);
                            rowResult.append(colvalue_5);
                            rowResult.append(colvalue_6);
                            rowResult.append(colvalue_7);

                            $("#table_period_content").append(rowResult);
                        }

                        $("#table_period_pagination").html("");

                        page = parseInt(data.page);
                        var total = data.total;
                        var resultPage = $("#result_client_page").val();
                        var totalPages = Math.ceil(total / resultPage);

                        if (page === 1) {
                            maxPage = page + 2;
                            totalPages = maxPage < totalPages ? maxPage : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_period pages"><a href="#">' + i + '</a></li>');
                                pageList.append(pagebutton);
                                addPagePDButton(pagebutton);
                            }

                            $("#table_period_pagination").append(pageList);
                        } else if (page === totalPages) {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 2 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_period pages"><a href="#">' + i + '</a></li>');
                                pageList.append(pagebutton);
                                addPagePDButton(pagebutton);
                            }

                            $("#table_period_pagination").append(pageList);
                        } else {
                            page = page - 2;

                            if (page < 1) {
                                page = 1;
                            }

                            totalPages = page + 4 < totalPages ? page + 2 : totalPages;
                            var pageList = $('<ul class="pagination"></ul>');

                            for (i = page; i <= totalPages; i++) {
                                pagebutton = $('<li class="page_period pages"><a href="#">' + i + '</a></li>');
                                pageList.append(pagebutton);
                                addPagePDButton(pagebutton);
                            }

                            $("#table_period_pagination").append(pageList);
                        }
                    }
                },
                // Fin
                error: function error(error) {
                    ReadError(error);
                }
            });

        };

        function addPagePDButton(pagebutton) {
            pagebutton.click(function () {
                page = $(this).text();
                searchPeriod(page);
            });
        };

        $('.btn-create-Pe').click(function(){

            box = $("<form class='PeriodForm' id='PeriodForm' enctype='multipart/form-data' ></form>");
            alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Period Date</strong></div>');
            inputN = $('<div class="form-group"><label for="title">Open Date</label><input id="opend" name="opend" type="date" class="form-control" placeholder="Open Date" required></div>');


            $('.modal-title').empty();
            $('.modal-body').empty();
            $('.modal-footer').empty();

            $('.modal-title').append('Create Period');
            $('.modal-body').append(box);

            $('#PeriodForm').append(alert);
            $('#PeriodForm').append(inputN);


            $('.modal-footer').append("<div id='periodButts'></div>");

            closeBut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
            makeBut = $("<button type='button' name='button' class='btn btn-alternative' id='periodCont'>Make</button>");
            addMakePeriodButton(makeBut);


            $('#periodButts').append(makeBut);
            $('#periodButts').append(closeBut);
        });

        function addMakePeriodButton(makeBut){

            $('#PeriodForm').validate({
                rules: {
                    opend:{
                        required: true,
                        date: true,
                    },
                },
            });

            makeBut.click(function(e){
                if($('#PeriodForm').valid()){

                    alterForm('#PeriodForm', true);

                    $('#periodCont').hide();
                    $('.alert').show();
                    confirmBut = $("<button type='button' name='button' class='btn btn-alternative-success btn-alternative' id='periodConf'>Confirm</button>");
                    backBut = $("<button type='button' name='button' class='btn btn-alternative' id='periodBack'>Back</button>");
                    backButton(backBut, '#PeriodForm', 'period');
                    confirmperiodButton(confirmBut);
                    $('#periodButts').prepend(backBut);
                    $('#periodButts').prepend(confirmBut);


                }
            })

        }

        /* Confirm User For Creation */
        function confirmperiodButton(confirmBut){
            confirmBut.click(function(){
              $(this).addClass('disabled');
              $(this).prop('disabled', true);
                    opend = $('#opend').val();

                    $.ajax({

                        headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                        url: '/periods/create',
                        type: 'POST',
                        dataType: "json",
                        data: {openD: opend},
                        success: function(data){
                            $('#form_period_search').trigger("submit");
                            $('#clientMod').modal('hide');
                            $('.text-alert').empty();
                            $('.text-alert').append('Period Created Sucessfully');
                            $('.alert').removeClass('alert-warning');
                            $('.alert').removeClass('alert-danger');
                            $('.alert').addClass('alert-success');
                            $('#clientAlertMod').modal('show');
                        },
                        error: function (error) {
                            $(this).removeClass('disabled');
                            $(this).prop('disabled', false);
                            $('.text-alert').empty();
                            $('.text-alert').append('An error has ocurred');
                            $('.alert').removeClass('alert-success');
                            $('.alert').removeClass('alert-danger');
                            $('.alert').addClass('alert-warning');
                            $('#clientAlertMod').modal('show');
                        }
                    })
            })
        }

        /*Edit Button With Modal edition for Users*/
        function addEditPeriodClick(buttonEdit, period){
            buttonEdit.click(function (){
              box = $("<form class='PeriodForm' id='PeriodForm' enctype='multipart/form-data' ></form>");
              alert = $('<div class="alert alert-success" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Please Check Your Information and Confirm the Period Date</strong></div>');
              inputI = $('<input id="id" name="id" type="text" class="form-control" value="'+period.id+'" style="display:none;" required>');
              inputN = $('<div class="form-group"><label for="closed">Close Date</label><input id="closeDate" name="closedate" type="date" class="form-control" placeholder="Close Date" required></div>');
              inputA = $('<div class="form-group"><label for="title">Close Amount</label><input id="closea" name="closea" type="text" class="form-control" placeholder="Close Amount" required></div>');

              $('.modal-title').empty();
              $('.modal-body').empty();
              $('.modal-footer').empty();

              $('.modal-title').append('Close Period');
              $('.modal-body').append(box);

              $('#PeriodForm').append(alert);
              $('#PeriodForm').append(inputI);
              $('#PeriodForm').append(inputN);
              $('#PeriodForm').append(inputA);


              $('.modal-footer').append("<div id='periodButts'></div>");

              closeBut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
              makeBut = $("<button type='button' name='button' class='btn btn-alternative' id='periodCont'>Make</button>");
              addMakeEPeriodButton(makeBut);


              $('#periodButts').append(makeBut);
              $('#periodButts').append(closeBut);
            });
        }

        /* Make User Button For editing */
        function addMakeEPeriodButton(makeBut){

          $('#PeriodForm').validate({
              rules: {
                  closedate:{
                      required: true,
                      date:true,
                      minlength: 2,
                  },
                  closea:{
                      required: true,
                      minlength: 2,
                  },
              },
          });
          makeBut.click(function(e){
              if($('#PeriodForm').valid()){

                  alterForm('#PeriodForm', true);

                  $('#periodCont').hide();
                  $('.alert').show();
                  confirmBut = $("<button type='button' class='btn btn-alternative-success btn-alternative' name='button' id='periodConf'>Confirm</button>");
                  backBut = $("<button type='button' class='btn btn-alternative' name='button' id='periodBack'>Back</button>");
                  backButton(backBut, '#PeriodForm', 'period');
                  confirmEperiodButton(confirmBut);
                  $('#periodButts').prepend(backBut);
                  $('#periodButts').prepend(confirmBut);


              }
          })
        }

        /* Confirm Button For Editing User */
        function confirmEperiodButton(confirmBut){
          confirmBut.click(function(){
            $(this).addClass('disabled');
            $(this).prop('disabled', true);
                  id = $('#id').val();
                  closeda = $('#closeDate').val();
                  closea = $('#closea').val();
                  console.log(closeda);
                  $.ajax({

                      headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                      url: '/periods/update',
                      type: 'POST',
                      dataType: "json",
                      data: {id: id, closeD : closeda, closeA: closea},
                      success: function(data){
                          $('#form_period_search').trigger("submit");
                          $('#clientMod').modal('hide');
                          $('.text-alert').empty();
                          $('.text-alert').append('Period closed Sucessfully');
                          $('.alert').removeClass('alert-warning');
                          $('.alert').removeClass('alert-danger');
                          $('.alert').addClass('alert-success');
                          $('#clientAlertMod').modal('show');
                      },
                      error: function (error) {
                          $(this).removeClass('disabled');
                          $(this).prop('disabled', false);
                          $('.text-alert').empty();
                          $('.text-alert').append('An error has ocurred');
                          $('.alert').removeClass('alert-success');
                          $('.alert').removeClass('alert-danger');
                          $('.alert').addClass('alert-warning');
                          $('#clientAlertMod').modal('show');
                      }
                  })
          })
        }

        /* Delete Function For User */
        function addMakeDperiodButton(delButt, period){
            delButt.click(function(){
                box = $("<form class='PeriodForm' id='PeriodForm' enctype='multipart/form-data'></form>");
                alert = $('<h4><strong>Are You Sure for delete period open in '+ period.open_date +'?</strong></h4>');
                inputI = $('<input id="id" name="id" style="display: none;" type="text" class="form-control" value="'+ period.id +'" required>');

                $('.modal-title').empty();
                $('.modal-body').empty();
                $('.modal-footer').empty();
                $('.modal-title').append('Delete Newsletter');
                $('.modal-body').append(box);

                $('#PeriodForm').append(alert);
                $('#PeriodForm').append(inputI);

                $('.modal-footer').append("<div id='periodButts'></div>");

                closeBut = $('<button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>');
                makeBut = $("<button type='button' name='button' class='btn btn-alternative-danger btn-alternative' id='periodCont'>Delete</button>");

                DeletePeriodButton(makeBut);


                $('#periodButts').append(makeBut);
                $('#periodButts').append(closeBut);
            })
        }

        /* Confirmation Of User Deletion */
        function DeletePeriodButton(delButt){
            delButt.click(function(){
              $(this).addClass('disabled');
              $(this).prop('disabled', true);
                id = $('#id').val();

                $.ajax({
                    headers: { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
                    url: '/periods/delete',
                    type: 'POST',
                    dataType: "json",
                    data: {id: id},
                    success: function(data){
                        $('#form_period_search').trigger("submit");
                        $('#clientMod').modal('hide');
                        $('.text-alert').empty();
                        $('.text-alert').append('Period Deleted Sucessfully');
                        $('.alert').removeClass('alert-warning');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-success');
                        $('#clientAlertMod').modal('show');
                    },
                    error: function (error) {
                        $(this).removeClass('disabled');
                        $(this).prop('disabled', false);
                        $('.text-alert').empty();
                        $('.text-alert').append('An error has ocurred');
                        $('.alert').removeClass('alert-success');
                        $('.alert').removeClass('alert-danger');
                        $('.alert').addClass('alert-warning');
                        $('#clientAlertMod').modal('show');
                    }
                });
            });
        }


        $("#form_period_search").submit(function (e) {
            e.preventDefault();
            //DESC
            searchPeriodValue = $("#search_period_value").val();
            searchPeriod(1);
        });

        $('#result_period_page').change(function(){
            $('#form_period_search').trigger("submit");
        })

        $('#form_period_search').trigger("submit");

        $('#table_client_header_name').click(function (e) {
            orderTableClientBy('name');
        });

        $('#table_client_header_email').click(function (e) {
            orderTableClientBy('email');
        });
        $('#table_client_header_initial').click(function (e) {
            orderTableClientBy('amount');
        });
        $('#table_client_header_percent').click(function (e) {
            orderTableClientBy('percent');
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
                            var colvalue_1 = $('<td style="vertical-align: middle;">' + client.name + '</td>');
                            var colvalue_2 = $('<td style="vertical-align: middle;">' + client.email + '</td>');
                            var colvalue_3 = $('<td style="vertical-align: middle;">'+ formatNumber2.num(client.amount) +'</td>');
                            var colvalue_4 = $('<td style="vertical-align: middle;">'+ formatNumber2.num(client.percent) +'%</td>');
                            var colvalue_5 = $('<td class="text-center" style="vertical-align: middle;"></td>');
                            var buttonS = $('<button class="btn btn-alternative btn-sm" type="button">Select Client</button>');
                            var buttonI = $('<button class="btn btn-alternative-success btn-alternative btn-sm" data-toggle="modal" data-target="#clientMod" type="button">Initial Investment</button>');
                            selectClient(buttonS, client.id);
                            initialInvest(buttonI, client);

                            colvalue_5.append(buttonS);
                            colvalue_5.append(buttonI);

                            rowResult.append(colvalue_1);
                            rowResult.append(colvalue_2);
                            rowResult.append(colvalue_3);
                            rowResult.append(colvalue_4);
                            rowResult.append(colvalue_5);
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
                                    var colvalue_1 = $('<td style="vertical-align: middle;">' + balance.symbol + '</td>');
                                    var colvalue_2 = $('<td style="vertical-align: middle;">' + formatNumber2.num(balance.amount) + '</td>');
                                    if(balance.symbol == 'VEF'){
                                        var colvalue_3 = $('<td style="vertical-align: middle;">' + formatNumber2.num(balance.amount / balance.value) + '</td>');
                                    }else{
                                        var colvalue_3 = $('<td style="vertical-align: middle;">' + formatNumber2.num(balance.equivalent) + '</td>');
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
                    orderTableBalanceCurrencyBy('equivalent');
                });

                var orderBalanceCurrencyBy = "equivalent";
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
                  $(this).prop('disabled', true);
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
                                $('#clientMod').modal('hide');
                                $('.text-alert').empty();
                                $('.text-alert').append('Initial Invest Sucessfully');
                                $('.alert').removeClass('alert-warning');
                                $('.alert').removeClass('alert-danger');
                                $('.alert').addClass('alert-success');
                                $('#clientsAlertMod').modal('show');
                            },
                            error: function (error) {
                                $(this).removeClass('disabled');
                                $(this).prop('disabled', false);
                                $('.text-alert').empty();
                                $('.text-alert').append('An error has ocurred');
                                $('.alert').removeClass('alert-success');
                                $('.alert').removeClass('alert-danger');
                                $('.alert').addClass('alert-warning');
                                $('#clientAlertMod').modal('show');
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
            $(this).prop('disabled', true);
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
                          $(this).prop('disabled', false);
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
          $(this).prop('disabled', true);
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
                        $(this).prop('disabled', false);
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
            $(this).prop('disabled', true);
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
                      $(this).prop('disabled', false);
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

})
