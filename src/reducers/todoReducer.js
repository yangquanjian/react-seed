/**
 * @file reducers/todoReducer.js
 * @author yankun01
 */

import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import Types from '../constants/Todo';

const addTodo = (state, action) => {
  let todos = state.get('todos');
  todos = todos.concat([
    {
      text: action.text,
      completed: false,
    },
  ]);
  return state.set('todos', todos);
};

const completeTodo = (state, action) => {
  let todos = state.get('todos');
  todos = todos.map(
    (item, index) => {
      if (index === action.index) {
        return item.set('completed', true);
      }
      return item;
    },
  );
  return state.set('todos', todos);
};

export const INITIAL_STATE = fromJS({
  todos: [],
  visibilityFilter: Types.SHOW_ALL,
});

const setVisibilityFilter = (state, action) =>
  state.set('visibilityFilter', action.filter);

const ACTION_HANDLERS = {
  [Types.ADD_TODO]: addTodo,
  [Types.COMPLETE_TODO]: completeTodo,
  [Types.SET_VISIBILITY_FILTER]: setVisibilityFilter,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
