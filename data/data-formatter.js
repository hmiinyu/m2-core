import { DataUtil } from '../utils/data-util';

export const formatDate = DataUtil.formatDate;
export const formatDateTime = DataUtil.formatDateTime;
export const formatTime = DataUtil.formatTime;
/**
 * 数字千分位格式化
 * @public
 * @param number money 数值
 * @param int precision 小数位精度(默认为2)
 * @return string
 */
export const formatMoney = (money, precision = 2) => {
  if (isNaN(money)) return '';
  let [temp, digit, integer, buffer, positive] = [0.00, 0, 0, [], true];
  const _zero = (val, len) => {
    var _temp = val.toString();
    var _buffer = [];
    for (let i = 0, loop = len - _temp.length; i < loop; i++) {
      _buffer.push('0');
    }
    _buffer.push(_temp);
    return _buffer.join('');
  };

  positive = (money >= 0);//取出正负号
  temp = (isNaN(temp = parseFloat(money))) ? 0 : Math.abs(temp); // 强制转换为绝对值数浮点
  // 所有内容用正数规则处理
  integer = parseInt(temp); //分离整数部分
  digit = parseInt((temp - integer) * Math.pow(10, precision) + 0.5); // 分离小数部分(四舍五入)

  do {
    buffer.unshift(_zero(integer % 1000, 3));
  } while ((integer = parseInt(integer / 1000)));
  buffer[0] = parseInt(buffer[0]).toString(); // 最高段区去掉前导0
  return ((positive) ? '' : '-') + buffer.join(',') + '.' + ((0 === digit) ? '00' : _zero(digit, precision));
};

/**
 * 将千分位格式的数字字符串转换为浮点数
 * @public
 * @param string money 数值字符串
 * @return float
 */
export const unformatMoney = (money) => {
  var temp = parseFloat(money.replace(/,/g, ''));
  return (isNaN(temp) ? 0 : temp);
};
