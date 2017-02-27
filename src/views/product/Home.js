/**
 * @file product/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import { navToLogin } from '../../utils/cordova';
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
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductHome extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '产品首页',
  }

  handleClick() {
    navToLogin();
  }

  render() {
    return (
      <div className="page-product-home">
        <a onClick={this.handleClick}>退出登录</a>
      </div>
    );
  }
}
