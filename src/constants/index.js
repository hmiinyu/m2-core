/**
 * @constant 数据分隔符常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const DATA_SEPARATOR = {
  ampersand: '&',
  comma: ',',
  colon: ':',
  semicolon: ';',
  bar: '|',
  hyphen: '-',
  at: '@',
  dollar: '$',
  slash: '/',
  backslash: '\\',
  whitespace: ' '
};
/**
 * @constant 时间格式化常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const DATE_FORMATTER = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  datetime_short: 'YYYY-MM-DD HH:mm',
  time: 'HH:mm:ss',
  time_short: 'HH:mm'
};
/**
 * @constant 正则表达式常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const DATA_REGEX_PATTERN = {
  guid: '^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$',
  mobile: '^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$',
  tel: '^(\\d{3,4}-\\d{7,8}-\\d{1,5})|(^\\d{3,4}-\\d{7,8})$',
  email: '^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\\.){1,4}[a-z]{2,4}$',
  idcard: '^\\d{18,18}|\\d{15,15}|\\d{17,17}x|\\d{17,17}X$'
};
/**
 * @constant 消息框类型常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const MESSAGE_TYPE = {
  Confirm: 'confirm',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Loading: 'loading'
};
/**
 * @constant 消息框位置常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const MESSAGE_POSITION = {
  TopLeft: 'topLeft',
  TopRight: 'topRight',
  BottomLeft: 'bottomLeft',
  BottomRight: 'bottomRight'
};
/**
 * @constant 表格列宽常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const TABLE_COLUMN_WIDTH = {
  xs: 40,
  sm: 60,
  md: 80,
  lg: 120,
  xl: 180
};
/**
 * @constant 存储类型常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const STORAGE_TYPE = {
  Local: 'local',
  Session: 'session'
};
/**
 * @constant 请求方法常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const REQUEST_METHOD = {
  Get: 'get',
  Post: 'post'
};