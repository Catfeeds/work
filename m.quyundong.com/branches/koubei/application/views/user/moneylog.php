<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/record.css" type="text/css" rel="stylesheet">
<script type="text/javascript">window.nm_go_balance = true</script>
	<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main">
      <div class="header">
          <div class="left"><i class="icon-back" onclick="history.go(-1)"></i></div>
          <div class="center">余额记录</div>
        <div class="right"></div>
      </div>
      <div class="money mobile-qq-moneylog"><span>我的余额</span><span class="total-price">¥
              <?php
              echo !empty($balanceMoney) ? $balanceMoney : '0';
              ?>
          </span></div>
        <div class="no-msg hide">没有相关余额记录</div>
      <div class="scroll mobile-qq-moneylog">
        <div id="wrapper">
          <div id="scroller">
            <ul class="history-list"></ul>
          </div>
        </div>
      </div>
    </div>
    <div style="display: none;">
      <script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      </script>
    </div>
	<script src="/themes/qu202/js/touchScroll.js"></script>
    <script src="/themes/qu202/js/record.js?ver=20161111"></script>
<?php $this->display('public/footer_202.php');?>