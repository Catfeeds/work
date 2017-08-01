<!DOCTYPE html>
<html>
  <head>
  <?php $this->display('public/title.php'); ?>
    <link rel="stylesheet" href="/static/amap/stylesheets/nm_amap_new.css">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <?php 
    if(CHANNEL_SOURCE=='qqwallet'){
     ?>    
    <link href="/themes/qq/stylesheets/mobile-qq.css" type="text/css" rel="stylesheet"> 
    <script type="text/javascript" src="//open.mobile.qq.com/sdk/qqapi.js?_bid=152"></script>
    <script type="text/javascript" src="/themes/qq/js/mobile-qq-menu.js?ver=20161111"></script>
    <?php } ?>

    <script type="text/javascript" src="//webapi.amap.com/maps?v=1.3&amp;key=d08ae638af64e3dbf98ea537f3e2a3b5"></script>    
    <script>

      var stopData = [
        <?php
            if(count($mapInfo['parkInfo'])>0){
            foreach($mapInfo['parkInfo'] as $k=>$value){
          ?>
        {
          stopName: "<?=$value['name']?>",
          stopAddress: "<?=$value['address']?>",
          stopLnglat: ["<?=$value['longitude']?>", "<?=$value['latitude']?>"]
        },
      <?php }}?>
      ];

      var venueData = {
        <?php if( count($mapInfo['venuesInfo'])>0){?>
        vName: "<?=$mapInfo['venuesInfo']['name']?>",
        vAddress: "<?=$mapInfo['venuesInfo']['address']?>",
        vLnglat: ["<?=$mapInfo['venuesInfo']['longitude']?>", "<?=$mapInfo['venuesInfo']['latitude']?>"]
        <?php } ?>
      }
    </script>
  </head>
  <body data-design-width="750" data-amap-key="d08ae638af64e3dbf98ea537f3e2a3b5">
    <div id="loading" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header"><a class="left"> <i class="icon-back"></i></a>
        <div class="center">地图详情</div>
        <div class="right"></div>
      </div>
      <div id="container" class="container"></div>
      <div class="footer">
        <div class="venue">
          <div class="f-left"><i><img src="/static/amap/images/v-location.png"></i></div>
          <div class="f-center"><span></span></div>
          <div class="f-right"><a>查看路线</a></div>
        </div>
        <div class="stop hide">
          <div class="circle-bar"></div>
        </div>
      </div>
    </div>
    
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/amap/js/h5amap_new.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function () {
      if(map){
          var c = map.getCenter()
          var lat = c.lat
          var lng = c.lng
          c.lat += 0.01
          c.lng += 0.01
          map.setCenter([c.lng,c.lat])
          setTimeout(function(){
            map.setCenter([lng,lat])
          },500)
        }
    })
    </script>
  </body>
</html>