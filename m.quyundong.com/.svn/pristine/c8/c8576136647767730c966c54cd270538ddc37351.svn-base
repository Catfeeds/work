<?php $this->display('public/header_205.php');?>
    <script src="/static/activity/comment/js/lrz/dist/lrz.bundle.js"></script>
    <link rel="stylesheet" href="/static/activity/comment/stylesheets/comment.css">

        <section id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </section>
    <section class="main hide"></section>
    <section class="hide" id="waitting"><div class="loading-icon"></div></section>
    <section>
      <div class="header court-header">
        <div class="left"><a onclick="history.back(-1);">取消</a></div>
        <div class="right"> <a id="publish" href="#">发布</a></div>
      </div>
      <div class="delete hide">
        <div class="delete-tc">
          <p>确定要删除吗？</p>
          <ul>
            <li id="ok">确认</li>
            <li id="cancel">取消</li>
          </ul>
        </div>
      </div>
      <textarea style="resize: none;" class="conmenttxt"></textarea>
      <div id="ct-wordsNum">140</div>
      <div class="addpic">
        <ul class="addpic-box"></ul>
        <ul>
          <li name="btn_abc" value="浏览" class="addbtn"></li>
        </ul>
        <input id="imgOne" accept="image/*" type="file" name="imgOne"  value="test" style="display:none " multiple="multiple">
      </div>
      <div class="toast hide">
        <div class="toast-alert">
          <div class="toast-msg"></div>
        </div>
      </div>
      <div id="actAlert" class="act-toast hide">
        <div class="act-toast-alert"></div>
      </div>
    </section>
    <script>
        var msg='<?php if($error['code']!='0000'){
            echo $error['msg'];
        } ?>';
        var status='<?php if($error['code']!='0000'){
            echo $error['code'];
        } ?>';
        var redirect_url='<?php if(!empty(isset($error['data']['redirect_url']))){
            echo $error['data']['redirect_url'];
        } ?>';
        if(redirect_url){
            window.location.href = redirect_url;
        }
        var cat_id = "<?php echo $act_id; ?>";
        var cat_type = 0;
    </script>
    <!--<script src="/static/js/zeptoWithFx.min.js"></script>-->
    <script src="/static/js/jquery-1.12.0.min.js"></script>
    <script src="/static/activity/comment/js/comment_es5.js?ver=20161111"> </script>
<?php $this->display('public/footer.php');?>
