/**
 * @file DataEnv
 * @author Miracle He
 * @version v1.0.0
 * @description 获取应用的环境变量基础配置
 * @createDate 2019-05-12
 */
export const DataEnv = {
  dev: { env: 'development', alias: 'dev' },
  st: { env: 'stagingment', alias: 'st' },
  uat: { env: 'integration', alias: 'uat' },
  prod: { env: 'production', alias: 'prod' }
};
// 是否为开发环境
export const IsDev = process.env.NODE_ENV === 'development';
