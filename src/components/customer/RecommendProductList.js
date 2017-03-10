/**
 * @file customer/RecommendProductList.js
 * @author xuxiaoqin
 */

import React, { PropTypes, PureComponent } from 'react';
import { SwipeAction, List } from 'antd-mobile';
import { autobind } from 'core-decorators';
import Icon from '../common/Icon';
import './recommendProduct.less';

const Item = List.Item;

export default class RecommendProductList extends PureComponent {

  static propTypes = {
    recommendList: PropTypes.array.isRequired,
    custId: PropTypes.string.isRequired,
    push: PropTypes.func,
    ignoreProduct: PropTypes.func.isRequired,
  }

  static defaultProps = {
    push: () => { },
    custId: '',
    recommendList: [],
    ignoreProduct: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { recommendList } = nextProps;
    if (recommendList !== this.props.recommendList) {
      this.setState({
        dataSource: recommendList,
        isLoading: false,
      });
    }
  }

  /**
  * 处理用户点击事件
  */
  @autobind
  handleIgnore() {
    this.setState({ isLoading: true }, this.ignoreProduct);
  }

  @autobind
  ignoreProduct() {
    const { custId, ignoreProduct } = this.props;
    ignoreProduct(custId);
  }

  /**
   * 过滤数据源
   */
  @autobind
  filterDataSource() {
    const { dataSource } = this.state;
    if (!dataSource || dataSource.length < 1) {
      return [];
    }

    const len = dataSource.length;

    for (let i = 0; i < len; i++) {
      if (Object.keys(dataSource[i]).length > 0) {
        if (dataSource[i].bfMaturity === '' || dataSource[i].bfMaturity === null || typeof dataSource[i].bfMaturity === 'undefined') {
          dataSource[i].bfMaturity = '- -';
        }
        if (dataSource[i].expectedYield === '' || dataSource[i].expectedYield === null || typeof dataSource[i].expectedYield === 'undefined') {
          dataSource[i].expectedYield = '- -';
        }
      }
    }

    return dataSource;
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }

    const data = this.filterDataSource();

    const actionAttrs = {
      style: { backgroundColor: 'gray' },
      autoClose: false,
      right: [
        {
          text: '不适合',
          onPress: this.handleIgnore,
          style: { backgroundColor: '#ddd', color: 'white' },
        },
      ],
    };

    const sendEmail = {
      className: '',
      type: 'NOTEfayoujian',
    };

    return (
      <div className="prdtListSection">
        <List renderHeader={() => '为ta推荐'} className="productList">
          <SwipeAction
            className="swipe-list"
            {...actionAttrs}
          >
            <Item
              className="list-item"
              extra=""
              arrow="empty"
            >
              <div className="recommendSection">
                <div className="scoreSection">
                  <span className="scoreContent">{data[0].clientScore}</span>
                  <span className="score">购买评分</span>
                </div>
                <div className="productSection">
                  <span className="productName">{data[0].productName}</span>
                  <div className="productProperty">
                    <span className="productCode">{data[0].productCode}</span>
                    <span className="categoryName">{data[0].categoryName}</span>
                    <span className="bfMaturity">{data[0].bfMaturity}</span>
                    <span className="verticalSplit">|</span>
                    <span className="expectedYield">{data[0].expectedYield}%</span>
                  </div>
                </div>
                <div className="sendEmail">
                  <Icon {...sendEmail} />
                </div>
              </div>
            </Item>
          </SwipeAction>
          <SwipeAction
            className="swipe-list"
            {...actionAttrs}
          >
            <Item
              className="list-item"
              extra=""
              arrow="empty"
            >
              <div className="recommendSection">
                <div className="scoreSection">
                  <span className="scoreContent">{data[0].clientScore}</span>
                  <span className="score">购买评分</span>
                </div>
                <div className="productSection">
                  <span className="productName">{data[0].productName}</span>
                  <div className="productProperty">
                    <span className="productCode">{data[0].productCode}</span>
                    <span className="categoryName">{data[0].categoryName}</span>
                    <span className="bfMaturity">{data[0].bfMaturity}</span>
                    <span className="verticalSplit">|</span>
                    <span className="expectedYield">{data[0].expectedYield}%</span>
                  </div>
                </div>
                <div className="sendEmail">
                  <Icon {...sendEmail} />
                </div>
              </div>
            </Item>
          </SwipeAction>
          <SwipeAction
            className="swipe-list"
            {...actionAttrs}
          >
            <Item
              className="list-item"
              extra=""
              arrow="empty"
            >
              <div className="recommendSection">
                <div className="scoreSection">
                  <span className="scoreContent">{data[0].clientScore}</span>
                  <span className="score">购买评分</span>
                </div>
                <div className="productSection">
                  <span className="productName">{data[0].productName}</span>
                  <div className="productProperty">
                    <span className="productCode">{data[0].productCode}</span>
                    <span className="categoryName">{data[0].categoryName}</span>
                    <span className="bfMaturity">{data[0].bfMaturity}</span>
                    <span className="verticalSplit">|</span>
                    <span className="expectedYield">{data[0].expectedYield}%</span>
                  </div>
                </div>
                <div className="sendEmail">
                  <Icon {...sendEmail} />
                </div>
              </div>
            </Item>
          </SwipeAction>
        </List>
      </div>
    );
  }
}
