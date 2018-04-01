import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  post: state.routePost,
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch.routePost.fetchPost({ id })
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
