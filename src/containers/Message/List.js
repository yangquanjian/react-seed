/**
 * @file Custom/CustomList.js
 * @author maoquan
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { ListView } from 'antd-mobile';

class CustomList extends Component {

    static propTypes = {

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <p>消息中心</p>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomList)
