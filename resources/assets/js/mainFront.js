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
})
