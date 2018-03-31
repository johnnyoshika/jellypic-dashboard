import { connect } from 'react-redux';
import { checkFacebook, loginWithFacebook } from '../../actions/routes/login';
import View from './View';

const mapStateToProps = state => ({
  login: state.routes.login
});

const mapDispatchToProps = {
  checkFacebook,
  loginWithFacebook
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
