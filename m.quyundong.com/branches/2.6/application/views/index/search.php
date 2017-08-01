<?php $this->display('public/header201.php');?>
    <link rel="stylesheet" href="/themes/qu201/css/web2.css">
    <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
    <script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
    <script type="text/javascript" src="/themes/qu201/js/touchScroll.js"> </script>
    <script type="text/javascript" src="/themes/qu201/js/web2.js?ver=201611211630"> </script>
    <!-- <script type="text/javascript" src="/themes/qu201/js/loadMore.js"> </script> -->
  </head>
  <body data-design-width="750">
    <div class="main">
      <div class="web2-header sr-head mobile-qq-index mobile-qq-search">
        <div class="web2-headWrap">
          <div class="web2-headCity"><img src="/themes/qu201/images/web2-arrowL.png"> <a>
              <?php
              $city_name = api_CoreHelper::getCookie('city_name');
              echo !empty($city_name) ? $city_name : '广州';
              ?></a> </div>
          <form action="<?= baf_CHtml::createUrl('/index/search');?>" class="web2-form">
            <div class="web2-headSearch">
              <div class="web2-headSearch-l"> </div>
              <div class="web2-headSearch-r">搜索</div>
              <div class="web2-headSearch-c">
                <input type="text" placeholder="输入场馆名、地址、商圈" value="<?=isset($search_text)?$search_text:''?>" class="web2-searchInput">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="web2-space44"></div>
      <div class="sr-content">
        <div id="wrapper">
          <div id="scroller">
            <ul class="sr-list">
            </ul>
          </div>
        </div>
        <div class="sr-noItem hide">找不到相关的场馆哟，换个词搜搜看吧~</div>
      </div>
    </div>
<?php $this->display('public/footer.php');?>