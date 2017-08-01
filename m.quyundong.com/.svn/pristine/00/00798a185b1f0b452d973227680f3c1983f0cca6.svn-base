<?php $this->display('public/header.php');?>
<style type="text/css">
    .qu .page-order {
        background: #f5f5f9;
    }
    .qu .page-order .order-bd .order-item {
        width: 100%; 
        margin: 0rem auto 0.3125rem;
        border-radius: 0px;
        -moz-border-radius: 0px;
        -webkit-border-radius: 0px;
        border: 0.0625rem solid #dfdfdf;
    }
    .qu .page-order .order-bd {
        padding:0; 
    }
    .qu .page-order .order-bd .info-list .t {
        font-size:15px;
        margin-left:15px;
        width:auto;
    }
    .qu .page-order .order-bd .info-list li{
        margin-left: 15px;
    }
    .qu .page-order .order-bd .info-list .bdline {
        color:#aaa;
    }
    .cityList .cityListC{
        margin-right: 15px;
    }
    .qu .header{
        padding: 0 15px;
    }
    .qu .header .left {
        overflow: visible;
    }
    .qu .header .left .icon-back{
      display: inline-block;
      width: 16px;
      height: 16px;
      border-bottom:2px solid #fff;
      border-left:2px solid #fff;
      position: absolute;
      background-image:none; 
      top:50%;
      left:50%;
      margin-left:25px;
      margin-top:2px;
      -webkit-transform:rotateZ(45deg);
    }
</style>
<div class="qu" style="height:auto;background: #f0f0f0;text-align:center;font-family:"Microsoft YaHei",微软雅黑;">
	<div class="page-order" >       
        <div class="header">
			<div class="left"><a href="<?= baf_CHtml::createUrl('/');?>"><i class="icon-back"></i></a></div>
			<div class="center"><h1>选择城市</h1></div>
			<div class="right"></div>
		</div>
        
        <div class="order-bd">
            <!-- 定位城市 -->
			<div class="order-item">
				<ul class="info-list fontfamily cityList" style="border-bottom: 0px;padding-bottom:0.4rem;">
					<li class="<?php if(!in_array(CHANNEL_SOURCE,Config::$hideItem)) echo 'J_selectCity ';?>J_LocalCity" style="line-height: 25px;height: 25px;">
						<p class="t" style="color: #636363;width: inherit;">GPS定位城市</p>
                        <p class="c cityListC LocalCity" style="color: #666;font-size: 16px;">定位中</p>
					</li>
				</ul>
            </div>
            
            <div class="order-item">
                <?php 
                //读取Cookie
                $city = api_CoreHelper::getCookie('city_id');
                //if (empty($city)){
                //    $city = '76';
                //}
                ?>
				<ul class="info-list fontfamily cityList" style="border-bottom: 0px;">
								
				    <?php foreach ($open_city as $key=>$value){ ?>				
					<li class="bdline J_selectCity" city_id="<?php echo $value['city_id'];?>" city_name="<?php echo $value['city_name'];?>">
						<p class="t cityListP" style="color: #636363;"><?php echo $value['city_name'];?></p>
                        <p class="c cityListC">
                            <?php if ($city == $value['city_id']){ ?>
                            <img width="23" src="/themes/qu/images/icons2x/mark@2x.png" />
                            <?php }?>
                        </p>
					</li>
				    <?php }?>
          <li class="bdline" style="border: 0px;padding-bottom: 0;">更多城市即将开放..</li>
				</ul>
            </div>
        </div>
        <div class="err">
			<p class="J_err"></p>
		</div>
	</div>
</div>
<script type="text/javascript">
    var cid = <?php echo $cid;?>;
</script>
<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=18c8a6784a3918605e835562d6ed82c7&s=1"></script>
<script type="text/javascript" src="/themes/qu/js/city.js?v=20161111"></script>
<?php $this->display('public/footer.php');?>