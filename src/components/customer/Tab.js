

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';

import { Tabs } from 'antd-mobile';

// import _ from 'lodash';

import './tab.less';

import ChartLineWidget from '../../components/customer/ChartLine';

import ChartPieWidget from '../../components/customer/ChartPie';

const TabPane = Tabs.TabPane;

export default class TabBar extends PureComponent {

  static propTypes = {
    chartData: PropTypes.array,
    assetData: PropTypes.array,
    detailTabIndex: PropTypes.number,
    changeCustomerDetailTabIndex: PropTypes.func,
  }

  static defaultProps = {
    chartData: [],
    assetData: [],
    detailTabIndex: 0,
    changeCustomerDetailTabIndex: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  @autobind
  tabChange(key) {
    this.props.changeCustomerDetailTabIndex(Number.parseInt(key, 10));
  }

  render() {
    const {
      chartData: dataSource,
      assetData: custMoneyDistributionDTOList,
      detailTabIndex: activeIndex,
    } = this.props;
    // if (!dataSource) {
    //   return null;
    // }

    const pieTabStyle = {
      width: '90%',
      paddingLeft: 0,
      margin: '0 auto',
    };

    const lineTabStyle = {
      width: '90%',
      margin: '0 auto',
      paddingLeft: 0,
    };

    return (
      <div className="tab-bar-section">
        <Tabs
          activeKey={String(activeIndex)}
          onChange={this.tabChange}
          className="tabs-bar"
          underlineColor="none"
          activeUnderlineColor="none"
          swipeable={false} animated tabBarPosition="top"
        >
          <TabPane tab="资产构成" key="0" className="assetTab">
            <div style={pieTabStyle} className="pieTabContent">
              <ChartPieWidget assetData={custMoneyDistributionDTOList} />
            </div>
          </TabPane>
          <TabPane tab="月收益率" key="1" className="rateTab">
            <div style={lineTabStyle} className="lineTabContent">
              <ChartLineWidget chartData={dataSource} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
