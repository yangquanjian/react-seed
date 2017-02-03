/**
 * @file customer/Form.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import {
  List,
  InputItem,
  Switch,
  Button,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import ImmutablePropTypes from 'react-immutable-proptypes';

@createForm()
export default class CustomerForm extends PureComponent {

  static propTypes = {
    data: ImmutablePropTypes.map.isRequired,
    getData: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    push: PropTypes.func,
  }

  static defaultProps = {
    push: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        data,
      });
    }
  }

  @autobind
  getInputFieldProps(prop, options) {
    const { getFieldProps } = this.props.form;
    const { data } = this.state;
    return getFieldProps(prop, { initialValue: data.get(prop), ...options });
  }

  @autobind
  handleSubmit() {
    // const { form } = this.props;
    // form.validateFields((error, value) => {
    //   console.log(error, value);
    // });
  }

  render() {
    return (
      <div>
        <List>
          <InputItem
            {...this.getInputFieldProps('name')}
            placeholder="请输入姓名"
          >姓名</InputItem>

          <InputItem
            {...this.getInputFieldProps('tel')}
            placeholder="请输入电话"
          >电话</InputItem>

          <InputItem
            {...this.getInputFieldProps('weixin')}
            placeholder="请输入微信号码"
          >微信号</InputItem>

          <List.Item
            extra={<Switch
              {...this.getInputFieldProps('isVip', { valuePropName: 'checked' })}
            />}
          >是否高净值客户</List.Item>

        </List>

        <WhiteSpace size="md" />

        <WingBlank>
          <Button onClick={this.handleSubmit} type="primary">保存</Button>
        </WingBlank>

      </div>
    );
  }
}
