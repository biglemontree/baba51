define(function (require, exports, module) {

    var $ = require('jquery');

    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    p.dialog();
    p.downloadBar();
    p.abacus();

    var util = require('util');

    function About(){
        //初始化
        this.init = function(){
            util.goTop('.fix-r');

            //公司介绍内容控制
            introduceControl()

            //公司历程
            courseControl();
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

    function introduceControl(){
        //判断内容高度，超过189，则添加按钮

        var _control = $(".s-a-i-control p");
        var _h = _control.height();

        function showMoreBtn(){
            if(_h > 190){
                $('.s-a-i-control p').append('<span class="csmy-B pos-abs r0 b0 bgFFF">查看详情 <img src="assets/img/upload/other/arrow.png" class="w1d2 mb1"></span>')
            }
        }
        showMoreBtn()

        $(".s-a-i-control p").on("click",".csmy-B",function(){
            var el = $(this),parent = el.parent().parent();
            parent.css("max-height","inherit");
            el.remove();
            showHideBtn()
        });

        function showHideBtn(){
            _control.after('<div class="ta-c" style="padding:1rem"><a class="csmy-B fs13 hide-introduce" href="javascript:;">收起</a></div>')
        }

        $('.s-a-i-control').on('click','.hide-introduce',function(){
            $(this).parent().parent().css("max-height","")
            $(this).remove()
            showMoreBtn()
        })
    }

    function courseControl(){

    }

    //对外暴露这个对象
    module.exports = About;
})
