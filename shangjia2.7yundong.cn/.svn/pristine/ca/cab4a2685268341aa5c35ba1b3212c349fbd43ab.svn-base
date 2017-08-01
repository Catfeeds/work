<?php
/**
 * 请求会员相关api相关的接口
*
* @author bumtime
* @date  2016-08-17
*/
class api_UsersApi extends api_Base
{
	/**
	 * api 秘钥
	 *
	 * @var string
	 */
	protected $apiKey = '4b111cc14a33b88e37e2e2934f493458';

	/**
	 * 正式环境的api地址
	 *
	 * @var string
	 */
	protected $apiProductUrl = 'http://user.api.7yundong.cn/';

	/**
	 * 开发环境的api地址
	 *
	 * @var string
	 */
	protected $apiDevelopmentUrl = 'http://user.api.qydw.net/';


	/**
	 * 按日期取某个场馆会员的交易消费统计
	 * http://user.api.qydw.net/usercard?client_time=1471417932&page=1&venues_id=17522&action=count_usercard_consume&api_sign=0fd5a7591cadd5308a875eb09906010d
	 *
	 * @author bumtime
	 * @date 2016-08-17
	 *
	 * @param  array $param 参数数组（business_id：场馆ID，category_id：项目分类ID，book_date：默认当天）
	 * @return array 接口数据
	 */
	public function getMembersTradingCountList($arry)
	{
		if(!$arry['venues_id'] || !$arry['start_date'] || !$arry['end_date']) return false;

		//相关参数
		$param = [
				'action'		=>	"count_usercard_consume",
				'keywords'		=>	$arry['keywords'],
				'venues_id'		=>	$arry['venues_id'],
				'start_date'	=>	$arry['start_date'],
				'end_date'		=>	$arry['end_date'],
				'page'			=>	!empty($arry['page'])  ? $arry['page'] : 1,
				'count'			=>	!empty($arry['count']) ? $arry['count'] : 20,
		];

		$paths = "usercard";
		
		baf_Logger::log2File('users-'.implode(',', $param), 'users_log');
		return $this->requestGet($param, $paths);
	}
	
	/**
	 * 按日期取某个场馆会员的交易明细
	 * http://user.api.qydw.net/usercard?client_time=1471417932&page=1&venues_id=17522&action=count_usercard_consume&api_sign=0fd5a7591cadd5308a875eb09906010d
	 *
	 * @author bumtime
	 * @date 2016-08-17
	 *
	 * @param  array $param 参数数组（business_id：场馆ID，category_id：项目分类ID，book_date：默认当天）
	 * @return array 接口数据
	 */
	public function getMembersTradingList($arry)
	{
		if(!$arry['venues_id'] || !$arry['start_date'] || !$arry['end_date']) return false;
	
		//相关参数
		$param = [
				'action'		=>	"get_card_record",
				'venues_id'		=>	$arry['venues_id'],
				'start_date'	=>	$arry['start_date'],
				'end_date'		=>	$arry['end_date'],
				'page'			=>	!empty($arry['page'])  ? $arry['page'] : 1,
				'page_size'		=>	!empty($arry['page_size']) ? $arry['page_size'] : 20
		];
		

		if(isset($arry['trans_type']))
		{
			$param['trans_type'] = $arry['trans_type'];
		}
		if(isset($arry['get_all']))
		{
			$param['get_all'] = $arry['get_all'];
		}
		
		$paths = "usercard";

		baf_Logger::log2File('users-'.implode(',', $param), 'users_log');
		return $this->requestGet($param, $paths);
	}

	/**
	 * 分页获取评论列表
	 * @param $business_id
	 */
	public function manageCommentList($business_id, $page, $count, $start_time='', $end_time=''){

		if( empty($business_id) ){
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action' => 'manage_comment_list',
			'business_id' => $business_id,
			'page' => $page,
			'count' => $count,
			'start_time' => $start_time,
			'end_time' => $end_time,
		);

		$response = $this->requestGet($param, 'comment');

		if(!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Users_api_error');
			throw new Exception($response);
		}
		if($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Users_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];
	}

	/**
	 * 回复评论
	 * comment_id   (int)评论ID
	 * author_id (int)商家ID
	 * remark  (string)回复内容
	 * is_author   (int)回复类型：0-商家，1-客服
	 * reply_ip   (int)IP
	 */
	public function setCommentReply($comment_id, $author_id, $remark, $is_author, $reply_ip){

		if( empty($comment_id) ){
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action' => 'set_comment_reply',
			'comment_id' => $comment_id,
			'author_id' => $author_id,
			'remark' => $remark,
			'is_author' => $is_author,
			'reply_ip' => $reply_ip
		);

		$response = $this->requestGet($param, 'comment');

		if(!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Users_api_error');
			throw new Exception($response);
		}
		if($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Users_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];

	}
	
	
	/**
	 * 用户注册
	 *
	 * @author bumtime
	 * @date 2016-10-18
	 *
	 * @param  array $param
	 * @return array 接口数据
	 */
	public function checkMobileRegistered($param)
	{
		if (empty($param['phone'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Users_api_error');
		}
	
		$path = 'Auth';
		$params = [
				'action'		=> 'check_mobile_registered',
				'phone'			=> $param['phone'],
				'utm_medium'	=> $param['utm_medium'],
				'utm_source'	=> $param['utm_source']
		];
		$response = $this->requestGet($params, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Users_api_errors');
		}
	
		return $response;
	}
	
	

}