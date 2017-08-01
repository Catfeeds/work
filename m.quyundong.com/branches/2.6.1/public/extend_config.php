<?php 
/**
* 扩展配置
*/
class ExtendConfig
{	
	/**
	 * 支付成功页隐藏查看详情按钮
	 */
	public static $payokNoDeailView = array('dianping','sougoutong','piaoliang','alisports','guangdong','shanghai','dealer_5');

	/**
	 * 个人中心隐藏修改密码项
	 */
	public static $noChangePwd = array(
            'liaoning','guangdong','shanghai','decathlon'
        );

	/**
	 * 只启用快捷登录
	 */
	public static $quickLoginOnly = array('liaoning','guangdong','shanghai','decathlon','gagc','xunqiu','yiqiu');

	/**
	 * 不显示首页链接
	 */
	public static $noHomeLink = array('liaoning','guangdong','shanghai','xunqiu');

	/**
	 * 场馆列表显示城市选择
	 * add by chenchao 2017-01-11
	 */
	public static $courtCityList = array('xunqiu','yiqiu');

	/**
	 * 场馆列表显示个人中心
	 * add by chenchao 2017-01-11
	 */
	public static $courtUserCenter = array('xunqiu','yiqiu');

	/**
	 * 个人中心，不显示头像与昵称
	 * add by chenchao 2017-01-11
	 */
	public static $noUserAvatar = array('xunqiu');

	/**
	 * 寻球特殊处理
	 * add by chenchao 2017-01-12
	 */
	public static $xunqiu = array('xunqiu','yiqiu');
}