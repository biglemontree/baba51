define(function (require, exports, module) {

    function WeixinShare(){
        this.init = function(){
            var wx = require('jweixin');

            var config = require('wxconfig');
            config.initWxConfig();

            setShareMethod(wx);
        }
    }

    function setShareMethod(wx){

        wx.ready(function () {

            var smy = {
                title:document.getElementById('wxTitle').value,   // 分享标题
                desc:document.getElementById('wxDesc').value,    // 分享描述
                link:document.getElementById('wxLink').value,    // 分享链接
                imgUrl:document.getElementById('wxImg').value   // 分享图标
            }


            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: smy.title, // 分享标题
                link: smy.link, // 分享链接
                imgUrl: smy.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享到朋友圈
            wx.onMenuShareAppMessage({
                title: smy.title, // 分享标题
                desc: smy.desc, // 分享描述
                link: smy.link, // 分享链接
                imgUrl: smy.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享到QQ
            wx.onMenuShareQQ({
                title: smy.title, // 分享标题
                desc: smy.desc, // 分享描述
                link: smy.link, // 分享链接
                imgUrl: smy.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享到腾讯微博
            wx.onMenuShareWeibo({
                title: smy.title, // 分享标题
                desc: smy.desc, // 分享描述
                link: smy.link, // 分享链接
                imgUrl: smy.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享到QQ空间
            wx.onMenuShareQZone({
                title: smy.title, // 分享标题
                desc: smy.desc, // 分享描述
                link: smy.link, // 分享链接
                imgUrl: smy.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });

        wx.error(function(res){
            console.log(res,'调用失败了')
        });
    }

    //对外暴露这个对象
    module.exports = WeixinShare;
});

