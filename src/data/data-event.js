/**
 * @file DataEvent
 * @author Miracle He
 * @version v1.0.0
 * @description 封装window相关的事件函数
 * @createDate 2019-07-07
 */
export const DataEvent = {
  /**
   * @method 页面数据上拉滚动加载
   * @param {Function} {handler} 加载数据回调函数
   * @param {Number} {threshold} 距离屏幕底部即将加载数据的距离(默认：20)
   */
  scroll: (handler, { threshold = 20 } = {}) => {
    const { clientHeight, scrollTop } = document.documentElement;
    const { scrollHeight } = document.body;
    if ((scrollTop + clientHeight) >= (scrollHeight - threshold)) {
      handler();
    }
  },
  /**
   * @method 截流函数(3s内只能点击一次，点击后立即触发，重复点击无效，必须等3s之后才能点击第二次)
   * @param {Function} {handler} 事件处理函数
   * @param {Number} {delay} 恢复点击的毫秒数
   */
  throttle: (handler, delay = 3000) => {
    let preTime = Date.now();
    return (e) => {
      const context = this;
      e.persist && e.persist(); // 保留对事件的引用
      let doTime = Date.now();
      if (doTime - preTime >= delay) {
        handler.apply(context);
        preTime = Date.now();
      }
    };
  },
  /**
   * @method 防抖函数(3s之后出结果，重复点击无效，如果重复点击了，重新计算3s时间，从点击的时刻算起，必须等待3s时间触发事件)
   * @param {Function} {handler} 事件处理函数
   * @param {Number} {delay} 恢复点击的毫秒数
   */
  debounce: (handler, delay = 3000) => {
    let timeout; // 定时器变量
    return (e) => {
      timeout && clearTimeout(timeout); // 每次触发时先清除上一次的定时器然后重新计时
      e.persist && e.persist(); // 保留对事件的引用
      timeout = setTimeout(() => {
        handler(e);
      }, delay); // 指定3秒后触发handler
    };
  }
};
