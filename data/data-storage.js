/**
 * @file DataStorage
 * @author Miracle He
 * @version v1.0.0
 * @description 基于localStorage/sessionStorage封装的存储类
 * @createDate 2019-01-20
 */
import { STORAGE_TYPE } from '../constants';
import { DataType } from './data-type';

const _store_core = (storageType) => {
  return storageType === STORAGE_TYPE.Local ? localStorage : sessionStorage; 
};
export class DataStorage {
  /**
   * @method 获取存储实例中指定key对应的值
   * @param key 当前存储的key
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   * @desc 值可能为简单类型，对象或数组
   * @returns 返回当前存储key对应的值
   */
  static get(key, storageType = STORAGE_TYPE.Local) {
    const _store = _store_core(storageType);
    try {
      return JSON.parse(_store[key]);
    } catch (e) {
      return _store.getItem(key);
    }
  }
  /**
   * @method 设置指定key和value到储存实例中
   * @param key 当前存储的key
   * @param value 当前存储的value
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   * @desc 支持简单数据类型，对象或数组的存储
   */
  static set(key, value, storageType = STORAGE_TYPE.Local) {
    const _store = _store_core(storageType);
    if (DataType.isObject(value) || DataType.isArray(value)) {
      _store[key] = JSON.stringify(value);
    } else {
      _store.setItem(key, value);
    }
  }

  /**
   * @method 从存储实例中删除指定的key
   * @param key 当前存储的key
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   */
  static remove(key, storageType = STORAGE_TYPE.Local) {
    const _store = _store_core(storageType);
    _store.removeItem(key);
  }

  /**
   * @method 从存储实例中删除所有的key
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   */
  static clear(storageType = STORAGE_TYPE.Local) {
    const _store = _store_core(storageType);
    _store.clear();
  }
}
