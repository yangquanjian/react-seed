import React, { Component, PropTypes } from 'react'
import Types from '../../constants/Todo'

export default class Footer extends Component {

    static propTypes = {
        onFilterChange: PropTypes.func.isRequired,
        filter: PropTypes.oneOf([
            Types.SHOW_ALL,
            Types.SHOW_COMPLETED,
            Types.SHOW_ACTIVE
        ]).isRequired
    }

    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return name
        }

        return (
            <a href='#' onClick={e => {
                e.preventDefault()
                this.props.onFilterChange(filter)
                }}>
                {name}
            </a>
        )
    }

    render() {
        return (
            <p>
                Show:
                {' '}
                {this.renderFilter('SHOW_ALL', 'All')}
                {', '}
                {this.renderFilter('SHOW_COMPLETED', 'Completed')}
                {', '}
                {this.renderFilter('SHOW_ACTIVE', 'Active')}
                .
            </p>
        )
    }
}
