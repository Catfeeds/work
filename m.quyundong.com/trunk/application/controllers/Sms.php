<?php
class SmsController extends DefaultController
{
	/**
	 * 发送各种类型的验证码
	 *
	 * @return string json字符串
	 * @author xiaosibo
	 */
	public function sendCodeAction()
	{
		$phone = $this->getParam('phone');
		$type = (int) $this->getParam('type');
		$openType = $this->getParam('open_type');
		$this->checkHash(true);
		// 1:快捷登录、2忘记密码、3绑定手机号码、4手机注册、5：绑定会员卡、11管理员推广  add by xiaosibo 2014-04-17
		$typeArr = array(1, 2, 3, 4, 5, 7, 11); // 验证码类型集合
		 
		if (!api_CoreHelper::isMobile($phone)) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
		}
	
		if (!in_array($type, $typeArr)) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '发送验证码的类型不正确'));
		}
		 
		// begin 一分钟内只能获取一次验证码
		$codeLimitKey = 'sms_code_limit_' . $phone . '_' . $type;
		$limitRes = $this->cache()->get($codeLimitKey);
		if ($limitRes == 1) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_LIMIT));
		}
		//end;
		 
		//begin 一天只能获取固定次数的验证码
		$dayLimitKey = 'sms_code_day_limit_' . $phone . '_' . $type;
		$dayRes = $this->cache()->get($dayLimitKey);
		if ($dayRes >= 30) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_DAYLIMIT));
		}
		//end;
		$param = array(
				'phone' => $phone, 
				'type' => $type
			); 
		if(!empty($openType)) $param['open_type'] = $openType;
		$sendRes = api_Sms::sendSmsCode($param);

		// 发送成功
		if (is_array($sendRes) && isset($sendRes['status'])) {
			// 快捷登陆验证
			if ($type == 1 && $sendRes['status'] == '0903') {
				$this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_REGISTER));
			}
			if ($sendRes['status'] == SUCCESS_STATUS) {
				$this->cache()->set($codeLimitKey, 1, 60 ); // 1分钟
				$this->cache()->set($dayLimitKey, $dayRes + 1, 24*60*60 ); // 1天
				$this->readJson(baf_ResCode::msg());
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, (isset($sendRes['msg']) && $sendRes['msg']) ? $sendRes['msg'] : '发送手机验证码失败，未知错误'));
			}
		} else {
			$this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
		}
	}
}