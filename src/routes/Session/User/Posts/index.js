import { connect } from 'react-redux';
import { fetchLatest, fetchNext } from '../../../../actions/routes/userPosts';
import View from './View';

const mapStateToProps = state => ({
  userPosts: state.routes.userPosts,
  entities: state.entities
});

const mapDispatchToProps = {
  fetchLatest,
  fetchNext
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
