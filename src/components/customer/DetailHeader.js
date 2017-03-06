/**
 * @file customer/DetailHeader.js
 * @author xuxiaoqin
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import _ from 'lodash';
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
    push(`/custBasic/${custNumber}/${custSor}/${custId}`);
  }

  filterDataSource({ dataSource = {}, custId, custSor }) {
    let detailData = {};
    if (dataSource) {
      if (custSor === 'per') {
        /** 个人客户 */
        detailData = {
          custGender: dataSource.gender || '- -',
          custAge: dataSource.age || '- -',
          custGrade: dataSource.custGrade || '- -',
          custType: 'per',
          custName: dataSource.custName ? `${dataSource.custName.slice(0, 1)}**` : '- -',
          custId: custId || '- -',
          custTotalAsset: AccountFilter(dataSource.totAsset),
          econNum: dataSource.econNum || '',
        };
      } else if (custSor === 'org') {
        /** 机构客户 */
        detailData = {
          /** 所属行业 */
          industry: dataSource.industry || '- -',
          /** 机构类型 */
          acctType: dataSource.acctType || '- -',
          custGrade: dataSource.custGrade || '- -',
          custType: 'org',
          custName: dataSource.custName ? `${dataSource.custName.slice(0, 2)}**` : '- -',
          custId: custId || '- -',
          custTotalAsset: AccountFilter(dataSource.totAsset),
          econNum: dataSource.econNum || '',
        };
      }
    }

    return detailData;
  }

  render() {
    const { data: dataSource = {}, custId, custSor } = this.props;

    if (_.isEmpty(dataSource)) {
      const emptyMore = {
        className: 'empty_more',
        type: 'empty',
      };
      const emptyAsset = {
        className: 'empty_asset',
        type: 'empty',
      };
      return (
        <div className="detailHeaderSection">
          <div className="basic">
            <div className="headerLeft">
              <i className="perCustIconSection_empty" />
              <div className="nameSection">
                <span className="custName" />
                <div className="gradeIdSection">
                  <i />
                  <span className="custId" />
                </div>
              </div>
            </div>
            <div className="asset">
              <Icon {...emptyAsset} />
            </div>
          </div>
          <div className="basicSplit" />
          <div className="headerBottom">
            <div className="age">--</div>
            <div className="sex">--</div>
            <div className="moreInfo">
              <Icon {...emptyMore} />
              <div className="">--</div>
            </div>
          </div>
          <div className="headerSplit" />
        </div>
      );
    }

    const custAsset = {
      className: 'moneyRight',
      type: 'jinbi1',
    };
    const more = {
      className: 'more',
      type: 'browse',
    };

    const filteredData = this.filterDataSource({ dataSource, custId, custSor });
    const personCust = {
      className: 'custTitle',
      type: filteredData.custGender === '男' ? 'touxiang' : 'nvxing',
    };
    const orgCust = {
      className: 'orgIcon',
      type: 'jigou',
    };

    const grade = classnames({
      emptyCard: !_.isEmpty(filteredData.custGrade) && filteredData.custGrade.toString().indexOf('空') !== -1,
      goldCard: !_.isEmpty(filteredData.custGrade) && filteredData.custGrade.toString().indexOf('金') !== -1,
      silverCard: !_.isEmpty(filteredData.custGrade) && filteredData.custGrade.toString().indexOf('银') !== -1,
      diamondCard: !_.isEmpty(filteredData.custGrade) && filteredData.custGrade.toString().indexOf('钻石') !== -1,
      financeCard: !_.isEmpty(filteredData.custGrade) && filteredData.custGrade.toString().indexOf('理财') !== -1,
      whiteGoldCard: !_.isEmpty(filteredData.custGrade) && filteredData.custGrade.toString().indexOf('白金') !== -1,
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
                  <i className={grade} />
                  <span className="custId">{filteredData.econNum}</span>
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
        <div className="detailHeaderSection">
          <div className="basic">
            <div className="headerLeft">
              <i className="orgCustIconSection"><Icon {...orgCust} /></i>
              <div className="nameSection">
                <span className="custName">机构客户</span>
                <div className="gradeIdSection">
                  <i className={grade} />
                  <span className="custId">{filteredData.econNum}</span>
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
