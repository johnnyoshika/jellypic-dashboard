import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  session: state.session,
  commentState: state.commentState
});

const mapDispatchToProps = dispatch => ({
  deleteComment: (postId, commentId) =>
    dispatch.commentState.deleteComment({ postId, commentId })
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
