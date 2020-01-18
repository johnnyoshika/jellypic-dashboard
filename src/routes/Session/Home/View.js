import React, { useEffect } from 'react';
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

const HomeView = ({
  home,
  entities,
  fetchLatest,
  fetchNext
}) => {

  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <div className="home-container">
      <div className="gutter" />
      <div className="home-main">
        <InfiniteScroll
          message={home.error}
          home={home}
          fetchNext={fetchNext}
          fetchLatest={fetchLatest}
        >
          {home.posts.map(id => (
            <Card key={id} post={selectPost(entities, id)} />
          ))}
        </InfiniteScroll>
      </div>
      <div className="gutter" />
    </div>
  );
};

export default HomeView;
