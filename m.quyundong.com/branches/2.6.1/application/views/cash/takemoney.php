<?php $this->display('public/header_205.php');?>
    <script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
    <link rel="stylesheet" href="/themes/cash/stylesheets/cash.css">
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main">
      <div class="header">
        <div class="left" ><a id='barLeft' href="javascript:;"><i class="icon-back"></i></a></div>
        <div class="center" id='centerTitle'>提现</div>
      </div>
      <div class="body take-money">
        <p class="big-title hide" id='bigTitle'>提现金额: <em> <b><?=isset($cashInfo['amount']) ? $cashInfo['amount'] : '-'?></b>元</em><i class="icon icon-add fr"></i></p>
        <div class="empty hide" id='empty'>
          <div class="empty-icon"><img src="/themes/cash/images/binding.png" alt=""></div>
          <p class="tips">请先绑定银行卡</p>
          <p><span class="btn" id='add'>立即绑定</span></p>
        </div>
        <div class="bank-list hide" id='bankList'>
          <p class="little-title">到账银行</p>
          <ul class="list" >
            <!-- <li><div class="inner"><span>工商银行（5068）</span><input type="radio" name="bank" value='1' id='bank0'><label class="icon-radio" for='bank0'></label><i class="icon-edit"></i></div></li> -->
            <!-- <li><div class="inner"><span>农商银行（3024）</span><input type="radio" name="bank" value='2' id='bank1'><label class="icon-radio" for='bank1'></label><i class="icon-edit"></i></div></li> -->
          </ul>
          <p class="p-btn"><span class="btn" id='takeMoneyBtn' disabled>立即提现</span></p>
          <p class='tips'>Tips:最低提现金额为50元</p>
        </div>
        <div class="add-bank-card hide" id='bankCardInfo'>
          <ul class='list'>
            <li><div class="inner"><label for='bankSelect' class='left-side'>所属银行</label><select name="" id="bankSelect">
            <option value="">选择银行</option>
            <?php
            if(!empty($bankList)){
                foreach ($bankList as $k => $v) {
            ?>
                <option value="<?=!empty($v['bank_id']) ? $v['bank_id'] : '';?>"><?= !empty($v['bank_name']) ? $v['bank_name'] : ''?></option>
            <?php }}?>
            </select></div></li>
          </ul>
          <ul class="list">
            <li><div class="inner"><label for='cardNumber' class="left-side">卡号</label><input id='cardNumber' type="text" placeHolder="卡号"></div></li>
            <li><div class="inner"><label for='cardUser' class="left-side">持卡人</label><input id='cardUser' type="text" placeHolder="持卡人"></div></li>
            <li><div class="inner"><label for='cardLocation' class="left-side">开户地</label><input id='cardLocation' type="text" placeHolder="开户地"></div></li>
            <li><div class="inner"><label for='cardBank' class="left-side">开户行</label><input id='cardBank' type="text" placeHolder="开户行"></div></li>
          </ul>
          <p class="p-btn editBtnP"><span class="btn save-btn">保存</span><span class="btn" id='unbind'>解除绑定</span></p>
          <p class="p-btn addBtnP"><span class="btn save-btn">保存</span></p>
          <p class="tips addBtnP">Tips:不支持信用卡、国外银行卡</p>
        </div>
        <div class="take-money-success hide" id='takeMoneySuccess'>
          <div class="success-icon"><img src="/themes/cash/images/success.png" alt=""></div>
          <h3 >提交申请已提交!</h3>
          <p class='tips'>将在5个工作日内到账</p>
          <p class="p-btn"><span class="btn">确定</span></p>
        </div>
      </div>
    <script src="/themes/cash/js/ajaxlist.js?v=1.0"></script>
    <script src="/themes/cash/js/takemoney.js?v=1.0"></script>
    <script>
      $(window).on('load', function() {
        var loadInterval = setInterval(function() {
          if ($(".loading").attr("data-lock") == 1) {
             $(".loading").addClass("hide");
             $(".main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      })
    </script>
<?php $this->display('public/footer.php');?>