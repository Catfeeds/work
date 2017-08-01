<?php
/**
 * 商家
 *
 * @author chenchao
 * @date 2017-01-10
 */
class SuppliersController extends BaseController
{
	
	/**
	 * test
	 */
	public function indexAction()
	{	
		echo 'test';
	}
	
	/**
	 * 获取商务联系方式
	 */
	public function getFollowAction()
	{
		//商家ID
		$id	= helper_LoginHelper::getCurrentSuppliersId();
		if ( $id < 1 ){
			return $this->errorOutput( baf_ErrorCode::ERR_PARAM, '参数错误！');
		}

		//调用接口
		$param = [			
			'suppliers_id'	=>	$id
		];
		$info = Loader::api('Venues')->getSuppliersFollow($param);

		echo  is_array($info) ? json_encode($info) : $info ;
	}

	/**
	 * 获取场地显示配置
	 */
	public function getShowConfigAction()
	{
		//商家ID
		$id	= helper_LoginHelper::getCurrentSuppliersId();
		if ( $id < 1 ){
			return $this->errorOutput( baf_ErrorCode::ERR_PARAM, '参数错误！');
		}

		//调用接口
		$param = [			
			'suppliers_id'	=>	$id
		];
		echo json_encode(Loader::api('Venues')->getSuppliersShowConfig($param));
	}

	/**
	 * 更新场地显示配置
	 */
	public function updateShowConfigAction()
	{
		//商家ID
		$id	= helper_LoginHelper::getCurrentSuppliersId();
		$is_show_name		= intval($this->getParam('is_show_name', '0'));
		$is_merge		    = intval($this->getParam('is_merge', '0'));
		if ( ($id < 1) || (!in_array($is_show_name, array('1','0'))) || (!in_array($is_show_name, array('1','0')))){
			return $this->errorOutput( baf_ErrorCode::ERR_PARAM, '参数错误！');
		}

		//场地配置信息
		echo helper_VenuesHelper::updateShowConfig($id, $is_show_name, $is_merge);
	}
	
	 
}