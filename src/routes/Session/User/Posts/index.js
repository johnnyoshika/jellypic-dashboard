import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  userPosts: state.routeUserPosts,
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({
  fetchLatest: id => dispatch.routeUserPosts.fetchLatest({ id }),
  fetchNext: id => dispatch.routeUserPosts.fetchNext({ id })
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
