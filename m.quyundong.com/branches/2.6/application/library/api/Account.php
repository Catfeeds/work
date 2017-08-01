<?php 
/**
 * 用户帐户相关接口
 */
class api_Account extends api_Base
{
	const LOGTITLE = 'user_api';


	/**
	 * 银行卡列表
	 * @param user_id 用户Id
	 * @return array
	 */
	public static function bankCardList(array $param){
		if(empty($param['user_id'])) throw new Exception("缺少参数", 1001);
		$param['action']	= 'bank_card_list';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl.'bankcard?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 银行列表
	 * @param
	 * @return array
	 */
	public static function bankList(){
		$param['action'] = 'bank_list';
		$data = self::getApiData($param, self::UserApiUrl, 'bankcard', self::LOGTITLE);
		return $data;
	}

	/**
	 * 添加银行卡
	 * @param user_id 用户Id
	 * @param bank_id 银行id
	 * @param card_number 卡号
	 * @param card_holder 持卡人
	 * @param bank_branch 支行名称
	 * @param bank_address 地址
	 * @return array
	 */
	public static function addBankCard(array $param){
		if(empty($param['user_id']) || empty($param['bank_id']) || empty($param['card_number']) || empty($param['card_holder']) || empty($param['bank_branch']) || empty($param['bank_address'])) throw new Exception("参数错误", 1001);
		$param['action'] = 'add_bank_card';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl.'bankcard?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 编辑银行卡
	 * @param user_id 用户Id
	 * @param bank_card_id 银行卡id
	 * @param bank_id 银行id
	 * @param card_number 卡号
	 * @param card_holder 持卡人
	 * @param bank_branch 支行名称
	 * @param bank_address 地址
	 * @return array
	 */
	public static function editBankCard(array $param){
		if(empty($param['user_id']) || empty($param['bank_card_id']) || empty($param['bank_id']) || empty($param['card_number']) || empty($param['card_holder']) || empty($param['bank_branch']) || empty($param['bank_address'])) throw new Exception("参数错误", 1001);
		$param['action'] = 'edit_bank_card';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl.'bankcard?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 删除银行卡
	 * @param user_id 用户id
	 * @param bank_card_id 银行卡id
	 * @return array
	 */
	public static function deleteBankCard(array $param){
		if(empty($param['user_id']) || empty($param['bank_card_id'])) throw new Exception("参数错误", 1001);
		$param['action'] = 'delete_bank_card';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl.'bankcard?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 提现
	 * @param user_id 用户id
	 * @param type 提现类型 0余额 1银行卡
	 * @param bank_card_id 银行卡id
	 * @return array
	 */
	public static function withdrawCash(array $param){
		if(empty($param['user_id']) || !isset($param['type']) || ($param['type']==1 && empty($param['bank_card_id']))) throw new Exception("参数错误", 1001);
		$param['action'] = 'withdraw_cash';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl.'cash?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 现金帐户信息
	 * @param user_id 用户id
	 * @return array
	 */
	public static function cashInfo(array $param){
		if(empty($param['user_id'])) throw new Exception("参数错误", 1001);
		$param['action'] = 'cash_info';
		$data = self::getApiData($param, self::UserApiUrl, 'cash', self::LOGTITLE);
		return $data;
	}

	/**
	 * 提现记录
	 * @param user_id 用户id
	 * @param page 当前页码
	 * @param count 每页显示数据条数
	 * @return array
	 */
	public static function cashRecord(array $param){
		if(empty($param['user_id'])) throw new Exception("参数错误", 1001);
		$param['page'] = !empty($param['page']) ? max(1, intval($param['page'])) : 1;
		$param['count'] = !empty($param['count']) ? intval($param['count']) : 0;
		$param['action'] = 'cash_record';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl.'cash?'.http_build_query($param),self::LOGTITLE);
	}
}