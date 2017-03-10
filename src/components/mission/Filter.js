import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import './filter.less';

class Filter extends PureComponent {
  static propTypes = {
    onOpenChange: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired,
  };

  static defaultProps = {
    getCenter: () => {},
    location: {},
    replace: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      filter: {
        motTaskExecuteType: [],
      },
    };
  }

  componentWillMount() {
    const { motTaskExecuteType = '' } = this.props.location.query;
    this.setState({
      filter: {
        motTaskExecuteType: motTaskExecuteType.split(','),
      },
    });
  }

  @autobind
  getClass(key, val) {
    const { filter } = this.state;
    if (typeof filter[key] === 'string') {
      if (filter[key] === val) {
        return 'filtSel';
      }
    } else if (filter[key] instanceof Array) {
      if (_.find(filter[key], str => str === val)) {
        return 'filtSel';
      }
    }
    return '';
  }

  @autobind
  handleExecuteTypeSel(val) {
    const prevFilter = this.state.filter;
    const { motTaskExecuteType: executeType } = prevFilter;
    if (_.find(executeType, str => str === val)) {
      executeType.splice(_.findIndex(executeType, str => str === val), 1);
    } else {
      executeType.push(val);
    }
    this.setState({
      filter: {
        ...prevFilter,
        motTaskExecuteType: executeType,
      },
    });
  }

  @autobind
  filterSub() {
    const { replace, location: { query } } = this.props;
    replace({
      pathname: '/mission',
      query: {
        ...query,
        motTaskExecuteType: this.state.filter.motTaskExecuteType.length !== 0 ?
          this.state.filter.motTaskExecuteType.reduce(
            (preValue, curValue) => `${preValue},${curValue}`,
          ) : '',
      },
    });
    this.props.onOpenChange();
  }

  @autobind
  filterReset() {
    this.setState({
      filter: {
        motTaskExecuteType: [],
      },
    });
  }

  render() {
    return (
      <div className="filterWrapper">
        <div className="filterScroll">
          <h3>
            <div>任务种类</div>
          </h3>
          <div className="filterBox">
            <div className="flexBox">
              <p className="filtSel">
                MOT任务
              </p>
            </div>
          </div>
          <h3>
            <div>执行类型</div>
          </h3>
          <div className="filterBox">
            <div className="flexBox">
              <p
                className={this.getClass('motTaskExecuteType', 'Mission')}
                onClick={() => this.handleExecuteTypeSel('Mission')}
              >
                必做
              </p>
              <p
                className={this.getClass('motTaskExecuteType', 'Chance')}
                onClick={() => this.handleExecuteTypeSel('Chance')}
              >
                选做
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
