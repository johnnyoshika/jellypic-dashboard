import React, { Component } from 'react';
import Card from '../../../components/Card';
import ErrorMessage from '../../../components/ErrorMessage';
import { selectPost } from '../../../actions/posts';
import './Styles.css';

class HomeView extends Component {
  constructor() {
    super();

    // REACT ES6 classes don't autobind, so bind it in the constructor
    // as suggested here: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchLatest();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if (!this.props.home.posts.length)
      return;

    if ((window.innerHeight + window.scrollY) < (document.body.offsetHeight - 500))
      return;

    if (this.props.home.state === 'error')
      return;

    this.props.fetchNext();
  }

  renderError() {
    return (
      <div className="text-center">
        <ErrorMessage message={this.props.home.error} />
      </div>
    );
  }

  renderSpinner() {
    return (
      <div className="text-center">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
      </div>
    );
  }

  render() {
    return (
      <div className="home-container">
        <div className="gutter" />
        <div className="home-main">
          {this.props.home.posts.map(id => (
            <Card key={id} post={selectPost(this.props.entities, id)} />
          ))}
          {this.props.home.state === 'error' && this.renderError()}
          {this.props.home.state === 'loading' && this.renderSpinner()}
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default HomeView;
