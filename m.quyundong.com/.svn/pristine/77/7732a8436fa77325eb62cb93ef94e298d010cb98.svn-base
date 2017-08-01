<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>球局玩法说明</title>
    <link rel="stylesheet" href="/static/appwebview/courtjoin/stylesheets/play.css">
</head>

<body data-design-width="750" data-order-id="123">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
        <div id="wxtitle" class="hide">这里有一个超棒的球局！</div>
        <div id="wximgUrl" class="hide"> </div>
        <div id="wxdesc" class="hide">场地、球友都已经准备好了，还等什么，赶快加入！</div>
        <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
        <script src="/static/js/weixinshareurl.js"></script>
    </div>
    <div class="main hide">
        <div class="play-title"><img src="/static/appwebview/courtjoin/images/title.jpg" alt=""></div>
        <div style="text-align: left;padding: 2em;"><?php echo !empty($description) ? nl2br($description) : ''?></div>
        
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
