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
})
