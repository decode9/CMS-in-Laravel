$(document).ready(function(){
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


        $window = $('window');


        $('.parallax').each(function() {
            var $scroll = $(this);

            $('window').scroll(function() {
                var yPos = -($window.scrollTop() / $scroll.data('speed'));
                var coords = '50% ' + yPos + 'px';
                $scroll.css({ backgroundPosition: coords });
            });
        });
        $('#SendContact').click(function(){
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
                data: {name: name, email: email, phone: phone, address: address, message: message, subject:subject, _token: token},
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(data){
                    $('#success').show();
                },
                error: function(){
                    $('#error').show();
                },
            })
        })
        plus = 1;
        $.ajax({
            type:"GET",
            url: "https://api.coinmarketcap.com/v1/ticker/?limit=20",
            datatype: "json",
            success: function(coins){

                for(i = 0; i < coins.length; i++){
			if(!(coins[i].name == "Bitcoin Cash")){
                    Name = coins[i].name + " ("+ coins[i].symbol + ")";
                    price = "$" +coins[i].price_usd + " USD" + " <span id='stats"+plus+"'> (" + coins[i].percent_change_24h + "%) </span>";
                    upDown = parseFloat(coins[i].percent_change_24h);

                    trace = "<p style='float:left; margin: 6px 20px'>" + Name + " " + price + "</p>"

                    $('.mover-1').append(trace);

                    if(upDown > 0){
                        $('#stats'+plus).css('color', "green");
                    }else{
                        $('#stats'+plus).css('color', "red");
                    }
                    plus ++;
                    }
                }
            }
        })
})
