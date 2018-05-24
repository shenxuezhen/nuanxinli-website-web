(function(){
    //首页幻灯片初始化 start
    if(window.chrome) {
        $('.unslider-banner li').css('background-size', '100% 100%');
    }
    $(function() {
        var unslider = $('.unslider-banner').unslider({
            arrows: false,
            fluid: true,
            dots: true
        });
        $('.arrow').click(function() {
            var fn = this.className.split(' ')[1];
            unslider.data('unslider')[fn]();
        });
    });
    //首页幻灯片初始化 end 
    //图片预加载 start
    preloadingImages([
        "../img/search_hover.png"
    ]);
    //图片预加载 end

    //自动事件初始化 start
    nxlEvent.auto();
    //自动事件初始化 end
})();