import localForage from 'localforage';

import { isLocalStorageSupport } from '../utils/helper';

localForage.config({
  driver: localForage.LOCALSTORAGE,
});

const config = {
  active: isLocalStorageSupport() && true,
  storeConfig: {
    storage: localForage,
  },
  blacklist: ['routing', 'loading', '@@dva'],
};

export default config;
