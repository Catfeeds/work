<?php $this->display('public/header201.php'); ?>
 <link rel="stylesheet" href="/static/activity/index/stylesheets/index.css">
  </head>
  <body data-design-width="750" data-act_id='<?=$_GET['id']?>'>
    <section id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
      <!-- 分享标题 图片 描述 -->
   <div id="wxtitle" class="hide"><?php echo $data['share_title']; ?></div>
      <div id="wximgUrl" class="hide"><?php echo $data['share_img']; ?></div>
      <div id="wxdesc" class="hide"><?php echo $data['share_description']; ?></div>
      <div id="wxlink" class="hide"><?php echo $data['sort_url']; ?></div>
      <script src="/static/js/jweixin-1.0.0.js"></script>
      <script src="/static/js/weixinshareurl.js"></script>
    </section>
    <section class="main hide" id='main'>
      <div class="act-banner"><img src="<?php echo $data['act_banner'];  ?>"></div>
      <div class="act-footer hide" style="max-width: 750px;left: 50%;-webkit-transform: translateX(-50%);">
        <a id="actButton" class="act-button">我要参与</a>
      </div>
      <div class="act-count">
          <?php if($count) :?>
        <div class="l" id="lcount">

          <div class="t"><i class='icon icon-join'><img src='/static/activity/index/images/icon-join.png'></i><span id="count"><?= $count ?></span></div>
          <div class="b">评论数</div>
        </div>
        <div class="c">
          <div class="t">&nbsp;</div>
          <div class="b">&nbsp;</div>
        </div>
         <?php endif?>
        <div class="r">
          <div class="t"><i class='icon icon-read'><img src='/static/activity/index/images/icon-read.png'></i><?php echo $data['read_number']; ?></div>
          <div class="b">阅读次数</div>
        </div>
      </div>
      <div class="act-main">
        <?php if ($grodata && count($grodata) > 1): ?>
        <div class="act-group">
        <div class="l-btn"><i class='icon-arrow'><img class='b' src='/static/activity/index/images/icon-arrow-l-b.png'><img class='d' src='/static/activity/index/images/icon-arrow-l-d.png'></i></div>
        <div class="center">
          <div class="slide-bar">
           <?php foreach ($grodata as $k => $val):
             $cur = '';
             if($val['act_id'] == $data['act_id'])
                $cur = 'cur';
          ?>
            <div class="slide-bar-item <?php echo $cur; ?>"><a style="text-decoration: none;" href="<?= baf_CHtml::createUrl('/activitycommon/detail?id='.$val['act_id']);?>"><span><?php echo $val['act_group_name'] ?></span></a>  </div>
          <?php  ?>
           <?php endforeach; ?>
          </div>
        </div>
        <div class="r-btn"><i class='icon-arrow'><img class='b' src='/static/activity/index/images/icon-arrow-r-b.png'><img class='d' src='/static/activity/index/images/icon-arrow-r-d.png'></i></div>
        </div>
      <?php endif; ?>
        <!-- context 里面插入内容 -->
        <div id="context" class="act-context">
           <?php echo $data['act_description']; ?>
           <script>
            var urlMsg = getURLInformation();
                  var gosportList = Array.prototype.slice.call(document.querySelectorAll('.gosport'));
                  var webAboutList = Array.prototype.slice.call(document.querySelectorAll('.web-about'));

                  if(urlMsg.gosport !== undefined){
                    webAboutList.forEach(function (item) {
                      item.className = 'gosport hide';
                    })
                  }else{
                    gosportList.forEach(function (item) {
                      item.className = 'web-about hide';
                    })
                  }
                function getURLInformation(){
                  var urlMsg = {};
                  if(window.location.href.split('#')[0].split('?')[1]){
                    var urlSearch = window.location.href.split('#')[0].split('?')[1].split('&');
                  }

                  if(urlSearch){
                    for(var i = 0 ; i < urlSearch.length ; i++){
                      urlMsg[urlSearch[i].split('=')[0]] = urlSearch[i].split('=')[1] || "";
                    }
                  }
                  return urlMsg;
                }
           </script>
        </div>
       <?php if ($join && $data['is_show_join_num']): ?>
      <div class="act-quota">
        <div class="inner">
          所剩名额:<span class='sp'><?php echo $join['remain']; ?></span>
          /<span class='sm'><?php echo $join['limitNum']; ?>位</span>
        </div>
      </div>
    <?php endif; ?>
    <?php if($count) : ?>
       <div class="act-comment">
          <div class="cm-title">
            <h1>评论</h1>
          </div>
        </div>
        <div id="scroller">
          <ul id="srList" class="sr-list">
            <span id="alMore">加载更多评论中。。。
            </span>
          </ul>
        </div>
        <!-- <div data-title="评论图片" class="photo">
        <ul class="photo-ul"></ul>
      </div> -->
        <div class="nm-photo-album hide">
          <div class="title-bar">
            <div class="close"><i class="icon-back"></i></div>
            <div class="title"></div>
            <div class="number"><span class="index">1</span>/<span class="totle">1</span></div>
          </div>
        </div>
        <?php endif ?>
    </div>
      </div>
      <div class="toast hide">
        <div class="toast-alert">
          <div class="toast-msg"></div>
        </div>
      </div>
      <div id="actAlert" class="act-toast hide">
        <div class="act-toast-alert">
          <div id="actAlertMsg" class="act-toast-msg">活动已经结束</div>
        </div>
      </div>
    </section>
    <script src="/static/js/gsloginSync.js?v=201611191643"></script>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/activity/index/js/index_es5.js?ver=201611191543"></script>
    <?php if($count) : ?>
    <script src="/static/activity/index_sec/js/index_sec_es5.js?ver=201611192543"></script>
    <script>
      var relation_id = '<?php echo $act_id; ?>';
      var page= '1';
      var page_size = '5';
      var comment_type = '0';
    </script>
    <?php endif ?>
<?php $this->display('public/footer.php'); ?>
