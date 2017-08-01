<?php $this->display('public/header201.php'); ?>
  <link href="/static/wechatvip/history/stylesheets/wechat_vip_history.css" type="text/css" rel="stylesheet">
  <script src="/static/js/zeptoWithFx.min.js"></script>
  <script src="/static/js/mobileResponsive.js"></script>
  <script src="/static/wechatvip/history/js/touchScroll.js"></script>
  <script src="/static/wechatvip/history/js/history.js?ver=20161111"></script>
</head>
<body data-design-width="750" data-mobile="<?=$mobile?>">
  <div id="loading" data-lock="0" class="loading">
    <div class="loading-icon"></div>
  </div>
  <div class="main">
    <div class="header">
      <?php if (isset($login) && $login == 'wxuc') {
      } else {
        ?>
        <div onclick="window.history.back(-1);" class="left"><i class="icon-back"></i></div>
        <?php
      }
      ?>
      <div class="center">会员卡记录</div>
      <div class="right hide"> </div>
    </div>
    <?php if ($mark == false) { ?>
      <div class="no-msg">找不到相关场馆会员卡</div>
    <?php } else { ?>
    <div class="money"><span>会员卡余额</span><span class="total-price">¥<?=$balance?></span></div>
    <div class="no-msg hide">查询不到相关记录</div>
    <div class="scroll">
      <div id="wrapper">
        <div id="scroller">
          <ul class="history-list borderBottom1px">
          </ul>
         <!--  <div id="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>
            <div class="hide">没有更多了...</div>
          </div> -->
        </div>
      </div>
    </div>
  <div class="nm-tips hide"></div>
    <?php } ?>
  </div>
<?php $this->display('public/footer.php'); ?>