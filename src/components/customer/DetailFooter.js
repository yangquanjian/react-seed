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
    lastCommission: PropTypes.string.isRequired,
  }

  static defaultProps = {
    push: () => { },
    lastCommission: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const lastCommission = nextProps;
    if (lastCommission !== this.props.lastCommission) {
      this.setState({
        isLoading: false,
        lastCommissionDate: lastCommission,
      });
    }
  }

  /**
   * 处理用户点击事件
   */
  @autobind
  handleClick(type) {
    const { push } = this.props;
    if (type === 'serviceRecord') {
      push('customer/basicInfo?id=1');
    } else if (type === 'businessState') {
      push('customer/basicInfo?id=1');
    }
    console.log('点击了');
  }

  render() {
    const { lastCommissionDate } = this.state;
    if (!lastCommissionDate) {
      return null;
    }

    let lastCommissionHtml = '';

    if (lastCommissionDate.lastCommission.length > 0) {
      const tempArr = lastCommissionDate.lastCommission.split(/[-/]/);

      lastCommissionHtml = `最近一次于${tempArr[2]}/${tempArr[0]}/${tempArr[1]}`;
    }

    return (
      <List className="detailFooterSection">
        <Item className="tel" thumb="../../../static/images/tel.png" arrow="horizontal" multipleLine onClick={() => { this.handleClick('businessState'); }}>
          <div className="telContent">联系方式</div>
        </Item>
        <Item className="serRecord" extra={lastCommissionHtml} thumb="../../../static/images/serviceRecord.png" arrow="horizontal" multipleLine onClick={() => { this.handleClick('serviceRecord'); }}>
          <div className="recordContent">服务记录</div>
        </Item>
      </List>
    );
  }
}
