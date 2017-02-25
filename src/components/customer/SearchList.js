/**
 * @file customer/SearchList.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';

import SearchItem from './SearchItem';
import { prepareDataSource } from '../../utils/listView';

export default class SearchList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    replace: PropTypes.func,
    location: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    replace: () => {},
  }

  constructor(props) {
    super(props);

    const { list } = props;
    this.state = {
      dataSource: prepareDataSource(list),
      height: 1000,
    };
  }

  componentDidMount() {
    if (this.container) {
      const offset = this.container.getBoundingClientRect();
      const height = document.documentElement.clientHeight;
      this.setState({ height: height - offset.top }); // eslint-disable-line
    }
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    if (list !== this.props.list) {
      this.setState({
        dataSource: prepareDataSource(list),
      });
    }
  }

  @autobind
  onEndReached() {
    // console.log('onEndReached');
    const { isLoading } = this.state;
    if (!isLoading) {
      this.setState({ isLoading: true }, this.refreshMore);
    }
  }

  /**
   * 根据产品分类id获取产品列表
   */
  @autobind
  refreshMore() {
    const { location: { query: { keyword, cusType } } } = this.props;
    this.props.getList({
      keyword,
      cusType,
    });
  }

  @autobind
  handleClick() {
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

  render() {
    const { dataSource, height } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <div
        ref={ref => (this.container = ref)}
        style={{ height: `${height}px` }}
      >
        <ListView
          className="customer-search-list"
          dataSource={dataSource}
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          pageSize={4}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
