<?php
if(!empty($wxGroupQrCode) && !in_array(UTM_SOURCE, array_merge(Config::$source4NotDownload,array('lexin')))){
?>
<div class="wx_group_code">
    <h3><?= $wxGroupQrCode['name'];?></h3>
    <p><?= $wxGroupQrCode['des'];?></p>
    <a href="javascript:void(0)">加入</a>
</div>
<div id="wx_group_code_show">
    <div class="code_bg"></div>
    <div class="show_code">
        <h3><?= $wxGroupQrCode['name'];?></h3>
        <img src="<?=$wxGroupQrCode['img_url']?>" alt="<?=$wxGroupQrCode['des']?>"/>
        <p>请截图到微信后 识别群二维码加群</p>
    </div>
</div>
<script teyp="text/javascript">
    $('.wx_group_code a').click(function(){
        $('.code_bg').height($(document).height());
        $('#wx_group_code_show').show();
        var ml = $(document).width()-$('.show_code').width();
        $('.show_code').css('left',ml/2);
        
    })
    $('#wx_group_code_show .code_bg').click(function(){
        $('#wx_group_code_show').hide();
    })
</script>
<?php }?>