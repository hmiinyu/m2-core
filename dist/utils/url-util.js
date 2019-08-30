"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlUtil = void 0;

var _data = require("../data");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UrlUtil =
/*#__PURE__*/
function () {
  function UrlUtil() {
    _classCallCheck(this, UrlUtil);
  }

  _createClass(UrlUtil, null, [{
    key: "redirect",

    /**
     * @method 页面hash跳转
     * @param {String} url 当前跳转的url
     * @desc 如当前参数url不以#开头，则将自动添加#
     * @throws 如当前参数url为空或非字符串类型，则不会跳转并打印错误
     */
    value: function redirect(url) {
      if (!url || !_data.DataType.isString(url)) {
        // console.error(`当前地址: ${url} 不合法，无法跳转!`); 
        return;
      }

      if (!url.startsWith('#')) {
        url = '#' + url;
      }

      window.location.hash = url;
    }
    /**
     * @method 获取Url中Hash值（#到？之间的值）
     * @param {String} url 当前的Url
     * @returns {String} Hash字符串值
     * @desc 如当前参数routeUrl为空，则自动获取当前Url
     */

  }, {
    key: "getHashValue",
    value: function getHashValue() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      url = url || window.location.hash;
      return url.replace(/#|\?.*$/, '');
    }
    /**
     * @method 获取Url中指定名称的查询字符串值（QueryString）
     * @param {String} name 指定的查询字符串名称(key)
     * @param {String} url 当前的Url
     * @returns {String} 查询字符串值(key对应的value)
     * @desc 如当前参数routeUrl为空，则自动获取当前Url
     */

  }, {
    key: "getQueryValue",
    value: function getQueryValue(name) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      url = url || window.location.search;
      var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"), 'i');
      var matches = url.substr(1).match(reg);
      return matches ? unescape(matches[2]) : '';
    }
  }]);

  return UrlUtil;
}();

exports.UrlUtil = UrlUtil;