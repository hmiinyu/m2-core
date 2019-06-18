## m2-core

[![](https://img.shields.io/badge/m2--core-v1.0.3-green.svg)](https://github.com/hmiinyu/m2-core.git) <br/>
The package is provided utilities and facilities for business frontend framework. [中文文档](hhttps://github.com/hmiinyu/m2-core/master/README_ZH.md "中文文档")

### Usage
 - Install
```bash
npm install m2-core
yarn add m2-core
```
### APIs
 - `DataApi` **function** Get the application api url mapping with the param *config* and *prefix*.
 ##### notes
 the application api mapping file is located: src/features/app/constants/api.conf.js
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | config | object | api key-value pair |  | { 'getDictList': '/dict','getDataList': '/home/data_list', 'getDataItem': '/home/data_item' } |
 | prefix | string | api url prefix | '' | 'api'|
 ```js
 // api.conf.js
 import { DataApi } from 'm2-core'
 
 export default DataApi({
   'getDictList': '/dict',
   'getDataList': '/home/data_list',
   'getDataItem': '/home/data_item'
 }, '/api')
 ````
   - `DataEnv` **object** The application multi-environment configuration.
   ##### notes
   the application env configuration file is located: src/features/app/constants/env.conf.js
   ####
   | prop or func | type | description | example |
   | ------------ | ------------ | ------------ | ------------ |
   | IsDev | boolean | check if the development is true | if (IsDev) { //:todo }||
   | getEnvConfig | func | get the config for **key**, if the key is empty, it will get the current env object entirely | getEnvConfig('api') |
  ```js
  // env.conf.js
  export default {
    dev: {
      api: 'https://easy-mock.com/mock/5cd97b7ceebf633b5de54c25/billingapi',
      // support multi-api config(you need to add apiKey, eg：'mock', 'app')
      // api: {
      //   mock: 'https://easy-mock.com/mock/5cd97b7ceebf633b5de54c25/billingapi',
      //   app: 'https://m2-app.server.com/service_api'
      // }
    },
    st: {
      api: 'https://easy-mock.com/mock/5cd97b7ceebf633b5de54c25/billingapi'
    },
    uat: {
      api: 'https://easy-mock.com/mock/5cd97b7ceebf633b5de54c25/billingapi'
    },
    prod: {
      api: 'https://easy-mock.com/mock/5cd97b7ceebf633b5de54c25/billingapi'
    }
  }
  ```
  - `DataBus` **class** Handle the emit and on/off the event.
  ####
  | prop or func | type | description | example |
  | ------------ | ------------ | ------------ | ------------ |
  | on | func | register the event listener for **type** | DataBus.on('data', (res) => { console.log(res.name);}) |
  | off | func | remove the event handler for **type** | DataBus.off('data'}) |
  | emit | func | trigger the event handler for **type** | DataBus.emit('data', { name: 'Miracle' }}) |
  - `DataType` **class** Check the data type and handle the data conversion.
  #### 
  | prop or func | type | description | example |
  | ------------ | ------------ | ------------ | ------------ |
  | isObject | func | check if is object for **item** | DataType.isObject({ name: 'Miracle'}) |
  | isPlainObject | func | check if is plain object (neither window nor system-built) for **item** | DataType.isPlainObject({ name: 'Miracle'})  |
  | isArray | func | check if is array for **item**  | DataType.isArray([{ name: 'Miracle'}])  |
  | isEmptyArray | func | check if is an empty array for **item**  | DataType.isEmptyArray([])  |
  | isFunction | func | check if is a function for **item**  | DataType.isFunction(()=>{})  | 
  | isString | func | check if is a string for **item**  | DataType.isString('Miracle')  | 
  | isNumber | func | check if is a number for **item**  | DataType.isNumber(100)  | 
  | isBoolean | func | check if is a boolean for **item**  | DataType.isBoolean(true)  | 
  | isGuid | func | check if is a guid for **item**  | DataType.isGuid('a0da5831-7488-464d-8a89-db89b7ff8f2b')  | 
  | isMobilePhone | func | check if is a mobile for **item** and **pattern**（optional） | DataType.isMobilePhone('13366668888')  | 
  | isTelPhone | func | check if is a telephone for **item** and **pattern**（optional） | DataType.isTelPhone('010-66668888')  | 
  | isPhone | func | check if is a mobile or telephone for **item** and **pattern{mobile,tel}**（optional） | DataType.isPhone('010-66668888')  | 
  | isEmail | func | check if is an email address for **item** and **pattern**（optional） | DataType.isEmail('12345678@qq.com')  | 
  | isIdCard | func | check if is an identity card for **item** and **pattern**（optional） | DataType.isIdCard('511381198808083520')  | 
  | isValidPassword | func | check if is a valid password for **item** and **pattern**（optional） | DataType.isValidPassword('1988_$abd')  | 
  | defaultVal | func | get the value for **item** or **defaultValue**(item is undefined) | DataType.defaultVal('loading', true)  | 
  | pick | func | get the partial props for **items** and **props**(multi) | DataType.pick(users, 'name', 'age') | 
  | uncamelize | func | split the camelcase string into separator for **items** and **{separator,letterCase}**(upper,lower) | DataType.uncamelize('getDataList') |
  | toUpperFirst | func | convert the first letter as upper **items** | DataType.toUpperFirst('miracle') |    
    
 
