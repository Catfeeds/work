<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui"/>
	<title>课程介绍</title>
	<link rel="stylesheet" type="text/css" href="/static/css/reset.css">
	<style type="text/css">
		html{
			width: 100%;
			font-size: 100px;
			background-color: #f0f0f0;
		}
		body{
			width: 100%;
			font-size: 100px;
			background-color: #f0f0f0;
			overflow-x:hidden; 
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
	<link rel="stylesheet" type="text/css" href="/static/css/classinfomain.css?ver=1.06">
</head>
<body>
	<section class="classInfoMain">
	    <?php if (!empty($courseInfo)) { ?>
	        <?php if ($courseInfo['image_url']) { ?>
		        <div class="banner"><img src="<?php echo $courseInfo['image_url'];?>"></div>
		    <?php } ?>
		<div class="classDescription">
			<h3 class="classTitle icon-book">课程内容</h3>
			<div class="classDescriptionContent" style="min-height: 150px;">
			    <?php echo $courseInfo['content']; ?>
			</div>
		</div>

		<div class="tips">
			<h3 class="classTitle icon-heart">温馨提示</h3>
			<div class="tipsContent">
			    <?php echo nl2br($courseInfo['notice']); ?>
			</div>
			<!-- 
			<ul class="tipsContent">
				<li class="tipsContentIn">1、上课前请勿进食过多</li>
				<li class="tipsContentIn">2、上课时穿着宽松的衣服，让你的身体更舒张</li>
			</ul>
			-->
		</div>

		<div class="classInfo">
			<div class="classInfoTop">
				<div class="schooltime">
                    <span class="classInfoLeft">上课时间</span><span class="classInfoRight"><?php echo date('m月d日', $courseInfo['book_date']); ?>&nbsp;&nbsp;<?php echo date('H:i', $courseInfo['start_time']); ?>-<?php echo date('H:i', $courseInfo['end_time']); ?></span>
				</div>
				<div class="duration"><span class="classInfoLeft">课程时长</span><span class="classInfoRight"><?php echo $courseInfo['duration_time']; ?>分钟</span></div>
			</div>
			<div class="classInfoBottom">
			    <?php 
				
				/*
			    if ($courseInfo['is_course'] == 1 // 只支持课程
                    || $courseInfo['venues_is_delete'] == 1 // 删除(不显示)
                    || $courseInfo['venues_is_order'] == 0  // 不可预定
                    || $courseInfo['venues_order_type'] != 3 // 不是月卡类型
                ) {
                ?>
				    <span class="classInformation icon-home"><?php echo baf_CHtml::encode($courseInfo['venues_name']); ?></span>
				<?php } else { ?>
				
				    <?php 
				    $venuesNameLink = 'gosport://moncard_detail?business_id='.$courseInfo['venues_id'].'&category_id='.$courseInfo['category_id'];
				    ?>
                    <a href="<?php echo $venuesNameLink; ?>" class="classInformation icon-home icon-rightarr" ><?php echo baf_CHtml::encode($courseInfo['venues_name']); ?></a>
				<?php } ?>
				
				<?php 
				*/
				
				// 所有场馆都不进行跳转 modify by xiaosibo 2015-08-22
				echo '<span class="classInformation icon-home">'.$courseInfo['venues_name'].'</span>';
				
				$addressLink = 'gosport://location?longitude='.$courseInfo['longitude'].'&latitude='.$courseInfo['latitude'].'&address='.urlencode($courseInfo['address']).'&category_id='.$courseInfo['category_id'].'&name='.urlencode($courseInfo['venues_name']);
				?>
				<a href="<?php echo $addressLink;?>" class="classInformation icon-location icon-rightarr" ><?php echo $courseInfo['address']; ?></a>
				<?php if(!empty($courseInfo['telephone'])) { ?>
				<a href="gosport://phone?phone=<?php echo $courseInfo['telephone']; ?>" class="classInformation icon-phone" >
				    <?php echo $courseInfo['telephone']; ?>
				</a>
				<?php } ?>
			</div>
		</div>
	
	    <?php } else { 
	        echo '<img width="100%" src="'.TEMPLATE.'qu/images/nodata@2x.png" />';
	    } ?>
	</section>
<script type="text/javascript" src="/static/js/zeptoWithFxTouch.min.js"></script>
<script type="text/javascript" src="/static/js/classinfomain.js?=ver1.25"></script>
</body>
</html>