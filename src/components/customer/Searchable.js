/**
 * @file product/Searchable.js
 *  修饰列表组件，在列表组件上方加搜索框，并封装相应功能
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { SearchBar, List } from 'antd-mobile';
import localforage from 'localforage';

import './searchable.less';

const Item = List.Item;

const SHOW_MODE = {
  NORMAL: 'NORMAL',
  SEARCHING: 'SEARCHING',
};

const HISTORY_KEY = 'CUSTOMER_HISTORY_KEYWORD';

export default (ComposedComponent) => {
  class SearchableComponent extends PureComponent {

    static propTypes = {
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      goBack: PropTypes.func,
      location: PropTypes.object.isRequired,
    }

    static defaultProps = {
      goBack: () => {},
    }

    constructor(props) {
      super(props);

      const { location: { query } } = props;
      this.state = {
        mode: SHOW_MODE.NORMAL,
        // 如果在搜索结果页面，则默认填上关键词
        value: this.isInResultPage() ? decodeURIComponent(query.keyword) : '',
        historyList: [],
      };
      this.syncHistoryToState();
    }

    componentWillReceiveProps(nextProps) {
      const { location: { query } } = nextProps;
      this.setState({
        mode: SHOW_MODE.NORMAL,
        value: this.isInResultPage() ? decodeURIComponent(query.keyword) : '',
      });
      this.syncHistoryToState();
    }

    async getHistoryList() {
      let historyList = await localforage.getItem(HISTORY_KEY);
      if (!historyList) {
        historyList = [];
        await localforage.setItem(HISTORY_KEY, historyList);
      }
      return historyList;
    }

    syncHistoryToState() {
      this.getHistoryList().then(
        historyList => this.setState({
          historyList,
        }),
      );
    }

    async saveHistory(keyword) {
      let historyList = await this.getHistoryList();
      if (historyList.includes(keyword)) {
        historyList = historyList.filter(item => item !== keyword);
      }
      historyList.unshift(keyword);
      if (historyList.length > 10) {
        historyList.pop();
      }
      await localforage.setItem(HISTORY_KEY, historyList);
      this.setState({
        historyList,
      });
    }

    @autobind
    async clearHistory() {
      await localforage.setItem(HISTORY_KEY, []);
      this.setState({
        historyList: [],
      });
    }

    isInResultPage() {
      const { location } = this.props;
      return /searchResult/.test(location.pathname);
    }

    @autobind
    handleClick() {
    }

    @autobind
    handleFocus() {
      if (this.state.mode === SHOW_MODE.NORMAL
        && !this.isInResultPage()) {
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
      const { goBack } = this.props;
      if (this.isInResultPage()) {
        goBack();
      } else {
        this.setState({
          mode: SHOW_MODE.NORMAL,
          value: '',
        });
      }
    }

    @autobind
    async handleSubmit(keyword) {
      if (!keyword) {
        return;
      }
      const { push, replace, location: { query } } = this.props;
      const isInResultPage = this.isInResultPage();
      const nav = isInResultPage ? replace : push;
      if (query.keyword !== keyword) {
        await this.saveHistory(keyword);
        nav({
          pathname: '/customer/searchResult',
          query: {
            keyword: encodeURIComponent(keyword),
            page: 1,
          },
        });
      } else if (keyword === encodeURIComponent(query.keyword)) {
        // 如果要搜索的关键词就是这次已展现的列表
        // 直接切换就好
        this.setState({
          mode: SHOW_MODE.NORMAL,
          value: keyword,
        });
      }
    }

    @autobind
    handleHistoryItemClick(e) {
      const keyword = e.target.innerHTML;
      this.handleSubmit(keyword);
    }

    @autobind
    renderHistoryHeader() {
      return (
        <p>
          历史记录
          <a className="history-clear" onClick={this.clearHistory}>清除</a>
        </p>
      );
    }

    renderHistory() {
      const historyList = this.state.historyList;
      return (
        <List renderHeader={this.renderHistoryHeader} className="history-list">
          {historyList.map(
            keyword => (
              <Item
                key={encodeURIComponent(keyword)}
                arrow="horizontal"
                onClick={this.handleHistoryItemClick}
              >{keyword}</Item>
            ),
          )}
        </List>
      );
    }

    render() {
      const { mode, value } = this.state;
      let mainElems;
      if (mode === SHOW_MODE.NORMAL) {
        mainElems = <ComposedComponent {...this.props} />;
      } else if (mode === SHOW_MODE.SEARCHING) {
        mainElems = this.renderHistory();
      }

      return (
        <div className="customer-search">
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
