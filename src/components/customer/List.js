/**
 * @file customer/List.js
 * @author fengwencong
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';
import { prepareDataSource } from '../../utils/listView';
import ListItem from './ListItem';
import Select from '../../components/common/Select';
import Icon from '../../components/common/Icon';

export default class CustomerInfo extends PureComponent {

  static propTypes = {
    list: PropTypes.array,
    getList: PropTypes.func.isRequired,
    onOpenChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    list: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: prepareDataSource(props.list),
      isLoading: false,
    };
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
      this.setState({ isLoading: true }, this.props.getList);
    }
  }

  @autobind
  renderHeader() {
    const { Option } = Select;
    return (
      <div>
        <Select style={{ width: 300 }}>
          <Option value="0" text="预期收益由高到低">预期收益由高到低</Option>
          <Option value="1" text="预期收益由低到高">预期收益由低到高</Option>
          <Option value="2" text="期限由高到低">期限由高到低</Option>
          <Option value="3" text="期限由低到高">期限由低到高</Option>
        </Select>
        <Icon type="wode" onClick={this.props.onOpenChange} />
      </div>
    );
  }

  @autobind
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
          stickyStyle: { WebkitTransform: 'none', transform: 'none' },
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
