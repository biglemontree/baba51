define(function (require, exports, module) {

    var $ = require('jquery');

    /**
     * 购物车
     * @param util
     * @constructor
     */
    function Cart(util) {

        var cartJson = util.getCookie('cart');
        if (cartJson) {
            this.cart = JSON.parse(cartJson);
        } else {
            this.cart = [];
        }

        //初始化购买数量气泡
        showBuyNumber(this.cart);

        //new 出对象后调用的方法
        this.nowDom = function (dom) {
            this.cartEvent(dom, 1)
        }

        this.addDom = function (dom) {
            this.cartEvent(dom, 2)
        }

        this.cartEvent = function (dom, type) {

            var my = this;

            //为对象绑定事件
            $(document).on('click', dom, function () {

                var id = $(this).attr('data-id');
                var num = $(this).attr('data-periodnum');

                //验证产品id与期数是否为空，不为空则加入购物车
                if (!!id && !!num) {
                    my.add(new CartItem(id, num, 1));
                    if (type == 1) {//；立即购买，跳到确认页面
                        window.location.href = "/cart.html";
                    }else{
                        cartTip('成功加入购物车！',2000);
                        //更新购买数量气泡
                        showBuyNumber(JSON.parse(util.getCookie('cart')));
                    }
                } else {
                    alert('无法购买该产品');
                }
            });
        };

        /**
         * 往购物车加产品,如果存在已有产品，则将数量累加上去
         * @param cartItem
         */
        this.add = function (cartItem) {

            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].productId == cartItem.productId) {
                    this.cart[i].buyNum += cartItem.buyNum;
                    util.setCookie('cart', JSON.stringify(this.cart), 1);
                    return;
                }
            }

            this.cart.push(cartItem);
            util.setCookie('cart', JSON.stringify(this.cart), 1);
        }

        /**
         * 更新购物车
         * @param cartItem
         */
        this.update = function(cartItem){
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].productId == cartItem.productId) {
                    this.cart[i].periodNum = cartItem.periodNum;
                    this.cart[i].buyNum = cartItem.buyNum;
                    util.setCookie('cart', JSON.stringify(this.cart), 1);
                }
            }
        }

        /**
         * 删除某个产品
         * @param productId
         */
        this.del = function (productId) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i].productId == productId) {
                    this.cart.splice(i, 1);
                }
            }
            util.setCookie('cart',JSON.stringify(this.cart),1)
        }

        /**
         * 获取购物车里的所有产品
         * @returns {Array}
         */
        this.getItems = function () {
            return this.cart;
        }

    }

    //用于存放购物车的产品队列
    function CartItem(productId, periodNum, buyNum) {
        this.productId = productId;
        this.periodNum = periodNum;
        this.buyNum = buyNum;
    }

    //购买数量气泡
    function showBuyNumber(item){
        if (item.length>0) {
            $('.b-cart').find('i').html('<b>'+item.length+'</b>')
        }
    }

    //购物车提示
    function cartTip(text,time){
        $('.cart-tip').remove();
        $('body').append('<p class="cart-tip"><i>'+text+'</i></p>');
        $('.cart-tip').fadeIn("slow").delay(time).fadeOut("slow",function(){$(this).remove()});
    }


    //对外暴露这个对象
    module.exports = DownloadBar;
});

