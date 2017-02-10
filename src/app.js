/**
 * @file app.js
 * @author maoquan(maoquan@htsc.com)
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';

import routerConfig from './router';

import productModel from './models/product';
import customerModel from './models/customer';

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
app.model(productModel);
app.model(customerModel);

// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#app');
