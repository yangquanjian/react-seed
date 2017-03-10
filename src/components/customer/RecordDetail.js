/**
 * @file customer/RecordDetail.js
 *  历史服务记录
 * @author xuxiaoqin
 */

import React, { PureComponent, PropTypes } from 'react';
import { Flex } from 'antd-mobile';
import _ from 'lodash';
import './recordDetail.less';

const Item = Flex.Item;

export default class RecordDetail extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { data = {} } = this.props;

    if (_.isEmpty(data) || _.isEmpty(data.custName)) {
      return null;
    }

    const startTime = !_.isEmpty(data.startTime) ? data.startTime.replace(/[-]/g, '/') : '--';
    const endTime = !_.isEmpty(data.endTime) ? data.endTime.replace(/[-]/g, '/') : '--';

    return (
      <section className="recordDetailList">
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              客户姓名
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.custName || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              活动方式
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.actionChannel || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              状态
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.status || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              类型
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.category || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              活动内容
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.type || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              计划开始时间
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {startTime || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              计划结束时间
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {endTime || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              优先级
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.priority || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              活动详细内容
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.desp || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              工作结果
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.ani || '--'}
            </div>
          </Item>
        </Flex>
        <Flex className="flex-container" direction="row" justify="start" align="center" wrap="nowrap">
          <Item>
            <div className="detailItemTitle">
              备注
                </div>
          </Item>
          <Item>
            <div className="detailItemContent">
              {data.comments || '--'}
            </div>
          </Item>
        </Flex>
      </section>
    );
  }
}
