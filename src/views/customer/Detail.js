/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import CustomerDetailHeader from '../../components/customer/DetailHeader';
import ChartWidget from '../../components/customer/Chart';

const mapStateToProps = state => ({
  data: state.customer.get('detailInfo'),
  chartData: state.customer.get('chartInfo')
});

const mapDispatchToProps = {
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomDetail extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <h1>客户详情</h1>
      </div>
    );
  }
}
