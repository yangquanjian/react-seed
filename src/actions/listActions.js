/**
 * @file actions/listActions.js
 * @author maoquan
 */

import Types from '../constants/List';

export const getListData = entity => ({
  type: Types.GET_LIST_DATA,
  payload: { entity },
});

export const getListDataRequest = () => ({
  type: Types.GET_LIST_DATA_REQUEST,
});

export const getListDataRequestSuccess = ({ entity, data }) => ({
  type: Types.GET_LIST_DATA_REQUEST_SUCCESS,
  entity,
  data,
});

export const getListDataRequestFailure = error => ({
  type: Types.GET_LIST_DATA_REQUEST_FAILURE,
  payload: error,
});

export const getListItemData = (entity, id) => ({
  type: Types.GET_LIST_ITEM_DATA,
  payload: { entity, id },
});

export const getListItemDataRequest = () => ({
  type: Types.GET_LIST_ITEM_DATA_REQUEST,
});

export const getListItemDataRequestSuccess = response => ({
  type: Types.GET_LIST_ITEM_DATA_REQUEST_SUCCESS,
  payload: response,
});

export const getListItemDataRequestFailure = error => ({
  type: Types.GET_LIST_ITEM_DATA_REQUEST_FAILURE,
  payload: error,
});
