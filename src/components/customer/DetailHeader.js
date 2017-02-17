/**
 * @file product/List.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import ImmutablePropTypes from 'react-immutable-proptypes';
import './DetailHeader.less';

export default class CustomerBasicHeader extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    // getBasicInfo: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    push: () => { },
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
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        isLoading: false,
        dataSource: data
      });
    }
  }

  @autobind
  getEveryData(key) {
    const { dataSource } = this.state;
    if (!dataSource) {
      return '无';
    }
    else {
      return dataSource.get(key);
    }
  }

  /**
   * 获取基本信息
   */
  @autobind
  getBasicInfo(id) {
    // const {  getBasicInfo } = this.props;
    // getBasicInfo(id);
    const { push } = this.props;
    push(`customer/basicInfo?id=${id}`);
  }

  /**
   * 处理用户点击事件
   */
  @autobind
  handleClick() {
    // const { push } = this.props;
    const custId = this.getEveryData('custId');
    // const { isLoading } = this.state;
    // if (!isLoading) {
    // this.setState({ isLoading: true }, this.getBasicInfo);
    // }

    this.getBasicInfo(custId);
  }

  render() {
    return (
      <section className="detailSection">
        <div className="detailItem">
          {this.getEveryData('brokerNumber')}
        </div>
        <div className="detailItem">
          {this.getEveryData('custTotalAsset')}
        </div>
        <div className="detailItem">
          {this.getEveryData('custGender')}
        </div>
        <div className="detailItem">
          {this.getEveryData('custLevelName')}
        </div>
        <div className="detailItem">
          <input type="button" onClick={this.handleClick} value="基本信息" />
        </div>
      </section>
    );
  }
}
