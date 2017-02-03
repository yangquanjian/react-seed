/**
 * @file components/customer/FormRedux.js
 * @author maoquan(maoquan@htsc.com)
 */

import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import { createRequestActions } from '../../utils/createAction';
import { createRequestConstants } from '../../utils/createConstants';

/**
 * constants
 */
export const constants = createRequestConstants('GET_CUSTOMER_');

/**
 * actions
 */
export const actions = createRequestActions(constants);

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
  [constants.SUCCESS]: update,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
