/**
 * @file customer/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

<<<<<<< HEAD
import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import NavBar from '../../components/common/NavBar';
import Chart from '../../components/customer/Chart';

export default function CustomerHome(props) {
  return (
    <div className="page-customer">
      <NavBar
        iconName={false}
        leftContent={false}
      >{props.title}</NavBar>
      <p><Link to="/customer/1">修改客户信息</Link></p>
      <p><Link to="/customer/detail?custId=1">查看客户详细信息</Link></p>
    </div>
  );
}
=======
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';
import { Drawer } from 'antd-mobile';
>>>>>>> c77b12d4de016d3454783af35166dd2e62ec6846

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
    info: PropTypes.object,
    getList: PropTypes.func,
    list: PropTypes.array,
  }

  static defaultProps = {
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
    const { info, list, getList } = this.props;
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
