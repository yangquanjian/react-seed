/**
 * @file customer/Info.js
 * @author fengwencong
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import {
  Tabs,
  WhiteSpace,
} from 'antd-mobile';

const TabPane = Tabs.TabPane;

export default class CustomerInfo extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        data,
      });
    }
  }

  @autobind
  getData(key) {
    if (this.props.data) {
      return this.props.data[key];
    }
    return '--';
  }

  @autobind
  tabChange(key) {
    console.log(`tabChange to ${key}`);
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.tabChange}>
          <TabPane tab="月" key="1">
            <div className="customerNew">
              <h3><i />新增客户</h3>
              <div className="allNum">总计{this.getData('CustomerAll')}</div>
              <div className="typeNum">{this.getData('PerCustomer')}个人客户</div>
              <div className="typeNum">{this.getData('ConCustomer')}机构客户</div>
              <div className="typeNum">{this.getData('ProCustomer')}产品客户</div>
            </div>
            <div className="businessNew">
              <h3><i />新开通业务</h3>
              <ul>
                <li>业务名称1 {this.getData('Business1')}</li>
                <li>业务名称2 {this.getData('Business2')}</li>
                <li>业务名称3 {this.getData('Business3')}</li>
                <li>业务名称4 {this.getData('Business4')}</li>
                <li>业务名称5 {this.getData('Business5')}</li>
              </ul>
            </div>
            <div className="infoNew">
              <div className="infoBlank">
                <p>{this.getData('customerFund')}</p>
                <p>净新增客户资产(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('stockFund')}</p>
                <p>股基累计净佣金(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('dealFund')}</p>
                <p>累计综合交易量(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('baseFund')}</p>
                <p>累计基础交易量(万)</p>
              </div>
            </div>
          </TabPane>
          <TabPane tab="季" key="2">
            <div className="customerNew">
              <h3><i />新增客户</h3>
              <div className="allNum">总计{this.getData('CustomerAll')}</div>
              <div className="typeNum">{this.getData('PerCustomer')}个人客户</div>
              <div className="typeNum">{this.getData('ConCustomer')}机构客户</div>
              <div className="typeNum">{this.getData('ProCustomer')}产品客户</div>
            </div>
            <div className="businessNew">
              <h3><i />新开通业务</h3>
              <ul>
                <li>业务名称1 {this.getData('Business1')}</li>
                <li>业务名称2 {this.getData('Business2')}</li>
                <li>业务名称3 {this.getData('Business3')}</li>
                <li>业务名称4 {this.getData('Business4')}</li>
                <li>业务名称5 {this.getData('Business5')}</li>
              </ul>
            </div>
            <div className="infoNew">
              <div className="infoBlank">
                <p>{this.getData('customerFund')}</p>
                <p>净新增客户资产(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('stockFund')}</p>
                <p>股基累计净佣金(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('dealFund')}</p>
                <p>累计综合交易量(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('baseFund')}</p>
                <p>累计基础交易量(万)</p>
              </div>
            </div>
          </TabPane>
          <TabPane tab="年" key="3">
            <div className="customerNew">
              <h3><i />新增客户</h3>
              <div className="allNum">总计{this.getData('CustomerAll')}</div>
              <div className="typeNum">{this.getData('PerCustomer')}个人客户</div>
              <div className="typeNum">{this.getData('ConCustomer')}机构客户</div>
              <div className="typeNum">{this.getData('ProCustomer')}产品客户</div>
            </div>
            <div className="businessNew">
              <h3><i />新开通业务</h3>
              <ul>
                <li>业务名称1 {this.getData('Business1')}</li>
                <li>业务名称2 {this.getData('Business2')}</li>
                <li>业务名称3 {this.getData('Business3')}</li>
                <li>业务名称4 {this.getData('Business4')}</li>
                <li>业务名称5 {this.getData('Business5')}</li>
              </ul>
            </div>
            <div className="infoNew">
              <div className="infoBlank">
                <p>{this.getData('customerFund')}</p>
                <p>净新增客户资产(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('stockFund')}</p>
                <p>股基累计净佣金(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('dealFund')}</p>
                <p>累计综合交易量(万)</p>
              </div>
              <div className="infoBlank">
                <p>{this.getData('baseFund')}</p>
                <p>累计基础交易量(万)</p>
              </div>
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}
