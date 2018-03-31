import { connect } from 'react-redux';
import { fetchPost } from '../../../actions/routes/post';
import View from './View';

const mapStateToProps = state => ({
  post: state.routes.post,
  entities: state.entities
});

const mapDispatchToProps = {
  fetchPost
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
