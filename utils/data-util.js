/**
 * @file DataUtil
 * @author Miracle He
 * @version v1.0.0
 * @description 基于业务数据处理工具类(字典，时间等)
 * @createDate 2019-01-20
 */
import moment from 'moment';
import { DataType } from '../data';
import { DATA_SEPARATOR, DATE_FORMATTER, TABLE_COLUMN_WIDTH } from '../constants';

export class DataUtil {
  /**
   * @method 获取指定类型的字典中所有的项目
   * @param {Array} dict 当前字典数据源(一般为字典数组集合)
   * @param {String} type 字典类型 
   * @param {Object} args 扩展配置参数(可配置字段名称) 
   * @desc 如当前的字典数据源不存在或未找到指定的字典类型，则都返回空数组
   * @returns {Array} 返回对应字典类型的[{key,value}]
   */
  static getDictItems(dict, type, { typeName = 'type', itemsName = 'items' } = {}) {
    if (!dict || !type) return [];
    const dictType = dict.find(item => item[typeName] === type);
    return dictType && dictType[itemsName] ? dictType[itemsName] : [];
  }
  /**
   * @method 获取指定类型的字典中对应key的值
   * @param {Array} dict 当前字典数据源(一般为字典数组集合)
   * @param {String} type 字典类型 
   * @param {String} key 指定的key值(一般为服务器下发)) 
   * @param {Object} args 扩展配置参数(可配置字段名称) 
   * @desc 如当前的字典数据源不存在或未找到指定的字典类型或未找到字典中指定的key，则都返回当前key值
   * @returns {String} 返回字典key对应的value值
   */
  static getDictValue(dict, type, key, { 
    separator = DATA_SEPARATOR.comma, 
    typeName = 'type', 
    itemsName = 'items', 
    keyName = 'key', 
    valueName = 'value' 
  } = {}) {
    if (!dict || !type || (!key && key !== '0' && key !== false)) return key;
    const dictType = dict.find(item => item[typeName] === type);
    if (!dictType) return key;
    if (DataType.isArray(key)) {
      const dictItem = dictType[itemsName].filter(item => key.indexOf(item[keyName]) > -1);
      return dictItem.map(item => item[valueName]).join(separator);
    } else {
      if (DataType.isBoolean(key)) {
        key = key ? '1' : '0';
      }
      const dictItem = dictType[itemsName].find(item => item[keyName] === key);
      return dictItem ? dictItem[valueName] : key;
    }
  }
  /**
   * @method 扩展(拷贝)已有的数据类型(数组或对象)
   * @param {Array|Object} target 拷贝的目标（对象或数组，依赖于拷贝来源）
   * @param {Array|Object} source 拷贝的来源（对象或数组） 
   * @param {Boolean} deep 是否进行深拷贝（默认：true）
   * @desc 只能对数组或对象进行深拷贝，其他数据类型都只能完成浅拷贝
   * @returns {Array|Object} 返回扩展(拷贝)之后的类型
   */
  static extend(target, source, deep = true) {
    // 如为浅拷贝(只支持对象或者数组的的拷贝)，则直接返回本身
    if (!deep || (!DataType.isPlainObject(source) && !DataType.isArray(source))) return source; 
    for (const prop in source) {
      const isPlainObjectForSourceProp = DataType.isPlainObject(source[prop]);
      const isPlainObjectForTargetProp = DataType.isPlainObject(target[prop]);
      const isArrayForSourceProp = DataType.isArray(source[prop]);
      const isArrayForTargetProp = DataType.isArray(target[prop]);
      if (deep && (isPlainObjectForSourceProp || isArrayForSourceProp)) {
        if (isPlainObjectForSourceProp && !isPlainObjectForTargetProp) {
          target[prop] = {};
        }
        if (isArrayForSourceProp && !isArrayForTargetProp) {
          target[prop] = [];
        }
        this.extend(target[prop], source[prop], deep);
      } else if (source[prop] !== undefined) {
        target[prop] = source[prop];
      }
    }
    return target;
  }
 /**
   * @method 对指定的数据类型(数组或对象)进行拷贝
   * @param {Array|Object} item 拷贝的来源（对象或数组）
   * @param {Object} { deep } 是否进行深拷贝（默认：true）
   * @param {Boolean} { asArray } 拷贝之后是否转化为数组（仅仅只针对对象拷贝，默认：false）
   * @returns {Array|Object} 返回拷贝之后的类型
   */
  static clone(item, { deep, asArray } = { deep: true, asArray: false }) {
    if (DataType.isArray(item)) {
      const target = this.extend([], item, deep);
      return target;
    } else if (DataType.isObject(item)) {
      const target = this.extend({}, item, deep);
      return asArray ? [target] : target;
    }
    return asArray ? [item] : item;
  }
  /**
   * @method 获取指定长度的随机字符串
   * @param {Number} len 指定长度(默认：32)
   * @returns {String} 返回对应的随机字符串
   */
  static randomString(len = 32) {
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = $chars.length;
    let result = '';
    for (let i = 0; i < len; i++) {
      result += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result.toLowerCase();
  }
   /**
   * @method 使用moment格式化指定日期(不带时分秒)
   * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
   * @param {Number} format 格式化字符串(默认：YYYY-MM-DD)
   * @returns {String} 返回格式化之后的日期
   */
  static formatDate(date, format = DATE_FORMATTER.date) {
    date = DataType.defaultVal(date, new Date());
    return moment(date).format(format);
  }
  /**
   * @method 使用moment格式化指定完整日期
   * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
   * @param {Object} { short } 是否格式化为不带秒的日期(默认：true，如2019-01-20 12:30)
   * @param {Object} { format } 指定格式化字符串(将忽略short配置)
   * @returns {String} 返回格式化之后的日期
   */
  static formatDateTime(date, { 
    short = true, 
    format
  } = {}) {
    if (format) {
      return DataUtil.formatDate(date, format);
    } 
    return DataUtil.formatDate(date, short ? DATE_FORMATTER.datetime_short : DATE_FORMATTER.datetime);
  }
  /**
   * @method 使用moment格式化指定时间
   * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
   * @param {Object} { short } 是否格式化为不带秒的日期(默认：true，如12:30)
   * @param {Object} { format } 指定格式化字符串(将忽略short配置)
   * @returns {String} 返回格式化之后的时间
   */
  static formatTime(date, { 
    short = true, 
    format
  } = {}) {
    if (format) {
      return DataUtil.formatDate(date, format);
    } 
    return DataUtil.formatDate(date, short ? DATE_FORMATTER.time_short : DATE_FORMATTER.time);
  }
  /**
   * @method 获取表格固定列
   * @param {Array} columns 表格列配置数组
   * @param {Object} {leftCols} 左侧固定列（必须）
   * @param {Object} {rightCols} 右侧固定列（非必须）
   * @returns {Object} 返回配置完毕后的列(自动计算宽度)
   */
  static getFixColumns(columns, { leftCols = [], rightCols = [] } = {}) {
    const result = { columns: [], width: 0, check: true };
    if (!DataType.isArray(columns) || DataType.isEmptyArray(columns)) {
      console.warn('当前需要固定列为空，固定列效果可能失效。');
      result.columns = columns;
      result.check = false;
      return result;
    }
    if (DataType.isEmptyArray(leftCols)) {
      console.warn('当前未配置左侧固定列，固定列效果可能失效。');
      result.columns = columns;
      result.check = false;
    }
    if (!DataType.isEmptyArray(rightCols)) {
      if (rightCols.some(item => leftCols.indexOf(item) > -1)) {
        console.warn('左侧固定列和右侧固定列中不能包含同名的列，固定列效果可能失效。');
        result.columns = columns;
        result.check = false;
      }
    }
    columns.forEach(item => {
      item.width = DataType.defaultVal(item.width, this.getColumnWidth());
      if (result.check) {
        const columnName = item.dataIndex;
        if (leftCols.indexOf(columnName) > -1) {
          result.columns.push({...item, fixed: 'left'});
        } else if (rightCols.indexOf(columnName) > -1) {
          result.columns.push({...item, fixed: 'right'});
        } else {
          result.columns.push({...item});
        }
      }
      if (!item.width) {
        console.warn(`当前列${item.dataIndex}未配置宽度，固定列效果可能失效。`);
      }
      result.width += item.width;
    })
    delete result.check;
    return result;
  }
  /**
   * @method 获取表格列宽
   * @param {String} width 列宽(默认：'md', 还可配置'xs','sm','md','lg','xl')
   * @returns {Number} 返回指定的列宽
   */
  static getColumnWidth(width = 'md') {
    if (Object.keys(TABLE_COLUMN_WIDTH).indexOf(width) > -1) {
      return TABLE_COLUMN_WIDTH[width];
    }
    const $width = parseInt(width);
    return isNaN($width) || $width === 0 ? TABLE_COLUMN_WIDTH['md'] : $width;
  }
  /**
   * @method 为表格配置操作列
   * @param {Array} columns 表格列配置数组
   * @param {Function} render 配置渲染函数(可通过item参数获取当前行的数据
   * @param {Object} options 额外配置项
   * @returns {Array} 返回带有操作列的表格
   */
  static addActionColumn(columns, render = () => {}, options = {}) {
    // 首先去除之前action列
    const result = columns.filter(item => item.dataIndex !== 'action')
    options = { 
      title: '操作', 
      dataIndex: 'action', 
      width: DataUtil.getColumnWidth('lg'), 
      key: DataUtil.randomString(10), 
      ...options 
    };
    result.push({
      ...options,
      render
    });
    return result
  }
}