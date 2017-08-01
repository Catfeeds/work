var order = {
    goodsNum:1,
    checkGoodsNum: function(value){
        if(value > order.maxNum){
            value = order.maxNum;
        }else if(value < order.minNum){
            value = order.minNum;
        }
        order.$n_input.val(value);
        order.goodsNum = value;
        order.addDisable(value);
    },
    addDisable: function(value){
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
    },
    cancelChangeNum: function(value){
        var num = $(".n_num").text();
        order.addDisable(num);
    }
};

$(window).on("load",function(){
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            if(click!=1){
                $(".main").removeClass("hide");
            }
            clearInterval(loadInterval);
        }
    }, 500);

    calTotalMoney();
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
        calTotalMoney();
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
})

//调用人次支付回调
function confirmPersonOrderPayCb(){
    var goodsId = $('#J_payGoodsId').val();
    var number = order.goodsNum;
    var actId = $('#J_payActId').val();
    var couponId = $('#coupon_id').val();
    var ticket_type = $('#ticket_type').val();
    
    $.ajax({
        url: baseUrl + '/order/Doconfirm',
        type: ajaxType,
        dataType: 'json',
        cache: false,
        data: {
           'number': number,
           'order_type': 1,
           'act_id': actId,
           'goods_ids': goodsId,
           'coupon_id':couponId,
           'ticket_type':ticket_type
        },
        success: function(res){
            if (res.code == 1) {
                var url = '/order/pay?id=' + res.data
                // window.location.replace('/order/pay?id=' + res.data);
                window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
            } else {
               showToast(res.data);
            }
        },
        error: function(res){
           showToast('网络出错，请稍后再试');
        }
    });
}

// 计算支付金额
function calTotalMoney(){
    var unitPrice = parseInt($("#unit_price").text());
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
    $("#pay_amount").text(payAmount+pfix);
}