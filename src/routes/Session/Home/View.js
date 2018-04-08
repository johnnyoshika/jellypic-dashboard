import React, { Component } from 'react';
import Card from '../../../components/Card';
import WithStatus from '../../../components/WithStatus';
import { selectPost } from '../../../utils/selectors';
import './Styles.css';

const Status = WithStatus(
  props => props.home.status === 'error',
  props => props.home.status === 'loading'
);

class HomeView extends Component {
  constructor(props) {
    super(props);

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
    if (!this.props.home.posts.length) return;

    if (window.innerHeight + window.scrollY < document.body.offsetHeight - 500)
      return;

    if (this.props.home.status !== 'idle') return;

    if (!this.props.home.nextUrl) return;

    this.props.fetchNext();
  }

  render() {
    return (
      <div className="home-container">
        <div className="gutter" />
        <div className="home-main">
          <Status message={this.props.home.error} {...this.props}>
            {this.props.home.posts.map(id => (
              <Card key={id} post={selectPost(this.props.entities, id)} />
            ))}
          </Status>
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default HomeView;
