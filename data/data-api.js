import { DataType } from './data-type';
import { DataStorage } from './data-storage';
import { IsDev } from './data-env';
import { SYMMETRIC_CRYPTO_TYPE } from '../constants';
/**
 * @file DataApi
 * @author Miracle He
 * @version v1.0.0
 * @description 获取应用Api配置映射
 * @createDate 2019-05-12
 */
const _api_mapping = (config, prefix, mock) => {
  return Object.keys(config).reduce((api, key) => {
    const val = config[key];
    if (DataType.isString(val)) {
      if (!val.startsWith('/')) {
        config[key] = `/${val}`;
      }
      if (mock.urls.indexOf(config[key]) > -1) {
        api[key] = `${prefix}${mock.prefix}${config[key]}`;
      } else {
        api[key] = `${prefix}${config[key]}`;
      }
    }
    if (DataType.isObject(val)) {
      api[key] = _api_mapping(val, prefix, mock);
    }
    return api;
  }, {});
};

const _api_mocking = (config) => {
  let mock = null;
  if (DataType.isArray(config)) {
    mock = {
      prefix: '/mock',
      urls: config
    }
  } else if (DataType.isObject(config)){
    const { prefix = '/mock', urls } = config;
    if (!DataType.isEmptyArray(urls)) {
      mock = {
        prefix,
        urls
      }
    }
  }
  return mock;
};

export const DataApi = (config, prefix = '', mock = null) => {
  let api = {};
  mock = _api_mocking(mock);
  if (!IsDev) {
    api = DataStorage.get('m2:app_api_mapping', { encryptType: SYMMETRIC_CRYPTO_TYPE.DES });
    if (!api) {
      api = _api_mapping(config, prefix, mock);
      DataStorage.set('m2:app_api_mapping', api, { encryptType: SYMMETRIC_CRYPTO_TYPE.DES });
    }
  } else {
    api = _api_mapping(config, prefix, mock);
  }
  return api;
};
