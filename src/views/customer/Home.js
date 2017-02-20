/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';

import Chart from '../../components/customer/Chart';
import Searchable, { queryMethod } from '../../components/customer/Searchable';

const mapStateToProps = state => ({
  searchList: state.customer.searchList,
});

const mapDispatchToProps = {
  getSearchList: queryMethod,
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
@Searchable
export default class CustomerHome extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '客户首页',
  }

  render() {
    return (
      <div className="page-customer">
        <p><Link to="/customer/1">修改客户信息</Link></p>
        <Chart />
      </div>
    );
  }
}
