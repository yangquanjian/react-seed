/**
 * @file customer/CustContact.js
 *  客户联系方式
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';
import _ from 'lodash';

import withNavBar from '../../components/common/withNavBar';
import PullToRefreshable from '../../components/common/PullToRefreshable';
import Icon from '../../components/common/Icon';
import ContactList from '../../components/customer/ContactList';
import './CustContactPer.less';

// 获取个人客户联系方式
const getDataFunction = query => ({
  type: 'customer/getPerContact',
  payload: query || {},
});

const mapStateToProps = state => ({
  data: state.customer.contact,
  isLoading: state.loading.models.customer,
});

const mapDispatchToProps = {
  refresh: getDataFunction,
  push: routerRedux.push,
  goBack: routerRedux.goBack,
};

// 数据标签列表
const LIST_KEY_ARR = [
  { label: 'tel',
    name: '电话',
    icon: 'phone',
    child: ['cellPhones', 'workTels', 'homeTels', 'otherTels'],
    childname: ['手机', '单位', '住宅', '其他'],
  },
  { label: 'email',
    name: '邮箱',
    icon: 'email',
    child: ['emailAddresses'],
    childname: [''],
  },
  { label: 'address',
    name: '地址',
    icon: 'map',
    child: ['idAddress', 'homeAddresses', 'workAddresses', 'otherAddresses'],
    childname: ['身份证地址', '家庭住址', '单位地址', '其他地址'],
  },
  { label: 'qq',
    name: 'QQ',
    icon: 'qq',
    child: ['qqNumbers'],
    childname: [''],
  },
  { label: 'wechat',
    name: '微信',
    icon: 'weixin',
    child: ['wechatNumbers'],
    childname: [''],
  },
];

@connect(mapStateToProps, mapDispatchToProps)
@withNavBar({ title: '联系方式', hasBack: true })
@PullToRefreshable
export default class CustContactPer extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
  }

  static defaultProps = {
    goBack: () => {},
  }

  componentWillMount() {
    const { refresh } = this.props;
    const { custNumber, custSor = 'per', custId } = this.props.params;
    refresh({ custNumber, custSor, custId });
  }

  @autobind
  getDataModel() {
    const { data = {}, params: { custId = '--' } } = this.props;
    const dataModel = data[custId] || {};
    return dataModel;
  }

  @autobind
  getSectionArr(childLabelArr) {
    // 依据二级类型标签列表获取某类数据，
    // 如根据二级标签['身份证地址'，'家庭地址'，'单位地址'，'其他地址'],获取地址数据
    if (!childLabelArr) return [];
    const { custSor = '--' } = this.props.params;
    let dataModel = this.getDataModel();
    dataModel = (custSor === 'per') ? dataModel.perCustomerContactInfo : [];
    if (_.isEmpty(dataModel)) return [];

    const resultArr = [];
    childLabelArr.map((item) => {
      let temp = (dataModel[item]) ? dataModel[item] : [];
      if (item === 'idAddress') {
        temp = (!temp || Object.keys(temp).length === 0) ? [] : new Array(temp);
      }
      resultArr.push(temp);
      return true;
    });
    return resultArr;
  }

  @autobind
  isNull(dataArr) {
    // 判断某类数据是否为空，如地址数据
    if (!dataArr) return false;
    let bool = 0;
    dataArr.map((item) => {
      if (item instanceof Array && item.length > 0) bool++;
      return true;
    });

    return (bool > 0) ? 'have-data' : 'no-data';
  }

  render() {
    const dataModel = LIST_KEY_ARR.map(item => ({
      data: this.getSectionArr(item.child),
      nullstyle: this.isNull(this.getSectionArr(item.child)),
      ...item,
    }));

    const dataShow = dataModel.map((item, index) => (
      <div className={`info ${item.nullstyle}`} key={`sec-${item.label}-${index + 1}`}>
        <h3>
          <Icon className={item.label} type={`${item.icon}`} />
          {`${item.name}`}
        </h3>
        <ContactList
          isNull={`${item.nullstyle}`}
          type={`${item.label}`}
          labelArr={item.child}
          nameArr={item.childname}
          dataArr={item.data}
        />
      </div>
    ));

    return (
      <div className="cust-contact">
        <section className="other">
          {dataShow}
        </section>
      </div>
    );
  }
}
