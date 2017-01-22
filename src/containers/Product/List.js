/**
 * @file Product/List.js
 * @author maoquan
 */

import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';

import { productList } from '../../actions/productActions';
import { connect } from '../../decorators/connect';

const mapStateToProps = state => ({
  list: state.product.list,
});

const mapDispatchToProps = dispatch => ({
  getList: query => (dispatch(productList.load(query))),

});

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductList extends PureComponent {

  static propTypes = {
    getList: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.getList();
    // you can scroll to the specified position
    // this.refs.lv.refs.listview.scrollTo(0, 200);
  }

  @autobind
  onEndReached(event) {
    // load new data
    console.log('reach end', event);
    this.setState({ isLoading: true });
    this.props.getList();
  }

  renderRow(rowData, sectionID, rowID) {
    const obj = rowData;
    return (
      <div
        key={rowID}
        style={{
          padding: '0.08rem 0.16rem',
          backgroundColor: 'white',
        }}
      >
        <h3 style={{ padding: 2, marginBottom: '0.08rem', borderBottom: '1px solid #F6F6F6' }}>
          {obj.title}
        </h3>
        <div style={{ display: 'flex' }}>
          <img style={{ height: '1.28rem', marginRight: '0.08rem' }} src={obj.img} alt={obj.title} />
          <div style={{ display: 'inline-block' }}>
            <p>{obj.des}</p>
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

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={
          () => <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '加载完毕'}
          </div>
        }
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        className="am-list"
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
