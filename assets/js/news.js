define(function (require, exports, module) {

    var $ = require('jquery');

    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    p.dialog();
    p.downloadBar();
    p.abacus();

    var util = require('util');

    function News(){
        //新闻首页
        this.index = function(){
        }

        //详情页
        this.details = function(){
        }

        //首页
        this.noticeIndex = function(){
        }

        //详情页
        this.noticeDetails = function(){
        }
    }

    //对外暴露这个对象
    module.exports = News;
})
