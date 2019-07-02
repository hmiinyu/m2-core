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
  underline: '_',
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
  idcard: '^\\d{18,18}|\\d{15,15}|\\d{17,17}x|\\d{17,17}X$',
  secure: '^(.{before})(?:\\d+)(.{after})$',
  letter_number: '^(?=.*[0-9])(?=.*[a-zA-Z]).{min,max}$',
  letter_number_char: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{min,max}$',
  letter_number_char_case: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{min,max}$'
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
/**
 * @constant 字符串字母格式
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const LETTER_CASE = {
  Upper: 'upper',
  Lower: 'lower',
  Other: ''
};
/**
 * @constant 请求默认常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const FETCH_DEFAULT_OPTIONS = {
  loading: true,
  method: REQUEST_METHOD.Get,
  params: {},
  key: false,
  keyLen: 5
};
/**
 * @constant 非对称加密算法类型
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const ASYMMETRIC_CRYPTO_TYPE = {
  MD5: { name: 'MD5' },
  SHA1: { name: 'SHA1' },
  SHA3: { name: 'SHA3' },
  SHA224: { name: 'SHA224' },
  SHA256: { name: 'SHA256' },
  SHA384: { name: 'SHA384' },
  SHA512: { name: 'SHA512' },
  HMACMD5: { name: 'HmacMD5', hmac: true },
  HMACSHA1: { name: 'HmacSHA1', hmac: true },
  HMACSHA3: { name: 'HmacSHA3', hmac: true },
  HMACSHA224: { name: 'HmacSHA224', hmac: true },
  HMACSHA256: { name: 'HmacSHA256', hmac: true },
  HMACSHA384: { name: 'HmacSHA384', hmac: true },
  HMACSHA512: { name: 'HmacSHA512', hmac: true },
  PBKDF2: { name: 'PBKDF2', params: { keySize: 128/32, iterations: 10 } },
  EVPKDF: { name: 'EvpKDF', params: { keySize: 128/32, iterations: 10 }  },
  RIPEMD160: { name: 'RIPEMD160', params: { keySize: 128/32, iterations: 10 } },
  NONE: { name: '' }
};
/**
 * @constant 对称加密算法类型
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const SYMMETRIC_CRYPTO_TYPE = {
  BASE64: { name: 'Base64', encoding: true },
  AES: { name: 'AES' },
  DES: { name: 'DES' },
  RC4: { name: 'RC4', iv: false },
  RABBIT: { name: 'Rabbit' },
  RABBITLEGACY: { name: 'RabbitLegacy' },
  NONE: { name: '' }
};
/**
 * @constant 验证码类型常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const VERIFY_CODE_TYPE = {
  letter: 'letter', // 纯字母
  number: 'number', // 纯数字
  letter_number: 'letter_number' // 字母数字组合
};
/**
 * @constant 存储常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const DEFAULT_STORAGE_OPTIONS = {
  storageType: STORAGE_TYPE.Local,
  encryptType: SYMMETRIC_CRYPTO_TYPE.NONE,
  encryptKey: 'm2@m2-storage-key',
  encryptIv: 'm2@m2-storage-iv'
};
/**
 * @constant 图形验证码常量
 * @author Miracle He
 * @version v1.0.0
 * @createDate 2019-01-20
 */
export const DEFAULT_VERIFY_CODE_OPTIONS = {
  canvasId: 'm2-verify-canvas', // canvas的ID
  width: 100, // 默认canvas宽度
  height: 30, // 默认canvas高度
  len: 4, // 默认验证码长度
  ignoreCase: true, // 是否忽略大小写
  autoRefresh: true, // 当验证码比对失败是否自动刷新
  type: VERIFY_CODE_TYPE.letter_number, // 图形验证码默认类型(letter_number:数字字母混合类型、number:纯数字、letter:纯字母)
  strokeLine: false, // 是否添加干扰线
  strokePoint: false, // 是否添加干扰点
  code: ''
};
