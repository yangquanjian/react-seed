/**
 * @file customer/Chart.js
 *
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import Chart from '../chart';
import AccountFilter from './AccountFilter';
import './ChartLine.less';

export default class ChartLineWidget extends PureComponent {

  static propTypes = {
    chartData: PropTypes.array,
  }

  static defaultProps = {
    chartData: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillReceiveProps() {
  }

  @autobind
  rateFilter(val) {
    let value = val;
    if (value && value !== undefined) {
      if (value >= 0) {
        value = `+${parseFloat(value).toFixed(2)}%`;
      } else {
        value = `${parseFloat(value).toFixed(2)}%`;
      }
      return value;
    } else if (value === 0) {
      return '0.00%';
    }
    return '--';
  }

  @autobind
  profitFilter(val) {
    let value = val;
    if (value && value !== undefined) {
      value = parseFloat(value).toFixed(2);
      let result = '';
      let counter = 0;
      value = (value || 0).toString();
      const numList = value.split('.');
      const intPart = numList[0].toString();
      for (let i = intPart.length - 1; i >= 0; i--) {
        counter++;
        result = intPart.charAt(i) + result;
        if (!(counter % 3) && i !== 0) { result = `,${result}`; }
      }
      result = result.replace('-,', '-');
      if (numList[1]) {
        if (value >= 0) {
          value = `+${result}.${numList[1]}`;
        } else {
          value = `${result}.${numList[1]}`;
        }
      } else {
        value = `${result}.00`;
      }
      return value;
    } else if (value === 0) {
      return '0.00';
    }
    return '--';
  }

  render() {
    const { chartData } = this.props;
    if (!chartData) {
      return null;
    }

    let minAssetProfit = 0;
    let maxAssetProfit = 0;
    let minAssetProfitRate = 0;
    let maxAssetProfitRate = 0;
    let averageAssetProfit = 0;
    let averageAssetProfitRate = 0;

    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i].assetProfit < minAssetProfit) {
        minAssetProfit = Number.parseFloat(chartData[i].assetProfit, 10).toFixed(2);
      }
      if (chartData[i].assetProfit > maxAssetProfit) {
        maxAssetProfit = Number.parseFloat(chartData[i].assetProfit, 10).toFixed(2);
      }
      if (chartData[i].assetProfitRate < minAssetProfitRate) {
        minAssetProfitRate = Number.parseFloat(chartData[i].assetProfitRate, 10).toFixed(2);
      }
      if (chartData[i].assetProfitRate > maxAssetProfitRate) {
        maxAssetProfitRate = Number.parseFloat(chartData[i].assetProfitRate, 10).toFixed(2);
      }
    }

    averageAssetProfit = ((Number.parseFloat(minAssetProfit, 10) +
      Number.parseFloat(maxAssetProfit, 10)) / 2).toFixed(2);

    averageAssetProfitRate = ((Number.parseFloat(minAssetProfitRate, 10) +
      Number.parseFloat(maxAssetProfitRate, 10)) / 2).toFixed(2);

    minAssetProfitRate = this.rateFilter(minAssetProfitRate);
    maxAssetProfitRate = this.rateFilter(maxAssetProfitRate);
    averageAssetProfitRate = this.rateFilter(averageAssetProfitRate);

    minAssetProfit = AccountFilter(minAssetProfit);
    maxAssetProfit = AccountFilter(maxAssetProfit);
    averageAssetProfit = AccountFilter(averageAssetProfit);

    const options = {
      title: {
        text: '近6个月收益图',
      },
      xAxis: {
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#efefef'],
          },
        },
        data: chartData.map((item) => {
          if (Number.parseInt(item.month.slice(4, 6), 10) >= 10) {
            return `${item.month.slice(4, 6)}月`;
          }
          return `${item.month.slice(5, 6)}月`;
        }),
        boundaryGap: false,
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#f8cc6d',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#999',
          },
        },
      },
      grid: {
        show: true,
      },
      yAxis: {
        show: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#efefef'],
          },
        },
        boundaryGap: false,
      },
      height: 300,
    };

    const series = {
      name: '收益',
      type: 'line',
      data: chartData.map((item) => {
        if (item.assetProfit < 0) {
          return 0;
        }
        return item.assetProfit;
      }),
      areaStyle: {
        normal: {
          color: '#ef9e49',
          opacity: '0.1',
        },
      },
      smooth: true,
      lineStyle: {
        normal: {
          color: '#f8cc6d',
        },
      },
      itemStyle: {
        normal: {
          opacity: 0,
        },
      },
    };

    const assetProfitRate = this.rateFilter(chartData[chartData.length - 1].assetProfitRate);
    const assetProfit = this.profitFilter(chartData[chartData.length - 1].assetProfit);

    const assetProfitValue = classnames({
      monthNum: true,
      loss: assetProfit < 0,
    });
    const assetProfitPercent = classnames({
      monthPercent: true,
      loss: assetProfitRate < 0,
    });

    return (
      <div className="chart-line-section">
        <div className="infoNum">
          <div className={assetProfitPercent}>
            <div className="number">{assetProfitRate}</div>
            <div className="label">本月收益率</div>
          </div>
          <div className={assetProfitValue}>
            <div className="number">{assetProfit}</div>
            <div className="label">本月收益（元）</div>
          </div>
        </div>
        <div className="label-section">
          <div className="left-section">
            <div>{maxAssetProfit}</div>
            <div>{averageAssetProfit}</div>
            <div>{minAssetProfit}</div>
          </div>
          <div className="right-section">
            <div>{maxAssetProfitRate}</div>
            <div>{averageAssetProfitRate}</div>
            <div>{minAssetProfitRate}</div>
          </div>
        </div>
        <Chart {...options} className="chart-content">
          <Chart.Line {...series} className="chart-line" />
        </Chart>
      </div>
    );
  }
}
