/**
* @file Base/ConnectedBaseComponent
* @author yankun01
*/

import React, { Component, PropTypes } from 'react'

/**
 * 返回一个空对象的空函数
 *
 */
const noop = () => ({})

/**
 * 合并多个`mapStateToProps`或`mapDispatchToProps`中返回的对象
 * 在子组件里面通过`connect`绑定`mapStateToProps`或`mapDispatchToProps`
 * 然后重写`BaseComponent`中里的Props
 *
 * @param {...Function} args 多个函数
 *
 * @return {Object}
 */
const combineProps = (...args) => props => {
    return args.reduce(
        (combinedProps, prop) => Object.assign(combinedProps, prop(props)),
        {}
    )
}

/**
 * 需要传给`BaseComponent`的state
 *
 * @param {Object} state
 *
 * @return {Object}
 */
const baseState = state => ({})

/**
 * 需要传给`BaseComponent`的function
 *
 * @param {Function} dispatch
 *
 * @return {Object}
 */
const baseAction = dispatch => ({})

export default (childState = noop, childAction = noop) => ComposedComponent => {
    // eg. 如果在子组件中定义了`mapDispatchToProps`和`mapStateToProps`
    // 把子组件中的`mapDispatchToProps`或`mapStateToProps`内的方法，覆盖基类的重名方法
    const combinedProps = combineProps(baseState, childState)
    const combinedDispatch = combineProps(baseAction, childAction)

    class DecoratedComponent extends Component {
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(combinedProps, combinedDispatch)(DecoratedComponent);
}
