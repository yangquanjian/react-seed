/**
 * @file sagas/productSaga.js
 * @author maoquan(maoquan@htsc.com)
 */

import { take, call, fork } from 'redux-saga/effects';
import { actions as homeActions, constants as homeConstants } from '../views/product/HomeRedux';
import { createFetchGenerator } from '../utils/createSagas';

export default (api) => {
  // 获取客户详情
  const getProductList = createFetchGenerator(homeActions.list.productList, api.getProductList);

  function* watchGetProductList() {
    while (true) { // eslint-disable-line
      const { categoryId } = yield take(homeConstants.list.GET_PRODUCT_LIST);
      yield call(getProductList, { categoryId });
    }
  }

  function* watcher() {
    yield fork(watchGetProductList);
  }

  return watcher;
};
