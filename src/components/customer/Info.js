/**
 * @file customer/Info.js
 * @author fengwencong
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { Tabs } from 'antd-mobile';
import InfoItem from './InfoItem';
import Indicator from './Indicator';
import './info.less';

const TabPane = Tabs.TabPane;

export default class CustomerInfo extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    tabIndex: PropTypes.number,
    changeTabIndex: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    tabIndex: 0,
    changeTabIndex: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      count: 3,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        data,
      });
    }
  }

  @autobind
  tabChange(key) {
    this.props.changeTabIndex(parseInt(key, 10));
  }

  render() {
    const { data: { kpiList = [] }, count } = this.state;
    const { tabIndex: activeIndex } = this.props;
    return (
      <div className="infoTab">
        <Tabs activeKey={String(activeIndex)} onChange={this.tabChange} swipeable={false}>
          <TabPane tab="本月" key="0">
            <InfoItem data={kpiList[0]} />
          </TabPane>
          <TabPane tab="本季" key="1">
            <InfoItem data={kpiList[1]} />
          </TabPane>
          <TabPane tab="今年以来" key="2">
            <InfoItem data={kpiList[2]} />
          </TabPane>
        </Tabs>
        <Indicator count={count} activeIndex={activeIndex} />
      </div>
    );
  }
}
