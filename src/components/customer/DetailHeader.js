/**
 * @file customer/DetailHeader.js
 * @author xuxiaoqin
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import './DetailHeader.less';
import Icon from '../common/Icon';
import AccountFilter from './AccountFilter';

export default class CustomerDetailHeader extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    push: PropTypes.func,
    custSor: PropTypes.string.isRequired,
    custNumber: PropTypes.string.isRequired,
    custId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    push: () => { },
    data: {},
    custSor: '',
    custNumber: '',
    custId: '',
  }

  /**
   * 跳转基本信息页面
   */
  @autobind
  handleClick() {
    const { push, custId, custNumber, custSor } = this.props;
    // push({
    //   pathname: '/custBasic',
    //   query: {
    //     custId,
    //     custNumber,
    //     custSor,
    //   },
    // });
    push(`/customer/custBasic/${custNumber}/${custSor}/${custId}`);
  }

  @autobind
  filterDataSource() {
    const { data: dataSource, custSor, custId } = this.props;
    let detailData = {};
    if (dataSource) {
      if (custSor === 'per') {
        /** 个人客户 */
        detailData = {
          custGender: dataSource.gender ? dataSource.gender : '- -',
          custAge: dataSource.age ? dataSource.age : '- -',
          custGrade: dataSource.custGrade ? dataSource.custGrade : '- -',
          custType: 'per',
          custName: dataSource ? `${dataSource.custName.slice(0, 1)}**` : '- -',
          custId: custId || '- -',
          custTotalAsset: AccountFilter(dataSource.totAsset),
        };
      } else if (dataSource.custType === 'org') {
        /** 机构客户 */
        detailData = {
          /** 所属行业 */
          industry: dataSource.industry ? dataSource.industry : '- -',
          /** 机构类型 */
          acctType: dataSource.acctType ? dataSource.acctType : '- -',
          custGrade: dataSource.custGrade ? dataSource.custGrade : '- -',
          custType: 'org',
          custName: '机构客户',
          custId: custId || '- -',
          custTotalAsset: AccountFilter(dataSource.totAsset),
        };
      }
    }

    return detailData;
  }

  render() {
    const { data: dataSource } = this.props;
    if (!dataSource) {
      return null;
    }
    const filteredData = this.filterDataSource();
    const personCust = {
      className: 'custTitle',
      type: filteredData.custGender === '男' ? 'touxiang' : 'nvxing',
    };
    const orgCust = {
      className: 'orgIcon',
      type: 'jigou',
    };
    const custAsset = {
      className: 'moneyRight',
      type: 'jinbi1',
    };
    const more = {
      className: 'more',
      type: 'browse',
    };

    const grade = classnames({
      emptyCard: !filteredData.custGrade,
      goldCard: filteredData.custGrade && filteredData.custGrade.toString().indexOf('金') !== -1,
      silverCard: filteredData.custGrade && filteredData.custGrade.toString().indexOf('银') !== -1,
      diamondCard: filteredData.custGrade && filteredData.custGrade.toString().indexOf('钻石') !== -1,
      financeCard: filteredData.custGrade && filteredData.custGrade.toString().indexOf('理财') !== -1,
      whiteGoldCard: filteredData.custGrade && filteredData.custGrade.toString().indexOf('白金') !== -1,
    });

    if (filteredData.custType === 'per') {
      return (
        <div className="detailHeaderSection">
          <div className="basic">
            <div className="headerLeft">
              <i className="perCustIconSection"><Icon {...personCust} /></i>
              <div className="nameSection">
                <span className="custName">{filteredData.custName}</span>
                <div className="gradeIdSection">
                  <img alt="" className={grade} />
                  <span className="custId">{filteredData.custId}</span>
                </div>
              </div>
            </div>
            <div className="asset">
              <Icon {...custAsset} />
              {filteredData.custTotalAsset}
            </div>
          </div>
          <div className="basicSplit" />
          <div className="headerBottom">
            <div className="age">{filteredData.custAge}岁</div>
            <div className="sex">{filteredData.custGender}</div>
            <div className="moreInfo" onClick={this.handleClick}>
              <Icon {...more} />
              <div className="">查看更多</div>
            </div>
          </div>
          <div className="headerSplit" />
        </div>
      );
    } else if (filteredData.custType === 'org') {
      return (
        <div>
          <div className="basic">
            <div className="headerLeft">
              <i className="orgCustIconSection"><Icon {...orgCust} /></i>
              <div className="nameSection">
                <span className="custName">机构客户</span>
                <div className="gradeIdSection">
                  <img alt="" className={grade} />
                  <span className="custId">{filteredData.custId}</span>
                </div>
              </div>
            </div>
            <div className="asset">
              <Icon {...custAsset} />
              {filteredData.custTotalAsset}
            </div>
          </div>
          <div className="basicSplit" />
          <div className="headerBottom">
            <div className="industry">{filteredData.industry}</div>
            <div className="acctType">{filteredData.acctType}</div>
            <div className="moreInfo" onClick={this.handleClick}>
              <Icon {...more} />
              <div className="">查看更多</div>
            </div>
          </div>
          <div className="headerSplit" />
        </div>
      );
    }
    return null;
  }
}
