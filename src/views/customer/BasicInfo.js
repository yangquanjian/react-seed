

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import ImmutablePropTypes from 'react-immutable-proptypes';

const mapStateToProps = state => ({
    data: state.customer.get('basicInfo'),
});

const mapDispatchToProps = {
    getBasicInfo: custId => ({
        type: 'customer/getBasicInfo',
        payload: { custId },
    }),
    push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomerBasicInfo extends PureComponent {
    static propTypes = {
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div>
                <p>客户基本信息</p>
            </div>
        );
    }
}
