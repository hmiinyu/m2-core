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
  }
};
