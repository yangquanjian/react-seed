/**
 * @file product/HomeRedux.js
 * @author maoquan(maoquan@htsc.com)
 */

import { combineReducers } from 'redux-immutable';

// 引入 reducer / actionCreator / constant
import list, { actions as listActions, constants as listConstants } from '../../components/product/ListRedux';

export default combineReducers({
  list,
});

export const actions = {
  list: listActions,
};

export const constants = {
  list: listConstants,
};
