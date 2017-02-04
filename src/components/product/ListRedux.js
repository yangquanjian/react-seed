import { fromJS } from 'immutable';
import { createReducer, createTypes } from 'reduxsauce';
import createAction, { createRequestActions } from '../../utils/createAction';
import { createRequestConstants } from '../../utils/createConstants';

/**
 * constants
 */
export const constants = createTypes(`
  GET_PRODUCT_LIST
`);

/**
 * actions
 */
// 获取理财产品列表
const getProductList =
  categoryId => createAction(constants.GET_PRODUCT_LIST, { categoryId });

// 获取理财产品列表这个异步过程用到的辅助action
const productListConstants = createRequestConstants(constants.GET_PRODUCT_LIST);
const productList = createRequestActions(productListConstants);

export const actions = { getProductList, productList };

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
  [productListConstants.SUCCESS]: updateList,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
