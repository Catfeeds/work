<?php $this->display('public/header_202.php');?>
    <link href="/themes/qu204/court/book/stylesheets/book.css" type="text/css" rel="stylesheet">
    <script src="/themes/qu204/js/touchScroll.js"></script>
    <script>
        var minHour = <?php echo isset($book_arr['min_hour']) ? $book_arr['min_hour'] : 1;?>;//最小起订时间
    </script>
</head>

<body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide" data-due="<?= isset($due_data['order']['pay_expire_left'])&&$due_data['order']['pay_expire_left']>0? $due_data['order']['pay_expire_left']:'0' ?>">
        <div class="header">
            <div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
            <div class="center">场次选择</div>
            <?php if ($uid > 0 && !in_array(CHANNEL_SOURCE,Config::$hideItem)) {
                if (isset($due_data['count']) && $due_data['count'] > 0) {
                    ?>
                    <div class="right" onclick="location.href='<?= baf_CHtml::createUrl('/myorder/index?type=0');?>'">订单<em></em></div>
                    <?php
                } else {
                    ?>
                    <div class="right" onclick="location.href='<?= baf_CHtml::createUrl('/myorder/');?>'">订单</div>
                    <?php
                }
                ?>
            <?php } else { if(!in_array(CHANNEL_SOURCE,Config::$hideItem)){ ?>
                <div class="right" onclick="location.href='<?= baf_CHtml::createUrl('/login');?>'">登录</div>
            <?php } } ?>
        </div>
        <?php if (isset($book_arr, $book_arr['date_list']) && !empty($book_arr)){ ?>
        <div class="book-date">
            <div class="data-change"><img src="/themes/qu204/court/book/images/arrow.png" alt=""></div>
            <div class="date-wrap">
                <ul>
                    <?php
                    $weekarray = array("日", "一", "二", "三", "四", "五", "六");
                    foreach ($book_arr['date_list'] as $k => $value) {
                        ?>
                        <a href='<?= !empty($relayDenied) ? 'javascript:relayDeniedTips()' : baf_CHtml::createUrl('/court/book?bid='.$businessId.'&t='.$value.'&cid='.$catId);?>'
                           data-t="<?= $value ?>">
                            <?php if ($value == strtotime(date('Y-m-d')) and !isset($_GET['t'])) { ?>
                                <li class="active">
                            <?php }else{?>
                                <li>
                            <?php  } ?>
                            <?php if ($value == strtotime(date('Y-m-d'))) { ?>
                                <p>今天</p>
                            <p>
                                <?php } else { ?>
                            <p>
                                <?php
                                $p = date('w', ($value));
                                echo '周' . $weekarray[$p];
                            } ?>
                            </p>
                            <p><?php echo date("m月d日", $value); ?></p>
                        </li>
                    </a>
                    <?php } ?>
                </ul>
            </div>
        </div>
        <div class="book-container mobile-qq-book">
            <div class="book-area">
                <ul>
                    <?php $allCourse_name='';
                    foreach ($book_arr['goods_list'] as $value) {
                            $allCourse_name .= $value['course_name'].',';
                        ?>
                        <li><?= $value['course_name'] ?></li>
                    <?php } ?>
                </ul>
            </div>
            <div class="book-time">
                <ul>
                    <?php
                    foreach ($book_arr['hour_list'] as $value) {
                        $liTime = 0;
                        ?>
                        <li><?php
                            $arr = (explode(":", $value));
                            ?>
                            <span><?= $arr[0] ?></span><span>:<?= $arr[1] ?></span><span></span>
                        </li>
                    <?php
                        $liTime = $value;
                    }
                    ?>
                    <li>
                        <?php
                        $arr = (explode(":", $liTime));
                        $arr[0]=$arr[0]+1;
                        $arr[0] >= 24 ? ($arr[0]-24) :$arr[0];
                        ?>
                        <span><?= $arr[0] ?></span><span>:<?= $arr[1] ?></span><span></span>
                    </li>
                </ul>
            </div>
            <div id="wrapper">
                <div id="scroller">
                    <div class="book-list">
                            <?php
                            $book = $book_arr['goods_list'];
                            foreach ($book AS $key => $v) {
                                ?>
                                <ul>
                                    <?php
                                if (!empty($v['items']) && is_array($v['items'])) {
                                    foreach ($v['items'] AS $kk => $hv) {
                                        $status = '2';
                                        $price = 0;
                                        $hour = '9';
                                        $realHour = '';
                                        $realEndHour = '';
                                        $goods_id = '0';
                                        if (!empty($hv)) {
                                            $hours = explode(',', $hv);
                                            $goods_id = empty($relayDenied) ? $hours[0] : 0;
                                            $realTime = explode(':', $hours[1]);
                                            $hour = $realTime[0];
                                            $realHour = $hours[1];
                                            $realEndHour = ($hour + 1) . ':' . $realTime[1];
                                            $price = $hours[2];
                                            $status = empty($relayDenied) ? $hours[3] : 1;
                                        }
                                        if ($status == '0') {
                                            $class = 'available';
                                        } else {
                                            $class = 'disable';
                                        }
                                        $group_ids = '';
                                        if (!empty($v['group_list'])) {
                                            foreach ($v['group_list'] AS $gv) {
                                                $group_hours = explode(",", $gv['goods_ids']);
                                                if (in_array($goods_id, $group_hours)) {
                                                    $group_ids = $gv['goods_ids'];
                                                    break;
                                                }
                                            }
                                        }
                                        
                                        ?>
                                        <li goodsid="<?= $goods_id ?>" price="<?= $price ?>"
                                            content="<?= $realHour . '-' . $realEndHour . ' ' . $v['course_name'] ?>"
                                            course_content="<?= $v['course_name'] . ',' . $hour . ',' . $price . ',' . $realHour . '-' . $realEndHour ?>"
                                            id="block_<?= $goods_id ?>"
                                            group_ids="<?= $group_ids ?>" class="<?= $class ?>">
                                            <?php
                                            if ($isUserCard && !in_array(UTM_SOURCE, Config::$source4Nothing)) {

                                            } else {
                                                ?>
                                                ￥<em><?= $price ?></em>
                                                <?php
                                            }
                                            ?>
                                        </li>
                                        <?php
                                    }
                                } ?>
                                </ul>
                                <?php
                                }
                            ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="book-order mobile-qq-book">
            <ul class="book-tip">
                <li>
                    <div></div>
                    <div>可预订</div>
                </li>
                <li>
                    <div></div>
                    <div>已售完</div>
                </li>
                <li>
                    <div></div>
                    <div>我的预订</div>
                </li>
            </ul>
            <ul class="book-orderinfo hide">
            </ul>
            <div class="book-submit<?php echo empty($relayDenied) ? ' J_submit' : ' relay_denied';?>">
                <div><?php echo !empty($relayDenied) ? '无法预订' : '请选择场地'?></div>
                <?php
                if (isset($isUserCard) && $isUserCard == 0 && isset($last_act) && !empty($last_act) && empty($relayDenied)) {
                    ?>
                    <div><?= $last_act ?></div>
                    <?php
                }
                ?>
            </div>
        </div>
    </div>
    <div class="book-headTip">Tips： 本场预订以两小时为单位，请尽量保持场次连续。</div>

    <div class="book-noPaySprite hide">
        <?php
        if (isset($due_data) && !empty($due_data) && isset($due_data['order']['order_status']) && $due_data['order']['order_status'] == 0 && $due_data['count'] > 0) {
            ?>
        <ul>
            <li>您尚有未支付的订单</li>
            <li>
                <p><?=$due_data['order']['name']?></p>
                <?php
                if (in_array($due_data['order']['order_type'], array(0, 10)) || $due_data['order']['order_type'] == 3) { ?>
                    <p><span>日期：</span>
                        <span>
                            <?php
                            $bookDateTime = isset($due_data['order']['goods_list'][0]['book_date']) ? strtotime($due_data['order']['goods_list'][0]['book_date']) : 0;
                            if($bookDateTime){
                                echo date('Y年m月d日', $bookDateTime);
                                $p = date('w', $bookDateTime);
                                echo '(周' . $weekarray[$p] . ')';    
                            }                            
                            ?>
                        </span>
                    </p>
                    <p><span>场地：</span>
                    <span>
                        <?php foreach ($due_data['order']['goods_list'] as $value) { ?>
                            <em><?php
                                echo date('H:i', $value['start_time']) . '-';
                                echo date('H:i', $value['end_time']) . '&nbsp;&nbsp;';
                                echo $value['course_name'] . '&nbsp;&nbsp;';
                                if($due_data['order']['order_type']!=3) echo $value['shop_price'].'元';
                                ?>
                            </em>
                        <?php } ?>
                    </span>
                    </p>
                    <?php if($due_data['order']['order_type']!=3){ ?>
                        <p><span>总计：</span>
                        <span><?= $due_data['order']['order_amount'].'元' ?></span></p>
                    <?php } ?>

                    <?php
                } else if ($due_data['order']['order_type'] == 1) { ?>
                    <p><span>套餐：</span>
                    <span>
                    <?= $due_data['order']['goods_list'][0]['goods_name'] ?>
                    </span>
                </p>
                    <p><span>数量：</span>
                    <span>
                    <?= $due_data['order']['goods_list'][0]['goods_number'] ?>
                    </span>
                    </p>
                    <p><span>总计：</span>
                        <span><?= $due_data['order']['order_amount'].'元' ?></span></p>
                    <?php
                }
                ?>

            </li>
            <li>
                <div id="book-Cancel" order_id="<?=$due_data['order']['order_id']?>">取消订单</div>
                <a id="book-href" order_id="<?=$due_data['order']['order_id']?>"  data-href="<?= baf_CHtml::createUrl('/order/pay?id='.$due_data['order']['order_id']);?>"><div id="book-pay">立即支付</div></a>
            </li>
        </ul>
        <?php } ?>
    </div>

    <?php } else {
        echo '<div style="text-align:center;"><img src="/themes/qu/images/nodata.png" alt="无相关数据"/><br /><br />
		<p>暂无可预订场次，请返回</p></div>';
    } ?>
    <div class="toast hide">
        <div class="toast-alert">
            <div class="toast-msg"></div>
        </div>
    </div>
    <div id="modalContent" style="display:none;">
        <form action="<?= baf_CHtml::createUrl('/order/Confirm');?>" method="GET" class="J_payConfirm">
            <div class="court-tips">
                <ul style="position: fixed; top:100px; left:0;">
                </ul>
                <input type="hidden" name="allcourse_name" value="<?php echo isset($allCourse_name)?$allCourse_name:''?>">
                <input value="" class="J_goodsIds" name="goods_ids"/>
                <input type="hidden" id="book_date" value="<?php echo $datetime; ?>" name="book_date"/>
                <input type="hidden" value="<?php if (isset($book_arr['name'])) {
                    echo $book_arr['name'];
                } ?>" name="court_name"/>
                <input type="hidden" value="<?php if (isset($book_arr['category_name'])) {
                    echo $book_arr['category_name'];
                } ?>" name="category_name"/>
                <input type="hidden" value="<?php echo isset($businessId)?$businessId:''; ?>" name="bid"/>
                <input type="hidden" value="<?php echo isset($catId)?$catId:'' ?>" name="cid"/>
                <input type="hidden" value="<?php echo isset($book_arr['order_type'])?$book_arr['order_type']:'' ?>" name="order_type"/>
                <?php echo  baf_CHtml::createHidden();?>
		<input type="hidden" value="<?php echo isset($book_arr['is_relay']) ? $book_arr['is_relay'] : 0;?>" name="relay"/>
                <?php if (isset($card)) { ?>
		                    <input type="hidden" value="1" name="card"/>
	        <?php } ?>
            </div>
        </form>
    </div>
    <div style="display: none;">
        <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();                
        </script>
    </div>
    <?php if(!empty($relayDenied)){ ?>
    <script type="text/javascript">
        function relayDeniedTips(){
            showToast('抱歉，该场馆暂时无法提供服务，请预订其他场馆。');
        }
        $('.relay_denied').click(function(){
            relayDeniedTips();
        });
        $(function(){
            window.setTimeout(function(){relayDeniedTips();},1000);
        })
    </script>
    <?php } ?>
    <script src="/themes/qu204/court/book/js/courtBook.js?v=20161111"></script>
    <script src="/themes/qu204/court/book/js/book.js?v=20161111"></script>
<?php $this->display('public/footer_202.php');?>