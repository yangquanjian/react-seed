import localForage from 'localforage';

localForage.config({
  driver: localForage.LOCALSTORAGE,
  version: 1.0,
});

const config = {
  active: true,
  storeConfig: {
    storage: localForage,
  },
};

export default config;
