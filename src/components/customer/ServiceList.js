/**
 * @file customer/ServiceList.js
 * @author xuxiaoqin
 */
import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { RefreshControl, ListView } from 'antd-mobile';
// import _ from 'lodash';
import { prepareDataSource } from '../../utils/listView';
import ServiceListItem from './ServiceListItem';
import './ServiceList.less';

export default class ServiceList extends PureComponent {

  static propTypes = {
    list: PropTypes.object,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    custId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    list: {},
    location: {},
    push: () => { },
    refresh: () => { },
    custId: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: prepareDataSource([], true),
      isLoading: false,
      refreshing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    if (list !== this.props.list) {
      const { serviceRecords = [] } = list || {};
      this.state = {
        dataSource: prepareDataSource(serviceRecords, true),
      };
    }
  }

  @autobind
  onRefresh() {
    this.setState({ refreshing: true });
    const { location: { query }, refresh } = this.props;
    refresh({
      ...query,
    });
  }

  renderSeparator(sectionID, rowID) {
    return (
      <div
        key={`${sectionID}-${rowID}`}
        className="list-separator"
      />
    );
  }

  @autobind
  renderRow(rowData, sectionID, rowID) {
    const { push, custId } = this.props;
    return (
      <ServiceListItem
        key={`${sectionID}-${rowID}`}
        data={{ ...rowData, custId }}
        push={push}
      />
    );
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <div className="service-record">
        <ListView
          className="service-list"
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          pageSize={10}
          scrollEventThrottle={20}
          useBodyScroll
          initialListSize={20}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
        />
      </div>
    );
  }
}
