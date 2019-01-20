/**
 * @file UrlUtil
 * @author Miracle He
 * @version v1.0.0
 * @description 基于URL处理工具类
 * @createDate 2019-01-20
 */
import { DataType } from '../data';

export class UrlUtil {
  /**
   * @method 页面hash跳转
   * @param {String} url 当前跳转的url
   * @desc 如当前参数url不以#开头，则将自动添加#
   * @throws 如当前参数url为空或非字符串类型，则不会跳转并打印错误
   */
  static redirect(url) {
    if (!url || !DataType.isString(url)) {
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
  static getHashValue(url = '') {
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
  static getQueryValue(name, url = '') {
    url = url || window.location.search;
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const matches = url.substr(1).match(reg);
    return matches ? unescape(matches[2]) : '';
  }
}