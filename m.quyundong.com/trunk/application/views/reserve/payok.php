<?php $this->display('public/header_205.php');?>
    <link href="/themes/reserve/tips.css" type="text/css" rel="stylesheet">
    <script src="/static/js/mobileResponsive.js"></script>
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <div class="header">
            <div onclick="window.history.back()" class="left hide"><i class="icon-back"></i></div>
            <div class="center">订场提示</div>
            <div class="right"></div>
        </div>
        <div class="body">
            <div class="pic"><img src="/themes/reserve/images/success.png"></div>
            <h2>支付成功</h2>
            <ul>
                <li>场馆：</li>
                <li><?php if (isset($order['name'])){echo $order['name'];} ?></li>
            </ul>
            <ul>
                <li>项目：</li>
                <li><?php if (isset($order['category_name'])){echo $order['category_name'];} ?></li>
            </ul>
            <ul>
                <li>日期：</li>
                <li><?php if (isset($order['goods_list'][0]['book_date'])){echo $order['goods_list'][0]['book_date'];} ?></li>
            </ul>
            <ul>
                <li>场次：</li>
                <?php 
                	foreach($order['goods_list'] AS $v){
                		echo '<li>'.date('H:i',$v['start_time']).'-'.date('H:i',$v['end_time'])." &nbsp;".$v['course_name'].'</li>';
                	}
                ?>
            </ul>
            <p>凭预定手机后4位验证码开场</p>
            <!-- <div class="tips">更多场地预订尽在趣运动，价格更优惠</div>-->
            <div>
                <div class="payok-download" style="z-index:99999999;position: fixed;bottom: 0;left: 50%;width: 100%;max-width: 3.75rem;-webkit-transform: translateX(-50%);transform: translateX(-50%);font-size: 0;">
                    <a target="_blank" href="http://www.quyundong.com/d/"><img src="/themes/reserve/images/download_app.png" alt=""></a><span style='position: absolute;top: 0;right: 0;width: 15%;height: 40%;' onclick='this.parentNode.style.display="none"'></span>
                </div>
                <script>
                $(document).ready(function() {
                    if (getCookie('app_flag') == '1' || getCookie('app_flag') == '2') {
                        $('.payok-download').addClass('hide')
                    }

                    function getCookie(name) {
                        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                        if (arr = document.cookie.match(reg))
                            return unescape(arr[2]);
                        else
                            return null;
                    }
                    // $('.button').click(function() {
                    //     if (_hmt) {
                    //         _hmt.push(['_trackEvent', 'H5预留', '继续订场', 'H5-预留-继续订场'])
                    //     }
                    // })
                    $('.payok-download a').click(function() {
                        if (_hmt) {
                            _hmt.push(['_trackEvent', 'H5预留', '趣运动下载', 'H5-预留-趣运动下载'])
                        }
                    })
                })
                </script>
            </div>
        </div>
    </div>
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
<?php $this->display('public/footer.php');?>
