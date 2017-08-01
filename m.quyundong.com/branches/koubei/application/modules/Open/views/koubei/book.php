<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link href="/themes/koubei/court/book/stylesheets/book.css" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/koubei/js/touchScroll.js"></script>
    <script src="/themes/koubei/court/book/js/courtBook.js"></script>
    <script src="/themes/koubei/person/index/js/index.js"></script>
    <script src="/themes/koubei/court/book/js/book.js"></script>
    <script src="/static/js/alipayJSBridge.js"></script>
    <script>
    var minHour = <?php echo isset($bookData['min_hour']) ? $bookData['min_hour'] : 1;?>;//最小起订时间
    </script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div data-due="0" class="main hide">
      <div class="book-date">
        <div class="data-change"><img src="/themes/koubei/court/book/images/arrow.png" alt=""></div>
        <div class="date-wrap">
          <ul>
            <?php
              if(!empty($bookData['date_list']) && is_array($bookData['date_list'])){
                  foreach ($bookData['date_list'] as $k => $v) {
              ?>
              <a href="<?php echo 'book?id='.$venuesId.'&t='.$v.'&cid='.$catId;?>">              
              <li <?php if($dateTime==$v) echo ' class="active"';?>>
                <p><?php echo date('m-d', $v);?></p>
                <p><?php echo api_CoreHelper::getDateTips($v);?></p>
              </li></a>
              <?php }} ?>
          </ul>
        </div>
      </div>
      
      <div class="book-container">
        <div class="book-area">
          <ul>
            <?php
            $allCourse_name = '';
            foreach ($bookData['goods_list'] as $value) {
              $allCourse_name .= $value['course_name'].',';
            ?>
            <li><?php echo $value['course_name'] ?></li>
            <?php }?>
          </ul>
        </div>
        <div class="book-time">
          <ul>
          <?php 
            if(!empty($bookData['hour_list']) && is_array($bookData['hour_list'])){
              foreach ($bookData['hour_list'] as $k => $v) {
                $time = explode(':', $v);
                $h = isset($time[0]) ? $time[0] : 0;
                $m = isset($time[1]) ? $time[1] : '';
                if($h<10) $h = '0'.$h;
           ?>
            <li> <span><?php echo $h;?></span><span>:<?php echo $m;?></span><span></span></li>
            <?php }
             $h+=1; 
            ?>
            <li> <span><?php echo $h;?></span><span>:<?php echo $m;?></span><span></span></li>
            <?php }?>
          </ul>
        </div>
        <div id="wrapper">
          <div id="scroller">
            <div class="book-list">
            <?php 
            if(!empty($bookData['goods_list']) && is_array($bookData['goods_list'])){
                foreach ($bookData['goods_list'] as $k => $v) {
             ?>
              <ul> 
                <?php 
                  if(!empty($v['items']) && is_array($v['items'])){
                    foreach ($v['items'] as $goodsItem) {
                      $status = '2';
                      $price = 0;
                      $hour = '9';
                      $realHour = '';
                      $realEndHour = '';
                      $goods_id = '0';
                      $goodsInfo = explode(',', $goodsItem);
                      if (!empty($goodsItem)) {
                          $hours = explode(',', $goodsItem);
                          $goods_id = $hours[0];
                          $realTime = explode(':', $hours[1]);
                          $hour = $realTime[0];
                          $realHour = $hours[1];
                          $realEndHour = ($hour + 1) . ':' . $realTime[1];
                          $price = $hours[2];
                          $status = $hours[3];
                      }
                      if ($status == '0') {
                          $class = 'available';
                      } else {
                          $class = 'disable';
                      }
                      $group_ids = '';
                      if (!empty($v['group_list'])) {
                          foreach ($v['group_list'] AS $gv) {
                              $group_hours = explode(",", $gv['goods_ids']);
                              if (in_array($goods_id, $group_hours)) {
                                  $group_ids = $gv['goods_ids'];
                                  break;
                              }
                          }
                      }
                 ?>
                <li goodsid="<?php echo $goods_id?>" price="<?php echo $price;?>" content="<?php echo $realHour . '-' . $realEndHour . ' ' . $v['course_name'] ?>" course_content="<?php echo $v['course_name'] . ',' . $hour . ',' . $price . ',' . $realHour . '-' . $realEndHour ?>" id="block_<?php echo $goods_id ?>" group_ids="<?php echo $group_ids ?>" class="<?php echo $class ?>">￥<em><?php echo $price;?></em></li>
                <?php }} ?>
              </ul>
              <?php }}?>
            </div>
          </div>
        </div>
      </div>
      <div class="book-order">
        <ul class="book-tip">
          <li>
            <div></div>
            <div>可预订</div>
          </li>
          <li>
            <div></div>
            <div>已售完</div>
          </li>
          <li>
            <div></div>
            <div>我的预订</div>
          </li>
        </ul>
        <ul class="book-orderinfo hide">
        </ul>
        <div class="book-submit J_submit">
          <div>请选择场地</div>
          <?php
            if (!empty($last_act)) {
                ?>
                <div><?php echo $last_act ?></div>
                <?php }?>
        </div>
      </div>
      <div class="common-quyundongtips">服务由趣运动提供</div>
      <div class="common-quyundongtipsSpace"></div>
    </div>
    <div class="book-headTip">Tips： 本场预订以两小时为单位，请尽量保持场次连续。</div>
    <div style="display:none!important;" class="book-noPaySprite">
        <?php
        if (isset($due_data) && !empty($due_data) && isset($due_data['order']['order_status']) && $due_data['order']['order_status'] == 0 && $due_data['count'] > 0) {
        ?>
      <ul>
        <li>您尚有未支付的订单</li>
        <li> 
          <p><?php echo $due_data['order']['name']?></p>
          <?php
                if ($due_data['order']['order_type'] == 0 || $due_data['order']['order_type'] == 3) { ?>
          <p><span>日期：</span><span><?php
                            echo date('Y年m月d日', $due_data['time']);
                            $p = date('w', ($due_data['time']));
                            echo '(周' . $weekarray[$p] . ')';
                            ?></span></p>
          <p><span>场地：</span>
          <span>
          <?php foreach ($due_data['order']['goods_list'] as $value) { ?>
              <em><?php
                  echo date('H:i', $value['start_time']) . '-';
                  echo date('H:i', $value['end_time']) . '&nbsp;&nbsp;';
                  echo $value['course_name'] . '&nbsp;&nbsp;';
                  if($due_data['order']['order_type']!=3) echo $value['shop_price'].'元';
                  ?>
              </em>
          <?php } ?>
          </span>
          </p>
          <p><span>共计：</span><span><?php echo $due_data['order']['order_amount'].'元' ?></span></p>
          <?php
            } else if ($due_data['order']['order_type'] == 1) { ?>
                <p><span>套餐：</span>
                <span>
                <?= $due_data['order']['goods_list'][0]['goods_name'] ?>
                </span>
            </p>
                <p><span>数量：</span>
                <span>
                <?= $due_data['order']['goods_list'][0]['goods_number'] ?>
                </span>
                </p>
                <p><span>总计：</span>
                    <span><?= $due_data['order']['order_amount'].'元' ?></span></p>
                <?php
            }
            ?>
        </li>
        <li>
          <div id="book-Cancel" order_id="<?=$due_data['order']['order_id']?>">取消订单</div>
          <a id="book-href" order_id="<?=$due_data['order']['order_id']?>"  data-href="/order/pay?id=<?=$due_data['order']['order_id']?>">
          <div id="book-pay">立即支付</div>
          </a>
        </li>
      </ul>
      <?php }?>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg"></div>
      </div>
    </div>
    <div id="modalContent" style="display:none;">
      <form action="confirmOrder" method="GET" class="J_payConfirm">
        <div class="court-tips">
          <ul></ul>
          <input type="hidden" name="allcourse_name" value="<?php echo isset($allCourse_name)?$allCourse_name:''?>">
          <input value="" class="J_goodsIds" name="goods_ids"/>
          <input type="hidden" id="book_date" value="<?php echo $dateTime; ?>" name="book_date"/>
          <input type="hidden" value="<?php if (isset($bookData['name'])) {
              echo $bookData['name'];
          } ?>" name="court_name"/>
          <input type="hidden" value="<?php if (isset($bookData['category_name'])) {
              echo $bookData['category_name'];
          } ?>" name="category_name"/>
          <input type="hidden" value="<?php echo isset($venuesId) ? $venuesId : ''; ?>" name="bid"/>
          <input type="hidden" value="<?php echo isset($catId) ? $catId : '' ?>" name="cid"/>
          <input type="hidden" value="<?php echo isset($bookData['order_type']) ? $bookData['order_type'] : '' ?>" name="order_type"/>          
        </div>
      </form>
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
  </body>
</html>