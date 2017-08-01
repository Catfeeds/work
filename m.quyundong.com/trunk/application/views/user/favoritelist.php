<?php $this->display('public/header_202.php');?>
<link rel="stylesheet" href="/themes/qu202/css/favourite.css">
	<div id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main">
      <div class="header">
        <div onclick="history.back()" class="left"><i class="icon-back"></i></div>
        <div class="center">我的收藏</div>
        <div class="right hide"></div>
      </div>
      <div class="sr-content">
        <div id="wrapper">
          <div id="scroller">
            <ul class="sr-list borderBottom1px"></ul>
            <!-- <div id="pullUp"><span class="pullUpLabel"></span>
              <div class="hide">没有更多了...</div>
            </div> -->
          </div>
        </div>
        <div class="sr-noItem hide">你目前没有收藏的场馆哦～</div>
      </div>
    </div>
    <div class="nm-tips hide"></div>
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
<script type="text/javascript" src="/themes/qu201/js/touchScroll.js"></script>
<!-- <script type="text/javascript" src="/themes/qu202/js/loadMore.js"></script> -->
<script type="text/javascript" src="/themes/qu202/js/favourite.js?ver=20161111"></script>
<?php $this->display('public/footer_202.php');?>