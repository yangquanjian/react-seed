/**
 * @file connect decorator
 * @author maoquan(maoquan@htsc.com)
 */

import { connect } from 'react-redux';

export default function (state = {}, dispatch = {}) {
  return target => connect(state, dispatch)(target);
}
