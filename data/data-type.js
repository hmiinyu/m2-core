/**
 * @file DataType
 * @author Miracle He
 * @version v1.0.0
 * @description 基于数据类型基础类
 * @createDate 2019-01-20
 */
import { DATA_SEPARATOR, LETTER_CASE, DATA_REGEX_PATTERN } from '../constants';

const _data_core = {
  _is: (type, primitive = false) => {
    return function (obj) {
      return primitive ? typeof obj === type.toLowerCase() : 
                         {}.toString.call(obj) === '[object ' + type + ']';
    };
  },
  _match: (item, pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(item);
  },
  _isWindow: (item) => {
    return item && typeof item === 'object' && 'setInterval' in item;
  },
  _hasOwn: Object.prototype.hasOwnProperty
};
export class DataType {
  /**
   * @method 检测当前类型是否为对象
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为对象则返回true, 否则返回false
   */
  static isObject(item) {
    return _data_core._is('Object')(item);
  }
  /**
   * @method 检测当前类型是否为普通对象(非window或系统对象)
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为普通对象则返回true, 否则返回false
   */
  static isPlainObject(item) {
    const { _is, _isWindow, _hasOwn } = _data_core;
    if (!item || !_is('Object')(item) || _isWindow(item) || item.nodeType) {
      return false;
    }
    // 兼容IE
    try {
      if (item.constructor && !_hasOwn.call(item, 'constructor') 
        && !_hasOwn.call(item.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }
    let key;
    // for (key in item) {}
    return key === undefined || _hasOwn.call(item, key);
  }
  /**
   * @method 检测当前类型是否为数组
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为数组则返回true, 否则返回false
   */
  static isArray(item) {
    return Array.isArray(item) || _data_core._is('Array')(item);
  }
  /**
   * @method 检测当前类型是否为空数组
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为空数组则返回true, 否则返回false
   */
  static isEmptyArray(item) {
    return this.isArray(item) && item.length === 0;
  }
  /**
   * @method 检测当前类型是否为函数
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为函数则返回true, 否则返回false
   */
  static isFunction(item) {
    return _data_core._is('Function')(item);
  }
  /**
   * @method 检测当前类型是否为字符串
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为字符串则返回true, 否则返回false
   */
  static isString(item) {
    return _data_core._is('String', true)(item);
  }
  /**
   * @method 检测当前类型是否为数字
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为数字则返回true, 否则返回false
   */
  static isNumber(item) {
    return _data_core._is('Number', true)(item);
  }
  /**
   * @method 检测当前类型是否为布尔
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为布尔则返回true, 否则返回false
   */
  static isBoolean(item) {
    return _data_core._is('Boolean', true)(item);
  }
  /**
   * @method 检测当前类型是否为Guid对象
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为Guid则返回true, 否则返回false
   */
  static isGuid(item) {
    return _data_core._match(item, DATA_REGEX_PATTERN.guid);
  }
  /**
   * @method 检测当前类型是否为手机号码
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.mobile）
   * @returns {Boolean} 如果为手机号码则返回true, 否则返回false
   */
  static isMobilePhone(item, pattern = DATA_REGEX_PATTERN.mobile) {
    return _data_core._match(item, pattern);
  }
  /**
   * @method 检测当前类型是否为座机号码
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.tel）
   * @returns {Boolean} 如果为座机号码则返回true, 否则返回false
   */
  static isTelPhone(item, pattern = DATA_REGEX_PATTERN.tel) {
    return _data_core._match(item, pattern);
  }
  /**
   * @method 检测当前类型是否为电话号码(手机或座机)
   * @param item 当前检测的类型
   * @param {Object} {mobile} 当前检测手机的正则匹配表达式（默认值：DATA_REGEX_PATTERN.mobile）
   * @param {Object} {tel} 当前检测座机的正则匹配表达式（默认值：DATA_REGEX_PATTERN.tel）
   * @returns {Boolean} 如果为电话号码则返回true, 否则返回false
   */
  static isPhone(item, { mobile = DATA_REGEX_PATTERN.mobile, tel = DATA_REGEX_PATTERN.tel } = {}) {
    return this.isMobilePhone(item, mobile) || this.isTelPhone(item, tel);
  }
  /**
   * @method 检测当前类型是否为电子邮件
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.email）
   * @returns {Boolean} 如果为电子邮件则返回true, 否则返回false
   */
  static isEmail(item, pattern = DATA_REGEX_PATTERN.email) {
    return _data_core._match(item, pattern);
  }
  /**
   * @method 检测当前类型是否为身份证号(支持15位或18位)
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.idcard）
   * @returns {Boolean} 如果为身份证号则返回true, 否则返回false
   */
  static isIdCard(item, pattern = DATA_REGEX_PATTERN.idcard) {
    return _data_core._match(item, pattern);
  }
  /**
   * @method 为当前数据类型提供默认值
   * @param item 当前数据类型
   * @param defaultValue 默认值
   * @returns {Boolean} 如果当前数据类型未定义，则将返回默认值
   */
  static defaultVal(item, defaultValue) {
    return item === undefined ? defaultValue : item;
  }
  /**
   * @method 获取指定对象数组指定列对应的数组
   * @param item 当前指定的数组对象
   * @param {Array} props 指定的列(可多列)
   * @returns {Array} 返回指定列对应的数组
   */
  static pick(item, ...props) {
    return props.reduce((prop, val) => (val in item && (prop[val] = item[val]), prop), {}); // eslint-disable-line
  }
  /**
   * @method 将字符串按大小字母分隔并返回(大写，小写，原样)
   * @param {String} item 当前指定的字符串
   * @param {Object} separaror 分隔符（默认：_）
   * @param {Object} letterCase 以哪种形式返回（默认: 'upper', 也可为lower,other）
   * @returns {Array} 返回操作后的字符串
   */
  static uncamelize(item, { separaror = DATA_SEPARATOR.underline, letterCase = LETTER_CASE.Upper} = {}) {
    if (!this.isString(item)) return item;
    const result = item.replace(/([a-z\d])([A-Z])/g, '$1' + separaror + '$2')
                       .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separaror + '$2');
    if (letterCase === LETTER_CASE.Upper) {
      return result.toUpperCase();
    } else if (letterCase === LETTER_CASE.Lower) {
      return result.toLowerCase();
    } else {
      return result;
    }
  }
}