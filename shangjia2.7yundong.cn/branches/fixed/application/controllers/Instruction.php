<?php
/**
 * 使用说明页
 */
class InstructionController extends BaseController
{
  
    public function indexAction() { //默认Action
      $this->getView()->disableLayout();
      $this->display('index', ['test' => 'OK']);
    }
    
    
}