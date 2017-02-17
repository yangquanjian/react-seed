/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomerBasicHeader from '../../components/customer/DetailHeader';
import ChartWidget from '../../components/customer/Chart';

const mapStateToProps = state => ({
    data: state.customer.get('detailInfo'),
    chartData: state.customer.get('chartInfo')
});

const mapDispatchToProps = {
    getBasicInfo: custId => ({
        type: 'customer/getBasicInfo',
        payload: { custId },
    }),
    push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomerDetail extends PureComponent {
    static propTypes = {
        data: ImmutablePropTypes.map,
        // chartData: ImmutablePropTypes.array,
    }

    static defaultProps = {
        data: undefined,
        // chartData: undefined
    };

    componentDidMount() {

    }

    render() {
        const { data, ...others} = this.props;
        return (
            <div>
                <p>客户详细信息</p>
                <CustomerBasicHeader
                    data={data}
                />
                <ChartWidget {...others} />
            </div>
        );
    }
}
