import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { List } from 'antd-mobile';

const Item = List.Item;

export default class SearchItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    extra: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    extra: '',
    onClick: () => {},
  }

  @autobind
  handleClick() {
    const { onClick, id } = this.props;
    onClick(id);
  }

  render() {
    const { title, extra } = this.props;
    return (
      <Item
        extra={extra}
        arrow="horizontal"
        onClick={this.handleClick}
      >
        {title}
      </Item>
    );
  }
}
