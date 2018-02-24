import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import View from './View';

const mapDispatchToProps = {
  authenticate
};

const mapStateToProps = state => ({
  session: state.routes.session,
  uploader: state.uploader
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
