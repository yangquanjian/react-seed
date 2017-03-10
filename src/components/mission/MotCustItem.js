/**
 * @file mission/MotCustItem.js
 * @author liutingting
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import _ from 'lodash';

import Icon from '../common/Icon';
import './motCustItem.less';

export default class MotCustItem extends PureComponent {

  static propTypes = {
    motTaskId: PropTypes.string,
    flowId: PropTypes.string,
    custType: PropTypes.string,
    custName: PropTypes.string,
    custNumber: PropTypes.string,
    custRowId: PropTypes.string,
    custGrade: PropTypes.string,
    custLevelName: PropTypes.string,
    custAge: PropTypes.string,
    custGender: PropTypes.string,
    taskReqStatus: PropTypes.string,
    taskSeqDetailInfo: PropTypes.string,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    motTaskId: '--',
    flowId: '--',
    custType: 'per',
    custName: '--',
    custNumber: '--',
    custRowId: '--',
    custGrade: '',
    custLevelName: '--',
    custAge: '',
    taskReqStatus: '',
    custGender: '',
    taskSeqDetailInfo: '暂无信息',
    push: () => { },
  }

  @autobind
  goCust() {
    const { custNumber, custType, taskReqStatus, custRowId, flowId, push } = this.props;
    push(`/customer/detail?&custId=${custRowId}&custNumber=${custNumber}&custSor=${custType}&taskStatus=${taskReqStatus}&custRowId=${custRowId}&flowId=${flowId}`);
  }

  @autobind
  more(item) {
    const node = this[item];
    const { childNodes = [], offsetTop = 0, offsetLeft = 0 } = node || {};
    const child = childNodes[0] || {};
    const text = child.innerText || '';
    if (!text) return null;
    console.log(offsetTop);
    console.log(offsetLeft);
    return true;
  }

  motStatus(taskReqStatus) {
    if (taskReqStatus === 'Y') return 'over';
    return 'wait';
  }

  render() {
    const { custType,
            custName,
            taskReqStatus,
            custNumber,
            custGrade,
            custGender,
            custAge,
            custLevelName,
            taskSeqDetailInfo,
    } = this.props;
    const grade = classnames({
      emptyCard: !_.isEmpty(custGrade) && custGrade.toString().indexOf('空') !== -1,
      goldCard: !_.isEmpty(custGrade) && custGrade.toString().indexOf('金') !== -1,
      silverCard: !_.isEmpty(custGrade) && custGrade.toString().indexOf('银') !== -1,
      diamondCard: !_.isEmpty(custGrade) && custGrade.toString().indexOf('钻石') !== -1,
      financeCard: !_.isEmpty(custGrade) && custGrade.toString().indexOf('理财') !== -1,
      whiteGoldCard: !_.isEmpty(custGrade) && custGrade.toString().indexOf('白金') !== -1,
    });
    return (
      <div className={`item ${custType} ${this.motStatus(taskReqStatus)}`}>
        <div className="top" onClick={this.goCust}>
          <i className="photo" />
          <div className="info">
            <p className="cust-name">{custName}</p>
            <div>
              <i className={`card ${grade}`} />
              <span className="cust-num">{custNumber}</span>
              <span className="sex">{custGender} | {custAge} 岁</span>
              <span className="btn">{custLevelName}</span>
            </div>
          </div>
          <Icon className="more" type="more" />
        </div>
        <div className="bot" ref={div => (this['item-0'] = div)} onClick={() => { this.more('item-0'); }}>
          <p><Icon type="information" />{taskSeqDetailInfo}</p>
        </div>
      </div>
    );
  }
}
