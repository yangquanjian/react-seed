/**
 * @file components/customer/FormRedux.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fromJS } from 'immutable';
import { createReducer, createTypes } from 'reduxsauce';
import createAction, { createRequestActions } from '../../utils/createAction';
import { createRequestConstants } from '../../utils/createConstants';

/**
 * constants
 * export出去是为了在saga中使用此constant捕获异步action
 */
export const constants = createTypes(`
  GET_CUSTOMER
  SAVE_CUSTOMER
`);

// 获取客户详情
const getCustomer = id => createAction(constants.GET_CUSTOMER, { id });
// 保存客户详情
const saveCustomer = data => createAction(constants.SAVE_CUSTOMER, { data });

const customerConstants = createRequestConstants(constants.GET_CUSTOMER);
const customer = createRequestActions(customerConstants);

const saveConstants = createRequestConstants(constants.SAVE_CUSTOMER);
const save = createRequestActions(saveConstants);


// 导出actions
export const actions = { getCustomer, saveCustomer, customer, save };

/**
 * reducers
 */
const INITIAL_STATE = fromJS({
  data: {},
});

const update = (state, action) => {
  const { response } = action;
  return state.set('data', fromJS(response.data));
};

const ACTION_HANDLERS = {
  [customerConstants.SUCCESS]: update,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
