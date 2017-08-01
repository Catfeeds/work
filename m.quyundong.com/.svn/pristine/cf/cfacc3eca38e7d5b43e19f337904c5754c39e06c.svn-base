<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>运动记录</title>
    <link rel="stylesheet" href="/static/appwebview/sporthistory/stylesheets/sporthistory.css?ver=2015111001">
    <style type="text/css">
        #historyUl li .msg{
            color:#eb7823;
        }
        #historyUl li .msg.cur{
            color: #666;
        }
    </style>
</head>
<body data-design-width="750" data-ajax="1" data-page="1" data-total-page="<?php echo !empty($record['total_page']) ? $record['total_page'] : 0; ?>" data-user-id="<?php echo $user_id?>">
    <section id="loading" data-lock="0" class="loading">
        <div class="loading-icon"></div>
    </section>
    <section class="history-main hide">
        <?php if(empty($record['lists'])){ ?>
        <p class="empty">记录空空如也~</p>
        <?php } else{?>
          <ul id="historyUl">
            <?php foreach ($record['lists'] as $t) {?>
            <li>
                <span class="date"><?php echo $t['add_date'];?></span>
                <span class="desc"><?php echo $t['remark'];?></span>
                <span class="msg <?php if($t['type'] > 0) echo 'cur';?>"><?php echo ($t['type']>0?'-' : '+');?><?php echo $t['growth'];?></span>
            </li>
            <?php }?>
          </ul>      
        <?php }?>
    
        <p class="last hide">以上为您的运动记录</p>
        <p class="load-ajax hide"><span class="loading-icon"></span></p>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/sporthistory/js/sporthistory.js?ver=2015111701"></script>
    <script>
    window.onload = function() {

        var loadInterval = setInterval(function() {
            $(".loading").addClass("hide");
            $(".history-main").removeClass("hide");
            if ($(document).height() == $(window).height()) {
                $(".last").removeClass("hide");
            }
            clearInterval(loadInterval);
        }, 500);
    }
    </script>
</body>

</html>
