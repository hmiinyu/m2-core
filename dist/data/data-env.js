"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnvConfig = exports.getEnvAlias = exports.IsDev = exports.DataEnv = void 0;

var _dataStorage = require("./data-storage");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file DataEnv
 * @author Miracle He
 * @version v1.0.0
 * @description 获取应用的环境变量基础配置
 * @createDate 2019-05-12
 */
var DataEnv = {
  local: {
    env: 'localization',
    alias: 'local'
  },
  dev: {
    env: 'development',
    alias: 'dev'
  },
  st: {
    env: 'stagingment',
    alias: 'st'
  },
  uat: {
    env: 'integration',
    alias: 'uat'
  },
  prod: {
    env: 'production',
    alias: 'prod'
  }
}; // 是否为开发环境

exports.DataEnv = DataEnv;
var IsDev = process.env.NODE_ENV === 'development';
exports.IsDev = IsDev;

var getEnvAlias = function getEnvAlias(buildEnv) {
  var currentEnv = Object.values(DataEnv).find(function (item) {
    return item.env === buildEnv;
  });
  return currentEnv ? currentEnv.alias : 'dev';
};

exports.getEnvAlias = getEnvAlias;

var getEnvConfig = function getEnvConfig(env) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var config;

  var _key = key ? "_".concat(key) : '';

  var _buildEnv = process.env.BUILD_ENV;

  var _cacheKey = "m2:app_env_config".concat(_key, "_").concat(getEnvAlias(_buildEnv));

  if (!IsDev) {
    config = _dataStorage.DataStorage.get(_cacheKey);
    if (config) return config;
  }

  for (var prop in env) {
    var currentEnv = _objectSpread({}, DataEnv[prop] || {
      env: prop,
      alias: prop
    }, {}, env[prop]);

    if (currentEnv.env === _buildEnv || currentEnv.alias === _buildEnv) {
      config = key ? currentEnv[key] : currentEnv;

      if (config) {
        !IsDev && _dataStorage.DataStorage.set(_cacheKey, config);
      }

      break;
    }
  }

  return config;
};

exports.getEnvConfig = getEnvConfig;