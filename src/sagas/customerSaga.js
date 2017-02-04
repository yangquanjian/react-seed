/**
 * @file sagas/customerSaga.js
 * @author maoquan(maoquan@htsc.com)
 */

import { take, call, put, fork } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { createFetchGenerator } from '../utils/createSagas';
import { actions as detailActions, constants as detailConstants } from '../views/customer/DetailRedux';

export default (api) => {
  // 获取客户详情
  const getCustomer = createFetchGenerator(detailActions.form.customer, api.getCustomer);
  // 保存客户信息
  const saveCustomer = createFetchGenerator(detailActions.form.save, api.saveCustomer);

  function* watchGetCustomer() {
    while (true) { // eslint-disable-line
      const { id } = yield take(detailConstants.form.GET_CUSTOMER);
      yield call(getCustomer, { id });
    }
  }

  function* watchSaveCustomer() {
    while (true) { // eslint-disable-line
      const { data } = yield take(detailConstants.form.SAVE_CUSTOMER);
      yield call(saveCustomer, { data });
      yield put(goBack());
    }
  }

  function* watcher() {
    yield fork(watchGetCustomer);
    yield fork(watchSaveCustomer);
  }

  return watcher;
};
