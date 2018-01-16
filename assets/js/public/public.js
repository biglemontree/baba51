define(function (require, exports, module) {

    var $ = require('jquery');
    var util = require('./util');
    require('dragdealer');
	
	var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    
	/**
     * App下载
     * 添加了该 class 的按钮，被点击，即会主动下载
     */
    $('body').on('click','.down-app-btn',function(){
    		//按钮所属App的ID
    		//<a href="javascript:;" class="down-app-btn" data-id="sb">省呗下载</a>
    		var appID = $(this).attr('data-id');

    		//生成Android，ios，应用宝下载地址的链接
    		//每个App都有对应的三个隐藏域，且隐藏域的ID为 appID + 名称
    		//<input type="hidden" id="sb_androidURL" value="http://...">
		//<input type="hidden" id="sb_iosURL" value="http://...">
		//<input type="hidden" id="sb_YYB" value="http://...">
    		var _androidURL = $(('#'+appID+'_androidURL')).val(),
    			_iosURL = $(('#'+appID+'_iosURL')).val(),
    			_YYB = $(('#'+appID+'_YYB')).val();
		
		if(util.checkWeiXin()){
			window.location.href = _YYB;
        }else{
        		if(isAndroid){
      			window.location.href = _androidURL;
        		}else{
      			window.location.href = _iosURL;
        		}
        }
    })
	

    /**
     * 公共模块
     */
    function Public() {
        //Menu菜单功能
        this.menu = function(){
            bindMenuEvent()
        }

        this.dialog = function(){
            bindDialogEvent()
        }

        this.downloadBar = function(){
            downloadBarControl(util)
        }

        this.abacus = function(){
            abacus()
        }
    }

    function bindMenuEvent(){
        //打开菜单
        $('.btn-menu').click(function(){
            $('.smy-menu-box').removeClass('dpN fadeOutUp').addClass('fadeInUp');
            $('header').fadeOut(300,function(){
                $(this).addClass('open')
            }).delay(100).fadeIn(200);
        })
        //关闭菜单
        $('.btn-menu-close').click(function(){
            $('header').removeClass('open');
            $('.smy-menu-box').removeClass('fadeInUp').addClass('fadeOutUp');
        })

        //展示尾部微信触发的效果
        showFooterWeixin();
    }

    function showFooterWeixin(){
        $('.f-follow .f-f-weixin').click(function(){
            var _url = $(this).attr('data-src');
            $('body').append('<a href="javascript:;" class="c-b-close"><div class="cover-bg pos-fix l0 r0 b0 t0 m-auto animated fadeIn" style="width:100%;height:100%;display:block"><div style="width: 20rem;height: 23rem;" class="pos-abs l0 r0 t0 b0 m-auto ta-c fs15 cFFF"><img style="max-width:20rem;" src="'+_url+'" /><p style="padding-top:10px">一个让你省钱又省心的公众号</p></div></div></a>')
        })

        $('body').delegate('.c-b-close','click',function(){
            $('.c-b-close').remove();
        })
    }

    function bindDialogEvent(){
        $('.smy-dialog-open').click(function(){
            var id = '.smy-dialog[data-id='+$(this).attr('data-id')+']';
            $(id).css({'visibility':'visible'}).addClass('fadeIn');
        })

        $('.smy-dialog-close').click(function(){
            $(this).closest('.smy-dialog').removeClass('fadeIn').css({'visibility':'hidden'})
        })
    }

    function downloadBarControl(util){

        $('.smy-down-bar .close').click(function(){
            util.setCookie("down", "off", 10);
            $('.smy-down-bar').fadeOut();
        })
        //检查cookie的值
        var state = util.getCookie("down");
        if(!(state=='off')){
            $('.smy-down-bar').slideDown();
        }
    }
    //计算函数对象
    var Caculator = {
        amount: 1000,
        period: 3,
        Cost: {
            "3": {
                "shengbei": 0.72,
                "bank": 1
            },
            "6": {
                "shengbei": 0.63,
                "bank": 0.875
            },
            "12": {
                "shengbei": 0.59,
                "bank": 0.8125
            }
        },
        calc: function () {
            var cost = this.Cost[this.period],
                pay_per_period = (this.amount / this.period + (this.amount * cost.shengbei / 100)).toFixed(2),
                reduce = ((cost.bank - cost.shengbei) / cost.bank * 100).toFixed(2);

            $("#smy_amount").text(pay_per_period);
            $("#smy_banck").text("省" + reduce + "%");
        }
    };

    function abacus(){
        new Dragdealer('smySliderBar', {
            animationCallback: function(x, y) {
                var v = Math.round(x * 20000);
                $('#smySliderBar .value').text(parseInt(v / 500) * 500);
                $('.s-a-b-Progress').width((Math.round(x * 100))+'%');
                var money = $('#smySliderBar .value').text();
                Caculator.amount = money;
                Caculator.calc();
            }
        });
        //选择期数计算
        $(".s-a-b-data").on("click", "a", function () {
            var period = parseInt($(this).text());
            $(this).addClass("active").siblings().removeClass("active");
            Caculator.period = period;
            Caculator.calc();
        })
    }

    //对外暴露这个对象
    module.exports = Public;
});

