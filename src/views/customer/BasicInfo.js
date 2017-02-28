import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

const mapStateToProps = () => ({
  // data: state.customer.basicInfo,
});

const mapDispatchToProps = {
  // getBasicInfo: custId => ({
  //   type: 'customer/getBasicInfo',
  //   payload: { custId },
  // }),
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomerBasicInfo extends PureComponent {
  static propTypes = {

  }

  static defaultProps = {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  render() {
    return (
      <div>
        <p>客户基本信息</p>
      </div>
    );
  }
}
