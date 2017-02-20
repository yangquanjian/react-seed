/**
 * @file customer/BasicList.js
 * @author liutingting(3171214926@qq.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import './BasicList.less';

export default class BasicList extends PureComponent {

  static propTypes = {
    type: PropTypes.string.isRequired,
    data: ImmutablePropTypes.map.isRequired,
  }

  static defaultProps = {
    type: 'per',
    data: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      getLabelMap: () => {
        const perLabelMap = [
            ['custAge', '年龄'],
            ['custGrade', '客户等级'],
            ['idType', '证件类型'],
            ['idNum', '证件号码'],
            ['idValDate', '证件有效期'],
            ['job', '职业'],
            ['degree', '学历'],
            ['merriage', '婚姻状况'],
            ['hobits', '爱好'],
            ['acctStatus', '账户状态'],
            ['openTime', '开户时间'],
            ['priSalesTeam', '服务经理'],
            ['lastCommission', '最近一次服务时间'],
        ];
        const orgLabelMap = [
            ['acctType', '机构类型'],
            ['custGrade', '客户等级'],
            ['idType', '证件类型'],
            ['idNum', '证件号码'],
            ['idValDate', '证件有效期'],
            ['industry', '所属行业'],
            ['regAsset', '注册资金（万元）'],
            ['regAddress', '注册地点'],
            ['foundTime', '成立时间'],
            ['busiArea', '经营范围'],
            ['acctStatus', '账户状态'],
            ['openTime', '开户时间'],
            ['priSalesTeam', '服务经理'],
            ['lastCommission', '最近一次服务时间'],
        ];

        return (this.props.type === 'per') ? perLabelMap : orgLabelMap;
      },
      getMapValue: (key) => {
        let value = this.props.data.get(key);
        if (!value || value === undefined) {
          value = '--';
        } else if (key === 'idValDate' || key === 'foundTime' || key === 'openTime' || key === 'lastCommission') {
          const tempDate = new Date(value);
          value = `${tempDate.getFullYear()}/${tempDate.getMonth()}/${tempDate.getDate()}`;
        }
        return value;
      },
    };
  }

  render() {
    const { getMapValue } = this.state;
    const labelMap = this.state.getLabelMap();
    const listType = `baseList ${this.props.type}`;
    const rowItem = labelMap.map(item => (
      <li key={`${item[0]}`}>
        <div className={`listLabel ${item[0]}`}>{`${item[1]}`}</div>
        <div className="listValue">{`${getMapValue(item[0])}`}</div>
      </li>
    ));
    return (
      <section className={listType}>
        <ul>
          {rowItem}
        </ul>
      </section>
    );
  }
}
