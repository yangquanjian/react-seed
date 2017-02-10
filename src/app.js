/**
 * @file app.js
 * @author maoquan(maoquan@htsc.com)
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';

import routerConfig from './router';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onAction: createLogger(),
  onError(e) {
    console.log(e);
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
