/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import CustomerForm from '../../components/customer/Form';

const mapStateToProps = state => ({
  data: state.customer.get('data'),
});

const mapDispatchToProps = {
  saveData: data => ({
    type: 'customer/save',
    payload: data,
  }),
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomDetail extends Component {
  static propTypes = {
    data: ImmutablePropTypes.map.isRequired,
    params: PropTypes.object.isRequired,
  }

  render() {
    const { params, ...others } = this.props;
    return (
      <div>
        <h1>修改客户信息</h1>
        <CustomerForm
          {...others}
          id={params.id}
        />
      </div>
    );
  }
}
