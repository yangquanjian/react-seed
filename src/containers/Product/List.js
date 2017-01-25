/**
 * @file product/List.js
 * @author maoquan
 */

import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';

import connect from '../../decorators/connect';
import { productList } from '../../actions/productActions';
import { prepareDataSource } from '../../utils/listView';

const mapStateToProps = state => ({
  list: state.getIn(['product', 'list']),
});

const mapDispatchToProps = dispatch => ({
  getList: query => (dispatch(productList.load(query))),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductList extends PureComponent {

  static propTypes = {
    list: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.getList();
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

  renderHeader() {
    return (
      <span>Header</span>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <div
        key={rowID}
        style={{
          padding: '0.08rem 0.16rem',
          backgroundColor: 'white',
        }}
      >
        <h3 style={{ padding: 2, marginBottom: '0.08rem', borderBottom: '1px solid #F6F6F6' }}>
          {rowData.title}
        </h3>
        <div style={{ display: 'flex' }}>
          <img style={{ height: '1.28rem', marginRight: '0.08rem' }} src={rowData.img} alt={rowData.title} />
          <div style={{ display: 'inline-block' }}>
            <p>{rowData.des}</p>
            <p><span style={{ fontSize: '1.6em', color: '#FF6E27' }}>{rowID}</span>元/任务</p>
          </div>
        </div>
      </div>
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
  }

  @autobind
  renderFooter() {
    const { isLoading } = this.state;
    return (
      <div style={{ padding: 30, textAlign: 'center' }}>
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
      <div className="list-container">
        <ListView
          className="am-list"
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
      </div>
    );
  }
}
