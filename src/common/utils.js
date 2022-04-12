// 防抖函数
export function deBounce(func, delay = 300) {
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

// 日期格式化
export function formatDate(date, fmt) {
  // 1. 获取年份
  // y
  // y+ -> 1个 或 多个 y
  // y* -> 0个 或 多个 y
  // y? -> 0个 或 1个 y

  // 2022
  // yy - 22
  // yyyy - 2022
  // y - 2
  // yyy - 022
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }
  let o = {
    // 这些 key 都是正则的规则
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substring(str.length);
}
