// define(function(require, exports, module) {
//     var $ = require('jquery');
//     var a = require('vue')
//     // var a = require('../lib/vue/2.2.0/vue.js');
//     var header = require('header');
//     console.log(header)
//     function Dynamic(){
//         this.init = function(){
//             // var vm = new Vue()
//             console.log(Vue)
//         }
//     }
//     module.exports = Dynamic;
// });

define(function (require, exports, module) {

    var $ = require('jquery');

    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    p.dialog();
    p.downloadBar();
    p.abacus();

    var util = require('util');

    function Dynamic(){
        //初始化
        this.init = function(){
            hidemask()
        }
    }

    function hidemask(){

        $('.share').click(function(){
            $('.record').show()
            $('.record-content').show()
        })
        $('.record').click(function(){
            $('.record').hide()
            $('.record-content').hide()
        })
        
        // new vue({
        //     el:'',
        //     data:{}
        // })
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
    module.exports = Dynamic;
})
