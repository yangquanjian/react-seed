import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
  }

  handleClick() {
    const node = this.input;
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" ref={ref => (this.input = ref)} />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    );
  }
}
