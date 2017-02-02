/**
 * @file product/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { actions } from './HomeRedux';
import ProductList from '../../components/product/List';

const mapStateToProps = state => ({
  list: state.getIn(['productHome', 'list', 'items']),
});

const mapDispatchToProps = {
  getList: actions.list.load,
  push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductHome extends PureComponent {
  render() {
    return (
      <div>
        <h1>产品首页</h1>
        <ProductList {...this.props} />
      </div>
    );
  }
}
