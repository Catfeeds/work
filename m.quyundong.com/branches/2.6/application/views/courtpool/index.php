<?php $this->display('courtpool/header.php');?>
<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <ul class="list-head clearfix">
      	<?php 
      	if(isset($courtPools['date_list']) && $courtPools['date_list']){
			foreach($courtPools['date_list'] as $v){
				$class = $v == $courtPools['date_time'] ? '  class="active"' : '';
      	?>
        <li<?php echo $class;?> onclick="window.location.href='/courtpool/index?date_time=<?php echo date('Y-m-d', $v);?>'">
          <div>
            <p><?php echo date('m月d日', $v);?></p>
            <p><?php echo api_CoreHelper::getWeek(date('w', $v));?></p>
          </div>
        </li>
        <?php }}?>
      </ul>
      <div class="list-prepare">
        <a href="/courtpool/guide"><div class="list-new">新手指引</div></a>
        <a href="/courtpool/assess"><div>选场评测</div></a>
      </div>
      <ul class="list-gym">
      	<?php 
      	if(isset($courtPools['lists']) && $courtPools['lists']){
			foreach($courtPools['lists'] as $v){
      	?>
        <li>
          <div class="list-gym-h"> <span class="list-gym-name"><?php echo $v['venues_name'];?></span><span>[<?php echo $v['region_name']?>]</span><em><?php echo date('H:i', $v['start_time']).'-'.date('H:i', $v['end_time']);?></em></div>
          <ul class="list-gym-m clearfix">
          	<?php 
          	if($v['court_pools']){
				foreach($v['court_pools'] as $courtpool){
					$statusImg = $courtpool['current_num']>=$courtpool['min_num'] ? '2' : '1';
          	?>
            <li>
              <a href="<?php echo isset($_SESSION['in_app']) && $_SESSION['in_app'] ? 'gosport://courtpool_detail?court_pool_id='.$courtpool['court_pool_id'] : '/courtpool/view?id='.$courtpool['court_pool_id'];?>">
              <div data-src="url(/static/appwebview/courtpool/images/list-<?php echo $statusImg;?>dpr2x.png)" class="list-gym-ml use-background"></div>
              <div class="list-gym-mr"><span class="list-gym-type"><?php echo $courtpool['level_name']?></span><img src="/static/appwebview/courtpool/images/pcDetail-6.png" alt="" class="list-gym-arrow">
                <div class="list-gym-rate">
                	<?php 
                	for($i=1;$i<7;$i++){
						$class = $i<=$courtpool['current_num'] ? ' class="list-active"' : '';
                	?>
                  <div<?php echo $class;?>>
                    <div></div>
                  </div>
                  <?php }?>
                </div>
                <div class="list-rate-txt left-<?php echo $courtpool['current_num'];?>"><i><?php echo $courtpool['current_num'];?></i><i>/<?php echo $courtpool['max_num'];?></i></div>
              </div>
              </a>
            </li>
            <?php }}?>
          </ul>
        </li>
        <?php }}else{?>
        <li>暂无拼场</li>
        <?php }?>
      </ul>

       <div class="list-firstSprite hide">
          <div class="list-firstSprite-h">
            <div data-src="url(/static/appwebview/courtpool/images/firstSpritedpr2x.png)" class="firstSpriteBtn use-background"></div>
            <div class="list-firstSprite-txt"> <img data-src="/static/appwebview/courtpool/images/firstSprite-txt.png" alt=""></div>
          </div>
        </div>
    </div>
    
  <script src="/static/js/jquery-1.12.0.min.js"></script>
  <script src="/static/js/mobileResponsive.js"></script>
  <script src="/static/appwebview/courtpool/js/courtpool.js"></script>
  <script>
    function setCookie(name,value) 
    { 
        var Days = 30; 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    } 

    function getCookie(name) 
    { 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
     
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    } 

    if(!getCookie("isFirstShowSprite")){
      $(".list-firstSprite").removeClass("hide");
      setCookie("isFirstShowSprite","true");
    }
    
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