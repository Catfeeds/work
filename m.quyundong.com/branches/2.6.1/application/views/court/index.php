<?php $this->display('public/header_202.php');?>
    <link href="/themes/qu204/court/list/stylesheets/list.css?v=1.1" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/qu204/js/touchScroll.js"></script>
    <script src="/themes/qu204/court/list/js/list.js?ver=20161118"></script>
</head>

<body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <div class="header mobile-qq-court">
            <div class="left">
            <!-- 是否显示城市选择，显示则无返回按钮 add by chenchao 2017-01-11 -->
            <?php if( in_array(CHANNEL_SOURCE, ExtendConfig::$courtCityList) ){ ?>
            <div class="court-headCity">
                <a target="_self" href="/index/city?cid=<?= isset($category_id) ? $category_id : 1 ?>&utm_source=<?= CHANNEL_SOURCE ?>">
                <?php
                    $city_name = api_CoreHelper::getCookie('city_name');
                    echo !empty($city_name) ? $city_name : '广州';
                ?><img class='mobile-qq-hide' src="/themes/qu201/images/down.png"><img class='mobile-qq-show-inline' style='display:none;' src="/themes/qq/images/icon-city.png"></a></div>
            <?php } else { ?>
			<!-- 宝山暂时不显示返回按钮, 其它的显示返回 -->
			<?php if ( !in_array(CHANNEL_SOURCE, array('baoshan')) ){ ?> 
			<i onclick="history.back(-1);" class="icon-back"></i>
			<?php } } ?>
            </div>
            <div class="center">
                <div class="category_id"><?= isset($category_name) ? $category_name : '' ?></div>
                <div><span class="region_id"><?= !empty($region_name) ? $region_name : '所有区域'; ?></span><span class="sort">推荐排序</span></div>
                <div><img class='mobile-qq-hide' src="/themes/qu204/court/list/images/arrow.png" alt=""><img class='mobile-qq-show-inline' style='display:none;' src="/themes/qq/images/icon-court-list.png" alt=""></div>
            </div>
            <!-- 是否显示个人中心按钮 add by chenchao 2017-01-11 -->
            <?php if( in_array(CHANNEL_SOURCE, ExtendConfig::$courtUserCenter) ){ ?>
            <div class="right court-headUser">
                <a href="<?= baf_CHtml::createUrl('/user');?>"><img src="/themes/qu201/images/center.png"></a>                  
            </div>
            <?php } ?>
        </div>
        

        <input type="hidden" id="category_id" value="<?= isset($category_id) ? $category_id : 1 ?>">
        <input type="hidden" id="region_id" value="<?= !empty($region_id) ? $region_id : 0 ?>">
        <input type="hidden" id="sort" value="0">
        <div class="list-container">
            <div id="wrapper">
                <div id="scroller">
                    <ul class="list-info">
                    </ul>
                </div>
                <p id='isButtom'>上拉加载更多</p>
            </div>
            <div class="list-noItem hide">暂无相关场馆</div>
        </div>
        <div class="list-sprite hide">
            <div class="list-menu">
                <ul id="list-rule">
                    <li id="list-project" class="selected">运动项目</li>
                    <li id="list-area">区域范围</li>
                    <li id="list-sort">排序方式</li>
                </ul>
                <div id="list-selection">
                    <ul data-type="category_id" class="list-project">
                        <?php
                        if (is_array($category_list) && !empty($category_list)) {
                            foreach ($category_list as $value) {
                                ?>
                                <li category_id="<?= $value['category_id'] ?>"><img
                                        src="<?= $value['icon_url'] ?>"/><?= $value['category_name'] ?></li>
                                <?php
                            }
                        }
                        ?>
                    </ul>
                    <ul data-type="region_id" class="list-area hide">
                        <?php
                        if (is_array($region_list) && !empty($region_list)) {
                            foreach ($region_list as $value) {
                                ?>
                                <li region_id="<?= $value['region_id'] ?>"><?= $value['region_name'] ?></li>
                                <?php
                            }
                        }
                        ?>
                    </ul>
                    <ul data-type="sort" class="list-sort hide">
                        <li sort="0">推荐排序</li>
                        <li sort="3">价格最低</li>
                        <li sort="4">价格最高</li>
                        <li sort="5">人气最高</li>
                    </ul>
                </div>
            </div>
        </div>
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
<?php $this->display('public/footer_202.php');?>