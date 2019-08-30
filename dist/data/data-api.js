"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataApi = void 0;

var _dataType = require("./data-type");

var _dataStorage = require("./data-storage");

var _dataEnv = require("./data-env");

var _constants = require("../constants");

/**
 * @file DataApi
 * @author Miracle He
 * @version v1.0.0
 * @description 获取应用Api配置映射
 * @createDate 2019-05-12
 */
var _api_mapping = function _api_mapping(config, prefix, mock) {
  return Object.keys(config).reduce(function (api, key) {
    var val = config[key];

    if (_dataType.DataType.isString(val)) {
      if (!val.startsWith('/')) {
        config[key] = "/".concat(val);
      }

      if (mock && mock.urls.indexOf(config[key]) > -1) {
        api[key] = "".concat(prefix).concat(mock.prefix).concat(config[key]);
      } else {
        api[key] = "".concat(prefix).concat(config[key]);
      }
    }

    if (_dataType.DataType.isObject(val)) {
      api[key] = _api_mapping(val, prefix, mock);
    }

    return api;
  }, {});
};

var _api_mocking = function _api_mocking(config) {
  var mock = null;

  if (_dataType.DataType.isArray(config)) {
    mock = {
      prefix: '/mock',
      urls: config
    };
  } else if (_dataType.DataType.isObject(config)) {
    var _config$prefix = config.prefix,
        prefix = _config$prefix === void 0 ? '/mock' : _config$prefix,
        urls = config.urls;

    if (!_dataType.DataType.isEmptyArray(urls)) {
      mock = {
        prefix: prefix,
        urls: urls
      };
    }
  }

  return mock;
};

var DataApi = function DataApi(config) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var mock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var api = {};
  mock = _api_mocking(mock);
  var _buildEnv = process.env.BUILD_ENV;

  var _cacheKey = "m2:app_api_mapping_".concat((0, _dataEnv.getEnvAlias)(_buildEnv));

  if (!_dataEnv.IsDev) {
    api = _dataStorage.DataStorage.get(_cacheKey, {
      encryptType: _constants.SYMMETRIC_CRYPTO_TYPE.DES
    });

    if (!api) {
      api = _api_mapping(config, prefix, mock);

      _dataStorage.DataStorage.set(_cacheKey, api, {
        encryptType: _constants.SYMMETRIC_CRYPTO_TYPE.DES
      });
    }
  } else {
    api = _api_mapping(config, prefix, mock);
  }

  return api;
};

exports.DataApi = DataApi;