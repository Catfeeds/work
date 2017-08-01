<?php
/**
 * 帮助
 */
class HelpController extends DefaultController
{
	/**
	 * 帮助页面
	 */
	public function detailAction()
	{
		$article_id = (int) $this->getParam('id', '0');
		
        $title = '趣运动';
        if ($article_id == '37'){
            $title = '积分规则-趣运动';
            //积分规则
        }else if ($article_id == '38'){
            //代金券使用规则
            if (CHANNEL_SOURCE=='qqwallet'){
                $title = '卡劵说明-趣运动';
            }elseif (CHANNEL_SOURCE=='liaoning'){
                $title = '卡劵说明-辽宁全民健身';
            }else{
                $title = '卡劵说明-趣运动';
            }
        }else if ($article_id == '39'){
            //抽奖规则
            $title = '抽奖规则-趣运动';
        }else if ($article_id == '40'){
            //订单帮助
            $title = '帮助-趣运动';
        }else if ($article_id == '41'){
            //抽奖规则
            $title = '用户协议-趣运动';
        }else if ($article_id == '42'){
            //退款规则
            $title = '退款规则-趣运动';
        }else if ($article_id == '43'){
            //抽奖规则
            $title = '用户余额使用规则-趣运动';
        }else if ($article_id == '44'){
            //抽奖规则
            $title = '会员卡说明-趣运动';
        }
        
		$this->_view->assign(array('title'=>$title,'id'=>$article_id));
	}
}