/**
 * @file customer/List.js
 * @author fengwencong
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';
import _ from 'lodash';

import { prepareDataSource } from '../../utils/listView';
import ListItem from './ListItem';
import Select from '../../components/common/Select';
import Icon from '../../components/common/Icon';
import './list.less';

export default class CustomerInfo extends PureComponent {

  static propTypes = {
    list: PropTypes.object,
    getList: PropTypes.func.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    custQueryType: PropTypes.string,
    location: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired,
    pageNum: PropTypes.number,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    list: {},
    getList: () => { },
    onOpenChange: () => { },
    custQueryType: 'personal',
    location: {},
    replace: () => { },
    pageNum: 1,
    push: () => {},
  }

  constructor(props) {
    super(props);

    const { resultList = [] } = props.list ? props.list : {};
    const { location: { query } } = this.props;
    this.state = {
      dataSource: prepareDataSource(resultList),
      isLoading: false,
      orderType: query.orderType ? query.orderType : 'desc',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { list, location: { query } } = nextProps;
    const { location: { query: oldQuery } } = this.props;
    const { resultList = [] } = list || {};
    if (list !== this.props.list) {
      this.setState({
        dataSource: prepareDataSource(resultList),
        isLoading: false,
      });
    }
    if (!_.isEqual(query, oldQuery)) {
      this.refreshList(nextProps);
    }
  }

  @autobind
  onEndReached() {
    const { isLoading } = this.state;
    if (!isLoading) {
      this.setState({ isLoading: true }, this.refreshMore);
    }
  }

  @autobind
  getIconClass() {
    const { orderType } = this.state;
    if (orderType === 'desc') {
      return '';
    }
    return 'sortUp';
  }

  @autobind
  handleTypeChange(val) {
    const { replace, location: { query } } = this.props;
    replace({
      pathname: '/customer',
      query: {
        ...query,
        custNature: val,
      },
    });
  }

  @autobind
  handleLevChange(val) {
    const { replace, location: { query } } = this.props;
    replace({
      pathname: '/customer',
      query: {
        ...query,
        custLevel: val,
      },
    });
  }

  @autobind
  handleSortChange() {
    const { replace, location: { query } } = this.props;
    const { orderType } = this.state;
    let newSort = '';
    if (orderType === 'desc') {
      this.setState({
        orderType: 'asc',
      });
      newSort = 'asc';
    } else {
      this.setState({
        orderType: 'desc',
      });
      newSort = 'desc';
    }
    replace({
      pathname: '/customer',
      query: {
        ...query,
        orderType: newSort,
      },
    });
  }

  @autobind
  refreshMore() {
    const { custQueryType, list, location: { query } } = this.props;
    const { page = {} } = list || {};
    if (!_.isEmpty(page) && !page.curPageNum === page.totalPageNum) {
      this.props.getList({
        ...query,
        custQueryType,
        pageNum: page.curPageNum + 1,
      });
    }
  }

  @autobind
  refreshList(nextProps) {
    const { custQueryType, location: { query } } = nextProps;
    this.props.getList({
      ...query,
      custQueryType,
      pageNum: 1,
      refresh: true,
    });
  }

  @autobind
  renderHeader() {
    const { Option } = Select;
    return (
      <div>
        <Select className="cusType" defaultValue="客户性质" dropdownClassName="filterList" onChange={this.handleTypeChange}>
          <Option value="" text="客户性质">所有客户<Icon type="selected" /></Option>
          <Option value="per" text="个人客户">个人客户<Icon type="selected" /></Option>
          <Option value="org" text="机构客户">机构客户<Icon type="selected" /></Option>
          <Option value="prod" text="产品客户">产品客户<Icon type="selected" /></Option>
        </Select>
        <Select className="cusLev" defaultValue="客户等级" dropdownClassName="filterList" onChange={this.handleLevChange}>
          <Option value="" text="所有等级">所有等级<Icon type="selected" /></Option>
          <Option value="805010" text="钻石卡">钻石卡<Icon type="selected" /></Option>
          <Option value="805015" text="白金卡">白金卡<Icon type="selected" /></Option>
          <Option value="805020" text="金卡">金卡<Icon type="selected" /></Option>
          <Option value="805025" text="银卡">银卡<Icon type="selected" /></Option>
          <Option value="805030" text="理财卡">理财卡<Icon type="selected" /></Option>
          <Option value="805040" text="空">空<Icon type="selected" /></Option>
        </Select>
        <div className="sortBlank" onClick={this.handleSortChange}>
          <p>开户时间</p><i className={this.getIconClass()} />
        </div>
        <div className="filterBlank" onClick={this.props.onOpenChange}>
          <p>筛选</p><Icon type="filter" />
        </div>
      </div>
    );
  }

  @autobind
  renderRow(rowData, sectionID, rowID) {
    const { push } = this.props;
    return (
      <ListItem
        key={`${sectionID}-${rowID}`}
        {...rowData}
        push={push}
      />
    );
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
  renderFooter() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? '加载中...' : '加载完毕'}
      </div>
    );
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <ListView
        className="list-over-tabbar product-list"
        dataSource={dataSource}
        renderSectionHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        stickyHeader
        stickyProps={{
          stickyStyle: { WebkitTransform: 'none', transform: 'none', zIndex: '1' },
          // topOffset: -43,
          // isActive: false, // 关闭 sticky 效果
        }}
        stickyContainerProps={{
          className: 'for-stickyContainer-demo',
        }}
      />
    );
  }
}
