import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  session: state.session,
  uploader: state.uploader
});

const mapDispatchToProps = dispatch => ({
  authenticate: dispatch.session.authenticate
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
