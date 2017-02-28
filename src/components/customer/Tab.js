

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';

import { Tabs } from 'antd-mobile';

import './Tab.less';

import ChartLineWidget from '../../components/customer/ChartLine';

import ChartPieWidget from '../../components/customer/ChartPie';

const TabPane = Tabs.TabPane;

export default class TabBar extends PureComponent {

  static propTypes = {
    chartData: PropTypes.array,
    assetData: PropTypes.array,
  }

  static defaultProps = {
    chartData: [],
    assetData: [],
  }


  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      custMoneyDistributionDTOList: [],
      dataSource: [],
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { chartData, assetData } = nextProps;
    if (chartData !== this.props.chartData && assetData !== this.props.assetData) {
      this.setState({
        isLoading: false,
        dataSource: chartData,
        custMoneyDistributionDTOList: assetData,
      });
    }
  }

  /**
   * 处理用户点击事件
   */
  @autobind
  handleClick() {
  }

  @autobind
  handleChange(key) {
    console.log(key);
  }

  render() {
    const { dataSource, custMoneyDistributionDTOList } = this.state;
    if (!dataSource) {
      return null;
    }

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
          defaultActiveKey="1"
          onChange={this.handleChange}
          className="tabs-bar"
          underlineColor="none"
          activeUnderlineColor="none"
          onTabClick={this.handleClick} swipeable={false} animated tabBarPosition="top"
        >
          <TabPane tab="资产构成" key="1" className="assetTab">
            <div style={pieTabStyle} className="pieTabContent">
              <ChartPieWidget assetData={custMoneyDistributionDTOList} />
            </div>
          </TabPane>
          <TabPane tab="月收益率" key="2" className="rateTab">
            <div style={lineTabStyle} className="lineTabContent">
              <ChartLineWidget chartData={dataSource} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
