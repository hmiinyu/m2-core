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
export const DataApi = (config, prefix = '') => {
  let api = {};
  if (!IsDev) {
    api = DataStorage.get('m2:app_api_mapping', { encryptType: SYMMETRIC_CRYPTO_TYPE.DES });
    if (api) return api;
  }
  api = Object.keys(config).reduce((api, key) => {
    const val = config[key];
    if (DataType.isString(val)) {
      if (!val.startsWith('/')) {
        config[key] = `/${val}`
      }
      api[key] = `${prefix}${config[key]}`;
    }
    if (DataType.isObject(val)) {
      api[key] = DataApi(val, prefix);
    }
    return api;
  }, {});
  if (!IsDev) {
    DataStorage.set('m2:app_api_mapping', api, { encryptType: SYMMETRIC_CRYPTO_TYPE.DES });
  }
  return api;
};
