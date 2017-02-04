/**
 * @file product/List.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { prepareDataSource } from '../../utils/listView';
import ListItem from './ListItem';
import './list.less';

export default class ProductList extends PureComponent {

  static propTypes = {
    list: ImmutablePropTypes.list.isRequired,
    getList: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
    push: PropTypes.func,
  }

  static defaultProps = {
    push: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getList();
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    if (list !== this.props.list) {
      this.setState({
        dataSource: prepareDataSource(list),
        isLoading: false,
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
    const { categoryId, getList } = this.props;
    getList(categoryId);
  }

  renderHeader() {
    return (
      <span>Header</span>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <ListItem
        key={`${sectionID}-${rowID}`}
        {...rowData}
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
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <ListView
        className="list-over-tabbar product-list"
        dataSource={dataSource}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
