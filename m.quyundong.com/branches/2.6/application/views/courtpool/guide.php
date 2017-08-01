<?php $this->display('courtpool/header.php');?>
<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide guide-wrap">
    	  <div class="guide-title">拼场玩法</div>
	      <div class="guide-info"><img data-src="/static/appwebview/courtpool/images/guide-1dpr2x.png" alt=""></div>
	      <div class="guide-title">常见问题</div>
	      <ul class="guide-list">
	        <li>
	          <div class="guide-question"><span>如何挑选合适的拼场？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:为了让水平相当的球友能够一起切磋，我们将拼场划分为新手、中级、高手场三种，同时提供了【选场评测】来帮助球友找到合适自己的拼场。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>我会和多少人拼场？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:为了保证打球体验，我们设置了4人即可拼场成功，6人满员的规则，即每个拼场中会有4–6个球友一起切磋。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>拼场成功的条件是什么？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:拼场人数在开场当天<?php echo isset($conf['check_time']) ? $conf['check_time'] : '18:00'?>之前达到4人即成功，否则拼场不成功，不论成功与否，我们都会在第一时间短信通知您。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>拼场成功后如何查询场地号？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:您可以在拼场成功后在我的订单中查询场地号，我们也会在拼场成功的短信中告知具体的场地号。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>我能加入已经成功的拼场吗？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:已经成功的拼场在开场前半小时还可以继续加人，直到达到6人满员。</div>
	        </li>
	        <li>
	          <div class="guide-question"><span>我需要准备什么？</span><img data-src="/static/appwebview/courtpool/images/guide-2dpr2x.png" alt="" class="guide-sign"><img src="/static/appwebview/courtpool/images/guide-3.png" alt="" class="guide-arrow"></div>
	          <div class="guide-answer">A:您只需带好自己的球拍和装备，到了预定时间到达场馆与其他球友汇合，场馆工作人员会准时开场，并将羽毛球放在场地中。</div>
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