<?php
/**
 * CHtml class file.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.yiiframework.com/
 * @copyright Copyright &copy; 2008-2011 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */


/**
 * CHtml is a static class that provides a collection of helper methods for creating HTML views.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @package system.web.helpers
 * @since 1.0
 */
class baf_CHtml
{
	public static function encode($text)
	{
		return htmlspecialchars($text,ENT_QUOTES,'utf-8');
	}

	/**
	 * 创建带有保持参数的链接
	 */
	public static function createUrl($url){
		if(!empty(Config::$preserveParams)){
			$preserveData = Config::$preserveParams;
			$parseData = parse_url($url);
			if(!empty($parseData['query'])){
				parse_str($parseData['query'], $paramArr);
				if(!empty($paramArr)){
					foreach ($paramArr as $key => $value) {
						if(isset($preserveData[$key])) unset($preserveData[$key]);
					}
				}
			}

			if($preserveData){
				$params = http_build_query($preserveData);			
				$url .= stripos($url,'?')!==false ? '&'.$params : '?'.$params;
			}			
		}
		return $url;
	}

	/**
	 * 创建表单隐藏域
	 */
	public static function createHidden($array=array()){
		$str = array();
		if(Config::$preserveParams) $array = array_merge($array, Config::$preserveParams);
		if(!empty($array)){
			foreach ($array as $key => $value) {
				$str[] = '<input type="hidden" name="'.$key.'" value="'.$value.'">';
			}
		}
		return !empty($str) ? implode('', $str) : '';
	}
}
