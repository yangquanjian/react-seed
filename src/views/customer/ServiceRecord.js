/**
 * @file customer/ServiceRecord.js
 *  历史服务记录
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import withNavBar from '../../components/common/withNavBar';
import ServiceList from '../../components/customer/ServiceList';

const getDataFunction = query => ({
  type: 'customer/getServiceList',
  payload: query || {},
});

const mapStateToProps = state => ({
  data: state.customer.serviceList,
});

const mapDispatchToProps = {
  push: routerRedux.push,
  initial: getDataFunction,
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
@withNavBar({ title: '历史服务记录', hasBack: true })
export default class ServiceRecord extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    initial: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  };

  static defaultProps = {
    push: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount() {
    const { location: { query }, initial } = this.props;
    const { custId, custSor } = query;
    initial({ custId, custSor });
  }

  render() {
    const { data, push, location: { query: { custId } } } = this.props;
    const serviceListData = data[custId] || {};
    return (
      <div>
        <ServiceList
          list={serviceListData}
          push={push}
          custId={custId}
          location={location}
        />
      </div>
    );
  }
}
