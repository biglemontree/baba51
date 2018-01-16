define(function (require, exports, module) {

    var $ = require('jquery');
    var util = require('util');

    require("dropload")($);
    require('./../lib/dropload/dropload.css');

    var syyg = {
        //商品晒单的item
        //{userId:,head:,name:,time:,productId:,periodNum:,img:,title:,content}
        'shareOrderItem':'<li class="s-o-item"><div class="s-o-i-user"><a href="/user/:userId/home.html"><p class="head"><img src=":head" alt=":name"/></p><p class="name blue">:name</p></a><span>:time</span></div><a href="/shareorder/:productId/:periodNum.html"><div class="s-o-i-img"><img src="/file/:img/800_800"></div><dl><dt>:title</dt><dd>:content</dd></dl></a></li>',

        //提交晒单 商品展示
        //{productID:,number:,name:,price:,code:,openTime:,img:}
        'getProduct':'<h6><a href="/products/:productID/:number.html">(第:number期):name</a></h6><p class="c999">价值：￥:price</p><p class="c999">幸运云购码：:code</p><p class="c999">揭晓时间：:openTime</p><a href="/products/:productID/:number.html" class="h-pic"><img src="/file/:img/200_200" alt=":name"></a>',

        //晒单详情
        //creatTime,title,:imgs,content,userId,:head,userName,PId,PNum,PTitel,buyTotal,code,openTime
        'shareOrderDetails':'<div class="s-o-b-details c333"><div class="title"><span class="fs12">:creatTime</span><h2>:title</h2></div><div class="show">:imgs<p>:content</p></div><div class="s-o-i-user"><a href="/user/:userId/home.html"><p class="head"><img src=":head"alt=":userName"></p><p class="name">:userName</p></a><span>:creatTime</span></div><a href="/products/:PId/:PNum.html"><div class="s-o-b-info bgF7 fs12 c999"><p>获得商品：(第:PNum期):PTitel</p><p>本期参与：<em class="sy">:buyTotal</em>人次</p><p>幸运云购码：<em class="sy">:code</em></p><p>揭晓时间：:openTime</p></div></a></div>',
        'images':'<img src="/file/:img/800_800" alt="肆意云购晒单">'
    }

    function Share(){

        //晒单首页
        this.index = function(){
            initIndex()
        }

        //提交晒单
        this.edit = function(){
            initEdit()
        }

        //晒单详情
        this.details = function(){
            initDetails()
        }
    }

    function initIndex(){
        $('.share-orders-box').dropload({
            scrollArea : window,
            loadDownFn : function(me){
                var _number = parseInt($('#ul_list').attr('data-page')) + 1;
                $.ajax({
                    type: 'GET',
                    url: '/shareorder/list.json',
                    dataType: 'json',
                    data : {
                        pageNo : _number,
                        pageSize : 20
                    },
                    success: function (result){
                        if(result.retCode=='000000'){
                            var o = result,html='';
                            if(o.list.length>0){
                                for(var i=0;i<o.list.length;i++){
                                    html+= util.htmlFormat(syyg.shareOrderItem,{
                                        userId: o.list[i].user.id,
                                        head:util.checkHead(o.list[i].user.head),
                                        name:o.list[i].user.username,
                                        time:o.list[i].createtime,
                                        productId:o.list[i].period.product.id,
                                        periodNum:o.list[i].period.periodNum,
                                        img:o.list[i].images[0],
                                        title: o.list[i].title,
                                        content:o.list[i].content
                                    })
                                }
                                $('#ul_list').append(html);
                                $('#ul_list').attr('data-page',_number);
                                if(_number==1&&o.list.length<4){
                                    // 锁定
                                    me.lock();
                                    // 无数据
                                    me.noData();
                                }
                                me.resetload();

                            }else{
                                // 锁定
                                me.lock();
                                // 无数据
                                me.noData();
                                me.resetload();
                            }
                        }else{
                            alert('请求数据出错!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    },
                    error: function(xhr, type){
                        $('.product-box').html(util.showNoService);
                    }
                });
            }
        });
    }

    function initEdit(){
        var productID = $('#productID').val(),
            periodNum = $('#periodNum').val();
        //展示获得的商品
        $.ajax({
            url: '/products/'+productID+'/'+periodNum+'.json',
            dataType: 'json',
            success: function (result){
                if(result.retCode=='000000'){
                    var o = result;

                    $('.suc-about').html(util.htmlFormat(syyg.getProduct,{
                        productID: o.product.id,
                        number: o.periodNum,
                        name:o.product.name,
                        price:o.total,
                        code:o.winningCode,
                        openTime:o.opentime,
                        img:o.product.imgs[0]
                    }))
                }else{
                    alert(result.msg)
                }
            },
            error : function(e){
                if (e.status == '404') {
                    alert('您访问的产品不存在！');
                    //window.location.href = '/user/index.html'
                };
                console.log("error",e);
            }
        });

        $('#shareImgs').change(function(){
            var total = $(this).get(0).files.length,text="";
            if(total==0){
                text = '请选择晒单的图片';
            }else{
                text = '共 '+total+' 张图片';
            }
            $('.images-file-btn').text(text);
            
        });

        $('.share-order-btn').click(function(){
            var _t = $('#shareTitle').val(),
                _c = $('#shareContent').val(),
                _i = $('#shareImgs').val(),
                check = false;

            (!_t)?alert('您忘记填写分享的标题啦！'):(!_c)?alert('您忘记填写分享的内容啦！'):(!_i)?alert('您还没上传晒单的图片呢。'):check=true;

            if(check){
                $('#shareOrderForm').submit();
            }

        })
    }

    function initDetails(){
        var _id = $('#productId').val(),
            _num = $('#periodNum').val(),
            _box = $('.share-orders-box');
        $.ajax({
            type: 'POST',
            url: '/shareorder/list.json',
            dataType: 'json',
            data : {
                productId:_id,
                periodNum:_num
            },
            success: function (result){
                if(result.retCode=='000000'){
                    var o = result.list[0],imgs = '';
                    for(var i=0;i< o.images.length;i++){
                        imgs+= util.htmlFormat(syyg.images,{
                            img:o.images[i]
                        })
                    }
                    _box.html(util.htmlFormat(syyg.shareOrderDetails,{
                        creatTime: o.createtime,
                        title: o.title,
                        imgs:imgs,
                        content: o.content,
                        userId: o.user.id,
                        head: util.checkHead(o.user.head),
                        userName: o.user.username,
                        PId:_id,
                        PNum:_num,
                        PTitel: o.period.product.name,
                        buyTotal:util.count(o.period.userBuyCode),
                        code:o.period.winningCode,
                        openTime:o.period.opentime
                    }))
                }else{
                    alert(result.msg)
                }
            },
            error: function(xhr, type){
                _box.html(util.showNoService());
            }
        });
    }

    //对外暴露这个对象
    module.exports = Share;

});
