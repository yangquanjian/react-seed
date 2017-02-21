/**
 * @file product/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import ProductList from '../../components/product/List';
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

  render() {
    return (
      <div className="page-product-home">
        <ProductList
          categoryId={'c12'}
          {...this.props}
        />
      </div>
    );
  }
}
