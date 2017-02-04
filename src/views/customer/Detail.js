/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { actions } from './DetailRedux';
import CustomerForm from '../../components/customer/Form';

const mapStateToProps = state => ({
  formData: state.getIn(['customerDetail', 'form', 'data']),
});

const mapDispatchToProps = {
  getData: actions.form.getCustomer,
  saveData: actions.form.saveCustomer,
  push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomDetail extends Component {
  static propTypes = {
    formData: ImmutablePropTypes.map.isRequired,
    params: PropTypes.object.isRequired,
  }

  render() {
    const { formData, params, ...others } = this.props;
    return (
      <div>
        <h1>修改客户信息</h1>
        <CustomerForm
          {...others}
          id={params.id}
          data={formData}
        />
      </div>
    );
  }
}
