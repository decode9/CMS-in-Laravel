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
        $('#menuToggle').click(function(){

            if($('#leftContent').width() >= 240 ){
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
        $('#passwordBut').click(function() {
            $('.passwordField').slideToggle();
        })

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
})
