import React from 'react';
import WithStatus from './WithStatus';

export default (
  infiniteScrollConditional,
  onInfiniteScrollFetch,
  errorConditional,
  spinnerConditional
) =>
  class WithInfiniteScroll extends React.Component {
    constructor(props) {
      super(props);
  
      // REACT ES6 classes don't autobind, so bind it in the constructor
      // as suggested here: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }
  
    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      if (!infiniteScrollConditional(this.props)) return;
  
      if (window.innerHeight + window.scrollY < document.body.offsetHeight - 500)
        return;
  
      onInfiniteScrollFetch(this.props);
    }

    render() {
      const Status = WithStatus(errorConditional, spinnerConditional);
      return <Status {...this.props} />;
    }
  };
