/**
 * @file DataFetch
 * @author Miracle He
 * @version v1.0.0
 * @description 基于axios,jsonp封装的数据请求类
 * @createDate 2019-01-20
 */
import axios from 'axios';
import jsonpd from 'jsonp';
import { REQUEST_METHOD } from '../constants';
import { DataType } from './data-type';
import { DataStorage } from './data-storage';
import { DataEnv, IsDev, getEnvAlias } from './data-env';

const _parseBaseUrl = (baseUrl, env, apiKey = '') => {
  if (baseUrl) return baseUrl;
  let apiUrl = '';
  const _buildEnv = process.env.BUILD_ENV;
  const _apiKey = apiKey ? `_${apiKey}` : '';
  const _cacheKey = `m2:app_api_url${_apiKey}_${getEnvAlias(_buildEnv)}`;

  if (!IsDev) {
    apiUrl = DataStorage.get(_cacheKey);
    if (apiUrl) return apiUrl;
  }

  for (let prop in env) {
    const currentEnv = { ...(DataEnv[prop] || { env: prop, alias: prop }), ...env[prop] };
    if (currentEnv.env === _buildEnv || currentEnv.alias === _buildEnv) {
      if (DataType.isString(currentEnv.api)) {
        apiUrl = currentEnv.api;
      } else if (DataType.isObject(currentEnv.api)) {
        apiUrl = currentEnv.api[apiKey];
      }
      if (apiUrl) {
        !IsDev && DataStorage.set(_cacheKey, apiUrl);
      }
      break;
    }
  }

  return apiUrl;
};

export class DataFetch {
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
  static request(url, { fetch, baseUrl, env, apiKey = '', method = REQUEST_METHOD.Get, timeout = 30000, headers = {}, params = {}} = {}) {
    const $fetch = fetch || axios;
    return new Promise((resolve, reject) => {
      const options = {
        url,
        baseURL: _parseBaseUrl(baseUrl, env, apiKey),
        method,
        headers,
        timeout
      };
      if (method === REQUEST_METHOD.Get) {
        options.params = params;
      } else {
        options.data = params;
      }
      $fetch(options).then(res => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      }).catch(err => {
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
  static jsonp(url, { callbackKey = 'callback' } = {}) {
    return new Promise((resolve, reject) => {
      jsonpd(url, {
        param: callbackKey
      }, (err, res) => {
        if (!err && res.status === 'success') {
          resolve(res);
        } else {
          reject(err.message);
        }
      });
    });
  }
}
