<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link rel="stylesheet" href="/static/activity/index/stylesheets/index.css">
  </head>
  <body data-design-width="750" data-act_id='<?= isset($_GET['id']) ? $_GET['id']: 0; ?>'>
    <section id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
      <!-- 分享标题 图片 描述 -->
      <div id="wxtitle" class="hide">这里有一个超棒的球局！</div>
      <div id="wximgUrl" class="hide"> </div>
      <div id="wxdesc" class="hide">场地、球友都已经准备好了，还等什么，赶快加入！</div>
      <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
      <script src="/static/js/weixinshareurl.js"></script>
    </section>
    <section class="main hide">
      <div class="act-banner"><img src="http://img1.qydimg.com/gsimages/2015-07-30/1d05e3664fb3c159fc97b32dfd99411a.JPG"></div>
      <div class="act-count">
        <div class="l">
          <div class="t"><i class='icon icon-join'><img src='/static/activity/index/images/icon-join.png'></i>1000</div>
          <div class="b">参与人数</div>
        </div>
        <div class="c">
          <div class="t">&nbsp;</div>
          <div class="b">&nbsp;</div>
        </div>
        <div class="r">
          <div class="t"><i class='icon icon-read'><img src='/static/activity/index/images/icon-read.png'></i>4w</div>
          <div class="b">阅读次数</div>
        </div>
      </div>
      <div class="act-main">
        <div class="act-group">
          <div class="l-btn"><i class='icon-arrow'><img class='b' src='/static/activity/index/images/icon-arrow-l-b.png'><img class='d' src='/static/activity/index/images/icon-arrow-l-d.png'></i></div>
          <div class="center">
            <div class="slide-bar">
              <div class="slide-bar-item"><span>第一期</span></div>
              <div class="slide-bar-item cur"><span>第二期</span>  </div>
              <div class="slide-bar-item"><span>第三期</span>  </div>
              <div class="slide-bar-item "><span>第四期</span>  </div>
              <div class="slide-bar-item"><span>第五期</span>  </div>
              <div class="slide-bar-item"><span>第六期</span>  </div>
              <div class="slide-bar-item"><span>第七期</span>  </div>
              <div class="slide-bar-item"><span>第八期</span>  </div>
            </div>
          </div>
          <div class="r-btn"><i class='icon-arrow'><img class='b' src='/static/activity/index/images/icon-arrow-r-b.png'><img class='d' src='/static/activity/index/images/icon-arrow-r-d.png'></i></div>
        </div>
        <!-- context 里面插入内容 -->
        <div id="context" class="act-context">
          <h1>教练介绍</h1>
          <h2>吴彦祖</h2>
          <h3>中国香港男演员</h3>
          <p>1997年回到香港，开始电影及模特工作。</p>
          <p>1997年回到香港，开始电影及模特工作。</p>
          <p>1997年回到香港，开始电影及模特工作。1997年回到香港，开始电影及模特工作。1997年回到香港，开始电影及模特工作。</p>
          <p>1997年回到香港，开始电影及模特工作。</p>
          <p>1997年回到香港，开始电影及模特工作。</p>
          <p>1997年回到香港，开始电影及模特工作。</p>
          <p>1997年回到香港，开始电影及模特工作。</p><br><br>
          <h1>活动说明</h1>
          <h2>活动须知：</h2>
          <ol>
            <li>只是活动活动的</li>
            <li>只是活动活动的</li>
            <li>只是活动活动的</li>
            <li>只是活动活动的</li>
            <li>只是活动活动的</li>
            <li>只是活动活动的</li>
          </ol>
        </div>
        <div class="act-quota">
          <div class="inner">所剩名额:<span class='sp'>20</span>/<span class='sm'>30位</span></div>
        </div>
      </div>

      <div class="act-footer">
        <a id="actButton" class="act-button">我要参与</a>
      </div>
      
      <div class="toast hide">
        <div class="toast-alert">
          <div class="toast-msg"></div>
        </div>
      </div>
      <div id="actAlert" class="act-toast hide">
        <div class="act-toast-alert">
          <div id="actAlertMsg" class="act-toast-msg">活动已经结束</div>
        </div>
      </div>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/activity/index/js/index_es5.js?ver=20161111"></script>
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
