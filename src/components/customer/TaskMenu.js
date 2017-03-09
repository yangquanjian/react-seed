import React, { PropTypes, PureComponent } from 'react';
import { Flex } from 'antd-mobile';
// import _ from 'lodash';
import { autobind } from 'core-decorators';
import { sendEmail, processMotTask } from '../../utils/cordova';
import './taskMenu.less';

const Item = Flex.Item;

export default class TaskMenu extends PureComponent {
  static propTypes = {
    taskStatus: PropTypes.string.isRequired,
    title: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    custId: PropTypes.string.isRequired,
    custNumber: PropTypes.string.isRequired,
    custSor: PropTypes.string.isRequired,
  };

  static defaultProps = {
    taskStatus: '',
    title: {},
    push: () => { },
    custId: '',
    custNumber: '',
    custSor: '',
    location: {},
  };

  @autobind
  onLeftClick() {
    const { custId, custNumber, custSor } = this.props;
    // push(`/custBasic/${custNumber}/${custSor}/${custId}`);
    sendEmail({ cusId: custId, brokerNumber: custNumber, custType: custSor });
  }

  @autobind
  onRightClick() {
    const { custId, custNumber, custSor } = this.props;
    // push(`/custBasic/${custNumber}/${custSor}/${custId}`);
    processMotTask({ cusId: custId, brokerNumber: custNumber, custType: custSor });
  }

  render() {
    const { taskStatus, title: { leftContent, rightContent } } = this.props;
    if (taskStatus === 'false') {
      return null;
    }

    const EmailItem = () => (
      <div>{leftContent}</div>
    );
    const CompleteItem = () => (
      <div>{rightContent}</div>
    );

    return (
      <div className="TaskMenu">
        <div className="flex-container">
          <Flex direction="row" justify="start" align="center" wrap="nowrap">
            <Item onClick={this.onLeftClick}><EmailItem className="emailItem" /></Item>
            <Item onClick={this.onRightClick}><CompleteItem className="completeItem" /></Item>
          </Flex>
        </div>
      </div>
    );
  }
}
