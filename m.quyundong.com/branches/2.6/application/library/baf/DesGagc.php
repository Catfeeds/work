<?php
/**
 * DES 加密算法
* @author bigticket
* @copyright 2017
*/

class baf_DesGagc{
    const KEY = '15ej7e41';
    const IV = 'c4h6e8ec';

    public static function encrypt($input)
    {
        $size = mcrypt_get_block_size(MCRYPT_DES, MCRYPT_MODE_CBC); // 3DES加密将MCRYPT_DES改为MCRYPT_3DES
         
        $input = self::pkcs5Pad($input, $size); // 如果采用PaddingPKCS7，请更换成PaddingPKCS7方法。
        $key = str_pad(self::KEY, 8, '0'); // 3DES加密将8改为24
        $td = mcrypt_module_open(MCRYPT_DES, '', MCRYPT_MODE_CBC, '');
        if (self::IV == '') {
            $iv = @mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        } else {
            $iv = self::IV;
        }
        @mcrypt_generic_init($td, $key, $iv);
        $data = mcrypt_generic($td, $input);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        $data = base64_encode($data); // 如需转换二进制可改成 bin2hex 转换
        return $data;
    }

    public static function decrypt($encrypted)
    {
        $encrypted = base64_decode($encrypted); // 如需转换二进制可改成 bin2hex 转换
        $key = str_pad(self::KEY, 8, '0'); // 3DES加密将8改为24
        $td = mcrypt_module_open(MCRYPT_DES, '', MCRYPT_MODE_CBC, ''); // 3DES加密将MCRYPT_DES改为MCRYPT_3DES
        //if(!$td || !$encrypted) return false;
        if (self::IV == '') {
            $iv = @mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        } else {
            $iv = self::IV;
        }
        $ks = mcrypt_enc_get_key_size($td);
        @mcrypt_generic_init($td, $key, $iv);
        $decrypted = mdecrypt_generic($td, $encrypted);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        $y = self::pkcs5Unpad($decrypted);
        return $y;
    }


    public static function pkcs5Pad($text, $blocksize) {
        $pad = $blocksize - (strlen($text) % $blocksize);
        return $text . str_repeat(chr($pad), $pad);
    }

    public static function pkcs5Unpad($text) {
        $pad = ord($text{strlen($text) - 1});
        if ($pad > strlen($text)) return false;
        if (strspn($text, chr($pad), strlen($text) - $pad) != $pad) return false;
        return substr($text, 0, -1 * $pad);
    }
}