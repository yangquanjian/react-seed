/**
 * @file customer/SearchList.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';

import SearchItem from './SearchItem';
import { prepareDataSource } from '../../utils/listView';
import Message from '../message';

import './search_list.less';

export default class SearchList extends PureComponent {

  static propTypes = {
    searchInfo: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    doSearch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    loading: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
      loading: props.loading,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { searchInfo: { list }, loading } = nextProps;
    if (list !== this.props.searchInfo.list) {
      this.setState({
        dataSource: prepareDataSource(list),
      });
    }
    if (loading !== this.props.loading) {
      this.setState({
        loading,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dataSource, loading } = nextState;
    return dataSource !== this.state.dataSource
      || loading !== this.state.loading;
  }

  @autobind
  onEndReached() {
    const { searchInfo: { page } } = this.props;
    if (page.curPageNum === page.totalPageNum) {
      return;
    }
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true }, this.refreshMore);
    }
  }

  /**
   * 根据产品分类id获取产品列表
   */
  @autobind
  refreshMore() {
    const {
      doSearch,
      searchInfo: { page },
      location: { query },
    } = this.props;
    doSearch({
      ...query,
      page: page.curPageNum + 1,
    });
  }

  @autobind
  handleClick(data) {
    const { push } = this.props;
    const {
      cusId: custId,
      brokerNumber: custNumber,
      custType: custSor,
    } = data;

    push({
      pathname: '/customer/detail',
      query: {
        custId,
        custNumber,
        custSor,
      },
    });
  }

  @autobind
  renderRow(rowData, sectionID, rowID) {
    const { location: { query: { keyword } } } = this.props;
    // 如果搜索条件不是纯数字，则认为是姓名搜索
    // 不需要展示搜索条件，如电话、开户号等
    let extra = keyword;
    if (/\D/.test(keyword)) {
      extra = '';
    }
    return (
      <SearchItem
        key={`${sectionID}-${rowID}`}
        data={rowData}
        extra={extra}
        query={keyword}
        onClick={() => this.handleClick(rowData)}
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
    const { searchInfo: { page } } = this.props;
    if (page.curPageNum === page.totalPageNum) {
      return (<div>已经到底了</div>);
    }
    const { loading } = this.state;
    return loading ? (
      <div><Message text={'努力加载中...'} imgName={'messageLoading.png'} /></div>
    ) : null;
  }

  @autobind
  renderHeader() {
    return (
      <p>客户搜索结果</p>
    );
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }
    if (dataSource.getRowCount() === 0) {
      return (
        <p className="message-layer"><Message /></p>
      );
    }
    return (
      <div className="customer-search-list-view">
        <ListView
          className="customer-search-list"
          dataSource={dataSource}
          initialListSize={20}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          pageSize={10}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
          useBodyScroll
        />
      </div>
    );
  }
}
