import { connect } from 'react-redux';
import { addComment } from '../../actions/commentState';
import View from './View';

const mapStateToProps = state => ({
  session: state.session,
  likeState: state.likeState,
  commentState: state.commentState
});

const mapDispatchToProps = dispatch => ({
  like: postId => dispatch.likeState.like({ postId }),
  unlike: postId => dispatch.likeState.unlike({ postId }),
  addComment
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
