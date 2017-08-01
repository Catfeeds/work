<?php $this->display('public/header.php');?>
<style>
	div {text-align: center; font-style: 2em; margin-top: 30%; line-height: 100%; color: #666;}
	a { text-decoration: underline; color: #333; }
	#repay {margin-top: 15%;}
</style>
	<div>
	<h2 id="show_html">正在发起支付...</h2>
        <a id="repay" href="javascript:history.go(-1)" style="font-size: 16px; display: none;">返回</a>
	</div>

	<script src="/static/js/jquery-1.12.0.min.js"></script>
	<script src="//open.mobile.qq.com/sdk/qqapi.js?_bid=152"></script>
    <script src="/themes/qq/js/wallet.js?v=20161111"></script>
    <script type="text/javascript">
    var tokenId = '<?php echo !empty($payInfo['token_id']) ? $payInfo['token_id'] : "";?>';
    var payed = false;
    var orderId = <?php echo !empty($payInfo['order_info']['order_id']) ? $payInfo['order_info']['order_id'] : 0?>;
    function showRetry(){
	    $('#repay').css('display','block');
	}

	$(document).ready(function(){
    	walletPay({
                    'tokenId': tokenId,
                    'appid':'<?php echo QQ_WALLET_APPID?>',
                    'bargainor_id':'<?php echo QQ_BARGAINOR_ID?>'
                }, function(msg){
                	$('#show_html').html(msg);
                	showRetry();
                });
		payed = true;
    })
    </script>
</body>
</html>