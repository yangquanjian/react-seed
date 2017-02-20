/**
 * @file product/Detail.js
 *  产品详情
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { NavBar, SearchBar } from 'antd-mobile';
import { autobind } from 'core-decorators';

// import { actions } from './HomeDetail';

const mapStateToProps = state => ({ // eslint-disable-line
});

const mapDispatchToProps = {
  pop: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductHome extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    pop: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '产品详情页面',
  }

  @autobind
  handleClick() {
    this.props.pop();
  }

  render() {
    const { title } = this.props;
    return (
      <div className="page-product-detail">
        <NavBar className="has-searchbox">
          <SearchBar placeholder="搜索" />
        </NavBar>
        <p>{title}</p>
        <a onClick={this.handleClick}>返回</a>
      </div>
    );
  }
}
