import React, { PropTypes, PureComponent } from 'react';
import classname from 'classnames';
import './indicator.less';

class Indicator extends PureComponent {
  static propTypes = {
    count: PropTypes.number,
    activeIndex: PropTypes.number,
  };

  static defaultProps = {
    count: 2,
    activeIndex: 0,
  }

  render() {
    const { count, activeIndex } = this.props;
    const width = `${0.454 * count}rem`;
    const elems = [];
    for (let i = 0; i < count; i++) {
      const classNames = classname({
        focus: i === activeIndex,
      });
      elems.push(<span key={i} className={classNames} />);
    }
    return (
      <div className="indicatorWrapper" style={{ width }}>
        {elems}
      </div>
    );
  }
}

export default Indicator;
