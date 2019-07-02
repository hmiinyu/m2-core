/**
 * @file DataUtil
 * @author Miracle He
 * @version v1.0.0
 * @description 基于业务数据处理工具类(字典，时间等)
 * @createDate 2019-01-20
 */
import moment from 'moment';
import { DataType } from '../data';
import { DATA_SEPARATOR, DATE_FORMATTER, LETTER_CASE, DATA_REGEX_PATTERN, TABLE_COLUMN_WIDTH } from '../constants';

export class DataUtil {
  /**
   * @method 获取指定类型的字典中所有的项目
   * @param {Array} dict 当前字典数据源(一般为字典数组集合)
   * @param {String} type 字典类型
   * @param {Object} args 扩展配置参数(可配置字段名称)
   * @desc 如当前的字典数据源不存在或未找到指定的字典类型，则都返回空数组
   * @returns {Array} 返回对应字典类型的[{key,value}]
   */
  static getDictItems(dict, type, {typeName = 'type', itemsName = 'items'} = {}) {
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
  static clone(item, {deep, asArray} = {deep: true, asArray: false}) {
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
   * @method 获取介于最小值和最大值之间的随机数
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @returns {Number} 返回对应的随机数
   */
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * @method 获取介于最小值和最大值之间的随机颜色
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @returns {String} 返回对应的随机颜色
   */
  static randomColor(min, max) {
    var r = DataUtil.randomNumber(min, max);
    var g = DataUtil.randomNumber(min, max);
    var b = DataUtil.randomNumber(min, max);
    return `rgb(${r},${g},${b})`;
  }

  /**
   * @method 使用moment格式化指定日期(不带时分秒)
   * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
   * @param {String} format 格式化字符串(默认：YYYY-MM-DD)
   * @returns {String} 返回格式化之后的日期
   */
  static formatDate(date, format = DATE_FORMATTER.date) {
    if (!date) return '';
    return moment(date).format(format);
  }

  /**
   * @method 使用moment格式化指定完整日期
   * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
   * @param {Boolean} { short } 是否格式化为不带秒的日期(默认：true，如2019-01-20 12:30)
   * @param {String} { format } 指定格式化字符串(将忽略short配置)
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
   * @param {Boolean} { short } 是否格式化为不带秒的日期(默认：true，如12:30)
   * @param {String} { format } 指定格式化字符串(将忽略short配置)
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
   * @method 获取最近的一年12个月
   * @param {Object} {separator,current} 年月分隔符,是否包含当前月
   * @returns {String} 返回格式化之后的月份
   */
  static getLast12Months({separator = '-', current = true} = {}) {
    const result = [];
    const date = new Date();
    date.setMonth(current ? date.getMonth() + 1 : date.getMonth(), 1); // 获取到当前月份,设置月份
    for (let i = 0; i < 12; i++) {
      date.setMonth(date.getMonth() - 1); // 每次循环一次 月份值减1
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      result.push(date.getFullYear() + separator + (month));
    }
    return result;
  }

  /**
   * @method 获取带星号的文本
   * @param String item 当前需要处理的文本
   * @param {Object} {stars,ignore,before} 添加多少个星号,是否不处理(原文返回),星号前导字符数
   * @returns {String} 返回处理之后的文本
   */
  static getSecureText(item, {stars = 4, ignore = false, before = 3} = {}) {
    const len = item.length;
    if (stars <= 0 || len < stars + before || ignore) {
      return item;
    }
    let secure = '';
    for (let i = 1; i <= stars; i++) {
      secure += '*';
    }

    const pattern = DATA_REGEX_PATTERN.secure.replace('{before}',`{${before}}`).replace('{after}', `{${len - before - stars}}`);
    return item.replace(new RegExp(pattern), '$1' + secure + '$2');
  }

  /**
   * @method 获取所有的数字
   */
  static getAllNumbers() {
    return '0,1,2,3,4,5,6,7,8,9'.split(',');
  }

  /**
   * @method 获取所有的字母
   */
  static getAllLetters() {
    return 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',');
  }

  /**
   * @method 获取指定对象/数组指定列对应的数组或对象
   * @param source 当前指定的数组或对象
   * @param {Array} props 指定的列(可多列)
   * @returns {Array|Object} 返回指定列对应的数组或对象
   */
  static pick(source, ...props) {
    const _props = DataType.isArray(props) ? props[0] : props;
    const _pickProps = (current, props) => props.reduce((prop, val) =>
      (val in current && (prop[val] = current[val]), prop), {});  // eslint-disable-line
    if (DataType.isObject(source)) {
      return _pickProps(source, _props);
    }
    if (DataType.isArray(source)) {
      return source.map(item => _pickProps(item, _props));
    }
    return source;
  }

  /**
   * @method 将字符串按大小字母分隔并返回(大写，小写，原样)
   * @param {String} item 当前指定的字符串
   * @param {Object} separaror 分隔符（默认：_）
   * @param {Object} letterCase 以哪种形式返回（默认: 'upper', 也可为lower,other）
   * @returns {Array} 返回操作后的字符串
   */
  static uncamelize(item, {separaror = DATA_SEPARATOR.underline, letterCase = LETTER_CASE.Upper} = {}) {
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

  /**
   * @method 将字符串首字母大写并返回
   * @param {String} item 当前指定的字符串
   * @returns {String} 返回操作后的字符串
   */
  static toUpperFirst(item) {
    if (!item || !DataType.isString(item)) return item;
    return item.charAt(0).toUpperCase() + item.slice(1);
  }

  /**
   * @method 获取表格固定列
   * @param {Array} columns 表格列配置数组
   * @param {Object} {leftCols} 左侧固定列（必须）
   * @param {Object} {rightCols} 右侧固定列（非必须）
   * @returns {Object} 返回配置完毕后的列(自动计算宽度)
   */
  static getFixColumns(columns, {leftCols = [], rightCols = []} = {}) {
    const result = {columns: [], width: 0, check: true};
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
  static addActionColumn(columns, render = () => {
  }, options = {}) {
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
