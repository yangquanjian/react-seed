/**
 * @file custom/Home.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { actions } from './HomeRedux';
import CustomerForm from '../../components/customer/Form';

const mapStateToProps = state => ({
  formData: state.getIn(['customerHome', 'form', 'data']),
});

const mapDispatchToProps = {
  getData: actions.form.load,
  push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomForm extends Component {
  static propTypes = {
    formData: ImmutablePropTypes.map.isRequired,
  }

  render() {
    const { formData, ...others } = this.props;
    return (
      <div>
        <h1>修改客户信息</h1>
        <CustomerForm data={formData} {...others} />
      </div>
    );
  }
}
