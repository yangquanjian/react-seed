import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { List } from 'antd-mobile';
import Icon from '../common/Icon';

const Item = List.Item;
const Brief = Item.Brief;

export default class SearchItem extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    extra: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    extra: '',
    onClick: () => {},
  }

  @autobind
  handleClick() {
    const { onClick, data: { cusId } } = this.props;
    onClick(cusId);
  }
  @autobind
  renderCustomerIcon(type) {
    const iconType = type === 'per' ? 'kehu1' : 'jigou';
    return (
      <Icon type={iconType} />
    );
  }

  render() {
    const { data: { custName, custType }, extra } = this.props;
    return (
      <Item
        thumb={this.renderCustomerIcon(custType)}
        onClick={this.handleClick}
      >
        {custName}
        <Brief>{extra}</Brief>
      </Item>
    );
  }
}
