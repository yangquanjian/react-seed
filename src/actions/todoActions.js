/**
 * @file actions/todoActions.js
 * @author yankun01
 */

import Types from '../constants/Todo'

const addTodo = (todo) => {
    return {
        type: Types.ADD_TODO,
        payload: todo
    }
}
