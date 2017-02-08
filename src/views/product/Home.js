/**
 * @file product/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { SearchBar } from 'antd-mobile';

import { actions } from './HomeRedux';
import ProductList from '../../components/product/List';
import './home.less';

const mapStateToProps = state => ({
  list: state.getIn(['productHome', 'list', 'items']),
});

const mapDispatchToProps = {
  getList: actions.list.getProductList,
  push,
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
        <SearchBar placeholder="搜索" />
        <ProductList
          categoryId={'c12'}
          {...this.props}
        />
      </div>
    );
  }
}
