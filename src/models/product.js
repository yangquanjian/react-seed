/**
 * @file models/product.js
 * @author maoquan(maoquan@htsc.com)
 */

import _ from 'lodash';
import api from '../api';
import { delay } from '../utils/sagaEffects';

export default {
  namespace: 'product',
  state: {
    list: [],
  },
  reducers: {
    saveList(state, action) {
      const { payload: { response } } = action;
      return {
        ...state,
        list: [...state.list, ...response.data],
      };
    },
  },
  effects: {
    * fetch({ payload: { categoryId = 1 } }, { call, put }) {
      const response = yield call(api.getProductList, { categoryId });
      // 模拟网络延迟
      yield delay(1000);
      yield put({
        type: 'saveList',
        payload: {
          response,
          categoryId,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(
        _.once(
          ({ pathname, query }) => {
            if (pathname === '/product') {
              dispatch({ type: 'fetch', payload: query });
            }
          },
        ),
      );
    },
  },
};
