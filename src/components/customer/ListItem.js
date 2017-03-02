import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import './listItem.less';

class ListItem extends React.Component {
  static propTypes = {
    cusId: PropTypes.string,
    custLevelCode: PropTypes.string,
    custLevelName: PropTypes.string,
    custName: PropTypes.string,
    brokerNumber: PropTypes.string,
    custTotalAsset: PropTypes.number,
    custType: PropTypes.string,
    custOpenDate: PropTypes.string,
    push: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cusId: '--',
    custLevelCode: '--',
    custLevelName: '--',
    custName: '--',
    brokerNumber: '--',
    custTotalAsset: 0,
    custType: 'per',
    custOpenDate: '--',
    push: () => {},
  }

  levelShow(lev) {
    switch (lev) {
      case '805010':
        return 'dia';
      case '805015':
        return 'whgold';
      case '805020':
        return 'gold';
      case '805025':
        return 'sil';
      case '805030':
        return 'fin';
      default:
        return 'emp';
    }
  }

  @autobind
  handleClick() {
    const { brokerNumber, custType, cusId: custId, push } = this.props;
    push(`customer/detail?custId=${custId}&custNumber=${brokerNumber}&custSor=${custType}`);
  }

  render() {
    const { custLevelCode, custName, brokerNumber, custOpenDate, custType } = this.props;
    return (
      <div className="listItem" onClick={this.handleClick}>
        <i className={custType} />
        <div className="listInfo">
          <div className="listName">{custName || '--'}</div>
          <div className="listElse">
            <i className={this.levelShow(custLevelCode)} />
            <div className="listNum">{brokerNumber || '--'}</div>
            <div className="listTime">开户时间:{custOpenDate}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;
