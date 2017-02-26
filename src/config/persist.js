import localForage from 'localforage';

localForage.config({
  driver: localForage.LOCALSTORAGE,
});

const config = {
  active: true,
  storeConfig: {
    storage: localForage,
  },
  blacklist: ['routing', 'loading', '@@dva'],
};

export default config;
