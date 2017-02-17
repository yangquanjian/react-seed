/**
 * @file customer/Chart.js
 *
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';

import Chart from '../chart';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class ChartWidget extends PureComponent {

  static propTypes = {
    chartData: ImmutablePropTypes.list,
  }

  static defaultProps = {
    chartData: undefined
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { chartData } = nextProps;
    if (chartData !== this.props.chartData) {
      this.setState({
        isLoading: false,
        dataSource: chartData
      });
    }
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }

    const options = {
      title: {
        text: '近6个月销售业绩',
      },
      tooltip: {},
      legend: {
        data: ['业绩'],
      },
      xAxis: {
        // x轴时间维度
        data: dataSource.map(item => item.date),
      },
      yAxis: {},
    };
    const series = {
      name: '销量',
      type: 'line',
      data: dataSource.map(item => item.money),
    };
    return (
      <div>
        <Chart {...options} >
          <Chart.Line {...series} />
        </Chart>
      </div>
    );
  }
}
