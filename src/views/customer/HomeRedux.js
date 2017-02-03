/**
 * @file customer/HomeRedux.js
 * @author maoquan(maoquan@htsc.com)
 */

import { combineReducers } from 'redux-immutable';

// 引入 reducer / actionCreator / constant
import form, { actions as formActions, constants as formConstants } from '../../components/customer/FormRedux';

export default combineReducers({
  form,
});

export const actions = {
  form: formActions,
};

export const constants = {
  form: formConstants,
};
