import { take, call, fork } from 'redux-saga/effects';
import { actions as homeActions, constants as homeConstants } from '../views/product/HomeRedux';
import { createFetchGenerator } from '../utils/createSagas';

export default (api) => {
  // 获取客户详情
  const getProductList = createFetchGenerator(homeActions.list, api.getProductList);

  function* watchGetProductList() {
    while (true) { // eslint-disable-line
      yield take(homeConstants.list.LOAD);
      yield call(getProductList);
    }
  }

  function* watcher() {
    yield fork(watchGetProductList);
  }

  return watcher;
};
