"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataUtil = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _data = require("../data");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataUtil =
/*#__PURE__*/
function () {
  function DataUtil() {
    _classCallCheck(this, DataUtil);
  }

  _createClass(DataUtil, null, [{
    key: "getDictItems",

    /**
     * @method 获取指定类型的字典中所有的项目
     * @param {Array} dict 当前字典数据源(一般为字典数组集合)
     * @param {String} type 字典类型
     * @param {Object} args 扩展配置参数(可配置字段名称)
     * @desc 如当前的字典数据源不存在或未找到指定的字典类型，则都返回空数组
     * @returns {Array} 返回对应字典类型的[{key,value}]
     */
    value: function getDictItems(dict, type) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$typeName = _ref.typeName,
          typeName = _ref$typeName === void 0 ? 'type' : _ref$typeName,
          _ref$itemsName = _ref.itemsName,
          itemsName = _ref$itemsName === void 0 ? 'items' : _ref$itemsName;

      if (!dict || !type) return [];
      var dictType = dict.find(function (item) {
        return item[typeName] === type;
      });
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

  }, {
    key: "getDictValue",
    value: function getDictValue(dict, type, key) {
      var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          _ref2$separator = _ref2.separator,
          separator = _ref2$separator === void 0 ? _constants.DATA_SEPARATOR.comma : _ref2$separator,
          _ref2$typeName = _ref2.typeName,
          typeName = _ref2$typeName === void 0 ? 'type' : _ref2$typeName,
          _ref2$itemsName = _ref2.itemsName,
          itemsName = _ref2$itemsName === void 0 ? 'items' : _ref2$itemsName,
          _ref2$keyName = _ref2.keyName,
          keyName = _ref2$keyName === void 0 ? 'key' : _ref2$keyName,
          _ref2$valueName = _ref2.valueName,
          valueName = _ref2$valueName === void 0 ? 'value' : _ref2$valueName;

      if (!dict || !type || !key && key !== '0' && key !== false) return key;
      var dictType = dict.find(function (item) {
        return item[typeName] === type;
      });
      if (!dictType) return key;

      if (_data.DataType.isArray(key)) {
        var dictItem = dictType[itemsName].filter(function (item) {
          return key.indexOf(item[keyName]) > -1;
        });
        return dictItem.map(function (item) {
          return item[valueName];
        }).join(separator);
      } else {
        if (_data.DataType.isBoolean(key)) {
          key = key ? '1' : '0';
        }

        var _dictItem = dictType[itemsName].find(function (item) {
          return item[keyName] === key;
        });

        return _dictItem ? _dictItem[valueName] : key;
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

  }, {
    key: "extend",
    value: function extend(target, source) {
      var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // 如为浅拷贝(只支持对象或者数组的的拷贝)，则直接返回本身
      if (!deep || !_data.DataType.isPlainObject(source) && !_data.DataType.isArray(source)) return source;

      for (var prop in source) {
        var isPlainObjectForSourceProp = _data.DataType.isPlainObject(source[prop]);

        var isPlainObjectForTargetProp = _data.DataType.isPlainObject(target[prop]);

        var isArrayForSourceProp = _data.DataType.isArray(source[prop]);

        var isArrayForTargetProp = _data.DataType.isArray(target[prop]);

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

  }, {
    key: "clone",
    value: function clone(item) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        deep: true,
        asArray: false
      },
          deep = _ref3.deep,
          asArray = _ref3.asArray;

      if (_data.DataType.isArray(item)) {
        var target = this.extend([], item, deep);
        return target;
      } else if (_data.DataType.isObject(item)) {
        var _target = this.extend({}, item, deep);

        return asArray ? [_target] : _target;
      }

      return asArray ? [item] : item;
    }
    /**
     * @method 获取指定长度的随机字符串
     * @param {Number} len 指定长度(默认：32)
     * @returns {String} 返回对应的随机字符串
     */

  }, {
    key: "randomString",
    value: function randomString() {
      var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

      /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length;
      var result = '';

      for (var i = 0; i < len; i++) {
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

  }, {
    key: "randomNumber",
    value: function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    /**
     * @method 获取介于最小值和最大值之间的随机颜色
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {String} 返回对应的随机颜色
     */

  }, {
    key: "randomColor",
    value: function randomColor(min, max) {
      var r = DataUtil.randomNumber(min, max);
      var g = DataUtil.randomNumber(min, max);
      var b = DataUtil.randomNumber(min, max);
      return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
    }
    /**
     * @method 使用moment格式化指定日期(不带时分秒)
     * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
     * @param {String} format 格式化字符串(默认：YYYY-MM-DD)
     * @returns {String} 返回格式化之后的日期
     */

  }, {
    key: "formatDate",
    value: function formatDate(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATE_FORMATTER.date;
      if (!date) return '';

      try {
        return (0, _moment["default"])(new Date(date).toISOString()).format(format);
      } catch (_unused) {
        return (0, _moment["default"])(date).format(format);
      }
    }
    /**
     * @method 使用moment格式化指定完整日期
     * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
     * @param {Boolean} { short } 是否格式化为不带秒的日期(默认：true，如2019-01-20 12:30)
     * @param {String} { format } 指定格式化字符串(将忽略short配置)
     * @returns {String} 返回格式化之后的日期
     */

  }, {
    key: "formatDateTime",
    value: function formatDateTime(date) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref4$short = _ref4["short"],
          _short = _ref4$short === void 0 ? true : _ref4$short,
          format = _ref4.format;

      if (format) {
        return DataUtil.formatDate(date, format);
      }

      return DataUtil.formatDate(date, _short ? _constants.DATE_FORMATTER.datetime_short : _constants.DATE_FORMATTER.datetime);
    }
    /**
     * @method 使用moment格式化指定时间
     * @param {Number} date 需要格式化的日期, 如日期未传入则获取当前日期
     * @param {Boolean} { short } 是否格式化为不带秒的日期(默认：true，如12:30)
     * @param {String} { format } 指定格式化字符串(将忽略short配置)
     * @returns {String} 返回格式化之后的时间
     */

  }, {
    key: "formatTime",
    value: function formatTime(date) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$short = _ref5["short"],
          _short2 = _ref5$short === void 0 ? true : _ref5$short,
          format = _ref5.format;

      if (format) {
        return DataUtil.formatDate(date, format);
      }

      return DataUtil.formatDate(date, _short2 ? _constants.DATE_FORMATTER.time_short : _constants.DATE_FORMATTER.time);
    }
    /**
     * @method 获取最近的一年12个月
     * @param {Object} {separator,current} 年月分隔符,是否包含当前月
     * @returns {String} 返回格式化之后的月份
     */

  }, {
    key: "getLast12Months",
    value: function getLast12Months() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$separator = _ref6.separator,
          separator = _ref6$separator === void 0 ? '-' : _ref6$separator,
          _ref6$current = _ref6.current,
          current = _ref6$current === void 0 ? true : _ref6$current;

      var result = [];
      var date = new Date();
      date.setMonth(current ? date.getMonth() + 1 : date.getMonth(), 1); // 获取到当前月份,设置月份

      for (var i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1); // 每次循环一次 月份值减1

        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        result.push(date.getFullYear() + separator + month);
      }

      return result;
    }
    /**
     * @method 获取带星号的文本
     * @param String item 当前需要处理的文本
     * @param {Object} {stars,ignore,before,after} 添加多少个星号,是否不处理(原文返回),星号前导字符数,星号后导字符数
     * @returns {String} 返回处理之后的文本
     */

  }, {
    key: "getSecureText",
    value: function getSecureText(item) {
      var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref7$stars = _ref7.stars,
          stars = _ref7$stars === void 0 ? 4 : _ref7$stars,
          _ref7$ignore = _ref7.ignore,
          ignore = _ref7$ignore === void 0 ? false : _ref7$ignore,
          _ref7$before = _ref7.before,
          before = _ref7$before === void 0 ? 3 : _ref7$before,
          _ref7$after = _ref7.after,
          after = _ref7$after === void 0 ? 4 : _ref7$after;

      var len = item.length;

      if (stars <= 0 || len < stars + before + after || ignore) {
        return item;
      }

      var secure = '';

      for (var i = 1; i <= stars; i++) {
        secure += '*';
      }

      var pattern = _constants.DATA_REGEX_PATTERN.secure.replace('{before}', "{".concat(before, "}")).replace('{after}', "{".concat(after, "}"));

      return item.replace(new RegExp(pattern), '$1' + secure + '$2');
    }
    /**
     * @method 获取所有的数字
     */

  }, {
    key: "getAllNumbers",
    value: function getAllNumbers() {
      return '0,1,2,3,4,5,6,7,8,9'.split(',');
    }
    /**
     * @method 获取所有的字母
     */

  }, {
    key: "getAllLetters",
    value: function getAllLetters() {
      return 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',');
    }
    /**
     * @method 获取指定对象/数组指定列对应的数组或对象
     * @param source 当前指定的数组或对象
     * @param {Array} props 指定的列(可多列)
     * @returns {Array|Object} 返回指定列对应的数组或对象
     */

  }, {
    key: "pick",
    value: function pick(source) {
      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      var _props = _data.DataType.isArray(props) ? props[0] : props;

      var _pickProps = function _pickProps(current, props) {
        return props.reduce(function (prop, val) {
          return val in current && (prop[val] = current[val]), prop;
        }, {});
      }; // eslint-disable-line


      if (_data.DataType.isObject(source)) {
        return _pickProps(source, _props);
      }

      if (_data.DataType.isArray(source)) {
        return source.map(function (item) {
          return _pickProps(item, _props);
        });
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

  }, {
    key: "uncamelize",
    value: function uncamelize(item) {
      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref8$separaror = _ref8.separaror,
          separaror = _ref8$separaror === void 0 ? _constants.DATA_SEPARATOR.underline : _ref8$separaror,
          _ref8$letterCase = _ref8.letterCase,
          letterCase = _ref8$letterCase === void 0 ? _constants.LETTER_CASE.Upper : _ref8$letterCase;

      if (!this.isString(item)) return item;
      var result = item.replace(/([a-z\d])([A-Z])/g, '$1' + separaror + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separaror + '$2');

      if (letterCase === _constants.LETTER_CASE.Upper) {
        return result.toUpperCase();
      } else if (letterCase === _constants.LETTER_CASE.Lower) {
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

  }, {
    key: "toUpperFirst",
    value: function toUpperFirst(item) {
      if (!item || !_data.DataType.isString(item)) return item;
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
  }]);

  return DataUtil;
}();

exports.DataUtil = DataUtil;