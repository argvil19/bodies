// This needs to be optimized.

$( document ).ready(function(){

    var B_collapse = $('a.button-collapse.show-on-large');
    var B_HideMenu = $('a#sidemenu');
    var sideMenu = $('ul#mobile-menu');
    var main = $('main');
    var footer = $('footer.page-footer');
    var active = true;

    $(B_collapse).click(function(){  
        if(active === true){
            $(sideMenu).css('transform', 'translateX(0%)');
            $(main).css('padding-left', '250px');
            $(footer).css('padding-left', '250px');
            active = false;
        }else{
            $(sideMenu).css('transform', 'translateX(-100%)');
            $(main).css('padding-left', '0');
            $(footer).css('padding-left', '0');
            active = true;
        }
    });

    $(B_HideMenu).click(function(){
        if(active === false){
            $(sideMenu).css('transform', 'translateX(-100%)');
            $(main).css('padding-left', '0');
            $(footer).css('padding-left', '0');
            active = true;
        }
    });


});