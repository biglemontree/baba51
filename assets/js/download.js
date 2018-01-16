define(function (require, exports, module) {

    var $ = require('jquery');
    var vue = require('vue');
    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    p.dialog();
    p.downloadBar();
    p.abacus();

    var util = require('util');

    function Download(){
        //初始化
        this.init = function(){
            hidemask()
        }
    }

    // 点击切换 mask
    function hidemask(){

        $('.showRecord').click(function(){
            $('.record').show()
            $('.record-content').show()
            
        })
        $('.record').click(function(){
            $('.record').hide()
            $('.record-content').hide()
        })
        $('.top-tab div').click(function(){
            console.log($(this))
            $(this).toggleClass('active').siblings().toggleClass('active');
        })
        

        // new vue({
        //     el:'',
        //     data:{}
        // })
    }
    //对外暴露这个对象
    module.exports = Download;
})
