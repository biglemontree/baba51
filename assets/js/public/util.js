define(function (require, exports, module) {

    var $ = require('jquery');
    $.ajaxSetup ({
        cache: false //close AJAX cache
    });

    var tool = {
        //此方法为了避免在 ms 段时间内，多次执行func。常用 resize、scoll、mousemove等连续性事件中
        buffer: function(func, ms, context){
            var buffer;
            return function(){
                if(buffer) return;
                buffer = setTimeout(function(){
                    func.call(this)
                    buffer = undefined;
                },ms);
            };
        }
    };

    /**
     * 字符串模版, htmlFormat('<a href=":url">:text</a>', { url : 'xxx', text : 'abcd'});
     * @param s
     * @param paramObj
     */
    var htmlFormat = function (s, paramObj) {
        for (var name in paramObj) {
            if (!name) {
                continue;
            }
            var key = ':' + name;
            while (true) {
                if (s.indexOf(key) < 0) {
                    break;
                }
                s = s.replace(key, paramObj[name]);
            }
        }
        return s;
    }

    /** Cookie处理 **/
    //存入Cookie
    function setCookie(name, value, expiredays) {
        var exdate = new Date()
        exdate.setMinutes(exdate.getMinutes() + expiredays)
        var array = document.domain.split('.');

        var cookieValue = name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) +
            ";path=/";
        document.cookie = cookieValue;
    }

    //读取Cookie
    function getCookie(p_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(p_name + "=")
            if (c_start != -1) {
                c_start = c_start + p_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }

    //删除Cookie
    function delCookie(p_name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(p_name);
        if (cval != null)
            document.cookie = p_name + "=" + cval + ";expires=" + exp.toGMTString();
    }

    //判断是否为微信浏览器
    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    //微信分享
    function weixinShare(){
        if(isWeixin()){
            require.async('WxShare',function(WeixinShare) {
                var wx = new WeixinShare();
                wx.init();
            });
        }
    }

    //根据字符串中的,来算个数
    function count(str){
        return str.split(',').length;
    }

    //无网络提示效果
    function showNoService(){
        var tip = '<div class="no-service"><div class="n-s-ico"><img src="data:image/png;base64,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"></div><p>网络出错啦，请点击按钮重新加载</p><div><a href="" class="">重新加载</a></div></div>';
        return tip;
    }

    //验证手机格式
    function checkMobile(number){
        var reg = /^(((13[0-9]{1})|130|131|132|133|134|135|136|137|138|139|140|141|142|143|144|145|146|147|148|149|150|151|152|153|155|156|157|158|159|177|180|181|182|183|185|186|187|188|189)+\d{8})$/;
        return reg.test(number)
    }

    //验证邮箱格式
    function checkMail(mail){
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(mail)
    }

    //回到顶部
    function goTop(dom){
        $(dom).append('<div id="Rocket"><i class="i-41yg">&#xe600;</i></div>')

        var visible = false,rocket = $('#Rocket')
        function onScroll(){
            var scrollTop = $(document).scrollTop();
            if(scrollTop > 0){
                if(!visible){
                    rocket.fadeIn();
                    visible = true;
                }
            }else{
                if(visible){
                    rocket.fadeOut();
                    visible = false;
                }
            }
        }
        window.onscroll = tool.buffer(onScroll, 300, this);

        rocket.click(function(){
            $('body').animate({scrollTop:0},600);
        })
    }

    exports.htmlFormat = htmlFormat;
    exports.setCookie = setCookie;
    exports.getCookie = getCookie;
    exports.delCookie = delCookie;
    exports.checkWeiXin = isWeixin;
    exports.weixinShare = weixinShare;
    exports.count = count;
    exports.showNoService = showNoService;
    exports.checkMobile = checkMobile;
    exports.checkMail = checkMail;
    exports.goTop = goTop;
});

