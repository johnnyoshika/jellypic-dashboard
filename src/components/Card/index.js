import { connect } from 'react-redux';
import { like, unlike } from '../../actions/likeState';
import { addComment } from '../../actions/commentState';
import View from './View';

const mapStateToProps = state => ({
  session: state.session,
  likeState: state.likeState,
  commentState: state.commentState
});

const mapDispatchToProps = {
  like,
  unlike,
  addComment
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
