'use strict';

const bunyan = require('bunyan');
const log    = bunyan.createLogger({
  name: 'www.guanzhang.com',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: '/home/logs/www.guanzhang.me/error.log'  // log ERROR and above to a file
    }
  ]
});


const toList = 'jun@ningmi.net,helizhi@ningmi.net,yuxiangwei@ningmi.net,rongwei@ningmi.net,dingyanzhou@ningmi.net';
// const toList = 'wuguanxi@ningmi.net';
const toListDev = 'wuguanxi@ningmi.net';

const nodemailer  = require('nodemailer');
const mail = {
  user: 'notice@ningmi.net',
  port: 25,
  host: 'smtp.exmail.qq.com',
  pass: 'Zn9U8tVpiMDSfvEB',
  toList: process.env.NODE_ENV === 'development' ? toListDev : toList ,
  init: function init() {
    let that = this;
    this.transporter = nodemailer.createTransport({
      //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
      host: that.host,
      // service: that.service,
      port: that.port, // SMTP 端口
      secureConnection: true, // 使用 SSL
      auth: {
          user: that.user,
          //这里密码不是qq密码，是你设置的smtp密码
          pass: that.pass,
      },
    })
  },
  transporter: null,
  sendMail: function sendMail (formDataArray) {
    if (!this.transporter) {
      this.init();
    }
    let mailOptions = {
        from:this.user , // 发件地址
        to:this.toList , // 收件列表
        subject: `商户(${formDataArray[0].value})申请使用馆掌`, // 标题
        //text和html两者只支持一种
        text:  "有商户申请使用馆掌:"  
              + "\n \n"
              + " 城  市 ： "+formDataArray[3].value+"\n"
              + " 场  馆 ： "+formDataArray[0].value+"\n"
              + " 联系人 ： "+formDataArray[1].value+ "\n"
              + " 电  话 ： "+formDataArray[5].value+ "\n",
        // html 内容
    };

    this.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          log.error('MAIL ERROR',error);
          return false;
        }
        log.info('Message sent: ',info.response);
    });
  }
}

module.exports = mail;