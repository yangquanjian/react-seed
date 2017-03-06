/**
 * @file customer/DetailFooter.js
 * @author xuxiaoqin
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { List } from 'antd-mobile';
import './DetailFooter.less';

const Item = List.Item;

export default class CustomerDetailFooter extends PureComponent {

  static propTypes = {
    push: PropTypes.func.isRequired,
    // 最后一次服务时间
    lastCommission: PropTypes.string,
    // 客户号
    custId: PropTypes.string.isRequired,
    // 经济客户号
    custNumber: PropTypes.string.isRequired,
    // 客户类型
    custSor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    push: () => { },
    lastCommission: '',
    custId: '',
    custNumber: '',
    custSor: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  /**
   * 处理用户点击事件
   */
  @autobind
  handleClick(type) {
    const { push, custId, custNumber, custSor } = this.props;
    if (type === 'serviceRecord') {
      push('/serviceRecord');
    } else if (type === 'contact') {
      if (custSor === 'per') {
        push(`/custContactPer/${custNumber}/${custSor}/${custId}`);
      } else {
        push(`/custContactOrg/${custNumber}/${custSor}/${custId}`);
      }
    }
  }

  render() {
    const { lastCommission: lastCommissionDate = '' } = this.props;
    let lastCommissionHtml = '';

    if (lastCommissionDate && lastCommissionDate.length > 0) {
      const tempArr = lastCommissionDate.split(/[- /]/);
      lastCommissionHtml = `最近一次于${tempArr[2]}.${tempArr[0]}.${tempArr[1]}`;
    }

    return (
      <div className="detailFooterSection">
        <List className="detailFooterList">
          <Item className="tel" thumb="../../../static/img/tel.png" arrow="horizontal" multipleLine onClick={() => { this.handleClick('contact'); }}>
            <div className="telContent">联系方式</div>
          </Item>
          <Item className="serRecord" extra={lastCommissionHtml} thumb="../../../static/img/serviceRecord.png" arrow="horizontal" multipleLine>
            <div className="recordContent">服务记录</div>
          </Item>
        </List>
      </div>
    );
  }
}
