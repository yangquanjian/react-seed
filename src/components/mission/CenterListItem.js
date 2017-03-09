import React, { PropTypes } from 'react';
import { Progress } from 'antd-mobile';
import { autobind } from 'core-decorators';
import './CenterListItem.less';

class CenterListItem extends React.Component {
  static propTypes = {
    motTaskId: PropTypes.string,
    motTaskCreatedTime: PropTypes.string,
    motTaskName: PropTypes.string,
    motTaskExecuteType: PropTypes.string,
    motTaskExecuteTypeName: PropTypes.string,
    motTaskExpireTime: PropTypes.string,
    motTaskProcessingItems: PropTypes.number,
    motTaskTotalItems: PropTypes.number,
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
    motTaskTotalItems: 0,
    push: () => {},
  }

  @autobind
  getPercent() {
    const {
      motTaskProcessingItems = 0,
      motTaskTotalItems = 0,
    } = this.props;
    if ((motTaskTotalItems || 0) === 0) {
      return 0;
    }
    return parseInt(
      (motTaskTotalItems - motTaskProcessingItems) * 100 / motTaskTotalItems, // eslint-disable-line
      10,
    );
  }

  @autobind
  handleClick() {

  }

  render() {
    const {
      motTaskName,
      motTaskExecuteTypeName,
      motTaskExpireTime,
      motTaskProcessingItems,
      motTaskTotalItems,
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
            <Progress percent={this.getPercent()} position="normal" appearTransition />
          </div>
          <p>
            已完成
            {(motTaskTotalItems || 0) - (motTaskProcessingItems || 0)}/{motTaskTotalItems || 0}
          </p>
        </div>
      </div>
    );
  }
}

export default CenterListItem;
