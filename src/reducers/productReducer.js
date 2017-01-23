/**
 * @file reducers/productReducer.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import Constants from '../constants/Product';

const updateList = (state, action) => {
  const { response } = action;
  return state.update('list', list => list.concat(response.data));
};

const INITIAL_STATE = fromJS({
  list: [],
  detail: {
  },
});

const ACTION_HANDLERS = {
  [Constants.GET_PRODUCT_LIST_SUCCESS]: updateList,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
