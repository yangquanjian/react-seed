import localForage from 'localforage';

localForage.config({
  driver: localForage.LOCALSTORAGE,
});

const config = {
  active: true,
  storeConfig: {
    storage: localForage,
  },
};

export default config;
