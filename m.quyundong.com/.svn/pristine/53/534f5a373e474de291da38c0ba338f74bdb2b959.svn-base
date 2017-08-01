<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>投保规则</title>
    <link rel="stylesheet" href="/static/appwebview/insurance/stylesheets/insurancedes.css">
</head>

<body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <div class="ins-step">
            <div class="ins-title"><span>保险购买流程</span></div>
            <ul>
                <li>
                    <div>1 队长购买保险</div>
                </li>
                <li>
                    <div>2 分享给队友填写保险资料</div>
                </li>
                <li>
                    <div>3 填写后立即投保
                        <br/>&nbsp;&nbsp;&nbsp;短信收到电子保单</div>
                </li>
            </ul>
        </div>
        <div class="ins-rule">
            <div class="ins-title"><span>投保规则</span></div>
            <ul>
                <li>1.本保险由互联网保险平台小雨伞提供，中国平安承保，趣运动对投保后续事宜，概不负责。</li>
                <li>2.距订场开始前1天之前预订场地，才能购买运动保险。</li>
                <li>3.投保有年龄限制，满16岁以上至65岁均可投保。</li>
                <li>4.保险购买后，将在开赛前1天投保，球员必须在此之前领取并提交投保信息。投保成功后会收到来自小雨伞短信发送的保单号和理赔渠道。</li>
                <li>5.保险期间为用户订场订单的时间范围，该时间范围为连续时间段，如订单中有数个不连续的时间段，则保险期间为第一个连续时间段。</li>
                <li>6.未领取的保险份额，该部分的支付保费将退还至趣运动余额。</li>
                <li>7.投保前如订单改期或取消，保险将失效，并退还支付的保费。</li>
                <li>8.投保后如订单改期或取消，保险不受影响，不退还保费。</li>
                <li>9.如有保险咨询或申请理赔，请联系小雨伞客服，联系电话400-960-9980。</li>
            </ul>
        </div>
        <div class="ins-plan">
            <div class="ins-title"><span>保险方案</span></div>
            <div class="status-info">
                <div class="status-title">运动意外险无忧档</div>
                <table class="status-table">
                    <tr>
                        <td>保费（元）</td>
                        <td>意外医疗（元）</td>
                        <td>突发急性病身故（元）</td>
                        <td>意外医疗（元）</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1000</td>
                        <td>1000</td>
                        <td>2000</td>
                    </tr>
                </table>
            </div>
        </div>
        <div onclick='location.href = "/insurance/insurancelaw"' class="ins-insInfo">保险内容及告知》</div>
    </div>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script>
    window.onload = function() {
        var loadInterval = setInterval(function() {
            if ($(".loading").attr("data-lock") == 1) {
                $(".loading").addClass("hide");
                $(".main").removeClass("hide");
                clearInterval(loadInterval);
            }
        }, 500);
    }
    </script>
</body>

</html>
