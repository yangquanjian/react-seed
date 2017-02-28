import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import Icon from '../common/Icon';

class ServiceItem extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
  }

  @autobind
  handleClick() {
    const obj = this.props;
    console.log(obj.type);
  }

  render() {
    const data = this.props;
    return (
      <div
        className="list-item"
        onClick={this.handleClick}
      >
        <div className="list-item-head">
          <span>{data.category}-{data.type}</span>
          <Icon className="" type="shenfenzheng" />
        </div>
        <div className="list-item-main">
          <span>{data.startTime}~{data.endTime}</span>
          <span>{data.actionChannel}</span>
          <span>{data.status}</span>
        </div>
      </div>
    );
  }
}

export default ServiceItem;
