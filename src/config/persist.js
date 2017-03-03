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
