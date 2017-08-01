var order = {
    goodsNum:1,
};
var submitLock = false;

$(window).on("load",function(){
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide").css("background-color","transparent");
            if(click!=1){
                $(".main").removeClass("hide");
            }
            clearInterval(loadInterval);
        }
    }, 500);

    order.calTotalMoney();

    // 数量选择
    order.$n_input = $("#n_input");
    order.minNum = parseInt(order.$n_input.attr("min"));
    order.maxNum = parseInt(order.$n_input.attr("max"));
    $(".cop-numContainer").on("click",".quantity-component",function(){
        if(order.maxNum>1){
            $(".quantity").removeClass("hide");
            order.$n_input.val($(".n_num").text());
            order.previousVal = $(".n_num").text();
        }
    })

    $(".quantity-cancel").click(function(){
        $(".quantity").addClass("hide");
        order.cancelChangeNum(order.$n_input.val());
    })

    $(".quantity-sure").click(function(){
        $(".quantity").addClass("hide");
        $(".n_num").text(order.goodsNum);
        order.calTotalMoney();
    })

    $(".quantity").click(function(e){
        if (e.target == this) {
            $(".quantity").addClass("hide");
            order.cancelChangeNum(order.$n_input.val());
        }
    })

    
    $(".quantity").on("click","#n_minus,#n_plus",function(){
        var _this = $(this);
        var value = parseInt(order.$n_input.val()) || 1;
        var operate = parseInt(_this.attr("data-value"));
        if(_this.hasClass('disable')) return;
        value += operate;
        order.previousVal = value;
        order.checkGoodsNum(value);
    })

    $("#n_input").on("input",function(){
        var va = order.$n_input.val();
        if(/^[0-9]*$/g.test(va)){
            order.previousVal = va;
            order.$n_input.val(va);
        }else{
            order.$n_input.val(order.previousVal);
        }
        if(order.previousVal){
            order.checkGoodsNum(order.previousVal);
        }
    })

    $("#n_input").on("blur",function(){
        var _this = $(this);
        if(!_this.val()){
            order.$n_input.val(order.goodsNum);
        }
    })

    // 提交订单
    $('#orderSubmit').on('click', function(){
        if(submitLock) return;
        submitLock = true;
        $("#loading").removeClass('hide');

        var goodsId = $('#J_payGoodsId').val();
        var number = order.goodsNum;
        var actId = $('#J_payActId').val();
        var couponId = $('#coupon_id').val();
        
        // 添加订单
        addOrder(goodsId, number, actId, couponId);
    });

    function addOrder(goodsId, number, actId, couponId){
        ajaxCheckNopayOrder(callback);
        function callback(){
            // 显示加载等待
            // var load = $.dialog({
            //     content : getLoadImg(),
            //     title : null,
            //     lock: false
            // });
            var ticket_type = $('#ticket_type').val();
            var postData = {
                   'number': number,
                   'order_type': 1,
                   'act_id': actId,
                   'goods_ids': goodsId,
                   'coupon_id':couponId,
                   'ticket_type':ticket_type
                }
                postData = typeof objMerge == 'function' ? objMerge(postData) : postData
            $.ajax({
                url: '/order/Doconfirm',
                type: 'post',
                dataType: 'json',
                cache: false,
                data: postData,
                success: function(res){
                    // load.close(); // 关闭加载等待
                    if (res.code == 1) {
                        var url = '/order/pay?id=' + res.data
                        // window.location.replace('/order/pay?id=' + res.data);
                        window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
                    } else {
                       submitLock = false;
                       $("#loading").addClass('hide'); 
                       showToast(res.data);
                    }
                },
                error: function(res){
                    submitLock = false;
                    $("#loading").addClass('hide');
                   // load.close(); // 关闭加载等待
                   showToast('网络出错，请稍后再试');
                }
            });
        }
    }
})

// 计算商品数量
order.checkGoodsNum = function(value){
    if(value > order.maxNum){
        value = order.maxNum;
    }else if(value < order.minNum){
        value = order.minNum;
    }
    order.$n_input.val(value);
    order.goodsNum = value;
    order.addDisable(value);
}

order.addDisable = function(value){
    if(value == order.minNum){
        $(".n_minus").addClass("disable");
    }else{
        $(".n_minus").removeClass("disable");
    }
    if(value == order.maxNum){
        $(".n_plus").addClass("disable");
    }else{
        $(".n_plus").removeClass("disable");
    }
}

order.cancelChangeNum = function(value){
    var num = $(".n_num").text();
    order.addDisable(num);
}

// 计算价钱
order.calTotalMoney = function(){
    var unitPrice = $("#unit_price").text();
    var num = order.goodsNum;
    var totalAmount = unitPrice * num;
    var payAmount = totalAmount;

    var actId = $('#J_payActId').val();
    var priceChange = 0;
    var pfix = '元';
    if(actId>0){
        priceChange = $('#J_payActId').attr('amount');      
    }else{
        var couponId = $('#coupon_id').val();
        if(couponId>0){
            priceChange = $('#coupon_id').attr('amount');   
        }
    }
    payAmount = priceChange > 0 ? Math.max(totalAmount - priceChange, 0) : payAmount;
    payAmount = Math.round(payAmount*100)/100;

    $("#totalMoney").text(totalAmount+pfix);
    $("#payMoney").text(payAmount+pfix);
}
/**
 * 获取优惠活动列表并设置默认活动
 *
 * @param integer goodsId 商品id
 * @param integer num     商品数量
 * @return void
 * @author xiaosibo
 */
function getActivityList(goodsId, num)
{
    var postData = {
            'number': num,
            'type': 1,
            'goods_ids': goodsId
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/order/confirmOrder',
        type: 'get',
        dataType: 'json',
        cache: false,
        data: postData,
        success: function(res){
            if(res.code == 1){
                var actList = res.data.activity_list; // 活动列表
                var defaultActId = res.data.act_id; // 默认选中的活动id
                var actLength = actList.length; // 活动总数

                if (defaultActId > 0 && actLength > 0) {
                    var defaultAct = {}; // 默认活动
                    $('.preference ul').empty(); // 清空所以活动
                    for (var i = 0; i < actLength; i++) {
                        // 只显示可用的活动
                        if (actList[i].status == 1) {
                            // 默认活动
                            if (actList[i].act_id == defaultActId) {
                                defaultAct = actList[i];
                            }
                            var _li = '';
                            _li += '<li id="actitem_' + actList[i].act_id + '" data_id="' + actList[i].act_id + '" data_amount="'+ actList[i].act_amount + '">';
                            _li += '<label for="preference'+ actList[i].act_id + '"><span>' + actList[i].act_name + '</span>';
                            _li += '<input id="preference'+ actList[i].act_id + '" type="radio" name="preference" ' + ((actList[i].act_id == defaultActId) ? 'checked': '') + '><em></em>';
                            _li += '</label></li>';

                            $('.preference ul').append(_li);
                        }
                    }

                    // 设置默认优惠活动
                    setActivity(defaultActId, defaultAct.act_name, defaultAct.act_amount);
                    $('#getPreference').show();
                } else {
                    // 清除优惠活动信息
                    setActivity(0, '', 0);
                    $('#getPreference').hide();
                }
            }else{
                alert(res.msg);
            }
        },
        error: function(res){
            load.close(); // 关闭加载等待
            alert('网络出错，请稍后再试');
        }
    });
}

/**
 * 设置优惠活动并修改对应的价格
 *
 * @param integer id     活动id
 * @param string  name   活动名称
 * @param float   amount 活动优惠的金额
 * @return void
 * @author xiaosibo
 */
function setActivity(id, name, amount)
{
    $('#act_name').text(name).show();
    $('#act_price').text(amount + '元').show();
    $('#act_price').siblings('.btn').hide();
    $('#J_payActId').val(id);
    $('#J_payActId').attr('amount', amount);
    $('#activityContainer em').text(name);
    $('#activityOA').text(amount+'元');
    // 计算订单总金额
    //calculateOrderAmount();
    // resetCoupon();
    order.calTotalMoney();
}
