define(function (require, exports, module) {

    var $ = require('jquery');

    var Public = require('./public/public');
    var p = new Public();
    p.menu();
    p.dialog();
    p.downloadBar();
    p.abacus();

    var util = require('util');

    function Jobs(){
        //首页
        this.index = function(){
        }

        //详情页
        this.details = function(){
        }
    }

    //对外暴露这个对象
    module.exports = Jobs;
})
