<?php
/**
 * 
 * 用户等级
 * @author bigticket
 *
 */
class UsergradeController extends DefaultController
{	
	/**
	 * 用户等级页
	 */
	public function indexAction(){
	    $param['user_id'] = $this->getParam('user_id',0);
	    $grade = api_User::rulesLevel($param);
	    
	    $staticData = 1;	    
	    if(isset($grade['status']) && $grade['status'] == '0000'){
	        $grade = $grade['data'];
	    }
	    else{
	        throw new Exception('not found');
	        $grade = array();
	        $staticData = 0;
	    }
        
	    //echo json_encode($grade);exit;
	    $this->_view->assign(array('grade'=>$grade,'staticData'=>$staticData,'user_id'=>$param['user_id']));
	}
	
	/**
	 * 会员等级介绍页
	 */
	public function introAction(){
	    $intro = api_User::rulesDetail();
	    $staticData = 1;	    
	    if(isset($intro['status']) && $intro['status'] == '0000'){
	        $intro = $intro['data'];
	    }
	    else{
	        $intro = array();
	        $staticData = 0;
	    }
        
	    //echo json_encode($intro);exit;
	    $this->_view->assign(array('intro'=>$intro,'staticData'=>$staticData));
	}
	
	/**
	 * 近期运动记录
	 */
	public function sportRecordAction(){	    
	    $data = $this->_getRecord();

	    $this->_view->assign(array('record'=>$data['record'],'staticData'=>$data['staticData'],'user_id'=>$this->getParam('user_id',0)));
	}		
	
	public function recordAction(){
	    $data = $this->_getRecord();
	    
	    if($data['staticData'] == 0){	    
	       $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
	    }
	    $this->readJson(baf_ResCode::msg(1, $data['record']));
	}
	
	private function _getRecord(){
	    $param['user_id'] = $this->getParam('user_id',0);
	    $param['page'] = $this->getParam('page',0);
	    $param['count'] = $this->getParam('count',20);
	    $data = api_User::rulesRecord($param);
	     
	    $staticData = 1;
	     
	    if(isset($data['status']) && $data['status'] == '0000'){
	        $record = $data['data'];
	    }
	    else{
	        $record = array();
	        $staticData = 0;
	    }
	    return array(
	        'record' => $record,
	        'staticData' => $staticData,
	    );
	}
}