import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';

class ListItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
  }

  @autobind
  handleClick(e) {
    const { onClick, id } = this.props;
    onClick(e, id);
  }

  render() {
    const { img, title, des } = this.props;
    return (
      <div
        className="list-item"
        onClick={this.handleClick}
      >
        <h3>{title}</h3>
        <div className="list-item-main">
          <img src={img} alt={title} />
          <div className="list-item-content">
            <p>{des}</p>
            <p><em>1</em>元/任务</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;
