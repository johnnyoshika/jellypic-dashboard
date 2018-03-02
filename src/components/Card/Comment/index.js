import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/commentState';
import View from './View';

const mapDispatchToProps = {
  deleteComment
};

const mapStateToProps = state => ({
  session: state.routes.session,
  commentState: state.commentState
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
