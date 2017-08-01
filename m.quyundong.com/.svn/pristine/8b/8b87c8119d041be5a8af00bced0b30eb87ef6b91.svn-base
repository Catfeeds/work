<?php
/**
* 记录文件LOG类
* 
* @date 2014-12-5
* @author chenchao
*/
class baf_FileLog {
    public static $path;
    
    /**
    * 写LOG文件
    * 
    * @param $content 内容
    * @param $logname LOG名称
    * 
    * @author chenchao
    */
    public static function log2File($content, $logname){
        self::logPath(); //文件夹路径
                
        $logfilename = self::$path.$logname. '.log';
        $str = date ( 'Y-m-d H:i:s' ) . " ".$content."\r\n";
    
        try{
            if(!file_exists($logfilename)){
                file_put_contents ( $logfilename, $str, FILE_APPEND );
                chmod($logfilename ,0777);
            }
            else{
                file_put_contents ( $logfilename, $str, FILE_APPEND );
            }
        }
        catch (Exception $e){
            //暂不处理
            return false;
        }
        return true;
    }
    
    /**
    * 根据日期建立log文件夹
    * @author chenchao
    */
    private static function logPath(){
        //$basePath = APP_PATH.'/logs/';
        $basePath = '/home/logs/m.quyundong.com/';
        $filePath = date('Ymd',CURRENT_TIMESTAMP).'/';
        $path = $basePath.$filePath;
        if (! is_dir ( $path )) {
            try{
                mkdir ($path,0777,true);
                chmod($path ,0777);
            }
            catch (Exception $e){
                //
            }
        }
        self::$path = $path;
    }
    
    /**
    * 删除文件LOG
    * @author chenchao
    */
    public static function logDel($name){
        
    }

    /**
     * new log
     * @return [type]
     */
    public static function requestLog($logData, $logFile='request'){
        $logContent = '';
        if(defined('REQUEST_IDENTIFIER')){
            $logContent = ' REQUEST_IDENTIFIER:'.REQUEST_IDENTIFIER.' ';
        }
        $logContent .= json_encode($logData);
        return self::log2File($logContent, $logFile);
    }

}