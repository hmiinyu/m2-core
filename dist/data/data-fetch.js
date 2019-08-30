"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFetch = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jsonp = _interopRequireDefault(require("jsonp"));

var _constants = require("../constants");

var _dataType = require("./data-type");

var _dataStorage = require("./data-storage");

var _dataEnv = require("./data-env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _parseBaseUrl = function _parseBaseUrl(baseUrl, env) {
  var apiKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (baseUrl) return baseUrl;
  var apiUrl = '';
  var _buildEnv = process.env.BUILD_ENV;

  var _apiKey = apiKey ? "_".concat(apiKey) : '';

  var _cacheKey = "m2:app_api_url".concat(_apiKey, "_").concat((0, _dataEnv.getEnvAlias)(_buildEnv));

  if (!_dataEnv.IsDev) {
    apiUrl = _dataStorage.DataStorage.get(_cacheKey);
    if (apiUrl) return apiUrl;
  }

  for (var prop in env) {
    var currentEnv = _objectSpread({}, _dataEnv.DataEnv[prop] || {
      env: prop,
      alias: prop
    }, {}, env[prop]);

    if (currentEnv.env === _buildEnv || currentEnv.alias === _buildEnv) {
      if (_dataType.DataType.isString(currentEnv.api)) {
        apiUrl = currentEnv.api;
      } else if (_dataType.DataType.isObject(currentEnv.api)) {
        apiUrl = currentEnv.api[apiKey];
      }

      if (apiUrl) {
        !_dataEnv.IsDev && _dataStorage.DataStorage.set(_cacheKey, apiUrl);
      }

      break;
    }
  }

  return apiUrl;
};

var DataFetch =
/*#__PURE__*/
function () {
  function DataFetch() {
    _classCallCheck(this, DataFetch);
  }

  _createClass(DataFetch, null, [{
    key: "request",

    /**
     * @method 根据当前url请求数据
     * @param {String} url 当前请求的url
     * @param {Object} {fetch} 外部传入的fetch实例(覆盖默认的axios)
     * @param {String} {baseUrl} 当前请求的域名url
     * @param {Object} {env} 当前环境变量的配置对象
     * @param {String} {apiKey} 当前请求的Api键值(多个Api时起作用，用于过滤)
     * @param {String} {method} 当前请求的方法(get,post,...)
     * @param {Number} {timeout} 当前请求的超时时
     * @param {Object} {headers} 当前请求的header
     * @param {Object} {params} 当前请求的参数
     * @returns 返回当前请求的promise
     */
    value: function request(url) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          fetch = _ref.fetch,
          baseUrl = _ref.baseUrl,
          env = _ref.env,
          _ref$apiKey = _ref.apiKey,
          apiKey = _ref$apiKey === void 0 ? '' : _ref$apiKey,
          _ref$method = _ref.method,
          method = _ref$method === void 0 ? _constants.REQUEST_METHOD.Get : _ref$method,
          _ref$timeout = _ref.timeout,
          timeout = _ref$timeout === void 0 ? 30000 : _ref$timeout,
          _ref$headers = _ref.headers,
          headers = _ref$headers === void 0 ? {} : _ref$headers,
          _ref$params = _ref.params,
          params = _ref$params === void 0 ? {} : _ref$params;

      var $fetch = fetch || _axios["default"];
      return new Promise(function (resolve, reject) {
        var options = {
          url: url,
          baseURL: _parseBaseUrl(baseUrl, env, apiKey),
          method: method,
          headers: headers,
          timeout: timeout
        };

        if (method === _constants.REQUEST_METHOD.Get) {
          options.params = params;
        } else {
          options.data = params;
        }

        $fetch(options).then(function (res) {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })["catch"](function (err) {
          reject(err);
        });
      });
    }
    /**
     * @method 根据当前url请求数据(jsonp)
     * @param {String} url 当前请求的url
     * @param {String} {callbackKey} 回调处理的key(默认：callback)
     * @returns 返回当前请求的promise
     */

  }, {
    key: "jsonp",
    value: function jsonp(url) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$callbackKey = _ref2.callbackKey,
          callbackKey = _ref2$callbackKey === void 0 ? 'callback' : _ref2$callbackKey;

      return new Promise(function (resolve, reject) {
        (0, _jsonp["default"])(url, {
          param: callbackKey
        }, function (err, res) {
          if (!err && res.status === 'success') {
            resolve(res);
          } else {
            reject(err.message);
          }
        });
      });
    }
  }]);

  return DataFetch;
}();

exports.DataFetch = DataFetch;