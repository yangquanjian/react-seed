/**
 * @file product/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';

import './home.less';

const mapStateToProps = state => ({
  list: state.product.list,
});

const mapDispatchToProps = {
  getList: categoryId => ({
    type: 'product/fetch',
    payload: { categoryId },
  }),
  doSearch: keyword => ({
    type: 'product/search',
    payload: { keyword },
  }),
  logout: () => ({
    type: 'global/logout',
  }),
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductHome extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    logout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '产品首页',
  }

  @autobind
  handleClick() {
    this.props.logout();
  }

  render() {
    return (
      <div className="page-product-home">
        <a onClick={this.handleClick}>退出登录</a>
      </div>
    );
  }
}
