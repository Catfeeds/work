    <?php $this->display('public/header_202.php');?>

    <link rel="stylesheet" href="/static/activity/orderConfirm/stylesheets/orderconfirm.css">
    <script src="/themes/qu/js/common.js?ver=20161111"></script>
    <script src="/static/activity/orderConfirm/js/orderCommon.js?ver=20161121"></script>
    <script src="/static/activity/orderConfirm/js/confirmOrderperson.js?ver=20161121"></script>

    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <div class="header">
            <div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
            <div class="center">确认订单</div>
            <div class="right"> </div>
        </div>
        <div class="order-header-tips">请认真核对信息</div>
        <ul class="common-menu order-info">
            <li>
                <div>活动名称</div>
                <div><?= $data['act_name']; ?></div>
            </li>
            <li>
                <div>活动时间</div>
                <div><?php
                if(!empty($data)){
                    echo date('H:i:s',$data['act_start_time'])=='00:00:00'?  date('Y年m月d日',$data['act_start_time']): date('Y年m月d日 H:i:s',$data['act_start_time']);
                    echo '<br/> <span>至</span> ';
                    echo date('H:i:s',$data['act_end_time']) == '00:00:00'?  date('Y年m月d日',$data['act_end_time']):date('Y年m月d日 H:i:s',$data['act_end_time']);
                }
                ?></div>
            </li>
        </ul>
        <form name="activity" action="" method="post">
            <ul class="common-menu order-login <?php if($data['is_need_userinfo']||$data['is_need_card']): ?>joinner_message<?php endif; ?>">
                <?php if($data['is_need_userinfo']): ?>
                <li>
                    <div>姓名</div>
                    <div>
                        <input type="text" name="name[]" placeholder="请填写姓名" onkeyup="value=value.replace(/(\s)/ig,'')">
                    </div>
                </li>
                <li>
                    <div>手机号</div>
                    <div>
                        <input type="text" name="phone[]" placeholder="请填写联系电话" onkeyup="value=value.replace(/[^\d]/ig,'')">
                    </div>
                </li>
                <?php endif; ?>
                <?php if($data['is_need_card']): ?>
                <li>
                    <div>身份证号</div>
                    <div>
                        <input type="text" name="card[]" placeholder="请填写身份证号" onkeyup="value=value.replace(/[^\w\.\-\/]/ig,'')">
                    </div>
                </li>
                <?php endif; ?>
                <?php if(!empty($data['is_need_address'])){ ?>
                <li>
                    <div>地址</div>
                    <div>
                        <input type="text" name="address" placeholder="请填收货地址" onkeyup="value=value.replace(/(\s)/ig,'')">
                    </div>
                </li>
                <?php } ?>
            </ul>
            <input type="hidden" value="<?php echo $data['act_id']; ?>" name="act_id" />
            <input type="hidden" value="0" name="coupon_id" amount="0" id="coupon_id" />
            <input type="hidden" value="1" name="ticket_type" id="ticket_type" />
            <input type="hidden" value="1" name="number" id="number" />
            <input type="hidden" value="<?= md5( $t.$data['act_id'].$data['act_name'].$data['act_price'].$data['act_limit'].$data['act_name'].ENCODE_KEY) ?>" name="h"  />
            <input type="hidden" name="act_name" value="<?php echo $data['act_name']; ?>">
            <input type="hidden" name="act_price" value="<?php echo $data['act_price']; ?>">
            <input type="hidden" name="act_limit" value="<?php echo $data['act_limit']; ?>">
            <input type="hidden" name="goods_ids" value="<?php echo $data['goods_id']; ?>">
        </form>
        <?php if($data['venues_id']>0): ?>
        <ul class="common-menu order-money">
            <li class="<?= $data['act_price']>0?'':'hide' ?>">
                <div>活动价格</div>
                <div class="txy-style">￥<span id="unit_price"><?= $data['act_price'] ?></span></div>
            </li>

            <li>
                <div class="cop-text">数量</div>
                <div class="cop-numContainer">
                    <ul class="quantity-component">
                        <li id="n_minus" class="n_minus disable"></li>
                        <li id="n_num" max="<?= $limitNum; ?>" class="n_num">1</li>
                        <li id="n_plus" class="n_plus"></li>
                    </ul>
                </div>
            </li>
            <li class="common-coupon <?= $data['act_price']>0?'':'hide' ?>">
                <div><span>卡券</span></div>
                <div id="use_coupon" amount="<?= $data['act_price']?$data['act_price']:0; ?>" class="co-bill-textStyle2 common-link"><i class="hide">取消使用</i><span>点击使用卡券</span><img src="/static/activity/orderConfirm/images/arrow-r.png" /></div>
            </li>
        </ul>
        <ul class="common-menu order-total">
            <li class="<?= $data['act_price']>0?'':'hide' ?>">
                <div>实付金额</div>
                <div id="payMoney" class="txy-style"></div>
            </li>
        </ul>
        <?php endif ?>
        <div class="order-tel">您的手机号码：<?php echo baf_CHtml::encode($mobile); ?></div>
        <div class="order-submit">
            <div id="orderSubmit" class="order-button">提交订单</div>
            <!-- <div class="order-nosupport"><img src="/static/activity/orderConfirm/images/nosupport.png" alt="">该场地预订后暂不支持退换</div> -->
        </div>
    </div>
    <div id="coupon_waper" class="coupon-container hide"></div>
    <div class="toast hide">
        <div class="toast-alert">
            <div class="toast-msg"></div>
        </div>
    </div>
    <div class="book-noPaySprite hide">
        <ul></ul>
    </div>
    <script type="text/javascript">
        $(window).on('load',function(){
            autoFill();
        })
    </script>
    <?php if(isset($_GET['click'])): ?>
    <script type="text/javascript">
        $(window).on('load',function(){
            Coupon.getCouponList();
        })
    </script>
    <?php endif; ?>
    <?php $this->display('public/footer.php');?>
    <script type="text/javascript">
     var venues_id="<?= $data['venues_id']>0?1:0 ?>",limit="<?= $limitNum ?>" ,userinfo="<?= $data['is_need_userinfo'] ?>" ,cardneed="<?= $data['is_need_card'] ?>",click="<?= isset($_GET['click'])?1:0?>";
        if("<?php echo $data['act_end_time']<time()? 1:0; ?>"=='1'){
            showToast('活动已过期！');
        }
        if("<?= $data['act_start_time']>time()?1:0 ?>"=='1'){
            showToast('活动未开始，敬请期待！');
        }
        if(venues_id>0 && limit=='0'){
            showToast('名额已满！');
        }
        $('#orderSubmit').click(function() {
            if(venues_id>0 && limit=='0'){
                showToast('名额已满！');
                return false;
            }
            if(venues_id>0){
                var number = $('#n_num').text();
                $("input[name='number']").val(number);
            }
            var checkbool=false;
            if(userinfo === '1' || cardneed === '1'){
                $('.joinner_message').each(function() {
                    var card=$(this).find("input[name='card[]']").val();
                    var name=$(this).find("input[name='name[]']").val();
                    var phone=$(this).find("input[name='phone[]']").val();
                    if(userinfo === '1' && !checkName(name)){
                        showToast('请输入正确的姓名');checkbool=true;return false;
                    }
                    if(userinfo === '1' && !checkPhone(phone)){
                        showToast('请输入正确的手机号');checkbool=true;return false;
                    }
                    if(cardneed === '1' && !checkIdNumber(card)){
                        showToast('请输入正确的身份证');checkbool=true;return false;
                    }
                    var index = $('.joinner_message').index(this);

                    $('.joinner_message').each(function() {
                        if($('.joinner_message').index(this) != index){
                            if(userinfo === '1' && $(this).find("input[name='phone[]']").val()==phone){
                                showToast('手机号不可重复');checkbool=true;return false;
                            }
                            if(cardneed === '1' && $(this).find("input[name='card[]']").val()==card){
                                showToast('身份证不可重复');checkbool=true;return false;
                            }
                        }
                    });
                });
            }
            if(checkbool) return false;
            if(venues_id>0){
                ajaxCheckNopayOrder(signup);
            }else{
                signup();
            }
            //提交订单
            function signup(){
                var postData = $('form[name="activity"]').serialize()
                    postData = typeof objMerge == 'function' ? objMerge(postData) : postData
                $.ajax({
                    url: '/activitycommon/signup',
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    data:postData,
                    success: function(res){
                        // load.close(); // 关闭加载等待
                        if (res.code == 1) {
                            window.location.replace(res.data.redirect_url);

                        } else if(res.code == '0503'|| res.code == '0510'){
                            showToast(res.msg);
                            setTimeout(function () {
                                if(res.data.redirect_url){
                                 window.location.replace(res.data.redirect_url);
                                }
                            },1000)
                        } else {
                           showToast(res.msg);
                        }
                    },
                    error: function(res){
                       // load.close(); // 关闭加载等待
                       showToast('网络出错，请稍后再试');
                    }
                });
            }
        });

    </script>
