/**
 * @file App/index.js
 * @author yankun01
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Actions} from '../../actions/globalActions'
import TabBar from '../../components/tab-bar'

class App extends Component  {

    static propTypes = {
        children: React.PropTypes.node,
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <TabBar />
        )
    }
}

export default connect()(App);
