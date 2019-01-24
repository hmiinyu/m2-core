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

export class DataFetch {
  /**
   * @method 根据当前url请求数据
   * @param {String} url 当前请求的url
   * @param {Object} {fetch} 外部传入的fetch实例(覆盖默认的axios)
   * @param {String} {baseUrl} 当前请求的域名url
   * @param {String} {method} 当前请求的方法(get,post,...)
   * @param {Number} {timeout} 当前请求的超时时间
   * @param {Object} {params} 当前请求的参数
   * @returns 返回当前请求的promise
   */
  static request(url, { fetch, baseUrl, method = REQUEST_METHOD.Get, timeout = 30000, params = {}} = {}) {
    const $fetch = fetch || axios;
    return new Promise((resolve, reject) => {
      $fetch({
        url,
        baseURL: baseUrl,
        method,
        timeout,
        params
      }).then(res => {
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