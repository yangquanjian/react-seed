/**
 * @file customer/Chart.js
 *
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';

import Chart from '../chart';

export default class CustomerForm extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
  }

  static defaultProps = {
    // 这里仅做示例，data应由父组件传入
    data: [
      {
        date: '2016-06',
        money: '1200',
      },
      {
        date: '2016-07',
        money: '1600',
      },
      {
        date: '2016-08',
        money: '700',
      },
      {
        date: '2016-09',
        money: '2900',
      },
      {
        date: '2016-10',
        money: '1800',
      },
    ],
  }

  render() {
    const { data } = this.props;

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
        data: data.map(item => item.date),
      },
      yAxis: {},
    };
    const series = {
      name: '销量',
      type: 'line',
      data: data.map(item => item.money),
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
