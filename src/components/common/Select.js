/**
 * Select.js
 *  下拉选择，暂时先封装rc-select，以便统一定制样式和功能
 * @author maoquan(maoquan@htsc.com)
 */
import React from 'react';
import RCSelect, { Option } from 'rc-select';
import './Select.less';

export default function Select(props) {
  return (
    <RCSelect
      {...props}
      showSearch={false}
      optionLabelProp="text"
    />
  );
}

Select.Option = Option;
