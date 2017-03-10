import React, { PropTypes } from 'react';
import { Progress } from 'antd-mobile';
import { autobind } from 'core-decorators';
import './centerListItem.less';

class CenterListItem extends React.Component {
  static propTypes = {
    motTaskId: PropTypes.string,
    motTaskCreatedTime: PropTypes.string,
    motTaskName: PropTypes.string,
    motTaskExecuteType: PropTypes.string,
    motTaskExecuteTypeName: PropTypes.string,
    motTaskExpireTime: PropTypes.string,
    motTaskProcessingItems: PropTypes.number,
    totalCusts: PropTypes.number,
    motTaskAccRate: PropTypes.number,
    processedCusts: PropTypes.number,
    push: PropTypes.func.isRequired,
  };

  static defaultProps = {
    motTaskId: '--',
    motTaskCreatedTime: '--',
    motTaskName: '--',
    motTaskExecuteType: '--',
    motTaskExecuteTypeName: '--',
    motTaskExpireTime: '--',
    motTaskProcessingItems: 0,
    totalCusts: 0,
    motTaskAccRate: 0,
    processedCusts: 0,
    push: () => {},
  }

  @autobind
  handleClick() {
    const { motTaskName, motTaskId, push } = this.props;
    push(`/mission/taskDetail?motTaskName=${motTaskName}&motTaskId=${motTaskId}`);
  }

  render() {
    const {
      motTaskName,
      motTaskExecuteTypeName,
      motTaskExpireTime,
      processedCusts,
      motTaskAccRate,
      totalCusts,
    } = this.props;
    return (
      <div className="centerListItem" onClick={this.handleClick}>
        <div className="listTitle">
          <p>{motTaskName}</p>
          <span>{motTaskExecuteTypeName}</span>
        </div>
        <div className="listTime">完成时间{motTaskExpireTime}</div>
        <div className="listProgress">
          <div className="progress">
            <Progress percent={motTaskAccRate || 0} position="normal" appearTransition />
          </div>
          <p>
            已完成
            {processedCusts || 0}/{totalCusts || 0}
          </p>
        </div>
      </div>
    );
  }
}

export default CenterListItem;
