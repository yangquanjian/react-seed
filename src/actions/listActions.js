/**
 * @file actions/listActions.js
 * @author yankun01
 */

import Types from '../constants/List'

export const getListData = (entity) => {
    return {
        type: Types.GET_LIST_DATA,
        payload: { entity }
    }
}

export const getListDataRequest = () => {
    return {
        type: Types.GET_LIST_DATA_REQUEST
    }
}

export const getListDataRequestSuccess = ({entity, data}) => {
    return {
        type: Types.GET_LIST_DATA_REQUEST_SUCCESS,
        entity,
        data
    }
}

export const getListDataRequestFailure = (error) => {
    return {
        type: Types.GET_LIST_DATA_REQUEST_FAILURE,
        payload: error
    }
}

export const getListItemData = (entity, id) => {
    return {
        type: Types.GET_LIST_ITEM_DATA,
        payload: { entity, id }
    }
}

export const getListItemDataRequest = () => {
    return {
        type: Types.GET_LIST_ITEM_DATA_REQUEST
    }
}

export const getListItemDataRequestSuccess = (response) => {
    return {
        type: Types.GET_LIST_ITEM_DATA_REQUEST_SUCCESS,
        payload: response
    }
}

export const getListItemDataRequestFailure = (error) => {
    return {
        type: Types.GET_LIST_ITEM_DATA_REQUEST_FAILURE,
        payload: error
    }
}
