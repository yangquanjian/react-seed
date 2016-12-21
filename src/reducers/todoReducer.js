import Types from '../constants/Todo'
import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = fromJS({
    todos: [],
})

/**
 * 添加一个todo
 */
const addTodo = (state, action) => {
    return state.get('todos').concat(action.payload);
}

const ACTION_HANDLERS = {
    [Types.ADD_TODO]: addTodo,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
