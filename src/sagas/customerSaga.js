import { take, call, fork } from 'redux-saga/effects';
import { actions as formActions, constants as formConstants } from '../views/customer/HomeRedux';
import { createFetchGenerator } from '../utils/createSagas';

export default (api) => {
  // 获取客户详情
  const getCustomer = createFetchGenerator(formActions.form, api.getCustomer);

  function* watchGetCustomer() {
    while (true) { // eslint-disable-line
      yield take(formConstants.form.LOAD);
      yield call(getCustomer);
    }
  }

  function* watcher() {
    yield fork(watchGetCustomer);
  }

  return watcher;
};
