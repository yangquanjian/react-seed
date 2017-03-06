import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import _ from 'lodash';
import Chart from '../chart';
import './ChartPie.less';

export default class ChartPieWidget extends PureComponent {
  static propTypes = {
    assetData: PropTypes.array,
  }

  static defaultProps = {
    assetData: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isShowPieData: false,
    };
  }

  @autobind
  filterData(assetData) {
    if (assetData.indexOf('万') !== -1) {
      return Number.parseFloat(assetData.replace('万元', '')) * 10000;
    } else if (assetData.indexOf('亿') !== -1) {
      return Number.parseFloat(assetData.replace('亿元', '')) * 100000000;
    }
    return Number.parseFloat(assetData.replace('元', ''));
  }

  render() {
    const { assetData } = this.props;
    // if (!assetData) {
    //   return null;
    // }

    if (_.isEmpty(assetData)) {
      const nonePieOptions = {
        title: {
          text: '暂无数据',
          x: 'center',
          y: 'center',
        },
        height: '4.8rem',
        width: '4rem',
      };

      const nonePieSeries = {
        name: '资产构成',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['50%', '50%'],
        label: {
          normal: {
            show: false,
          },
        },
        hoverAnimation: false,
        data: [
          {
            name: '暂无数据',
            value: 100,
          },
        ],
        color: ['#e6e5e5'],
      };

      const nonePieDataClass = classnames({
        chartPieNoneSection: true,
        displayBlock: true,
        displayNone: false,
      });

      const nonePieArray = [];
      nonePieArray.push(
        <div key="noneData" className={nonePieDataClass}>
          <Chart {...nonePieOptions} className="chart-content">
            <Chart.Pie {...nonePieSeries} className="chart-pie" />
          </Chart>
          <div className="none-pie-data">暂无数据</div>
        </div>,
      );

      return (
        <div>
          {
            nonePieArray
          }
        </div>
      );
    }

    const len = assetData.length;

    const showData = [];
    for (let i = 0; i < len; i++) {
      if (assetData[i].maketVal.toString().indexOf('.') !== -1) {
        // 小数
        const temp = assetData[i].maketVal.toString().split('.');
        if (temp[0].length >= 1 && temp[0].length <= 3) {
          showData.push(
            {
              categoryName: assetData[i].categoryName,
              maketVal: `${Number.parseFloat(assetData[i].maketVal).toFixed(1)}元`,
              categoryId: assetData[i].categoryId,
              holdRate: Number.parseFloat(assetData[i].holdRate),
            });
        } else if (temp[0].length > 3 && temp[0].length < 9) {
          showData.push(
            {
              categoryName: assetData[i].categoryName,
              maketVal: `${(Number.parseFloat(temp[0]) / 10000).toFixed(1)}万元`,
              categoryId: assetData[i].categoryId,
              holdRate: Number.parseFloat(assetData[i].holdRate),
            });
        } else if (temp[0].length > 8) {
          showData.push({
            categoryName: assetData[i].categoryName,
            maketVal: `${(Number.parseFloat(temp[0]) / 100000000).toFixed(1)}亿元`,
            categoryId: assetData[i].categoryId,
            holdRate: Number.parseFloat(assetData[i].holdRate),
          });
        }
      } else if (assetData[i].maketVal.toString().length >= 0
        && assetData[i].maketVal.toString().length <= 3) {
        showData.push({
          categoryName: assetData[i].categoryName,
          maketVal: `${assetData[i].maketVal.toFixed(1)}元`,
          categoryId: assetData[i].categoryId,
          holdRate: Number.parseFloat(assetData[i].holdRate),
        });
      } else if (assetData[i].maketVal.toString().length > 3
        && assetData[i].maketVal.toString().length < 9) {
        showData.push({
          categoryName: assetData[i].categoryName,
          maketVal: `${(assetData[i].maketVal / 10000).toFixed(1)}万元`,
          categoryId: assetData[i].categoryId,
          holdRate: Number.parseFloat(assetData[i].holdRate),
        });
      } else if (assetData[i].maketVal.toString().length >= 9) {
        showData.push({
          categoryName: assetData[i].categoryName,
          maketVal: `${(assetData[i].maketVal / 100000000).toFixed(1)}亿元`,
          categoryId: assetData[i].categoryId,
          holdRate: Number.parseFloat(assetData[i].holdRate),
        });
      }
    }

    let assetTotal = 0;
    const dataExceptFuzhaiArray = [];
    // 总资产
    for (let i = 0; i < len; i++) {
      if (showData[i].categoryName.toString().indexOf('负债') === -1) {
        assetTotal = this.filterData(showData[i].maketVal) + assetTotal;
        dataExceptFuzhaiArray.push({
          categoryName: showData[i].categoryName,
          maketVal: showData[i].maketVal,
          holdRate: showData[i].holdRate,
        });
      }
    }

    // 资产百分比
    const percentArray = [];
    const expectFuzhaiLen = dataExceptFuzhaiArray.length;
    for (let i = 0; i < expectFuzhaiLen; i++) {
      percentArray.push(`${(dataExceptFuzhaiArray[i].holdRate * 100).toFixed(1)}%`);
    }

    const pieData = [];
    for (let i = 0; i < expectFuzhaiLen; i++) {
      pieData.push({
        name: dataExceptFuzhaiArray[i].categoryName,
        value: this.filterData(dataExceptFuzhaiArray[i].maketVal),
      });
    }

    const fuzhaiData = _.find(showData, item => (
      item.categoryName.toString().indexOf('负债') !== -1
    ));

    const options = {
      title: {
        text: '资产',
      },
      width: '4rem',
      height: '4.8rem',
    };

    const finalArrData = [];
    const colorArray = [];
    for (let i = 0; i < expectFuzhaiLen; i++) {
      if (showData[i].categoryName.toString().indexOf('现金') !== -1) {
        colorArray.push('#ec8d85');
        finalArrData.push(<div key={showData[i].categoryId} className="xianjin">
          <span className="xianjinCircle" />
          <span className="assetName">{showData[i].categoryName}</span>
          <span className="assetValue">{showData[i].maketVal}</span>
          <span className="xianjinPercent">{percentArray[i]}</span>
        </div>);
      } else if (showData[i].categoryName.toString().indexOf('股票') !== -1) {
        colorArray.push('#da4e40');
        finalArrData.push(<div key={showData[i].categoryId} className="gupiao">
          <span className="gupiaoCircle" />
          <span className="assetName">{showData[i].categoryName}</span>
          <span className="assetValue">{showData[i].maketVal}</span>
          <span className="gupiaoPercent">{percentArray[i]}</span>
        </div>);
      } else if (showData[i].categoryName.toString().indexOf('理财') !== -1) {
        colorArray.push('#f0b14a');
        finalArrData.push(<div key={showData[i].categoryId} className="licai">
          <span className="licaiCircle" />
          <span className="assetName">{showData[i].categoryName}</span>
          <span className="assetValue">{showData[i].maketVal}</span>
          <span className="licaiPercent">{percentArray[i]}</span>
        </div>);
      } else if (showData[i].categoryName.toString().indexOf('基金') !== -1) {
        colorArray.push('#a4adec');
        finalArrData.push(<div key={showData[i].categoryId} className="jijin">
          <span className="jijinCircle" />
          <span className="assetName">{showData[i].categoryName}</span>
          <span className="assetValue">{showData[i].maketVal}</span>
          <span className="jijinPercent">{percentArray[i]}</span>
        </div>);
      } else if (showData[i].categoryName.toString().indexOf('债券') !== -1) {
        colorArray.push('#7fabe9');
        finalArrData.push(<div key={showData[i].categoryId} className="zhaiquan">
          <span className="zhaiquanCircle" />
          <span className="assetName">{showData[i].categoryName}</span>
          <span className="assetValue">{showData[i].maketVal}</span>
          <span className="zhaiquanPercent">{percentArray[i]}</span>
        </div>);
      } else if (showData[i].categoryName.toString().indexOf('衍生品') !== -1) {
        colorArray.push('#f3d781');
        finalArrData.push(<div key={showData[i].categoryId} className="yanshengpin">
          <span className="yanshengpinCircle" />
          <span className="assetName">{showData[i].categoryName}</span>
          <span className="assetValue">{showData[i].maketVal}</span>
          <span className="yanshengpinPercent">{percentArray[i]}</span>
        </div>);
      }
    }

    const series = {
      name: '资产构成',
      type: 'pie',
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      label: {
        normal: {
          show: false,
        },
      },
      hoverAnimation: false,
      data: pieData,
      color: colorArray,
      silent: true, // 不响应鼠标事件
    };

    const fuzhaiHtmlArray = [];
    if (!_.isEmpty(fuzhaiData) && fuzhaiData.maketVal !== 0) {
      fuzhaiHtmlArray.push(<div key="fuzhai" className="fuzhai">
        <span className="fuzhaiLabel">负债</span>
        <span className="fuzhaiContent">{`-${fuzhaiData.maketVal}`}</span>
      </div>);
    }

    if (len === 0 || (len === 1 && assetData[0].categoryName.toString().indexOf('负债') !== -1) || assetTotal <= 0) {
      this.state.isShowPieData = false;
    } else {
      this.state.isShowPieData = true;
    }

    let hasPieDataClass = {};
    let nonePieDataClass = {};
    if (this.state.isShowPieData === true) {
      hasPieDataClass = classnames({
        chartPieSection: true,
        displayBlock: true,
        displayNone: false,
      });
      nonePieDataClass = classnames({
        displayNone: true,
      });
    } else {
      nonePieDataClass = classnames({
        chartPieNoneSection: true,
        displayBlock: true,
        displayNone: false,
      });
      hasPieDataClass = classnames({
        displayNone: true,
      });
    }

    const nonePieOptions = {
      title: {
        text: '暂无数据',
        x: 'center',
        y: 'center',
      },
      height: '4.8rem',
      width: '4rem',
    };

    const nonePieSeries = {
      name: '资产构成',
      type: 'pie',
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      label: {
        normal: {
          show: false,
        },
      },
      hoverAnimation: false,
      data: [
        {
          name: '暂无数据',
          value: 100,
        },
      ],
      color: ['#e6e5e5'],
    };

    const nonePieArray = [];
    nonePieArray.push(
      <div key="noneData" className={nonePieDataClass}>
        <Chart {...nonePieOptions} className="chart-content">
          <Chart.Pie {...nonePieSeries} className="chart-pie" />
        </Chart>
        <div className="none-pie-data">暂无数据</div>
      </div>,
    );

    const hasDataPieArray = [];
    hasDataPieArray.push(
      <div key="hasData" className={hasPieDataClass}>
        <Chart {...options} className="chart-content">
          <Chart.Pie {...series} className="chart-pie" />
        </Chart>
        {
          fuzhaiHtmlArray
        }
        <div className="assetDescription">
          {
            finalArrData
          }
        </div>
      </div>,
    );

    return (
      <div>
        {hasDataPieArray}
        {nonePieArray}
      </div>
    );
  }
}
