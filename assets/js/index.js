define(function (require, exports, module) {

    var $ = require('jquery');

    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    p.dialog();
    p.downloadBar();
    p.abacus();

    var util = require('util');

    function Index(){
        //初始化
        this.init = function(){
            //banner轮播
            Slider();
            //加载顶部下载栏
            //loadShoppingCart();
            //初始化微信分享
            //util.weixinShare();
            //初始化回到顶部
            util.goTop('.fix-r');
        }
    }

    //轮播函数
    function Slider(){
        //Banner轮播
        require("Slider")($);
        $('#Banner').owlCarousel({
            navigation : false,
            slideSpeed : 300,
            paginationSpeed : 400,
            lazyLoad : true,
            autoPlay : 3000,
            singleItem : true

            // "singleItem:true" is a shortcut for:
            // items : 1,
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false
        });
    }

    function bindScroll(){
        //产品分类栏（product-nav）下拉置顶
        var DOM = $(".product-nav");
        $(window).bind("scroll",function() {
            var scrollHeight = $(document).scrollTop();//取到当前下拉往下滚的高度
            if (scrollHeight > $("#Banner").height()) {
                DOM.addClass("fixed");
            } else {
                DOM.removeClass("fixed");
            }
        });
    }

    //对外暴露这个对象
    module.exports = Index;
})
