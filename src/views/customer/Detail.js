/**
 * @file customer/Detail.js
 *  客户表单，修改客户信息
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import CustomerDetailHeader from '../../components/customer/DetailHeader';
// import ChartWidget from '../../components/customer/Chart';
// import RecommendProductList from '../../components/customer/RecommendProductList';
import CustomerDetailFooter from '../../components/customer/DetailFooter';
import TabBar from '../../components/customer/Tab';

const mapStateToProps = state => ({
  data: state.customer.detailInfo,
  // recommendList: state.customer.recommendList,
});

const mapDispatchToProps = {
  ignoreProduct: custId => ({
    type: 'customer/ignoreProduct',
    payload: { custId },
  }),
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CustomerDetail extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    // recommendList: PropTypes.array.isRequired,
    push: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    push: () => {},
  };

  componentDidMount() {
  }

  render() {
    const {
      custBaseInfo,
      monthlyProfits,
      custMoneyDistributionDTOList,
      custSor,
      custNumber,
      custId,
    } = this.props.data;

    const { push } = this.props;

    if (!custBaseInfo) {
      return null;
    }
    // <RecommendProductList {...this.props} />
    return (
      <div>
        <CustomerDetailHeader
          data={custBaseInfo}
          custSor={custSor}
          custNumber={custNumber}
          custId={custId}
          push={push}
        />
        <TabBar
          chartData={monthlyProfits}
          assetData={custMoneyDistributionDTOList}
        />
        <CustomerDetailFooter lastCommission={custBaseInfo.lastCommission} />
      </div>
    );
  }
}
