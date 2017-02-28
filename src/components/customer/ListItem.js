import React, { PropTypes } from 'react';
import { Link } from 'dva/router';

class ListItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    lev: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cusNo: PropTypes.string.isRequired,
    fund: PropTypes.string.isRequired,
  };

  static defaultProps = {
    id: '--',
    lev: '--',
    name: '--',
    cusNo: '--',
    fund: '--',
  }

  render() {
    const { lev, name, cusNo, fund } = this.props;
    return (
      <div
        className="list-item"
      >
        <Link to="/customer/detail?deviceId=3400b9a4-6f77-33a9-9e2d-df785c3dca7a&empId=002475&token=YSZ928GSSCIPKPBRZGDFOWVJOFCS1RTV&custId=1-DU-5288&custNumber=02007829&custSor=per">客户详情</Link>
        <div>{lev}</div>
        <div>{name}</div>
        <div>{cusNo}</div>
        <div>{fund}</div>
      </div>
    );
  }
}

export default ListItem;
