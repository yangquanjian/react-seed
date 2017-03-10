/**
 * @file customer/ServiceRecordDetail.js
 *  服务记录详情
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'react-redux';
import _ from 'lodash';
import withNavBar from '../../components/common/withNavBar';
import RecordDetail from '../../components/customer/RecordDetail';

const mapStateToProps = state => ({
  list: state.customer.serviceList,
  customer: state.customer.detailInfo,
});

const mapDispatchToProps = {
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
@withNavBar({ title: '服务记录详情', hasBack: true })
export default class ServiceRecordDetail extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
  };

  static defaultProps = {
    customer: {},
    list: {},
  };

  render() {
    const { customer, location: { query: { custId, eventFlowId } } } = this.props;
    let { list } = this.props;
    list = list[custId] || {};
    list = list.serviceRecords || [];
    let customerData = customer[custId] || {};
    customerData = customerData.custBaseInfo || {};
    const { custName = '--' } = customerData || {};

    const data = _.find(list, item => item.eventFlowId === eventFlowId) || {};
    return (
      <section className="recordDetailList">
        <RecordDetail
          data={{ ...data, custName }}
        />
      </section>
    );
  }
}
