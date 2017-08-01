<?php $this->display('public/header.php');?>
<style>
	input{outline: none;}
</style>
<script type="text/javascript">window.nm_go_coupon = true;</script>
<div class="qu fontfamily">
	<div class="page">
	    <div class="header">
	      <div class="left">
	        <a href="<?php if (CHANNEL_SOURCE=='qqwallet') { echo baf_CHtml::createUrl('/Coupon/index'); }else{ echo 'javascript:history.go(-1)';}?>"><i class="icon-back"></i></a>
	      </div>
	      <div class="center">
	        <h1>绑定卡券</h1>
	      </div>
	      <div class="right"></div>
	    </div>
	    <!-- 自定义部分开始-->
	    
	    <div class="qu-fe-ticketbind">
	      <div class="ticket-num-box">
	        <input id="ticket-num" type="text" name="coupon_sn" placeholder="请输入卡券的密码">
	        <div id="btn-bind">
	          绑定
	        </div>
	      </div>
	      <a href="<?= baf_CHtml::createUrl('/Coupon/couponRule');?>" class="ticket-intro"><i></i><span> 卡券使用说明</span></a>
	      <div class="mask hide">
	        <div class="alert">
	          <div class="alert-msg">
	          </div>
	          <div class="alert-close">
	            确认
	          </div>
	        </div>
	      </div>
	      <div class="loading hide">
	        <div class="adding">
	          <img src="/themes/qu/images/loading.png"><span>正在添加，请稍后。。</span>
	        </div>
	      </div>
	    </div>
	    <script>
	      document.getElementById("btn-bind").addEventListener("click",function(){
	        var num=document.getElementById("ticket-num").value;
	        var returnUrl = '<?php echo $returnUrl ? $returnUrl : baf_CHtml::createUrl('/Coupon/Index')?>';
	        if(isTwelveNum(num)){
	        	$(".loading").removeClass("hide");
	        	var postData = {coupon_sn: num}
	        	    postData = typeof objMerge == 'function' ? objMerge(postData) : postData
	        	$.ajax({
	        		url: '/Coupon/Activate',
	        		type: 'POST',
	        		dataType: 'JSON',
	        		cache: false,
	        		data: postData,
	        		success: function(res){
	        			$(".loading").addClass("hide");
	                    var res=JSON.parse(res);
	        			if(res && res.code == 1){	        				
	        				$(".mask").removeClass("hide");
	        	            $(".alert-msg").html('绑定成功');
	        	            setTimeout(function(){
	        	                $(".loading").addClass("hide");
	        	                // window.location.replace(returnUrl);
	        	                window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(returnUrl) : returnUrl);
	        	              },1500);
        					
	        			} else {
	        				$(".mask").removeClass("hide");
	        	            $(".alert-msg").html(res.data);
	        			}
	        		},
	        		error: function(res){
	        			$(".loading").addClass("hide");
	        			$(".mask").removeClass("hide");
        	            $(".alert-msg").html('网络出错，请返回重试');
	        		}
	        	});
	        }else{
	          $(".mask").removeClass("hide");
	          $(".alert-msg").html("请输入有效的12~14位数字密码");
	        }
	      });
	      
	      $(".alert-close").on("click",function(){
	        $(".mask").addClass("hide");
	      });
	      function isTwelveNum(num){
	        if(/\b\d{12,14}\b/.test(num)==true)return true;
	        else return false;
	      }
	    </script>
	    <!-- 自定义部分开始结束-->
	  </div>
</div>
<?php $this->display('public/footer.php');?>