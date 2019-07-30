import { DataStorage } from './data-storage';

/**
 * @file DataEnv
 * @author Miracle He
 * @version v1.0.0
 * @description 获取应用的环境变量基础配置
 * @createDate 2019-05-12
 */
export const DataEnv = {
  local: { env: 'localization', alias: 'local' },
  dev: { env: 'development', alias: 'dev' },
  st: { env: 'stagingment', alias: 'st' },
  uat: { env: 'integration', alias: 'uat' },
  prod: { env: 'production', alias: 'prod' }
};
// 是否为开发环境
export const IsDev = process.env.NODE_ENV === 'development';
export const getEnvConfig = (env, key = '') => {
  let config;
  const _key = key ? `_${key}` : '';
  const _cacheKey = `m2:app_env_config${_key}`;

  if (!IsDev) {
    config = DataStorage.get(_cacheKey);
    if (config) return config;
  }

  const buildEnv = process.env.BUILD_ENV;
  for (let prop in env) {
    const currentEnv = { ...(DataEnv[prop] || { env: prop, alias: prop }), ...env[prop] };
    if (currentEnv.env === buildEnv || currentEnv.alias === buildEnv) {
      config = key ? currentEnv[key] : currentEnv;
      if (config) {
        !IsDev && DataStorage.set(_cacheKey, config);
      }
      break;
    }
  }

  return config;
};
