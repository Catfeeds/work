<?php
/**
 * 自定义视图文件,方便模板中使用layout
 * 
 * @author xiaoyanchun
 * @date 2016-06-08
 */
class baf_LayoutView extends Yaf_View_Simple
{ 
    /**
     * layout模板目录
     * 
     * @var string
     */
    protected $layoutDir = '';
    
    /**
     * 默认layout模板文件
     * 
     * @var string
     */
    protected $layoutFile = '';
    
    /**
     * 禁用布局标识
     * 
     * @var bool
     */
    protected $enableLayout = true;
    
    /**
     * 禁用布局
     */
    public function disableLayout() {
        $this->enableLayout = false;
    }
    
    /**
     * 启用布局
     */
    public function enableLayout() {
        $this->enableLayout = true;
    }
    
    
    /**
     * 设置layout文件
     * 
     * @param string $file
     */
    public function setLayoutFile($file) {
        $this->layoutFile = $file;
    }
    
    /**
     * 设置layout目录
     * 
     * @param string $dir
     */
    public function setLayoutDir($dir) {
        $this->layoutDir = $dir;
    }

    /**
     * 渲染模板文件
     * 
     * @param string $view_path 模板路径
     * @param string $tpl_vars  赋值到模板中的数据
     */
    public function display($view_path,  $tpl_vars = null) {

        if (!$this->enableLayout) { // 禁用了layout
            parent::display($view_path, $tpl_vars);
            return;
        }

        // 渲染子模板
        $content = parent::render($view_path, $tpl_vars);

        // 重新设置模板目录, 指向到layout目录
        $this->_tpl_dir = $this->layoutDir;

        // 子模板的内容设置到对象中， 方便在layout中使用
        $this->content = $content;

        // 渲染layout模板文件
        parent::display($this->layoutFile, $tpl_vars);
    }
    
}



