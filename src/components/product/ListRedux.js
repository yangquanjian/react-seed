import { fromJS } from 'immutable';
import { createReducer, createTypes } from 'reduxsauce';
import createAction from '../../utils/createAction';

/**
 * constants
 */
export const constants = createTypes(`
  LOAD
  REQUEST
  SUCCESS
  FAILURE
`, { prefix: 'GET_PRODUCT_LIST_' });

/**
 * actions
 */
export const actions = {
  load: () => createAction(constants.LOAD),
  request: () => createAction(constants.REQUEST),
  success: response => createAction(constants.SUCCESS, { response }),
  failure: error => createAction(constants.FAILURE, { error }),
};

/**
 * reducers
 */
const INITIAL_STATE = fromJS({
  items: [],
});

const updateList = (state, action) => {
  const { response } = action;
  return state.update('items', list => list.concat(response.data));
};

const ACTION_HANDLERS = {
  [constants.SUCCESS]: updateList,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
