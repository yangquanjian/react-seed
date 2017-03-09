/**
 * @file customer/DetailHeader.js
 * @author liutingting
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
// import classnames from 'classnames';
import _ from 'lodash';
import './motDesc.less';
import Icon from '../common/Icon';

export default class MotDetailDesc extends PureComponent {

  static propTypes = {
    // 基本信息数据
    data: PropTypes.string.isRequired,
    push: PropTypes.func,
  }

  static defaultProps = {
    data: '--',
    push: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      isShown: false, // 是否显示按钮
      isFold: true, // 是否折叠
    };
  }

  componentDidUpdate() {
  // componentDidMount() {
    const node = this.contain;
    const nodeScrollH = (node) ? node.scrollHeight : 0;
    const nodeOffsetH = (node) ? node.offsetHeight : 0;
    if (nodeScrollH >= nodeOffsetH && nodeScrollH > 80) {
      // this.setState({ isShown: true });
    } else {
      // this.setState({ isShown: false });
    }
  }

  /**
   * 点击切换介绍文本展开与收缩
   */
  @autobind
  handleClick() {
    const { isFold, isShown } = this.state;
    if (!isShown) return null;
    this.setState({ isFold: !isFold, isShown: true });
    return true;
  }

  render() {
    const { data = '--' } = this.props || {};
    let containNull = '';
    const { isFold, isShown } = this.state || {};
    if (_.isEmpty(data) || !data) {
      containNull = 'hid';
    }
    const foldStyle = (isFold) ? 'up' : 'down';
    const btnStyle = (isShown) ? '' : 'hid';

    return (
      <div className="task-desc">
        <h2 className="til"><Icon type="task" />新股中签余额不足新股中签余额不足新股中签余额不足新股中签余额不足新股中签</h2>
        <div className={`contain ${foldStyle} ${containNull}`}>
          <div className={`desc ${foldStyle}`} onClick={() => { this.handleClick(); }} ref={div => (this.contain = div)} >
            <p>{data}</p>
          </div>
          <span className={`btn ${foldStyle} ${btnStyle}`} ref={span => (this.btn = span)} >详情<i className="icon" /></span>
        </div>

      </div>
    );
  }
}
