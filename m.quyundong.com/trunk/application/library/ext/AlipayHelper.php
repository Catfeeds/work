<?php
class ext_AlipayHelper
{
	const ALIPAY_GATEWAY_NEW = 'http://wappaygw.alipay.com/service/rest.htm?'; //支付宝网关地址（新）
	const ALIPAY_GATEWAY_NEW_1 = 'https://mapi.alipay.com/gateway.do?';
	
	private $sign; //私钥
	private $signType; //签名方式
	/**
     * 建立请求，以表单HTML形式构造（默认）
     * @param $para_temp 请求参数数组
     * @param $method 提交方式。两个值可选：post、get
     * @param $button_name 确认按钮显示文字
     * @return 提交表单HTML文本
     */
	public function buildRequestForm($para_temp) {
		//待请求参数数组
		$para = $para_temp;
		$sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='".self::ALIPAY_GATEWAY_NEW_1."_input_charset=utf-8' method='get'>";
		while (list ($key, $val) = each ($para)) {
            $sHtml.= "<input type='hidden' name='".$key."' value='".$val."'/>";
        }

		//submit按钮控件请不要含有name属性
        $sHtml = $sHtml."<input type='submit' value='loading...'></form>";
		
		$sHtml = $sHtml."<script>alipaysubmit.submit();</script>";
		
		return $sHtml;
	}
	
	/**
	 * 生成要请求给支付宝的参数数组
	 * @param $para_temp 请求前的参数数组
	 * @return 要请求的参数数组
	 */
	private function buildRequestPara($para_temp) {
		//除去待签名参数数组中的空值和签名参数
		$para_filter = $this->paraFilter($para_temp);
	
		//对待签名参数数组排序
		$para_sort = $this->argSort($para_filter);
		
		//签名结果与签名方式加入请求提交参数组中
		$para_sort['sign'] = $this->sign;
		$para_sort['sign_type'] = $this->signType;
	
		return $para_sort;
	}
	
	
	/**
	 * 对数组排序
	 * @param $para 排序前的数组
	 * return 排序后的数组
	 */
	private function argSort($para) {
		ksort($para);
		reset($para);
		return $para;
	}
	
	/**
	 * 除去数组中的空值和签名参数
	 * @param $para 签名参数组
	 * return 去掉空值与签名参数后的新签名参数组
	 */
	private function paraFilter($para) {
		$para_filter = array();
		while (list ($key, $val) = each ($para)) {
			if($key == "sign" || $key == "sign_type" || $val == "")continue;
			else	$para_filter[$key] = $para[$key];
		}
		return $para_filter;
	}
}