/**
 * @file actions/listActions.js
 * @author maoquan
 */

import action from '../utils/createAction';
import Constants from '../constants/Product';

export const productList = {
  load: () => action(Constants.GET_PRODUCT_LIST),
  request: () => action(Constants.GET_PRODUCT_LIST_REQUEST),
  success: response => action(Constants.GET_PRODUCT_LIST_SUCCESS, { response }),
  failure: error => action(Constants.GET_PRODUCT_LIST_FAILURE, { error }),
};
