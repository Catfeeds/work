<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>玩法说明</title>
    <link rel="stylesheet" href="/static/appwebview/courtpool/stylesheets/courtpool.css?v=1.0.3"><!--[if IE 8]>
    <link rel="stylesheet" href="/static/appwebview/courtpool/stylesheets/courtpool-ie8.css?v=1.0.3"><![endif]--> 
  </head>
  <body data-design-width="750">
<div id="loading" data-lock="1" class="loading">
    <style type="text/css">
      .guide-list li .guide-question {
          line-height: 1.7;
          position: relative;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
          padding-right: 40px;
          padding-right: 0.4rem;
      }
      .guide-list li .guide-question .guide-arrow {
          position: absolute;
          right: 10px;
          width: 12px;
          width: 0.12rem;
          top: 50%;
          margin-top: -3px;
          margin-top: -0.03rem;
          margin-right: 10px;
          margin-right: 0.1rem;
      }
    </style>
      <div class="loading-icon"></div>
    </div>
    <div class="main hide guide-wrap">
    	<?php if(empty($_SESSION['in_app'])){?>
    	<div class="header">
	        <div class="left"><a href="javascript:history.go(-1)"><i class="icon-back"></i></a></div>
	        <div class="center">玩法说明</div>
	        <a class="right"></a>
	    </div>
	  <?php }?>  
	  <div class="guide-title">拼场玩法</div>
      <div class="guide-info"><img data-src="/static/appwebview/courtpool/images/guide-1dpr2x.png" alt=""></div>
      <div class="guide-title">常见问题</div>
      <ul class="guide-list">
        <li>
          <div class="guide-question"><span>什么时候会知道场号及球友信息？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
          <div class="guide-answer">A:开场前半小时会为您分配球友和场地号，具体信息将会以短信的形式发到您的手机上，您也可以登录APP在订单中查看。</div>
        </li>
        <li>
          <div class="guide-question"><span>到了场地怎么做？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
          <div class="guide-answer">A:拼场需要有一个名球友去前台开场和取球，如果您到的时候场地还没开，则需要您到前台凭短信中的验证码开场及取球。</div>
        </li>
        <li>
          <div class="guide-question"><span>我会和多少人拼场？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
          <div class="guide-answer">A:为了保证打球体验，每个场地中会尽量安排6个人的最佳配置。但有时也会为了兼顾其他球友而出现4-7人的场地配置。</div>
        </li>
        <li>
          <div class="guide-question"><span>拼场成功的条件是什么？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
          <div class="guide-answer">A:拼场成功的基本条件是至少有4个人：
如果开场时间在上午12点及之前，需要在前一天22点达到4人
如果开场时间在下午18点及之前，需要在当天12点达到4人
如果开场时间在晚上18点之后，需要在当天18点达到4人。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>我能加入已经成功的拼场吗？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:已经成功的拼场在开场前半小时还可以继续加人。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>为什么一些不可加入的拼场过了一会又能加入了？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:这种情况一般是由于一些订场用户退场导致了有更多的场地能用来拼场。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>有球友爽约了怎么办？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:您可以致电客服，客服将会与场地管理员核实，并为您退款。</div>
	        </li>
	      </ul>
    	  <div class="guide-tel">致电客服：<a href="<?php echo  isset($_SESSION['in_app']) && $_SESSION['in_app'] ? 'gosport://phone?phone=4000410480' : 'tel:4000410480';?>">4000-410-480</a> </div>

    </div>
    <script src="/static/js/jquery-1.12.0.min.js"></script>
	  <script src="/static/js/mobileResponsive.js"></script>
	  <script src="/static/appwebview/courtpool/js/courtpool.js"></script>
	  <script>
	    window.onload = function(){
	      var myURL = window.location.href.split('#')[0];
	      var loadInterval = setInterval(function() {
	        if($(".loading").attr("data-lock") == 1){
	           $(".loading").addClass("hide");
	           $(".main").removeClass("hide");
	           clearInterval(loadInterval);
	        }
	      },500);
	    }	
	  </script>
	  <script>
	    var _hmt = _hmt || [];
	    (function() {
	    var hm = document.createElement("script");
	    hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
	    var s = document.getElementsByTagName("script")[0];
	    s.parentNode.insertBefore(hm, s);
	    })();
	  </script>
<?php $this->display('courtpool/footer.php');?>