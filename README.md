## m2-core

[![](https://img.shields.io/badge/m2--core-v1.0.3-green.svg)](https://github.com/hmiinyu/m2-core.git) <br/>
The package is provided utilities and facilities for business frontend framework. [中文文档](hhttps://github.com/hmiinyu/m2-core/master/README_ZH.md "中文文档")

#### Usage
 - Install
```bash
npm install m2-core
yarn add m2-core
```
#### APIs
 - `DataApi` **function** Get the application api url mapping with the param *config* and *prefix*.
 notes: the application api mapping file is located: src/features/app/constants/api.conf.js
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | config | object | api key-value pair |  | { 'getDictList': '/dict','getDataList': '/home/data_list' } |
 | prefix | string | api url prefix | '' | 'api'|
  - `DataBus` **class** Handle the emit and on/off the event.
  ####
  | prop or func | type | description | example |
  | ------------ | ------------ | ------------ | ------------ |
  | on | func | register the event listener for **type** | DataBus.on('data', (res) => { console.log(res.name);}) |
  | off | func | remove the event handler for **type** | DataBus.off('data'}) |
  | emit | func | trigger the event handler for **type** | DataBus.emit('data', { name: 'Miracle' }}) |
 
