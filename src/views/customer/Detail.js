/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

const mapStateToProps = state => ({
  data: state.customer.data,
});

const mapDispatchToProps = {
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomDetail extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <h1>客户详情</h1>
      </div>
    );
  }
}
