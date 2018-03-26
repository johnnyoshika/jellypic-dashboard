import { connect } from 'react-redux';
import { fetchLatest, fetchNext } from '../../../../actions/routes/userPosts';
import View from './View';

const mapDispatchToProps = {
  fetchLatest,
  fetchNext
};

const mapStateToProps = state => ({
  userPosts: state.routes.userPosts,
  entities: state.entities
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
