/**
 * @file App/index.js
 * @author yankun01
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Actions} from '../../actions/globalActions'

class App extends Component  {

    static propTypes = {
        children: React.PropTypes.node,
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <header>Baidu Mobile DSP</header>
                {React.Children.toArray(this.props.children)}
                <footer>All Rights received Baidu</footer>
            </div>
        )
    }
}

export default connect()(App);
