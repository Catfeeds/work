<?php $this->display('public/header.php');?>
<style>
	a, a:hover, a:visited {
	    text-decoration: none;
	    color: #fff;
	}
</style>
<div class="qu" style="background: #f0f0f0;">
	<div class="page page-court">
		<?php if(in_array(UTM_SOURCE, Config::$source4Nothing)){
			$this->display('public/out_top.php', array('topTitle'=>'提示'));
		}else{
			$this->display('public/public_top.php', array(
					'topTitle'=>'提示',
					'leftMenu' => '<a href="javascript:window.history.go(-1);"><i class="icon-back"></i></a>',
					'rightMenu' => '<a class="pay-ok-right" href="'.baf_CHtml::createUrl('/').'">首页</a>'
			));
		}?>
		<div class="court-detail">
            <div style="color: #939393; font-size: 1rem; text-align: center; margin-top: 1.8rem; padding: 0 1rem; line-height: 1.25rem;"><?php echo baf_CHtml::encode($message); ?></div>
		</div>
	</div>
</div>
<script type="text/javascript">
	var url = '<?php echo isset($url) ? $url : '';?>';
	var time = <?php echo isset($time) && $time ? $time * 1000 : 3000?>;
	if(url && time){
		window.setTimeout(function(){
			// window.location.href = url;
			window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
		}, time);
	}
</script>
<?php $this->display('public/footer.php');?>