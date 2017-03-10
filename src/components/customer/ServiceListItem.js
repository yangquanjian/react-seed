import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import Icon from '../common/Icon';

export default class ServiceItem extends React.Component {

  static propTypes = {
    push: PropTypes.func,
    data: React.PropTypes.object,
  };

  // "custId": "1-VS-4517", // 客户rowId
  // "custType": "per", // 客户类型per 个人， org 机构
  // "action": "new",
  // "category": "System Alert", // 类型，
  // "comments": "comment", // 备注
  // "desp": "desp", // 活动详细内容
  // "startTime": "01/05/2017 10:20:22", // 开始时间，严格按照格式
  // "endTime": "01/05/2017 10:20:22",
  // "ownerId": "1-OXZ5", // 员工rowId
  // "status": "Done", // 状态 （到通用code接口查询，lstType：EVENT_STATUS）
  // "type": "213894", // 活动内容（到接口查询，传入类型code作为关键字
  // "actionChannel": "HTSC Phone", // 活动方式（到通用code接口查询，lstType：CALLER_TYPE）
  // "priority": "",// 优先级
  // "ani": "",// 处理结果
  // "serviceChannel": "",
  // "serviceType": "",
  // "serviceContent": "",
  // "serviceRecord": "",
  // "eventFlowId": "",
  // "doneFlag": ""

  static defaultProps = {
    push: () => { },
    data: {},
  }

  @autobind
  handleClick() {
    const { push, data: { custId, eventFlowId } } = this.props;
    push(`/customer/serviceListDetail?custId=${custId}&eventFlowId=${eventFlowId}`);
  }

  dateTimeFilter(timeString) {
    const tempArray = timeString.replace(/[- /:]/g, ' ').split(' ').splice(0, 5);
    return `${tempArray.slice(0, 3).join('.')} ${tempArray.slice(3, 5).join(':')}`;
  }

  render() {
    const {
      category = '--',
      type = '--',
      actionChannel = '--',
      status = '--',
      startTime = '1990/01/01 00:00:00',
      endTime = '1990/01/01 00:00:00',
    } = this.props.data;

    const more = {
      className: 'moreIcon',
      type: 'more',
    };

    let html = '';
    if (_.isEmpty(startTime) && _.isEmpty(endTime)) {
      html = '--~--';
    } else {
      html = `${this.dateTimeFilter(startTime)}~${this.dateTimeFilter(endTime)}`;
    }

    return (
      <div
        className="list-item"
        onClick={this.handleClick}
      >
        <div className="list-item-head">
          <span>{category}-</span>
          <span>{type}</span>
          <Icon {...more} />
        </div>
        <div className="list-item-main">
          <span>{html}</span>
          <span>{actionChannel}</span>
          <span>{status}</span>
        </div>
      </div>
    );
  }
}
