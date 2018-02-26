import { connect } from 'react-redux';
import { fetchPost } from '../../../actions/post';
import View from './View';

const mapDispatchToProps = {
  fetchPost
};

const mapStateToProps = state => ({
  post: state.routes.post,
  entities: state.entities
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
