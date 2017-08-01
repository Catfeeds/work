const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function fromNow (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function fromMoney (money) {
  if(money === undefined) return false;
  let moneyToArray = money.toString().split('.')
  if(moneyToArray.length === 1) return moneyToArray[0] + '.00'
  if(moneyToArray.length === 2 && moneyToArray[1].length === 1 ) return moneyToArray[0] + '.' + moneyToArray[1] + '0'
  if(moneyToArray.length === 2 && moneyToArray[1].length > 1 ) return moneyToArray[0] + '.' + moneyToArray[1].substr(0,2) 
  return money
}

export function formatDate (time,type) {
  const week = ['日','一','二','三','四','五','六'] 
  const date = new Date(time)
  const month = (date.getMonth() + 1 + '').length == 2 ? date.getMonth() + 1 + '' : "0" + (date.getMonth() + 1) ;
  const day =  (date.getDate() + '').length == 2 ? date.getDate() + '' : "0" + date.getDate() ;
  const weekDay = week[date.getDay()]

  if(type === 'day'){
    return month + '/' + day
  }else if(type === 'week'){
    return weekDay
  }
}

export function formatStringDate (time) {
  if(typeof time !== 'string') return false
  let date = ~~ (new Date(time).getTime()/1000)
  return date
}

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }

    return time + label + 's';
}
