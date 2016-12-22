/**
 * @file reducers/listReducer.js
 * @author yankun01
 */

import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce'
import Types from '../constants/List'

const updateListData = (state, action) => {
    const { entity, data } = action;
    let listData = state.get('listData');
    listData = listData.merge({[entity]: data});
    return state.set('listData', listData);
}

export const INITIAL_STATE = fromJS({
    listData: {}
});

const ACTION_HANDLERS = {
    [Types.GET_LIST_DATA_REQUEST_SUCCESS]: updateListData,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
