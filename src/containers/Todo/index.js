/**
 * @file Todo/index.js
 * @author yankun01
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    addTodo,
    completeTodo,
    setVisibilityFilter,
    VisibilityFilters
} from '../../actions/todoActions'
import Types from '../../constants/Todo'
import AddTodo from '../../components/todo/AddTodo'
import TodoList from '../../components/todo/TodoList'
import Footer from '../../components/todo/Footer'

class Todo extends Component {

    static propTypes = {
        visibleTodos: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        }).isRequired).isRequired,
        visibilityFilter: PropTypes.oneOf([
            Types.SHOW_ALL,
            Types.SHOW_COMPLETED,
            Types.SHOW_ACTIVE
        ]).isRequired
    }

    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter } = this.props
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    } />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index =>
                        dispatch(completeTodo(index))
                    } />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))
                    } />
            </div>
        )
    }
}

const selectTodos = (todos, filter) => {
    switch (filter) {
        case Types.SHOW_ALL:
            return todos
        case Types.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case Types.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

const mapStateToProps = (state) => {
    let todo = state.get('todo').toJS();
    console.log(todo)
    return {
        visibleTodos: selectTodos(todo.todos, todo.visibilityFilter),
        visibilityFilter: todo.visibilityFilter
    };
}

export default connect(mapStateToProps)(Todo)
