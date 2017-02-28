import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import './filter.less';

class Filter extends PureComponent {
  static propTypes = {
    onOpenChange: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired,
  };

  static defaultProps = {
    getList: () => {},
    location: {},
    replace: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      filter: {
        custType: '',
        time: '',
        from: '',
        to: '',
        riskLevel: '',
        accountStatus: '',
      },
    };
  }

  @autobind
  getClass() {
    return '';
  }

  @autobind
  handleCustTypeSel(val) {
    const prevFilter = this.state.filter;
    this.setState({
      filter: {
        ...prevFilter,
        custType: val,
      },
    });
  }

  @autobind
  handleTimeSel(val) {
    const prevFilter = this.state.filter;
    this.setState({
      filter: {
        ...prevFilter,
        time: val,
      },
    });
  }

  @autobind
  handleRiskSel(val) {
    const prevFilter = this.state.filter;
    this.setState({
      filter: {
        ...prevFilter,
        riskLevel: val,
      },
    });
  }

  @autobind
  handleStatusSel(val) {
    const prevFilter = this.state.filter;
    this.setState({
      filter: {
        ...prevFilter,
        accountStatus: val,
      },
    });
  }

  render() {
    return (
      <div className="filterWrapper">
        <h3>
          <div>客户类型</div>
          <p>全部<i className="{showAll}" /></p>
        </h3>
        <div className="filterBox">
          <div className="flexBox">
            <p
              className={() => this.getClass('custType', 'Y')}
              onClick={() => this.handleCustTypeSel('Y')}
            >
              零售客户
            </p>
            <p
              className={() => this.getClass('custType', 'N')}
              onClick={() => this.handleCustTypeSel('N')}
            >
              高净值客户
            </p>
          </div>
        </div>
        <h3>
          <div>开户时间</div>
          <p>全部<i className="{showAll}" /></p>
        </h3>
        <div className="filterBox">
          <div className="flexBox">
            <p
              className={() => this.getClass('time', 'M')}
              onClick={() => this.handleTimeSel('M')}
            >
              1个月以内
            </p>
            <p
              className={() => this.getClass('time', 'HY')}
              onClick={() => this.handleTimeSel('HY')}
            >
              1-6个月
            </p>
            <p
              className={() => this.getClass('time', 'TY')}
              onClick={() => this.handleTimeSel('TY')}
            >
              6个月-2年
            </p>
          </div>
          <div className="flexHideBox">
            <p
              className={() => this.getClass('time', 'BTY')}
              onClick={() => this.handleTimeSel('BTY')}
            >
              2年以上
            </p>
          </div>
        </div>
        <h3>
          <div>风险等级</div>
          <p>全部<i className="{showAll}" /></p>
        </h3>
        <div className="filterBox">
          <div className="flexBox">
            <p
              className={() => this.getClass('riskLevel', '704010')}
              onClick={() => this.handleRiskSel('704010')}
            >
              积极型
            </p>
            <p
              className={() => this.getClass('riskLevel', '704015')}
              onClick={() => this.handleRiskSel('704015')}
            >
              相对积极型
            </p>
            <p
              className={() => this.getClass('riskLevel', '704020')}
              onClick={() => this.handleRiskSel('704020')}
            >
              稳健型
            </p>
          </div>
          <div className="flexHideBox">
            <p
              className={() => this.getClass('riskLevel', '704025')}
              onClick={() => this.handleRiskSel('704025')}
            >
              相对保守型
            </p>
            <p
              className={() => this.getClass('riskLevel', '704030')}
              onClick={() => this.handleRiskSel('704030')}
            >
              保守型
            </p>
          </div>
        </div>
        <h3>
          <div>账户状态</div>
          <p>全部<i className="{showAll}" /></p>
        </h3>
        <div className="filterBox">
          <div className="flexBox">
            <p
              className={() => this.getClass('accountStatus', '118010')}
              onClick={() => this.handleStatusSel('118010')}
            >
              正常
            </p>
            <p
              className={() => this.getClass('accountStatus', '118040')}
              onClick={() => this.handleStatusSel('118040')}
            >
              销户
            </p>
            <p
              className={() => this.getClass('accountStatus', '118020')}
              onClick={() => this.handleStatusSel('118020')}
            >
              冻结
            </p>
          </div>
          <div className="flexHideBox">
            <p
              className={() => this.getClass('accountStatus', '118050')}
              onClick={() => this.handleStatusSel('118050')}
            >
              休眠已确认
            </p>
            <p
              className={() => this.getClass('accountStatus', '118030')}
              onClick={() => this.handleStatusSel('118030')}
            >
              挂失
            </p>
            <p
              className={() => this.getClass('accountStatus', '118110,118120,118130,118140,118999')}
              onClick={() => this.handleStatusSel('118110,118120,118130,118140,118999')}
            >
              其他
            </p>
          </div>
        </div>
        <div className="filterBtn">
          <div className="filterReset">重置</div>
          <div className="filterSub">确定</div>
        </div>
      </div>
    );
  }
}

export default Filter;
