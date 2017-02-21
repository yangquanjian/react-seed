/**
 * @file app.js
 * @author maoquan(maoquan@htsc.com)
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Modal } from 'antd-mobile';

import routerConfig from './router';
import persistConfig from './config/persist';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onAction: createLogger(),
  extraEnhancers: [autoRehydrate()],
  onError(e) {
    Modal.alert(e.message);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/product'));
app.model(require('./models/customer'));

// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#app');

// 6. redux-persist
persistStore(app._store, persistConfig); // eslint-disable-line
