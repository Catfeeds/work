<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<title>装备商城-拼团</title>
	<link rel="stylesheet" type="text/css" href="/static/equiment/plugin/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="/static/equiment/plugin/swiper.css">
	<link rel="stylesheet" type="text/css" href="/static/equiment/css/team.css?v=20170722">
	<script type="text/javascript" src='/static/equiment/plugin/jquery-2.1.1.min.js'></script>
	<script type="text/javascript" src='/static/equiment/plugin/swiper.js'></script>
	<script>
        var offWidth = window.screen.width/35;
        document.getElementsByTagName("html")[0].style.fontSize = offWidth + 'px';
    </script>
</head>
<body>
	<!-- head -->
	<div class="head">
		<div class="glyphicon glyphicon-menu-left"></div>
		<div >装备详情</div>
		<div><img src="/static/equiment/images/share-1.5x.png" style="display: none;"></div>
	</div>
	<?php
	if(!empty($data)){
	?>
	<div class="content">
		<div class="banner">
			<div class="swiper-container">
		        <div class="swiper-wrapper">
		        <?php
		        if(!empty($data['pic_list'])){
		        	foreach ($data['pic_list'] as $value) {
		        ?>
		            <div class="swiper-slide"><img src="<?= $value?>"></div>
		        <?php }}?>    
		        </div>
		        <!-- Add Pagination -->
		        <div class="swiper-pagination"></div>
	    	</div>
		</div>
		<div class="goods-introduce">
			<div class="goods-name"><?= $data['name'];?></div>
			<div class="goods-inbox">
				<?php if(!empty($data['group_info'])){?><div class="goods-type"><span class="goods-type-bg">拼团价</span></div>
				<div class="goods-price">￥<?php echo round($data['group_info']['group_price']);?></div>
				<div class='goods-oPrice'>原价￥<?= $data['price']?></div>
				<?php }else{?>
				<div class="goods-price">￥<?= $data['price'];?></div>
				<?php }?>
				<div class="goods-haveSale">已售<?= $data['sale_count'];?>件</div>
			</div>
			<?php
			if(!empty($data['group_info'])){
				$pre = ($data['group_info']['group_join_count']/$data['group_info']['group_count'] * 100);
				$pre = $pre>20?($pre>100?100:$pre):20;
				$have_join = $pre>=100?"已成团":$data['group_info']['group_join_count'].'人参与';
			?>
			<div class="active-start">
				<div class="progress">
					<div class="progress-bar progress-bar-danger" role="progressbar"
						 aria-valuenow="60" aria-valuemin="0" aria-valuemax="<?=$data['group_info']['group_count']?>"
						 style="width:<?=$pre ?>%; line-height:3rem; "> 
						 <?=$have_join;?>
						 <div class="have-join"></div>
					</div>
				</div>
				<div class="short">
				<?php
				$tips = '';
				$is_accomplish = $data['group_info']['group_count']-$data['group_info']['group_join_count'];
				$tips = $is_accomplish<=0?'拼团结束后统一发货':'还差'.$is_accomplish.'个就可以成团啦';
				// if(isset($data['group_info']['is_group']) && in_array($data['group_info']['is_group'], array(0,2))){
				// 	$tips = '还差'.$data['group_info']['group_count']-$data['group_info']['group_join_count'].'个就可以成团啦';
				// }else if(isset($data['group_info']['is_group']) && $data['group_info']['is_group']==1){
				// 	$tips = '拼团结束后统一发货';
				// }
				echo $tips;
				?>
				</div>
				<?php }?>
			</div>
			<?php
			if(!empty($data['group_info']['is_group']) && in_array($data['group_info']['is_group'], array(1,2))){
			?>
			<div id="start_time" class="goods-start" data-status="<?= $data['group_info']['is_group']?>" data-now="<?= time()?>" data-start="<?= $data['group_info']['start_time']?>" data-end="<?= $data['group_info']['end_time']?>"><span ></span></div>
			<script type="text/javascript">
				var now = $('#start_time').data('now');
				var status = $('#start_time').data('status');
				var time = status==2 ? $('#start_time').data('start') : $('#start_time').data('end');
				var tips = status ==2 ? '后开始拼团' : '后结束';
				$('#start_time').append(tips)
				window.setInterval(function(){
					now ++;
					var last = time - now;
					var h,i,s;
					if(last>0){
						h = parseInt(last / 3600);
						hl = last % 3600;
						i = parseInt( hl / 60);
						il = hl % 60;
						if(h<2) h = '0'+h;
						if(i.length<2) i = '0'+i;
						if(il.length<2) il = '0'+il;
						$('#start_time span').html(h + ':' + i + ':' + il );
					}else{
						$('#start_time').remove();
					}
				}, 1000);
			</script>
			<?php }} ?>
		</div>
		
		<?php
			if(!empty($data['service_list'])){
		?>
		<div class="goods-ensure" id="goods_ensure">
			<?php
				foreach($data['service_list'] as $value){
			?>
			<div><img src="/static/equiment/images/icon_red_check1.png"><?= $value['title'];?></div>
			<?php }?>
			<div class="glyphicon glyphicon-menu-right"></div>
		</div>
		<?php } ?>
		<div class="goods-detail">
			<div class="goods-detail-title">商品详情</div>
			<div class="goods-detail-img"><?= $data['content'];?></div>
		</div>
	</div>
	
	<!-- fooster status 1 -->
	<div class="fooster active-ready"  style="display: none;">
		<div class="button">单独购买（￥<?= $data['price'];?>）</div>
	</div>
	
	<!-- fooster status 2 -->
	<div class="fooster active-havestart">
		<div id="gosport">
			购买<br/>(￥<?= $data['price'];?>)
		</div>
	</div>
	<?php
		if(!empty($data['service_list'])){
	?>
		<div class="goods-ensure-detail-bg" style="display: none">
			<div class="goods-ensure-detail">
				<div class="close-ensure"><div class="glyphicon glyphicon-remove" id='ensure_close'></div> </div>
				<div class="goods-ensure-title">支持服务</div>
			<?php
				foreach($data['service_list'] as $value){
			?>
				<div class="goods-ensure-detail-item">
					<div class="ensure-img"><img src="/static/equiment/images/icon_red_check1.png"></div>
					<div class="ensure-title"><?= $value['title'];?></div>
	</div>
				<div class="ensure-content"> <?= $value['remark'];?> </div>
			<?php }?>
			</div>
		</div>
	<?php }?>
</body>
<script type="text/javascript">
var ua = window.navigator.userAgent.toLowerCase();
function inWeixin(){
	console.log(ua);
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

function isAndroid(){
	return ua.indexOf('android') > -1 || ua.indexOf('adr') > -1
}

function isIos(){
	return ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1
}

function redirect(url){
	window.setTimeout(function(){
		window.location.href = url;
	}, 5000);
}

	$('#gosport').click(function(){
		var url = 'gosport://goods_detail?id=<?= $data['goods_id'];?>';
		try {
			if(inWeixin()){
				alert('请点击右上角菜单，选择在浏览器中开打');
			}else if(isAndroid()){
				window.location.href= url;
				console.log('android');
				window.redirect('http://www.quyundong.com/d');
			}else if(isIos()){
				window.location.href= url;
				console.log('ios');
				redirect('https://appsto.re/cn/clGXQ.i')
			}else{
				console.log('unknow');
			}
		} catch(e) {
			// statements
			console.log(e);
			alert(e.message);
		}
	})

	// banner
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: 2500,
		autoplayDisableOnInteraction: false,
	});
	$("#goods_ensure").click(function(event) {
		$(".goods-ensure-detail-bg").show();
		$(".goods-ensure-detail").animate({ bottom: 0 },function () {
			$("body").css({ position: 'fixed'});
		});
	});

	$("#ensure_close").click(function(event) {
		$("body").css({ position: ''});
		$(".goods-ensure-detail").animate({ bottom: "-75%"},function () {
			$(".goods-ensure-detail-bg").hide();
		})
	});

	$(".goods-ensure-detail-bg").click(function(event) {
		$("body").css({ position: ''});
		$(".goods-ensure-detail").animate({ bottom: "-75%"},function () {
			$(".goods-ensure-detail-bg").hide();
		})
	});
</script>
</html>