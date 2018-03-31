import { connect } from 'react-redux';
import { authenticate } from '../../actions/routes/session';
import View from './View';

const mapStateToProps = state => ({
  session: state.routes.session,
  uploader: state.uploader
});

const mapDispatchToProps = {
  authenticate
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
