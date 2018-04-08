import React, { Component } from 'react';
import Card from '../../../components/Card';
import WithInfiniteScroll from '../../../components/WithInfiniteScroll';
import { selectPost } from '../../../utils/selectors';
import './Styles.css';

const InfiniteScroll = WithInfiniteScroll(
  props => props.home.posts.length && props.home.nextUrl,
  props => props.home.posts.length ? props.fetchNext() : props.fetchLatest(),
  props => props.home.status === 'error',
  props => props.home.status === 'loading'
);

class HomeView extends Component {
  componentDidMount() {
    this.props.fetchLatest();
  }

  render() {
    return (
      <div className="home-container">
        <div className="gutter" />
        <div className="home-main">
          <InfiniteScroll message={this.props.home.error} {...this.props}>
            {this.props.home.posts.map(id => (
              <Card key={id} post={selectPost(this.props.entities, id)} />
            ))}
          </InfiniteScroll>
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default HomeView;
