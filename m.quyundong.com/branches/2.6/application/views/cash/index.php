<?php $this->display('public/header_205.php');?>
    <script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
    <link rel="stylesheet" href="/themes/cash/stylesheets/cash.css">
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main" id='main'>
      <div class="header">
        <div class="left" ><a href="javascript:history.go(-1);"><i class="icon-back"></i></a></div>
        <div class="center" id='centerTitle'>返现</div>
        <!-- <a href="/courtpool/help" class="right" style="width:80px;width:0.8rem">玩法说明</a> -->
      </div>
      <div class="body index">
        <p class="big-title">返现金额：<em><b><?=isset($cashInfo['amount']) ? $cashInfo['amount'] : '-'?></b> 元</em></p>
        <ul class='list'>
          <li><a href="/cash/takemoney"><i class='icon icon-takeMoney'></i>提现</a><i class="icon-right"></i></li>
          <li><a href="javascript:void(0);" id='transfer'><i class='icon icon-transfer'></i>转至余额</a><i class="icon-right"></i></li>
          <li><a href="/cash/record"><i class='icon icon-check'></i>查看记录</a><i class="icon-right"></i></li>
        </ul>
      </div>
    <script src="/themes/cash/js/ajaxlist.js"></script>
    <script src="/themes/cash/js/cash.js"></script>
    <script>
      $(window).on('load', function() {
        var loadInterval = setInterval(function() {
          if ($(".loading").attr("data-lock") == 1) {
             $(".loading").addClass("hide");
             $(".main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      })
    </script>
<?php $this->display('public/footer.php');?>