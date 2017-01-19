/**
 * @file actions/todoActions.js
 * @author yankun01
 */

import Types from '../constants/Todo';

export const addTodo = text => ({
  type: Types.ADD_TODO,
  text,
});

export const completeTodo = index => ({
  type: Types.COMPLETE_TODO,
  index,
});

export const setVisibilityFilter = filter => ({
  type: Types.SET_VISIBILITY_FILTER,
  filter,
});
