/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';
import { Drawer } from 'antd-mobile';

import Searchable, { queryMethod } from '../../components/customer/Searchable';
import CustomerInfo from '../../components/customer/Info';
import CustomerList from '../../components/customer/List';
import Filter from '../../components/customer/Filter';
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
    payload: query,
  }),
  getInfo: query => ({
    type: 'customer/getInfo',
    payload: query,
  }),
  push: routerRedux.push,
  replace: routerRedux.replace,
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@Searchable
export default class CustomerHome extends PureComponent {
  static propTypes = {
    info: PropTypes.object,
    getList: PropTypes.func,
    getInfo: PropTypes.func,
    list: PropTypes.object,
    custQueryType: PropTypes.string,
    location: PropTypes.object,
    replace: PropTypes.func,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    info: {},
    getList: () => { },
    getInfo: () => { },
    list: {},
    custQueryType: 'personal',
    location: {},
    replace: () => { },
    push: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      position: 'right',
    };
  }

  componentWillMount() {
    const { custQueryType } = this.props;
    this.props.getInfo({
      custQueryType,
      orderType: 'desc',
      pageSize: 10,
      pageNum: 1,
    });
  }

  @autobind
  onOpenChange() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { info, list, getList, custQueryType, location, replace, push } = this.props;
    const sidebar = (
      <Filter
        onOpenChange={this.onOpenChange}
        location={location}
        replace={replace}
      />
    );
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    const footerHeight =  document.getElementsByClassName('am-tab-bar-bar')[0].offsetHeight;
    return (
      <section className="page-customer">
        <CustomerInfo data={info} />
        <CustomerList
          list={list}
          getList={getList}
          onOpenChange={this.onOpenChange}
          custQueryType={custQueryType}
          location={location}
          replace={replace}
          push={push}
        />
        <Drawer
          className="my-drawer"
          sidebar={sidebar}
          style={{ maxHeight: document.documentElement.clientHeight - footerHeight }}
          dragHandleStyle={{ display: 'none' }}
          {...drawerProps}
        >
          .
        </Drawer>
      </section>
    );
  }
}
