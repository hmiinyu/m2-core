## m2-core

[![](https://img.shields.io/badge/m2--core-v1.1.4-green.svg)](https://github.com/hmiinyu/m2-core.git) <br/>
The package is provided utilities and facilities for business frontend framework.

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
````
- `DataEvent` **object** The application will register event for window and document.
####
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| scroll | func | register the scroll event listener for **handler**, **threshold** | DataEvent.scroll(() => { console.log('scrolling');}, {threshold: 50}) |
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
- `DataFetch` **class** Provide the http request (promise) based on axios and jsonp.
  #### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| request | func | provide the http request promise for the params **url** and **options**| DataFetch.request('/api/user/list', { env, apiKey, method, timeout, headers, params }) |
| jsonp | func | provide the cross-domain request for the params **url** and **options** | DataFetch.jsonp('http://m2.api.com/getUsers', { callbackKey })  |
- `DataFormatter` **function** Provide data formatter for date, number.
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| formatDate | func | a shortcut for DataUtil.formatDate | formatDate(new Date()) |
| formatDateTime | func | a shortcut for DataUtil.formatDateTime | formatDateTime(new Date()) |
| formatTime | func | a shortcut for DataUtil.formatTime | formatTime(new Date()) |
| formatMoney | func | format the currency into string for **money** and **precision**(default: 2) | formatMoney(123456789.123) |
| unformatMoney | func | unformat the currency into float for **money** | unformatMoney('123,456,789.00') |
- `DataStorage` **class** Provide the uniform api based on localStorage(default), sessionStorage.
  #### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| get | func | get the value from storage for the params **key** and **options**| DataStorage.get('loginUser', { storageType, encryptType }) |
| set | func | save the value into storage for the params **key**, **value** and **options** | DataStorage.set('loginUser', { name: 'Miracle'}, { storageType, encryptType })  |
| remove | func | remove the item from storage for the params **key** and **storageType**| DataStorage.remove('loginUser', STORAGE_TYPE.Local) |
| clear | func | clear all items from storage for the params **storageType**| DataStorage.clear(STORAGE_TYPE.Local) |
- `DataSecurity` **class** Provide the encrypt and decrypt based on symmetric and asymmetric algorithm.
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| encrypt | func | encrypt the raw data for the params **data**, **crypto** and **options({key,iv})** | DataSecurity.encrypt('miracle', SYMMETRIC_CRYPTO_TYPE.DES) |
| decrypt | func | decrypt the encrypted data for the params **data**, **crypto** and **options({key,iv})** | DataSecurity.decrypt('e1cf3f88a2dd46a6', SYMMETRIC_CRYPTO_TYPE.DES)  |
- `GraphicVerifyCode` **class** Provide the verify code based on graphics (canvas).
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| validate | func | check if the user-input same as verify code for the params **val** | const verifyCode = new GraphicVerifyCode('verify_code'); verifyCode.validate(this.$input.value); |
- `DataUtil` **class** Provide the functions for normalize and format data.
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| getDictItems | func | get all items with the specified type from the dict for the params **dict**, **type** | DataUtil.getDictItems(dict, 'user_type', { typeName, itemsName}) |
| getDictValue | func | get the value with the specified type and key from the dict for the params **dict**, **type**, **key** | DataUtil.getDictItems(dict, 'user_type', 'ut001', { typeName, itemsName, keyName, valueName, separator}) |
| extend | func | clone(deep/shallow) the object/array for the params **target**, **source**, **deep** | DataUtil.extend({}, {id:1,name:'miracle',repositories:['m2-core','m2-react','m2-redux']}, true) |
| clone | func | clone(deep/shallow) the object/array for the params **item**, **{deep,asArray}** | DataUtil.clone({id:1,name:'miracle',repositories:['m2-core','m2-react','m2-redux']}, {deep:true,asArray:true}) |
| randomString | func | get the random string for the params **len**（default:32）| DataUtil.randomString(10) |
| randomNumber | func | get the random number for the params **min**, **max** | DataUtil.randomNumber(10, 50) |
| randomColor | func | get the random color for the params **min**, **max** | DataUtil.randomColor(10, 50) |
| formatDate | func | format the date for the params **date**, **format**(default: YYYY-MM-DD) | DataUtil.formatDate(new Date()) |
| formatDateTime | func | format the date time for the params **date**, **{short,format}**(default: YYYY-MM-DD HH:mm[:ss]) | DataUtil.formatDateTime(new Date()) |
| formatTime | func | format the time for the params **date**, **{short,format}**(default: HH:mm[:ss])  | DataUtil.formatTime(new Date()) |
| getLast12Months | func | get the previous 12 months for current date **separator**(default: '-'), **current**(default:true)  | DataUtil.getLast12Months() |
| getSecureText | func | get the secure text with '*' for the params **stars**(default: 4), **ignore**(default:false), **before**(default:3)  | DataUtil.getSecureText('13566668888') |
| pick | func | get the partial props for **items** and **props**(multi) | DataType.pick(users, 'name', 'age') | 
| uncamelize | func | split the camelcase string into separator for **item** and **{separator,letterCase}**(upper,lower) | DataType.uncamelize('getDataList') |
| toUpperFirst | func | convert the first letter as upper **item** | DataType.toUpperFirst('miracle') |    
- `UrlUtil` **class** Provide the functions for location url.
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| redirect | func | navigate by hash the specified url for the params **url** | UrlUtil.redirect('/login') |
| getHashValue | func | get the hash value from the specified url for the params **url** (default: the current location.hash) | UrlUtil.getHashValue() |
| getQueryValue | func | get the query string for the params **name**, **url** (default: the current location.search) | UrlUtil.getQueryValue('name', 'http://xxx.com?name=miracle') |
