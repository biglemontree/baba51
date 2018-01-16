define(function (require, exports, module) {

    var $ = require('jquery');

    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    p.dialog();
    p.downloadBar();
    p.abacus();

    var util = require('util');

    function Follow(){
        //初始化
        this.init = function(){
            util.goTop('.fix-r');
        }
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
    module.exports = Follow;
})
