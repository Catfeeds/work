<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class baf_Image {

    public static $host = ''; 
    public static $basePath = '';
    public static $imageType = 'jpg';

    //设置host
    public static function setHost()
    {
		//mark 记得建软链:ln -s /data/code/aimage.qydtest.com/hotdocs/ /home/wwwroot/aimage.qydtest.com/
        if (defined("TESTMODE")  && TESTMODE == 1) {
            //测试host
            self::$host = 'aimage.qydw.net';
			//self::$host = 'aimage.qydtest.com';
            self::$basePath =  '/data/code/'.self::$host.'/hotdocs';
        } else {
            //正式host
            self::$host = 'aimage.quyundong.com';
            self::$basePath =  '/home/wwwroot/'.self::$host.'/hotdocs';
        }
    }

    /**
     * 按百分比缩放
     * @param type $image_url  原图url
     * @param type $weights    缩小权重
     * @param type $name       生成缩小图的名字
     * @param type $path       生活才呢过缩小图的路径
     * @return string
     */
    public static function CreateSmallImage($image_url, $zoom_width, $zoom_height, $name, $path, $flag = false)
    {
        $im = @imagecreatefromjpeg($image_url);    //从图片建立文件，此处以jpg文件格式为例  
        list( $width_orig, $height_orig ) = getimagesize($image_url);
        if ($flag){
            if ($width_orig > $height_orig){
                $zoom_width = intval($width_orig * $zoom_height / $height_orig);
            } else {
                $zoom_height = intval($zoom_width * $height_orig / $width_orig);
            }
        }
        $image_zoom = imagecreatetruecolor($zoom_width, $zoom_height);
        $color = imagecolorallocate($image_zoom, 255, 255, 255);
        imagecolortransparent($image_zoom, $color);
        imagefill($image_zoom, 0, 0, $color);
        imagecopyresampled($image_zoom, $im, 0, 0, 0, 0, $zoom_width, $zoom_height, $width_orig, $height_orig); //缩放
        ob_start();
        imagejpeg($image_zoom, NULL);
        $contents = ob_get_contents();
        ob_end_clean();
        imagedestroy($image_zoom);

        self::setHost();

        $targetFolder = self::$basePath . $path;
        if (!is_dir($targetFolder)) {
            mkdir($targetFolder, '0755', true);
        }
        $targetFile = rtrim($targetFolder, '/') . '/' . $name . '.'.self::$imageType;
        $fh = fopen($targetFile, "w+");
        fwrite($fh, $contents);
        fclose($fh);
        $ret_url = 'http://'.self::$host . $path . "/" . $name . '.'.self::$imageType;
        
        return $ret_url;
    }
    
    //等比例缩小图片
    public static function smartResizeImage( $file, $width = 0, $height = 0,$name, $path, $proportional = false)
    {
        if ( $height <= 0 && $width <= 0 ) {
            return false;
        }
        $info = getimagesize($file);
        $image = '';
    
        $final_width = $width;
        $final_height = $height;
        list($width_old, $height_old) = $info;        
        
        if ($proportional) {
            if ($width_old > $height_old){
                if($height_old > 0){                
                    $final_width = intval($width_old * $height / $height_old);
                }
            } else{
                if($width_old > 0){
                    $final_height = intval($width * $height_old / $width_old);
                }
            } 
        }
        else {
            $final_width = ( $width <= 0 ) ? $width_old : $width;
            $final_height = ( $height <= 0 ) ? $height_old : $height;
        }
    
        switch ($info[2] ) {
            case IMAGETYPE_GIF:
                $image = imagecreatefromgif($file);
                break;
            case IMAGETYPE_JPEG:
                $image = imagecreatefromjpeg($file);
                break;
            case IMAGETYPE_PNG:
                $image = imagecreatefrompng($file);
                break;
            default:
                return false;
        }
    
        $image_resized = imagecreatetruecolor( $final_width, $final_height );
    
        if ( ($info[2] == IMAGETYPE_GIF) || ($info[2] == IMAGETYPE_PNG) ) {
            $trnprt_indx = imagecolortransparent($image);
            // If we have a specific transparent color
            if ($trnprt_indx >= 0) {
                // Get the original image's transparent color's RGB values
                $trnprt_color    = imagecolorsforindex($image, $trnprt_indx);
                // Allocate the same color in the new image resource
                $trnprt_indx    = imagecolorallocate($image_resized, $trnprt_color['red'], $trnprt_color['green'], $trnprt_color['blue']);
                // Completely fill the background of the new image with allocated color.
                imagefill($image_resized, 0, 0, $trnprt_indx);
                // Set the background color for new image to transparent
                imagecolortransparent($image_resized, $trnprt_indx);
            }
            // Always make a transparent background color for PNGs that don't have one allocated already
            elseif ($info[2] == IMAGETYPE_PNG) {
                // Turn off transparency blending (temporarily)
                imagealphablending($image_resized, false);
                // Create a new transparent color for image
                $color = imagecolorallocatealpha($image_resized, 0, 0, 0, 127);
    
                // Completely fill the background of the new image with allocated color.
                imagefill($image_resized, 0, 0, $color);
    
                // Restore transparency blending
                imagesavealpha($image_resized, true);
            }
        }
    
        imagecopyresampled($image_resized, $image, 0, 0, 0, 0, $final_width, $final_height, $width_old, $height_old);    
        ob_start();
        switch ($info[2] ) {
            case IMAGETYPE_GIF:
                imagegif($image_resized, NULL);
                break;
            case IMAGETYPE_JPEG:
                imagejpeg($image_resized, NULL);
                break;
            case IMAGETYPE_PNG:
                imagepng($image_resized, NULL);
                break;
            default:
                return false;
        }
        $contents = ob_get_contents();
        ob_end_clean();
        imagedestroy($image_resized);
        
        self::setHost();
        
        $targetFolder = self::$basePath . $path;
        if (!is_dir($targetFolder)) {
            mkdir($targetFolder, '0755', true);
        }
        $targetFile = rtrim($targetFolder, '/') . '/' . $name . '.'.self::$imageType;
        $fh = fopen($targetFile, "w+");
        fwrite($fh, $contents);
        fclose($fh);
        $ret_url = 'http://'.self::$host . $path . "/" . $name . '.'.self::$imageType;
        
        return $ret_url;
    }

    /**
     * 
     * @param type $image_name   图片在$_FILE中名字
     * @param type $out_image_name 输出图片的名字
     * @param type $path         输出图片的路径
     * @return type
     */
    public static function UploadImage($file_name, $name, $path)
    {
        $targetFile = "";
        self::setHost();

        $targetFolder = self::$basePath . $path;
        if (!is_dir($targetFolder)) {
            mkdir($targetFolder, '0755', true);
        }
        $targetFile = rtrim($targetFolder, '/') . '/' . $name . '.'.self::$imageType;
        if (isset($_FILES[$file_name])) {
            $tempFile = $_FILES[$file_name]['tmp_name'];
            if (move_uploaded_file($tempFile, $targetFile)) {
                $targetFile = 'http://'.self::$host . $path . "/" . $name . '.'.self::$imageType;
            } else {
                return false;
            }
        } else {
            return false;
        }
        return $targetFile;
    }

    //图片路径
    public static function setPath($timeStamp = 0){
        if($timeStamp < 1) $timeStamp = CURRENT_TIMESTAMP;
        return '/uploads/'.date('Ymd',$timeStamp);
    }

    //小图路径
    public static function setSmallPath($timeStamp = 0){
        return self::setPath($timeStamp).'/small';
    }


    //随机生成图片名称
    public static function AttachId(){
        $suffix =  date('Ym',CURRENT_TIMESTAMP);

        $timeArr = explode(' ', microtime());
        $second = $timeArr[1];                     // 秒
        $microsecond = substr($timeArr[0], 2, 6);  // 微秒

        $rand = mt_rand(0, pow(10, 6) - 1);
        $rand = str_pad($rand, 6, '0', STR_PAD_LEFT);
        
        return $suffix . substr($second, 0, 10) . $microsecond . $rand;  // 6 + 10 + 6 + 6  28位长度
    }

    public static function getPathByAttachId($AttachId){
        return '/uploads/'.date('Ymd',substr($AttachId, 6, 10));        
        //'/uploads/'.substr($AttachId, 0, 6);
    }

    public static function getSmallPathByAttachId($AttachId){
        return self::getPathByAttachId($AttachId).'/small';
    }

    /**
     * 通过附件id获取完整路径
     *
     * @param string $attachId 图片附件id
     * @return string
     */
    public static function getImageFullUrl($attachId)
    {
        $imgArr = explode('.', $attachId);
        if(!empty($imgArr) && strlen($imgArr[0]) == 28 && $imgArr[1]){
            self::setHost();
            $url = 'http://'.self::$host.'/uploads/'.date('Ymd', substr($attachId, 6, 10)).'/'.$imgArr[0].'.'.$imgArr[1];
            return $url;
        }

        return '';
    }

    /**
     * 通过附件id获取缩略图完整路径
     *
     * @param string $attachId 图片附件id
     * @return string
     */
    public static function getThumbImageFullUrl($attachId)
    {
        $imgArr = explode('.', $attachId);
        if(!empty($imgArr) && strlen($imgArr[0]) == 28 && $imgArr[1]){
            self::setHost();
            $url = 'http://'.self::$host.'/uploads/'.date('Ymd', substr($attachId, 6, 10)).'/small/'.$imgArr[0].'_s.'.$imgArr[1];
            return $url;
        }

        return '';
    }
        
    //获取图片类型
    public static function getImageType($uploadedfile){
        if (isset($_FILES[$uploadedfile])) {
            $ext = $_FILES[$uploadedfile]['name'];
            $extStr = explode('.', $ext);
            $count = count($extStr)-1;
            if(in_array($extStr[$count],array('jpg','png','jpeg','gif'))){
                self::$imageType = $extStr[$count];
                return $extStr[$count];
            }
        }
        return '';
    }
}
