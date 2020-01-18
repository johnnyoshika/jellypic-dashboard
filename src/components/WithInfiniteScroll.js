import React from 'react';
import WithStatus from './WithStatus';
import WithTryAgain from './WithTryAgain';

export default (
  infiniteScrollConditional,
  onInfiniteScrollFetch,
  errorConditional,
  spinnerConditional
) =>
  class WithInfiniteScroll extends React.Component {
    constructor(props) {
      super(props);

      // In this article: https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
      // it's suggested in this comment: https://medium.com/@OllyD/also-to-note-something-very-important-ec8015361df5
      // that consructor binding is required in addition to function arrows if we're adding and removing listeners
      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if (!infiniteScrollConditional(this.props)) return;
      if (spinnerConditional(this.props)) return;
      if (errorConditional(this.props)) return;

      if (
        window.innerHeight + window.scrollY <
        document.body.offsetHeight - 500
      )
        return;

      onInfiniteScrollFetch(this.props);
    };

    render() {
      const Status = WithStatus(errorConditional, spinnerConditional);
      const TryAgain = WithTryAgain(errorConditional, onInfiniteScrollFetch);
      return (
        <>
          <Status {...this.props} />
          <TryAgain {...this.props} />
        </>
      );
    }
  };
