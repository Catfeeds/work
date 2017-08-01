<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>我的等级</title>
    <link rel="stylesheet" href="/static/appwebview/mylevel2/stylesheets/mylevel2.css">
</head>

<body data-design-width="750" data-score="<?php echo $grade['my_level']['rules_growth'];?>" data-level="<?php echo $grade['my_level']['rules_level'];?>" data-score-start="<?php echo $grade['my_level']['rules_need_growth'];?>" data-score-end="<?php echo $grade['my_level']['rules_next_growth'];?>">
    <section id="loading" data-lock="0" class="loading">
        <div class="loading-icon"></div>
    </section>
    <section class="mylevel-main hide">
        <div class="part-one part">
            <div data-src="url(/static/appwebview/mylevel2/images/newavatar/avatar_@3x.png)" class="medal use-background"><div data-src="url(<?php echo $grade['user_info']['avatar'];?>)" class="avatar use-background"></div></div>
            <p class="icon-level"><img data-src="/static/appwebview/mylevel2/images/mylevel_<?php echo $grade['my_level']['rules_level'];?>_@3x.png"><span class="icon-level-title"><?php echo $grade['my_level']['rules_title'];?></span></p>
            <div class="level-bar">
                <div class="level-bar-inner"></div>
                <div class="level-bar-text"><span class="cur"><?php echo $grade['my_level']['rules_title'];?></span><span><?php echo $grade['my_level']['rules_next_title'];?></span></div>
                <div class="level-bar-num"><span class="myscore">0</span><span class="fixedscore">/2400</span></div>
            </div>
            <div class="level-info"><a href="<?= baf_CHtml::createUrl('/usergrade/intro');?>">等级说明&nbsp;<img data-src="/static/appwebview/mylevel2/images/icon_question_@3x.png"></a></div>
        </div>
        <div class="cloud"><img data-src="/static/appwebview/mylevel2/images/mylevel_cloud_@3x.png"></div>
        <div class="part-two part">
            <div class="line"><span>我的特权</span></div>
            <div class="power">
              <?php foreach ($grade['parse_power'] as $item) { ?>
                <?php if(($item['is_show']) == 1 ){ ?>
                <div data-power-title="<?php echo $item['power_title'];?>" data-explain="<?php echo $item['explain'];?>" data-stint="<?php echo $item['stint'];?>" data-power-id="<?php echo $item['power_id'];?>" class="icon"><img data-src="/static/appwebview/mylevel2/images/<?php echo $item['power_id'];?>_true_@3x.png">
                    <br><span><?php echo $item['short_name'];?></span></div>
                <?php }?>
              <?php }?>
            </div>
            <?php if(!empty($grade['next_power'])){ ?>
            <div class="line"><span>即将解锁<i><?php echo $grade['my_level']['rules_update_prompt'];?></i></span></div>
            <?php }?>
            <div class="power">
              <?php foreach ($grade['next_power'] as $item) { ?>
                
                  <?php if(($item['is_show']) == 1 ){ ?>
                  <div data-power-title="<?php echo $item['power_title'];?>" data-explain="<?php echo $item['explain'];?>" data-stint="<?php echo $item['stint'];?>" data-power-id="<?php echo $item['power_id'];?>" class="icon"><img data-src="/static/appwebview/mylevel2/images/<?php echo $item['power_id'];?>_false_@3x.png">
                    <br><span><?php echo $item['short_name'];?></span></div>
                  <?php }?>
                
              <?php }?>
            </div>
            <p class="more"><a href="<?= baf_CHtml::createUrl('/usergrade/intro').'#tq';?>">更多特权></a></p>
        </div>
        <div class="part-tree part">
          <div class="line"><span>近期成长记录</span></div>
            <?php if(empty($grade['sport_record'])){ ?>
            <p class="empty">记录空空如也~</p>
            <?php } else{?>
              <ul id="historyUl">
                <?php $countGrade = count($grade['sport_record']);foreach ($grade['sport_record'] as $t) { ?>
                <li>
                <span class="date"><?php echo $t['add_date'];?></span><span class="desc"><?php echo $t['remark'];?></span><span class="msg <?php if($t['type'] == 1) echo 'cur';?>"><?php echo $t['type']>0?'-':'+';?><?php echo $t['growth'];?></span>
                </li>
                <?php }?>
              </ul>
              <?php if ($countGrade >= 3){ ?>
                <p class="more"><a href="<?= baf_CHtml::createUrl('/usergrade/sportrecord?user_id='.$user_id);?>">更多记录&gt;</a></p>                          
            <?php }}?>
        </div>
    </section>
    <section class="cover hide">
        <div class="info-box info-box-start hide">
            <div class="info-close"><img data-src="/static/appwebview/mylevel2/images/icon_close_@3x.png"></div>
            <div class="info-icon"><img data-src=""></div>
            <p class="info-title power-title">积分光环</p>
            <p class="explain">积分光环</p>
            <p class="info-title">获得门槛</p>
            <p class="stint">积分光环</p>
        </div>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/mylevel2/js/mylevel2.js"></script>
</body>

</html>
