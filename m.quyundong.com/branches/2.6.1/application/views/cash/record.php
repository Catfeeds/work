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
        <div class="center">查看记录</div>
      </div>
      <div class="body check">
        <ul class="list" id='list'>
          <!-- <li><div class="inner"><div class="msg">红包返现</div><div class="time">2017年1月12日 08:20</div><div class="count orange">+80</div></div></li>
          <li><div class="inner"><div class="msg">红包返现</div><div class="time">2017年1月12日 08:20</div><div class="count orange">+80</div></div></li>
          <li><div class="inner"><div class="msg">红包返现</div><div class="time">2017年1月12日 08:20</div><div class="count orange">+80</div></div></li>
          <li><div class="inner"><div class="msg">红包返现</div><div class="time">2017年1月12日 08:20</div><div class="count orange">+80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li>
          <li><div class="inner"><div class="msg">提现</div><div class="time">2017年1月12日 08:20</div><div class="count">-80</div></div></li> -->
        </ul>
        <p class="tips hide" id='_loading'>加载中</p>
        <p class="tips hide" id='nomore'>没有更多了</p>
      </div>
    <script src="/themes/cash/js/ajaxlist.js"></script>
    <script src="/themes/cash/js/check.js?v=1.0"></script>
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