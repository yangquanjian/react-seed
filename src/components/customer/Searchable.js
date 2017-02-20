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
      push: PropTypes.func,
    }

    static defaultProps = {
      getSearchList: () => {},
      push: () => {},
    }

    constructor(props) {
      super(props);

      // 记录关键词和页码，翻页使用
      this.keyword = '';
      this.page = 1;

      this.state = {
        dataSource: prepareDataSource(props.searchList),
        mode: SHOW_MODE.NORMAL,
      };
    }

    componentWillReceiveProps(nextProps) {
      const { searchList } = nextProps;
      if (searchList !== this.props.searchList) {
        this.setState({
          dataSource: prepareDataSource(searchList),
        });
      }
    }

    @autobind
    onEndReached() {
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
      this.page++;
      const { keyword, page } = this;
      this.props.getSearchList({ keyword, page });
    }

    @autobind
    handleClick() {
    }

    @autobind
    handleFocus() {
      this.setState({ mode: SHOW_MODE.SEARCHING });
    }

    @autobind
    handleChange(text) {
      if (text === '') {
        this.setState({ mode: SHOW_MODE.SEARCHING });
      }
    }

    @autobind
    handleCancel() {
      this.setState({ mode: SHOW_MODE.NORMAL });
    }

    @autobind
    handleSubmit(keyword) {
      // 这里重置page为1
      this.page = 1;
      this.keyword = keyword;
      this.props.getSearchList({ keyword, page: this.page });
      this.setState({ mode: SHOW_MODE.SEARCHED });
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
      const { mode } = this.state;
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
            placeholder="搜索"
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
