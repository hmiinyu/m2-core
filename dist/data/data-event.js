"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataEvent = void 0;

/**
 * @file DataEvent
 * @author Miracle He
 * @version v1.0.0
 * @description 封装window相关的事件函数
 * @createDate 2019-07-07
 */
var DataEvent = {
  /**
   * @method 页面数据上拉滚动加载
   * @param {Function} {handler} 加载数据回调函数
   * @param {Number} {threshold} 距离屏幕底部即将加载数据的距离(默认：20)
   */
  scroll: function scroll(handler) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === void 0 ? 20 : _ref$threshold;

    var _document$documentEle = document.documentElement,
        clientHeight = _document$documentEle.clientHeight,
        scrollTop = _document$documentEle.scrollTop;
    var scrollHeight = document.body.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      handler();
    }
  }
};
exports.DataEvent = DataEvent;