/**
 * @file reducers/listReducer.js
 * @author yankun01
 */

import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import Types from '../constants/Product';

const updateList = (state, action) => {
  const { response } = action;
  return state.set('list', response);
};

const INITIAL_STATE = fromJS({
  list: {},
  detail: {
  },
});

const ACTION_HANDLERS = {
  [Types.GET_PRODUCT_LIST_SUCCESS]: updateList,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
