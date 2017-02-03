/**
 * @file sagas/customerSaga.js
 * @author maoquan(maoquan@htsc.com)
 */

import { take, call, fork } from 'redux-saga/effects';
import { actions as homeActions, constants as homeConstants } from '../views/customer/HomeRedux';
import { createFetchGenerator } from '../utils/createSagas';

export default (api) => {
  // 获取客户详情
  const getCustomer = createFetchGenerator(homeActions.form, api.getCustomer);

  function* watchGetCustomer() {
    while (true) { // eslint-disable-line
      yield take(homeConstants.form.LOAD);
      yield call(getCustomer);
    }
  }

  function* watcher() {
    yield fork(watchGetCustomer);
  }

  return watcher;
};
