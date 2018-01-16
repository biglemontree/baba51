define(function (require, exports, module) {

    var $ = require('jquery');

    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    require('vue');

    var util = require('util');

    function Help(){
        //初始化
        this.init = function(){
           
            //加载顶部下载栏
            //loadShoppingCart();
            //初始化微信分享
            //util.weixinShare();
            //初始化回到顶部
            // util.goTop('.fix-r');
        }
    }


  

    //对外暴露这个对象
    module.exports = Help;
})
