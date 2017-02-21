/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';
import { Drawer } from 'antd-mobile';

import Chart from '../../components/customer/Chart';
import Searchable, { queryMethod } from '../../components/customer/Searchable';
import CustomerInfo from '../../components/customer/Info';
import CustomerList from '../../components/customer/List';
import './home.less';

const mapStateToProps = state => ({
  searchList: state.customer.searchList,
  info: state.customer.info,
  list: state.customer.list,
});

const mapDispatchToProps = {
  getSearchList: queryMethod,
  getList: query => ({
    type: 'customer/getList',
    payload: { query },
  }),
  push: routerRedux.push,
  replace: routerRedux.replace,
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@Searchable
export default class CustomerHome extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    info: PropTypes.object,
    getList: PropTypes.func,
    list: PropTypes.array,
  }

  static defaultProps = {
    title: '客户首页',
    info: {},
    getList: () => {},
    list: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      position: 'right',
    };
  }

  @autobind
  onOpenChange() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { info, title, list, getList } = this.props;
    const sidebar = (<div>筛选1111</div>);
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    return (
      <section className="page-customer">
        <CustomerInfo data={info} />
        <CustomerList list={list} getList={getList} onOpenChange={this.onOpenChange} />
        <Drawer
          className="my-drawer"
          sidebar={sidebar}
          dragHandleStyle={{ display: 'none' }}
          {...drawerProps}
        />
      </section>
    );
  }
}
