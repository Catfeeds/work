import { formatDate } from '../filters/index.js'
import { formatStringDate } from '../filters/index.js'
import { pxToRem } from './pxToRem'

const commonTool = {
    install: function(Vue) {
        Vue.prototype.$commonTool = {
            formatDate: formatDate,
            formatStringDate: formatStringDate,
            pxToRem: pxToRem,
            vueHost: vueHost(),
            host: host(),
            isLetterOrNumber: isLetterOrNumber,
            isReallyChineseName: isReallyChineseName,
            checkName: checkName,
            checkPhone: checkPhone,
            checkCode: checkCode,
            newDate:newDate
        }
    }
}

const host = () => window.location.protocol + '//' + window.location.host
const vueHost = () => window.location.href.split('#')[0] + '#!/'

const isLetterOrNumber = (str) => {
    var str = str + "";
    var regx = /^[A-Za-z0-9]*$/;
    return !!(str.length === 1 && regx.test(str));
}

const isReallyChineseName = (str) => {
    var str = str + "";
    var regx = new RegExp("[\\u4E00-\\u9fd0]+", "g");
    return !!regx.test(str);
}

const checkName = (str) => {
    var str = str + "";
    str = str.replace(/\s/g, "");
    str = str.replace(/"　"/g, "");
    if (str.length === 0) {
        return false;
    }
    for (var i = 0; i < str.length; i++) {
        if (isLetterOrNumber(str[i]) || !isReallyChineseName(str[i])) {
            return false;
        }
    }
    return true;
}

const checkPhone = (num) => {
    return !!(!isNaN(num - "0") == true && num.length == 11 && /13|14|15|17|18/i.test(num.substring(0, 2)))
}

const  checkCode = (num) =>{
    return !isNaN(num - "0") && num != "";
}

const newDate = () =>{
    return parseInt(new Date().getTime()/1000);
}

export { commonTool };
