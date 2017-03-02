import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { List } from 'antd-mobile';
import Icon from '../common/Icon';

const Item = List.Item;
const Brief = Item.Brief;

export default class SearchItem extends PureComponent {
  static propTypes = {
    query: PropTypes.string,
    data: PropTypes.object.isRequired,
    extra: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    query: '',
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
    const iconType = type === 'per' ? 'kehu01' : 'juxing23';
    return (
      <Icon type={iconType} />
    );
  }
  render() {
    const { data: { custName, custType }, extra, query } = this.props;
    return (
      <Item
        thumb={this.renderCustomerIcon(custType)}
        onClick={this.handleClick}
      >
        <span dangerouslySetInnerHTML={{ __html: custName.replace(new RegExp(decodeURI(query), 'gu'), `<i style="font-style:normal;color:#da4e40;">${decodeURI(query)}</i>`) }} />
        <Brief>{extra}</Brief>
      </Item>
    );
  }
}
