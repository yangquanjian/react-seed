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
        openDateStart: '',
        openDateEnd: '',
        riskLevel: [],
        accountStatus: [],
      },
      showAll: {
        timeAll: false,
        riskAll: false,
        statusAll: false,
      },
    };
  }

  @autobind
  getClass(key, val) {
    const { filter } = this.state;
    if (typeof filter[key] === 'string') {
      if (filter[key] === val) {
        return 'filtSel';
      }
    } else if (filter[key].find(str => str === val)) {
      return 'filtSel';
    }
    return '';
  }

  @autobind
  getShowAll(key, type) {
    const { showAll } = this.state;
    if (showAll[key]) {
      if (type === 'icon') {
        return 'showAll';
      }
      return 'flexBox';
    } else if (type === 'icon') {
      return '';
    }
    return 'flexHideBox';
  }

  @autobind
  handleShowAll(key) {
    const prevShow = this.state.showAll;
    const nextShow = prevShow;
    nextShow[key] = !prevShow[key];
    this.setState({
      showAll: {
        ...nextShow,
      },
    });
  }

  @autobind
  handleStatusSel(val) {
    const prevFilter = this.state.filter;
    const { accountStatus: status } = prevFilter;
    if (status.find(str => str === val)) {
      status.splice(status.findIndex(str => str === val));
    } else {
      status.push(val);
    }
    this.setState({
      filter: {
        ...prevFilter,
        accountStatus: status,
      },
    });
  }

  @autobind
  handleRiskSel(val) {
    const prevFilter = this.state.filter;
    const { riskLevel: riskLev } = prevFilter;
    if (riskLev.find(str => str === val)) {
      riskLev.splice(riskLev.findIndex(str => str === val), 1);
    } else {
      riskLev.push(val);
    }
    this.setState({
      filter: {
        ...prevFilter,
        riskLevel: riskLev,
      },
    });
  }

  @autobind
  handleTimeSel(val) {
    const prevFilter = this.state.filter;
    const { time } = prevFilter;
    if (time !== '') {
      this.setState({
        filter: {
          ...prevFilter,
          time: '',
        },
      });
    } else {
      this.setState({
        filter: {
          ...prevFilter,
          time: val,
        },
      });
    }
  }

  @autobind
  handleCustTypeSel(val) {
    const prevFilter = this.state.filter;
    const { custType } = prevFilter;
    if (custType !== '') {
      this.setState({
        filter: {
          ...prevFilter,
          custType: '',
        },
      });
    } else {
      this.setState({
        filter: {
          ...prevFilter,
          custType: val,
        },
      });
    }
  }

  @autobind
  filterSub() {
    const { replace, location: { query } } = this.props;
    this.handleTime(() => {
      replace({
        pathname: '/customer',
        query: {
          ...query,
          custType: this.state.filter.custType,
          openDateStart: this.state.filter.openDateStart,
          openDateEnd: this.state.filter.openDateEnd,
          riskLevel: this.state.filter.riskLevel.length !== 0 ?
            this.state.filter.riskLevel.reduce(
              (preValue, curValue) => `${preValue},${curValue}`,
            ) : '',
          accountStatus: this.state.filter.accountStatus.length !== 0 ?
            this.state.filter.accountStatus.reduce(
              (preValue, curValue) => `${preValue},${curValue}`,
            ) : '',
        },
      });
    });
    this.props.onOpenChange();
  }

  @autobind
  handleTime(callback) {
    // M HY TY BTY
    const { filter: { time } } = this.state;
    const nowTime = new Date();
    let toTime = '';
    let fromTime = '';
    const month = 1000 * 60 * 60 * 24 * 30;
    switch (time) {
      case 'M':
        toTime = Date.parse(nowTime);
        fromTime = toTime - month;
        break;
      case 'HY':
        toTime = Date.parse(nowTime) - month;
        fromTime = toTime - (month * 5);
        break;
      case 'TY':
        toTime = Date.parse(nowTime) - (month * 6);
        fromTime = toTime - (month * 18);
        break;
      case 'BTY':
        toTime = Date.parse(nowTime) - (month * 24);
        fromTime = '';
        break;
      default:
        toTime = '';
        fromTime = '';
        break;
    }
    const prevFilter = this.state.filter;
    this.setState({
      filter: {
        ...prevFilter,
        openDateStart: fromTime,
        openDateEnd: toTime,
      },
    }, callback);
  }

  @autobind
  filterReset() {
    this.setState({
      filter: {
        custType: '',
        time: '',
        openDateStart: '',
        openDateEnd: '',
        riskLevel: [],
        accountStatus: [],
      },
    });
  }

  render() {
    return (
      <div className="filterWrapper">
        <div className="filterScroll">
          <h3>
            <div>客户类型</div>
          </h3>
          <div className="filterBox">
            <div className="flexBox">
              <p
                className={this.getClass('custType', 'Y')}
                onClick={() => this.handleCustTypeSel('Y')}
              >
                零售客户
              </p>
              <p
                className={this.getClass('custType', 'N')}
                onClick={() => this.handleCustTypeSel('N')}
              >
                高净值客户
              </p>
            </div>
          </div>
          <h3>
            <div>开户时间</div>
            <p onClick={() => this.handleShowAll('timeAll')}>
              全部<i className={this.getShowAll('timeAll', 'icon')} />
            </p>
          </h3>
          <div className="filterBox">
            <div className="flexBox">
              <p
                className={this.getClass('time', 'M')}
                onClick={() => this.handleTimeSel('M')}
              >
                1个月以内
              </p>
              <p
                className={this.getClass('time', 'HY')}
                onClick={() => this.handleTimeSel('HY')}
              >
                1-6个月
              </p>
              <p
                className={this.getClass('time', 'TY')}
                onClick={() => this.handleTimeSel('TY')}
              >
                6个月-2年
              </p>
            </div>
            <div className={this.getShowAll('timeAll', 'box')}>
              <p
                className={this.getClass('time', 'BTY')}
                onClick={() => this.handleTimeSel('BTY')}
              >
                2年以上
              </p>
            </div>
          </div>
          <h3>
            <div>风险等级</div>
            <p onClick={() => this.handleShowAll('riskAll')}>
              全部<i className={this.getShowAll('riskAll', 'icon')} />
            </p>
          </h3>
          <div className="filterBox">
            <div className="flexBox">
              <p
                className={this.getClass('riskLevel', '704010')}
                onClick={() => this.handleRiskSel('704010')}
              >
                积极型
              </p>
              <p
                className={this.getClass('riskLevel', '704015')}
                onClick={() => this.handleRiskSel('704015')}
              >
                相对积极型
              </p>
              <p
                className={this.getClass('riskLevel', '704020')}
                onClick={() => this.handleRiskSel('704020')}
              >
                稳健型
              </p>
            </div>
            <div className={this.getShowAll('riskAll', 'box')}>
              <p
                className={this.getClass('riskLevel', '704025')}
                onClick={() => this.handleRiskSel('704025')}
              >
                相对保守型
              </p>
              <p
                className={this.getClass('riskLevel', '704030')}
                onClick={() => this.handleRiskSel('704030')}
              >
                保守型
              </p>
            </div>
          </div>
          <h3>
            <div>账户状态</div>
            <p onClick={() => this.handleShowAll('statusAll')}>
              全部<i className={this.getShowAll('statusAll', 'icon')} />
            </p>
          </h3>
          <div className="filterBox">
            <div className="flexBox">
              <p
                className={this.getClass('accountStatus', '118010')}
                onClick={() => this.handleStatusSel('118010')}
              >
                正常
              </p>
              <p
                className={this.getClass('accountStatus', '118040')}
                onClick={() => this.handleStatusSel('118040')}
              >
                销户
              </p>
              <p
                className={this.getClass('accountStatus', '118020')}
                onClick={() => this.handleStatusSel('118020')}
              >
                冻结
              </p>
            </div>
            <div className={this.getShowAll('statusAll', 'box')}>
              <p
                className={this.getClass('accountStatus', '118050')}
                onClick={() => this.handleStatusSel('118050')}
              >
                休眠已确认
              </p>
              <p
                className={this.getClass('accountStatus', '118030')}
                onClick={() => this.handleStatusSel('118030')}
              >
                挂失
              </p>
              <p
                className={this.getClass('accountStatus', '118110,118120,118130,118140,118999')}
                onClick={() => this.handleStatusSel('118110,118120,118130,118140,118999')}
              >
                其他
              </p>
            </div>
          </div>
        </div>
        <div className="filterBtn">
          <div className="filterReset" onClick={this.filterReset}>重置</div>
          <div className="filterSub" onClick={this.filterSub}>确定</div>
        </div>
      </div>
    );
  }
}

export default Filter;
