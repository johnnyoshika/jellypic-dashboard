import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/commentState';
import View from './View';

const mapStateToProps = state => ({
  session: state.routes.session,
  commentState: state.commentState
});


const mapDispatchToProps = {
  deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
