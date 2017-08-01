<?php $this->display('public/header201.php'); ?>
    <link href="/themes/qu201/css/qu_detail.css" type="text/css" rel="stylesheet">
    </head>
    <style>
        .book li .date{padding-right:0;}
    </style>
    <body data-design-width="750">
<div id="loading" data-lock="1" class="loading">
    <div class="loading-icon"></div>
</div>
<div class="detail-main">
    <!-- 头部 -->
    <div class="header">
        <div class="left"></div>
        <div class="center">场馆详情</div>
        <div class="right hide"></div>
    </div>
    <!-- end -->
    <!-- 脸部 -->
    <?php if (!empty($detail)) { ?>
        <div class="face borderBottom1px">
            <div class="face-l">
                <div style="background-image:url('<?php echo isset($galleryArr[0]['img_url']) ? $galleryArr[0]['img_url'] : '/themes/qu/images/default.jpg'?>')" data-title="<?= $detail['name'] ?>" class="face-photo">
                    <div class="hide">
                        <?php
                        if(empty($galleryArr)) echo '<img data-big-src="/themes/qu/images/default.jpg" title="">';
                        foreach ($galleryArr as $glr) { ?>
                            <img data-big-src="<?= $glr['img_url'] ?>" title="<?= $glr['img_title'] ?>">
                        <?php } ?>
                    </div>
                    <span><?=count($galleryArr)?></span>
                </div>
            </div>
            <div class="face-r">
                <div class="face-name"><?php echo isset($detail['name']) ? $detail['name'] : '场馆详情'; ?></div>
                <!-- 评分 -->
                <?php if (isset($detail['comment_avg']) && $detail['comment_avg'] > 0) { ?>
                <div class="face-stars">
                    <div data-point="<?php echo isset($detail['comment_avg']) ? $detail['comment_avg'] : ''; ?>"
                         data-showpoint="true" data-full-src="/themes/qu201/images/qu_detail/fullstar.png"
                         data-empty-src="/themes/qu201/images/qu_detail/emptystar.png" class="detail-stars"></div>
                </div>
                <?php } ?>
                <!-- 评分end -->
                <div class="face-msg hide">信息</div>
            </div>
            <?php if (!empty($detail['notice'])) {?>
                <div class="venues-msg borderTop1px"><?php echo $detail['notice'] ;?></div>
            <?php } ?>
        </div>
        <!-- end -->
        <!-- 项目栏 -->
        <div class="event-bar borderBottom1px">
            <ul>
                <?php
                if (isset($detail['categories'])) {
                    foreach ($detail['categories'] as $k => $v) {
                        ?>
                        <li><a href="<?= baf_CHtml::createUrl('?cid='.$v['category_id'].'&id='.$detail['business_id']);?>"
                               <?php if ($cid == $v['category_id']){ ?>class="cur"<?php } ?>><?= $v['category_name'] ?></a>
                        </li>
                    <?php }
                } ?>
            </ul>
        </div>
        <!-- end -->
        <!-- 人次 -->
        <?php
        if (is_array($detail['book']) && !empty($detail['book'])) {
            if ($detail['order_type'] == 1) {
                if ($detail['can_order'] == 1) {
                    foreach ($detail['book'] as $goods) {
                        ?>
                        <div
                            data-href="<?= baf_CHtml::createUrl('/person/detail?id='.$goods['goods_id'].'&court_name='.$detail['name'].'&from=1');?>"
                            class="person-card">
                            <div class="title"><?= $goods['goods_name'] ?></div>
                            <div class="msg"><?= $goods['description'] ?></div>
                            <div class="price"><?php if ($goods['promote_price'] > 0) { ?>
                                    <span class="newPrice">￥<?= (int)$goods['promote_price'] ?></span><span
                                        class="oldPrice">￥<?= (int)$goods['price'] ?></span>
                                <?php } else { ?>
                                    <span class="newPrice">￥<?= (int)$goods['price'] ?></span>
                                <?php } ?>
                            </div>
                            <?php
                            $price = floatval($goods['promote_price'] > 0 ? $goods['promote_price'] : $goods['price']);

                            $hac = md5(CURRENT_TIMESTAMP . $goods['goods_id'] . $goods['goods_name'] . $price . $goods['goods_number'] . $goods['name'] . ENCODE_KEY);
                            $params = array(
                                'id' => $goods['goods_id'],
                                'name' => $goods['goods_name'],
                                'num' => $goods['goods_number'],
                                'price' => $price,
                                'court_name' => $goods['name'],
                                't' => CURRENT_TIMESTAMP,
                                'h' => $hac
                            );
                            ?>
                            <?php if ($goods['goods_number'] > 0) { ?>
                                <a data-href="<?= baf_CHtml::createUrl('/order/ConfirmPerson?'.http_build_query($params).'&from=1');?>"
                                   class="buy">立即购买</a>
                                <?php
                            } else { ?>
                                <a class="buy disable">暂时售完</a>
                            <?php } ?>
                        </div>
                        <!-- end -->
                        <!-- 一周预定 -->
                        <?php
                    }
                } else {
                    ?>
                    <div class="disable-book">在线预订尚未开通，敬请期待！</div>
                    <?php
                }
            } else if ($detail['order_type'] == 0 && $detail['can_order'] == 1) { ?>
                <div class="book NMSlider borderBottom1px">
                    <ul>
                        <?php $weekarray = array("日", "一", "二", "三", "四", "五", "六");
                        foreach ($detail['book'] as $k => $book) { ?>
                            <li class="borderBottom1px">
                                <div
                                    class="date"><?= date("m", $book['book_date']) . '月' . date("d", $book['book_date']) . '日' ?></div>
                                <div class="weekday">
                                    <?php if ($book['book_date'] == strtotime(date('Y-m-d'))) { ?>
                                        （今天）
                                    <?php } else {
                                        $p = date('w', ($book['book_date']));
                                        echo '（周' . $weekarray[$p] . '）';
                                    } ?>
                                </div>
                                <?php if ($book['surplus_count'] > 0) { ?>
                                    <a class="booking"
                                       href="<?= baf_CHtml::createUrl('/court/book?bid='.$detail['business_id'].'&t='.$book['book_date'].'&cid='.$detail['category_id'].(isset($card) ? '&card=1' : ''));?>">预订</a>
                                <?php } else { ?>
                                    <a class="booking disable" href="javascript:void(0);">预订</a>
                                <?php } ?>
                            </li>
                        <?php } ?>
                        <?php if (count($detail['book']) > 3) { ?>
                            <li class="more-date"><i
                                    style="width:0.15rem;margin-right: 2px;background-size: cover;-webkit-background-size: cover;height: 0.1rem;display: inline-block;background-image:url('/themes/qu201/images/qu_detail/arr.png')"></i>查看更多日期
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            <?php } else { ?>
                <!-- end -->
                <!-- 未开通 -->
                <div class="disable-book">在线预订尚未开通，敬请期待！</div>
                <!-- end -->
            <?php }
        } else { ?>
            <div class="disable-book">在线预订尚未开通，敬请期待！</div>
        <?php } ?>
        <!-- 电话与地址 -->
        <div class="normassage borderBottom1px">
            <a class="phone borderBottom1px" href="tel:<?php echo isset($detail['telephone']) ? $detail['telephone'] : ''; ?>">
                <span><?php echo isset($detail['telephone']) ? $detail['telephone'] : ''; ?></span>
                <i class="icon-phone"><img data-src="/themes/qu201/images/qu_detail/icon-phone.png"></i>
                <i class="icon-right"><img data-src="/themes/qu201/images/qu_detail/icon-right.png"></i>
            </a>
            <div data-href="<?= baf_CHtml::createUrl('/court/map?id='.$detail['business_id'].'&cid='.$detail['category_id'].'&is_park=0');?>"
                 class="location">
                <span><?php echo isset($detail['address']) ? $detail['address'] : ''; ?></span>
                <i class="icon-location"><img data-src="/themes/qu201/images/qu_detail/icon-location.png"></i>
                <a href="<?= baf_CHtml::createUrl('/court/map?id='.$detail['business_id'].'&cid='.$detail['category_id'].'&is_park=0');?>"> <i
                        class="icon-right"><img
                            data-src="/themes/qu201/images/qu_detail/icon-right.png"></i></a>
            </div>
        </div>
        <?php if ($detail['price_image']) { ?>
            <div class="price-list borderBottom1px borderTop1px">
                <div class="title borderBottom1px">价目表</div>
                <div class="inner"><img data-src="<?php echo $detail['price_image']; ?>"></div>
            </div>
        <?php } ?>
    <?php } ?>
    <!-- end -->
    <!-- 运动圈 -->
    <?php if (!empty($topicArr)) { ?>
        <div class="qu-zone borderBottom1px borderTop1px">
            <div class="qu-zone-title borderBottom1px"><span
                    class="colorBlue"><?php echo isset($topicArr['coterie_name']) ? mb_substr($topicArr['coterie_name'], 0, 20, 'UTF-8') : ''; ?></span>
                <i class="icon-quzone"><img data-src="/themes/qu201/images/qu_detail/icon-quzone.png"></i><i
                    class="icon-right"><img data-src="/themes/qu201/images/qu_detail/icon-right.png"></i></div>
            <div class="qu-zone-msg"><!-- 运动圈图片和评论 --><?php if (isset($topicArr['thumb_url'])) { ?><img id="quzoneImg"
                                                                                                        src="<?= $topicArr['thumb_url']; ?>" /><?php } ?>
                <?php echo isset($topicArr['content']) ? $topicArr['content'] : ''; ?></div>
        </div>
    <?php } ?>
    <!-- end -->
    <!-- 场馆基本的信息 -->
    <?php if (!empty($detail['facility_list_image'])) { ?>
    <div class="facilities borderBottom1px borderTop1px">
            <!-- 运动设施 -->
            <?php
            $last_count = 1;
            foreach($detail['facility_list_image'] as $fc){ ?>
                <div class="sport-facilities borderBottom1px">
                    <!-- 相册封面和图片数 -->
                    <?php if (count($galleryArr) > 0 && isset($fc['image_count']) && $fc['image_count'] > 0) { ?>
                        <div style="background-image:url('<?= $fc['thumb_url'] ?>')"
                             data-index="<?=$last_count?>" data-title="<?=$fc['name']?>" class="l album">
                            <span><?= $fc['image_count'] ?></span>
                        </div>
                    <?php } ?>
                    <div class="r">
                        <div class="title"><?=$fc['name']?></div>
                        <div class="info">
                            <?php
                            foreach ($fc['list'] as $k => $f) {
                                if ($k != 0) echo '、';
                                echo $f;
                            } ?>
                        </div>
                    </div>
                </div>
                <?php $last_count=$fc['image_count']+1?>
            <?php } ?>
    </div>
    <?php } ?>
    <!-- 场馆基本的信息end -->
<!-- 更多信息 -->
<?php if (!empty($detail['service_list'])) { ?>
    <div class="information borderBottom1px borderTop1px">

        <?php
        $classArray = array('交通信息' => 'traffic', '场地设施' => 'facilities', '场馆服务' => 'serve');
        foreach ($detail['service_list'] as $k => $v) {
            ?>
            <div class="info-<?= $classArray[$v['title']] ?> <?php if ($k == 0) { ?>borderBottom1px<?php }
            if ($k == count($classArray) - 1) { ?>hide borderTop1px<?php } ?>">
                <div class="title">
                    <i class="icon-<?= $classArray[$v['title']] ?>"> <img
                            data-src="/themes/qu201/images/qu_detail/icon-<?= $classArray[$v['title']] ?>.png"></i>
                    <span><?= $v['title'] ?></span>
                </div>
                <ul>
                    <?php foreach ($v['list'] as $info) { ?>
                        <li <?php if (isset($info['is_park']) && $info['is_park'] == '1') { ?>
                            data-href="<?= baf_CHtml::createUrl('/court/map?id='.$detail['business_id'].'&cid='.$detail['category_id'].'&is_park=1');?>" class="map-stop"
                        <?php } ?>>
                            <div class="l"><?= $info['name'] ?></div>
                            <div class="r"><?= $info['content'] ?>
                                <?php if (isset($info['is_park']) && $info['is_park'] == '1') { ?>
                                    <a href="<?= baf_CHtml::createUrl('/court/map?id='.$detail['business_id'].'&cid='.$detail['category_id'].'&is_park=1');?>">
                                        <i
                                            class="icon-right" style="-webkit-transform: translateY(0.05rem);"><img
                                                data-src="/themes/qu201/images/qu_detail/icon-right.png"></i></a>
                                <?php } ?>
                            </div>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        <?php } ?>
    </div>
<?php } ?>
<?php if (count($detail['service_list']) >= 3) { ?>
    <div class="more-info borderBottom1px"><i style="width:0.15rem;margin-right: 2px;-webkit-background-size: cover;background-size: cover;height: 0.1rem;display: inline-block;background-image:url('/themes/qu201/images/qu_detail/arr.png')"></i>查看更多...</div>
<?php } ?>
</div>
<!-- 更多信息end -->
<!-- 用户评价 -->
<?php if (!empty($comArr)) { ?>
    <div class="user-comment borderBottom1px borderTop1px">
        <div class="title borderBottom1px">用户评价</div>
        <!-- 评论列表 3li -->
        <ul class="user-comment-ul">
            <?php foreach ($comArr as $k => $val) { ?>
                <li class="user-comment-li borderBottom1px">
                    <div class="avatar"><i
                            style="background-image:url('<?=$val['avatar'] ? $val['avatar'] : '/themes/qu201/images/avatar.png' ?>')"></i>
                    </div>
                    <div class="msg"><?= isset($val['content']) ? $val['content'] : ''; ?>
                        <div data-point="<?php echo isset($val['comment_rank']) ? $val['comment_rank'] : 0; ?>"
                             data-showpoint="false" data-full-src="/themes/qu201/images/qu_detail/fullstar.png"
                             data-empty-src="/themes/qu201/images/qu_detail/emptystar.png" class="detail-stars"></div>
                        <div
                            class="date"><?php echo isset($val['create_time']) ? date('Y年m月d日 H:i ', $val['create_time']) : ''; ?></div>
                    </div>
                    <!-- 评论相册 data-src是小图 data-big-src是大图 -->
                    <?php if (!empty($val['image_list'])) { ?>
                        <div class="photo">
                            <ul class="photo-ul">
                                <?php foreach ($val['image_list'] as $img) { ?>
                                    <li class="photo-li"><img
                                            data-src="<?php echo isset($img['thumb_url']) ? $img['thumb_url'] : '' ?>"
                                            data-big-src="<?php echo isset($img['image_url']) ? $img['image_url'] : '' ?>">
                                    </li>
                                <?php } ?>
                            </ul>
                        </div>
                    <?php } ?>
                </li>
            <?php } ?>
        </ul>
        <?php if($detail['comment_count']>3){?>
        <a href="<?= baf_CHtml::createUrl('/court/comment?business_id='.$detail['business_id']);?>" class="more">查看全部评价（<?php echo isset($detail['comment_count']) ? $detail['comment_count'] : ''; ?>条）</a>
        <?php } ?>
    </div>
<?php } ?>
<!-- 用户评价end -->
<div class="nm-photo-album hide">
    <div class="title-bar">
        <div class="close"><i class="icon-back"></i></div>
        <div class="title"></div>
        <div class="number"><span class="index">1</span>/<span class="totle">1</span></div>
    </div>
</div>
<div class="nm-cover hide">
    <div class="nm-alert phone hide">
        <div class="msg borderBottom1px">是否拨打电话<br/>4000-410-480</div>
        <div class="l borderRight1px cancel">取消</div>
        <div data-phone="4000410480" class="r telephone">确定</div>
    </div>
    <div class="nm-alert download hide">
        <div class="msg borderBottom1px">下载趣运动APP<br/>可查看场馆动态</div>
        <div class="l borderRight1px cancel">我知道了</div>
        <div class="r downloadapp colorBlue">下载趣运动</div>
    </div>
</div>
<script src="/static/js/zeptoWithFx.min.js"></script>
<script src="/static/js/mobileResponsive.js"></script>
<script src="/themes/qu201/js/qu_detail_es5.min.js?ver=2016021701"></script>
<?php $this->display('public/footer.php'); ?>