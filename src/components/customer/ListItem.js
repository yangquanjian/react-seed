import React, { PropTypes } from 'react';

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
        <div>{lev}</div>
        <div>{name}</div>
        <div>{cusNo}</div>
        <div>{fund}</div>
      </div>
    );
  }
}

export default ListItem;
