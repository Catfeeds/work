<?php
class PersonController extends DefaultController
{
	/**
	 * 人次商品详情页
	 *
	 * 注意: 此方法(页面)会被手机端app直接请求展示，不要随意添加参数验证和重定向
	 *      若有需要，请与app同步好
	 *
	 * @return void
	 * @author xiaosibo
	 */
	public function detailAction()
	{
		$goodsId = $this->getParam('id'); // 商品id
		$courtName = $this->getParam('court_name'); // 场馆名称
		$from = $this->getParam('from'); // 用于区分是app请求过来的还是手机网页请求的 (1表示手机网站， 0或没传表示app)
	
		$param = array('goods_id' => $goodsId);
		// 获取人次商品信息
		$response = api_Court::getPersonInfo($param);
	
		$detail = array();
		if (is_array($response) && isset($response['status']) && $response['status'] == SUCCESS_STATUS) {

			$activity_id = 0;
			if(isset($response['data']['activity_id']))
				$activity_id = $response['data']['activity_id'];
			if($activity_id > 0)
			{
				$this->redirect('/activitycommon/detail?id='.$activity_id);exit;
			}
			$detail = $response['data'];
		} else {
			// 读取人次商品失败
			//$this->redirectMessage('读取商品信息失败');
		}
		if(empty($courtName) && !empty($detail['goods_name'])){
			$courtName = $detail['goods_name'];
		}
		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources, 'venues_name'=>$courtName));

		$_SESSION['back_item_url'] = $this->redirectUrl();
		$this->_view->assign(array(
				'detail' => $detail,
				'courtName' => $courtName,
				'from' => $from
		));
	}
}