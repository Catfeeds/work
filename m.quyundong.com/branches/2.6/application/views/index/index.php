<?php $this->display('public/header201.php'); ?>
    <link rel="stylesheet" href="/themes/qu201/css/web2.css">
    <?php 
    if(CHANNEL_SOURCE=='qqwallet'){
     ?>    
    <link rel="stylesheet" href="/themes/qq/stylesheets/mobile-qq.css">
    <?php } ?>
    <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
    <script type="text/javascript" src="/themes/qu201/js/touchslider.dev.js"></script>
    <script type="text/javascript" src="/themes/qu201/js/web2.js?ver=20161118"></script>
    </head>
    <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="web2 main hide mobile-qq-index" style="min-height:85vh;">
        <div class="web2-coverSprite hide"></div>
        <div class="web2-header mobile-qq-index">
            <div class="web2-headWrap">
                <div class="web2-headCity"><a target="_self" href="<?= baf_CHtml::createUrl('index/city');?>">
                        <?php
                        $city_name = api_CoreHelper::getCookie('city_name');
                        echo !empty($city_name) ? $city_name : '广州';
                        ?><img class='mobile-qq-hide' src="/themes/qu201/images/down.png"><img class='mobile-qq-show-inline' style='display:none;' src="/themes/qq/images/icon-city.png"></a></div>
                <div class="web2-center">
                    <?php 
                    if(!in_array(CHANNEL_SOURCE,Config::$hideItem)){
                    ?> 
                    <a href="<?= baf_CHtml::createUrl('/user');?>"><img src="/themes/qu201/images/center.png"></a>
                    <?php } ?>                    
                </div>
                <form action="<?= baf_CHtml::createUrl('/index/search');?>" class="web2-form">
                    <div class="web2-headSearch">
                        <div class="web2-headSearch-l"></div>
                        <div class="web2-headSearch-r hide">搜索</div>
                        <div class="web2-headSearch-c">
                            <input type="text" placeholder="输入场馆名、地址、商圈" class="web2-searchInput">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="web2-space44"></div>
        <div class="web2-nav">
            <ul id="web2-navSlider">
                <?php foreach ($category_list as $k => $v) { ?>
                    <?php if ($k % 8 == 0) { ?><li><?php } ?>
                    <div>
                        <div style="background-image:url(<?= $v['image_url'] ?>)"><a
                                href="<?= baf_CHtml::createUrl('/court/?cid='.$v['category_id']);?>"><img
                                    src="/themes/qu201/images/web2-point.png" alt=""></a></div>
                        <p><?= $v['category_name'] ?></p>
                    </div>
                    <?php if ($k % 8 == 7) { ?></li><?php } ?>
                <?php } ?>
            </ul>
        </div>
        <?php if(!in_array(UTM_SOURCE,Config::$source4NotDownload) && !in_array(CHANNEL_SOURCE,Config::$source4NotDownload)) { ?>
        <div class="web2-banner mobile-qq-index">
            <a href="<?= baf_CHtml::createUrl('http://www.quyundong.com/d');?>"><img src="/themes/qu201/images/banner/banner-1.jpg" alt=""></a>
        </div>
        <?php }?>
        <?php if(baf_Common::isChannel('decathlon')){ ?>
        <div class="web2-banner mobile-qq-index">
            <a href="https://www.decathlon.com.cn/zh?utm_source=GoSports&utm_medium=social&utm_campaign=hp"><img src="/themes/decathlon/images/decathlon_banner.gif" alt=""></a>
        </div>
        <?php } ?>
        <div class="web2-list">
            <div class="web2-list-title"><span>推荐场馆</span></div>
            <?php if(empty($hot_list)) { ?>
                <p class="web2-noPlace">暂无推荐场馆</p>
            <?php }else{ ?>
            <ul>
                <?php foreach ($hot_list as $k => $v) { ?>
                    <li data-href="<?= baf_CHtml::createUrl('/court/detail?id='.$v['business_id'].'&cid='.$v['category_id']);?>">
                        <div class='preload' data-url="<?= !empty($v['index_image']) ? baf_Common::thumbImage($v['index_image']) : '/themes/qu/images/default.jpg' ?>"></div>                        
                        <div>
                            <p><?php if ($v['is_often']) { ?><img src="/themes/qu201/images/web2-chang.png"> <?php } ?>
                                <span><?= $v['name'] ?></span></p>
                            <p><?= $v['sub_region'] ? '[' . $v['sub_region'] . ']' : '' ?></p>
                            <p><?php if ($v['promote_price'] > 0) { ?>
                                    <span>￥<em><?= (int)$v['promote_price'] ?></em></span>
                                    <span>￥<?= (int)$v['price'] ?></span>
                                <?php } else { ?>
                                    <span>￥<em><?= (int)$v['price'] ?></em></span>
                                <?php } ?>
                                <?php if ($v['order_type'] == 0) { ?>
                                    <i data-href="<?= baf_CHtml::createUrl('/court/book?bid='.$v['business_id'].'&cid='.$v['category_id'].'&t='.strtotime(date('Y-m-d', time())));?>">预订</i>
                                <?php }else{ ?>
                                    <i data-href="<?= baf_CHtml::createUrl('/court/detail?id='.$v['business_id'].'&cid='.$v['category_id'])?>">查看</i>
                                <?php } ?>
                            </>
                        </div>
                    </li>
                <?php } ?>
            </ul>
            <?php } ?>
        </div>
    </div>
    
    <!--  -->
    <?php 
    if(CHANNEL_SOURCE=='qqwallet'){
     ?>
    <script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=18c8a6784a3918605e835562d6ed82c7&s=1"></script>
    <script type="text/javascript" src="/themes/qq/js/city.js?ver=20161111"></script>
    <?php } ?>
    
    <script>
        $(document).ready(function () {
            $('.preload').each(function (index,item) {
                var img = document.createElement('img')
                img.onload = function () {
                    $(item).css({'background-image':"url("+$(item).attr('data-url')+")"})
                }
                img.onerror = function () {
                   $(item).css({'background-image':"url("+$(item).attr('data-url').replace('_thumb_180',"")+")"})
                }
                img.src = $(item).attr('data-url');
            })
        })
    </script>
<?php $this->display('public/footer.php'); ?>