seajs.config({

    // 设置路径，方便跨目录调用
    paths: {
        'js': '../js/'
        // ,'lib': '../../lib',
        ,'lib': '../lib',
        'common':'../../page/common'
    },

    // 激活 shim 插件
    plugins: ['shim'],

    // 设置别名，方便调用,路径以sea.js文件为基础的
    alias: {
        vue:"lib/vue/2.2.0/vue",
        header:'common/header.tpl',
        jquery:"jquery/1.9.0/jquery",//---
        Slider:"jquery/plug/owl.carousel.min",//---
        dragdealer:"jquery/plug/dragdealer",//---
        remodal:"jquery/plug/remodal.min",
        citySelect:"jquery/plug/jquery.cityselect",
        util: "js/public/util",//---
        public: "js/public/public",//---
        classie: "js/public/classie",
        picslider: "js/public/picslider",
        mini41YG: "js/public/41yg.mini.nav",
        xscroll: "lib/xscroll/xscroll.min",
        snapSVG: "lib/snap.svg/snap.svg.min",
        stroll: "stroll/stroll.min",
        dropload: "dropload/dropload.min",
        j:'http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js',

        WxShare: "/DemoProject/syyg-static/assets/js/public/WxShare",
        wxconfig:'http://m.41yg.com/auth/weixin/wxconfig',
        jweixin:'http://res.wx.qq.com/open/js/jweixin-1.0.0'
    },

    map:
    [
        //防止js文件夹下的文件被缓存
        //[/(.*js\/[^\/\.]*\.(?:js))(?:.*)/,'$1?_='+new Date().getTime()]
        ['wxconfig','wxconfig.js?_='+new Date().getTime()]
    ],

    charset: 'utf-8', // 文件编码

    debug:true
});