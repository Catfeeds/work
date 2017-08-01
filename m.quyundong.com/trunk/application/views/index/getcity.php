<?php $this->display('public/header201.php'); ?>
    <script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
    <script type="text/javascript">
    var utmSource = '<?php echo UTM_SOURCE; //来源?>';
    </script>
    <script>
    var cityData = <?php echo !empty($data) ? json_encode($data) : '{}'; ?>;
    /*
      var cityData = {
        hot: [
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
        ],
        list: [
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "广州", pinyin: "guangzhou", id: 76, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
          { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
          { name: "深圳", pinyin: "shenzhen", id: 80, },
          { name: "深圳", pinyin: "shenzhen", id: 80, },
          { name: "深圳", pinyin: "shenzhen", id: 80, },
          { name: "深圳", pinyin: "shenzhen", id: 80, },
          { name: "深圳", pinyin: "shenzhen", id: 80, },
          { name: "深圳", pinyin: "shenzhen", id: 80, },
          { name: "安庆", pinyin: "anqing", id: 1, },
          { name: "安庆", pinyin: "anqing", id: 1, },
          { name: "安庆", pinyin: "anqing", id: 1, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "佛山", pinyin: "foshan", id: 4, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
          { name: "蚌埠", pinyin: "bengbu", id: 2, },
        ],
      };
      */
    </script>
    <link rel="stylesheet" href="/static/2.4/city/stylesheets/city.css">
    <style>
      .body .index .GPS-city li, .body .index .hot-city li{min-width: 0.7rem;}
    </style>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main">
      <div class="header">
        <div class="back" onclick="location.href='<?= baf_CHtml::createUrl('/');?>'"> <img src="/static/2.4/city/images/back.png"></div>
        <div class="search">
          <form id="searchForm">
            <input id="searchInput" type="text" placeHolder="输入城市名或拼音">
          </form>
        </div>
        <div class="cancel hide" style='position: absolute;top: 0;right: 0;padding: 0.12rem 0.08rem;'>取消</div>
      </div>
      <div class="body">
        <div id="index" class="index">
          <div class="location-city hide"> 
            <h3>当前城市：<span></span></h3>
          </div>
          <div id="locationCity" class="GPS-city hide">
            <h4 data-city-group="local">定位城市</h4>
            <ul>
              <li class="J_selectCity"></li>
            </ul>
          </div>
          <div id="hotCity" class="hot-city"></div>
          <div id="cityList" class="city-list"></div>
        </div>
        <div id="search" class="search hide"><span></span>
          <ul></ul>
          <div class="none hide" style="padding:1rem;"><img src="/static/2.4/city/images/none.png">
            <p>没有找到该城市...</p>
          </div>
        </div>
      </div>
    </div>
    <div id="locationSideBar" class="location-side-bar">
      <div class="location-side-bar-text"></div>
    </div>
    <script type="text/javascript">
        var cid = <?php echo !empty($data['cid']) ? $data['cid'] : 0;?>;
    </script>
    <script src="//api.map.baidu.com/api?v=2.0&amp;ak=18c8a6784a3918605e835562d6ed82c7&amp;s=1"></script>
    <script src="/static/2.4/city/js/city_new.js"></script>
    <script>
      $(window).on('load', function() {
        cities.setData(cityData);
        var loadInterval = setInterval(function() {
          if ($(".loading").attr("data-lock") == 1) {
             $(".loading").addClass("hide");
             $(".main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      })
    </script>
<?php $this->display('public/footer.php'); ?>