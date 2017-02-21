/**
 * @file product/Searchable.js
 *  修饰列表组件，在列表组件上方加搜索框，并封装相应功能
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { SearchBar, List, ListView } from 'antd-mobile';

import SearchItem from './SearchItem';
import { prepareDataSource } from '../../utils/listView';

const Item = List.Item;

const SHOW_MODE = {
  NORMAL: 'NORMAL',
  SEARCHING: 'SEARCHING',
  SEARCHED: 'SEARCHED',
};

export const queryMethod = query => ({
  type: 'customer/search',
  payload: query,
});

export default (ComposedComponent) => {
  class SearchableComponent extends PureComponent {

    static propTypes = {
      searchList: PropTypes.array.isRequired,
      getSearchList: PropTypes.func,
      replace: PropTypes.func,
      location: PropTypes.object.isRequired,
    }

    static defaultProps = {
      getSearchList: () => {},
      replace: () => {},
    }

    constructor(props) {
      super(props);

      const { searchList, location: { query } } = props;
      this.state = {
        dataSource: prepareDataSource(searchList),
        mode: query.keyword ? SHOW_MODE.SEARCHED : SHOW_MODE.NORMAL,
        value: query.keyword || '',
      };
    }

    componentWillMount() {
      const { location: { query } } = this.props;
      const { keyword } = query;
      if (keyword) {
        this.doSearch(query);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { searchList, location: { query } } = nextProps;
      if (searchList !== this.props.searchList) {
        this.setState({
          dataSource: prepareDataSource(searchList),
          mode: query.keyword ? SHOW_MODE.SEARCHED : SHOW_MODE.NORMAL,
        });
      }

      const { location: { query: preQuery } } = this.props;

      if (query.keyword !== preQuery.keyword
        || query.page !== preQuery.page) {
        this.doSearch(query);
      }
    }

    @autobind
    onEndReached() {
      // console.log('onEndReached');
      const { isLoading } = this.state;
      if (!isLoading) {
        this.setState({ isLoading: true }, this.getList);
      }
    }

    /**
     * 根据产品分类id获取产品列表
     */
    @autobind
    getList() {
      const { location: { query: { keyword, page } } } = this.props;
      this.props.getSearchList({
        keyword,
        page: page + 1,
      });
    }

    @autobind
    doSearch(query) {
      this.props.getSearchList(query);
    }

    @autobind
    handleClick() {
    }

    @autobind
    handleFocus() {
      if (this.state.mode === SHOW_MODE.NORMAL) {
        this.setState({ mode: SHOW_MODE.SEARCHING });
      }
    }

    @autobind
    handleChange(text) {
      const stateMap = { value: text };
      if (text === '') {
        stateMap.mode = SHOW_MODE.SEARCHING;
      }
      this.setState(stateMap);
    }

    @autobind
    handleCancel() {
      this.setState({
        mode: SHOW_MODE.NORMAL,
        value: '',
      });
    }

    @autobind
    handleSubmit(keyword) {
      const { replace, location: { query } } = this.props;
      if (query.keyword !== keyword) {
        // 这里重置page为1
        replace({
          pathname: location.pathname,
          query: {
            keyword,
            page: 1,
          },
        });
      }
    }

    renderSuggestion() {
      return (
        <List renderHeader={() => '历史记录'} className="history-list">
          <Item arrow="horizontal">历史记录1</Item>
          <Item arrow="horizontal">历史记录2</Item>
          <Item arrow="horizontal">历史记录3</Item>
        </List>
      );
    }

    renderHeader() {
      return (
        <div>
          Header
        </div>
      );
    }

    @autobind
    renderRow(rowData, sectionID, rowID) {
      return (
        <SearchItem
          key={`${sectionID}-${rowID}`}
          id={rowData.id}
          title={rowData.name}
          extra={rowData.phone}
          onClick={this.handleClick}
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
          { isLoading ? '加载中...' : '加载完毕' }
        </div>
      );
    }

    renderResult() {
      const { dataSource } = this.state;
      if (!dataSource) {
        return null;
      }
      return (
        <ListView
          className="customer-search-list"
          dataSource={dataSource}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          pageSize={4}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      );
    }

    render() {
      const { mode, value } = this.state;
      let mainElems;
      if (mode === SHOW_MODE.NORMAL) {
        mainElems = <ComposedComponent {...this.props} />;
      } else if (mode === SHOW_MODE.SEARCHING) {
        mainElems = this.renderSuggestion();
      } else if (mode === SHOW_MODE.SEARCHED) {
        mainElems = this.renderResult();
      }

      return (
        <div>
          <SearchBar
            placeholder="客户姓名/客户号/手机号/证件号码"
            value={value}
            showCancelButton
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
          {mainElems}
        </div>
      );
    }
  }
  return SearchableComponent;
};
