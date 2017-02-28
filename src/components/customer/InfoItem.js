import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import Icon from '../../components/common/Icon';
import './infoItem.less';

class InfoItem extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: undefined,
  }

  @autobind
  getData(key) {
    if (this.props.data) {
      return this.props.data[key] ? this.props.data[key] : '--';
    }
    return '--';
  }

  render() {
    return (
      <div className="customerWrapper">
        <div className="customerNew">
          <h3><Icon type="kehu2" />新增客户</h3>
          <div className="flexBox cusNewBox">
            <div className="newCusAll cusBlank">
              <Icon type="kehu1" />
              <p className="numLabel">{this.getData('netNewCusNumber')}</p>
              <p className="txtLabel">净新增有效户</p>
            </div>
            <div className="newCusZero cusBlank">
              <Icon type="jifen" />
              <p className="numLabel">{this.getData('netNewFLSCusNumber')}</p>
              <p className="txtLabel">净新增非零客户数</p>
            </div>
          </div>
          <div className="flexBox cusNewBox">
            <div className="newCusHigh cusBlank">
              <Icon type="jewelry" />
              <p className="numLabel">{this.getData('netNewGDCusNumber')}</p>
              <p className="txtLabel">净新增高端产品户</p>
            </div>
            <div className="newCusPro cusBlank">
              <Icon type="chanpin" />
              <p className="numLabel">{this.getData('netNewCPCusNumber')}</p>
              <p className="txtLabel">净新增产品户</p>
            </div>
          </div>
        </div>
        <div className="customerFund">
          <h3><Icon type="money" />资产量</h3>
          <div className="flexBox cusFundBox">
            <div className="fundBlank lineBlank cusFund">
              <Icon type="zhuzhuangtulv" />
              <p className="numLabel">{this.getData('netNewCusAsset')}</p>
              <p className="txtLabel">净新增客户资产(万)</p>
            </div>
            <div className="fundBlank lineBlank stockFund">
              <Icon type="zhuzhuangtulv" />
              <p className="numLabel">{this.getData('totalNetCommission')}</p>
              <p className="txtLabel">股基累计净佣金(万)</p>
            </div>
          </div>
          <div className="flexBox cusFundBox">
            <div className="fundBlank dealFund">
              <Icon type="zhuzhuangtulv" />
              <p className="numLabel">{this.getData('totalZHVolume')}</p>
              <p className="txtLabel">累计综合交易量(万)</p>
            </div>
            <div className="fundBlank baseFund">
              <Icon type="zhuzhuangtulv" />
              <p className="numLabel">{this.getData('totalJCVolume')}</p>
              <p className="txtLabel">累计基础交易量(万)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoItem;
