/**
 * @file models/search.js
 * @author maoquan(maoquan@htsc.com)
 */

import _ from 'lodash';
import api from '../api';

export default {
  namespace: 'search',
  state: {
    customer: {
      page: {},
      list: [],
    },
  },
  reducers: {
    customerSuccess(state, { payload: { response, query } }) {// eslint-disable-line
      const { resultData: { page, resultList } } = response;
      // 翻页情况下，如果返回为空，则直接返回state
      const { curPageNum } = page;
      if (_.isEmpty(resultList) && (curPageNum !== 1)) {
        return state;
      }
      // 如果page为1表示新刷新，这时候清空之前的列表
      const originList = page.curPageNum === 1 ? [] : state.customer.list;
      return {
        ...state,
        customer: {
          page,
          list: [...originList, ...resultList],
        },
      };
    },
  },
  effects: {
    // 搜索客户
    * customer({ payload: query }, { call, put }) {
      const { keyword: keywords, custQueryType, page: pageNum = 1, ...others } = query;
      const response = yield call(
        api.searchCustomer,
        {
          ...others,
          keywords,
          custQueryType,
          pageNum,
          pageSize: 20,
        },
      );
      yield put({ type: 'customerSuccess', payload: { response, query } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // 搜索页面
        if (pathname === '/customer/searchResult') {
          const page = query.page || 1;
          dispatch({ type: 'customer', payload: { ...query, page } });
        }
      });
    },
  },
};
