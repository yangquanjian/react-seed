/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';
import { Drawer } from 'antd-mobile';
import _ from 'lodash';

import Searchable from '../../components/customer/Searchable';
// import PullToRefreshable from '../../components/common/PullToRefreshable';
import CustomerInfo from '../../components/customer/Info';
import CustomerList from '../../components/customer/List';
import Filter from '../../components/customer/Filter';
import './home.less';

const mapStateToProps = state => ({
  info: state.customer.info,
  list: state.customer.list,
  tabIndex: state.status.customerTabIndex,
  isLoading: state.loading.models.customer,
});

const getListFunction = query => ({
  type: 'customer/getList',
  payload: query || {},
});

const mapDispatchToProps = {
  getList: getListFunction,
  // 提供给下拉刷新组件
  refresh: getListFunction,
  getInfo: query => ({
    type: 'customer/getInfo',
    payload: query,
  }),
  changeTabIndex: index => ({
    type: 'status/changeCustomerTabIndex',
    payload: index,
  }),
  push: routerRedux.push,
  replace: routerRedux.replace,
};

const appContainer = document.querySelector('#app');

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@Searchable
export default class CustomerHome extends PureComponent {
  static propTypes = {
    info: PropTypes.object,
    getList: PropTypes.func,
    getInfo: PropTypes.func,
    list: PropTypes.object,
    location: PropTypes.object,
    replace: PropTypes.func,
    push: PropTypes.func.isRequired,
    changeTabIndex: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
  }

  static defaultProps = {
    info: {},
    getList: () => { },
    getInfo: () => { },
    list: {},
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
    const { list: { resultList }, location: { query } } = this.props;
    if (_.isEmpty(resultList)) {
      this.props.getInfo({
        ...query,
        pageSize: 100,
        pageNum: 1,
      });
    }
    appContainer.addEventListener('touchmove', this.handleTouch, false);
  }

  componentWillUnmount() {
    appContainer.removeEventListener('touchmove', this.handleTouch, false);
  }

  @autobind
  onOpenChange() {
    this.setState({ open: !this.state.open });
  }

  @autobind
  handleTouch(event) {
    const { open } = this.state;
    if (open) {
      event.preventDefault();
    }
  }

  render() {
    const {
      info,
      list,
      getList,
      location,
      replace,
      push,
      tabIndex,
      changeTabIndex,
    } = this.props;
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
    const bar = document.querySelector('.am-tab-bar-bar');
    const footerHeight = bar ? bar.offsetHeight : 0;
    return (
      <section className="page-customer">
        <CustomerInfo
          data={info}
          tabIndex={tabIndex}
          changeTabIndex={changeTabIndex}
        />
        <CustomerList
          list={list}
          getList={getList}
          onOpenChange={this.onOpenChange}
          location={location}
          replace={replace}
          push={push}
        />
        <Drawer
          className="my-drawer"
          sidebar={sidebar}
          style={{ maxHeight: document.documentElement.clientHeight - footerHeight }}
          dragHandleStyle={{ display: 'none' }}
          touch={false}
          {...drawerProps}
        >
          .
        </Drawer>
      </section>
    );
  }
}
