/**
 * @file actions/todoActions.js
 * @author yankun01
 */

import Types from '../constants/Todo'

export const addTodo = (text) => {
    return {
        type: Types.ADD_TODO,
        text
    }
}

export const completeTodo = (index) => {
    return {
        type: Types.COMPLETE_TODO,
        index
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: Types.SET_VISIBILITY_FILTER,
        filter
    }
}
