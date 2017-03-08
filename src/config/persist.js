/**
 * @file config/persist.js
 *  redux-persist配置文件
 * @author maoquan(maoquan@htsc.com)
 */

import localForage from 'localforage';

import { isLocalStorageSupport } from '../utils/helper';

localForage.config({
  driver: localForage.LOCALSTORAGE,
});

const config = {
  active: isLocalStorageSupport() && false,
  storeConfig: {
    storage: localForage,
  },
  // blacklist: ['routing', 'loading', '@@dva'],
  whitelist: ['status'],
};

export default config;
