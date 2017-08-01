var order = {
    max: 0,
    goodsNum: 1,
}

$(window).on("load", function() {
    calTotalMoney();

    order.max = $("#n_num").attr('max');
    order.subObj = $("#n_minus");
    order.numObj = $("#n_num");
    order.addObj = $("#n_plus");

    if(order.max <= 1){
        order.addObj.addClass('disable');
    }

    order.goodsNum = $("form[name='activity'] ul").size() || $("#n_num").text();

    $(".quantity-component").on("click", "#n_minus", function() {
        if (order.goodsNum > 1) {
            order.goodsNum--;
            clickDisable();
            $('.joinner_message.newJoin').eq(order.goodsNum-1).remove();
        }
    })

    $(".quantity-component").on("click", "#n_plus", function() {
        if (order.goodsNum < order.max) {
            order.goodsNum++;
            clickDisable();
            newJ=$('.joinner_message').eq(0).clone();
            newJ.find('input').val('');
            $('form').append(newJ.addClass('newJoin'));
        }
    })
})

function setGoodsNum(num){
    var oTemp = $("#n_num")
    if(num >= 1 && num <= parseInt(oTemp.attr('max'))){
        order.goodsNum = num;
        oTemp.text(num);
        clickDisable();
    }
}

// 计算价钱
function calTotalMoney() {
    var unitPrice = parseFloat($("#unit_price").text());
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

function clickDisable() {
    if (order.goodsNum == 1) {
        order.subObj.addClass('disable');
    } else {
        order.subObj.removeClass('disable');
    }
    if (order.goodsNum == order.max) {
        order.addObj.addClass('disable');
    } else {
        order.addObj.removeClass('disable');
    }
    order.numObj.text(order.goodsNum);
    calTotalMoney();
}
