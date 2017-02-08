/**
 * @file product/Detail.js
 *  产品详情
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { NavBar, SearchBar } from 'antd-mobile';

// import { actions } from './HomeDetail';

const mapStateToProps = state => ({ // eslint-disable-line
  // data: state.getIn(['productDetail', 'data']),
});

const mapDispatchToProps = {
  // getData: actions.list.getProduct,
  push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductHome extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '产品详情页面',
  }

  render() {
    const { title } = this.props;
    return (
      <div className="page-product-detail">
        <NavBar className="has-searchbox">
          <SearchBar placeholder="搜索" />
        </NavBar>
        <p>{title}</p>
      </div>
    );
  }
}
