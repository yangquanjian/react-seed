/**
 * @file connect decorator
 * @author maoquan
 */

import { connect } from 'react-redux'

export default function (state = {}, dispatch = {}) {
    return target => connect(state, dispatch)(target)
}
