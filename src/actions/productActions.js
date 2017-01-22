/**
 * @file actions/listActions.js
 * @author maoquan
 */

import action from '../utils/createAction';
import Constants from '../constants/Product';

export const productList = {
  load: () => action(GET_PRODUCT_LIST),
  request: () => action(GET_PRODUCT_LIST_REQUEST),
  success: response => action(GET_PRODUCT_LIST_SUCCESS, { response }),
  failure: error => action(GET_PRODUCT_LIST_FAILURE, { error }),
};
