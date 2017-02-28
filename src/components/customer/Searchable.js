/**
 * @file product/Searchable.js
 *  修饰列表组件，在列表组件上方加搜索框，并封装相应功能
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { SearchBar, List } from 'antd-mobile';
import localforage from 'localforage';

import Icon from '../common/Icon';
import Select from '../common/Select';
import './searchable.less';

const Item = List.Item;
const Option = Select.Option;

const SHOW_MODE = {
  NORMAL: 'NORMAL',
  SEARCHING: 'SEARCHING',
};

const SELECT_OPTIONS = [
  {
    text: '我的客户',
    value: 'PERSONAL',
  },
  {
    text: '我团队的客户',
    value: 'TEAM',
  },
];

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

      // 我的客户、我团队的客户选择组件
      this.select = null;

      const { location: { query: { keyword, custQueryType } } } = props;
      this.state = {
        mode: SHOW_MODE.NORMAL,
        // 如果在搜索结果页面，则默认填上关键词
        value: this.isInResultPage() ? decodeURIComponent(keyword) : '',
        typeValue: custQueryType || SELECT_OPTIONS[0].value,
        historyList: [],
      };
      this.syncHistoryToState();
    }

    componentWillReceiveProps(nextProps) {
      const { location: { query: { keyword, custQueryType } } } = nextProps;
      this.setState({
        mode: SHOW_MODE.NORMAL,
        value: this.isInResultPage() ? decodeURIComponent(keyword) : '',
        typeValue: custQueryType || SELECT_OPTIONS[0].value,
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
    async removeHistory(keyword) {
      let historyList = await this.getHistoryList();
      if (historyList.includes(keyword)) {
        historyList = historyList.filter(item => item !== keyword);
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
    handleSelectChange(value) {
      this.setState({
        typeValue: value,
      });
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
            custQueryType: this.state.typeValue,
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
    handleHistoryItemClick(keyword) {
      this.handleSubmit(keyword);
    }

    @autobind
    handleRemoveClick(e, keyword) {
      e.preventDefault();
      e.stopPropagation();
      this.removeHistory(keyword);
    }

    @autobind
    renderHistoryHeader() {
      return (
        <p>历史搜索</p>
      );
    }

    @autobind
    renderCrossIcon(keyword) {
      return (
        <Icon
          type="close"
          data-item={keyword}
          onClick={e => this.handleRemoveClick(e, keyword)}
        />
      );
    }
    @autobind
    renderClockIcon() {
      return (
        <Icon type="clock" />
      );
    }

    renderHistory() {
      const historyList = this.state.historyList;
      return (
        <List renderHeader={this.renderHistoryHeader} className="history-list">
          {historyList.map(
            keyword => (
              <Item
                thumb={this.renderClockIcon()}
                key={encodeURIComponent(keyword)}
                extra={this.renderCrossIcon(keyword)}
                onClick={() => this.handleHistoryItemClick(keyword)}
              >{keyword}</Item>
            ),
          )}
        </List>
      );
    }

    render() {
      const { mode, value, typeValue } = this.state;
      let mainElems;
      if (mode === SHOW_MODE.NORMAL) {
        mainElems = (<ComposedComponent
          {...this.props}
          custQueryType={typeValue}
        />);
      } else if (mode === SHOW_MODE.SEARCHING) {
        mainElems = this.renderHistory();
      }

      return (
        <div className="customer-search">
          <div className="customer-header">
            <Select
              className="customer-header-select"
              ref={ref => (this.select = ref)}
              value={typeValue}
              onChange={this.handleSelectChange}
            >
              {SELECT_OPTIONS.map(
                option => (
                  <Option
                    key={option.value}
                    value={option.value}
                    text={option.text}
                  >{option.text}</Option>
                ),
              )}
            </Select>
            <SearchBar
              className="customer-header-search"
              placeholder="客户姓名/客户号/手机号/证件号码"
              value={value}
              showCancelButton
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              onCancel={this.handleCancel}
              onSubmit={this.handleSubmit}
            />
          </div>
          {mainElems}
        </div>
      );
    }
  }
  return SearchableComponent;
};
