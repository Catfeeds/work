var crypto=require("crypto");

var args = {
    key : 'aba0a44a',
    iv  : 'c44be79c',
    alg : "des-cbc"
};

var desCrypto=function (coObj){
    var coObj = coObj || {};
    this.key = coObj.key || args.key; 
    this.iv = coObj.iv || args.iv;
    this.alg = coObj.alg || 'des-cbc';
    err = function (){
        console.log("无效的参数!");
    }
};

//加密

desCrypto.prototype.enCrypto = function (text) {
    if(!text) return err();
    var text=text || args.text;
    var cipher = crypto.createCipheriv(this.alg, this.key, this.iv);
    var ciph = cipher.update(text, 'utf8', 'base64');
    ciph += cipher.final('base64');
    
//    输出加密模式与加密后的数据
    //console.log('加密后的数据:' + ciph);
    return ciph;
}

//解密
desCrypto.prototype.deCrypto=function (text) {
    if(!text) return err();
    var text=text || args.text;
    var decipher=crypto.createDecipheriv(this.alg, this.key, this.iv);
    var txt = decipher.update(text, 'base64', 'utf8');
    txt += decipher.final('utf8');
    
//输出解密数据
    //console.log('解密后的数据：' + txt);
    return txt;
}

desCrypto.prototype.Md5Sign = function (text) { 
    if(!text) return err();
    //var md5 = crypto.createHash('md5');
    //md5.update(text,'utf8');
    //return md5.digest('hex'); 
    text = (new Buffer(text)).toString("binary");
　　return crypto.createHash('md5').update(text).digest("hex");

};

desCrypto.prototype.BuildQuery = function (args) { 
  var string = '';
  if(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
      newArgs[key] = args[key];
    });

    for (var k in newArgs) {
      newArgs[k] = newArgs[k]+'';
      string +=  k + '=' + newArgs[k].trim() + '&';
    }        
  } 
  return string;
};

desCrypto.prototype.ApiMd5Sign = function (args) { 
    var text = desCrypto.prototype.BuildQuery(args) + '4b111cc14a33b88e37e2e2934f493458'; 
    //console.log('md5:'+text)
    return desCrypto.prototype.Md5Sign(text)
};


module.exports = new desCrypto;


/*

var Crypto=require('./lib/desCrypto.js');
var ro=new Crypto();
ro.enCrypto('123456');
ro.deCrypto('0rVKwSYzwIs=');

*/