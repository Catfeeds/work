<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui"/>
	<link rel="stylesheet" type="text/css" href="/static/css/reset.css">
	<title>场馆介绍</title>
	<style type="text/css">
		html{
			width: 100%;
			font-size: 100px;
			background-color: #f0efed;
		}
		body{
			width: 100%;
			font-size: 100px;
			background-color: #f0efed;
			padding-bottom: 0.3rem;
		}
		i{
			font-style: normal;
			display: block;
		}
		a{
			text-decoration: none;
			color:#636363;
		}
		a:visited{
			color:#636363;
		}
		button{
			border:0px;
		}
		.hide{
			display: none;
		}	
	</style>
	<link rel="stylesheet" type="text/css" href="/static/css/gymintro.css?ver=1.04">
</head>
<body>
	<section class="main">
	    <?php if (!empty($venuesInfo)) {?>
            <?php if (!empty($venuesInfo['gallery_list'])) {?>
            <a href="#" class="photoAlbum">
                <img src="<?php echo $venuesInfo['gallery_list'][0]['thumb_url'];?>">
            </a>
            <?php } ?>
            <div class="home icon-home"><?php echo $venuesInfo['venues_name']; ?></div>
            <div class="gyminformation">
                <?php if(!empty($venuesInfo['telephone'])){?>
                    <a href="tel:<?php echo $venuesInfo['telephone']; ?>" class="phone icon-phone"><?php echo $venuesInfo['telephone']; ?></a>
                <?php } ?>
                <div class="address icon-location"><?php echo $venuesInfo['address']; ?></div>
            </div>
		<?php } else { 
		    echo '<img width="100%" src="'.TEMPLATE.'qu/images/nodata@2x.png" />';
		}?>
	</section>
    <?php if (!empty($venuesInfo['gallery_list'])) {?>
	<section class="cover" id="photographCover">
		<div class="photograph" id="photograph">
			<div class="count"><span class="page">1</span>/<span><?php echo count($venuesInfo['gallery_list']); ?></span></div>
			<button class="photoAlbumClose"></button>
			<ul>
                <?php 
                    foreach ($venuesInfo['gallery_list'] as $img) {
                ?>
				<li><img src="<?php echo $img['thumb_url'];?>"></li>
                <?php } ?>
			</ul>
		</div>
	</section>
    <?php } ?>
	<footer><a href="http://www.quyundong.com/d" class="download"><img src="/static/images/gyminfodownload.png"></a></footer>
	<script type="text/javascript" src="/static/js/zeptoWithFxTouch.min.js"></script>
	<script type="text/javascript" src="/static/js/touchphotograph.js?ver=1.03"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			var $windowWidth = $(window).width();
			setTimeout(function(){
				$windowWidth = $(window).width();
				if($windowWidth > 640){
					$windowWidth = 640;
				}
				$("html").css("font-size",(100/320) * $windowWidth + "px");
			},100);
			

			$(window).resize(function(){
				$windowWidth = $(window).width();
				if($windowWidth > 640){
					$windowWidth = 640;
				}
				$("html").css("font-size",(100/320) * $windowWidth + "px");
			});
		});
	</script>
</body>
</html>