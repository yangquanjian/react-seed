/**
 * @file Product/List.js
 * @author maoquan
 */

import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';

import connect from '../../decorators/connect';
import { productList } from '../../actions/productActions';
import { dataSource, prepareDataSource } from '../../utils/listView';

const mapStateToProps = state => {
  return {
    list: state.getIn(['product', 'list']),
  }
};

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

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.getList();
    // you can scroll to the specified position
    // this.refs.lv.refs.listview.scrollTo(0, 200);
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    if (list !== this.props.list) {
      this.setState({
        list,
        dataSource: prepareDataSource(list),
        isLoading: false,
      });
    }
  }

  @autobind
  onEndReached(event) {
    // load new data
    console.log('reach end', event);
    this.setState({ isLoading: true });
    this.props.getList();
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

  render() {
    const { dataSource, isLoading } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <ListView
        dataSource={ dataSource }
        renderHeader={ () => <span>header</span> }
        renderFooter={
          () => <div style={{ padding: 30, textAlign: 'center' }}>
            { isLoading ? '加载中...' : '加载完毕' }
          </div>
        }
        renderRow={ this.renderRow }
        renderSeparator={ this.renderSeparator }
        className="am-list"
        pageSize={ 4 }
        scrollRenderAheadDistance={ 500 }
        scrollEventThrottle={ 20 }
        onScroll={() => { console.log('scroll'); }}
        useBodyScroll
        onEndReached={ this.onEndReached }
        onEndReachedThreshold={ 10 }
      />
    );
  }
}
