/**
 * @file customer/ServiceList.js
 *  客户基本信息
 * @author liutingting(3171214926@qq.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';

import { ListView } from 'antd-mobile';
import NavBar from '../../components/common/NavBar';
import { prepareDataSource } from '../../utils/listView';
import ServiceItem from '../../components/customer/ServiceItem';
import './servicelist.less';

const mapStateToProps = state => ({
  data: state.customer.serviceList,
});

const mapDispatchToProps = {
  push: routerRedux.push,
  goBack: routerRedux.goBack,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ServiceList extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '历史服务记录',
    push: () => {},
    goBack: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: prepareDataSource(Object.values(this.props.data)[1]),
      isLoading: false,
    };
  }

  @autobind
  getValueByKey(key) {
    const dataModel = Object.values(this.props.data)[1];
    const value = dataModel[key];
    return (!value || value === '--') ? '--' : value;
  }

  @autobind
  getDataModel() {
    const temp = Object.values(this.props.data)[1];
    return (temp && (temp instanceof Array) && temp.length > 0) ? temp : [];
  }

  @autobind
  contactData(arr, obj) {
    const tempArr = arr;
    arr.map((item, index) => {
      let value = obj[item.type];
      if (!value || value === '--') {
        value = '--';
      } else if (item.type === 'idValDate' || item.type === 'foundTime' || item.type === 'openTime' || item.type === 'lastCommission') {
        value = (value.length === 10) ? value.replace(/-/g, '/') : value.slice(0, 10);
      }
      tempArr[index].value = value;
      tempArr[index].key = index + 1;
      return true;
    });
    return tempArr;
  }

  @autobind
  handleClick(id) {
    const { push } = this.props;
    push(`product/detail?id=${id}`);
  }

  @autobind
  renderRow(rowData, sectionID, rowID) {
    return (
      <ServiceItem
        key={`${sectionID}-${rowID}`}
        onClick={this.handleClick}
        {...rowData}
      />
    );
  }

  @autobind
  renderSeparator(sectionID, rowID) {
    return (
      <div
        key={`${sectionID}-${rowID}`}
        className="list-separator"
      />
    );
  }


  render() {
    const { title, goBack } = this.props;
    const { dataSource } = this.state;

    return (
      <div className="service-record">
        <NavBar
          iconName={'fanhui'}
          onLeftClick={goBack}
        >
          {title}
        </NavBar>

        <ListView
          className="service-list"
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
      </div>
    );
  }
}
