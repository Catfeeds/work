<?php 
class CommonController extends DefaultController
{
	public function indexAction(){
		$this->successOutput();
	}

	/**
	 * 获取地区
	 * @return [type] [description]
	 */
	public function getAreaAction(){
		$res = api_Venues::getArea();
		if(isset($res['status']) && $res['status']=='0000'){
			$this->renderJson($res);
		}else{
			$msg = isset($res['msg']) ? $res['msg'] : '系统异常';
			$status = isset($res['status']) ? $res['status'] : '5001';
			$this->errorOutput($status, $msg);
		}
	}

	/**
	 * 获取子地区
	 * @return [type] [description]
	 */
	public function getSubAreaAction(){
		$parentId = intval($this->getParam('parent_id'));
		$res = api_Venues::getSubArea($parentId);
		if(isset($res['status']) && $res['status']=='0000'){
			$this->renderJson($res);
		}else{
			$msg = isset($res['msg']) ? $res['msg'] : '系统异常';
			$status = isset($res['status']) ? $res['status'] : '5001';
			$this->errorOutput($status, $msg);
		}
	}
}