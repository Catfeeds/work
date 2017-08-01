<?php $this->display('public/footer_tips.php');?>
<div style="display: none;">
<script>
setTimeout(function(){
    $('.main').removeClass('hide')
    $('#loading').addClass('hide')
  },5000);
<?php 
//测试环境不引入百度统计
if(!getenv('PAY_HOST')){
 ?>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
<?php } ?>
</script>
</div>
</body>
</html>